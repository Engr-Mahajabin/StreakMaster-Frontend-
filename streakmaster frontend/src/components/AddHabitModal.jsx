import React, { useState, useEffect } from "react";

const habitIcons = ["💪", "📚", "🏃", "🧘", "💧", "🥗", "😴", "✍️", "🎯", "🌱"];

export default function AddHabitModal({ isOpen, onClose, onSave, editingHabit }) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        icon: "💪",
        targetDays: 30,
        frequency: "daily",
    });

    useEffect(() => {
        if (editingHabit) {
            setFormData({
                name: editingHabit.name,
                description: editingHabit.description,
                icon: editingHabit.icon,
                targetDays: editingHabit.targetDays,
                frequency: editingHabit.frequency,
            });
        } else {
            setFormData({
                name: "",
                description: "",
                icon: "💪",
                targetDays: 30,
                frequency: "daily",
            });
        }
    }, [editingHabit, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const habitData = {
            ...formData,
            id: editingHabit?.id || Date.now(),
            currentStreak: editingHabit?.currentStreak || 0,
            bestStreak: editingHabit?.bestStreak || 0,
            completedDates: editingHabit?.completedDates || [],
            createdAt: editingHabit?.createdAt || new Date().toISOString(),
        };
        onSave(habitData);
        onClose();
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md animate-fade-in">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {editingHabit ? "Edit Habit" : "Add New Habit"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Habit Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">Habit Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800"
                            placeholder="e.g., Morning Exercise"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 resize-none"
                            placeholder="Brief description of your habit..."
                        />
                    </div>

                    {/* Icons */}
                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">Choose an Icon</label>
                        <div className="grid grid-cols-5 gap-2">
                            {habitIcons.map((icon) => (
                                <button
                                    key={icon}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, icon })}
                                    className={`p-3 text-2xl rounded-lg border-2 transition-all duration-200 ${formData.icon === icon
                                        ? "border-blue-500 bg-blue-100"
                                        : "border-gray-300 hover:border-blue-300"
                                        }`}
                                >
                                    {icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Target Days */}
                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">Target Days</label>
                        <select
                            name="targetDays"
                            value={formData.targetDays}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800"
                        >
                            <option value={7}>7 days</option>
                            <option value={14}>14 days</option>
                            <option value={21}>21 days</option>
                            <option value={30}>30 days</option>
                            <option value={60}>60 days</option>
                            <option value={90}>90 days</option>
                        </select>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 px-4 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-200 transition-all duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
                        >
                            {editingHabit ? "Update Habit" : "Create Habit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
