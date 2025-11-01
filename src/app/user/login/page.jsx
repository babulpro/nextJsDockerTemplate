"use client"

import { useState } from "react"
import Link from 'next/link'
import toast from "react-hot-toast"

export default function Page(){
    const [data, setData] = useState({email: "", password: ""})
    const [isLoading, setIsLoading] = useState(false)

    const InputChange = (name, value) => {
        setData(pre => ({
            ...pre,
            [name]: value
        }))
    }

    const FormSubmitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (data.email.trim() === "") {
            toast.error("Please enter a valid email.");
            setIsLoading(false);
            return;
        } else if (data.password.trim() === "") {
            toast.error("Please enter a valid password.");
            setIsLoading(false);
            return;
        }

        try {
            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };

            const response = await fetch("/api/user/login", config, { cache: "no-cache" });
            
            if (!response.ok) {
                toast.error("Invalid credentials. Please try again.");
                return;
            }

            const json = await response.json();
            
            if (json.status === "success") {
                toast.success('🎉 Welcome to HouseRent!');
                window.location.replace("/");
            } else {
                toast.error("Please provide valid email and password");
            }
        } catch (error) {
            toast.error("Network error. Please try again.");
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    };
 
    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex justify-center items-center p-4 mt-10">
            <div className="w-full md:w-4/5 mt-10">
                {/* Login Card */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 shadow-lg">
                            🔑
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            Welcome Back
                        </h1>
                        <p className="text-emerald-100/70 text-sm mt-2">
                            Sign in to your HouseRent account
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={FormSubmitHandler} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-emerald-100/80 font-medium text-sm">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400">
                                    ✉️
                                </div>
                                <input 
                                    type='email' 
                                    placeholder='Enter your email' 
                                    value={data.email} 
                                    onChange={(e) => InputChange("email", e.target.value)} 
                                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                                    id="email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-emerald-100/80 font-medium text-sm">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400">
                                    🔒
                                </div>
                                <input 
                                    type="password" 
                                    placeholder="Enter your password" 
                                    value={data.password} 
                                    onChange={(e) => InputChange("password", e.target.value)} 
                                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                                    id="password"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-2xl hover:shadow-2xl disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                    <span>Signing In...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </>
                            )}
                        </button>

                        {/* Links Section */}
                        <div className="flex justify-between items-center pt-4 border-t border-white/10">
                            <Link 
                                href="/user/registration" 
                                className="text-emerald-100/70 hover:text-emerald-300 transition-all duration-300 text-sm font-medium flex items-center space-x-1 group"
                            >
                                <span>Create Account</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                            
                            <Link 
                                href="/user/forgetpassword" 
                                className="text-emerald-100/70 hover:text-emerald-300 transition-all duration-300 text-sm font-medium"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Security Note */}
                        <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-xl p-3 text-center">
                            <p className="text-emerald-200/80 text-xs">
                                🔐 Secure login with encrypted connection
                            </p>
                        </div>
                    </form>
                </div>

                {/* Additional Info */}
                <div className="text-center mt-6">
                    <p className="text-emerald-100/50 text-sm">
                        By signing in, you agree to our{" "}
                        <a href="/terms" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                            Terms of Service
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}