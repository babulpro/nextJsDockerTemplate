import { DecodedJwtToken } from "@/lib/authFunction/JwtHelper"

import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req,res){
    try{
         
         const storeCookies = await cookies()
         const token =await storeCookies.get('token')?.value

          
         if(!token){
            return NextResponse.json({status:"fail",msg:"something went wrong"})
         }
          
        const payload = await DecodedJwtToken(token)  
                 
        const user = await prisma.user.findUnique({
            where:{
                id:payload.id
            }
        })

        return NextResponse.json({status:"success",msg:"data get found", data:user},{status:200})
        

    }
    catch(e){
        return NextResponse.json({status:"fail",msg:"User not fount"},{satatus:404})
    }
}