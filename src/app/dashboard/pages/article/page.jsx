"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

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
    images: ["", "", "", "", ""], // 5 image links by default
  });

  const InputChange = (name, value) => {
    setData((pre) => ({ ...pre, [name]: value }));
  };

  const ImageChange = (index, value) => {
    const updatedImages = [...data.images];
    updatedImages[index] = value;
    setData((pre) => ({ ...pre, images: updatedImages }));
  };

  // helpers: explicit UTC start/end of day
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
    try {
      if (!data.availableFrom || !data.availableTo) {
        alert("Please choose both available from and to dates.");
        return;
      }
      const priceNumber = Number(data.rentPrice);
      if (!Number.isFinite(priceNumber)) {
        alert("Please enter a valid numeric rent price.");
        return;
      }

      // build payload
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
        images: data.images.filter((img) => img.trim() !== ""), // only non-empty links
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
    }
  };

  return (
    <div>
      <div className="mt-10 underline md:text-3xl text-slate-200 flex items-center bg-slate-700 justify-center">
        <h1 className="mt-5"> Describe The Details Of Your Rents</h1>
      </div>
    <div className="bg-slate-700 min-h-screen flex justify-center items-center">
      
      <div className="md:w-3/5 w-4/5 shadow-xl md:py-10 py-4 px-2">
        <form onSubmit={FormSubmitHandler}>
          <label htmlFor="title">Type Of Your Rents</label><br />
          <input type="text" value={data.title} onChange={(e) => InputChange("title", e.target.value)} className="inputClass text-left w-full" id="title" placeholder="Home,House,Flat,Room" /> <br /><br />

          <label htmlFor="description">Rents Description</label><br />
          <textarea value={data.description} onChange={(e) => InputChange("description", e.target.value)} className="inputClass text-left w-full" id="description" rows="3" placeholder="this is awesome 3000 sqr fit flat with 2 bed room,dinnig,kitchen,two bath...." /> <br /><br />

          <label htmlFor="city">City</label><br />
          <input type="text" value={data.city} onChange={(e) => InputChange("city", e.target.value)} className="inputClass text-left w-full" id="city" placeholder="Dhaka" /> <br /><br />

          <label htmlFor="address">Address</label><br />
          <input type="text" value={data.address} onChange={(e) => InputChange("address", e.target.value)} className="inputClass text-left w-full" id="address" placeholder="Vill:Raki para, P.O:Nambir dala ,P.S:Damsona, Dis:Dhaka"/> <br /><br />

          <label htmlFor="contactNumber">Contact Number</label><br />
          <input type="text" value={data.contactNumber} onChange={(e) => InputChange("contactNumber", e.target.value)} className="inputClass text-left w-full" id="contactNumber" placeholder="+8801920987588"/> <br /><br />

          <label htmlFor="rentPrice">Rent Price ({data.currency})</label><br />
          <input type="number" placeholder="9500" value={data.rentPrice} onChange={(e) => InputChange("rentPrice", e.target.value)} className="inputClass w-full" id="rentPrice" placeholder="12400" /> <br /><br />

          <label>Available From</label><br />
          <input type="date" value={data.availableFrom} onChange={(e) => InputChange("availableFrom", e.target.value)} className="inputClass text-left w-full" /> <br /><br />

          <label>Available To</label><br />
          <input type="date" value={data.availableTo} onChange={(e) => InputChange("availableTo", e.target.value)} className="inputClass text-left w-full" /> <br /><br />

          <h3 className="mt-4 mb-2">Images (at least 4–5 links)</h3>
          {data.images.map((img, idx) => (
            <div key={idx} className="mb-2">
              <input
                type="text"
                placeholder={`Image URL ${idx + 1}`}
                value={img}
                onChange={(e) => ImageChange(idx, e.target.value)}
                className="inputClass w-full"
              />
            </div>
          ))}

          <div className="mt-8">
            <input type="submit" value="Post Rent" className="p-2 bg-slate-800 rounded hover:bg-slate-600 cursor-pointer" />
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
