"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Heart, Calendar, Clock, Film, ChevronLeft, Check, Play, User } from "lucide-react";
import { Movie } from "@/types/movie";
import { getImagePath } from "@/lib/tmdb";
import { useFavorites } from "@/hooks/useFavorites";
import { TrailerModal } from "./TrailerModal";
import { MovieRow } from "./MovieRow";

interface MovieDetailClientProps {
  movie: Movie;
  similarMovies: Movie[];
  recommendedMovies: Movie[];
}

export function MovieDetailClient({ movie, similarMovies, recommendedMovies }: MovieDetailClientProps) {
  const router = useRouter();
  const { isFavorite, toggleFavorite, loaded } = useFavorites();
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const isFav = isFavorite(movie.id);
  const videoKey = movie.videos?.results?.[0]?.key || "";
  const releaseYear = movie.release_date ? movie.release_date.split("-")[0] : "N/A";

  const castList = movie.credits?.cast?.slice(0, 10) || [];

  return (
    <div className="min-h-screen bg-background pb-16">

      {/* 1. Cinematic Backdrop Hero (60vh) */}
      <div className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden">
        <div className="absolute inset-0 bg-background">
          <img
            src={getImagePath(movie.backdrop_path, "backdrop")}
            alt={movie.title}
            className="w-full h-full object-cover opacity-45"
          />
          {/* Multi-layered dark gradients for cinematic backdrop fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/35" />
        </div>

        {/* Floating Top Breadcrumb Bar */}
        <div className="absolute top-6 left-0 right-0 z-20 max-w-7xl mx-auto px-4 md:px-8">
          <motion.button
            whileHover={{ scale: 1.05, x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/70 backdrop-blur-md border border-white/10 hover:border-accent-gold/40 text-text-secondary hover:text-accent-gold transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">Back inside the Hole</span>
          </motion.button>
        </div>
      </div>

      {/* 2. Overlapping Details Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-36 md:-mt-48 relative z-10 flex flex-col md:flex-row gap-8 md:gap-12">

        {/* Floating Sticky Poster Card (left-side offset) */}
        <div className="w-56 md:w-80 flex-shrink-0 mx-auto md:mx-0">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
            className="sticky top-28 bg-surface-elevated rounded-2xl overflow-hidden border border-white/15 hover:border-accent-gold/30 shadow-glowRed transition-all aspect-[2/3] w-full"
          >
            {!isImageLoaded && <div className="absolute inset-0 skeleton-shimmer" />}
            <img
              src={getImagePath(movie.poster_path, "poster")}
              alt={movie.title}
              className={`w-full h-full object-cover transition-all duration-500 ${
                isImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-102 blur-sm"
              }`}
              onLoad={() => setIsImageLoaded(true)}
              loading="eager"
            />
          </motion.div>
        </div>

        {/* Right side Detail Content */}
        <div className="flex-1 flex flex-col gap-6 text-center md:text-left">

          {/* Title and Tagline */}
          <div className="flex flex-col gap-2">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-outfit font-extrabold tracking-tight text-text-primary"
            >
              {movie.title}
            </motion.h1>

            {movie.tagline && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base md:text-lg italic text-accent-gold/80 font-medium"
              >
                &ldquo;{movie.tagline}&rdquo;
              </motion.p>
            )}
          </div>

          {/* Quick Stats Grid Row */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            {/* Year */}
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-medium text-text-secondary">
              <Calendar className="w-3.5 h-3.5" />
              <span>{releaseYear}</span>
            </div>

            {/* Runtime */}
            {movie.runtime && (
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-medium text-text-secondary">
                <Clock className="w-3.5 h-3.5" />
                <span>{movie.runtime} minutes</span>
              </div>
            )}

            {/* Vote Rating average */}
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold text-text-primary">
              <Star className="w-3.5 h-3.5 fill-accent-gold text-accent-gold" />
              <span className="text-rating-green">{movie.vote_average.toFixed(1)} Rating</span>
              <span className="text-text-secondary/60">({movie.vote_count} votes)</span>
            </div>
          </div>

          {/* Genres row */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              {movie.genres.map((genre) => (
                <Link key={genre.id} href="/genres">
                  <span className="px-3.5 py-1.5 text-xs font-semibold tracking-wider rounded-full bg-accent-gold/10 hover:bg-accent-gold/20 text-accent-gold border border-accent-gold/20 transition-all cursor-pointer">
                    {genre.name}
                  </span>
                </Link>
              ))}
            </div>
          )}

          {/* Action CTAs Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 py-2 border-y border-white/5 my-1">
            {/* Play Trailer Trigger Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsTrailerOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-accent-gold to-amber-500 text-background font-bold px-6 py-3.5 rounded-full shadow-glow"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Watch Trailer</span>
            </motion.button>

            {/* Add to my Hole heart toggle button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleFavorite(movie)}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3.5 rounded-full backdrop-blur-xl transition-all font-bold"
            >
              <Heart
                className={`w-4 h-4 transition-all ${
                  loaded && isFav ? "fill-accent-red text-accent-red scale-125" : "text-text-secondary"
                }`}
              />
              <span>{loaded && isFav ? "In My Hole 🍿" : "Add to My Hole"}</span>
            </motion.button>
          </div>

          {/* Overview Section */}
          <div className="flex flex-col gap-2.5">
            <h3 className="font-outfit font-extrabold text-lg md:text-xl text-text-primary">
              Overview
            </h3>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-3xl">
              {movie.overview || "This cinematic release is waiting to reveal its full plot details inside our binging wormhole."}
            </p>
          </div>

          {/* Cast Members Avatars Circular list */}
          {castList.length > 0 && (
            <div className="flex flex-col gap-4 mt-2">
              <h3 className="font-outfit font-extrabold text-lg md:text-xl text-text-primary">
                Starring Cast
              </h3>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                {castList.map((actor) => (
                  <div key={actor.id} className="group relative flex flex-col items-center">
                    {/* circular image avatar container */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 3 }}
                      className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-accent-gold/60 shadow-md bg-white/5 relative"
                    >
                      {actor.profile_path ? (
                        <img
                          src={getImagePath(actor.profile_path, "profile")}
                          alt={actor.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-white/5 text-text-secondary">
                          <User className="w-6 h-6" />
                        </div>
                      )}
                    </motion.div>

                    {/* Tooltip Overlay */}
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-surface-elevated border border-border-subtle rounded-xl py-1.5 px-3 min-w-[120px] text-center shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 z-30 scale-90 group-hover:scale-100">
                      <p className="text-xs font-bold text-text-primary whitespace-nowrap truncate">{actor.name}</p>
                      <p className="text-[10px] text-accent-gold font-mono truncate">{actor.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* 3. Recommended rows */}
      <div className="max-w-7xl mx-auto mt-16 md:mt-24 flex flex-col gap-4 relative z-10">

        {similarMovies.length > 0 && (
          <MovieRow
            title="Wormholes Alike (Similar)"
            movies={similarMovies}
          />
        )}

        {recommendedMovies.length > 0 && (
          <MovieRow
            title="Popcorn Picks For You (Recommended)"
            movies={recommendedMovies}
          />
        )}

      </div>

      {/* Iframe Youtube modal */}
      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        videoKey={videoKey}
        movieTitle={movie.title}
      />

    </div>
  );
}
