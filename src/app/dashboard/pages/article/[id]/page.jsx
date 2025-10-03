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
        const response = await fetch(`/api/user/article/byId?id=${id}`, { cache: "no-cache" });
        if (!response.ok) throw new Error("Failed to fetch house details");
        const { data } = await response.json();
        setHouse(data);
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-500">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-slate-700 font-medium">Loading house details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
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

  if (!house) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-6xl mb-4">🏠</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">House Not Found</h2>
          <p className="text-gray-600">The house you’re looking for doesn’t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-600 to-slate-800 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* House Card */}
        <article className="rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl bg-slate-400">
         

          {/* Cover Image (Slider) */}
             {house.images?.length > 0 && (
        <div className="relative h-96 w-full overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-700 ease-in-out h-96"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {house.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full flex-shrink-0 h-96 object-cover"
              />
            ))}
          </div>

          {/* Prev/Next buttons */}
          <button
            onClick={() =>
              setCurrentIndex(
                currentIndex === 0
                  ? house.images.length - 1
                  : currentIndex - 1
              )
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 btn btn-circle btn-sm"
          >
            ❮
          </button>
          <button
            onClick={() =>
              setCurrentIndex((currentIndex + 1) % house.images.length)
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-circle btn-sm"
          >
            ❯
          </button>

          {/* Dots Navigation */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {house.images.map((_, index) => (
              <button
                key={index}
                className={`btn btn-xs rounded-full ${
                  currentIndex === index
                    ? "btn-primary"
                    : "btn-outline"
                }`}
                onClick={() => setCurrentIndex(index)}
              ></button>
            ))}
          </div>
        </div>
      )}


          {/* Content */}
          <div className="p-8">
            {/* Title & Price */}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 upercase">
              {house.title}
            </h1><hr/>

            <div className="flex justify-between">
            <p className="text-2xl font-semibold text-indigo-600 mb-6">
              {house.rentPrice} {house.currency} / month
            </p>
            <Link href={`/dashboard/pages/booking/${id}`}>Book Now</Link>
            </div>


            {/* Location & Dates */}
            <div className=" p-4 bg-slate-200 rounded-lg">
              <p className="text-slate-800">
                📍 {house.address}, {house.city}
              </p>
              <p className="text-slate-700 mt-2">
                Available:{" "}
                {new Date(house.availableFrom).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                -{" "}
                {new Date(house.availableTo).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* Description */}
            <div className="prose prose-lg max-w-none text-slate-900 bg-slate-300 rounded-xl leading-relaxed p-3 my-3">
              <p className="text-lg leading-8">{house.description}</p>
            </div>

            {/* Owner Info */}
            <div className=" p-6 bg-slate-300 rounded-xl text-slate-800">
              <h3 className="text-2xl font-bold underline mb-3">Owner Information</h3>
              <p><strong>Name:</strong> {house.user?.name}</p>
              <p><strong>Email:</strong> {house.user?.email}</p>
              <p><strong>Phone:</strong> {house.contactNumber || house.user?.phone}</p>
              <p><strong>Address:</strong> {house.user?.address}</p>
            </div>

            {/* Meta Info */}
            <div className="mt-12 pt-6 border-t border-gray-800 flex justify-between text-sm text-slate-800">
              <p>Created: {new Date(house.createdAt).toLocaleDateString()}</p>
              <p>Updated: {new Date(house.updatedAt).toLocaleDateString()}</p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                {house.published ? "Published" : "Draft"}
              </p>
            </div>
          </div>
        </article>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 bg-white text-slate-800 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Houses
          </button>
        </div>
      </div>

      {/* Floating Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
          style={{ width: "30%" }} // make dynamic later
        ></div>
      </div>
    </div>
  );
}
