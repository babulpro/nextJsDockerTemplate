import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { DecodedJwtToken } from "@/lib/authFunction/JwtHelper"
import  prisma  from "@/lib/prisma"

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function POST(req,res){
    try{
        let data = await req.json()
        const storeCookies = await cookies()
        const token =await storeCookies.get('token')?.value

        if(!token){
            return NextResponse.json({ status:"fail",msg:"token not found"})
        }

        const payload = await DecodedJwtToken(token)
        data.userId=payload.id 

        // const bookingData = await prisma.booking.findUnique({
        //     where:{
        //         postId:data.postId
        //     }
        // })

        // if(postData.)

        const newRequest =await prisma.booking.create({
            data:{
                ...data
            }
        })
         
         

         return NextResponse.json({status:"success",data:newRequest})



    }
    catch(e){
        return NextResponse.json({status:"fail",msg:e,data:"notfound"})
    }
}