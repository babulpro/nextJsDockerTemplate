'use client'
import React from 'react';
import Link from 'next/link';

const PrivacyPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 mt-10">
            {/* Header Section */}
            <div className="max-w-4xl mx-auto px-4 text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-6">
                    Privacy Policy
                </h1>
                <p className="text-xl text-emerald-100/80 leading-relaxed">
                    Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
                </p>
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                    <span className="text-xs bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/30 text-emerald-300">
                        🔒 Last Updated: Dec 2024
                    </span>
                    <span className="text-xs bg-teal-500/20 px-3 py-1 rounded-full border border-teal-400/30 text-teal-300">
                        📝 Version 2.1
                    </span>
                    <span className="text-xs bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-400/30 text-cyan-300">
                        🌍 GDPR Compliant
                    </span>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 md:p-12 shadow-2xl">
                    {/* Quick Navigation */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                            <span className="w-3 h-3 bg-emerald-400 rounded-full mr-3"></span>
                            Quick Navigation
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { title: 'Data Collection', icon: '📊', href: '#data-collection' },
                                { title: 'How We Use Data', icon: '🔍', href: '#data-usage' },
                                { title: 'Data Protection', icon: '🛡️', href: '#data-protection' },
                                { title: 'Your Rights', icon: '👤', href: '#your-rights' }
                            ].map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-emerald-400/30 hover:bg-emerald-500/10 transition-all duration-300 group"
                                >
                                    <span className="text-2xl">{item.icon}</span>
                                    <span className="text-emerald-100 group-hover:text-emerald-300 font-medium">
                                        {item.title}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Introduction */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-white mb-6">Introduction</h2>
                        <div className="space-y-4 text-emerald-100/80 leading-relaxed">
                            <p>
                                At HouseRent, we are committed to protecting your privacy and ensuring the security of your personal information. 
                                This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our platform.
                            </p>
                            <p>
                                By using HouseRent, you agree to the collection and use of information in accordance with this policy. 
                                We encourage you to read this policy carefully to understand our practices regarding your personal data.
                            </p>
                        </div>
                    </section>

                    {/* Data Collection */}
                    <section id="data-collection" className="mb-12">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                            <span className="w-3 h-3 bg-teal-400 rounded-full mr-3"></span>
                            Information We Collect
                        </h2>
                        <div className="space-y-6">
                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                <h3 className="text-xl font-semibold text-white mb-3">Personal Information</h3>
                                <ul className="text-emerald-100/80 space-y-2 list-disc list-inside">
                                    <li>Name, email address, and contact information</li>
                                    <li>Profile information and preferences</li>
                                    <li>Payment and billing details</li>
                                    <li>Government-issued identification for verification</li>
                                </ul>
                            </div>

                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                <h3 className="text-xl font-semibold text-white mb-3">Usage Data</h3>
                                <ul className="text-emerald-100/80 space-y-2 list-disc list-inside">
                                    <li>IP address and browser type</li>
                                    <li>Pages visited and time spent on our platform</li>
                                    <li>Search queries and property preferences</li>
                                    <li>Device information and operating system</li>
                                </ul>
                            </div>

                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                <h3 className="text-xl font-semibold text-white mb-3">Property Information</h3>
                                <ul className="text-emerald-100/80 space-y-2 list-disc list-inside">
                                    <li>Property details and descriptions</li>
                                    <li>Photos and media uploads</li>
                                    <li>Location data and amenities</li>
                                    <li>Availability calendars and pricing</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* How We Use Data */}
                    <section id="data-usage" className="mb-12">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                            <span className="w-3 h-3 bg-cyan-400 rounded-full mr-3"></span>
                            How We Use Your Information
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { icon: '🏠', title: 'Service Provision', desc: 'To provide and maintain our rental platform services' },
                                { icon: '🔒', title: 'Security', desc: 'To protect against fraud and unauthorized access' },
                                { icon: '📧', title: 'Communication', desc: 'To send important updates and notifications' },
                                { icon: '📊', title: 'Analytics', desc: 'To improve our platform and user experience' },
                                { icon: '💳', title: 'Payments', desc: 'To process transactions and prevent fraud' },
                                { icon: '⚖️', title: 'Legal Compliance', desc: 'To comply with legal obligations and regulations' }
                            ].map((item, index) => (
                                <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
                                    <div className="text-3xl mb-3">{item.icon}</div>
                                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                                    <p className="text-emerald-100/70 text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Data Protection */}
                    <section id="data-protection" className="mb-12">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                            <span className="w-3 h-3 bg-purple-400 rounded-full mr-3"></span>
                            Data Protection & Security
                        </h2>
                        <div className="space-y-4 text-emerald-100/80 leading-relaxed">
                            <p>
                                We implement appropriate technical and organizational security measures to protect your personal 
                                information against unauthorized access, alteration, disclosure, or destruction.
                            </p>
                            
                            <div className="grid md:grid-cols-3 gap-4 mt-6">
                                <div className="text-center p-4">
                                    <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 text-2xl mx-auto mb-3 border border-emerald-400/30">
                                        🔐
                                    </div>
                                    <h4 className="font-semibold text-white mb-2">Encryption</h4>
                                    <p className="text-sm text-emerald-100/70">All data is encrypted in transit and at rest</p>
                                </div>
                                <div className="text-center p-4">
                                    <div className="w-16 h-16 bg-teal-500/20 rounded-2xl flex items-center justify-center text-teal-400 text-2xl mx-auto mb-3 border border-teal-400/30">
                                        🛡️
                                    </div>
                                    <h4 className="font-semibold text-white mb-2">Access Control</h4>
                                    <p className="text-sm text-emerald-100/70">Strict access controls and authentication</p>
                                </div>
                                <div className="text-center p-4">
                                    <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400 text-2xl mx-auto mb-3 border border-cyan-400/30">
                                        📋
                                    </div>
                                    <h4 className="font-semibold text-white mb-2">Regular Audits</h4>
                                    <p className="text-sm text-emerald-100/70">Continuous security monitoring and testing</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Your Rights */}
                    <section id="your-rights" className="mb-12">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                            <span className="w-3 h-3 bg-emerald-400 rounded-full mr-3"></span>
                            Your Privacy Rights
                        </h2>
                        <div className="space-y-6">
                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                <h3 className="text-xl font-semibold text-white mb-4">You Have the Right To:</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {[
                                        { right: 'Access your personal data', icon: '👁️' },
                                        { right: 'Correct inaccurate data', icon: '✏️' },
                                        { right: 'Delete your personal data', icon: '🗑️' },
                                        { right: 'Restrict processing', icon: '⏸️' },
                                        { right: 'Data portability', icon: '📤' },
                                        { right: 'Object to processing', icon: '🚫' }
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center space-x-3">
                                            <span className="text-xl">{item.icon}</span>
                                            <span className="text-emerald-100/80">{item.right}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Contact Information */}
                    <section className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl p-8 border border-emerald-400/30">
                        <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                        <p className="text-emerald-100/80 mb-4">
                            If you have any questions about this Privacy Policy or how we handle your data, 
                            please contact our Data Protection Officer:
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex items-center space-x-3">
                                <span className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 border border-emerald-400/30">
                                    ✉️
                                </span>
                                <div>
                                    <p className="text-white font-medium">Email</p>
                                    <p className="text-emerald-100/70">babul1946@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center text-teal-400 border border-teal-400/30">
                                    📞
                                </span>
                                <div>
                                    <p className="text-white font-medium">Phone</p>
                                    <p className="text-emerald-100/70">+8801920987588</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Policy Updates */}
                    <div className="mt-8 pt-8 border-t border-white/10">
                        <h3 className="text-xl font-bold text-white mb-4">Policy Updates</h3>
                        <p className="text-emerald-100/80">
                            We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                            the new Privacy Policy on this page and updating the "Last Updated" date.
                        </p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <Link 
                        href="/footerLink/terms" 
                        className="bg-white/10 text-white px-6 py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 text-center"
                    >
                        📄 View Terms of Service
                    </Link>
                    <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300">
                        🖨️ Print This Policy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;