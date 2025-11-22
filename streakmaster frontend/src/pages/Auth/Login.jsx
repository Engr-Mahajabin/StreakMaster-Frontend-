// pages/LoginPage.jsx
import React, { useState } from "react";
import AuthForm from "../components/AuthForm";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);

    const handleAuth = (userData) => {
        console.log("User authenticated:", userData);
        // redirect or store user data
    };

    const toggleMode = () => setIsLogin(!isLogin);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <AuthForm isLogin={isLogin} onAuth={handleAuth} onToggleMode={toggleMode} />
        </div>
    );
}
