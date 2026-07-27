"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronRight, X, Popcorn, Sparkles, Star } from "lucide-react";
import { useAchievements } from "@/hooks/useAchievements";

interface TourStep {
  title: string;
  description: string;
  icon: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    title: "Welcome to The Hole! 🍿",
    description: "Your ultimate, slightly cheeky discovery wormhole. Discover high-fidelity blockbusters, curated hits, and classic cinema.",
    icon: "🕳️",
  },
  {
    title: "Browse Curated Genres",
    description: "Click on 'Genres' at the top to explore customized categories of films, each color-coded with dynamic glow gradients.",
    icon: "🎭",
  },
  {
    title: "Binge Out in Your Hole",
    description: "Click the heart button on any movie or TV show to save it to 'My Hole' for dynamic offline binging. Go sort them out!",
    icon: "⛏️",
  },
];

export function OnboardingTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { unlockAchievement } = useAchievements();

  useEffect(() => {
    try {
      const hasSeenTour = localStorage.getItem("movie-hole-tour-completed");
      if (!hasSeenTour) {
        // Delay open slightly for a smooth transition after the splash screen
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 3500);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsOpen(false);
    try {
      localStorage.setItem("movie-hole-tour-completed", "true");
    } catch (e) {
      console.error(e);
    }
    // Unlock welcome achievement
    setTimeout(() => {
      unlockAchievement("welcome");
    }, 1000);
  };

  const activeStep = TOUR_STEPS[currentStep];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="w-full max-w-md bg-surface-elevated border border-accent-gold/20 rounded-2xl overflow-hidden shadow-glow p-6 md:p-8 flex flex-col gap-6"
          >
            {/* Header row */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent-gold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                The Hole Guide (Step {currentStep + 1} of {TOUR_STEPS.length})
              </span>
              <button
                onClick={handleComplete}
                className="p-1 rounded-full bg-white/5 hover:bg-white/10 text-text-secondary hover:text-text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Visual emoji / graphic */}
            <div className="flex items-center gap-4 py-2">
              <span className="text-4xl filter drop-shadow-[0_0_15px_rgba(228,179,67,0.3)] select-none">
                {activeStep.icon}
              </span>
              <div className="flex flex-col">
                <h4 className="font-outfit font-extrabold text-xl text-text-primary leading-tight">
                  {activeStep.title}
                </h4>
              </div>
            </div>

            {/* Step Description */}
            <p className="text-sm text-text-secondary leading-relaxed">
              {activeStep.description}
            </p>

            {/* Steps indicator and Controller bar */}
            <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
              <div className="flex items-center gap-1.5">
                {TOUR_STEPS.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentStep ? "w-6 bg-accent-gold" : "w-1.5 bg-white/10"
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="flex items-center gap-1 bg-gradient-to-r from-accent-gold to-accent-red text-text-primary font-bold text-xs px-4 py-2 rounded-full shadow-glowRed"
              >
                <span>{currentStep === TOUR_STEPS.length - 1 ? "Finish Digging" : "Continue"}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
