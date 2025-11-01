"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function DeletePostPage() {
  const { id } = useParams(); // postId
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch post details
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/user/userPostsStatus?id=${id}`, {
          next: { revalidate: 60 } // Revalidate every 60 seconds
        });
        const result = await res.json(); 
        if (result.status === "success") {
          setPost(result.data.post);
        } else {
          throw new Error(result.msg || "Failed to load post details");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPost();
  }, [id]);

  const handleDelete = async () => {
    // First confirmation
    const firstConfirm = window.confirm(
      "⚠️ Are you sure you want to delete this post? This action cannot be undone!"
    );
    
    if (!firstConfirm) return;

    // Second confirmation for safety
    const secondConfirm = window.confirm(
      "🚨 FINAL WARNING: This will permanently delete your post and all associated data. Click OK to confirm deletion."
    );

    if (!secondConfirm) return;

    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/user/userPostsStatus?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      
      const result = await res.json();
      
      if (result.status === "success") {
        alert("✅ Post deleted successfully!");
        router.push("/user/posts"); // Redirect to posts list
      } else {
        throw new Error(result.msg || "Failed to delete post");
      }
    } catch (err) {
      alert(err.message || "Error deleting post");
    } finally {
      setDeleteLoading(false);
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center backdrop-blur-lg bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-rose-500 mx-auto mb-6 shadow-lg shadow-rose-500/20"></div>
          <p className="text-rose-100 font-medium text-lg">Loading property details...</p>
          <p className="text-rose-100/60 text-sm mt-2">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center backdrop-blur-lg bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl max-w-md w-full">
          <div className="w-20 h-20 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-full flex items-center justify-center text-rose-400 text-3xl mx-auto mb-6 border border-rose-400/30 shadow-lg shadow-rose-500/10">
            ⚠️
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Oops! Something went wrong</h2>
          <p className="text-rose-100/70 mb-6 leading-relaxed">{error}</p>
          <div className="flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all duration-300 font-semibold shadow-lg shadow-rose-500/20 hover:shadow-rose-500/30"
            >
              Try Again
            </button>
            <button
              onClick={() => router.back()}
              className="flex-1 bg-gradient-to-r from-slate-600 to-gray-700 text-white px-6 py-3 rounded-xl hover:from-slate-700 hover:to-gray-800 transition-all duration-300 font-semibold border border-white/20"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-rose-900/50 to-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Enhanced Warning Header */}
        <div className="backdrop-blur-lg bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-3xl border border-rose-400/30 p-8 mb-8 shadow-2xl shadow-rose-500/10 hover:shadow-rose-500/20 transition-all duration-500">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-rose-500/20">
                ⚠️
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-300 to-pink-300 bg-clip-text text-transparent mb-4">
                Delete Property
              </h1>
              <p className="text-rose-100/80 text-lg leading-relaxed">
                You are about to permanently delete this property listing. This action cannot be undone and all associated data including booking requests will be permanently lost.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Post Details */}
        {post && (
          <div className="backdrop-blur-lg bg-gradient-to-br from-white/10 via-rose-500/5 to-white/5 rounded-3xl border border-rose-400/30 p-6 md:p-8 mb-8 shadow-2xl hover:shadow-3xl transition-all duration-500">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/5">
                {post.images?.[0] ? (
                  <div className="relative group">
                    <img
                      src={post.images[0]}
                      alt={post.title}
                      className="rounded-2xl w-full h-64 object-cover border border-rose-400/30 shadow-lg group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-rose-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ) : (
                  <div className="h-64 bg-gradient-to-br from-rose-500/10 to-pink-500/10 rounded-2xl border border-rose-400/30 flex items-center justify-center text-rose-100/70 shadow-inner">
                    <div className="text-center">
                      <div className="text-5xl mb-3 opacity-60">🏠</div>
                      <p className="text-lg">No Image Available</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="lg:w-3/5 flex flex-col justify-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                  {post.title}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-rose-100/80 group">
                    <div className="w-12 h-12 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-rose-400/30">
                      <span className="text-rose-400 text-xl">📍</span>
                    </div>
                    <div>
                      <div className="text-sm text-rose-100/60">Location</div>
                      <div className="group-hover:text-white transition-colors">
                        {post.city}, {post.address}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-rose-100/80 group">
                    <div className="w-12 h-12 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-rose-400/30">
                      <span className="text-rose-400 text-xl">💰</span>
                    </div>
                    <div>
                      <div className="text-sm text-rose-100/60">Rent Price</div>
                      <div className="font-semibold text-rose-300 text-xl group-hover:text-rose-200 transition-colors">
                        {post.rentPrice} {post.currency}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-rose-100/80 group">
                    <div className="w-12 h-12 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-rose-400/30">
                      <span className="text-rose-400 text-xl">📅</span>
                    </div>
                    <div>
                      <div className="text-sm text-rose-100/60">Availability</div>
                      <div className="group-hover:text-white transition-colors">
                        {formatDate(post.availableFrom)} → {formatDate(post.availableTo)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Action Buttons */}
        <div className="backdrop-blur-lg bg-gradient-to-br from-white/10 via-rose-500/5 to-white/5 rounded-3xl border border-rose-400/30 p-8 shadow-2xl hover:shadow-3xl transition-all duration-500">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center border border-rose-400/30">
                <span className="text-rose-400 text-xl">🗑️</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-rose-300 to-pink-300 bg-clip-text text-transparent">
                Confirm Deletion
              </h3>
            </div>
            
            <p className="text-rose-100/70 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
              Once deleted, this property listing and all its data cannot be recovered. 
              Please make absolutely sure you want to proceed with this permanent action.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-10 py-4 rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg flex items-center justify-center gap-3 shadow-lg shadow-rose-500/20 hover:shadow-rose-500/30 hover:scale-105 min-w-64"
              >
                {deleteLoading ? (
                  <>
                    <div className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Deleting Property...</span>
                  </>
                ) : (
                  <>
                    <span className="text-xl">🗑️</span>
                    <span>Delete Property Permanently</span>
                  </>
                )}
              </button>
              
              <button
                onClick={() => router.back()}
                disabled={deleteLoading}
                className="bg-gradient-to-r from-slate-600 to-gray-700 text-white px-10 py-4 rounded-xl hover:from-slate-700 hover:to-gray-800 transition-all duration-300 disabled:opacity-50 font-semibold text-lg flex items-center justify-center gap-3 border border-white/20 shadow-lg hover:scale-105 min-w-48"
              >
                <span className="text-xl">←</span>
                <span>Cancel</span>
              </button>
            </div>
            
            <div className="mt-8 p-4 backdrop-blur-lg bg-rose-500/10 rounded-2xl border border-rose-400/20">
              <p className="text-rose-200/80 text-sm flex items-center justify-center gap-2">
                <span className="text-rose-400">🔒</span>
                This action requires double confirmation for security purposes. All data will be permanently erased.
              </p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="text-center mt-8">
          <p className="text-rose-100/50 text-sm flex items-center justify-center gap-2">
            <span>⚠️</span>
            Deletion is immediate and irreversible. Proceed with caution.
          </p>
        </div>
      </div>
    </div>
  );
}