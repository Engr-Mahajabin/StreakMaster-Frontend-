import React from "react";

export default function HeroSection({ onGetStarted }) {
    return (
        <section className="text-center max-w-[2400px] mx-auto py-16 px-4">
            <h1 className="text-7xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent">
                Build Better Habits
            </h1>
            <p className="text-gray-600 mt-4 text-2xl max-w-3xl mx-auto">
                Transform your daily routine with our smart habit tracking system.
                Start small, stay consistent, and watch yourself grow.
            </p>
            <div className="mt-8 flex justify-center gap-4">
                <button
                    onClick={() => onGetStarted("signup")}
                    className="px-6 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
                >
                    Start Your Journey
                </button>
                <button
                    onClick={() => onGetStarted("signin")}
                    className="px-6 py-3 rounded-xl bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition"
                >
                    Sign In
                </button>
            </div>
        </section>
    );
}
