import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
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

    // Delete post
    await prisma.post.delete({ where: { id } });

    return NextResponse.json({
      status: "success",
      msg: "Post deleted successfully",
    });
  } catch (e) {
    console.error("DELETE Error:", e);
    return NextResponse.json(
      { status: "fail", msg: e.message },
      { status: 500 }
    );
  }
}
