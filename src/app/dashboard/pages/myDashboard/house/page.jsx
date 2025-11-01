"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/user/userPost", {cache:"no-store" });
        if (!response.ok) throw new Error("Failed to fetch posts");
        
        const result = await response.json(); 
        if (result.status === "success") {
          setPosts(result.data);
        } else {
          throw new Error(result.msg || "Failed to load posts");
        }
      } catch (e) {
        setError(e.message || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
 
  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: currency || 'BDT',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!isClient) return "";
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return "Invalid date";
    }
  };
 
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-emerald-100 font-medium">Loading your properties...</p>
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
          <h2 className="text-2xl font-bold text-white mb-2">Oops!</h2>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="text-center py-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">
          🏠 My Properties
        </h1>
        <p className="text-emerald-100/70 text-lg max-w-2xl mx-auto">
          Manage and track all your rental properties in one place
        </p>
        
        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center">
            <div className="text-2xl font-bold text-white">{posts.length}</div>
            <div className="text-emerald-100/70 text-sm">Total</div>
          </div>
          <div className="bg-green-500/20 backdrop-blur-sm rounded-2xl p-4 border border-green-400/30 text-center">
            <div className="text-2xl font-bold text-green-300">
              {posts.filter(p => p.published).length}
            </div>
            <div className="text-green-200/70 text-sm">Published</div>
          </div>
          <div className="bg-yellow-500/20 backdrop-blur-sm rounded-2xl p-4 border border-yellow-400/30 text-center">
            <div className="text-2xl font-bold text-yellow-300">
              {posts.filter(p => !p.published).length}
            </div>
            <div className="text-yellow-200/70 text-sm">Draft</div>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="container mx-auto px-4 pb-16">
        {posts.length === 0 ? (
          <div className="text-center bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 text-3xl mx-auto mb-4 border border-emerald-400/30">
              🏠
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No Properties Listed
            </h3>
            <p className="text-emerald-100/70 mb-6">
              You haven't listed any properties yet. Start by creating your first listing!
            </p>
            <Link
              href="/dashboard/pages/article/create"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all font-semibold text-lg inline-flex items-center gap-2"
            >
              🚀 Create First Property
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/20 shadow-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                {/* Image */}
                {post.images && post.images.length > 0 && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.images[0]}
                      alt={post.title || "Property image"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-lg">
                      {formatPrice(post.rentPrice, post.currency)}
                    </div>
                    <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold border ${
                      post.published 
                        ? "bg-green-500/20 text-green-300 border-green-400/30" 
                        : "bg-yellow-500/20 text-yellow-300 border-yellow-400/30"
                    }`}>
                      {post.published ? "🟢 Published" : "🟡 Draft"}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Location & Date */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm font-semibold text-emerald-300">
                        {post.city}
                      </p>
                      <p className="text-xs text-emerald-100/70">
                        {post.address}
                      </p>
                    </div>
                    <p className="text-xs text-emerald-100/60">
                      {formatDate(post.createdAt)}
                    </p>
                  </div>

                  {/* Title */}
                  <Link href={`/dashboard/pages/article/${post.id}`}>
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-emerald-300 transition-colors cursor-pointer">
                      {post.title || "Untitled Property"}
                    </h3>
                  </Link>

                  {/* Description */}
                  <p className="text-emerald-100/80 text-sm mb-4 line-clamp-3">
                    {post.description || "No description available"}
                  </p>

                  {/* Property Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-emerald-100/70 text-sm">
                      <span>📞</span>
                      <span>{post.contactNumber || "Not provided"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-100/70 text-sm">
                      <span>📅</span>
                      <span>Available: {formatDate(post.availableFrom)} - {formatDate(post.availableTo)}</span>
                    </div>
                  </div>

                  {/* Posted By */}
                  {post.user && (
                    <div className="flex items-center gap-3 mb-4 p-3 bg-white/10 rounded-xl border border-white/20">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {post.user.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-white truncate">
                          {post.user.name || "Unknown User"}
                        </p>
                        <p className="text-xs text-emerald-100/70 truncate">
                          {post.user.phone || "No phone provided"}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Link 
                      href={`/dashboard/pages/myDashboard/house/${post.id}`}
                      className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 px-3 py-2 rounded-xl border border-blue-400/30 hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300 font-semibold text-sm text-center flex items-center justify-center gap-1"
                    >
                      <span>👀</span>
                      <span>Requests</span>
                    </Link>

                    <Link 
                      href={`/dashboard/pages/myDashboard/house/edit/${post.id}`}
                      className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 px-3 py-2 rounded-xl border border-amber-400/30 hover:from-amber-500/30 hover:to-orange-500/30 transition-all duration-300 font-semibold text-sm text-center flex items-center justify-center gap-1"
                    >
                      <span>✏️</span>
                      <span>Edit</span>
                    </Link>
                  </div>

                  {/* Delete Button - Full Width */}
                  <div className="mt-3">
                    <Link 
                      href={`/dashboard/pages/myDashboard/house/delete/${post.id}`}
                      className="w-full bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 px-3 py-2 rounded-xl border border-red-400/30 hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-300 font-semibold text-sm text-center flex items-center justify-center gap-1"
                    >
                      <span>🗑️</span>
                      <span>Delete Property</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <Link
        href="/dashboard/pages/article/create"
        className="fixed bottom-8 right-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-5 rounded-2xl shadow-2xl hover:from-emerald-600 hover:to-teal-700 transition-all transform hover:scale-110 hover:shadow-2xl group"
        title="Create new property"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">🏠</span>
          <span className="font-semibold group-hover:translate-x-1 transition-transform hidden sm:block">
            Add Property
          </span>
        </div>
      </Link>

      {/* Footer Info */}
      {posts.length > 0 && (
        <div className="text-center pb-8">
          <p className="text-emerald-100/50 text-sm">
            Showing {posts.length} propert{posts.length !== 1 ? 'ies' : 'y'} • 
            Last updated: {isClient ? new Date().toLocaleDateString() : ''}
          </p>
        </div>
      )}
    </div>
  );
}