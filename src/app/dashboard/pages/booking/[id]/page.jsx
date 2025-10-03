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

  // ensure postId is set when id becomes available
  useEffect(() => {
    if (id) setData((p) => ({ ...p, postId: id }));
  }, [id]);

  const InputChange = (name, value) => {
    setData((pre) => ({ ...pre, [name]: value }));
  };

  // helpers: create explicit UTC start/end of day from "YYYY-MM-DD"
  const toUtcStartOfDay = (yyyyMmDd, addDays = 0) => {
    if (!yyyyMmDd) return null;
    const [y, m, d] = yyyyMmDd.split("-").map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d + addDays, 0, 0, 0, 0));
    return dt.toISOString(); // e.g. "2025-10-16T00:00:00.000Z"
  };

  const toUtcEndOfDay = (yyyyMmDd, addDays = 0) => {
    if (!yyyyMmDd) return null;
    const [y, m, d] = yyyyMmDd.split("-").map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d + addDays, 23, 59, 59, 999));
    return dt.toISOString(); // e.g. "2025-10-30T23:59:59.999Z"
  };

  const FormSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // basic validation
      if (!data.startDate || !data.endDate) {
        alert("Please choose both start and end dates.");
        return;
      }
      const priceNumber = Number(data.proposedPrice);
      if (!Number.isFinite(priceNumber)) {
        alert("Please enter a valid numeric price.");
        return;
      }

      // build payload with corrected types and ISO timestamps
      const payload = {
        postId: data.postId,
        // If you actually want to shift start by +1 day, pass addDays = 1 to toUtcStartOfDay.
        startDate: toUtcStartOfDay(data.startDate),
        endDate: toUtcEndOfDay(data.endDate),
        proposedPrice: priceNumber,
        message: data.message
      };

      const response = await fetch("/api/user/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        // optional cache control: cache: "no-store"
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("server error:", text);
        alert("Try again");
        return;
      }

      const json = await response.json();
      if (json.status === "success") {
        alert("Congratulations — booking created, wait for response.");
        router.push("/");
      } else {
        alert("Failed to create booking.");
      }
    } catch (err) {
      console.error(err);
      alert("Try again later");
    }
  };

  return (
    <div className="bg-slate-700 min-h-screen flex justify-center items-center">
      <div className="md:w-3/5 w-4/5 shadow-xl md:py-10 py-4 px-2">
        <form onSubmit={FormSubmitHandler}>
          <label htmlFor="startDate">Enter when you want to come</label><br/>
          <input type="date" value={data.startDate} onChange={(e) => InputChange("startDate", e.target.value)} className="inputClass text-left w-full" id="startDate" /> <br/><br/>

          <label htmlFor="endDate">Enter when you will left</label><br/>
          <input type="date" value={data.endDate} onChange={(e) => InputChange("endDate", e.target.value)} className="inputClass text-left w-full" id="endDate" /> <br/><br/>

          <label htmlFor="propose">Enter Your Proposed price</label><br/>
          <input type="text" placeholder="1240" value={data.proposedPrice} onChange={(e) => InputChange("proposedPrice", e.target.value)} className="inputClass w-full" id="propose" /> <br/><br/>

          <label htmlFor="message">If you want to tell something</label><br/>
          <input type="text" placeholder="I will stay alone ..." value={data.message} onChange={(e) => InputChange("message", e.target.value)} className="inputClass w-full" id="message"/> <br/>

          <div className="mt-8">
            <input type="submit" value="Booking Now" className="p-1 hover:text-slate-500" />
          </div>
        </form>
      </div>
    </div>
  );
}
