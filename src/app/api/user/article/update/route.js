import { NextResponse } from "next/server";
import { DecodedJwtToken } from "@/lib/authFunction/JwtHelper"
import { cookies } from "next/headers"
import prisma from "@/lib/prisma";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

 

export async function PATCH(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const data = await req.json();
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ status: "fail", msg: "No token found" }, { status: 401 });
        }

        if (!id) {
            return NextResponse.json({ status: "fail", msg: "Post ID is required" }, { status: 400 });
        }

        const payload = await DecodedJwtToken(token);
        const userid = payload['id'];

        // First, verify the post exists and belongs to the user
        const existingPost = await prisma.post.findFirst({
            where: {
                id: id,
                userId: userid
            }
        });

        if (!existingPost) {
            return NextResponse.json({ status: "fail", msg: "Post not found or access denied" }, { status: 404 });
        }

        // Prepare update data
        const updateData = {
            ...data,
            rentPrice: data.rentPrice ? Number(data.rentPrice) : undefined,
            images: data.images || [],
            // Don't include userId in update to prevent changing ownership
        };

        // Remove undefined values to avoid overwriting with null
        Object.keys(updateData).forEach(key => {
            if (updateData[key] === undefined) {
                delete updateData[key];
            }
        });

        const updatedArticle = await prisma.post.update({
            where: {
                id: id
            },
            data: updateData
        });

        return NextResponse.json({ status: "success", data: updatedArticle });

    } catch (e) {
        console.error("API Error:", e);
        
        // Handle Prisma specific errors
        if (e.code === 'P2025') {
            return NextResponse.json(
                { status: "fail", msg: "Post not found" },
                { status: 404 }
            );
        }
        
        return NextResponse.json(
            { status: "fail", msg: e.message },
            { status: e.statusCode || 500 }
        );
    }
}

 