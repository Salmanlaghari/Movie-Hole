"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface LogoProps {
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ showTagline = false, size = "md" }: LogoProps) {
  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-9 h-9",
    lg: "w-14 h-14",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-xl md:text-2xl",
    lg: "text-4xl md:text-5xl",
  };

  return (
    <Link href="/" className="flex items-center gap-2.5 group select-none cursor-pointer">
      {/* Film reel + popcorn bucket emblem */}
      <motion.div
        whileHover={{ scale: 1.08, rotate: 15 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className={`${iconSizes[size]} relative flex items-center justify-center bg-gradient-to-br from-accent-gold to-accent-red p-1 rounded-xl shadow-glowRed`}
      >
        {/* Custom SVG logo representing a film reel with a popcorn bucket style and a hole */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-background w-full h-full"
        >
          {/* External circle of the film reel */}
          <circle cx="12" cy="12" r="10" />
          {/* Inner circle of the reel */}
          <circle cx="12" cy="12" r="3" fill="currentColor" />
          {/* Reel holes / sprocket divisions */}
          <circle cx="12" cy="6" r="1.5" fill="currentColor" />
          <circle cx="12" cy="18" r="1.5" fill="currentColor" />
          <circle cx="6" cy="12" r="1.5" fill="currentColor" />
          <circle cx="18" cy="12" r="1.5" fill="currentColor" />
          {/* Tiny premium steam popcorn lines coming out */}
          <path d="M10 2 Q 12 -1, 14 2" stroke="white" strokeWidth="1" />
        </svg>

        {/* Little decorative popcorn pieces floating */}
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent-gold rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
        <span className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-accent-red rounded-full animate-ping" />
      </motion.div>

      <div className="flex flex-col leading-tight">
        <h1 className={`${textSizes[size]} font-outfit font-extrabold tracking-tight text-text-primary`}>
          <span className="bg-gradient-to-r from-accent-gold via-amber-200 to-accent-gold bg-clip-text text-transparent">Movie </span>
          <motion.span
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="inline-block italic ml-1 px-1.5 py-0.5 rounded-lg bg-accent-red text-text-primary text-shadow-glowRed origin-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            Hole
          </motion.span>
        </h1>
        {showTagline && (
          <p className="text-[10px] md:text-xs text-text-secondary tracking-widest font-mono font-medium uppercase mt-0.5 opacity-80">
            Hop in. Binge out.
          </p>
        )}
      </div>
    </Link>
  );
}
