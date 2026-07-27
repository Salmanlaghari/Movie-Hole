"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Star, Heart, Popcorn } from "lucide-react";
import { Movie } from "@/types/movie";
import { getImagePath } from "@/lib/tmdb";
import { useFavorites } from "@/hooks/useFavorites";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const { isFavorite, toggleFavorite, loaded } = useFavorites();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const isFav = isFavorite(movie.id);

  // Dynamic interactive cursor spotlight glow effect!
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const releaseYear = movie.release_date ? movie.release_date.split("-")[0] : "N/A";

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onMouseMove={handleMouseMove}
      className="relative group w-[200px] md:w-[240px] flex-shrink-0 bg-surface-elevated rounded-2xl overflow-hidden border border-white/5 hover:border-accent-gold/20 shadow-xl transition-colors cursor-pointer select-none"
    >
      <Link href={`/movie/${movie.id}`}>
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-white/5">
          {/* Spotlight overlay effect */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  120px circle at ${mouseX}px ${mouseY}px,
                  rgba(228, 179, 67, 0.15),
                  transparent 80%
                )
              `,
            }}
          />

          {/* Shimmer skeleton until image loads */}
          {!isImageLoaded && (
            <div className="absolute inset-0 skeleton-shimmer z-0" />
          )}

          {/* Poster Image with sharp fade-in reveal */}
          <img
            src={getImagePath(movie.poster_path, "poster")}
            alt={movie.title}
            className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-108 ${
              isImageLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-102 blur-md"
            }`}
            onLoad={() => setIsImageLoaded(true)}
            loading="lazy"
          />

          {/* Dark gradient overlay bottom-up */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 z-10" />

          {/* Rating Pill Top-Right */}
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-background/80 backdrop-blur-md border border-white/10 font-mono text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-accent-gold text-accent-gold" />
            <span className={movie.vote_average >= 8 ? "text-rating-green" : "text-text-primary"}>
              {movie.vote_average > 0 ? movie.vote_average.toFixed(1) : "N/A"}
            </span>
          </div>

          {/* Add to favorites heart trigger */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(movie);
            }}
            className="absolute top-3 left-3 z-20 p-2 rounded-full bg-background/80 backdrop-blur-md border border-white/10 text-text-secondary hover:text-accent-red hover:bg-background transition-all"
            aria-label="Add to My Hole"
          >
            <Heart className={`w-4 h-4 transition-all ${loaded && isFav ? "fill-accent-red text-accent-red scale-110" : "scale-100"}`} />
          </button>

          {/* Interactive dynamic hover overlay details */}
          <div className="absolute inset-x-0 bottom-0 p-4 z-20 flex flex-col justify-end">
            <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-accent-gold/90 mb-1">
              {releaseYear}
            </span>
            <h3 className="font-outfit font-extrabold text-sm md:text-base text-text-primary leading-tight truncate group-hover:text-accent-gold transition-colors">
              {movie.title}
            </h3>
            {movie.genre_ids.length > 0 && (
              <p className="text-[10px] text-text-secondary mt-1.5 truncate">
                Curated popcorn pick
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
