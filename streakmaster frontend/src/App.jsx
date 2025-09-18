import React, { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = (userData) => {
    setUser(userData);
    localStorage.setItem("habitflow-user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setShowAuth(false);
    localStorage.removeItem("habitflow-user");
  };

  // const handleGetStarted = () => {
  //   setShowAuth(true);
  // };

  // Updated: accept mode ("signin" | "signup")
  const handleGetStarted = (mode = "signup") => {
    setIsLogin(mode === "signin");
    setShowAuth(true);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("habitflow-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  if (showAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-fade-in">
            <button
              onClick={() => setShowAuth(false)}
              className="text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-2 mx-auto"
            >
              ← Back to Home
            </button>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">StreakMaster</h1>
            <p className="text-gray-600 text-lg">Transform your life, one habit at a time</p>
          </div>

          <AuthForm
            isLogin={isLogin}
            onAuth={handleAuth}
            onToggleMode={() => setIsLogin(!isLogin)}
          />
        </div>
      </div>
    );
  }

  return <LandingPage onGetStarted={handleGetStarted} />;
}
