"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function BookingRequestsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/user/userBookingList");
        const result = await res.json();
       

        if (result.status === "success") {
          // Sort newest first
          const sorted = result.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setBookings(sorted);
        } else {
          setError("Failed to fetch bookings");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

 if (loading) {
     return (
       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
         <div className="text-center">
           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
           <p className="text-indigo-700 font-medium">Loading properties...</p>
         </div>
       </div>
     );
   }

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 font-semibold">
        {error}
      </div>
    );

  if (!bookings.length)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 font-medium">
        You don’t have any booking requests yet.
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        All Bookin Request Are Here
      </h1>

      <div className="grid gap-6">
        {bookings.map((booking) => {
          const post = booking.post;
          return (
            <div
              key={booking.id}
              className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-slate-500"
            >
              {/* Linked Post */}
              <Link
                href={`/dashboard/pages/article/${post.id}`}
                className="flex items-start gap-4 mb-4 hover:opacity-90"
              >
                <img
                  src={post.images?.[0] || "/default-house.jpg"}
                  alt={post.title}
                  className="w-28 h-28 object-cover rounded-lg border"
                />
                <div>
                  <h2 className="text-lg font-semibold">{post.title}</h2>
                  <p className="text-slate-900 text-sm">{post.city}</p>
                  <p className="text-slate-900 text-sm">{post.address}</p>
                </div>
              </Link>

              {/* Booking Details */}
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <p>
                  <span className="font-semibold">Booking Dates:</span>{" "}
                  {formatDate(booking.startDate)} → {formatDate(booking.endDate)}
                </p>
                <p>
                  <span className="font-semibold">Proposed Price:</span>{" "}
                  {booking.proposedPrice.toLocaleString()}{" "}
                  <span className="text-slate-900">{post.currency}</span>
                </p>
                <p className="col-span-2 text-slate-900 italic">
                  💬 {booking.message || "No message provided."}
                </p>
              </div>

              {/* Status + Timestamp */}
              <div className="mt-4 flex justify-between items-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                    booking.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : booking.status === "CONFIRMED"
                      ? "bg-green-100 text-green-700"
                      : booking.status === "CANCELLED"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-slate-900"
                  }`}
                >
                  {booking.status}
                </span>

                <span className="text-xs text-slate-900">
                  Requested on {formatDate(booking.createdAt)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
