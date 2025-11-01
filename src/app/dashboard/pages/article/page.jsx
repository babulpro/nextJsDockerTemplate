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
    setData((pre) => ({ ...pre, [name]: value }));
  };

  const handleFileChange = (index, file) => {
    const updatedFiles = [...imageFiles];
    updatedFiles[index] = file;
    setImageFiles(updatedFiles);
  };

  // Mock image upload function (frontend only)
  const uploadImages = async (files) => {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock URLs for demo
    return files.filter(file => file !== null).map((file, index) => 
      `https://picsum.photos/600/400?random=${index + Date.now()}`
    );
  };

  const FormSubmitHandler = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      if (!data.availableFrom || !data.availableTo) {
        alert("Please choose both available from and to dates.");
        setUploading(false);
        return;
      }
      
      const priceNumber = Number(data.rentPrice);
      if (!Number.isFinite(priceNumber)) {
        alert("Please enter a valid numeric rent price.");
        setUploading(false);
        return;
      }

      // Upload images first
      const validFiles = imageFiles.filter(file => file !== null);
      if (validFiles.length < 4) {
        alert("Please upload at least 4 images.");
        setUploading(false);
        return;
      }

      const imageUrls = await uploadImages(validFiles);
      
      if (imageUrls.length < 4) {
        alert("Failed to upload some images. Please try again.");
        setUploading(false);
        return;
      }

      // Build payload with uploaded image URLs
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

      // Simulate API call success
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert("🎉 Congratulations — rent post created successfully!");
      router.push("/");

    } catch (err) {
      console.error(err);
      alert("Try again later");
    } finally {
      setUploading(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="pt-20 pb-8 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">
          🏠 List Your Property
        </h1>
        <p className="text-emerald-100/70 text-lg max-w-2xl mx-auto">
          Fill in the details below to create your rental listing and reach potential tenants
        </p>
      </div>

      {/* Form Container */}
      <div className="flex justify-center items-center px-4 pb-16">
        <div className="w-full max-w-4xl">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl p-6 md:p-8">
            <form onSubmit={FormSubmitHandler} className="space-y-6">
              {/* Property Type */}
              <div className="space-y-2">
                <label htmlFor="title" className="text-emerald-100/80 font-medium text-sm">
                  🏡 Property Type
                </label>
                <input 
                  type="text" 
                  value={data.title} 
                  onChange={(e) => InputChange("title", e.target.value)} 
                  className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                  id="title" 
                  placeholder="Home, Flat, Room, Apartment..." 
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="description" className="text-emerald-100/80 font-medium text-sm">
                  📝 Property Description
                </label>
                <textarea 
                  value={data.description} 
                  onChange={(e) => InputChange("description", e.target.value)} 
                  className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 resize-none"
                  id="description" 
                  rows="4" 
                  placeholder="Describe your property... (e.g., This is a beautiful 3000 sq ft flat with 2 bedrooms, dining area, kitchen, two bathrooms...)"
                  required
                />
              </div>

              {/* Location Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="city" className="text-emerald-100/80 font-medium text-sm">
                    🌆 City
                  </label>
                  <input 
                    type="text" 
                    value={data.city} 
                    onChange={(e) => InputChange("city", e.target.value)} 
                    className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                    id="city" 
                    placeholder="Dhaka, Chattogram, Sylhet..." 
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contactNumber" className="text-emerald-100/80 font-medium text-sm">
                    📞 Contact Number
                  </label>
                  <input 
                    type="text" 
                    value={data.contactNumber} 
                    onChange={(e) => InputChange("contactNumber", e.target.value)} 
                    className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                    id="contactNumber" 
                    placeholder="+8801920987588" 
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label htmlFor="address" className="text-emerald-100/80 font-medium text-sm">
                  📍 Full Address
                </label>
                <input 
                  type="text" 
                  value={data.address} 
                  onChange={(e) => InputChange("address", e.target.value)} 
                  className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                  id="address" 
                  placeholder="Vill: Raki para, P.O: Nambir dala, P.S: Damsona, Dis: Dhaka" 
                  required
                />
              </div>

              {/* Price & Availability */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label htmlFor="rentPrice" className="text-emerald-100/80 font-medium text-sm">
                    💰 Rent Price ({data.currency})
                  </label>
                  <input 
                    type="number" 
                    value={data.rentPrice} 
                    onChange={(e) => InputChange("rentPrice", e.target.value)} 
                    className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                    id="rentPrice" 
                    placeholder="12400" 
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-emerald-100/80 font-medium text-sm">
                    📅 Available From
                  </label>
                  <input 
                    type="date" 
                    value={data.availableFrom} 
                    onChange={(e) => InputChange("availableFrom", e.target.value)} 
                    className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-emerald-100/80 font-medium text-sm">
                    📅 Available To
                  </label>
                  <input 
                    type="date" 
                    value={data.availableTo} 
                    onChange={(e) => InputChange("availableTo", e.target.value)} 
                    className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-emerald-100/80 font-medium text-sm">
                    📸 Property Images (Upload 4-5 images)
                  </label>
                  <span className="text-emerald-400/70 text-xs">
                    {imageFiles.filter(file => file !== null).length}/5 selected
                  </span>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {imageFiles.map((file, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(idx, e.target.files[0])}
                          className="w-full px-3 py-3 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-emerald-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-500/20 file:text-emerald-300 hover:file:bg-emerald-500/30 transition-all duration-300"
                        />
                      </div>
                      {file && (
                        <p className="text-green-400 text-xs truncate">
                          ✅ {file.name}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-xl p-3">
                  <p className="text-emerald-200/80 text-xs text-center">
                    💡 Upload clear, high-quality images of different areas (living room, bedroom, kitchen, bathroom, exterior)
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-white/10">
                <button 
                  type="submit" 
                  disabled={uploading}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-2xl flex items-center justify-center space-x-2 group ${
                    uploading 
                      ? 'bg-gray-500/50 text-gray-300 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 hover:shadow-2xl'
                  }`}
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Creating Listing...</span>
                    </>
                  ) : (
                    <>
                      <span>🚀 Post Your Property</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </>
                  )}
                </button>
              </div>

              {/* Help Text */}
              <div className="text-center">
                <p className="text-emerald-100/50 text-sm">
                  Your property will be visible to potential tenants after approval
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}