"use client";
import React, { useState, useEffect } from "react";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/admin/posts/allposts", { cache: "no-store" });
        const result = await res.json();

        if (result.status === "success") {
          setPosts(result.data);
        } else {
          setError(result.msg || "Failed to load posts");
        }
      } catch (err) {
        setError(err.message || "Error fetching posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
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
    try {
      const res = await fetch(`/api/admin/posts/approve`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, published: !currentStatus }),
      });

      const result = await res.json();
      if (result.status === "success") {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, published: !currentStatus } : p
          )
        );
      } else {
        alert(result.msg || "Failed to update publish status");
      }
    } catch (err) {
      alert("Error updating publish status");
    }
  };

  // ✅ Delete post
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`/api/admin/posts/delete?id=${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.status === "success") {
        setPosts((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert(result.msg || "Failed to delete post");
      }
    } catch (err) {
      alert("Error deleting post");
    }
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
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading posts...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-500 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        🛠 Admin – Manage Posts
      </h1>

      {posts.length === 0 ? (
        <div className="text-center text-gray-500">No posts found.</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3">Rent</th>
                <th className="px-4 py-3">Available</th>
                <th className="px-4 py-3">Bookings</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => {
                const bookingSummary = getBookingSummary(post.bookings);
                return (
                  <tr
                    key={post.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 font-medium">{post.title}</td>
                    <td className="px-4 py-3">{post.city}</td>
                    <td className="px-4 py-3">
                      {post.rentPrice} {post.currency}
                    </td>

                    {/* ✅ Availability Dates */}
                    <td className="px-4 py-3 text-xs">
                      <p>From: {formatDate(post.availableFrom)}</p>
                      <p>To: {formatDate(post.availableTo)}</p>
                    </td>

                    {/* ✅ Booking Summary */}
                    <td className="px-4 py-3 space-y-1">
                      <p className="text-green-600 text-xs">
                        ✅ Confirmed: {bookingSummary.confirmed}
                      </p>
                      <p className="text-yellow-600 text-xs">
                        ⏳ Pending: {bookingSummary.pending}
                      </p>
                      <p className="text-red-600 text-xs">
                        ❌ Cancelled: {bookingSummary.cancelled}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      {post.user?.name || "Unknown"}
                    </td>

                    {/* ✅ Publish toggle */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() =>
                          handleTogglePublish(post.id, post.published)
                        }
                        className={`px-3 py-1 rounded font-semibold ${
                          post.published
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                        }`}
                      >
                        {post.published ? "Published" : "Pending"}
                      </button>
                    </td>

                    {/* ✅ Actions */}
                    <td className="px-4 py-3 text-center space-x-2">
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
