"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        console.log("🔄 Fetching bookings...");
        const response = await fetch("/api/user/userBookingList", {
          cache: 'no-store',
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
          const bookingsData = result.data;
          console.log("📦 Bookings data:", bookingsData);
          
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
    if (!isClient) return ""; // Prevent hydration mismatch
    try {
      const options = { day: "numeric", month: "short", year: "numeric" };
      return new Date(dateString).toLocaleDateString("en-US", options);
    } catch (error) {
      return "Invalid date";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return {
          bg: "bg-yellow-500/20",
          text: "text-yellow-300",
          border: "border-yellow-400/30",
          icon: "⏳"
        };
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
      default:
        return {
          bg: "bg-gray-500/20",
          text: "text-gray-300",
          border: "border-gray-400/30",
          icon: "❓"
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-emerald-100 font-medium">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
        <div className="text-center bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl w-full max-w-md">
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

  if (!bookings.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
        <div className="text-center bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl max-w-md w-full">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 text-3xl mx-auto mb-4 border border-emerald-400/30">
            📅
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">No Bookings Yet</h2>
          <p className="text-emerald-100/70 mb-6">You haven't made any booking requests yet.</p>
          <Link 
            href="/dashboard/pages/article"
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all font-semibold inline-block"
          >
            Browse Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">
            📋 Your Booking Requests
          </h1>
          <p className="text-emerald-100/70 text-lg">
            Manage and track all your property bookings
          </p>
          
          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center">
              <div className="text-2xl font-bold text-white">{bookings.length}</div>
              <div className="text-emerald-100/70 text-sm">Total</div>
            </div>
            <div className="bg-yellow-500/20 backdrop-blur-sm rounded-2xl p-4 border border-yellow-400/30 text-center">
              <div className="text-2xl font-bold text-yellow-300">
                {bookings.filter(b => b.status === "PENDING").length}
              </div>
              <div className="text-yellow-200/70 text-sm">Pending</div>
            </div>
            <div className="bg-green-500/20 backdrop-blur-sm rounded-2xl p-4 border border-green-400/30 text-center">
              <div className="text-2xl font-bold text-green-300">
                {bookings.filter(b => b.status === "CONFIRMED").length}
              </div>
              <div className="text-green-200/70 text-sm">Confirmed</div>
            </div>
          </div>
        </div>

        {/* Bookings Grid */}
        <div className="grid gap-6">
          {bookings.map((booking) => {
            const post = booking.post;
            const statusColors = getStatusColor(booking.status);
            
            return (
              <div
                key={booking.id}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-white/20 p-6 shadow-2xl hover:shadow-2xl transition-all duration-300 hover:border-emerald-400/30"
              >
                {/* Property Header */}
                <Link
                  href={`/dashboard/pages/article/${post.id}`}
                  className="flex flex-col lg:flex-row items-start gap-4 mb-6 hover:opacity-90 transition-opacity"
                >
                  <div className="w-full lg:w-32 h-48 lg:h-32 rounded-2xl overflow-hidden border border-white/20 flex-shrink-0">
                    <img
                      src={post.images?.[0] || "/default-house.jpg"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <div className="flex flex-wrap gap-3 text-emerald-100/80">
                      <span className="flex items-center gap-1 text-sm">
                        📍 {post.city}, {post.address}
                      </span>
                      <span className="flex items-center gap-1 text-sm font-semibold text-emerald-300">
                        💰 {post.rentPrice} {post.currency}/month
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Booking Details */}
                <div className="grid lg:grid-cols-2 gap-6 mb-6">
                  {/* Dates & Price */}
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                      <h3 className="text-white font-semibold mb-3 flex items-center">
                        <span className="text-emerald-400 mr-2">📅</span>
                        Booking Period
                      </h3>
                      <div className="space-y-2 text-emerald-100/80">
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
                    
                    <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                      <h3 className="text-white font-semibold mb-3 flex items-center">
                        <span className="text-emerald-400 mr-2">💰</span>
                        Price Details
                      </h3>
                      <div className="text-emerald-100/80">
                        <div className="flex justify-between items-center">
                          <span>Proposed Price:</span>
                          <span className="text-emerald-300 font-bold text-lg">
                            {booking.proposedPrice?.toLocaleString() || 'N/A'} {post.currency}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message & Status */}
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                      <h3 className="text-white font-semibold mb-3 flex items-center">
                        <span className="text-emerald-400 mr-2">💬</span>
                        Your Message
                      </h3>
                      <p className="text-emerald-100/80 italic">
                        {booking.message || "No additional message provided"}
                      </p>
                    </div>
                    
                    <div className={`rounded-2xl p-4 border ${statusColors.border} ${statusColors.bg}`}>
                      <h3 className="text-white font-semibold mb-3 flex items-center">
                        <span className={`mr-2 ${statusColors.text}`}>{statusColors.icon}</span>
                        Booking Status
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className={`font-bold text-lg ${statusColors.text}`}>
                          {booking.status}
                        </span>
                        <span className="text-emerald-100/60 text-sm">
                          Requested {formatDate(booking.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-white/20">
                  <Link
                    href={`/dashboard/pages/article/${post.id}`}
                    className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 px-4 py-2 rounded-xl border border-blue-400/30 hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300 font-semibold text-sm"
                  >
                    👀 View Property
                  </Link>
                  <button className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 px-4 py-2 rounded-xl border border-emerald-400/30 hover:from-emerald-500/30 hover:to-teal-500/30 transition-all duration-300 font-semibold text-sm">
                    📞 Contact Host
                  </button>
                  {booking.status === "PENDING" && (
                    <button className="bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 px-4 py-2 rounded-xl border border-red-400/30 hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-300 font-semibold text-sm">
                      🗑️ Cancel Request
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-12 pt-6 border-t border-white/20">
          <p className="text-emerald-100/50 text-sm">
            Showing {bookings.length} booking{bookings.length !== 1 ? 's' : ''} • 
            Last updated: {isClient ? new Date().toLocaleDateString() : ''}
          </p>
        </div>
      </div>
    </div>
  );
}