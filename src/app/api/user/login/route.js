import { CreateJwtToken } from "@/lib/authFunction/JwtHelper";
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'
import { cookies } from "next/headers"
import prisma from "@/lib/prisma";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function POST(req,res){
    
    
    try{

        const data = await req.json()
        const user = await prisma.user.findUnique({
            where:{email:data.email}
        })
         

        if(!user){
            return NextResponse.json({status:"fail",msg:"No user found"},{status:404})
        }

        const matchPassword= await bcrypt.compare(data.password,user.password)
        

        if(!matchPassword){
            return NextResponse.json({status:"fail",msg:"invalid password"},{status:404})
        }

        const token = await CreateJwtToken(user.email,user.id);
        
        const response = NextResponse.json({status:"success",msg:"Login Success"});
        
        response.cookies.set({
            name:'token',
            value:token,
            httpOnly:true,
            secure:true,
            sameSite:"strict",
            path:"/",
            maxAge:60*60*24*7
        })
        
        return response;
    }
    catch(e){
        return NextResponse.json({status:"fail",msg:e.message},{status:500})
    }
}




export async function GET(req) {
    cookies().delete('token')
    return NextResponse.json({ msg:"request Completed",status:"success"})   
      
}