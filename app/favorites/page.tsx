"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Trash2, Popcorn, ArrowUpDown, Award, Lock, RefreshCw } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { useAchievements } from "@/hooks/useAchievements";
import { MovieCard } from "@/components/movies/MovieCard";
import { AdBanner } from "@/components/layout/AdBanner";

type SortOption = "recent" | "rating" | "title";

export default function MyHolePage() {
  const { favorites, loaded, removeFavorite } = useFavorites();
  const { achievements, unlockedCount, unlockAchievement } = useAchievements();
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  // Check and unlock achievements
  useEffect(() => {
    if (loaded && favorites.length >= 10) {
      unlockAchievement("hole-digger");
    } else if (loaded && favorites.length >= 1) {
      unlockAchievement("first-pop");
    }
  }, [favorites.length, loaded, unlockAchievement]);

  // Sort logic based on selected option
  const sortedFavorites = [...favorites].sort((a, b) => {
    if (sortBy === "recent") {
      return (b.addedAt || 0) - (a.addedAt || 0);
    }
    if (sortBy === "rating") {
      return b.vote_average - a.vote_average;
    }
    if (sortBy === "title") {
      const titleA = a.title || a.name || "";
      const titleB = b.title || b.name || "";
      return titleA.localeCompare(titleB);
    }
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24 min-h-screen">

      {/* 1. Header Information */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12 mt-4">
        <div className="flex flex-col gap-2.5 max-w-xl">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent-red flex items-center gap-1.5">
            <Heart className="w-4 h-4 fill-current animate-pulse text-accent-red" />
            Your Private Wormhole
          </span>
          <h2 className="text-3xl md:text-5xl font-outfit font-extrabold tracking-tight text-text-primary">
            My Movie <span className="text-accent-gold italic bg-accent-red/10 px-2 py-0.5 rounded-lg border border-accent-red/20">Hole</span>
          </h2>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed">
            The movies you dug up and locked in for dynamic, cheekily comfortable binging. Handpick them, sort them, and clear space when you are finished!
          </p>
        </div>

        {/* Sort Select Controls */}
        {loaded && favorites.length > 0 && (
          <div className="flex items-center gap-2.5 bg-surface-elevated/80 border border-white/5 rounded-2xl p-2 self-start md:self-auto">
            <div className="p-1.5 bg-white/5 rounded-lg text-accent-gold">
              <ArrowUpDown className="w-4 h-4" />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent text-text-primary font-mono text-xs font-bold uppercase tracking-wider outline-none pr-3 cursor-pointer select-none"
            >
              <option value="recent" className="bg-surface-elevated">Recently dug</option>
              <option value="rating" className="bg-surface-elevated">Highest Rated</option>
              <option value="title" className="bg-surface-elevated">Alphabetical</option>
            </select>
          </div>
        )}
      </div>

      {/* Gamification: Achievements Bar */}
      <div className="mb-12 p-6 rounded-2xl bg-surface-elevated/40 border border-white/5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-outfit font-extrabold text-base md:text-lg text-text-primary flex items-center gap-2">
            <Award className="w-5 h-5 text-accent-gold animate-bounce" />
            <span>My Achievement Badges</span>
          </h3>
          <span className="text-xs font-mono font-bold text-accent-gold bg-accent-gold/10 px-3 py-1 rounded-full border border-accent-gold/20">
            {unlockedCount} / {achievements.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {achievements.map((ach) => {
            const isUnlocked = ach.unlockedAt !== null;
            return (
              <div
                key={ach.id}
                className={`p-3 rounded-xl border flex flex-col items-center text-center gap-2 transition-all relative group ${
                  isUnlocked
                    ? "bg-accent-gold/5 border-accent-gold/20 shadow-glow"
                    : "bg-black/25 border-white/5 opacity-60"
                }`}
              >
                <span className={`text-2xl filter drop-shadow-[0_0_8px_rgba(228,179,67,0.3)] ${!isUnlocked && "grayscale"}`}>
                  {ach.icon}
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-text-primary truncate">{ach.title}</span>
                  <span className="text-[10px] text-text-secondary leading-snug line-clamp-1 mt-0.5">{ach.description}</span>
                </div>

                {!isUnlocked && (
                  <div className="absolute top-2 right-2 text-text-secondary/40">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. List States */}
      <AnimatePresence mode="wait">
        {!loaded ? (
          /* Loading indicator */
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-24"
          >
            <RefreshCw className="w-8 h-8 text-accent-gold animate-spin mb-4" />
            <p className="text-sm font-mono text-text-secondary tracking-widest">Opening your wormhole...</p>
          </motion.div>
        ) : favorites.length === 0 ? (
          /* Branded cheeky empty state */
          <motion.div
            key="empty-hole"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto"
          >
            <div className="w-24 h-24 rounded-full bg-accent-red/10 border-2 border-dashed border-accent-red/20 flex items-center justify-center mb-6 relative">
              <Popcorn className="w-12 h-12 text-accent-red animate-bounce" />
              <Heart className="absolute top-2 right-2 w-5 h-5 text-accent-gold fill-accent-gold animate-ping" />
            </div>
            <h3 className="text-2xl font-outfit font-extrabold text-text-primary mb-2">
              Your Hole is empty! 🍿
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-8">
              Looks like you haven&apos;t binned any movies yet. Don&apos;t leave your wormhole cold! Start digging through trending, categories, and pop some kernels.
            </p>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 bg-gradient-to-r from-accent-gold via-amber-400 to-accent-gold text-background rounded-full font-bold shadow-glow text-sm md:text-base"
              >
                Start Digging Cinema
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          /* Animated Favorites list */
          <motion.div
            key="favorites-list"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.05,
                }
              }
            }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8"
          >
            <AnimatePresence>
              {sortedFavorites.map((movie) => (
                <motion.div
                  key={movie.id}
                  layout
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                  className="relative group/fav"
                >
                  {/* standard Movie Card rendering */}
                  <MovieCard movie={movie} />

                  {/* quick hover delete overlay */}
                  <div className="absolute bottom-2.5 right-2.5 z-20 opacity-0 group-hover/fav:opacity-100 transition-opacity duration-300">
                    <motion.button
                      whileHover={{ scale: 1.15, rotate: 12 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFavorite(movie.id)}
                      className="p-2.5 rounded-full bg-accent-red text-text-primary hover:bg-red-700 shadow-glowRed transition-colors"
                      title="Kick from my Hole"
                      aria-label="Kick from my Hole"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium non-intrusive bottom banner */}
      <AdBanner placement="my-hole-bottom" />

    </div>
  );
}
