import React from "react";

export default function LandingPage({ onGetStarted }) {

    return (
        <div className="bg-white min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="text-center py-16 px-4">
                <h1 className="text-7xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent">
                    Build Better Habits
                </h1>
                <p className="text-gray-600 mt-4 text-2xl max-w-3xl mx-auto">
                    Transform your daily routine with our smart habit tracking system. Start small, stay consistent, and watch yourself grow.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <button
                        onClick={() => onGetStarted("signup")}
                        className="px-6 py-3 rounded-xl bg-blue-500 text-white font-semibold transition"
                    >
                        Start Your Journey
                    </button>
                    <button
                        onClick={() => onGetStarted("signin")}
                        className="px-6 py-3 rounded-xl bg-blue-300 text-black font-semibold hover:bg-blue-500 transition">
                        Sign In
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-6xl mx-auto px-6 py-12">
                <h2 className="text-4xl font-bold text-center mb-6 text-black">Why Choose StreakMaster?</h2>
                <p className="text-center text-gray-600 mb-12">
                    Simple, effective tools to help you build lasting habits and track your progress.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: "🎯", title: "Simple & Intuitive", desc: "Easy to use interface that makes habit tracking effortless", bg: "bg-blue-100" },
                        { icon: "📈", title: "Track Progress", desc: "Visual charts and streaks to see your improvement over time", bg: "bg-green-100" },
                        { icon: "🏆", title: "Stay Motivated", desc: "Daily quotes and achievements to keep you inspired", bg: "bg-purple-100" },
                        { icon: "💾", title: "No Setup Required", desc: "Works offline with local storage, no account needed", bg: "bg-orange-100" },
                    ].map((f, idx) => (
                        <div
                            key={idx}
                            className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className={`w-16 h-16 ${f.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                                <span className="text-2xl">{f.icon}</span>
                            </div>
                            <h3 className="font-semibold text-lg text-gray-900 mb-2">{f.title}</h3>
                            <p className="text-gray-600 text-sm">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="bg-gradient-to-r from-blue-400 to-blue-700 text-white text-center py-12 mt-10">
                <h3 className="text-3xl font-bold mb-3">Ready to Transform Your Life?</h3>
                <p className="mb-6">Join thousands of people who are already building better habits with StreakMaster.</p>
                <button
                    onClick={onGetStarted}
                    className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-gray-100 transition"
                >
                    Get Started Free
                </button>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 p-8 text-white shadow-xl">
                <div className="text-center">
                    <div className="h-px bg-gray-600 mb-4"></div>
                    <p className="text-gray-300 text-sm">
                        Made with ❤️ by <span className="font-semibold text-white">Mahajabin Akter Ritu</span>
                    </p>
                    <p className="text-gray-400 text-xs mt-2">© 2025 StreakMaster. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
