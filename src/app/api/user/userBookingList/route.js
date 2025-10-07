import { DecodedJwtToken } from "@/lib/authFunction/JwtHelper";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

 

export const dynamic = 'force-dynamic';

export async function GET(req,res){
    try{
        const storeCookies = await cookies()
        const token  = await storeCookies.get("token")?.value;
        if(!token){
            return NextResponse.json({status:"fail",msg:"something went wrong"})
        }
        const payload = await DecodedJwtToken(token)
        const id = payload.id
        const data = await prisma.booking.findMany({
            where:{
                userId:id
            },
            include:{
                post:true
            }
        })

        return NextResponse.json({status:"success",data:data})


    }
    catch(e){
        return NextResponse.json({status:"fail",msg:"try again later"})
    }

}