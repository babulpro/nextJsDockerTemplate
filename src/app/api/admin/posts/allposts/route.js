import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { DecodedJwtToken } from "@/lib/authFunction/JwtHelper";

import { cookies } from "next/headers"

export async function GET() {
  try {
    const storeCookies = await cookies()
    const token = storeCookies.get("token")?.value;


    const payload = await DecodedJwtToken(token)
    


    if(!token){
      return  NextResponse.json({status:"fail",msg:"unauthorize"},{status:500})
    }
    const posts = await prisma.post.findMany({
      include: { bookings: true, user: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ status: "success", data: posts });
  } catch (e) {
    return NextResponse.json({ status: "fail", msg: e.message }, { status: 500 });
  }
}
