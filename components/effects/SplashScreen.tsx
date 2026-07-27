"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SplashScreen() {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    try {
      const hasSeenSplash = sessionStorage.getItem("movie-hole-splash-seen");
      if (!hasSeenSplash) {
        setShowSplash(true);
        sessionStorage.setItem("movie-hole-splash-seen", "true");
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleAnimationComplete = () => {
    // Automatically close splash after 3 seconds or keep it controlled
  };

  // Auto-dismiss splash screen after 3 seconds
  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center select-none"
        >
          {/* Cinema Spotlights in background */}
          <div className="absolute inset-0 bg-radial-gradient from-accent-gold/5 via-transparent to-transparent pointer-events-none" />

          <div className="flex flex-col items-center gap-6 relative">

            {/* Spinning Custom Film Reel SVG */}
            <motion.div
              initial={{ scale: 0.4, rotate: -180, opacity: 0 }}
              animate={{
                scale: [0.4, 1.1, 1],
                rotate: [-180, 15, 0],
                opacity: 1
              }}
              transition={{
                duration: 1.4,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="w-20 h-20 md:w-28 md:h-28 relative flex items-center justify-center bg-gradient-to-br from-accent-gold via-amber-300 to-accent-red p-2 rounded-2xl shadow-glowRed"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-background w-full h-full"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
                <circle cx="12" cy="6" r="1.5" fill="currentColor" />
                <circle cx="12" cy="18" r="1.5" fill="currentColor" />
                <circle cx="6" cy="12" r="1.5" fill="currentColor" />
                <circle cx="18" cy="12" r="1.5" fill="currentColor" />
                <path d="M10 2 Q 12 -1, 14 2" stroke="white" strokeWidth="1" />
              </svg>

              {/* animated kernel pops */}
              <motion.span
                animate={{ y: [-10, -40], x: [0, -20], scale: [1, 1.4, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.4 }}
                className="absolute top-2 left-2 text-sm"
              >
                🍿
              </motion.span>
              <motion.span
                animate={{ y: [-15, -50], x: [0, 25], scale: [1, 1.5, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 0.6, delay: 0.3 }}
                className="absolute top-1 right-2 text-xs"
              >
                🍿
              </motion.span>
            </motion.div>

            {/* Logo Wordmark Zoom */}
            <div className="text-center flex flex-col gap-2">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="text-3xl md:text-5xl font-outfit font-extrabold tracking-tight text-text-primary"
              >
                <span className="bg-gradient-to-r from-accent-gold via-amber-200 to-accent-gold bg-clip-text text-transparent">Movie </span>
                <span className="inline-block italic ml-1 px-2.5 py-0.5 rounded-xl bg-accent-red text-text-primary shadow-glowRed">
                  Hole
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="text-xs md:text-sm text-text-secondary tracking-widest font-mono uppercase"
              >
                Hop In. Binge Out. 🍿
              </motion.p>
            </div>

            {/* Premium Progress Bar Indicator */}
            <div className="absolute -bottom-16 w-32 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-accent-gold to-accent-red"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
