"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Heart, Star, Clock, Calendar, Check } from "lucide-react";
import { Movie } from "@/types/movie";
import { getImagePath } from "@/lib/tmdb";
import { TrailerModal } from "./TrailerModal";
import { useFavorites } from "@/hooks/useFavorites";

interface HeroProps {
  movies: Movie[];
}

export function Hero({ movies }: HeroProps) {
  const { isFavorite, toggleFavorite, loaded } = useFavorites();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  // Filter out movies with backdrop images
  const heroMovies = movies.slice(0, 5);

  // Auto rotate every 7 seconds
  useEffect(() => {
    if (heroMovies.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroMovies.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [heroMovies.length]);

  if (heroMovies.length === 0) return null;

  const activeMovie = heroMovies[currentIndex];
  const activeBackdrop = getImagePath(activeMovie.backdrop_path, "backdrop");
  const releaseYear = activeMovie.release_date ? activeMovie.release_date.split("-")[0] : "N/A";

  // Custom video key: default or retrieved from detail response.
  // Our mock movies have a video key inside videos.results.
  const videoKey = activeMovie.videos?.results?.[0]?.key || "zSWdZVtXT7U";

  const isFav = isFavorite(activeMovie.id);

  return (
    <section className="relative w-full h-[85vh] md:h-[95vh] flex items-center overflow-hidden -mt-28">

      {/* 1. Backdrop Images with Crossfade */}
      <div className="absolute inset-0 z-0 bg-background">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${activeBackdrop})` }}
          />
        </AnimatePresence>

        {/* Dynamic Dark Gradients to match our premium background #0A0A0F */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/20" />
      </div>

      {/* 2. Hero Content Area */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10 pt-20 md:pt-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl flex flex-col gap-4 md:gap-6"
          >
            {/* Tagline or Genre chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-accent-gold text-background text-xs font-mono font-bold uppercase tracking-wider rounded-full">
                Featured discovery
              </span>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-text-secondary font-mono">
                <Star className="w-3.5 h-3.5 fill-accent-gold text-accent-gold" />
                <span className="text-text-primary font-bold">{activeMovie.vote_average.toFixed(1)}</span>
              </div>
              {activeMovie.runtime && (
                <div className="flex items-center gap-1 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-text-secondary font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activeMovie.runtime} min</span>
                </div>
              )}
            </div>

            {/* Title with outstanding display typography */}
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-outfit font-extrabold tracking-tight text-text-primary leading-[1.05] drop-shadow-lg">
              {activeMovie.title}
            </h2>

            {/* Overview description */}
            <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-lg line-clamp-3 md:line-clamp-4 drop-shadow-md">
              {activeMovie.overview}
            </p>

            {/* CTAs Button panel */}
            <div className="flex flex-wrap items-center gap-4 mt-2">
              {/* Watch Trailer Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsTrailerOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-accent-gold via-amber-400 to-accent-gold hover:from-amber-400 hover:to-accent-gold text-background font-bold text-sm md:text-base px-7 py-3.5 rounded-full shadow-glow transition-all"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Watch Trailer</span>
              </motion.button>

              {/* Add to my Hole Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleFavorite(activeMovie)}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-text-primary font-bold text-sm md:text-base px-6 py-3.5 rounded-full backdrop-blur-xl transition-all"
              >
                {loaded && isFav ? (
                  <>
                    <Check className="w-5 h-5 text-accent-gold" />
                    <span>In My Hole 🍿</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5 text-accent-red" />
                    <span>Add to My Hole</span>
                  </>
                )}
              </motion.button>

              {/* Details link */}
              <Link href={`/movie/${activeMovie.id}`}>
                <motion.span
                  whileHover={{ x: 3 }}
                  className="inline-flex items-center text-xs md:text-sm text-accent-gold hover:underline font-mono ml-2 gap-1 cursor-pointer"
                >
                  Explore More Details &rarr;
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 3. Slide selector indicators */}
        <div className="flex items-center gap-2 mt-12 md:mt-20">
          {heroMovies.map((movie, index) => (
            <button
              key={movie.id}
              onClick={() => setCurrentIndex(index)}
              className="group flex flex-col items-start text-left focus:outline-none"
              aria-label={`Slide ${index + 1}`}
            >
              <div className="relative w-8 md:w-12 h-1 bg-white/15 rounded-full overflow-hidden transition-all duration-300">
                {index === currentIndex && (
                  <motion.div
                    layoutId="activeSlideProgress"
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent-gold to-accent-red"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 7, ease: "linear" }}
                  />
                )}
              </div>
              <span className={`hidden md:block text-[10px] font-mono tracking-widest uppercase mt-2 transition-all ${
                index === currentIndex ? "text-accent-gold font-bold" : "text-text-secondary/50 group-hover:text-text-secondary"
              }`}>
                0{index + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Trailer Modal integration */}
      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        videoKey={videoKey}
        movieTitle={activeMovie.title}
      />
    </section>
  );
}
