import React from "react";

export default function CTASection({ onGetStarted }) {
    return (
        <section className="bg-gradient-to-r from-blue-400 to-blue-700 text-white text-center py-12 mt-10">
            <h3 className="text-3xl font-bold mb-3">Ready to Transform Your Life?</h3>
            <p className="mb-6">
                Join thousands of people who are already building better habits with
                StreakMaster.
            </p>
            <button
                onClick={onGetStarted}
                className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-gray-100 transition"
            >
                Get Started Free
            </button>
        </section>
    );
}
