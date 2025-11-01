"use client";
import React, { useState, useEffect } from "react";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock data for demonstration
  const mockPosts = [
    {
      id: 1,
      title: "Luxury Apartment in Gulshan",
      city: "Dhaka",
      rentPrice: 45000,
      currency: "BDT",
      published: true,
      availableFrom: "2024-01-15",
      availableTo: "2024-12-31",
      bookings: [
        { status: "CONFIRMED" },
        { status: "PENDING" },
        { status: "CONFIRMED" },
        { status: "CANCELLED" }
      ],
      user: { name: "John Doe" }
    },
    {
      id: 2,
      title: "Cozy Room in Banani",
      city: "Dhaka",
      rentPrice: 15000,
      currency: "BDT",
      published: false,
      availableFrom: "2024-02-01",
      availableTo: "2024-06-30",
      bookings: [
        { status: "PENDING" },
        { status: "PENDING" }
      ],
      user: { name: "Sarah Smith" }
    },
    {
      id: 3,
      title: "Modern Flat in Uttara",
      city: "Dhaka",
      rentPrice: 35000,
      currency: "BDT",
      published: true,
      availableFrom: "2024-01-20",
      availableTo: "2024-11-30",
      bookings: [
        { status: "CONFIRMED" },
        { status: "CONFIRMED" },
        { status: "CONFIRMED" },
        { status: "PENDING" },
        { status: "CANCELLED" }
      ],
      user: { name: "Mike Johnson" }
    },
    {
      id: 4,
      title: "Family Home in Dhanmondi",
      city: "Dhaka",
      rentPrice: 60000,
      currency: "BDT",
      published: true,
      availableFrom: "2024-03-01",
      availableTo: "2024-12-31",
      bookings: [
        { status: "PENDING" }
      ],
      user: { name: "Emma Wilson" }
    },
    {
      id: 5,
      title: "Studio Apartment in Mirpur",
      city: "Dhaka",
      rentPrice: 12000,
      currency: "BDT",
      published: false,
      availableFrom: "2024-02-15",
      availableTo: "2024-08-31",
      bookings: [],
      user: { name: "David Brown" }
    }
  ];

  useEffect(() => {
    // Simulate API call with mock data
    setLoading(true);
    const timer = setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // ✅ Format date nicely
  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  // ✅ Toggle publish status
  const handleTogglePublish = async (id, currentStatus) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, published: !currentStatus } : p
      )
    );
  };

  // ✅ Delete post
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  // ✅ Count booking status
  const getBookingSummary = (bookings = []) => {
    const summary = { confirmed: 0, pending: 0, cancelled: 0 };
    bookings.forEach((b) => {
      if (b.status === "CONFIRMED") summary.confirmed++;
      if (b.status === "PENDING") summary.pending++;
      if (b.status === "CANCELLED") summary.cancelled++;
    });
    return summary;
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-emerald-100 font-medium">Loading posts...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center text-red-400 text-2xl mx-auto mb-4 border border-red-400/30">
            ⚠️
          </div>
          <p className="text-red-300 text-lg">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-10 px-4 md:px-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">
            🛠 Admin Post Management
          </h1>
          <p className="text-emerald-100/70 text-lg">
            Manage and monitor all property listings (Demo Data)
          </p>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-white/20 p-12 text-center shadow-2xl">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 text-3xl mx-auto mb-4 border border-emerald-400/30">
              📝
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Posts Found</h3>
            <p className="text-emerald-100/70">There are no property listings to manage at the moment.</p>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-b border-white/10 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">
                  Property Listings ({posts.length})
                </h2>
                <div className="text-emerald-100/70 text-sm">
                  Demo Data • Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="px-6 py-4 text-left text-emerald-100/80 font-semibold">Title</th>
                    <th className="px-6 py-4 text-left text-emerald-100/80 font-semibold">City</th>
                    <th className="px-6 py-4 text-left text-emerald-100/80 font-semibold">Rent</th>
                    <th className="px-6 py-4 text-left text-emerald-100/80 font-semibold">Available</th>
                    <th className="px-6 py-4 text-left text-emerald-100/80 font-semibold">Bookings</th>
                    <th className="px-6 py-4 text-left text-emerald-100/80 font-semibold">User</th>
                    <th className="px-6 py-4 text-left text-emerald-100/80 font-semibold">Status</th>
                    <th className="px-6 py-4 text-center text-emerald-100/80 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => {
                    const bookingSummary = getBookingSummary(post.bookings);
                    return (
                      <tr
                        key={post.id}
                        className="border-b border-white/10 hover:bg-white/5 transition-all duration-300 group"
                      >
                        {/* Title */}
                        <td className="px-6 py-4">
                          <div className="font-medium text-white group-hover:text-emerald-300 transition-colors">
                            {post.title}
                          </div>
                        </td>

                        {/* City */}
                        <td className="px-6 py-4">
                          <span className="text-emerald-100/80 bg-white/10 px-3 py-1 rounded-full text-xs border border-white/20">
                            {post.city}
                          </span>
                        </td>

                        {/* Rent */}
                        <td className="px-6 py-4">
                          <div className="text-emerald-300 font-semibold">
                            {post.rentPrice} {post.currency}
                          </div>
                        </td>

                        {/* Availability Dates */}
                        <td className="px-6 py-4">
                          <div className="text-xs text-emerald-100/70 space-y-1">
                            <div className="flex items-center space-x-1">
                              <span className="text-emerald-400">📅</span>
                              <span>From: {formatDate(post.availableFrom)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="text-emerald-400">→</span>
                              <span>To: {formatDate(post.availableTo)}</span>
                            </div>
                          </div>
                        </td>

                        {/* Booking Summary */}
                        <td className="px-6 py-4">
                          <div className="space-y-1 text-xs">
                            <div className="flex items-center space-x-2 text-green-400">
                              <span>✅</span>
                              <span>Confirmed: {bookingSummary.confirmed}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-yellow-400">
                              <span>⏳</span>
                              <span>Pending: {bookingSummary.pending}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-red-400">
                              <span>❌</span>
                              <span>Cancelled: {bookingSummary.cancelled}</span>
                            </div>
                          </div>
                        </td>

                        {/* User */}
                        <td className="px-6 py-4">
                          <div className="text-emerald-100/80 bg-white/10 px-3 py-1 rounded-full text-xs border border-white/20 inline-block">
                            {post.user?.name || "Unknown"}
                          </div>
                        </td>

                        {/* Publish Status */}
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleTogglePublish(post.id, post.published)}
                            className={`px-4 py-2 rounded-xl font-semibold text-sm border transition-all duration-300 ${
                              post.published
                                ? "bg-green-500/20 text-green-300 border-green-400/30 hover:bg-green-500/30"
                                : "bg-yellow-500/20 text-yellow-300 border-yellow-400/30 hover:bg-yellow-500/30"
                            }`}
                          >
                            {post.published ? "🟢 Published" : "🟡 Pending"}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 px-4 py-2 rounded-xl border border-red-400/30 hover:from-red-500/30 hover:to-pink-500/30 hover:border-red-300/50 transition-all duration-300 font-semibold text-sm"
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="bg-white/5 border-t border-white/10 p-4">
              <div className="flex justify-between items-center text-emerald-100/60 text-sm">
                <div>Showing {posts.length} demo properties</div>
                <div>HouseRent Admin Panel • Frontend Demo</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demo Notice */}
      <div className="max-w-7xl mx-auto mt-6">
        <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-lg rounded-2xl border border-blue-400/30 p-4 text-center">
          <p className="text-blue-200 text-sm">
            💡 This is a frontend demo with mock data. Connect to your backend API when ready.
          </p>
        </div>
      </div>
    </div>
  );
}