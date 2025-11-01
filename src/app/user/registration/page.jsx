"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

export default function Page(){
    const router = useRouter()
    const [data, setData] = useState({name: "", email: "", phone: "", password: "", address: ""})
    const [isLoading, setIsLoading] = useState(false)

    const InputChange = (name, value) => {
        setData(pre => ({
            ...pre,
            [name]: value
        }))
    }

    const FormSubmitHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if(data.email.trim() === ""){
            toast.error("Please enter a valid email")
            setIsLoading(false)
            return
        }
        else if(data.password.trim() === ""){
            toast.error("Please enter a valid password")
            setIsLoading(false)
            return
        }
        else if(data.name.trim() === ""){
            toast.error("Please enter your full name")
            setIsLoading(false)
            return
        }

        try{
            const config = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }

            const response = await fetch("/api/user/createUser", config, { cache: "no-cache" })
            
            if(!response.ok){
                toast.error("User already exists with this email")
                setIsLoading(false)
                return
            }

            const json = await response.json()
            
            if(json.status === "success"){
                toast.success('🎉 Welcome to HouseRent! Your account has been created successfully.')
                router.push("/")
            } else {
                toast.error("Registration failed. Please try again.")
            }

        }
        catch(error){
            toast.error("Network error. Please try again later.")
            console.error("Registration error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex justify-center items-center p-4">
            <div className="w-full max-w-2xl">
                {/* Registration Card */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 shadow-lg">
                            🏠
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            Join HouseRent
                        </h1>
                        <p className="text-emerald-100/70 text-sm mt-2">
                            Create your account and start your journey
                        </p>
                    </div>

                    {/* Registration Form */}
                    <form onSubmit={FormSubmitHandler} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-emerald-100/80 font-medium text-sm">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400">
                                        👤
                                    </div>
                                    <input 
                                        type='text' 
                                        placeholder='Enter your full name' 
                                        value={data.name} 
                                        onChange={(e) => InputChange("name", e.target.value)} 
                                        className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                                        id="name"
                                        required
                                    />
                                </div>
                            </div>

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
                                        placeholder="Create a password" 
                                        value={data.password} 
                                        onChange={(e) => InputChange("password", e.target.value)} 
                                        className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                                        id="password"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Phone Field */}
                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-emerald-100/80 font-medium text-sm">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400">
                                        📞
                                    </div>
                                    <input 
                                        type='text' 
                                        placeholder='Enter your phone number' 
                                        value={data.phone} 
                                        onChange={(e) => InputChange("phone", e.target.value)} 
                                        className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                                        id="phone"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Address Field - Full Width */}
                        <div className="space-y-2">
                            <label htmlFor="address" className="text-emerald-100/80 font-medium text-sm">
                                Address
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-4 text-emerald-400">
                                    🏡
                                </div>
                                <textarea 
                                    placeholder='Enter your complete address (vill: modon dia, p.o: dhamrai, p.s: dhamrai, dis: dhaka)' 
                                    value={data.address} 
                                    onChange={(e) => InputChange("address", e.target.value)} 
                                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 resize-none min-h-[80px]"
                                    id="address"
                                    rows="3"
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
                                    <span>Creating Account...</span>
                                </>
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <span className="group-hover:translate-x-1 transition-transform">🚀</span>
                                </>
                            )}
                        </button>

                        {/* Links Section */}
                        <div className="flex justify-between items-center pt-4 border-t border-white/10">
                            <Link 
                                href="/" 
                                className="text-emerald-100/70 hover:text-emerald-300 transition-all duration-300 text-sm font-medium flex items-center space-x-1 group"
                            >
                                <span>Already have an account?</span>
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
                                🔒 Your personal information is secure and encrypted
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}