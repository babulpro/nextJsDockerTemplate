 

import { DecodedJwtToken } from "@/lib/authFunction/JwtHelper";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req) {
    try {
        
        
        const storeCookies = await cookies();
        const token = storeCookies.get("token")?.value;
        
         
        
        if (!token) {
             
            return NextResponse.json(
                { status: "fail", msg: "Authentication required" },
                { status: 401 }
            );
        }

        const payload = await DecodedJwtToken(token); 
        
        if (!payload?.id) {
            return NextResponse.json(
                { status: "fail", msg: "Invalid token" },
                { status: 401 }
            );
        }

        const id = payload.id;

        const data = await prisma.booking.findMany({
            where: {
                userId: id
            },
            include: {
                post: {
                    select: {
                        id: true,
                        title: true,
                        city: true,
                        address: true,
                        rentPrice: true,
                        currency: true,
                        images: true,
                        availableFrom: true,
                        availableTo: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
 

        return NextResponse.json({
            status: "success",
            data: data
        });

    } catch (error) {
        console.error("❌ API Error:", error);
        
        // More specific error messages
        let errorMsg = "Try again later";
        let statusCode = 500;

        if (error.name === 'PrismaClientKnownRequestError') {
            errorMsg = "Database error occurred";
        } else if (error.name === 'JsonWebTokenError') {
            errorMsg = "Invalid authentication";
            statusCode = 401;
        }

        return NextResponse.json(
            { status: "fail", msg: errorMsg },
            { status: statusCode }
        );
    }
}