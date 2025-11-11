"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

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
    images: [],
  });

  const [imageFiles, setImageFiles] = useState(Array(5).fill(null));

  const InputChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (index, file) => {
    const updated = [...imageFiles];
    updated[index] = file;
    setImageFiles(updated);
  };

  const uploadImages = async (files) => {
    const uploadedUrls = [];

    for (const file of files) {
      if (!file) continue;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const json = await res.json();
          uploadedUrls.push(json.url);
        } else {
          console.error("Upload failed:", file.name);
        }
      } catch (err) {
        console.error("Upload error:", err);
      }
    }

    return uploadedUrls;
  };

  const FormSubmitHandler = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      if (!data.availableFrom || !data.availableTo) {
        alert("Please choose both available from and to dates.");
        return setUploading(false);
      }

      const priceNumber = Number(data.rentPrice);
      if (!Number.isFinite(priceNumber)) {
        alert("Please enter a valid numeric rent price.");
        return setUploading(false);
      }

      const validFiles = imageFiles.filter((f) => f !== null);
      if (validFiles.length < 4) {
        alert("Please upload at least 4 images.");
        return setUploading(false);
      }

      const imageUrls = await uploadImages(validFiles);

      if (imageUrls.length < 4) {
        alert("Some images failed to upload. Try again.");
        return setUploading(false);
      }

      const payload = {
        title: data.title,
        description: data.description,
        currency: data.currency,
        city: data.city,
        address: data.address,
        contactNumber: data.contactNumber,
        published: data.published,
        availableFrom: toUtcStartOfDay(data.availableFrom),
        availableTo: toUtcEndOfDay(data.availableTo),
        rentPrice: priceNumber,
        images: imageUrls,
      };

      const response = await fetch("/api/user/article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Server Error:", text);
        alert("Try again");
        return setUploading(false);
      }

      const json = await response.json();

      if (json.status === "success") {
        alert("🎉 Congratulations — rent post created successfully!");
        router.push("/");
      } else {
        alert("Failed to create rent post.");
      }
    } catch (err) {
      console.error(err);
      alert("Try again later.");
    } finally {
      setUploading(false);
    }
  };

  const toUtcStartOfDay = (dateStr) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d, 0, 0, 0)).toISOString();
  };

  const toUtcEndOfDay = (dateStr) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d, 23, 59, 59)).toISOString();
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <h1 className="text-3xl text-emerald-300 font-bold text-center mb-8">
        Describe The Details Of Your Rents
      </h1>

      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl max-w-3xl mx-auto shadow-xl border border-white/20">
        <form onSubmit={FormSubmitHandler}>
          
          <label className="text-emerald-200">Type Of Your Rents</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => InputChange("title", e.target.value)}
            className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white placeholder-emerald-200 focus:ring-2 ring-emerald-400 mb-4"
            placeholder="Home, Flat, Room"
          />

          <label className="text-emerald-200">Rents Description</label>
          <textarea
            value={data.description}
            onChange={(e) => InputChange("description", e.target.value)}
            className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white placeholder-emerald-200 focus:ring-2 ring-emerald-400 mb-4"
            rows="3"
            placeholder="description..."
          />

          <label className="text-emerald-200">City</label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => InputChange("city", e.target.value)}
            className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white placeholder-emerald-200 focus:ring-2 ring-emerald-400 mb-4"
            placeholder="Dhaka"
          />

          <label className="text-emerald-200">Address</label>
          <input
            type="text"
            value={data.address}
            onChange={(e) => InputChange("address", e.target.value)}
            className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white placeholder-emerald-200 focus:ring-2 ring-emerald-400 mb-4"
            placeholder="Full address..."
          />

          <label className="text-emerald-200">Contact Number</label>
          <input
            type="text"
            value={data.contactNumber}
            onChange={(e) => InputChange("contactNumber", e.target.value)}
            className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white placeholder-emerald-200 focus:ring-2 ring-emerald-400 mb-4"
            placeholder="+8801XXXXXXXXX"
          />

          <label className="text-emerald-200">
            Rent Price ({data.currency})
          </label>
          <input
            type="number"
            value={data.rentPrice}
            onChange={(e) => InputChange("rentPrice", e.target.value)}
            className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white placeholder-emerald-200 focus:ring-2 ring-emerald-400 mb-4"
            placeholder="12400"
          />

          <label className="text-emerald-200">Available From</label>
          <input
            type="date"
            value={data.availableFrom}
            onChange={(e) => InputChange("availableFrom", e.target.value)}
            className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white focus:ring-2 ring-emerald-400 mb-4"
          />

          <label className="text-emerald-200">Available To</label>
          <input
            type="date"
            value={data.availableTo}
            onChange={(e) => InputChange("availableTo", e.target.value)}
            className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white focus:ring-2 ring-emerald-400 mb-4"
          />

          <h3 className="mt-6 mb-2 text-emerald-300 font-semibold">
            Upload Images (4–5 images)
          </h3>

          {imageFiles.map((file, idx) => (
            <div key={idx} className="mb-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(idx, e.target.files[0])}
                className="w-full bg-white/10 p-2 border border-emerald-400/30 backdrop-blur-sm rounded-xl text-emerald-200"
              />

              {file && (
                <p className="text-green-400 text-xs mt-1">✅ {file.name}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={uploading}
            className={`w-full mt-6 py-3 rounded-xl text-white font-semibold shadow-lg transition-all ${
              uploading
                ? "bg-gray-500/50 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
            }`}
          >
            {uploading ? "Uploading..." : "Post Rent"}
          </button>
        </form>
      </div>
    </div>
  );
}
