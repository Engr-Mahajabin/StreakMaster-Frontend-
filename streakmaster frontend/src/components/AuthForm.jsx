import React, { useState } from "react";

export default function AuthForm({ isLogin, onAuth, onToggleMode }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const userData = {
            id: Date.now(),
            name: isLogin ? "Welcome Back!" : formData.name,
            email: formData.email,
            joinedDate: new Date().toISOString(),
        };

        onAuth(userData);
        setIsLoading(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2 text-blue-500">
                    {isLogin ? "Welcome Back" : "Start Your Journey"}
                </h2>
                <p className="text-gray-500">
                    {isLogin
                        ? "Continue building your amazing habits"
                        : "Create an account to track your habits"}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <div>
                        <label htmlFor="name" className="block text-blue-400 text-sm font-medium mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required={!isLogin}
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 transition-all duration-200"
                        />
                    </div>
                )}

                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-blue-400">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 transition-all duration-200"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-2 text-blue-400">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 transition-all duration-200"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            {isLogin ? "Signing In..." : "Creating Account..."}
                        </div>
                    ) : isLogin ? (
                        "Sign In"
                    ) : (
                        "Create Account"
                    )}
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-gray-500">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                        onClick={onToggleMode}
                        className="ml-2 text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200"
                    >
                        {isLogin ? "Sign Up" : "Sign In"}
                    </button>
                </p>
            </div>
        </div>
    );
}
