"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Film, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center select-none bg-background">

      {/* Spotlight blur backing */}
      <div className="absolute inset-0 bg-radial-gradient from-accent-red/5 via-transparent to-transparent pointer-events-none" />

      <div className="flex flex-col items-center gap-6 max-w-md relative">

        {/* Film reel floating 404 block */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 3, -3, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent-red to-red-800 p-1 flex items-center justify-center border border-accent-red/20 shadow-glowRed"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-white w-full h-full p-3"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
            <circle cx="12" cy="6" r="1.5" fill="currentColor" />
            <circle cx="12" cy="18" r="1.5" fill="currentColor" />
            <circle cx="6" cy="12" r="1.5" fill="currentColor" />
            <circle cx="18" cy="12" r="1.5" fill="currentColor" />
          </svg>
        </motion.div>

        {/* Header content */}
        <div className="flex flex-col gap-3">
          <h2 className="text-4xl md:text-5xl font-outfit font-extrabold tracking-tight text-text-primary">
            404 — Wrong Hole
          </h2>
          <p className="text-base font-medium italic text-accent-gold">
            &ldquo;You fell into the wrong hole 🎬&rdquo;
          </p>
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed mt-1">
            We binned every corner of our database, but there are no movie reels or popcorn buckets down this corridor. Let&apos;s climb back up!
          </p>
        </div>

        {/* Navigation Action CTA */}
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 flex items-center gap-2 bg-gradient-to-r from-accent-gold to-accent-red text-text-primary font-bold text-sm px-6 py-3 rounded-full shadow-glow"
          >
            <Home className="w-4 h-4 text-background fill-current" />
            <span>Climb Back to Safety</span>
          </motion.button>
        </Link>
      </div>

    </div>
  );
}
