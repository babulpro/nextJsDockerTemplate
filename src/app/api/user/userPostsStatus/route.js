import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// ✅ GET — Fetch booking requests for a specific post
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("id");

    if (!postId) {
      return NextResponse.json({ status: "fail", msg: "Post ID is required" }, { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        bookings: {
          orderBy: { createdAt: "desc" },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
              },
            },
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ status: "fail", msg: "Post not found" }, { status: 404 });
    }

    // Format data — keep only useful info
    const formattedBookings = post.bookings.map((b) => ({
      id: b.id,
      status: b.status,
      proposedPrice: b.proposedPrice,
      message: b.message,
      startDate: b.startDate,
      endDate: b.endDate,
      booker: b.user,
    }));

    return NextResponse.json({
      status: "success",
      data: {
        post: {
          id: post.id,
          title: post.title,
          rentPrice: post.rentPrice,
          city: post.city,
          address: post.address,
          images: post.images,
          availableFrom: post.availableFrom,  
          availableTo: post.availableTo
        },
        bookings: formattedBookings,
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { status: "fail", msg: "Error loading booking requests" },
      { status: 500 }
    );
  }
}

// ✅ PATCH — Confirm one booking and cancel others
export async function PATCH(req) {
  try {
    const { bookingId, postId } = await req.json();

    if (!bookingId || !postId) {
      return NextResponse.json(
        { status: "fail", msg: "bookingId and postId are required" },
        { status: 400 }
      );
    }

    // ✅ 1. Confirm the selected booking
    const confirmedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "CONFIRMED" },
    });

    // ✅ 2. Cancel all other bookings for the same post
    await prisma.booking.updateMany({
      where: {
        postId,
        NOT: { id: bookingId },
      },
      data: { status: "CANCELLED" },
    });

    // ✅ 3. Mark the post as unpublished (no longer available)
    await prisma.post.update({
      where: { id: postId },
      data: { published: false },
    });

    // ✅ 4. Return response
    return NextResponse.json({
      status: "success",
      msg: "Booking confirmed, post unpublished, and other bookings cancelled.",
      confirmedBooking,
    });
  } catch (e) {
    console.error("Booking confirm error:", e);
    return NextResponse.json(
      { status: "fail", msg: "Failed to confirm booking" },
      { status: 500 }
    );
  }
}
