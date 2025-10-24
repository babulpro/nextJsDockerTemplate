import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const { id } = await req.json();
    const post = await prisma.post.update({
      where: { id },
      data: { published: true },
    });
    return NextResponse.json({ status: "success", data: post });
  } catch (e) {
    return NextResponse.json({ status: "fail", msg: e.message }, { status: 500 });
  }
}
