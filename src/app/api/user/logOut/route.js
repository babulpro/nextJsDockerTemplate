import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(req) {
    cookies().delete('token')
    return NextResponse.json({
        msg:"logout Completed",status:"success"
    })   
      
}