import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { DecodedJwtToken } from "@/lib/authFunction/JwtHelper";

export const dynamic = "force-dynamic";

export async function PATCH(req) {
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

    const { id } = await req.json();

    // Validate post ID
    if (!id) {
      return NextResponse.json(
        { status: "fail", msg: "Post ID is required" },
        { status: 400 }
      );
    }

    // Check if post exists
    const existingPost = await prisma.post.findUnique({ where: { id } });
    if (!existingPost) {
      return NextResponse.json(
        { status: "fail", msg: "Post not found" },
        { status: 404 }
      );
    }

    // Approve the post
    const post = await prisma.post.update({
      where: { id },
      data: { published: true },
    });

    return NextResponse.json({
      status: "success",
      msg: "Post approved successfully",
      data: post
    });
  } catch (e) {
    console.error("Admin approve error:", e);
    return NextResponse.json(
      { status: "fail", msg: e.message },
      { status: 500 }
    );
  }
}

