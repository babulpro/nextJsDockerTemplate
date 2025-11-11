'use client'
import React, { useState } from 'react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 mt-10">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-4 text-center mb-16">
                <h1 className="text-5xl underline md:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-6">
                    Get In Touch
                </h1>
                <p className="text-xl text-emerald-100/80 max-w-3xl mx-auto leading-relaxed">
                    Have questions about our properties or need assistance? We're here to help. 
                    Reach out to us and we'll respond as soon as possible.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 shadow-2xl">
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                                <span className="w-3 h-3 bg-emerald-400 rounded-full mr-3"></span>
                                Contact Information
                            </h2>
                            
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 border border-emerald-400/30 flex-shrink-0">
                                        ✉️
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold text-lg mb-1">Email Us</h3>
                                        <p className="text-emerald-100/70">babul1946@gmail.com</p>
                                        <p className="text-emerald-100/70 text-sm">We'll respond within 24 hours</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center text-teal-400 border border-teal-400/30 flex-shrink-0">
                                        📞
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold text-lg mb-1">Call Us</h3>
                                        <p className="text-emerald-100/70">+1 (555) 123-4567</p>
                                        <p className="text-emerald-100/70 text-sm">Mon-Fri from 8am to 6pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400 border border-cyan-400/30 flex-shrink-0">
                                        💬
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold text-lg mb-1">Live Chat</h3>
                                        <p className="text-emerald-100/70">Available 24/7</p>
                                        <p className="text-emerald-100/70 text-sm">Get instant help from our team</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 border border-purple-400/30 flex-shrink-0">
                                        🏢
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold text-lg mb-1">Visit Us</h3>
                                        <p className="text-emerald-100/70">123 Rental Street</p>
                                        <p className="text-emerald-100/70">Suite 100, City, State 12345</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <h3 className="text-white font-semibold mb-4">Follow Us</h3>
                                <div className="flex space-x-3">
                                    {['📘', '📷', '🐦', '💼'].map((icon, index) => (
                                        <div 
                                            key={index}
                                            className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-emerald-400 border border-white/20 cursor-pointer hover:bg-emerald-500/20 hover:border-emerald-400/30 transition-all duration-300"
                                        >
                                            {icon}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* FAQ Quick Links */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 shadow-2xl">
                            <h3 className="text-xl font-bold text-white mb-4">Quick Help</h3>
                            <div className="space-y-3">
                                {[
                                    'How do I list my property?',
                                    'What are the rental requirements?',
                                    'How does the booking process work?',
                                    'Can I schedule a property viewing?'
                                ].map((question, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer group"
                                    >
                                        <span className="w-2 h-2 bg-emerald-400 rounded-full group-hover:scale-125 transition-transform"></span>
                                        <span className="text-emerald-100/70 group-hover:text-emerald-300 transition-colors">
                                            {question}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 shadow-2xl">
                        <h2 className="text-3xl font-bold text-white mb-2">Send us a Message</h2>
                        <p className="text-emerald-100/70 mb-8">Fill out the form below and we'll get back to you soon.</p>
                        
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
                                        placeholder="Enter your full name"
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
                                    placeholder="What is this regarding?"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-emerald-200 text-sm font-medium mb-2">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="6"
                                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white placeholder-emerald-200/50 focus:ring-2 ring-emerald-400 focus:border-emerald-400/50 transition-all duration-300 resize-none"
                                    placeholder="Tell us how we can help you..."
                                />
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 text-lg"
                            >
                                Send Message
                            </button>
                            
                            <p className="text-emerald-100/60 text-sm text-center">
                                By submitting this form, you agree to our Privacy Policy and Terms of Service.
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="max-w-7xl mx-auto px-4 mt-16">
                <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl p-12 text-center border border-emerald-400/30">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Need Immediate Assistance?
                    </h2>
                    <p className="text-emerald-100/80 text-lg mb-6 max-w-2xl mx-auto">
                        Our support team is available 24/7 to help you with any urgent matters.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white/10 text-white px-8 py-4 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300">
                            📞 Call Now: +1 (555) 123-4567
                        </button>
                        <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300">
                            💬 Start Live Chat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;