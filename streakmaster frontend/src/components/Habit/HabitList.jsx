import React from 'react';
import HabitCard from './HabitCard';

export default function HabitList({ habits, onEdit, onDelete, onToggle, onAdd }) {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Your Habits</h2>
                <button
                    onClick={onAdd}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                >
                    + Add Habit
                </button>
            </div>

            {habits.length === 0 ? (
                <div>No habits yet</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {habits.map((h) => (
                        <HabitCard
                            key={h.id}
                            habit={h}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onToggle={onToggle}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
