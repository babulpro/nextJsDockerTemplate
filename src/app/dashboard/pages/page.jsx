 "use client";
 import React, { useState, useEffect } from "react";
 import Link from "next/link";
 
 export default function ArticlesPage() {
   const [posts, setPosts] = useState([]);
   const [filteredPosts, setFilteredPosts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");
   const [copiedId, setCopiedId] = useState(null);
   const [searchCity, setSearchCity] = useState("");
   const [sortOrder, setSortOrder] = useState("default");
   const [propertyType, setPropertyType] = useState("all");
 
   useEffect(() => {
     const fetchPosts = async () => {
       try {
         const response = await fetch("/api/user/article", { cache: "no-cache" });
         if (!response.ok) throw new Error("Failed to fetch posts");
 
         const result = await response.json();
         if (result.status === "success") {
           const publishedPosts = result.data.filter((post) => post.published === true); 
           setPosts(publishedPosts);
           setFilteredPosts(publishedPosts);
         } else {
           throw new Error(result.msg || "Failed to load posts");
         }
       } catch (e) {
         setError(e.message || "Failed to load posts");
       } finally {
         setLoading(false);
       }
     };
 
     fetchPosts();
   }, []);
 
   // 🧭 Filter + Sort logic
   useEffect(() => {
     let filtered = [...posts];
 
     // Filter by city
     if (searchCity.trim() !== "") {
       filtered = filtered.filter((post) =>
         post.city.toLowerCase().includes(searchCity.toLowerCase())
       );
     }
 
     // Filter by property type (Room / Flat / Home)
     if (propertyType !== "all") {
       filtered = filtered.filter((post) =>
         post.title?.toLowerCase().includes(propertyType.toLowerCase())
       );
     }
 
     // Sort by price
     if (sortOrder === "lowToHigh") {
       filtered.sort((a, b) => a.rentPrice - b.rentPrice);
     } else if (sortOrder === "highToLow") {
       filtered.sort((a, b) => b.rentPrice - a.rentPrice);
     }
 
     setFilteredPosts(filtered);
   }, [searchCity, sortOrder, propertyType, posts]);
 
   const handleCopyLink = async (id) => {
     const url = `${window.location.origin}/dashboard/pages/article/${id}`;
     try {
       await navigator.clipboard.writeText(url);
       setCopiedId(id);
       setTimeout(() => setCopiedId(null), 2000);
     } catch (err) {
       console.error("Failed to copy link:", err);
     }
   };
 
   const formatPrice = (price, currency) =>
     new Intl.NumberFormat("en-BD", {
       style: "currency",
       currency: currency || "BDT",
       minimumFractionDigits: 0,
     }).format(price);
 
   const formatDate = (dateString) =>
     new Date(dateString).toLocaleDateString("en-US", {
       year: "numeric",
       month: "short",
       day: "numeric",
     });
 
   if (loading) {
     return (
       <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-100 flex items-center justify-center">
         <div className="text-center">
           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-500 mx-auto mb-4"></div>
           <p className="text-emerald-700 font-medium">Loading beautiful properties...</p>
         </div>
       </div>
     );
   }
 
   if (error) {
     return (
       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-cyan-100">
         <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-emerald-100">
           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
             <span className="text-2xl">⚠️</span>
           </div>
           <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
           <p className="text-gray-600 mb-6">{error}</p>
           <button
             onClick={() => window.location.reload()}
             className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl font-semibold"
           >
             Try Again
           </button>
         </div>
       </div>
     );
   }
 
   return (
     <div className="min-h-screen bg-gradient-to-br mt-5 from-slate-900 via-purple-900 to-slate-900">
       {/* Header */}
       <div className="text-center py-16 px-4 bg-gradient-to-r from-emerald-600/20 via-teal-600/20 to-cyan-600/20 backdrop-blur-sm">
         <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
           Discover Your Dream Home
         </h1>
         <p className="text-emerald-100 text-xl max-w-2xl mx-auto leading-relaxed">
           Explore curated rental properties and find the perfect place that feels like home
         </p>
       </div>
 
       {/* 🔍 Filters Section */}
       <div className="container mx-auto px-4 pb-10 pt-8">
         <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
           <div className="flex flex-wrap justify-center gap-4">
             {/* City Search */}
             <div className="relative">
               <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400">
                 🗺️
               </div>
               <input
                 type="text"
                 placeholder="Search by city..."
                 value={searchCity}
                 onChange={(e) => setSearchCity(e.target.value)}
                 className="pl-12 pr-4 py-3 rounded-xl border border-emerald-300/30 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent bg-white/10 text-white placeholder-emerald-200 backdrop-blur-sm w-64"
               />
             </div>
 
             {/* Sort by Price */}
             <div className="relative">
               <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400">
                 💰
               </div>
               <select
                 value={sortOrder}
                 onChange={(e) => setSortOrder(e.target.value)}
                 className="pl-12 pr-8 py-3 rounded-xl border border-emerald-300/30 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent bg-white/10 text-white backdrop-blur-sm appearance-none"
               >
                 <option value="default" className="text-gray-800">Sort by Price</option>
                 <option value="lowToHigh" className="text-gray-800">Low to High</option>
                 <option value="highToLow" className="text-gray-800">High to Low</option>
               </select>
             </div>
 
             {/* Filter by Type */}
             <div className="relative">
               <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400">
                 🏠
               </div>
               <select
                 value={propertyType}
                 onChange={(e) => setPropertyType(e.target.value)}
                 className="pl-12 pr-8 py-3 rounded-xl border border-emerald-300/30 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent bg-white/10 text-white backdrop-blur-sm appearance-none"
               >
                 <option value="all" className="text-gray-800">All Types</option>
                 <option value="room" className="text-gray-800">Room</option>
                 <option value="flat" className="text-gray-800">Flat</option>
                 <option value="home" className="text-gray-800">Home</option>
               </select>
             </div>
 
             {/* Results Counter */}
             <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-xl px-4 py-3 text-emerald-100 font-semibold backdrop-blur-sm">
               {filteredPosts.length} {filteredPosts.length === 1 ? 'Property' : 'Properties'} Found
             </div>
           </div>
         </div>
       </div>
 
       {/* Property Cards */}
       <div className="container mx-auto px-4 pb-20">
         {filteredPosts.length === 0 ? (
           <div className="text-center py-20 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl">
             <div className="w-24 h-24 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-400/30">
               <span className="text-4xl">🔍</span>
             </div>
             <h3 className="text-3xl font-bold text-white mb-3">
               No properties found
             </h3>
             <p className="text-emerald-100 text-lg mb-6">
               Try adjusting your search filters or browse all properties
             </p>
             <button
               onClick={() => {
                 setSearchCity("");
                 setPropertyType("all");
                 setSortOrder("default");
               }}
               className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl font-semibold"
             >
               Show All Properties
             </button>
           </div>
         ) : (
           <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
             {filteredPosts.map((post) => (
               <article
                 key={post.id}
                 className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group border border-white/20 hover:border-emerald-400/30"
               >
                 {/* Image */}
                 {post.images?.[0] && (
                   <div className="relative h-56 overflow-hidden">
                     <img
                       src={post.images[0]}
                       alt={post.title || "Property image"}
                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                     />
                     <div className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-xl text-lg font-bold shadow-lg">
                       {formatPrice(post.rentPrice, post.currency)}
                       <span className="text-emerald-100 text-sm font-normal">/month</span>
                     </div>
                     <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold border border-white/20">
                       {post.city}
                     </div>
                   </div>
                 )}
 
                 {/* Content */}
                 <div className="p-6">
                   <div className="flex justify-between items-start mb-4">
                     <div>
                       <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wide">
                         {post.propertyType || "Property"}
                       </p>
                       <p className="text-xs text-emerald-100/70 mt-1">{post.address}</p>
                     </div>
                     <p className="text-xs text-emerald-100/60 bg-white/10 px-2 py-1 rounded-full">
                       Listed {formatDate(post.createdAt)}
                     </p>
                   </div>
 
                   <Link href={`/dashboard/pages/article/${post.id}`}>
                     <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 group-hover:text-emerald-300 transition-colors cursor-pointer leading-tight">
                       {post.title || "Beautiful Rental Property"}
                     </h3>
                   </Link>
 
                   {/* Features */}
                   <div className="flex flex-wrap gap-2 mb-5">
                     {post.contactNumber && (
                       <span className="bg-emerald-500/20 text-emerald-300 text-xs px-3 py-2 rounded-lg border border-emerald-400/30 backdrop-blur-sm">
                         📞 {post.contactNumber}
                       </span>
                     )}
                     <span className="bg-purple-500/20 text-purple-300 text-xs px-3 py-2 rounded-lg border border-purple-400/30 backdrop-blur-sm">
                       🗓️ {formatDate(post.availableFrom)}
                     </span>
                     {post.bedrooms && (
                       <span className="bg-blue-500/20 text-blue-300 text-xs px-3 py-2 rounded-lg border border-blue-400/30 backdrop-blur-sm">
                         🛏️ {post.bedrooms} bed
                       </span>
                     )}
                   </div>
 
                   {/* Action Buttons */}
                   <div className="flex items-center justify-between pt-4 border-t border-white/10">
                     <Link
                       href={`/dashboard/pages/article/${post.id}`}
                       className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl font-semibold text-sm flex items-center group/btn"
                     >
                       View Details
                       <span className="ml-2 group-hover/btn:translate-x-1 transition-transform">→</span>
                     </Link>
 
                     <button
                       onClick={() => handleCopyLink(post.id)}
                       className={`p-3 rounded-xl transition-all duration-300 ${
                         copiedId === post.id
                           ? "bg-green-500/20 text-green-400 border border-green-400/50"
                           : "bg-white/10 text-emerald-100 border border-white/20 hover:bg-emerald-500/20 hover:text-emerald-300 hover:border-emerald-400/50"
                       }`}
                       title="Copy share link"
                     >
                       {copiedId === post.id ? (
                         <span className="flex items-center">
                           <span className="text-green-400">✔️</span>
                         </span>
                       ) : (
                         <span className="flex items-center">
                           <span className="text-lg">🔗</span>
                         </span>
                       )}
                     </button>
                   </div>
                 </div>
               </article>
             ))}
           </div>
         )}
       </div>
 
       {/* Footer */}
       <div className="bg-black/30 backdrop-blur-lg border-t border-white/10 py-8">
         <div className="container mx-auto px-4 text-center">
           <p className="text-emerald-100/70">
             Found {filteredPosts.length} amazing properties • Your dream home awaits
           </p>
           <div className="flex justify-center gap-6 mt-4">
             <span className="text-emerald-300/50">🏠</span>
             <span className="text-emerald-300/50">✨</span>
             <span className="text-emerald-300/50">🌟</span>
           </div>
         </div>
       </div>
     </div>
   );
 }