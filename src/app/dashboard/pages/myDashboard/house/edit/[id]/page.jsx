"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [data, setData] = useState({
    title: "",
    description: "",
    rentPrice: "",
    currency: "BDT",
    city: "",
    address: "",
    contactNumber: "",
    published: true,
    availableFrom: "",
    availableTo: "", 
    images: ["", "", "", "", ""],
  });

  // Fetch existing post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/article/byId?id=${id}`,{cache:"no-store"});
        
        if (!res.ok) throw new Error("Failed to fetch post");
        
        const result = await res.json();
        
        if (result.status === "success" && result.data) {
          const post = result.data;
          
          // Convert UTC dates back to local date format for input fields
          const formatDateForInput = (dateString) => {
            if (!dateString) return "";
            const date = new Date(dateString);
            return date.toISOString().split('T')[0];
          };

          setData({
            title: post.title || "",
            description: post.description || "",
            rentPrice: post.rentPrice || "",
            currency: post.currency || "BDT",
            city: post.city || "",
            address: post.address || "",
            contactNumber: post.contactNumber || "",
            published: post.published !== false,
            availableFrom: formatDateForInput(post.availableFrom),
            availableTo: formatDateForInput(post.availableTo),
            images: post.images && post.images.length > 0 
              ? [...post.images, "", "", "", ""].slice(0, 5) 
              : ["", "", "", "", ""],
          });
        } else {
          throw new Error(result.msg || "Post not found");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  const InputChange = (name, value) => {
    setData((pre) => ({ ...pre, [name]: value }));
  };

  const ImageChange = (index, value) => {
    const updatedImages = [...data.images];
    updatedImages[index] = value;
    setData((pre) => ({ ...pre, images: updatedImages }));
  };

  const addImageField = () => {
    setData(pre => ({
      ...pre,
      images: [...pre.images, ""]
    }));
  };

  const removeImageField = (index) => {
    if (data.images.length <= 1) return;
    const updatedImages = data.images.filter((_, i) => i !== index);
    setData(pre => ({ ...pre, images: updatedImages }));
  };

  // Date helpers
  const toUtcStartOfDay = (yyyyMmDd) => {
    if (!yyyyMmDd) return null;
    const [y, m, d] = yyyyMmDd.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d, 0, 0, 0, 0)).toISOString();
  };

  const toUtcEndOfDay = (yyyyMmDd) => {
    if (!yyyyMmDd) return null;
    const [y, m, d] = yyyyMmDd.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d, 23, 59, 59, 999)).toISOString();
  };

  const FormSubmitHandler = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Validation
      if (!data.title.trim()) {
        alert("Please enter a title for your rental");
        return;
      }

      if (!data.availableFrom || !data.availableTo) {
        alert("Please choose both available from and to dates.");
        return;
      }

      const priceNumber = Number(data.rentPrice);
      if (!Number.isFinite(priceNumber) || priceNumber <= 0) {
        alert("Please enter a valid rent price.");
        return;
      }

      // Build payload
      const payload = {
        title: data.title.trim(),
        description: data.description.trim(),
        currency: data.currency,
        city: data.city.trim(),
        address: data.address.trim(),
        contactNumber: data.contactNumber.trim(),
        published: data.published,
        availableFrom: toUtcStartOfDay(data.availableFrom),
        availableTo: toUtcEndOfDay(data.availableTo),
        rentPrice: priceNumber,
        images: data.images.filter((img) => img.trim() !== ""),
      };

      const response = await fetch(`/api/user/article/update?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.status === "success") {
        alert("🎉 Post updated successfully!");
        router.back();
      } else {
        alert(result.msg || "Failed to update post");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating post. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.back();
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center backdrop-blur-lg bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl max-w-md w-full">
          <div className="w-20 h-20 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-full flex items-center justify-center text-rose-400 text-3xl mx-auto mb-6 border border-rose-400/30 shadow-lg shadow-rose-500/10">
            ⚠️
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Oops! Something went wrong</h2>
          <p className="text-emerald-100/70 mb-6 leading-relaxed">{error}</p>
          <div className="flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
            >
              Try Again
            </button>
            <button
              onClick={handleCancel}
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-500/20">
              ✏️
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Edit Property
            </h1>
          </div>
          <p className="text-emerald-100/70 text-xl max-w-2xl mx-auto leading-relaxed">
            Update your property details and attract more tenants with accurate information
          </p>
        </div>

        {/* Enhanced Form Card */}
        <div className="backdrop-blur-lg bg-gradient-to-br from-white/10 via-purple-500/5 to-white/5 rounded-3xl border border-white/20 shadow-2xl p-6 md:p-8 hover:shadow-3xl transition-all duration-500">
          <form onSubmit={FormSubmitHandler} className="space-y-8">
            {/* Basic Information Section */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-emerald-200 mb-3 flex items-center gap-2">
                  <span className="text-emerald-400">🏠</span>
                  Property Type *
                </label>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => InputChange("title", e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 transition-all duration-300 text-white placeholder-emerald-100/40 backdrop-blur-lg"
                  placeholder="e.g., 3-Bedroom Apartment, Studio, Villa"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-200 mb-3 flex items-center gap-2">
                  <span className="text-emerald-400">💰</span>
                  Rent Price ({data.currency}) *
                </label>
                <input
                  type="number"
                  value={data.rentPrice}
                  onChange={(e) => InputChange("rentPrice", e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 transition-all duration-300 text-white placeholder-emerald-100/40 backdrop-blur-lg"
                  placeholder="Enter monthly rent"
                  min="0"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-emerald-200 mb-3 flex items-center gap-2">
                <span className="text-emerald-400">📝</span>
                Property Description *
              </label>
              <textarea
                value={data.description}
                onChange={(e) => InputChange("description", e.target.value)}
                rows="4"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 transition-all duration-300 text-white placeholder-emerald-100/40 backdrop-blur-lg resize-vertical"
                placeholder="Describe the property features, amenities, location advantages..."
                required
              />
            </div>

            {/* Location Section */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-emerald-200 mb-3 flex items-center gap-2">
                  <span className="text-emerald-400">🏙️</span>
                  City *
                </label>
                <input
                  type="text"
                  value={data.city}
                  onChange={(e) => InputChange("city", e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 transition-all duration-300 text-white placeholder-emerald-100/40 backdrop-blur-lg"
                  placeholder="e.g., Dhaka, Chittagong"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-200 mb-3 flex items-center gap-2">
                  <span className="text-emerald-400">📞</span>
                  Contact Number *
                </label>
                <input
                  type="text"
                  value={data.contactNumber}
                  onChange={(e) => InputChange("contactNumber", e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 transition-all duration-300 text-white placeholder-emerald-100/40 backdrop-blur-lg"
                  placeholder="+8801XXXXXXXXX"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-200 mb-3 flex items-center gap-2">
                <span className="text-emerald-400">📍</span>
                Full Address *
              </label>
              <input
                type="text"
                value={data.address}
                onChange={(e) => InputChange("address", e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 transition-all duration-300 text-white placeholder-emerald-100/40 backdrop-blur-lg"
                placeholder="Detailed address with area, road, building info..."
                required
              />
            </div>

            {/* Availability Section */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-emerald-200 mb-3 flex items-center gap-2">
                  <span className="text-emerald-400">📅</span>
                  Available From *
                </label>
                <input
                  type="date"
                  value={data.availableFrom}
                  onChange={(e) => InputChange("availableFrom", e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 transition-all duration-300 text-white backdrop-blur-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-200 mb-3 flex items-center gap-2">
                  <span className="text-emerald-400">📅</span>
                  Available To *
                </label>
                <input
                  type="date"
                  value={data.availableTo}
                  onChange={(e) => InputChange("availableTo", e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 transition-all duration-300 text-white backdrop-blur-lg"
                  required
                />
              </div>
            </div>

            {/* Enhanced Images Section */}
            <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <label className="block text-lg font-semibold text-emerald-200 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center border border-emerald-400/30">
                    <span className="text-emerald-400 text-lg">🖼️</span>
                  </div>
                  Property Images
                </label>
                <button
                  type="button"
                  onClick={addImageField}
                  className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 px-4 py-2 rounded-xl border border-emerald-400/30 hover:from-emerald-500/30 hover:to-teal-500/30 transition-all duration-300 font-semibold flex items-center gap-2 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20"
                >
                  <span>+</span>
                  <span>Add Image</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {data.images.map((img, idx) => (
                  <div key={idx} className="flex gap-3 items-center group">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder={`Image URL ${idx + 1} (https://example.com/image.jpg)`}
                        value={img}
                        onChange={(e) => ImageChange(idx, e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 transition-all duration-300 text-white placeholder-emerald-100/40 backdrop-blur-lg"
                      />
                    </div>
                    {data.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(idx)}
                        className="px-4 py-3 bg-gradient-to-r from-rose-500/20 to-pink-500/20 text-rose-300 rounded-xl border border-rose-400/30 hover:from-rose-500/30 hover:to-pink-500/30 transition-all duration-300 font-semibold shadow-lg shadow-rose-500/10 opacity-0 group-hover:opacity-100"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm text-emerald-100/60 mt-4 flex items-center gap-2">
                <span>💡</span>
                Add high-quality image URLs to showcase your property (4-5 recommended)
              </p>
            </div>

            {/* Enhanced Publish Toggle */}
            <div className="flex items-center justify-between p-6 backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center border border-emerald-400/30">
                  <span className="text-emerald-400 text-lg">🌐</span>
                </div>
                <div>
                  <label className="block text-lg font-semibold text-emerald-200">
                    Publish Status
                  </label>
                  <p className="text-sm text-emerald-100/70">
                    {data.published ? "✅ Your post is visible to everyone" : "🚫 Your post is hidden from public"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => InputChange("published", !data.published)}
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-all duration-300 shadow-lg ${
                  data.published 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 shadow-emerald-500/20' 
                    : 'bg-gradient-to-r from-slate-600 to-gray-700 shadow-slate-500/20'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-all duration-300 shadow-lg ${
                    data.published ? 'translate-x-9' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex gap-4 pt-8 border-t border-white/20">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-105 flex items-center justify-center gap-3"
              >
                {saving ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Updating Property...</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg">💾</span>
                    <span className="text-lg">Update Property</span>
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={handleCancel}
                className="px-8 py-4 bg-gradient-to-r from-slate-600 to-gray-700 text-white rounded-xl font-semibold hover:from-slate-700 hover:to-gray-800 transition-all duration-300 border border-white/20 shadow-lg hover:scale-105 flex items-center justify-center gap-3"
              >
                <span className="text-lg">←</span>
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </div>

        {/* Enhanced Preview Note */}
        <div className="mt-8 text-center backdrop-blur-lg bg-white/10 rounded-2xl p-4 border border-white/20">
          <p className="text-emerald-100/70 flex items-center justify-center gap-2 text-sm">
            <span className="text-emerald-400">💡</span>
            Make sure all information is accurate and up-to-date to attract genuine tenants
          </p>
        </div>
      </div>
    </div>
  );
}