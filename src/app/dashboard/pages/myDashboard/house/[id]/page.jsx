"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BookingRequestsPage() {
  const { id } = useParams(); // postId
  const [post, setPost] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch all booking requests for this post
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`/api/user/userPostsStatus?id=${id}`);
        const result = await res.json();
        if (result.status === "success") {
          setPost(result.data.post);
          setBookings(result.data.bookings);
        } else {
          throw new Error(result.msg || "Failed to load booking requests");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchBookings();
  }, [id]);

  const handleConfirm = async (bookingId) => {
    if (!confirm("Are you sure you want to confirm this booking?")) return;
    setActionLoading(true);
    try {
      const res = await fetch("/api/user/userPostsStatus", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, postId: id }),
      });
      const result = await res.json();
      if (result.status === "success") {
        alert("Booking confirmed successfully!");
        // Re-fetch updated data
        const updatedRes = await fetch(`/api/user/userPostsStatus?id=${id}`);
        const updatedData = await updatedRes.json();
        if (updatedData.status === "success") {
          setBookings(updatedData.data.bookings);
        }
      } else {
        alert(result.msg || "Failed to confirm booking");
      }
    } catch (err) {
      alert(err.message || "Error confirming booking");
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin h-16 w-16 border-t-4 border-b-4 border-indigo-600 rounded-full mx-auto mb-4"></div>
          <p className="text-indigo-700 font-medium">Loading booking requests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-white py-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* Post Info */}
        {post && (
          <div className="bg-white shadow-md rounded-2xl p-6 mb-10">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                {post.images?.[0] ? (
                  <img
                    src={post.images[0]}
                    alt={post.title}
                    className="rounded-xl w-full h-64 object-cover"
                  />
                ) : (
                  <div className="h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>
              <div className="md:w-1/2 flex flex-col justify-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {post.title}
                </h1>
                <p className="text-gray-600 mb-2">
                  📍 {post.city}, {post.address}
                </p>
                <p className="text-gray-700 mb-2">
                  💰 Rent Price:{" "}
                  <span className="font-semibold text-indigo-600">
                    {post.rentPrice} {post.currency}
                  </span>
                </p>
                <p className="text-gray-600 text-sm">
                  Available: {formatDate(post.availableFrom)} →{" "}
                  {formatDate(post.availableTo)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Booking Requests */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Booking Requests
          </h2>

          {bookings.length === 0 ? (
            <div className="text-center py-10 text-gray-600">
              No booking requests yet.
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className={`border rounded-xl p-5 transition-all ${
                    b.status === "CONFIRMED"
                      ? "border-green-500 bg-green-50"
                      : b.status === "CANCELLED"
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Booker: {b.booker?.name || "Anonymous"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        📞 {b.booker?.phone || "No phone"}
                      </p>
                      <p className="text-sm text-gray-600">
                        ✉️ {b.booker?.email || "No email"}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        b.status === "CONFIRMED"
                          ? "bg-green-200 text-green-800"
                          : b.status === "CANCELLED"
                          ? "bg-red-200 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>

                  <div className="mt-2 text-gray-700 text-sm">
                    <p>
                      💰 Proposed Price:{" "}
                      <span className="font-medium text-indigo-600">
                        {b.proposedPrice} BDT
                      </span>
                    </p>
                    <p>
                      📅 {formatDate(b.startDate)} → {formatDate(b.endDate)}
                    </p>
                    <p className="mt-2 italic text-gray-600">
                      “{b.message || "No message"}”
                    </p>
                  </div>

                  {b.status === "PENDING" && (
                    <div className="mt-4 flex gap-3">
                      <button
                        disabled={actionLoading}
                        onClick={() => handleConfirm(b.id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                      >
                        ✅ Confirm
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
