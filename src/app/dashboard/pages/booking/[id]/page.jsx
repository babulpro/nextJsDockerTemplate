"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  const [data, setData] = useState({
    startDate: "",
    endDate: "",
    proposedPrice: "",
    message: "",
    postId: id || ""
  });

  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch property details when component mounts
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      if (!id) return;
      
      try {
        const response = await fetch(`/api/user/article/byId?id=${id}`, {
          cache: "no-store"
        });
        
        if (response.ok) {
          const result = await response.json();
          if (result.status === "success") {
            setPropertyDetails(result.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch property details:", error);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  // ensure postId is set when id becomes available
  useEffect(() => {
    if (id) setData((p) => ({ ...p, postId: id }));
  }, [id]);

  const InputChange = (name, value) => {
    setData((pre) => ({ ...pre, [name]: value }));
  };

  // Calculate booking duration and total
  const calculateBookingDetails = () => {
    if (!data.startDate || !data.endDate) return null;

    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    const pricePerNight = Number(data.proposedPrice) || propertyDetails?.rentPrice || 0;
    const totalAmount = duration * pricePerNight;

    return {
      duration,
      totalAmount,
      pricePerNight
    };
  };

  const bookingDetails = calculateBookingDetails();

  // helpers: create explicit UTC start/end of day from "YYYY-MM-DD"
  const toUtcStartOfDay = (yyyyMmDd, addDays = 0) => {
    if (!yyyyMmDd) return null;
    const [y, m, d] = yyyyMmDd.split("-").map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d + addDays, 0, 0, 0, 0));
    return dt.toISOString();
  };

  const toUtcEndOfDay = (yyyyMmDd, addDays = 0) => {
    if (!yyyyMmDd) return null;
    const [y, m, d] = yyyyMmDd.split("-").map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d + addDays, 23, 59, 59, 999));
    return dt.toISOString();
  };

  const FormSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // basic validation
      if (!data.startDate || !data.endDate) {
        alert("Please choose both start and end dates.");
        setLoading(false);
        return;
      }
      
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      if (end <= start) {
        alert("End date must be after start date.");
        setLoading(false);
        return;
      }

      const priceNumber = Number(data.proposedPrice);
      if (!Number.isFinite(priceNumber)) {
        alert("Please enter a valid numeric price.");
        setLoading(false);
        return;
      }

      // build payload with corrected types and ISO timestamps
      const payload = {
        postId: data.postId,
        startDate: toUtcStartOfDay(data.startDate),
        endDate: toUtcEndOfDay(data.endDate),
        proposedPrice: priceNumber,
        message: data.message
      };

      const response = await fetch("/api/user/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("server error:", text);
        alert("Try again");
        setLoading(false);
        return;
      }

      const json = await response.json();
      if (json.status === "success") {
        alert("🎉 Congratulations — booking created! Waiting for host confirmation.");
        router.push("/");
      } else {
        alert("Failed to create booking.");
      }
    } catch (err) {
      console.error(err);
      alert("Try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl p-6 md:p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
                📅 Book Your Stay
              </h1>
              <p className="text-emerald-100/70">
                Fill in your booking details to request a reservation
              </p>
            </div>

            <form onSubmit={FormSubmitHandler} className="space-y-6">
              {/* Dates Section */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="startDate" className="text-emerald-100/80 font-medium text-sm">
                    🗓️ Check-in Date
                  </label>
                  <input 
                    type="date" 
                    value={data.startDate} 
                    onChange={(e) => InputChange("startDate", e.target.value)} 
                    className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                    id="startDate" 
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="endDate" className="text-emerald-100/80 font-medium text-sm">
                    🗓️ Check-out Date
                  </label>
                  <input 
                    type="date" 
                    value={data.endDate} 
                    onChange={(e) => InputChange("endDate", e.target.value)} 
                    className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                    id="endDate" 
                    required
                  />
                </div>
              </div>

              {/* Price Section */}
              <div className="space-y-2">
                <label htmlFor="propose" className="text-emerald-100/80 font-medium text-sm">
                  💰 Proposed Price ({propertyDetails?.currency || 'BDT'})
                </label>
                <input 
                  type="number" 
                  placeholder={propertyDetails?.rentPrice || "Enter amount..."} 
                  value={data.proposedPrice} 
                  onChange={(e) => InputChange("proposedPrice", e.target.value)} 
                  className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                  id="propose" 
                  required
                />
                {propertyDetails?.rentPrice && (
                  <p className="text-emerald-300/70 text-xs">
                    Original price: {propertyDetails.rentPrice} {propertyDetails.currency}
                  </p>
                )}
              </div>

              {/* Message Section */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-emerald-100/80 font-medium text-sm">
                  💬 Additional Message (Optional)
                </label>
                <textarea 
                  placeholder="Tell the host about your stay... (e.g., I will be staying alone, special requests, etc.)" 
                  value={data.message} 
                  onChange={(e) => InputChange("message", e.target.value)} 
                  className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 resize-none"
                  id="message"
                  rows="3"
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-2xl flex items-center justify-center space-x-2 group ${
                  loading 
                    ? 'bg-gray-500/50 text-gray-300 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 hover:shadow-2xl'
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Processing Booking...</span>
                  </>
                ) : (
                  <>
                    <span>📅 Confirm Booking Request</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-lg rounded-3xl border border-emerald-400/20 shadow-2xl p-6 md:p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                📋 Booking Summary
              </h2>
              <p className="text-emerald-100/70">
                Review your booking details
              </p>
            </div>

            {/* Property Info */}
            {propertyDetails && (
              <div className="bg-white/10 rounded-2xl p-4 mb-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-2">{propertyDetails.title}</h3>
                <p className="text-emerald-100/80 text-sm">📍 {propertyDetails.address}, {propertyDetails.city}</p>
                <p className="text-emerald-300 font-semibold mt-2">
                  {propertyDetails.rentPrice} {propertyDetails.currency} / night
                </p>
              </div>
            )}

            {/* Booking Details */}
            <div className="space-y-4">
              {/* Dates Summary */}
              <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                <h4 className="text-white font-semibold mb-3 flex items-center">
                  <span className="text-emerald-400 mr-2">📅</span>
                  Booking Dates
                </h4>
                {data.startDate && data.endDate ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-emerald-100/80">
                      <span>Check-in:</span>
                      <span className="text-white font-medium">
                        {new Date(data.startDate).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between text-emerald-100/80">
                      <span>Check-out:</span>
                      <span className="text-white font-medium">
                        {new Date(data.endDate).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    {bookingDetails && (
                      <div className="flex justify-between text-emerald-100/80 pt-2 border-t border-white/20">
                        <span>Duration:</span>
                        <span className="text-emerald-300 font-semibold">
                          {bookingDetails.duration} night{bookingDetails.duration !== 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-emerald-100/70 text-sm text-center py-2">
                    Select dates to see details
                  </p>
                )}
              </div>

              {/* Price Summary */}
              <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                <h4 className="text-white font-semibold mb-3 flex items-center">
                  <span className="text-emerald-400 mr-2">💰</span>
                  Price Summary
                </h4>
                {bookingDetails ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-emerald-100/80">
                      <span>Price per night:</span>
                      <span>{bookingDetails.pricePerNight} {propertyDetails?.currency || 'BDT'}</span>
                    </div>
                    <div className="flex justify-between text-emerald-100/80">
                      <span>Duration:</span>
                      <span>{bookingDetails.duration} night{bookingDetails.duration !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-white/20">
                      <span>Total Amount:</span>
                      <span className="text-emerald-300">
                        {bookingDetails.totalAmount} {propertyDetails?.currency || 'BDT'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-emerald-100/70 text-sm text-center py-2">
                    Enter dates and price to see total
                  </p>
                )}
              </div>

              {/* Booking Notes */}
              <div className="bg-amber-500/10 border border-amber-400/20 rounded-2xl p-4">
                <h4 className="text-amber-300 font-semibold mb-2 flex items-center">
                  <span className="mr-2">💡</span>
                  Important Notes
                </h4>
                <ul className="text-amber-200/80 text-sm space-y-1">
                  <li>• This is a booking request, not a confirmed reservation</li>
                  <li>• The host will review and confirm your booking</li>
                  <li>• You'll be notified once the host responds</li>
                  <li>• Payment will be processed after confirmation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}