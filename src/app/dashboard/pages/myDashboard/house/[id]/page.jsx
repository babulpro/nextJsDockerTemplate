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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch all booking requests for this post
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`/api/user/userPostsStatus?id=${id}`, {
          cache: 'no-store'
        });
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
        alert("🎉 Booking confirmed successfully!");
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

  const formatDate = (date) => {
    if (!isClient) return "";
    try {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "CONFIRMED":
        return {
          bg: "bg-green-500/20",
          text: "text-green-300",
          border: "border-green-400/30",
          icon: "✅"
        };
      case "CANCELLED":
        return {
          bg: "bg-red-500/20",
          text: "text-red-300",
          border: "border-red-400/30",
          icon: "❌"
        };
      case "PENDING":
      default:
        return {
          bg: "bg-yellow-500/20",
          text: "text-yellow-300",
          border: "border-yellow-400/30",
          icon: "⏳"
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-emerald-100 font-medium">Loading booking requests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center text-red-400 text-2xl mx-auto mb-4 border border-red-400/30">
            ⚠️
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
          <p className="text-emerald-100/70 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Post Info */}
        {post && (
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl p-6 md:p-8 mb-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Property Image */}
              <div className="lg:w-2/5">
                {post.images?.[0] ? (
                  <img
                    src={post.images[0]}
                    alt={post.title}
                    className="rounded-2xl w-full h-64 object-cover border border-white/20"
                  />
                ) : (
                  <div className="h-64 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center text-emerald-100/70">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🏠</div>
                      <p>No Image Available</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Property Details */}
              <div className="lg:w-3/5">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {post.title}
                </h1>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-emerald-100/80">
                      <span className="text-emerald-400">📍</span>
                      <span>{post.city}, {post.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-100/80">
                      <span className="text-emerald-400">💰</span>
                      <span className="font-semibold text-emerald-300">
                        {post.rentPrice} {post.currency}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-emerald-100/80">
                      <span className="text-emerald-400">📅</span>
                      <span>Available: {formatDate(post.availableFrom)} → {formatDate(post.availableTo)}</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold border inline-block ${
                      post.published 
                        ? "bg-green-500/20 text-green-300 border-green-400/30" 
                        : "bg-yellow-500/20 text-yellow-300 border-yellow-400/30"
                    }`}>
                      {post.published ? "🟢 Published" : "🟡 Draft"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Requests Section */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
                📋 Booking Requests
              </h2>
              <p className="text-emerald-100/70">
                Manage booking requests for your property
              </p>
            </div>
            
            {/* Stats */}
            <div className="flex gap-4 mt-4 md:mt-0">
              <div className="bg-white/10 rounded-2xl p-3 border border-white/20 text-center min-w-20">
                <div className="text-xl font-bold text-white">{bookings.length}</div>
                <div className="text-emerald-100/70 text-xs">Total</div>
              </div>
              <div className="bg-yellow-500/20 rounded-2xl p-3 border border-yellow-400/30 text-center min-w-20">
                <div className="text-xl font-bold text-yellow-300">
                  {bookings.filter(b => b.status === "PENDING").length}
                </div>
                <div className="text-yellow-200/70 text-xs">Pending</div>
              </div>
              <div className="bg-green-500/20 rounded-2xl p-3 border border-green-400/30 text-center min-w-20">
                <div className="text-xl font-bold text-green-300">
                  {bookings.filter(b => b.status === "CONFIRMED").length}
                </div>
                <div className="text-green-200/70 text-xs">Confirmed</div>
              </div>
            </div>
          </div>

          {/* Booking Requests List */}
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 text-3xl mx-auto mb-4 border border-emerald-400/30">
                📅
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Booking Requests</h3>
              <p className="text-emerald-100/70">
                You haven't received any booking requests for this property yet.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => {
                const statusColors = getStatusColor(booking.status);
                
                return (
                  <div
                    key={booking.id}
                    className={`bg-gradient-to-br backdrop-blur-lg rounded-2xl border p-6 transition-all duration-300 ${
                      statusColors.bg
                    } ${statusColors.border} hover:shadow-xl`}
                  >
                    {/* Booking Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                            {booking.booker?.name?.charAt(0)?.toUpperCase() || "A"}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {booking.booker?.name || "Anonymous User"}
                            </h3>
                            <div className="flex flex-wrap gap-3 text-emerald-100/80 text-sm mt-1">
                              {booking.booker?.phone && (
                                <span className="flex items-center gap-1">
                                  📞 {booking.booker.phone}
                                </span>
                              )}
                              {booking.booker?.email && (
                                <span className="flex items-center gap-1">
                                  ✉️ {booking.booker.email}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`px-4 py-2 rounded-xl border ${statusColors.border} ${statusColors.bg} flex items-center gap-2`}>
                        <span className={statusColors.text}>{statusColors.icon}</span>
                        <span className={`font-semibold ${statusColors.text}`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                      {/* Dates & Price */}
                      <div className="space-y-3">
                        <div className="bg-white/10 rounded-xl p-3 border border-white/20">
                          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                            <span className="text-emerald-400">📅</span>
                            Booking Period
                          </h4>
                          <div className="space-y-1 text-emerald-100/80 text-sm">
                            <div className="flex justify-between">
                              <span>Check-in:</span>
                              <span className="text-white font-medium">{formatDate(booking.startDate)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Check-out:</span>
                              <span className="text-white font-medium">{formatDate(booking.endDate)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white/10 rounded-xl p-3 border border-white/20">
                          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                            <span className="text-emerald-400">💰</span>
                            Price Details
                          </h4>
                          <div className="text-emerald-100/80">
                            <div className="flex justify-between items-center">
                              <span>Proposed Price:</span>
                              <span className="text-emerald-300 font-bold text-lg">
                                {booking.proposedPrice} BDT
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="bg-white/10 rounded-xl p-3 border border-white/20">
                        <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                          <span className="text-emerald-400">💬</span>
                          Guest Message
                        </h4>
                        <p className="text-emerald-100/80 italic text-sm leading-relaxed">
                          {booking.message || "No additional message provided"}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {booking.status === "PENDING" && (
                      <div className="flex gap-3 pt-4 border-t border-white/20">
                        <button
                          disabled={actionLoading}
                          onClick={() => handleConfirm(booking.id)}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {actionLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                              <span>Processing...</span>
                            </>
                          ) : (
                            <>
                              <span>✅</span>
                              <span>Confirm Booking</span>
                            </>
                          )}
                        </button>
                        
                        <button className="bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 px-6 py-3 rounded-xl border border-red-400/30 hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-300 font-semibold flex items-center gap-2">
                          <span>❌</span>
                          <span>Decline</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 