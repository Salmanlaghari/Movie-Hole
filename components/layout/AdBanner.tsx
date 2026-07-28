"use client";

import { motion } from "framer-motion";
import { useAds } from "@/hooks/useAds";
import { Sparkles, X, ExternalLink } from "lucide-react";
import { useState } from "react";

interface AdBannerProps {
  placement: "detail-bottom" | "my-hole-bottom";
}

const HOUSE_PROMOS = [
  {
    title: "Movie Hole Gold Pass 🍿",
    desc: "Unlock crystal-clear IMAX resolution, offline downloads, and infinite watch wormholes.",
    cta: "Go Gold",
    link: "#",
  },
  {
    title: "Dolby Atmos Spatial Headphones 🎧",
    desc: "Experience cinema-grade multi-dimensional audio right under your popcorn bucket.",
    cta: "Explore Gear",
    link: "#",
  },
];

export function AdBanner({ placement }: AdBannerProps) {
  const { adsRemoved } = useAds();
  const [dismissed, setDismissed] = useState(false);

  if (adsRemoved || dismissed) return null;

  // Select a random promo for native look
  const promo = HOUSE_PROMOS[placement === "detail-bottom" ? 0 : 1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full mt-10 p-5 rounded-2xl bg-surface-elevated/65 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 shadow-glow-sm relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-accent-gold/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-start gap-3.5 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-accent-gold/20 text-accent-gold flex items-center justify-center flex-shrink-0 border border-accent-gold/30">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-accent-gold/20 text-accent-gold">
              Sponsored
            </span>
            <h4 className="font-outfit font-bold text-sm text-text-primary truncate">
              {promo.title}
            </h4>
          </div>
          <p className="text-xs text-text-secondary/90 mt-1 leading-relaxed max-w-xl">
            {promo.desc}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto justify-end">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={promo.link}
          className="px-4 py-2 rounded-full bg-accent-gold text-background font-bold text-xs flex items-center gap-1.5 shadow-md"
        >
          <span>{promo.cta}</span>
          <ExternalLink className="w-3 h-3" />
        </motion.a>

        <button
          onClick={() => setDismissed(true)}
          className="p-2 rounded-full hover:bg-white/5 text-text-secondary hover:text-text-primary transition-colors"
          aria-label="Dismiss Advertisement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
