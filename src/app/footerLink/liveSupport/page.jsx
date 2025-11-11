'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const LiveSupportPage = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! Welcome to HouseRent Live Support. How can I help you today?",
            sender: 'support',
            timestamp: new Date(Date.now() - 300000)
        }
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [isConnected, setIsConnected] = useState(true);
    const [supportAgent, setSupportAgent] = useState({
        name: 'Sarah Johnson',
        status: 'online',
        department: 'Customer Support',
        avatar: '👩‍💼'
    });
    const [chatStatus, setChatStatus] = useState('active');
    const messagesEndRef = useRef(null);

    const supportDepartments = [
        {
            icon: '🏠',
            title: 'Property & Booking',
            description: 'Help with property listings, bookings, and reservations',
            agents: '12 agents online',
            waitTime: '< 2 min'
        },
        {
            icon: '💳',
            title: 'Payment & Billing',
            description: 'Payment issues, refunds, and billing questions',
            agents: '8 agents online',
            waitTime: '< 1 min'
        },
        {
            icon: '🔒',
            title: 'Safety & Security',
            description: 'Safety concerns and security issues',
            agents: '6 agents online',
            waitTime: '< 30 sec'
        },
        {
            icon: '📱',
            title: 'Technical Support',
            description: 'App issues and technical problems',
            agents: '10 agents online',
            waitTime: '< 3 min'
        }
    ];

    const quickQuestions = [
        "How do I cancel my booking?",
        "I forgot my password",
        "Payment not going through",
        "Can't contact the host",
        "Property not as described",
        "Need to extend my stay"
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const userMessage = {
            id: messages.length + 1,
            text: newMessage,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setNewMessage('');

        // Simulate auto-reply after 2 seconds
        setTimeout(() => {
            const supportMessage = {
                id: messages.length + 2,
                text: "Thank you for your message. I'm looking into this for you and will get back to you shortly.",
                sender: 'support',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, supportMessage]);
        }, 2000);
    };

    const handleQuickQuestion = (question) => {
        setNewMessage(question);
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 mt-12">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto px-4 mb-8">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">
                        Live Support
                    </h1>
                    <p className="text-xl text-emerald-100/80 max-w-2xl mx-auto">
                        Get instant help from our support team. We're here for you 24/7.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Support Departments Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Connection Status */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
                                    <span className="text-white font-semibold">
                                        {isConnected ? 'Connected' : 'Disconnected'}
                                    </span>
                                </div>
                                <span className="text-emerald-100/60 text-sm">24/7</span>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-emerald-100/60">Avg. Response</span>
                                    <span className="text-emerald-300">45 seconds</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-emerald-100/60">Satisfaction</span>
                                    <span className="text-emerald-300">98%</span>
                                </div>
                            </div>
                        </div>

                        {/* Support Departments */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                                <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
                                Support Departments
                            </h3>
                            <div className="space-y-4">
                                {supportDepartments.map((dept, index) => (
                                    <div 
                                        key={index}
                                        className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-teal-400/30 hover:bg-teal-500/10 transition-all duration-300 cursor-pointer group"
                                    >
                                        <div className="flex items-start space-x-3">
                                            <div className="text-2xl group-hover:scale-110 transition-transform">{dept.icon}</div>
                                            <div className="flex-1">
                                                <h4 className="text-white font-semibold text-sm mb-1">{dept.title}</h4>
                                                <p className="text-emerald-100/60 text-xs mb-2">{dept.description}</p>
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-emerald-400">{dept.agents}</span>
                                                    <span className="text-green-400">{dept.waitTime}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Questions */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                                Quick Questions
                            </h3>
                            <div className="space-y-2">
                                {quickQuestions.map((question, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleQuickQuestion(question)}
                                        className="w-full text-left p-3 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-400/30 hover:bg-cyan-500/10 transition-all duration-300 group"
                                    >
                                        <span className="text-emerald-100/70 text-sm group-hover:text-cyan-300 transition-colors">
                                            {question}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Emergency Support */}
                        <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl border border-red-400/30 p-6">
                            <div className="text-center">
                                <div className="text-3xl mb-2">🚨</div>
                                <h3 className="text-white font-semibold mb-2">Emergency Support</h3>
                                <p className="text-red-100/80 text-sm mb-3">Immediate assistance for urgent issues</p>
                                <button className="w-full bg-red-500 text-white py-2 rounded-xl font-semibold hover:bg-red-600 transition-all duration-300 text-sm">
                                    Call Emergency Line
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Chat Interface */}
                    <div className="lg:col-span-3">
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                            {/* Chat Header */}
                            <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-b border-white/10 p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="relative">
                                            <div className="text-3xl">{supportAgent.avatar}</div>
                                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${supportAgent.status === 'online' ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-white">{supportAgent.name}</h2>
                                            <p className="text-emerald-100/70 text-sm">{supportAgent.department} • {supportAgent.status}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            chatStatus === 'active' 
                                                ? 'bg-green-500/20 text-green-300 border border-green-400/30'
                                                : 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30'
                                        }`}>
                                            {chatStatus === 'active' ? 'Active' : 'Waiting'}
                                        </span>
                                        <button className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-emerald-400 border border-white/20 hover:bg-white/20 transition-all duration-300">
                                            📞
                                        </button>
                                        <button className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-emerald-400 border border-white/20 hover:bg-white/20 transition-all duration-300">
                                            ⚙️
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Messages Container */}
                            <div className="h-96 overflow-y-auto p-6 space-y-4 bg-slate-900/50">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-xs lg:max-w-md rounded-2xl p-4 ${
                                            message.sender === 'user'
                                                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-br-none'
                                                : 'bg-white/10 backdrop-blur-sm border border-white/20 text-emerald-100 rounded-bl-none'
                                        }`}>
                                            <p className="text-sm leading-relaxed">{message.text}</p>
                                            <div className={`text-xs mt-2 ${
                                                message.sender === 'user' ? 'text-emerald-100/70' : 'text-emerald-100/50'
                                            }`}>
                                                {formatTime(message.timestamp)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Typing Indicator */}
                            {chatStatus === 'active' && (
                                <div className="px-6 py-2">
                                    <div className="flex items-center space-x-2 text-emerald-100/60">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                        <span className="text-sm">{supportAgent.name} is typing...</span>
                                    </div>
                                </div>
                            )}

                            {/* Message Input */}
                            <div className="border-t border-white/10 p-6">
                                <form onSubmit={handleSendMessage} className="flex space-x-4">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder="Type your message here..."
                                            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl text-white placeholder-emerald-200/50 focus:ring-2 ring-emerald-400 focus:border-emerald-400/50 transition-all duration-300"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={!newMessage.trim()}
                                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                                            newMessage.trim()
                                                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700'
                                                : 'bg-white/10 text-emerald-100/50 border border-white/20 cursor-not-allowed'
                                        }`}
                                    >
                                        <span>Send</span>
                                        <span>📤</span>
                                    </button>
                                </form>
                                
                                {/* Quick Actions */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {['📎 Attach File', '📷 Photo', '📍 Location', '😊 Emoji'].map((action, index) => (
                                        <button
                                            key={index}
                                            className="px-3 py-2 bg-white/5 rounded-lg text-emerald-100/70 text-sm border border-white/10 hover:bg-white/10 hover:text-emerald-300 transition-all duration-300"
                                        >
                                            {action}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Additional Support Options */}
                        <div className="grid md:grid-cols-3 gap-6 mt-8">
                            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
                                <div className="text-3xl mb-3">📞</div>
                                <h3 className="text-lg font-semibold text-white mb-2">Phone Support</h3>
                                <p className="text-emerald-100/70 text-sm mb-3">Speak directly with our team</p>
                                <button className="bg-white/10 text-white px-4 py-2 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 text-sm">
                                    Call +1 (555) 123-4567
                                </button>
                            </div>
                            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
                                <div className="text-3xl mb-3">✉️</div>
                                <h3 className="text-lg font-semibold text-white mb-2">Email Support</h3>
                                <p className="text-emerald-100/70 text-sm mb-3">Get detailed assistance via email</p>
                                <button className="bg-white/10 text-white px-4 py-2 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 text-sm">
                                    Email Support
                                </button>
                            </div>
                            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
                                <div className="text-3xl mb-3">📋</div>
                                <h3 className="text-lg font-semibold text-white mb-2">Schedule Call</h3>
                                <p className="text-emerald-100/70 text-sm mb-3">Book a callback at your convenience</p>
                                <button className="bg-white/10 text-white px-4 py-2 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 text-sm">
                                    Schedule Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Support Statistics */}
                <div className="mt-12 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl border border-emerald-400/30 p-8">
                    <h2 className="text-2xl font-bold text-white text-center mb-6">Why Choose Our Live Support?</h2>
                    <div className="grid md:grid-cols-4 gap-6 text-center">
                        {[
                            { stat: '24/7', label: 'Round-the-Clock Support' },
                            { stat: '45s', label: 'Average Response Time' },
                            { stat: '98%', label: 'Customer Satisfaction' },
                            { stat: '50+', label: 'Support Agents' }
                        ].map((item, index) => (
                            <div key={index}>
                                <div className="text-3xl font-bold text-emerald-300 mb-2">{item.stat}</div>
                                <div className="text-emerald-100/70 text-sm">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveSupportPage;