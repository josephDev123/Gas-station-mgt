// import Header from "@/components/Header";
// import Hero from "@/components/Hero";
// import Features from "@/components/Features";
// import Benefits from "@/components/Benefits";
// import Footer from "@/components/Footer";
// import { useEffect } from "react";

// const Index = () => {

//   return (
//     <div className="min-h-screen">
//       <Header />
//       <Hero />
//       <Features />
//       <Benefits />
//       <Footer />
//     </div>
//   );
// };

// export default Index;

"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { HowItWorks } from "./components/HowItWorks";
import { AnalyticsSection } from "./components/AnalyticsSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";

/* ------------------ Animation Variants ------------------ */

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

/* ------------------ Page ------------------ */

export default function LandingPage() {
  return (
    <main className="bg-black text-white overflow-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <AnalyticsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
