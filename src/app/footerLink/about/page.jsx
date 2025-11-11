'use client'
import React from 'react';
import Link from 'next/link';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 mt-10">
            {/* Header Section */}
            <div className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-6">
                        About HouseRent
                    </h1>
                    <p className="text-xl text-emerald-100/80 max-w-3xl mx-auto leading-relaxed">
                        We're revolutionizing the way people find and rent homes, creating seamless 
                        connections between tenants and property owners.
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 md:p-12 shadow-2xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                                <span className="w-3 h-3 bg-emerald-400 rounded-full mr-3"></span>
                                Our Mission
                            </h2>
                            <p className="text-emerald-100/80 text-lg leading-relaxed mb-6">
                                To make renting and hosting simple, secure, and delightful for everyone. 
                                We believe everyone deserves a place they can call home.
                            </p>
                            <p className="text-emerald-100/80 text-lg leading-relaxed">
                                Through innovative technology and a user-first approach, we're building 
                                a platform that transforms the rental experience from stressful to seamless.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-emerald-500/20 rounded-2xl p-6 border border-emerald-400/30 text-center">
                                <div className="text-3xl mb-3">🏠</div>
                                <h3 className="text-white font-semibold mb-2">10K+</h3>
                                <p className="text-emerald-100/70 text-sm">Properties Listed</p>
                            </div>
                            <div className="bg-teal-500/20 rounded-2xl p-6 border border-teal-400/30 text-center">
                                <div className="text-3xl mb-3">👥</div>
                                <h3 className="text-white font-semibold mb-2">5K+</h3>
                                <p className="text-emerald-100/70 text-sm">Happy Tenants</p>
                            </div>
                            <div className="bg-cyan-500/20 rounded-2xl p-6 border border-cyan-400/30 text-center">
                                <div className="text-3xl mb-3">🌍</div>
                                <h3 className="text-white font-semibold mb-2">50+</h3>
                                <p className="text-emerald-100/70 text-sm">Cities Covered</p>
                            </div>
                            <div className="bg-purple-500/20 rounded-2xl p-6 border border-purple-400/30 text-center">
                                <div className="text-3xl mb-3">⭐</div>
                                <h3 className="text-white font-semibold mb-2">4.9/5</h3>
                                <p className="text-emerald-100/70 text-sm">Rating</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <h2 className="text-4xl font-bold text-center text-white mb-12">
                    Our Values
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-emerald-400/30 transition-all duration-300">
                        <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 text-2xl mb-6 border border-emerald-400/30">
                            🔒
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">Trust & Safety</h3>
                        <p className="text-emerald-100/70 leading-relaxed">
                            We prioritize the safety and security of our community with verified listings, 
                            secure payments, and 24/7 support.
                        </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-teal-400/30 transition-all duration-300">
                        <div className="w-16 h-16 bg-teal-500/20 rounded-2xl flex items-center justify-center text-teal-400 text-2xl mb-6 border border-teal-400/30">
                            ⚡
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">Simplicity</h3>
                        <p className="text-emerald-100/70 leading-relaxed">
                            We believe in making the rental process straightforward and hassle-free 
                            for both tenants and property owners.
                        </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-cyan-400/30 transition-all duration-300">
                        <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400 text-2xl mb-6 border border-cyan-400/30">
                            🌟
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">Excellence</h3>
                        <p className="text-emerald-100/70 leading-relaxed">
                            We're committed to delivering exceptional service and continuously 
                            improving our platform based on user feedback.
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl p-12 text-center border border-emerald-400/30">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Find Your Perfect Home?
                    </h2>
                    <p className="text-emerald-100/80 text-lg mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied tenants and property owners who trust HouseRent 
                        for their rental needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            href="/" 
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg"
                        >
                            Browse Properties
                        </Link>
                        <Link 
                            href="/footerLink/contact" 
                            className="bg-white/10 text-white px-8 py-4 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;