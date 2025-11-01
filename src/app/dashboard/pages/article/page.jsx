"use client";
import React, { useState, useEffect } from "react";
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
    images: [], // Now this will store file objects or uploaded URLs
  });

  const [imageFiles, setImageFiles] = useState(Array(5).fill(null)); // Store file objects

  const InputChange = (name, value) => {
    setData((pre) => ({ ...pre, [name]: value }));
  };

  // Handle file input change
  const handleFileChange = (index, file) => {
    const updatedFiles = [...imageFiles];
    updatedFiles[index] = file;
    setImageFiles(updatedFiles);
  };

  // Upload images to your API
  const uploadImages = async (files) => {
    const uploadedUrls = [];
    
    for (const file of files) {
      if (!file) continue;
      
      const formData = new FormData();
      formData.append("file", file);
      
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        
        if (response.ok) {
          const result = await response.json();
          uploadedUrls.push(result.url); // Assuming your API returns { url: "image-url" }
        } else {
          console.error("Upload failed for file:", file.name);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
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

      const response = await fetch("/api/user/article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("server error:", text);
        alert("Try again");
        setUploading(false);
        return;
      }

      const json = await response.json();
      if (json.status === "success") {
        alert("Congratulations — rent post created!");
        router.push("/");
      } else {
        alert("Failed to create rent post.");
      }
    } catch (err) {
      console.error(err);
      alert("Try again later");
    } finally {
      setUploading(false);
    }
  };

  // Helper functions (keep your existing ones)
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
    <div>
      <div className="mt-10 underline md:text-3xl text-slate-200 flex items-center bg-slate-700 justify-center">
        <h1 className="mt-5"> Describe The Details Of Your Rents</h1>
      </div>
      <div className="bg-slate-700 min-h-screen flex justify-center items-center md:p-4 p-2 shadow-2xl">
        <div className="md:w-3/5 w-4/5 shadow-xl md:py-10 py-4 px-2">
          <form onSubmit={FormSubmitHandler}>
            {/* Keep all your existing form fields as they are */}
            <label htmlFor="title">Type Of Your Rents</label><br />
            <input type="text" value={data.title} onChange={(e) => InputChange("title", e.target.value)} className="inputClass text-left w-full px-2 py-1 bg-slate-500 rounded-xl" id="title" placeholder="Home,House,Flat,Room" /> <br /><br />

            <label htmlFor="description">Rents Description</label><br />
            <textarea value={data.description} onChange={(e) => InputChange("description", e.target.value)} className="inputClass text-left w-full px-2 py-1 bg-slate-500 rounded-xl" id="description" rows="3" placeholder="this is awesome 3000 sqr fit flat with 2 bed room,dinnig,kitchen,two bath...." /> <br /><br />

            <label htmlFor="city">City</label><br />
            <input type="text" value={data.city} onChange={(e) => InputChange("city", e.target.value)} className="inputClass text-left w-full px-2 py-1 bg-slate-500 rounded-xl" id="city" placeholder="Dhaka" /> <br /><br />

            <label htmlFor="address">Address</label><br />
            <input type="text" value={data.address} onChange={(e) => InputChange("address", e.target.value)} className="inputClass text-left w-full px-2 py-1 bg-slate-500 rounded-xl" id="address" placeholder="Vill:Raki para, P.O:Nambir dala ,P.S:Damsona, Dis:Dhaka"/> <br /><br />

            <label htmlFor="contactNumber">Contact Number</label><br />
            <input type="text" value={data.contactNumber} onChange={(e) => InputChange("contactNumber", e.target.value)} className="inputClass text-left w-full px-2 py-1 bg-slate-500 rounded-xl" id="contactNumber" placeholder="+8801920987588"/> <br /><br />

            <label htmlFor="rentPrice">Rent Price ({data.currency})</label><br />
            <input type="number" value={data.rentPrice} onChange={(e) => InputChange("rentPrice", e.target.value)} className="inputClass w-full px-2 py-1 bg-slate-500 rounded-xl" id="rentPrice" placeholder="12400" /> <br /><br />

            <label>Available From</label><br />
            <input type="date" value={data.availableFrom} onChange={(e) => InputChange("availableFrom", e.target.value)} className="inputClass text-left w-full px-2 py-1 bg-slate-500 rounded-xl" /> <br /><br />

            <label>Available To</label><br />
            <input type="date" value={data.availableTo} onChange={(e) => InputChange("availableTo", e.target.value)} className="inputClass text-left w-full px-2 py-1 bg-slate-500 rounded-xl" /> <br /><br />

            {/* Updated Images Section */}
             
            <h3 className="mt-4 mb-2">Upload Images (at least 4–5 images)</h3>
            {imageFiles.map((file, idx) => (
              <div key={idx} className="mb-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(idx, e.target.files[0])}
                  className="inputClass  px-2 py-1 rounded-xl bg-slate-500 text-slate-300"
                />
                {file && (
                  <p className="text-sm text-green-400 mt-1">
                    Selected: {file.name}
                  </p>
                )}
              </div>
            ))}

            <div className="mt-8">
              <button 
                type="submit" 
                disabled={uploading}
                className={`p-2 rounded cursor-pointer ${
                  uploading 
                    ? 'bg-slate-500 cursor-not-allowed' 
                    : 'bg-slate-800 hover:bg-slate-600'
                }`}
              >
                {uploading ? 'Uploading...' : 'Post Rent'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}