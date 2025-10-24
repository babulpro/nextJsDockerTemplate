import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { DecodedJwtToken } from "@/lib/authFunction/JwtHelper";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const storeCookies = await cookies();
    const token = storeCookies.get("token")?.value;

    // Check token exists first
    if (!token) {
      return NextResponse.json(
        { status: "fail", msg: "Unauthorized - Authentication required" },
        { status: 401 }
      );
    }

    // Verify and decode token
    const payload = await DecodedJwtToken(token);
    
    if (!payload || !payload.id) {
      return NextResponse.json(
        { status: "fail", msg: "Invalid authentication token" },
        { status: 401 }
      );
    }

    // TODO: Verify user has admin role
    // Uncomment and implement when you add admin role checking
    // const user = await prisma.user.findUnique({
    //   where: { id: payload.id },
    //   select: { roles: true }
    // });
    // if (!user?.roles.includes('ADMIN')) {
    //   return NextResponse.json(
    //     { status: "fail", msg: "Admin access required" },
    //     { status: 403 }
    //   );
    // }

    const posts = await prisma.post.findMany({
      include: { bookings: true, user: true },
      orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json({ status: "success", data: posts });
  } catch (e) {
    console.error("Admin allposts error:", e);
    return NextResponse.json(
      { status: "fail", msg: e.message },
      { status: 500 }
    );
  }
}

