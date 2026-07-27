"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Popcorn, Sparkles, Film, ArrowRight, Grid } from "lucide-react";
import { GENRES_LIST, getGenreGradient, tmdb } from "@/lib/tmdb";
import { Movie } from "@/types/movie";
import { MovieCard } from "@/components/movies/MovieCard";

export default function GenresPage() {
  const [selectedGenre, setSelectedGenre] = useState<{ id: number; name: string } | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch movies when a genre is selected
  useEffect(() => {
    if (!selectedGenre) {
      setMovies([]);
      return;
    }

    const fetchGenreMovies = async () => {
      setLoading(true);
      try {
        const response = await tmdb.getMoviesByGenre(selectedGenre.id);
        setMovies(response.results);
      } catch (error) {
        console.error("Failed to fetch movies by genre", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreMovies();
  }, [selectedGenre]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24 min-h-screen">
      <AnimatePresence mode="wait">

        {/* State A: Grid of Genre Categories */}
        {!selectedGenre ? (
          <motion.div
            key="genre-grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-8 md:gap-12"
          >
            {/* Header Title */}
            <div className="flex flex-col gap-2.5 max-w-2xl mt-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent-gold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 animate-spin-slow text-accent-red" />
                Popcorn curation
              </span>
              <h2 className="text-3xl md:text-5xl font-outfit font-extrabold tracking-tight text-text-primary">
                Browse by Category
              </h2>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                Choose your favorite cinema flavor. We have everything from nail-biting action to heart-melting romance, packed in our premiumDiscovery Hole.
              </p>
            </div>

            {/* Grid display */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.04,
                  },
                },
              }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6"
            >
              {GENRES_LIST.map((genre) => {
                const gradient = getGenreGradient(genre.id);
                return (
                  <motion.button
                    key={genre.id}
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
                    }}
                    whileHover={{ scale: 1.05, y: -6 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedGenre(genre)}
                    className={`relative p-6 h-36 md:h-44 rounded-2xl overflow-hidden bg-gradient-to-br ${gradient} border border-white/5 hover:border-white/20 flex flex-col justify-between items-start text-left shadow-lg group transition-all`}
                  >
                    {/* Background glass shine effect */}
                    <div className="absolute inset-0 bg-white/[0.03] group-hover:bg-white/[0.08] transition-colors duration-300" />

                    {/* Glowing highlight point */}
                    <div className="absolute -top-12 -right-12 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:w-32 group-hover:h-32 transition-all duration-500" />

                    {/* Category Label and Icon */}
                    <div className="p-2.5 rounded-xl bg-black/25 backdrop-blur-md border border-white/10 text-white">
                      <Film className="w-4 h-4 md:w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    </div>

                    <div className="flex items-center justify-between w-full mt-auto">
                      <span className="font-outfit font-extrabold text-base md:text-xl text-white tracking-wide">
                        {genre.name}
                      </span>
                      <ArrowRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300" />
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        ) : (

          /* State B: Filtered Genre Movie List */
          <motion.div
            key="genre-movies"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-8 md:gap-12"
          >
            {/* Breadcrumb Navigation Bar */}
            <div className="flex flex-wrap items-center gap-2 mt-4 text-sm font-mono font-semibold">
              <button
                onClick={() => setSelectedGenre(null)}
                className="text-text-secondary hover:text-accent-gold transition-colors"
              >
                All Categories
              </button>
              <span className="text-text-secondary/50">&rarr;</span>
              <span className="text-accent-gold">{selectedGenre.name}</span>
            </div>

            {/* Title Summary */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedGenre(null)}
                    className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-text-primary transition-all"
                    aria-label="Back to genres list"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  <h2 className="text-3xl md:text-5xl font-outfit font-extrabold tracking-tight text-text-primary">
                    {selectedGenre.name} Movies
                  </h2>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed max-w-xl md:ml-12">
                  Curated selection of our best and highest-rated {selectedGenre.name.toLowerCase()} binging candidates.
                </p>
              </div>

              {/* Total count badge */}
              {!loading && movies.length > 0 && (
                <div className="px-4 py-2 rounded-xl bg-surface-elevated/80 border border-white/5 text-text-secondary font-mono text-xs flex items-center gap-1.5 self-start md:self-auto">
                  <Grid className="w-4 h-4 text-accent-gold" />
                  <span>Showing <strong className="text-text-primary">{movies.length}</strong> matching hits</span>
                </div>
              )}
            </div>

            {/* Movie list state switch */}
            <AnimatePresence mode="wait">
              {loading ? (
                /* Loading State Skeletons */
                <motion.div
                  key="genre-loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                >
                  {Array.from({ length: 10 }).map((_, idx) => (
                    <div key={idx} className="flex flex-col gap-3">
                      <div className="aspect-[2/3] w-full rounded-2xl skeleton-shimmer" />
                      <div className="h-4 w-3/4 rounded bg-white/5 skeleton-shimmer" />
                      <div className="h-3 w-1/2 rounded bg-white/5 skeleton-shimmer" />
                    </div>
                  ))}
                </motion.div>
              ) : movies.length === 0 ? (
                /* Empty results State */
                <motion.div
                  key="genre-empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-accent-gold/10 flex items-center justify-center mb-6 border border-accent-gold/20">
                    <Popcorn className="w-10 h-10 text-accent-gold animate-bounce" />
                  </div>
                  <h3 className="text-xl font-outfit font-bold text-text-primary mb-1">
                    No kernels popped! 🍿
                  </h3>
                  <p className="text-sm text-text-secondary max-w-sm leading-relaxed mb-6">
                    We couldn&apos;t find matching movies for this genre in our curated selections. Try another flavor!
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedGenre(null)}
                    className="px-6 py-2.5 bg-accent-gold text-background rounded-full font-bold"
                  >
                    View All Categories
                  </motion.button>
                </motion.div>
              ) : (
                /* Results Grid */
                <motion.div
                  key="genre-results"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.03,
                      },
                    },
                  }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                >
                  {movies.map((movie) => (
                    <motion.div
                      key={movie.id}
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
                      }}
                    >
                      <MovieCard movie={movie} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
