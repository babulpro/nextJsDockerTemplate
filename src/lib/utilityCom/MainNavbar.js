'use client'
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast"; 
import Image from 'next/image'

const MainNavbar = () => { 
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/user/currentUser", { 
        cache: 'no-cache' 
      });
      
      if (!response.ok) throw new Error("Failed to fetch user data");
      
      const { data } = await response.json();
      setUserData(data || {});
    } catch (error) {
      console.error("Fetch error:", error);
      setUserData({});
    } finally {
      setIsLoading(false);
    }
  };

  const logOut = async () => {
    try {
      const response = await fetch("/api/user/createUser", { 
        method: "GET",
        cache: 'no-cache'
      });
      
      const json = await response.json();

      if (json.status === "ok") {
        toast.success("Log Out Success");
        window.location.href = "/";
      }
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout error:", error);
    }
  };

  // Navigation items configuration
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/dashboard/pages/findHouse', label: 'Find House' },
    { href: '/dashboard/pages/article', label: 'Rent Your House' },
    { href: '/dashboard/pages/about', label: 'About' },
    { href: '/dashboard/pages/support', label: 'Support' }
  ];

  // Admin-only items
  const adminItems = [
    { href: '/dashboard/pages/admin', label: 'Admin Panel' },
    { href: '/dashboard/pages/statistics', label: 'Statistics' },
  ];

  const renderNavItem = (item) => (
    <li key={item.href}>
      <Link href={item.href} className="w-full">
        {item.label}
      </Link>
    </li>
  );

   
  return (
    <div className="navbar bg-base-100 shadow-sm fixed top-0 z-50">
      {/* Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4 6h16M4 12h8m-8 6h16" 
              />
            </svg>
          </div>
          
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content bg-base-100 rounded-box z-50 mt-3 w-56 p-2 shadow"
          >
            {/* Regular navigation items */}
            {navItems.map(renderNavItem)}
            
            {/* Admin items (if user is admin) */}
            {userData.role === 'admin' && adminItems.map(renderNavItem)}
          </ul>
        </div>

        {/* Logo */}
        <div className="w-12 h-12 hidden md:block">
          <Link href="/">
            <Image
              src="/routine.png"
              width={48}
              height={48}
              alt="App Logo"
              className="object-contain"
            />
          </Link>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems.map(renderNavItem)}
          
          {/* Admin items with visual distinction */}
          {userData.role === 'admin' && 
            adminItems.map(item => (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  className="w-full text-purple-600 font-semibold hover:text-purple-700"
                >
                  👑 {item.label}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>

      {/* Logout Button */}
      <div className="navbar-end">
        {!isLoading && (
          
          <div>

            <div className="flex gap-2">
                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li><a>My Houses</a></li>
                    <li> <a>My Booking</a> </li>
                    <li><a>Settings</a></li>
                    <li>
                      <button
                          onClick={logOut}
                           className="btn btn-ghost hover:btn-error transition-colors"
                           disabled={isLoading}
                         >
                           {isLoading ? (
                             <span className="loading loading-spinner loading-sm"></span>
                           ) : (
                             'Logout'
                           )}
                         </button>
                    </li>
                  </ul>
                </div>
              </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default MainNavbar;