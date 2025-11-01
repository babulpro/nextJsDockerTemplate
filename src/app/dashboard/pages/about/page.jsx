import Home from "@/lib/utilityCom/Home";
import Hero from "@/lib/utilityCom/Hero";

export default function Page(){
    return(
       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="py-10 md:px-5 flex justify-center items-center">
                <div className="w-full max-w-7xl m-auto">
                  <div className="space-y-8">
                        {/* Hero Section */}
                        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl">
                            <Hero/>
                        </div>
                        
                        {/* Home Content Section */}
                        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl">
                            <Home/>
                        </div>
                  </div>
                </div>
            </div>
       </div>
    )
}