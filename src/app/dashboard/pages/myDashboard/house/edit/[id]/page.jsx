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
        const res = await fetch(`/api/user/article/byId?id=${id}`);
        
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
        // ✅ Go back to previous page instead of fixed route
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

  // ✅ Added function to handle cancel/go back
  const handleCancel = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-16 w-16 border-t-4 border-b-4 border-indigo-600 rounded-full mx-auto mb-4"></div>
          <p className="text-indigo-700 font-medium">Loading your post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <div className="space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Try Again
            </button>
            <button
              onClick={handleCancel} // ✅ Use the cancel handler
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-500 to-slate-700 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3 underline">
            Edit Your Rental Post
          </h1>
          <p className="text-gray-600 text-lg text-slate-100">
            Update your property details and attract more tenants
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900 rounded-2xl shadow-xl text-slate-100 p-6 md:p-8">
          <form onSubmit={FormSubmitHandler} className="space-y-6">
            {/* Basic Information Section */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Property Type *
                </label>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => InputChange("title", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="e.g., 3-Bedroom Apartment, Studio, Villa"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Rent Price ({data.currency}) *
                </label>
                <input
                  type="number"
                  value={data.rentPrice}
                  onChange={(e) => InputChange("rentPrice", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="Enter monthly rent"
                  min="0"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-100 mb-2">
                Property Description *
              </label>
              <textarea
                value={data.description}
                onChange={(e) => InputChange("description", e.target.value)}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="Describe the property features, amenities, location advantages..."
                required
              />
            </div>

            {/* Location Section */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={data.city}
                  onChange={(e) => InputChange("city", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="e.g., Dhaka, Chittagong"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Contact Number *
                </label>
                <input
                  type="text"
                  value={data.contactNumber}
                  onChange={(e) => InputChange("contactNumber", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="+8801XXXXXXXXX"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Full Address *
              </label>
              <input
                type="text"
                value={data.address}
                onChange={(e) => InputChange("address", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="Detailed address with area, road, building info..."
                required
              />
            </div>

            {/* Availability Section */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Available From *
                </label>
                <input
                  type="date"
                  value={data.availableFrom}
                  onChange={(e) => InputChange("availableFrom", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Available To *
                </label>
                <input
                  type="date"
                  value={data.availableTo}
                  onChange={(e) => InputChange("availableTo", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            {/* Images Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-slate-200">
                  Property Images
                </label>
                <button
                  type="button"
                  onClick={addImageField}
                  className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-lg hover:bg-green-200 transition"
                >
                  + Add More Images
                </button>
              </div>
              
              <div className="space-y-3">
                {data.images.map((img, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder={`Image URL ${idx + 1} (https://example.com/image.jpg)`}
                      value={img}
                      onChange={(e) => ImageChange(idx, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                    {data.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(idx)}
                        className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Add high-quality image URLs to showcase your property (4-5 recommended)
              </p>
            </div>

            {/* Publish Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-500 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-slate-200">
                  Publish Status
                </label>
                <p className="text-sm text-slate-200">
                  {data.published ? "Your post is visible to everyone" : "Your post is hidden"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => InputChange("published", !data.published)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  data.published ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    data.published ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Updating...
                  </span>
                ) : (
                  "Update Post"
                )}
              </button>
              
              <button
                type="button"
                onClick={handleCancel} // ✅ Use the cancel handler
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Preview Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-100">
            💡 Tip: Make sure all information is accurate to attract genuine tenants
          </p>
        </div>
      </div>
    </div>
  );
}