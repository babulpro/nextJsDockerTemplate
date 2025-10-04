import { DecodedJwtToken } from "@/lib/authFunction/JwtHelper";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(req,res){
    try{
        const storeCookies= await cookies()
        const token = storeCookies.get("token")?.value;
        if(!token){
            return NextResponse.json({status:"fail",msg:"something went wrong"})
        }

         
        const payload = await DecodedJwtToken(token)
        const id = payload['id'] 

       const data = await prisma.post.findMany({
            where: {
                userId: id
            },
            orderBy: {
                createdAt: "desc" // Verify this field name matches your schema
            },
        });

        return NextResponse.json({status:"success" ,data:data})

    }
    catch(e){
        return NextResponse.json({status:"fail",msg:e.message},{status:500})
    }
}