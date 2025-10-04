"use client";
import React, { useState, useEffect } from "react";

export default function Page() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/user/userBookingList", { cache: "no-cache" });
        if (!response.ok) throw new Error("Failed to fetch bookings");
        const result = await response.json();
        if (result.status === "success") {
          setBookings(result.data);
        } else {
          throw new Error(result.msg || "Failed to load bookings");
        }
      } catch (e) {
        setError(e.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const formatPrice = (price, currency = "BDT") =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency,
    }).format(price);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-2">❌ {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-white py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
        🧾 My Booking List
      </h1>

      {bookings.length === 0 ? (
        <div className="text-center text-gray-600 mt-20">
          <p className="text-6xl mb-4">📭</p>
          <p className="text-xl font-semibold">No bookings yet</p>
          <p className="text-gray-500 text-sm mt-2">
            You haven’t booked any properties yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => {
            const { post } = booking;
            if (!post) return null;

            return (
              <div
                key={booking.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                {/* Image */}
                {post.images?.length > 0 && (
                  <div className="relative h-48">
                    <img
                      src={post.images[0]}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-indigo-600 text-white text-sm px-2 py-1 rounded">
                      {formatPrice(post.rentPrice, post.currency)}
                    </div>
                  </div>
                )}

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    📍 {post.city}, {post.address}
                  </p>

                  <div className="flex justify-between items-center text-sm mb-3">
                    <span className="text-gray-600">
                      🗓 {formatDate(booking.startDate)} → {formatDate(booking.endDate)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm mb-3">
                    <span className="text-indigo-700 font-semibold">
                      Proposed: {formatPrice(booking.proposedPrice, post.currency)}
                    </span>
                  </div>

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : booking.status === "ACCEPTED"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "REJECTED"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
