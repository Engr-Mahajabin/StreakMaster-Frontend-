import React, { useState } from "react";

export default function HabitCard({ habit, onToggle, onDelete, onEdit }) {
    const [showActions, setShowActions] = useState(false);

    const getStreakColor = (streak) => {
        if (streak >= 30) return "text-green-600";
        if (streak >= 14) return "text-blue-600";
        if (streak >= 7) return "text-yellow-600";
        return "text-gray-600";
    };

    const getProgressColor = (percentage) => {
        if (percentage >= 80) return "bg-green-500";
        if (percentage >= 60) return "bg-blue-500";
        if (percentage >= 40) return "bg-yellow-500";
        return "bg-gray-400";
    };

    const todayCompleted =
        habit.completedDates?.includes(new Date().toDateString()) || false;
    const progressPercentage = Math.round(
        (habit.currentStreak / habit.targetDays) * 100
    );

    return (
        <div
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200"
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="text-2xl">{habit.icon}</div>
                    <div>
                        <h3 className="font-semibold text-gray-800 text-lg">{habit.name}</h3>
                        <p className="text-gray-500 text-sm">{habit.description}</p>
                    </div>
                </div>

                {showActions && (
                    <div className="flex space-x-2 animate-slide-in">
                        <button
                            onClick={() => onEdit(habit)}
                            className="p-2 text-gray-500 hover:text-blue-500 transition-colors duration-200"
                            title="Edit habit"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                            </svg>
                        </button>
                        <button
                            onClick={() => onDelete(habit.id)}
                            className="p-2 text-gray-500 hover:text-red-600 transition-colors duration-200"
                            title="Delete habit"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            <div className="space-y-4">
                {/* Progress Bar */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">Progress</span>
                        <span className="text-sm font-medium text-gray-800">
                            {habit.currentStreak}/{habit.targetDays} days
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(
                                progressPercentage
                            )}`}
                            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                        ></div>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center">
                    <div className="text-center">
                        <div className={`text-lg font-bold ${getStreakColor(habit.currentStreak)}`}>
                            {habit.currentStreak}
                        </div>
                        <div className="text-xs text-gray-500">Current Streak</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-bold text-blue-500">{habit.bestStreak || 0}</div>
                        <div className="text-xs text-gray-500">Best Streak</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-bold text-gray-800">
                            {habit.completedDates?.length || 0}
                        </div>
                        <div className="text-xs text-gray-500">Total Days</div>
                    </div>
                </div>

                {/* Action Button */}
                <button
                    onClick={() => onToggle(habit.id)}
                    disabled={todayCompleted}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${todayCompleted
                        ? "bg-green-100 text-green-800 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600 active:scale-95"
                        }`}
                >
                    {todayCompleted ? (
                        <div className="flex items-center justify-center">
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Completed Today!
                        </div>
                    ) : (
                        "Mark as Done"
                    )}
                </button>
            </div>
        </div>
    );
}
