 
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
      const data = await prisma.post.findUnique({
      where: {
        id:id
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            address: true,
          },
        },
      },
    });

    return NextResponse.json({ status: "success", data });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ status: "fail", msg: "Something went wrong" });
  }
}
