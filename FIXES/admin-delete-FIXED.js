import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { DecodedJwtToken } from "@/lib/authFunction/JwtHelper";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
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

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { status: "fail", msg: "Post ID is required" },
        { status: 400 }
      );
    }

    // Check if the post exists
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      return NextResponse.json(
        { status: "fail", msg: "Post not found" },
        { status: 404 }
      );
    }

    // Delete related bookings first (if not using cascade delete)
    await prisma.booking.deleteMany({
      where: { postId: id }
    });

    // Delete post
    await prisma.post.delete({ where: { id } });

    return NextResponse.json({
      status: "success",
      msg: "Post and related bookings deleted successfully",
    });
  } catch (e) {
    console.error("DELETE Error:", e);
    return NextResponse.json(
      { status: "fail", msg: e.message },
      { status: 500 }
    );
  }
}

