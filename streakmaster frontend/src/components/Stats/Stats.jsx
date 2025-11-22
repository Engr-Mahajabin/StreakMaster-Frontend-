import React, { useMemo } from "react";

export default function Stats({ habits }) {
    const stats = useMemo(() => {
        const now = new Date();
        const today = now.toDateString();
        const thisWeek = [];
        const thisMonth = [];

        for (let i = 6; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            thisWeek.push(date.toDateString());
        }

        for (let i = 29; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            thisMonth.push(date.toDateString());
        }

        const weeklyCompletion = thisWeek.map((date) => {
            const completed = habits.filter((habit) => habit.completedDates?.includes(date)).length;
            return {
                date,
                completed,
                total: habits.length,
                percentage: habits.length > 0 ? (completed / habits.length) * 100 : 0,
            };
        });

        const monthlyCompletion = thisMonth.map((date) => {
            const completed = habits.filter((habit) => habit.completedDates?.includes(date)).length;
            return {
                date,
                completed,
                total: habits.length,
                percentage: habits.length > 0 ? (completed / habits.length) * 100 : 0,
            };
        });

        const weeklyAverage = weeklyCompletion.reduce((sum, day) => sum + day.percentage, 0) / 7;
        const monthlyAverage = monthlyCompletion.reduce((sum, day) => sum + day.percentage, 0) / 30;

        const bestDay = weeklyCompletion.reduce(
            (best, current) => (current.percentage > best.percentage ? current : best)
        );
        const worstDay = weeklyCompletion.reduce(
            (worst, current) => (current.percentage < worst.percentage ? current : worst)
        );

        return {
            weeklyCompletion,
            monthlyCompletion,
            weeklyAverage,
            monthlyAverage,
            bestDay,
            worstDay,
        };
    }, [habits]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    };

    const getCompletionColor = (percentage) => {
        if (percentage >= 80) return "bg-green-500";
        if (percentage >= 60) return "bg-blue-500";
        if (percentage >= 40) return "bg-yellow-500";
        if (percentage >= 20) return "bg-orange-500";
        return "bg-gray-300";
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Progress Analytics</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Weekly Overview */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">This Week</h4>
                    <div className="space-y-3">
                        {stats.weeklyCompletion.map((day) => (
                            <div key={day.date} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm text-gray-500 w-16">{formatDate(day.date).split(",")[0]}</span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-2 w-32">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-300 ${getCompletionColor(day.percentage)}`}
                                            style={{ width: `${day.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-gray-800">
                                    {day.completed}/{day.total}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Weekly Average</span>
                            <span className="font-semibold text-green-600">{stats.weeklyAverage.toFixed(1)}%</span>
                        </div>
                    </div>
                </div>

                {/* Monthly Heatmap */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Last 30 Days</h4>
                    <div className="grid grid-cols-7 gap-1 mb-4">
                        {stats.monthlyCompletion.map((day) => (
                            <div
                                key={day.date}
                                className={`w-8 h-8 rounded ${getCompletionColor(day.percentage)} flex items-center justify-center`}
                                title={`${formatDate(day.date)}: ${day.completed}/${day.total} habits completed`}
                            >
                                <span className="text-xs text-white font-medium">{new Date(day.date).getDate()}</span>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                            <span className="text-sm text-green-800">Best Day</span>
                            <span className="font-semibold text-green-800">
                                {formatDate(stats.bestDay.date)} - {stats.bestDay.percentage.toFixed(0)}%
                            </span>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                            <span className="text-sm text-gray-500">Monthly Average</span>
                            <span className="font-semibold text-green-600">{stats.monthlyAverage.toFixed(1)}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Habit Performance */}
            <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Habit Performance</h4>
                <div className="space-y-3">
                    {habits.map((habit) => {
                        const completionRate =
                            habit.targetDays > 0 ? ((habit.completedDates?.length || 0) / habit.targetDays) * 100 : 0;

                        return (
                            <div key={habit.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <span className="text-xl">{habit.icon}</span>
                                    <div>
                                        <h5 className="font-medium text-gray-800">{habit.name}</h5>
                                        <p className="text-sm text-gray-500">
                                            {habit.completedDates?.length || 0} of {habit.targetDays} days
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-bold text-green-600">{completionRate.toFixed(0)}%</div>
                                    <div className="text-sm text-gray-500">{habit.currentStreak} day streak</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
