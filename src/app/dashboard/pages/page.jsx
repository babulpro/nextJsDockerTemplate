"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function ArticlesPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [searchCity, setSearchCity] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [propertyType, setPropertyType] = useState("all");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/user/article", { cache: "no-cache" });
        if (!response.ok) throw new Error("Failed to fetch posts");

        const result = await response.json();
        if (result.status === "success") {
          const publishedPosts = result.data.filter((post) => post.published === true); 
          setPosts(publishedPosts);
          setFilteredPosts(publishedPosts);
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
  }, [1]);

  // 🧭 Filter + Sort logic
  useEffect(() => {
    let filtered = [...posts];

    // Filter by city
    if (searchCity.trim() !== "") {
      filtered = filtered.filter((post) =>
        post.city.toLowerCase().includes(searchCity.toLowerCase())
      );
    }

    // Filter by property type (Room / Flat / Home)
    if (propertyType !== "all") {
      filtered = filtered.filter((post) =>
        post.title?.toLowerCase().includes(propertyType.toLowerCase())
      );
    }

    // Sort by price
    if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => a.rentPrice - b.rentPrice);
    } else if (sortOrder === "highToLow") {
      filtered.sort((a, b) => b.rentPrice - a.rentPrice);
    }

    setFilteredPosts(filtered);
  }, [searchCity, sortOrder, propertyType, posts]);

  const handleCopyLink = async (id) => {
    const url = `${window.location.origin}/dashboard/pages/article/${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const formatPrice = (price, currency) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: currency || "BDT",
    }).format(price);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
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
    <div className="min-h-screen mt-10 bg-gradient-to-br from-slate-500 to-slate-800">
      {/* Header */}
      <div className="text-center py-12 px-4">
         
        <p className="text-slate-300 text-2xl max-w-2xl mx-auto underline">
          Discover amazing rental properties and find your perfect home
        </p>
      </div>

      {/* 🔍 Filters Section */}
      <div className="container mx-auto px-4 pb-10 flex flex-wrap justify-center gap-4">
        {/* City Search */}
        <input
          type="text"
          placeholder="Search by city..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-500"
        />

        {/* Sort by Price */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-500"
        >
          <option value="default">Sort by Price</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>

        {/* Filter by Type */}
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-500"
        >
          <option value="all">All Types</option>
          <option value="room">Room</option>
          <option value="flat">Flat</option>
          <option value="home">Home</option>
        </select>
      </div>

      {/* Property Cards */}
      <div className="container mx-auto px-4 pb-16">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-200 mb-2">
              No properties found
            </h3>
            <p className="text-gray-400">Try changing your filters.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
              >
                {/* Image */}
                {post.images?.[0] && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.images[0]}
                      alt={post.title || "Property image"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                      {formatPrice(post.rentPrice, post.currency)}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {post.city}
                      </p>
                      <p className="text-xs text-gray-500">{post.address}</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {formatDate(post.createdAt)}
                    </p>
                  </div>

                  <Link href={`/dashboard/pages/article/${post.id}`}>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors cursor-pointer">
                      {post.title || "Untitled Property"}
                    </h3>
                  </Link>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      📞 {post.contactNumber || "N/A"}
                    </span>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                      {formatDate(post.availableFrom)} -{" "}
                      {formatDate(post.availableTo)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <Link
                      href={`/dashboard/pages/article/${post.id}`}
                      className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center"
                    >
                      View details →
                    </Link>

                    <button
                      onClick={() => handleCopyLink(post.id)}
                      className={`p-2 rounded-full transition-all ${
                        copiedId === post.id
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-600"
                      }`}
                      title="Copy share link"
                    >
                      {copiedId === post.id ? "✔️" : "🔗"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
