import React from "react";

export default function StatsCard({ type, completedToday, totalHabits, bestStreak }) {

    if (type === "progress") {
        const completionRate =
            totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

        return (
            <div className="bg-white rounded-xl p-6 border shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Today's Progress</p>
                        <p className="text-3xl font-bold text-gray-800">
                            {completedToday}/{totalHabits}
                        </p>
                    </div>
                    <div className="text-4xl">🎯</div>
                </div>

                <div className="mt-4">
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                        <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${completionRate}%` }}
                        ></div>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">{completionRate}% complete</p>
                </div>
            </div>
        );
    }

    if (type === "active") {
        return (
            <div className="bg-white rounded-xl p-6 border shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Active Habits</p>
                        <p className="text-3xl font-bold text-gray-800">{totalHabits}</p>
                    </div>
                    <div className="text-4xl">📋</div>
                </div>

                <p className="text-gray-500 text-sm mt-4">
                    {totalHabits === 0
                        ? "Start by adding your first habit!"
                        : "Keep building your routine!"}
                </p>
            </div>
        );
    }

    if (type === "streak") {
        return (
            <div className="bg-white rounded-xl p-6 border shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Best Streak</p>
                        <p className="text-3xl font-bold text-gray-800">{bestStreak}</p>
                    </div>
                    <div className="text-4xl">🔥</div>
                </div>

                <p className="text-gray-500 text-sm mt-4">
                    {bestStreak === 0
                        ? "Complete habits to build streaks!"
                        : "Amazing consistency!"}
                </p>
            </div>
        );
    }

    return null;
}
