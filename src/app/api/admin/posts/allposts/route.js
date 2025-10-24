import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: { bookings: true, user: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ status: "success", data: posts });
  } catch (e) {
    return NextResponse.json({ status: "fail", msg: e.message }, { status: 500 });
  }
}
