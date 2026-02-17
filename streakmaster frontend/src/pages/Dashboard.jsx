import React, { useState, useEffect } from "react";
import HabitCard from "../components/Habit/HabitCard";
import AddHabitModal from "../components/Habit/AddHabitModal";
import Stats from "../components/Stats/Stats";
import MotivationalQuotes from "../components/Quotes/MotivationalQuotes";
import StatsCard from "../components/Stats/StatsCard";

export default function Dashboard({ user, onLogout }) {
    const [habits, setHabits] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingHabit, setEditingHabit] = useState(null);
    const [showStats, setShowStats] = useState(false);

    // Load Habits
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

    // Auto-save habits
    useEffect(() => {
        if (habits.length > 0) {
            localStorage.setItem(`habits-${user.id}`, JSON.stringify(habits));
        }
    }, [habits, user.id]);

    // Toggle Habit Complete
    const handleToggleHabit = (habitId) => {
        const today = new Date().toDateString();
        setHabits((prev) =>
            prev.map((habit) => {
                if (habit.id === habitId) {
                    const alreadyCompleted = habit.completedDates?.includes(today);

                    if (!alreadyCompleted) {
                        const newCompletedDates = [...habit.completedDates, today];
                        const newCurrentStreak = habit.currentStreak + 1;
                        const newBestStreak = Math.max(
                            habit.bestStreak,
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

    // Add or Edit Habit
    const handleSaveHabit = (habitData) => {
        if (editingHabit) {
            setHabits((prev) =>
                prev.map((h) => (h.id === habitData.id ? habitData : h))
            );
        } else {
            setHabits((prev) => [...prev, habitData]);
        }
        setEditingHabit(null);
    };

    const handleEditHabit = (habit) => {
        setEditingHabit(habit);
        setIsModalOpen(true);
    };

    const handleDeleteHabit = (habitId) => {
        if (window.confirm("Are you sure you want to delete this habit?")) {
            setHabits((prev) => prev.filter((h) => h.id !== habitId));
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingHabit(null);
    };

    // Stats
    const completedToday = habits.filter((h) =>
        h.completedDates.includes(new Date().toDateString())
    ).length;

    const totalHabits = habits.length;
    const bestStreak = Math.max(...habits.map((h) => h.bestStreak || 0), 0);

    return (
        <div className="w-full max-w-[2480px] mx-auto">
            {/* Header */}
            <header className="bg-white border-b shadow-sm">
                <div className="max-w-[2400px] mx-auto px-16 flex justify-between items-center h-16">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-2xl font-bold text-gray-800">StreakMaster</h1>
                        <span className="hidden sm:block text-gray-700 font-medium">
                            {user.name}
                        </span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setShowStats(!showStats)}
                            className="p-2 text-gray-600 hover:text-blue-600 transition"
                            title="View Statistics"
                        >
                            📊
                        </button>
                        <button
                            onClick={onLogout}
                            className="px-4 py-2 text-gray-600 hover:text-red-600 transition"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="max-w-[2400px] mx-auto px-16 py-8">
                <MotivationalQuotes />

                {/* Stats Cards */}
                <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatsCard
                        type="progress"
                        completedToday={completedToday}
                        totalHabits={totalHabits}
                    />
                    <StatsCard type="active" totalHabits={totalHabits} />
                    <StatsCard type="streak" bestStreak={bestStreak} />
                </div>

                {/* Full Stats Section */}
                {showStats && (
                    <div className="mb-8 animate-fade-in">
                        <Stats habits={habits} />
                    </div>
                )}

                {/* Habits Section */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Your Habits</h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center"
                    >
                        ➕ Add Habit
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
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
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
