'use client'
import React from 'react';
import Link from 'next/link';

const SafetyPage = () => {
    const safetyFeatures = [
        {
            icon: '🔐',
            title: 'Secure Verification',
            description: 'All users and properties undergo rigorous verification processes to ensure authenticity and safety.',
            features: ['ID Verification', 'Phone Verification', 'Email Confirmation', 'Background Checks']
        },
        {
            icon: '💳',
            title: 'Payment Protection',
            description: 'Your payments are secure with our encrypted payment system and fraud detection measures.',
            features: ['Encrypted Transactions', 'Fraud Monitoring', 'Secure Gateways', 'Payment Insurance']
        },
        {
            icon: '📞',
            title: '24/7 Support',
            description: 'Round-the-clock customer support and emergency services for any safety concerns.',
            features: ['Emergency Hotline', 'Live Chat', 'In-App Support', 'Local Authorities Coordination']
        },
        {
            icon: '👥',
            title: 'Community Trust',
            description: 'Build trust through verified reviews, ratings, and community reporting systems.',
            features: ['Verified Reviews', 'Rating System', 'Community Reporting', 'Trust Scores']
        }
    ];

    const safetyTips = {
        tenants: [
            {
                icon: '🔍',
                title: 'Verify Property Details',
                tips: [
                    'Check property photos and descriptions carefully',
                    'Read previous tenant reviews and ratings',
                    'Verify property location and amenities',
                    'Confirm host response rate and history'
                ]
            },
            {
                icon: '💬',
                title: 'Communicate Safely',
                tips: [
                    'Use our secure messaging system only',
                    'Never share personal contact information early',
                    'Discuss all details through the platform',
                    'Report suspicious communication immediately'
                ]
            },
            {
                icon: '💰',
                title: 'Secure Payments',
                tips: [
                    'Always pay through our secure platform',
                    'Never transfer money outside the system',
                    'Keep records of all transactions',
                    'Verify payment confirmations'
                ]
            }
        ],
        hosts: [
            {
                icon: '🏠',
                title: 'Property Safety',
                tips: [
                    'Ensure all safety equipment is functional',
                    'Provide clear emergency instructions',
                    'Maintain property in safe condition',
                    'Conduct regular safety inspections'
                ]
            },
            {
                icon: '👤',
                title: 'Tenant Screening',
                tips: [
                    'Review tenant verification status',
                    'Check previous host reviews',
                    'Communicate expectations clearly',
                    'Use our booking requirements'
                ]
            },
            {
                icon: '📋',
                title: 'Legal Compliance',
                tips: [
                    'Follow local rental regulations',
                    'Maintain proper insurance coverage',
                    'Provide accurate property information',
                    'Keep all documentation updated'
                ]
            }
        ]
    };

    const emergencyProcedures = [
        {
            situation: 'Medical Emergency',
            steps: [
                'Call local emergency services immediately',
                'Contact property host or manager',
                'Use emergency contacts in the property',
                'Notify HouseRent support team'
            ],
            contacts: ['Local Emergency: 911', 'HouseRent Emergency: +1 (555) 911-RENT']
        },
        {
            situation: 'Property Issues',
            steps: [
                'Document the issue with photos/videos',
                'Contact host through the platform',
                'Use 24/7 support for urgent matters',
                'Request alternative accommodation if needed'
            ],
            contacts: ['24/7 Support Hotline', 'Host Contact Information']
        },
        {
            situation: 'Security Concerns',
            steps: [
                'Ensure personal safety first',
                'Contact local authorities if threatened',
                'Use emergency features in the app',
                'Report incident to HouseRent immediately'
            ],
            contacts: ['Local Police', 'HouseRent Security Team']
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 mt-10">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto px-4 text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-6">
                    Safety First
                </h1>
                <p className="text-xl text-emerald-100/80 max-w-3xl mx-auto leading-relaxed">
                    Your safety is our top priority. We've built multiple layers of protection to ensure 
                    secure and worry-free experiences for both tenants and hosts.
                </p>
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                    <span className="text-xs bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/30 text-emerald-300">
                        🛡️ Verified Community
                    </span>
                    <span className="text-xs bg-teal-500/20 px-3 py-1 rounded-full border border-teal-400/30 text-teal-300">
                        🔒 Secure Payments
                    </span>
                    <span className="text-xs bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-400/30 text-cyan-300">
                        📞 24/7 Support
                    </span>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4">
                {/* Safety Features */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center justify-center">
                        <span className="w-3 h-3 bg-emerald-400 rounded-full mr-3"></span>
                        Our Safety Features
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {safetyFeatures.map((feature, index) => (
                            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-emerald-400/30 hover:bg-emerald-500/10 transition-all duration-300 group">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-emerald-100/80 mb-6 leading-relaxed">
                                    {feature.description}
                                </p>
                                <div className="space-y-2">
                                    {feature.features.map((item, itemIndex) => (
                                        <div key={itemIndex} className="flex items-center space-x-3">
                                            <span className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"></span>
                                            <span className="text-emerald-100/70 text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Safety Tips */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-12 flex items-center justify-center">
                        <span className="w-3 h-3 bg-teal-400 rounded-full mr-3"></span>
                        Safety Guidelines
                    </h2>

                    {/* Tenants Section */}
                    <div className="mb-12">
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="w-12 h-12 bg-teal-500/20 rounded-2xl flex items-center justify-center text-teal-400 text-2xl border border-teal-400/30">
                                👤
                            </div>
                            <h3 className="text-2xl font-bold text-white">For Tenants</h3>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {safetyTips.tenants.map((tip, index) => (
                                <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-teal-400/30 transition-all duration-300">
                                    <div className="text-3xl mb-4">{tip.icon}</div>
                                    <h4 className="text-lg font-semibold text-white mb-4">{tip.title}</h4>
                                    <ul className="space-y-3">
                                        {tip.tips.map((item, itemIndex) => (
                                            <li key={itemIndex} className="flex items-start space-x-2">
                                                <span className="w-1 h-1 bg-teal-400 rounded-full mt-2 flex-shrink-0"></span>
                                                <span className="text-emerald-100/70 text-sm leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hosts Section */}
                    <div>
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="w-12 h-12 bg-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400 text-2xl border border-cyan-400/30">
                                🏠
                            </div>
                            <h3 className="text-2xl font-bold text-white">For Hosts</h3>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {safetyTips.hosts.map((tip, index) => (
                                <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-cyan-400/30 transition-all duration-300">
                                    <div className="text-3xl mb-4">{tip.icon}</div>
                                    <h4 className="text-lg font-semibold text-white mb-4">{tip.title}</h4>
                                    <ul className="space-y-3">
                                        {tip.tips.map((item, itemIndex) => (
                                            <li key={itemIndex} className="flex items-start space-x-2">
                                                <span className="w-1 h-1 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></span>
                                                <span className="text-emerald-100/70 text-sm leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Emergency Procedures */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center justify-center">
                        <span className="w-3 h-3 bg-red-400 rounded-full mr-3"></span>
                        Emergency Procedures
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {emergencyProcedures.map((procedure, index) => (
                            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-red-400/30 transition-all duration-300">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                    <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                                    {procedure.situation}
                                </h3>
                                <div className="space-y-3 mb-4">
                                    {procedure.steps.map((step, stepIndex) => (
                                        <div key={stepIndex} className="flex items-start space-x-2">
                                            <span className="text-red-400 text-sm mt-1">•</span>
                                            <span className="text-emerald-100/70 text-sm flex-1">{step}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-4 border-t border-white/10">
                                    <h4 className="text-white font-semibold mb-2 text-sm">Emergency Contacts:</h4>
                                    <div className="space-y-1">
                                        {procedure.contacts.map((contact, contactIndex) => (
                                            <div key={contactIndex} className="text-red-300 text-xs bg-red-500/10 px-2 py-1 rounded border border-red-400/20">
                                                {contact}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reporting System */}
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl p-8 border border-purple-400/30 mb-16">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-4">Report Safety Concerns</h2>
                            <p className="text-emerald-100/80 mb-6 leading-relaxed">
                                Your reports help us maintain a safe community. We take all safety concerns seriously 
                                and investigate them promptly.
                            </p>
                            <div className="space-y-3">
                                {[
                                    'Immediate response to emergency reports',
                                    '24/7 dedicated safety team',
                                    'Anonymous reporting options',
                                    'Follow-up on all reported incidents'
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                                        <span className="text-emerald-100/70">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <button className="w-full bg-white/10 text-white py-4 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-3">
                                <span>🚨</span>
                                <span>Report Emergency</span>
                            </button>
                            <button className="w-full bg-purple-500/20 text-purple-300 py-4 rounded-xl font-semibold border border-purple-400/30 hover:bg-purple-500/30 transition-all duration-300 flex items-center justify-center space-x-3">
                                <span>📋</span>
                                <span>File Safety Report</span>
                            </button>
                            <button className="w-full bg-white/10 text-white py-4 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-3">
                                <span>💬</span>
                                <span>Contact Safety Team</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Safety Resources */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center justify-center">
                        <span className="w-3 h-3 bg-cyan-400 rounded-full mr-3"></span>
                        Safety Resources
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            {
                                icon: '📚',
                                title: 'Safety Guides',
                                description: 'Comprehensive safety manuals and checklists'
                            },
                            {
                                icon: '🎥',
                                title: 'Video Tutorials',
                                description: 'Step-by-step safety procedure videos'
                            },
                            {
                                icon: '📞',
                                title: 'Safety Hotline',
                                description: '24/7 dedicated safety support line'
                            },
                            {
                                icon: '🏥',
                                title: 'Emergency Services',
                                description: 'Local emergency service contacts and maps'
                            }
                        ].map((resource, index) => (
                            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-cyan-400/30 transition-all duration-300 text-center group">
                                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{resource.icon}</div>
                                <h3 className="text-lg font-semibold text-white mb-2">{resource.title}</h3>
                                <p className="text-emerald-100/70 text-sm">{resource.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Safety Commitment */}
                <div className="text-center bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-5xl mb-6">🛡️</div>
                        <h2 className="text-3xl font-bold text-white mb-4">Our Safety Commitment</h2>
                        <p className="text-emerald-100/80 text-lg leading-relaxed mb-6">
                            We are committed to creating the safest possible environment for our community. 
                            Through continuous improvement, advanced technology, and dedicated safety teams, 
                            we work tirelessly to protect every user on our platform.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link 
                                href="/help" 
                                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300"
                            >
                                Get Help Now
                            </Link>
                            <Link 
                                href="/contact" 
                                className="bg-white/10 text-white px-8 py-4 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
                            >
                                Contact Safety Team
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SafetyPage;