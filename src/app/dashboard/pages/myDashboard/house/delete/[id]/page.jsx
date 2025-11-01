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
        const res = await fetch(`/api/user/userPostsStatus?id=${id}`);
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin h-16 w-16 border-t-4 border-b-4 border-indigo-600 rounded-full mx-auto mb-4"></div>
          <p className="text-indigo-700 font-medium">Loading post details...</p>
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
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Warning Header */}
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-red-800 mb-2">Delete Post</h1>
              <p className="text-red-700">
                You are about to permanently delete this post. This action cannot be undone and all associated data will be lost.
              </p>
            </div>
          </div>
        </div>

        {/* Post Details */}
        {post && (
          <div className="bg-white shadow-lg rounded-2xl p-6 mb-8 border-2 border-red-200">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                {post.images?.[0] ? (
                  <img
                    src={post.images[0]}
                    alt={post.title}
                    className="rounded-xl w-full h-64 object-cover border-2 border-red-300"
                  />
                ) : (
                  <div className="h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 border-2 border-red-300">
                    No Image
                  </div>
                )}
              </div>
              <div className="md:w-1/2 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                  {post.title}
                </h2>
                <div className="space-y-2 text-gray-700">
                  <p className="flex items-center">
                    <span className="text-red-500 mr-2">📍</span>
                    {post.city}, {post.address}
                  </p>
                  <p className="flex items-center">
                    <span className="text-red-500 mr-2">💰</span>
                    Rent Price:{" "}
                    <span className="font-semibold text-red-600 ml-1">
                      {post.rentPrice} {post.currency}
                    </span>
                  </p>
                  <p className="flex items-center text-sm text-gray-600">
                    <span className="text-red-500 mr-2">📅</span>
                    Available: {formatDate(post.availableFrom)} → {formatDate(post.availableTo)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-red-200">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Once deleted, this post cannot be recovered. Please make sure you want to proceed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg flex items-center justify-center"
              >
                {deleteLoading ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-white rounded-full mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    🗑️ Delete Post Permanently
                  </>
                )}
              </button>
              
              <button
                onClick={() => router.back()}
                disabled={deleteLoading}
                className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition disabled:opacity-50 font-semibold text-lg"
              >
                ← Cancel
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              Note: This action requires double confirmation for security purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}