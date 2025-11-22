import React, { useState, useEffect } from "react";

const quotes = [
    "The secret of getting ahead is getting started. - Mark Twain",
    "Success is the sum of small efforts repeated day in and day out. - Robert Collier",
    "We are what we repeatedly do. Excellence, then, is not an act, but a habit. - Aristotle",
    "The groundwork for all happiness is good health. - Leigh Hunt",
    "Take care of your body. It's the only place you have to live. - Jim Rohn",
    "A goal without a plan is just a wish. - Antoine de Saint-Exupéry",
    "The best time to plant a tree was 20 years ago. The second best time is now. - Chinese Proverb",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "The only impossible journey is the one you never begin. - Tony Robbins",
    "Your future is created by what you do today, not tomorrow. - Robert Kiyosaki",
];

export default function MotivationalQuotes() {
    const [currentQuote, setCurrentQuote] = useState("");

    useEffect(() => {
        // Get a different quote each day
        const today = new Date().toDateString();
        const savedQuote = localStorage.getItem(`daily-quote-${today}`);

        if (savedQuote) {
            setCurrentQuote(savedQuote);
        } else {
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            setCurrentQuote(randomQuote);
            localStorage.setItem(`daily-quote-${today}`, randomQuote);
        }
    }, []);

    if (!currentQuote) return null;

    return (
        <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-xl p-6 mb-6">
            <div className="flex items-start space-x-4">
                <div className="text-3xl">💡</div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Daily Inspiration</h3>
                    <p className="text-gray-600 italic leading-relaxed">"{currentQuote}"</p>
                </div>
            </div>
        </div>
    );
}
