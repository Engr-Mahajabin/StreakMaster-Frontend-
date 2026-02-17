import React from "react";
import HeroSection from "../components/Landing/HeroSection";
import FeatureSection from "../components/Landing/FeatureSection";
import CTASection from "../components/Landing/CTASection";
import Footer from "../components/Landing/Footer";

export default function LandingPage({ onGetStarted }) {
    return (
        <div className="bg-white max-w-[2480px] mx-auto flex flex-col">
            <HeroSection onGetStarted={onGetStarted} />
            <FeatureSection />
            <CTASection onGetStarted={onGetStarted} />
            <Footer />
        </div>
    );
}
