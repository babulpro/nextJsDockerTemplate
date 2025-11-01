"use client"

import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"

export default function Page(){
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if(!email.trim()) {
            toast.error("Please enter your email address")
            setIsLoading(false)
            return
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))
            
            // In real implementation, you would call your API here
            // const response = await fetch("/api/user/forgot-password", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ email })
            // })

            toast.success("📧 Password reset link sent to your email!")
            setIsSubmitted(true)
            
        } catch (error) {
            toast.error("Failed to send reset link. Please try again.")
            console.error("Forgot password error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex justify-center items-center p-4 mt-15">
            <div className="w-full md:w-4/5">
                {/* Forgot Password Card */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
                    
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 shadow-lg">
                            🔑
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                            Reset Password
                        </h1>
                        <p className="text-emerald-100/70 text-sm mt-2">
                            {isSubmitted 
                                ? "Check your email for reset instructions" 
                                : "Enter your email to receive a reset link"
                            }
                        </p>
                    </div>

                    {!isSubmitted ? (
                        /* Reset Form */
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-emerald-100/80 font-medium text-sm">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400">
                                        ✉️
                                    </div>
                                    <input 
                                        type="email" 
                                        placeholder="Enter your registered email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-amber-400/30 rounded-xl text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                                        id="email"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-300 shadow-2xl hover:shadow-2xl disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                        <span>Sending Link...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Send Reset Link</span>
                                        <span className="group-hover:translate-x-1 transition-transform">🚀</span>
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        /* Success State */
                        <div className="text-center space-y-6">
                            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl mx-auto shadow-lg">
                                ✅
                            </div>
                            
                            <div className="space-y-3">
                                <h3 className="text-xl font-semibold text-white">
                                    Check Your Email
                                </h3>
                                <p className="text-emerald-100/70 text-sm">
                                    We've sent a password reset link to:<br/>
                                    <span className="text-amber-300 font-medium">{email}</span>
                                </p>
                            </div>

                            <div className="bg-amber-500/10 border border-amber-400/20 rounded-xl p-4">
                                <p className="text-amber-200/80 text-xs">
                                    💡 The link will expire in 1 hour. Check your spam folder if you don't see it.
                                </p>
                            </div>

                            <button 
                                onClick={() => {
                                    setIsSubmitted(false)
                                    setEmail("")
                                }}
                                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-2xl hover:shadow-2xl"
                            >
                                Resend Reset Link
                            </button>
                        </div>
                    )}

                    {/* Links Section */}
                    <div className="flex justify-center pt-6 border-t border-white/10">
                        <Link 
                            href="/" 
                            className="text-emerald-100/70 hover:text-emerald-300 transition-all duration-300 text-sm font-medium flex items-center space-x-1 group"
                        >
                            <span>← Back to Login</span>
                        </Link>
                    </div>

                    {/* Help Section */}
                    <div className="mt-6 space-y-3">
                        <div className="bg-blue-500/10 border border-blue-400/20 rounded-xl p-3">
                            <p className="text-blue-200/80 text-xs text-center">
                                💬 Need help? Contact our support team
                            </p>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="text-center mt-6">
                    <p className="text-emerald-100/50 text-sm">
                        Remember your password?{" "}
                        <Link href="/" className="text-amber-400 hover:text-amber-300 transition-colors font-semibold">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}