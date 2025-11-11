'use client'
import React, { useState } from 'react';
import Link from 'next/link';

const HelpCenterPage = () => {
    const [activeCategory, setActiveCategory] = useState('general');
    const [searchQuery, setSearchQuery] = useState('');

    const faqCategories = {
        general: [
            {
                question: "How do I create an account?",
                answer: "Click the 'Sign Up' button in the top right corner, fill in your details, verify your email, and you're ready to start browsing properties."
            },
            {
                question: "Is my personal information secure?",
                answer: "Yes, we use bank-level encryption and follow strict data protection protocols to keep your information safe and private."
            },
            {
                question: "How do I reset my password?",
                answer: "Click 'Forgot Password' on the login page, enter your email, and follow the instructions sent to your inbox."
            }
        ],
        booking: [
            {
                question: "How do I book a property?",
                answer: "Find a property you like, select your dates, review the details, make payment, and wait for host confirmation."
            },
            {
                question: "What payment methods do you accept?",
                answer: "We accept credit/debit cards, PayPal, and bank transfers. All payments are processed securely through our platform."
            },
            {
                question: "Can I modify my booking dates?",
                answer: "Yes, you can request date modifications through your booking dashboard, subject to host approval and availability."
            }
        ],
        hosting: [
            {
                question: "How do I list my property?",
                answer: "Click 'List Your Property', fill in property details, upload photos, set pricing and availability, and publish your listing."
            },
            {
                question: "What are the hosting requirements?",
                answer: "You must own the property or have legal authority to rent it, provide accurate information, and maintain proper insurance."
            },
            {
                question: "How do I get paid?",
                answer: "Payments are automatically transferred to your registered bank account 24 hours after guest check-in."
            }
        ],
        technical: [
            {
                question: "The app is not loading properly",
                answer: "Try clearing your browser cache, updating the app, or using a different browser. Contact support if issues persist."
            },
            {
                question: "I'm having trouble uploading photos",
                answer: "Ensure photos are under 10MB each, in JPG or PNG format. Try compressing images if upload fails."
            },
            {
                question: "How do I enable notifications?",
                answer: "Check your device settings for HouseRent app permissions and enable notifications in your account settings."
            }
        ]
    };

    const popularArticles = [
        {
            title: "Creating Your First Booking",
            description: "Step-by-step guide to booking your perfect rental",
            icon: "📅",
            category: "booking"
        },
        {
            title: "Host Verification Process",
            description: "Learn how to get your property verified quickly",
            icon: "✅",
            category: "hosting"
        },
        {
            title: "Payment Security Guide",
            description: "Understanding our payment protection features",
            icon: "🔒",
            category: "general"
        },
        {
            title: "Cancellation Policies",
            description: "Everything about booking cancellations and refunds",
            icon: "↩️",
            category: "booking"
        }
    ];

    const contactMethods = [
        {
            title: "Live Chat",
            description: "Instant help from our support team",
            icon: "💬",
            response: "Available 24/7",
            action: "Start Chat"
        },
        {
            title: "Email Support",
            description: "Detailed assistance via email",
            icon: "✉️",
            response: "Within 24 hours",
            action: "Send Email"
        },
        {
            title: "Phone Support",
            description: "Speak directly with our team",
            icon: "📞",
            response: "Mon-Fri, 9AM-6PM",
            action: "Call Now"
        },
        {
            title: "Community Forum",
            description: "Get help from other users",
            icon: "👥",
            response: "Community Answers",
            action: "Visit Forum"
        }
    ];

    const filteredFAQs = faqCategories[activeCategory].filter(item =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 mt-10">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto px-4 text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-6">
                    Help Center
                </h1>
                <p className="text-xl text-emerald-100/80 max-w-3xl mx-auto leading-relaxed mb-8">
                    Find answers to common questions, browse helpful articles, and get support for any issues you encounter.
                </p>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for help articles, FAQs, or guides..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-6 py-4 bg-white/10 backdrop-blur-lg border border-emerald-400/30 rounded-2xl text-white placeholder-emerald-200/50 focus:ring-2 ring-emerald-400 focus:border-emerald-400/50 transition-all duration-300 text-lg"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-400">
                            🔍
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4">
                {/* Quick Help Cards */}
                <div className="grid md:grid-cols-4 gap-6 mb-16">
                    {contactMethods.map((method, index) => (
                        <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-emerald-400/30 hover:bg-emerald-500/10 transition-all duration-300 group text-center">
                            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{method.icon}</div>
                            <h3 className="text-lg font-semibold text-white mb-2">{method.title}</h3>
                            <p className="text-emerald-100/70 text-sm mb-3">{method.description}</p>
                            <div className="text-xs text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded-full border border-emerald-400/30 inline-block mb-3">
                                {method.response}
                            </div>
                            <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-2 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 text-sm">
                                {method.action}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Popular Articles */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                        <span className="w-3 h-3 bg-teal-400 rounded-full mr-3"></span>
                        Popular Help Articles
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {popularArticles.map((article, index) => (
                            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-teal-400/30 hover:bg-teal-500/10 transition-all duration-300 group">
                                <div className="flex items-start space-x-4">
                                    <div className="text-2xl group-hover:scale-110 transition-transform">{article.icon}</div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-teal-300 transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-emerald-100/70 mb-3">{article.description}</p>
                                        <span className="text-xs bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full border border-teal-400/30">
                                            {article.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ Categories */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 shadow-2xl">
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                        <span className="w-3 h-3 bg-cyan-400 rounded-full mr-3"></span>
                        Frequently Asked Questions
                    </h2>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-3 mb-8">
                        {Object.keys(faqCategories).map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-3 rounded-xl font-semibold border transition-all duration-300 capitalize ${
                                    activeCategory === category
                                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30'
                                        : 'bg-white/5 text-emerald-100/70 border-white/20 hover:bg-white/10'
                                }`}
                            >
                                {category} ({faqCategories[category].length})
                            </button>
                        ))}
                    </div>

                    {/* FAQ List */}
                    <div className="space-y-4">
                        {filteredFAQs.length > 0 ? (
                            filteredFAQs.map((faq, index) => (
                                <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 group">
                                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center group-hover:text-cyan-300 transition-colors">
                                        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                                        {faq.question}
                                    </h3>
                                    <p className="text-emerald-100/70 pl-5 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-4">🔍</div>
                                <p className="text-emerald-100/80 text-lg">No results found for "{searchQuery}"</p>
                                <p className="text-emerald-100/60">Try different keywords or browse the categories above</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Emergency Support */}
                <div className="mt-12 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl p-8 border border-amber-400/30">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center space-x-4 mb-4 md:mb-0">
                            <div className="text-4xl">🚨</div>
                            <div>
                                <h3 className="text-xl font-bold text-amber-300">Emergency Support</h3>
                                <p className="text-amber-100/80">Need immediate assistance with an active booking?</p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button className="bg-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-600 transition-all duration-300">
                                🚨 Emergency Hotline
                            </button>
                            <button className="bg-white/10 text-white px-6 py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300">
                                📞 Call Now: +1 (555) 911-RENT
                            </button>
                        </div>
                    </div>
                </div>

                {/* Additional Resources */}
                <div className="mt-12 grid md:grid-cols-3 gap-6">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
                        <div className="text-3xl mb-3">📚</div>
                        <h3 className="text-lg font-semibold text-white mb-2">Knowledge Base</h3>
                        <p className="text-emerald-100/70 text-sm mb-4">Browse our comprehensive guides and tutorials</p>
                        <button className="bg-white/10 text-white px-4 py-2 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 text-sm">
                            Explore Guides
                        </button>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
                        <div className="text-3xl mb-3">🎥</div>
                        <h3 className="text-lg font-semibold text-white mb-2">Video Tutorials</h3>
                        <p className="text-emerald-100/70 text-sm mb-4">Watch step-by-step video guides</p>
                        <button className="bg-white/10 text-white px-4 py-2 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 text-sm">
                            Watch Videos
                        </button>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
                        <div className="text-3xl mb-3">📋</div>
                        <h3 className="text-lg font-semibold text-white mb-2">Community</h3>
                        <p className="text-emerald-100/70 text-sm mb-4">Join discussions with other users</p>
                        <button className="bg-white/10 text-white px-4 py-2 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 text-sm">
                            Join Community
                        </button>
                    </div>
                </div>

                {/* Still Need Help */}
                <div className="mt-12 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Still Need Help?</h2>
                    <p className="text-emerald-100/80 mb-6">Our support team is here to assist you with any issues</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            href="/footerLink/contact" 
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300"
                        >
                            Contact Support Team
                        </Link>
                        <button className="bg-white/10 text-white px-8 py-4 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300">
                            Schedule a Call
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpCenterPage;