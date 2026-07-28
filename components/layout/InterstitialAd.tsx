"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAds } from "@/hooks/useAds";
import { usePathname } from "next/navigation";
import { X, Sparkles, Popcorn, ArrowRight } from "lucide-react";

export function InterstitialAd() {
  const { adsRemoved, shouldShowInterstitial, recordInterstitialShown } = useAds();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isSkippable, setIsSkippable] = useState(false);

  // Listen to path changes to trigger interstitial ad
  useEffect(() => {
    if (adsRemoved) return;

    // Trigger interstitial on navigation changes (capped at 1 per 5 mins)
    const shouldShow = shouldShowInterstitial();
    if (shouldShow && pathname !== "/") {
      setIsOpen(true);
      setCountdown(3);
      setIsSkippable(false);
      recordInterstitialShown();
    }
  }, [pathname, adsRemoved]);

  // Countdown timer effect
  useEffect(() => {
    if (!isOpen) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsSkippable(true);
    }
  }, [isOpen, countdown]);

  if (adsRemoved || !isOpen) return null;

  const handleClose = () => {
    if (isSkippable) {
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center select-none"
      >
        {/* Ad Content box */}
        <div className="max-w-md w-full p-8 rounded-3xl bg-surface-elevated border border-white/10 shadow-glow relative flex flex-col items-center">

          {/* Subtle logo */}
          <div className="flex items-center gap-1.5 mb-6 text-xs font-mono tracking-widest text-text-secondary/60 uppercase">
            <Popcorn className="w-4 h-4 text-accent-gold" />
            <span>Movie Hole Showcase</span>
          </div>

          <div className="w-20 h-20 rounded-2xl bg-accent-gold/10 text-accent-gold flex items-center justify-center border border-accent-gold/20 mb-6 relative">
            <Sparkles className="w-10 h-10 animate-pulse" />

            {/* Pulsating circle */}
            <div className="absolute inset-0 rounded-2xl border border-accent-gold/40 animate-ping opacity-45" />
          </div>

          <h2 className="font-outfit font-black text-2xl text-text-primary mb-2">
            Get 1 Year Ad-Free VIP 🍿
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-8">
            Upgrade to premium today to bypass all ads, unlock VIP gold themes, and support our cinema discovery wormhole!
          </p>

          <div className="flex flex-col gap-3 w-full">
            {/* Primary Action Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setIsOpen(false);
                // Can route to billing settings drawer
                try {
                  window.dispatchEvent(new Event("movie-hole-settings-drawer-toggle"));
                } catch (e) {}
              }}
              className="w-full py-4 rounded-full bg-gradient-to-r from-accent-gold to-accent-red text-text-primary font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Go Premium For $19.99/yr</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            {/* Skip Ad Button */}
            <button
              disabled={!isSkippable}
              onClick={handleClose}
              className={`w-full py-3.5 rounded-full border text-xs font-mono font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 ${
                isSkippable
                  ? "border-white/10 hover:border-accent-red/40 hover:bg-accent-red/10 text-text-primary cursor-pointer"
                  : "border-white/5 text-text-secondary/40 cursor-not-allowed bg-white/[0.02]"
              }`}
            >
              {isSkippable ? (
                <>
                  <span>Skip Ad 🍿</span>
                </>
              ) : (
                <span>Skip in {countdown}s...</span>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
