// pages/SignupPage.jsx
import React from "react";
import AuthForm from "../components/AuthForm";

export default function Signup() {
    const handleAuth = (userData) => {
        console.log("User signed up:", userData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <AuthForm isLogin={false} onAuth={handleAuth} onToggleMode={() => { }} />
        </div>
    );
}
