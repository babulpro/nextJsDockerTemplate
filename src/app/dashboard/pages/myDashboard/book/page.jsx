"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        console.log("🔄 Fetching bookings...");
        const response = await fetch("/api/user/userBookingList", {
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        console.log("📡 Response status:", response.status);
        
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        
        const result = await response.json();
        console.log("📊 API Result:", result);

        if (result.status === "success") {
          // FIX: result.data is already the array, no need to access .data again
          const bookingsData = result.data;
          console.log("📦 Bookings data:", bookingsData);
          
          // Sort newest first
          const sorted = bookingsData.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setBookings(sorted);
        } else {
          throw new Error(result.msg || "Failed to fetch bookings");
        }
      } catch (err) {
        console.error("❌ Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const formatDate = (dateString) => {
    try {
      const options = { day: "numeric", month: "short", year: "numeric" };
      return new Date(dateString).toLocaleDateString("en-US", options);
    } catch (error) {
      return "Invalid date";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-indigo-700 font-medium">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 font-medium">
        You don't have any booking requests yet.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        All Booking Requests Are Here
      </h1>

      <div className="grid gap-6">
        {bookings.map((booking) => {
          const post = booking.post;
          return (
            <div
              key={booking.id}
              className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition bg-white"
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
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-1">
                    📍 {post.city}, {post.address}
                  </p>
                  <p className="text-gray-700 font-medium">
                    💰 {post.rentPrice} {post.currency}
                  </p>
                </div>
              </Link>

              {/* Booking Details */}
              <div className="grid sm:grid-cols-2 gap-4 text-sm mb-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">Booking Dates:</span><br />
                  {formatDate(booking.startDate)} → {formatDate(booking.endDate)}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Proposed Price:</span><br />
                  {booking.proposedPrice?.toLocaleString() || 'N/A'} {post.currency}
                </p>
                <div className="sm:col-span-2">
                  <p className="text-gray-600 italic">
                    💬 "{booking.message || "No message provided"}"
                  </p>
                </div>
              </div>

              {/* Status + Timestamp */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-gray-200">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    booking.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                      : booking.status === "CONFIRMED"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : booking.status === "CANCELLED"
                      ? "bg-red-100 text-red-800 border border-red-200"
                      : "bg-gray-100 text-gray-800 border border-gray-200"
                  }`}
                >
                  {booking.status}
                </span>

                <span className="text-xs text-gray-500">
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