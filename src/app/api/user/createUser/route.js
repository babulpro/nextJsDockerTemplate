import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { cookies } from 'next/headers';
import prisma from "@/lib/prisma";
import { CreateJwtToken } from "@/lib/authFunction/JwtHelper";

// Force dynamic rendering
export const dynamic = 'force-dynamic';
  

export async function POST(req) {
  try {
     
    const data = await req.json(); 
    const hash = await bcrypt.hash(data.password, 10);
     data.password=hash 
     

     const findUser = await prisma.user.findUnique({      
        where:{email:data.email}
      
     })
     console.log(findUser)

    if (findUser) {
      return NextResponse.json(
        { status: "fail", msg: "User already exists" },
        { status: 409 } // Conflict
      );
    }

    const user = await prisma.user.create({
      data:{
        ...data
      }
    })
    
    const token = await CreateJwtToken(user.email,user.id)

    const response = NextResponse.json(
      { status: "success", msg: "User created successfully"},
      { status: 201 }
    );

    response.cookies.set({
        name:'token',
        value:token,
        httpOnly:true,
        secure:true,
        sameSite:'strict',
        path:'/',
        maxAge:60*60*24*7
    })
    return response
  } catch (e) {
    return NextResponse.json(
      { status: "fail", msg: e || "Failed to create user"    },
      { status: 500 }
    );
  }
}


export async function GET(req) {
    cookies().delete('token')
    return NextResponse.json({
        msg:"request Completed",status:"ok"
    })   
      
}