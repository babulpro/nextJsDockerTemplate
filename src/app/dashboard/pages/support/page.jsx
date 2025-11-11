"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function SupportPage() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const supportCategories = [
    {
      id: "general",
      name: "General Help",
      questions: [
        {
          question: "How do I create an account?",
          answer: "Click on 'Sign Up' in the top right corner, enter your email, create a password, and verify your email address to get started."
        },
        {
          question: "How do I reset my password?",
          answer: "Go to the login page, click 'Forgot Password', enter your email, and follow the instructions sent to your inbox."
        },
        {
          question: "Is my personal information secure?",
          answer: "Yes, we use industry-standard encryption and never share your personal data with third parties without your consent."
        },
        {
          question: "How do I update my profile information?",
          answer: "Go to your dashboard, click on 'My Profile', and you can update your personal details, profile picture, and contact information."
        },
        {
          question: "Can I use HouseRent without creating an account?",
          answer: "You can browse properties without an account, but you'll need to create one to make bookings, contact hosts, or list your property."
        },
        {
          question: "How do I delete my account?",
          answer: "Contact our support team with your account details, and we'll process your account deletion request within 24 hours."
        }
      ]
    },
    {
      id: "tenant",
      name: "For Tenants",
      questions: [
        {
          question: "How do I book a property?",
          answer: "Browse properties, click on one you like, select your dates, and click 'Book Now'. The host will review your request."
        },
        {
          question: "Can I cancel my booking?",
          answer: "Yes, cancellation policies vary by property. Check the property's cancellation policy before booking."
        },
        {
          question: "How do payments work?",
          answer: "We support secure payments via credit card, debit card. Your payment is held securely until 24 hours after check-in."
        },
        {
          question: "What should I do if the property doesn't match the description?",
          answer: "Contact the host immediately through the messaging system. If unresolved, contact our support team with photos and details."
        },
        {
          question: "Can I extend my stay after booking?",
          answer: "Yes, you can request an extension through the booking details page. The host must approve the extension."
        },
        {
          question: "How do I contact the host before booking?",
          answer: "Click the 'Contact Host' button on the property page to send a message. Hosts typically respond within a few hours."
        },
        {
          question: "What happens if the host cancels my booking?",
          answer: "You'll receive a full refund immediately, and we'll help you find alternative accommodation with a 10% discount."
        },
        {
          question: "Are utilities included in the rent?",
          answer: "This varies by property. Check the property details page for information about included utilities and additional costs."
        }
      ]
    },
    {
      id: "host",
      name: "For Hosts",
      questions: [
        {
          question: "How do I list my property?",
          answer: "Click 'List Your Property', fill in the details, upload photos, set your pricing and availability, and submit for review."
        },
        {
          question: "What are the hosting fees?",
          answer: "We charge a 3% service fee for each successful booking. There are no upfront costs to list your property."
        },
        {
          question: "How do I manage bookings?",
          answer: "Use your host dashboard to view, accept, or decline booking requests, manage calendars, and communicate with guests."
        },
        {
          question: "How do I set house rules for my property?",
          answer: "You can add house rules during the listing process or edit them later in your property management dashboard."
        },
        {
          question: "What should I do if a guest damages my property?",
          answer: "Document the damage with photos and contact our support team immediately. We have a host protection program to cover damages."
        },
        {
          question: "Can I set different prices for different seasons?",
          answer: "Yes, you can set seasonal pricing, weekend rates, and special offers through your pricing calendar in the host dashboard."
        },
        {
          question: "How do I handle guest check-in and check-out?",
          answer: "You can choose self-check-in with lockboxes or smart locks, or arrange in-person check-in. Set clear instructions in your listing."
        },
        {
          question: "What insurance do I need as a host?",
          answer: "We provide basic host protection, but we recommend additional property insurance for comprehensive coverage."
        }
      ]
    },
    {
      id: "payment",
      name: "Payments & Security",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept Visa, MasterCard, American Express, and major digital wallets."
        },
        {
          question: "Are there any hidden fees?",
          answer: "No hidden fees. The price you see includes the rental rate, cleaning fee, and our service fee."
        },
        {
          question: "When is my payment processed?",
          answer: "For tenants: Payment is processed when the host accepts your booking. For hosts: Payment is released 24 hours after guest check-in."
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes, we use bank-level SSL encryption and PCI-compliant payment processors. We never store your full card details on our servers."
        },
        {
          question: "What is your refund policy?",
          answer: "Refunds follow the cancellation policy of each property. In exceptional circumstances, we may offer additional refunds at our discretion."
        },
        {
          question: "Can I get a receipt for my booking?",
          answer: "Yes, detailed receipts are automatically generated and available in your booking history and email confirmation."
        },
        {
          question: "Do you support international payments?",
          answer: "Yes, we support multiple currencies and international payment methods. Exchange rates are applied at the time of booking."
        }
      ]
    },
    {
      id: "technical",
      name: "Technical Support",
      questions: [
        {
          question: "The website/app is not loading properly",
          answer: "Clear your browser cache, try a different browser, or restart the app. If issues persist, contact our technical support."
        },
        {
          question: "I'm not receiving confirmation emails",
          answer: "Check your spam folder, ensure your email is correct, and whitelist our domain. Contact support if you still don't receive emails."
        },
        {
          question: "How do I update the app?",
          answer: "Visit your app store for updates. Enable automatic updates to always have the latest version with new features and bug fixes."
        },
        {
          question: "I'm having trouble uploading photos",
          answer: "Ensure photos are under 10MB each, in JPG or PNG format. Try reducing file size or using a different browser."
        },
        {
          question: "The map is not showing properties correctly",
          answer: "Check your location permissions, ensure you have a stable internet connection, or try refreshing the page."
        }
      ]
    }
  ];

  // Contact Methods with actual functionality
  const handlePhoneCall = () => {
    alert("📞 Contact us on WhatsApp: +1 (555) 123-4567\n\nWe'll respond quickly on WhatsApp!");
  };

  const handleEmailSupport = () => {
    window.location.href = "mailto:babul1946@gmail.com?subject=HouseRent Support&body=Hello HouseRent Team,%0D%0A%0D%0AI need help with:";
  };

  const handleLiveChat = () => {
    alert("💬 Live Chat is currently unavailable. Please call or email us for immediate assistance.");
  };

  const handleEmergencyHelp = () => {
    alert("🚨 Emergency Support Line: +1 (555) 911-RENT\nAvailable 24/7 for urgent property issues.");
  };

  const contactMethods = [
    {
      title: "Live Chat",
      description: "Get instant help from our team",
      availability: "Available 24/7",
      action: "Start Chat",
      onClick: handleLiveChat
    },
    {
      title: "Phone Support",
      description: "Speak directly with our experts",
      availability: "Mon-Sun, 6AM-10PM EST",
      action: "Call Now",
      onClick: handlePhoneCall
    },
    {
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "Response within 2 hours",
      action: "Send Email",
      onClick: handleEmailSupport
    }
  ];

  const filteredQuestions = supportCategories
    .find(cat => cat.id === activeCategory)
    ?.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const toggleQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-6">
              How Can We Help You Today?
            </h1>
            <p className="text-xl text-emerald-100/80 mb-8 max-w-3xl mx-auto">
              Get instant answers to your questions about renting, hosting, payments, and more. 
              Our support team is always here for you.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400">
                  🔍
                </div>
                <input
                  type="text"
                  placeholder="Search for help articles, FAQs, and guides..."
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-lg border border-emerald-400/30 rounded-xl text-white placeholder-emerald-200/50 focus:ring-2 ring-emerald-400 focus:border-emerald-400/50 transition-all duration-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 sticky top-6">
              <h3 className="text-xl font-bold text-white mb-6 pb-4 border-b border-white/10">Help Categories</h3>
              <div className="space-y-2">
                {supportCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setExpandedQuestion(null);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeCategory === category.id
                        ? "bg-emerald-500/20 text-emerald-300 border-2 border-emerald-400/30 shadow-lg shadow-emerald-500/10"
                        : "text-emerald-100/70 hover:bg-white/5 hover:text-emerald-300 border-2 border-transparent"
                    }`}
                  >
                    <span className="font-semibold">{category.name}</span>
                    <span className="bg-white/10 text-emerald-100 px-2 py-1 rounded-full text-xs font-medium border border-white/20">
                      {category.questions.length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {/* FAQ Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 mb-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">
                  {supportCategories.find(cat => cat.id === activeCategory)?.name}
                </h2>
                <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm font-medium border border-emerald-400/30">
                  {filteredQuestions.length} questions
                </span>
              </div>

              <div className="space-y-4">
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((item, index) => (
                    <div 
                      key={index} 
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-emerald-400/30 hover:bg-emerald-500/10 transition-all duration-300 cursor-pointer group"
                      onClick={() => toggleQuestion(index)}
                    >
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-semibold text-white pr-4 group-hover:text-emerald-300 transition-colors">
                          {item.question}
                        </h3>
                        <span className="text-emerald-400 text-xl flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                          {expandedQuestion === index ? '−' : '+'}
                        </span>
                      </div>
                      {expandedQuestion === index && (
                        <div className="mt-4 pl-4 border-l-4 border-emerald-400/50">
                          <p className="text-emerald-100/80 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4 text-emerald-400">🔍</div>
                    <p className="text-emerald-100/80 text-xl mb-2">No results found for "{searchQuery}"</p>
                    <p className="text-emerald-100/60">Try searching with different keywords or browse the categories</p>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Methods */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {contactMethods.map((method, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 text-center hover:border-emerald-400/30 hover:bg-emerald-500/10 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center text-emerald-400 text-2xl mx-auto mb-4 border border-emerald-400/30 group-hover:scale-110 transition-transform">
                    {index === 0 ? "💬" : index === 1 ? "📞" : "✉️"}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">{method.title}</h3>
                  <p className="text-emerald-100/70 mb-3">{method.description}</p>
                  <div className="flex items-center justify-center text-sm text-emerald-100/60 mb-4">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                    {method.availability}
                  </div>
                  <button 
                    onClick={method.onClick}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
                  >
                    {method.action}
                  </button>
                </div>
              ))}
            </div>

            {/* Emergency Support */}
            <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl border border-red-400/30 p-6 text-white shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                    <span className="text-2xl">🚨</span>
                    <h3 className="text-2xl font-bold">24/7 Emergency Support</h3>
                  </div>
                  <p className="text-red-100/80 text-lg">
                    Need immediate assistance during your stay? Our emergency team is available round the clock.
                  </p>
                </div>
                <button 
                  onClick={handleEmergencyHelp}
                  className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-red-500/25 whitespace-nowrap text-lg border border-red-400/30"
                >
                  Emergency Help
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}