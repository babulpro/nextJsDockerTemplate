"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/user/userPost", { cache: 'no-cache' });
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
 
  // const handleCopyLink = async (id) => {
  //   const url = `${window.location.origin}/dashboard/pages/article/${id}`;
  //   try {
  //     await navigator.clipboard.writeText(url);
  //     setCopiedId(id);
  //     setTimeout(() => setCopiedId(null), 2000);
  //   } catch (err) {
  //     console.error("Failed to copy link:", err);
  //   }
  // };

  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: currency || 'BDT',
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-red-500 text-4xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-300 to-white">
      {/* Header */}
      <div className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          🏠 Available Properties
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover amazing rental properties and find your perfect home
        </p>
      </div>

      {/* Properties Grid */}
      <div className="container mx-auto px-4 pb-16">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No properties available
            </h3>
            <p className="text-gray-500">
              Be the first to list a property!
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
              >
                {/* Images */}
                {post.images && post.images.length > 0 && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.images[0]}
                      alt={post.title || "Property image"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                      {formatPrice(post.rentPrice, post.currency)}
                    </div>
                    <div className="absolute inset-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Location & Date */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {post.city}
                      </p>
                      <p className="text-xs text-gray-500">
                        {post.address}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {formatDate(post.createdAt)}
                    </p>
                  </div>

                  {/* Title */}
                  <Link href={`/dashboard/pages/article/${post.id}`}>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors cursor-pointer">
                      {post.title || "Untitled Property"}
                    </h3>
                  </Link>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.description || "No description available"}
                  </p>

                  {/* Property Details */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      📞 {post.contactNumber || "N/A"}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      post.published 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {post.published ? "✅ Published" : "❌ Unpublished"}
                    </span>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                      Available: {formatDate(post.availableFrom)} - {formatDate(post.availableTo)}
                    </span>
                  </div>

                  {/* Posted By */}
                  {post.user && (
                    <div className="flex items-center gap-2 mb-4 p-2 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-indigo-600 text-sm font-semibold">
                          {post.user.name?.charAt(0) || "U"}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {post.user.name || "Unknown User"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {post.user.phone || "No phone"}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <Link 
                      href={`/dashboard/pages/myDashboard/house/${post.id}`}
                      className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center"
                    >
                      View All Request
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
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
        className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-110"
        title="Create new property"
      >
        
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </Link>
    </div>
  );
}