import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { HowItWorks } from "./components/HowItWorks";
import { AnalyticsSection } from "./components/AnalyticsSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";

// Animation Variants

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
