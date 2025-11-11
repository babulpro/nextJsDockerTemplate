import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { DecodedJwtToken } from "@/lib/authFunction/JwtHelper";
import { cookies } from "next/headers"

export async function PATCH(req) {
  try {
    const storeCookies = await cookies()
    const token = storeCookies.get("token")?.value;
    
    const payload = await DecodedJwtToken(token)
    
    if(!token){
      return NextResponse.json({status:"fail",msg:"unauthorize"},{status:500})
    }

    // Extract both id and published from request body
    const { id, published } = await req.json();
    
    const post = await prisma.post.update({
      where: { id },
      // Use the published value from the request instead of hardcoding true
      data: { published: published },
    });
    
    return NextResponse.json({ status: "success", data: post });
  } catch (e) {
    return NextResponse.json({ status: "fail", msg: e.message }, { status: 500 });
  }
}