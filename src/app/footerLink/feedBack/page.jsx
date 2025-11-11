'use client'
import React, { useState } from 'react';
import Link from 'next/link';

const FeedbackPage = () => {
    const [feedbackType, setFeedbackType] = useState('general');
    const [rating, setRating] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        allowContact: false
    });

    const feedbackTypes = [
        {
            id: 'general',
            title: 'General Feedback',
            icon: '💬',
            description: 'Share your overall experience and suggestions'
        },
        {
            id: 'bug',
            title: 'Bug Report',
            icon: '🐛',
            description: 'Report technical issues or problems'
        },
        {
            id: 'feature',
            title: 'Feature Request',
            icon: '💡',
            description: 'Suggest new features or improvements'
        },
        {
            id: 'safety',
            title: 'Safety Concern',
            icon: '🛡️',
            description: 'Report safety or security issues'
        }
    ];

    const testimonials = [
        {
            name: 'Sarah M.',
            role: 'Frequent Tenant',
            feedback: 'The booking process is incredibly smooth. Love the verification system!',
            rating: 5,
            avatar: '👩'
        },
        {
            name: 'Mike R.',
            role: 'Property Host',
            feedback: 'Great platform for hosts. The payment system is secure and reliable.',
            rating: 4,
            avatar: '👨'
        },
        {
            name: 'Emma L.',
            role: 'Business Traveler',
            feedback: 'Perfect for business trips. The 24/7 support is amazing!',
            rating: 5,
            avatar: '👩‍💼'
        }
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Feedback submitted:', { ...formData, feedbackType, rating });
        alert('Thank you for your feedback! We appreciate your input.');
        // Reset form
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
            allowContact: false
        });
        setRating(0);
        setFeedbackType('general');
    };

    const renderStars = (count) => {
        return Array.from({ length: 5 }, (_, index) => (
            <span
                key={index}
                className={`text-2xl cursor-pointer transition-transform ${
                    index < count ? 'text-yellow-400' : 'text-emerald-100/30'
                } ${index < rating ? 'hover:scale-110' : ''}`}
                onClick={() => setRating(index + 1)}
            >
                {index < count ? '⭐' : '☆'}
            </span>
        ));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 mt-10">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto px-4 text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-6">
                    Share Your Feedback
                </h1>
                <p className="text-xl text-emerald-100/80 max-w-3xl mx-auto leading-relaxed">
                    Your thoughts help us improve. We value every suggestion, concern, and idea you share with us.
                </p>
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                    <span className="text-xs bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/30 text-emerald-300">
                        💬 We Read Every Message
                    </span>
                    <span className="text-xs bg-teal-500/20 px-3 py-1 rounded-full border border-teal-400/30 text-teal-300">
                        🚀 Quick Responses
                    </span>
                    <span className="text-xs bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-400/30 text-cyan-300">
                        🔒 Private & Secure
                    </span>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Feedback Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 shadow-2xl">
                            <h2 className="text-3xl font-bold text-white mb-2">Send Us Your Feedback</h2>
                            <p className="text-emerald-100/70 mb-8">Help us make HouseRent better for everyone</p>

                            {/* Feedback Type Selection */}
                            <div className="mb-8">
                                <label className="block text-emerald-200 text-lg font-semibold mb-4">
                                    What type of feedback do you have?
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {feedbackTypes.map((type) => (
                                        <button
                                            key={type.id}
                                            onClick={() => setFeedbackType(type.id)}
                                            className={`p-4 rounded-xl border transition-all duration-300 text-center group ${
                                                feedbackType === type.id
                                                    ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-300'
                                                    : 'bg-white/5 border-white/20 text-emerald-100/70 hover:bg-white/10'
                                            }`}
                                        >
                                            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                                                {type.icon}
                                            </div>
                                            <div className="text-sm font-semibold">{type.title}</div>
                                            <div className="text-xs text-emerald-100/50 mt-1 hidden md:block">
                                                {type.description}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Rating System */}
                            <div className="mb-8">
                                <label className="block text-emerald-200 text-lg font-semibold mb-4">
                                    How would you rate your experience?
                                </label>
                                <div className="flex items-center space-x-2 mb-4">
                                    {renderStars(rating)}
                                </div>
                                <div className="text-emerald-100/60 text-sm">
                                    {rating === 0 && 'Select your rating'}
                                    {rating === 1 && 'Poor - We need to improve'}
                                    {rating === 2 && 'Fair - Some issues need attention'}
                                    {rating === 3 && 'Good - Satisfactory experience'}
                                    {rating === 4 && 'Very Good - Happy with the service'}
                                    {rating === 5 && 'Excellent - Outstanding experience!'}
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-emerald-200 text-sm font-medium mb-2">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white placeholder-emerald-200/50 focus:ring-2 ring-emerald-400 focus:border-emerald-400/50 transition-all duration-300"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-emerald-200 text-sm font-medium mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white placeholder-emerald-200/50 focus:ring-2 ring-emerald-400 focus:border-emerald-400/50 transition-all duration-300"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-emerald-200 text-sm font-medium mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white placeholder-emerald-200/50 focus:ring-2 ring-emerald-400 focus:border-emerald-400/50 transition-all duration-300"
                                        placeholder="Brief summary of your feedback"
                                    />
                                </div>

                                <div>
                                    <label className="block text-emerald-200 text-sm font-medium mb-2">
                                        Your Feedback *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="6"
                                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white placeholder-emerald-200/50 focus:ring-2 ring-emerald-400 focus:border-emerald-400/50 transition-all duration-300 resize-none"
                                        placeholder="Please provide detailed feedback about your experience, suggestions, or concerns..."
                                    />
                                </div>

                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        name="allowContact"
                                        checked={formData.allowContact}
                                        onChange={handleChange}
                                        className="w-4 h-4 bg-white/10 border border-emerald-400/30 rounded focus:ring-2 ring-emerald-400"
                                    />
                                    <label className="text-emerald-100/70 text-sm">
                                        I allow HouseRent to contact me for follow-up on this feedback
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 text-lg"
                                >
                                    Submit Feedback
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* User Testimonials */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-6">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
                                What Users Say
                            </h3>
                            <div className="space-y-4">
                                {testimonials.map((testimonial, index) => (
                                    <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className="text-2xl">{testimonial.avatar}</div>
                                            <div>
                                                <div className="font-semibold text-white">{testimonial.name}</div>
                                                <div className="text-emerald-100/60 text-xs">{testimonial.role}</div>
                                            </div>
                                        </div>
                                        <p className="text-emerald-100/70 text-sm mb-2">{testimonial.feedback}</p>
                                        <div className="flex space-x-1">
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <span key={i} className={i < testimonial.rating ? 'text-yellow-400' : 'text-emerald-100/30'}>
                                                    ⭐
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Feedback Options */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-6">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                                Quick Feedback
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { icon: '📱', text: 'App Experience', emoji: '👍👎' },
                                    { icon: '💳', text: 'Payment Process', emoji: '✅❌' },
                                    { icon: '🔍', text: 'Search & Filters', emoji: '🔍✨' },
                                    { icon: '🏠', text: 'Property Quality', emoji: '⭐👎' }
                                ].map((item, index) => (
                                    <button
                                        key={index}
                                        className="w-full flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-400/30 hover:bg-cyan-500/10 transition-all duration-300 group"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                                            <span className="text-emerald-100/70 group-hover:text-cyan-300 transition-colors">
                                                {item.text}
                                            </span>
                                        </div>
                                        <span className="text-lg opacity-60 group-hover:opacity-100 transition-opacity">
                                            {item.emoji}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Feedback Stats */}
                        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl border border-purple-400/30 p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Your Feedback Matters</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-emerald-100/70">Feedback Implemented</span>
                                    <span className="text-white font-semibold">87%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-emerald-100/70">Average Response Time</span>
                                    <span className="text-white font-semibold">2.3 hours</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-emerald-100/70">User Satisfaction</span>
                                    <span className="text-white font-semibold">4.8/5</span>
                                </div>
                            </div>
                        </div>

                        {/* Additional Support */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Need Immediate Help?</h3>
                            <div className="space-y-3">
                                <Link 
                                    href="/help" 
                                    className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:border-emerald-400/30 hover:bg-emerald-500/10 transition-all duration-300 group"
                                >
                                    <span className="text-xl group-hover:scale-110 transition-transform">❓</span>
                                    <span className="text-emerald-100/70 group-hover:text-emerald-300 transition-colors">
                                        Visit Help Center
                                    </span>
                                </Link>
                                <Link 
                                    href="/contact" 
                                    className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:border-teal-400/30 hover:bg-teal-500/10 transition-all duration-300 group"
                                >
                                    <span className="text-xl group-hover:scale-110 transition-transform">💬</span>
                                    <span className="text-emerald-100/70 group-hover:text-teal-300 transition-colors">
                                        Contact Support
                                    </span>
                                </Link>
                                <button className="w-full flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-400/30 hover:bg-cyan-500/10 transition-all duration-300 group">
                                    <span className="text-xl group-hover:scale-110 transition-transform">📞</span>
                                    <span className="text-emerald-100/70 group-hover:text-cyan-300 transition-colors">
                                        Call Support: +1 (555) 123-4567
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Improvements */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">
                        Recent Improvements from Your Feedback
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                improvement: 'Enhanced Search Filters',
                                basedOn: '150+ user suggestions',
                                impact: 'Search success rate increased by 45%',
                                icon: '🔍'
                            },
                            {
                                improvement: 'Faster Booking Process',
                                basedOn: 'User experience feedback',
                                impact: 'Booking time reduced by 60%',
                                icon: '⚡'
                            },
                            {
                                improvement: 'Improved Mobile App',
                                basedOn: 'App store reviews & feedback',
                                impact: 'Mobile usage increased by 75%',
                                icon: '📱'
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-emerald-400/30 transition-all duration-300 group">
                                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
                                <h3 className="text-lg font-semibold text-white mb-2">{item.improvement}</h3>
                                <p className="text-emerald-100/60 text-sm mb-2">Based on: {item.basedOn}</p>
                                <p className="text-emerald-400 text-sm font-medium">{item.impact}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackPage;