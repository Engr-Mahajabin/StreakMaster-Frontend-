import React, { useState, useEffect } from "react";
import HabitCard from "./HabitCard";
import AddHabitModal from "./AddHabitModal";
import Stats from "./Stats";
import MotivationalQuotes from "./MotivationalQuotes";

export default function Dashboard({ user, onLogout }) {
    const [habits, setHabits] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingHabit, setEditingHabit] = useState(null);
    const [showStats, setShowStats] = useState(false);

    useEffect(() => {
        const savedHabits = localStorage.getItem(`habits-${user.id}`);
        if (savedHabits) {
            setHabits(JSON.parse(savedHabits));
        } else {
            const sampleHabits = [
                {
                    id: 1,
                    name: "Morning Exercise",
                    description: "30 minutes of physical activity",
                    icon: "💪",
                    targetDays: 30,
                    currentStreak: 0,
                    bestStreak: 0,
                    completedDates: [],
                    createdAt: new Date().toISOString(),
                },
                {
                    id: 2,
                    name: "Read Daily",
                    description: "Read for at least 20 minutes",
                    icon: "📚",
                    targetDays: 30,
                    currentStreak: 0,
                    bestStreak: 0,
                    completedDates: [],
                    createdAt: new Date().toISOString(),
                },
            ];
            setHabits(sampleHabits);
            localStorage.setItem(`habits-${user.id}`, JSON.stringify(sampleHabits));
        }
    }, [user.id]);

    useEffect(() => {
        if (habits.length > 0) {
            localStorage.setItem(`habits-${user.id}`, JSON.stringify(habits));
        }
    }, [habits, user.id]);

    const handleToggleHabit = (habitId) => {
        const today = new Date().toDateString();
        setHabits((prevHabits) =>
            prevHabits.map((habit) => {
                if (habit.id === habitId) {
                    const alreadyCompleted = habit.completedDates?.includes(today);
                    if (!alreadyCompleted) {
                        const newCompletedDates = [...(habit.completedDates || []), today];
                        const newCurrentStreak = habit.currentStreak + 1;
                        const newBestStreak = Math.max(
                            habit.bestStreak || 0,
                            newCurrentStreak
                        );
                        return {
                            ...habit,
                            completedDates: newCompletedDates,
                            currentStreak: newCurrentStreak,
                            bestStreak: newBestStreak,
                        };
                    }
                }
                return habit;
            })
        );
    };

    const handleSaveHabit = (habitData) => {
        if (editingHabit) {
            setHabits((prevHabits) =>
                prevHabits.map((habit) =>
                    habit.id === habitData.id ? habitData : habit
                )
            );
        } else {
            setHabits((prevHabits) => [...prevHabits, habitData]);
        }
        setEditingHabit(null);
    };

    const handleEditHabit = (habit) => {
        setEditingHabit(habit);
        setIsModalOpen(true);
    };

    const handleDeleteHabit = (habitId) => {
        if (window.confirm("Are you sure you want to delete this habit?")) {
            setHabits((prevHabits) =>
                prevHabits.filter((habit) => habit.id !== habitId)
            );
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingHabit(null);
    };

    const completedToday = habits.filter((h) =>
        h.completedDates?.includes(new Date().toDateString())
    ).length;
    const totalHabits = habits.length;
    const completionRate =
        totalHabits > 0
            ? Math.round((completedToday / totalHabits) * 100)
            : 0;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-2xl font-bold text-gray-800">StreakMaster</h1>
                            <div className="hidden sm:block">
                                {/* <span className="text-black">Welcome Back, </span> */}
                                <span className="font-medium text-gray-800">{user.name}</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setShowStats(!showStats)}
                                className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                                title="View Statistics"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                </svg>
                            </button>
                            <button
                                onClick={onLogout}
                                className="px-4 py-2 text-gray-500 hover:text-red-600 transition-colors duration-200"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <MotivationalQuotes />

                {/* Stats Cards */}
                <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Progress */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
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
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${completionRate}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                {completionRate}% complete
                            </p>
                        </div>
                    </div>

                    {/* Active Habits */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Active Habits</p>
                                <p className="text-3xl font-bold text-gray-800">
                                    {totalHabits}
                                </p>
                            </div>
                            <div className="text-4xl">📋</div>
                        </div>
                        <p className="text-sm text-gray-500 mt-4">
                            {totalHabits === 0
                                ? "Start by adding your first habit!"
                                : "Keep building your routine!"}
                        </p>
                    </div>

                    {/* Best Streak */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Best Streak</p>
                                <p className="text-3xl font-bold text-gray-800">
                                    {Math.max(...habits.map((h) => h.bestStreak || 0), 0)}
                                </p>
                            </div>
                            <div className="text-4xl">🔥</div>
                        </div>
                        <p className="text-sm text-gray-500 mt-4">
                            {Math.max(...habits.map((h) => h.bestStreak || 0), 0) === 0
                                ? "Complete habits to build streaks!"
                                : "Amazing consistency!"}
                        </p>
                    </div>
                </div>

                {showStats && (
                    <div className="mb-8 animate-fade-in">
                        <Stats habits={habits} />
                    </div>
                )}

                {/* Habits */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Your Habits</h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        <span>Add Habit</span>
                    </button>
                </div>

                {/* Habit List */}
                {habits.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🌱</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            No habits yet
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Start building better habits today!
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200"
                        >
                            Create Your First Habit
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {habits.map((habit) => (
                            <HabitCard
                                key={habit.id}
                                habit={habit}
                                onToggle={handleToggleHabit}
                                onDelete={handleDeleteHabit}
                                onEdit={handleEditHabit}
                            />
                        ))}
                    </div>
                )}
            </main>

            <AddHabitModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveHabit}
                editingHabit={editingHabit}
            />
        </div>
    );
}
