import React from "react";

const features = [
    {
        icon: "🎯",
        title: "Simple & Intuitive",
        desc: "Easy to use interface that makes habit tracking effortless",
        bg: "bg-blue-100",
    },
    {
        icon: "📈",
        title: "Track Progress",
        desc: "Visual charts and streaks to see your improvement over time",
        bg: "bg-green-100",
    },
    {
        icon: "🏆",
        title: "Stay Motivated",
        desc: "Daily quotes and achievements to keep you inspired",
        bg: "bg-purple-100",
    },
    {
        icon: "💾",
        title: "No Setup Required",
        desc: "Works offline with local storage, no account needed",
        bg: "bg-orange-100",
    },
];

export default function FeatureSection() {
    return (
        <section className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-4xl font-bold text-center mb-6 text-black">
                Why Choose StreakMaster?
            </h2>
            <p className="text-center text-gray-600 mb-12">
                Simple, effective tools to help you build lasting habits and track your
                progress.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((f, idx) => (
                    <div
                        key={idx}
                        className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <div
                            className={`w-16 h-16 ${f.bg} rounded-full flex items-center justify-center mx-auto mb-4`}
                        >
                            <span className="text-2xl">{f.icon}</span>
                        </div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">
                            {f.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
