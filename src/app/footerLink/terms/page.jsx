'use client'
import React from 'react';
import Link from 'next/link';

const TermsPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 mt-10">
            {/* Header Section */}
            <div className="max-w-4xl mx-auto px-4 text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-6">
                    Terms of Service
                </h1>
                <p className="text-xl text-emerald-100/80 leading-relaxed">
                    Please read these terms carefully before using our platform. By using HouseRent, you agree to be bound by these terms.
                </p>
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                    <span className="text-xs bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/30 text-emerald-300">
                        ⚖️ Effective: Dec 2024
                    </span>
                    <span className="text-xs bg-teal-500/20 px-3 py-1 rounded-full border border-teal-400/30 text-teal-300">
                        📝 Version 3.0
                    </span>
                    <span className="text-xs bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-400/30 text-cyan-300">
                        🔄 Updated Regularly
                    </span>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 md:p-12 shadow-2xl">
                    {/* Important Notice */}
                    <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl p-6 border border-amber-400/30 mb-8">
                        <div className="flex items-start space-x-4">
                            <div className="text-2xl">⚠️</div>
                            <div>
                                <h3 className="text-lg font-semibold text-amber-300 mb-2">Important Legal Notice</h3>
                                <p className="text-amber-100/80 text-sm">
                                    These Terms of Service constitute a legally binding agreement between you and HouseRent. 
                                    By accessing or using our platform, you acknowledge that you have read, understood, and agree to be bound by these terms.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Navigation */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                            <span className="w-3 h-3 bg-emerald-400 rounded-full mr-3"></span>
                            Table of Contents
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { title: 'Account Terms', icon: '👤', href: '#account-terms' },
                                { title: 'Booking & Payments', icon: '💳', href: '#booking-payments' },
                                { title: 'Property Listings', icon: '🏠', href: '#property-listings' },
                                { title: 'User Conduct', icon: '📝', href: '#user-conduct' },
                                { title: 'Liability', icon: '⚖️', href: '#liability' },
                                { title: 'Termination', icon: '🚫', href: '#termination' }
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

                    {/* Agreement Section */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-white mb-6">Agreement to Terms</h2>
                        <div className="space-y-4 text-emerald-100/80 leading-relaxed">
                            <p>
                                These Terms of Service ("Terms") govern your access to and use of the HouseRent platform, 
                                including any content, functionality, and services offered on or through our website and mobile application.
                            </p>
                            <p>
                                By registering for an account or using our services, you accept and agree to be bound by these Terms. 
                                If you do not agree to these Terms, you must not access or use our platform.
                            </p>
                        </div>
                    </section>

                    {/* Account Terms */}
                    <section id="account-terms" className="mb-12">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                            <span className="w-3 h-3 bg-teal-400 rounded-full mr-3"></span>
                            Account Terms & Registration
                        </h2>
                        <div className="space-y-6">
                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                <h3 className="text-xl font-semibold text-white mb-4">Eligibility Requirements</h3>
                                <ul className="text-emerald-100/80 space-y-3 list-disc list-inside">
                                    <li>You must be at least 18 years old to create an account</li>
                                    <li>You must provide accurate and complete registration information</li>
                                    <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                                    <li>You must notify us immediately of any unauthorized use of your account</li>
                                </ul>
                            </div>

                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                <h3 className="text-xl font-semibold text-white mb-4">Account Responsibilities</h3>
                                <ul className="text-emerald-100/80 space-y-3 list-disc list-inside">
                                    <li>You are solely responsible for all activities under your account</li>
                                    <li>You must not create multiple accounts for abusive purposes</li>
                                    <li>You must not transfer or sell your account to another party</li>
                                    <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Booking & Payments */}
                    <section id="booking-payments" className="mb-12">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                            <span className="w-3 h-3 bg-cyan-400 rounded-full mr-3"></span>
                            Booking & Payment Terms
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                {
                                    icon: '💰',
                                    title: 'Payment Processing',
                                    items: [
                                        'All payments processed through secure payment gateways',
                                        'Service fees are non-refundable once booking is confirmed',
                                        'Currency conversion rates apply for international transactions'
                                    ]
                                },
                                {
                                    icon: '📅',
                                    title: 'Booking Confirmation',
                                    items: [
                                        'Bookings are confirmed upon payment receipt',
                                        'Hosts have 24 hours to accept or decline bookings',
                                        'Instant booking available for verified properties'
                                    ]
                                },
                                {
                                    icon: '↩️',
                                    title: 'Cancellation Policy',
                                    items: [
                                        'Cancellation policies vary by property listing',
                                        'Refunds processed according to host cancellation policy',
                                        'Service fees may be non-refundable'
                                    ]
                                },
                                {
                                    icon: '🛡️',
                                    title: 'Security Deposit',
                                    items: [
                                        'Security deposits held for property protection',
                                        'Refunded within 14 days after checkout if no damages',
                                        'Dispute resolution process available for deposit claims'
                                    ]
                                }
                            ].map((section, index) => (
                                <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
                                    <div className="text-3xl mb-3">{section.icon}</div>
                                    <h3 className="text-lg font-semibold text-white mb-4">{section.title}</h3>
                                    <ul className="text-emerald-100/70 space-y-2 text-sm">
                                        {section.items.map((item, itemIndex) => (
                                            <li key={itemIndex} className="flex items-start space-x-2">
                                                <span className="w-1 h-1 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Property Listings */}
                    <section id="property-listings" className="mb-12">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                            <span className="w-3 h-3 bg-purple-400 rounded-full mr-3"></span>
                            Property Listing Requirements
                        </h2>
                        <div className="space-y-4 text-emerald-100/80 leading-relaxed">
                            <p>
                                Property owners and hosts are responsible for ensuring their listings are accurate, complete, 
                                and comply with all applicable laws and regulations.
                            </p>
                            
                            <div className="grid md:grid-cols-2 gap-6 mt-6">
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 p-4 bg-green-500/10 rounded-xl border border-green-400/20">
                                        <span className="text-2xl">✅</span>
                                        <span className="text-green-300 font-medium">Required</span>
                                    </div>
                                    <ul className="text-emerald-100/70 space-y-2 text-sm">
                                        <li>• Accurate property descriptions and photos</li>
                                        <li>• Clear pricing and availability calendar</li>
                                        <li>• Valid contact information</li>
                                        <li>• Compliance with local rental laws</li>
                                        <li>• Proper insurance coverage</li>
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 p-4 bg-red-500/10 rounded-xl border border-red-400/20">
                                        <span className="text-2xl">❌</span>
                                        <span className="text-red-300 font-medium">Prohibited</span>
                                    </div>
                                    <ul className="text-emerald-100/70 space-y-2 text-sm">
                                        <li>• Misleading or false information</li>
                                        <li>• Discriminatory rental practices</li>
                                        <li>• Illegal or unsafe properties</li>
                                        <li>• Off-platform payment requests</li>
                                        <li>• Spam or duplicate listings</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* User Conduct */}
                    <section id="user-conduct" className="mb-12">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                            <span className="w-3 h-3 bg-emerald-400 rounded-full mr-3"></span>
                            User Conduct & Responsibilities
                        </h2>
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-4">Tenant Responsibilities</h3>
                                    <ul className="text-emerald-100/80 space-y-3">
                                        <li className="flex items-start space-x-2">
                                            <span className="w-1 h-1 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                                            <span>Respect property rules and neighbors</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="w-1 h-1 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                                            <span>Report any damages or issues promptly</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="w-1 h-1 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                                            <span>Maintain reasonable cleanliness</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="w-1 h-1 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                                            <span>Comply with check-in/check-out procedures</span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-4">Host Responsibilities</h3>
                                    <ul className="text-emerald-100/80 space-y-3">
                                        <li className="flex items-start space-x-2">
                                            <span className="w-1 h-1 bg-teal-400 rounded-full mt-2 flex-shrink-0"></span>
                                            <span>Provide accurate property information</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="w-1 h-1 bg-teal-400 rounded-full mt-2 flex-shrink-0"></span>
                                            <span>Maintain property in safe, habitable condition</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="w-1 h-1 bg-teal-400 rounded-full mt-2 flex-shrink-0"></span>
                                            <span>Respond to booking inquiries promptly</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="w-1 h-1 bg-teal-400 rounded-full mt-2 flex-shrink-0"></span>
                                            <span>Respect tenant privacy and rights</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Liability & Disclaimers */}
                    <section id="liability" className="mb-12">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                            <span className="w-3 h-3 bg-amber-400 rounded-full mr-3"></span>
                            Liability & Disclaimers
                        </h2>
                        <div className="space-y-4 text-emerald-100/80 leading-relaxed">
                            <p>
                                HouseRent acts as an intermediary platform connecting tenants and property owners. 
                                We are not party to any rental agreements between users and do not assume liability for:
                            </p>
                            
                            <div className="grid md:grid-cols-2 gap-6 mt-6">
                                {[
                                    'Property condition or safety',
                                    'User conduct or disputes',
                                    'Payment disputes between parties',
                                    'Legal compliance of listings',
                                    'Cancellation or booking issues',
                                    'Third-party service providers'
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                                        <span className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0"></span>
                                        <span className="text-emerald-100/70">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Termination */}
                    <section id="termination" className="mb-12">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                            <span className="w-3 h-3 bg-red-400 rounded-full mr-3"></span>
                            Termination & Suspension
                        </h2>
                        <div className="space-y-4 text-emerald-100/80 leading-relaxed">
                            <p>
                                We reserve the right to suspend or terminate your account and access to our services at our sole discretion, 
                                without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
                            </p>
                            
                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                <h3 className="text-xl font-semibold text-white mb-4">Grounds for Immediate Termination</h3>
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    {[
                                        'Fraudulent activity or misrepresentation',
                                        'Multiple quality or service complaints',
                                        'Violation of applicable laws or regulations',
                                        'Harassment of other users',
                                        'Attempts to circumvent our payment system',
                                        'Repeated cancellation of confirmed bookings'
                                    ].map((reason, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <span className="text-red-400">●</span>
                                            <span className="text-emerald-100/70">{reason}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Contact & Updates */}
                    <section className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl p-8 border border-emerald-400/30">
                        <h2 className="text-2xl font-bold text-white mb-4">Questions & Updates</h2>
                        <p className="text-emerald-100/80 mb-4">
                            If you have any questions about these Terms of Service, please contact us. 
                            We may update these terms from time to time, and continued use of our platform constitutes acceptance of updated terms.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex items-center space-x-3">
                                <span className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 border border-emerald-400/30">
                                    ✉️
                                </span>
                                <div>
                                    <p className="text-white font-medium">Legal Department</p>
                                    <p className="text-emerald-100/70">legal@houserent.com</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center text-teal-400 border border-teal-400/30">
                                    📞
                                </span>
                                <div>
                                    <p className="text-white font-medium">Support</p>
                                    <p className="text-emerald-100/70">+1 (555) 123-4567</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Acceptance Section */}
                <div className="text-center mt-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-emerald-100/80 mb-4">
                        By using our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            href="/footerLink/privacy" 
                            className="bg-white/10 text-white px-6 py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
                        >
                            🔒 Privacy Policy
                        </Link>
                        <button 
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300"
                        >
                            ↑ Back to Top
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;