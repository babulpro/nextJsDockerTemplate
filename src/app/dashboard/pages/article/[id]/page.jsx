"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link"

export default function Page() {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const response = await fetch(`/api/user/article/byId?id=${id}`, {
          cache: "no-store"
        });
        
        if (!response.ok) throw new Error("Failed to fetch house details");
        
        const result = await response.json();
        
        if (result.status === "success") {
          setHouse(result.data);
        } else {
          throw new Error(result.msg || "Failed to load house details");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchHouse();
  }, [id]);

  useEffect(() => {
    if (!house?.images?.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % house.images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [house?.images?.length]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-emerald-100 font-medium">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl max-w-md">
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

  if (!house) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 text-3xl mx-auto mb-4 border border-emerald-400/30">
            🏠
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Property Not Found</h2>
          <p className="text-emerald-100/70">The property you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Property Card */}
        <article className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
         
          {/* Image Slider */}
          {house.images?.length > 0 && (
            <div className="relative h-96 w-full overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out h-96"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {house.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Property view ${index + 1}`}
                    className="w-full flex-shrink-0 h-96 object-cover"
                  />
                ))}
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={() =>
                  setCurrentIndex(
                    currentIndex === 0
                      ? house.images.length - 1
                      : currentIndex - 1
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300"
              >
                ❮
              </button>
              <button
                onClick={() =>
                  setCurrentIndex((currentIndex + 1) % house.images.length)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300"
              >
                ❯
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {house.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentIndex === index
                        ? "bg-emerald-400"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>

              {/* Image Counter */}
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {house.images.length}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            {/* Title & Price */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 lg:mb-0">
                {house.title}
              </h1>
              <div className="flex items-center gap-4">
                <p className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  {house.rentPrice} {house.currency} / month
                </p>
                <Link 
                  href={`/dashboard/pages/booking/${id}`} 
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold animate-pulse"
                >
                  📅 Book Now
                </Link>
              </div>
            </div>

            <hr className="border-white/20 mb-6" />

            {/* Location & Availability */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <span className="text-emerald-400 text-lg">📍</span>
                  <div>
                    <p className="text-white font-semibold">Location</p>
                    <p className="text-emerald-100/80">{house.address}, {house.city}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-emerald-400 text-lg">📅</span>
                  <div>
                    <p className="text-white font-semibold">Availability</p>
                    <p className="text-emerald-100/80">
                      {new Date(house.availableFrom).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })} - {" "}
                      {new Date(house.availableTo).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="text-emerald-400 mr-2">📝</span>
                Property Description
              </h3>
              <p className="text-emerald-100/80 leading-relaxed text-lg">
                {house.description}
              </p>
            </div>

            {/* Owner Information */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-2xl p-6 border border-emerald-400/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="text-emerald-400 mr-2">👤</span>
                Owner Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-emerald-100/80">
                <div className="space-y-2">
                  <p><strong className="text-white">Name:</strong> {house.user?.name || "Not provided"}</p>
                  <p><strong className="text-white">Email:</strong> {house.user?.email || "Not provided"}</p>
                </div>
                <div className="space-y-2">
                  <p><strong className="text-white">Phone:</strong> {house.contactNumber || house.user?.phone || "Not provided"}</p>
                  <p><strong className="text-white">Address:</strong> {house.user?.address || "Not provided"}</p>
                </div>
              </div>
            </div>

            {/* Meta Information */}
            <div className="mt-8 pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between text-sm text-emerald-100/60">
              <p>Created: {new Date(house.createdAt).toLocaleDateString()}</p>
              <p>Updated: {new Date(house.updatedAt).toLocaleDateString()}</p>
              <p className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full animate-pulse ${
                  house.published ? "bg-green-400" : "bg-yellow-400"
                }`}></span>
                {house.published ? "Published" : "Draft"}
              </p>
            </div>
          </div>
        </article>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/20 hover:bg-white/20 hover:border-emerald-400/30 transition-all duration-300 font-semibold"
          >
            <span>←</span>
            Back to Properties
          </button>
        </div>
      </div>
    </div>
  );
}