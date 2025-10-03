import { NextResponse } from "next/server";
import { DecodedJwtToken } from "@/lib/authFunction/JwtHelper"
import { cookies } from "next/headers"
import prisma from "@/lib/prisma";

export async function POST(req){
    try{
        const data = await req.json();
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        

        if(!token){
            return NextResponse.json({status:"fail",msg:"No token found"},{status:401})
        }

        const payload = await DecodedJwtToken(token);
        const id = payload['id'];
        data.userId = id;
        
        const newArticle = await prisma.post.create({
          data:{
            ...data
          }
        })
        return NextResponse.json({status:"success",data:newArticle})




    }
    catch(e){
         console.error("API Error:", e)
            return NextResponse.json(
              { status: "fail", msg: e.message },
              { status: e.statusCode || 500 })
    }
}



export async function GET(req, res) {
  try { 
    const storeCookies = await cookies();
    const token = storeCookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ status: "fail", msg: "Something went wrong" });
    }    

    // ✅ Sort articles by createdAt DESC (latest first)
    const data = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include:{
        user:{
          select:{
            id:true,
            name:true,
            email:true,
            phone:true
          }
        }
      }
    });

    return NextResponse.json(
      { status: "success", msg: "Data found", data },
      { status: 200 }
    );
  } catch (e) {
    console.error("GET API Error:", e);
    return NextResponse.json(
      { status: "fail", msg: "Something went wrong" },
      { status: 500 }
    );
  }
}
