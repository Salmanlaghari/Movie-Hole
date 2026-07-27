"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Star, Calendar, Popcorn, Sparkles, Flame } from "lucide-react";
import { useSearchModal } from "@/hooks/useSearchModal";
import { useDebounce } from "@/hooks/useDebounce";
import { tmdb, getImagePath } from "@/lib/tmdb";
import { Movie } from "@/types/movie";

export function SearchModal() {
  const router = useRouter();
  const { isOpen, closeSearch } = useSearchModal();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(query, 300);

  // Load recent searches from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("movie-hole-recent-searches");
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Auto-focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setResults([]);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle actual TMDB / Fallback Search
  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const response = await tmdb.searchMovies(debouncedQuery);
        setResults(response.results);
      } catch (error) {
        console.error("Search error", error);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeSearch]);

  const handleAddRecentSearch = (searchVal: string) => {
    if (!searchVal.trim()) return;
    const cleanVal = searchVal.trim();
    const updated = [cleanVal, ...recentSearches.filter((s) => s !== cleanVal)].slice(0, 5);
    setRecentSearches(updated);
    try {
      localStorage.setItem("movie-hole-recent-searches", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectRecent = (val: string) => {
    setQuery(val);
    inputRef.current?.focus();
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem("movie-hole-recent-searches");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl flex flex-col pt-24 px-4 md:px-8 pb-12 overflow-y-auto"
        >
          {/* Top Close Bar */}
          <div className="absolute top-6 right-6 md:right-12">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={closeSearch}
              className="p-3 rounded-full bg-white/5 hover:bg-accent-red/20 text-text-secondary hover:text-accent-red transition-all"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>

          <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
            {/* Big Search Bar Input */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full mb-8 group"
            >
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-7 h-7 text-text-secondary group-focus-within:text-accent-gold transition-colors" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Dig into the movie hole..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddRecentSearch(query);
                  }
                }}
                className="w-full bg-surface-elevated border-2 border-white/5 group-focus-within:border-accent-gold/40 text-text-primary pl-16 pr-6 py-5 rounded-2xl md:rounded-3xl text-lg md:text-2xl font-outfit font-semibold tracking-wide outline-none placeholder:text-text-secondary/50 transition-all shadow-glow"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/10 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </motion.div>

            {/* Content Switch: Recent Searches or Results */}
            <div className="flex-1 flex flex-col justify-start">
              <AnimatePresence mode="wait">
                {/* 1. Empty/Initial State: Show recent searches */}
                {!query && (
                  <motion.div
                    key="initial-state"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-8"
                  >
                    {recentSearches.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-accent-gold animate-pulse" />
                            Recent Discoveries
                          </h3>
                          <button
                            onClick={clearRecent}
                            className="text-xs font-mono text-accent-red/80 hover:text-accent-red hover:underline"
                          >
                            Clear history
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                          {recentSearches.map((searchVal) => (
                            <motion.button
                              key={searchVal}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleSelectRecent(searchVal)}
                              className="px-4 py-2 rounded-full bg-white/5 border border-white/5 hover:border-accent-gold/30 hover:bg-accent-gold/10 text-sm font-medium text-text-primary transition-all"
                            >
                              {searchVal}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Fun movie binging suggestions */}
                    <div className="flex flex-col gap-4 p-6 rounded-2xl bg-surface-elevated/40 border border-white/5 mt-4">
                      <h4 className="font-outfit font-bold text-accent-gold text-base flex items-center gap-2">
                        <Flame className="w-5 h-5 text-accent-red" />
                        Trending worms to dig...
                      </h4>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        Need inspiration? Search for sci-fi blockbusters like <span className="text-text-primary font-semibold italic">&ldquo;Interstellar&rdquo;</span>, mind-bending sequels like <span className="text-text-primary font-semibold italic">&ldquo;Dune&rdquo;</span>, or family-favorites like <span className="text-text-primary font-semibold italic">&ldquo;Puss in Boots&rdquo;</span>!
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* 2. Loading State */}
                {query && loading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center py-20"
                  >
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full border-4 border-accent-gold/20 border-t-accent-gold animate-spin" />
                      <Popcorn className="absolute inset-0 m-auto w-6 h-6 text-accent-red animate-pulse" />
                    </div>
                    <p className="text-sm font-mono text-text-secondary mt-6 tracking-widest animate-pulse">
                      Sifting through the cinematic sands...
                    </p>
                  </motion.div>
                )}

                {/* 3. Empty Results State */}
                {query && !loading && results.length === 0 && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-24 h-24 rounded-full bg-accent-red/10 flex items-center justify-center mb-6 border border-accent-red/20 animate-bounce">
                      <Popcorn className="w-12 h-12 text-accent-red" />
                    </div>
                    <h3 className="text-xl font-outfit font-bold text-text-primary mb-2">
                      Nothing popped up yet 🍿
                    </h3>
                    <p className="text-sm text-text-secondary max-w-sm leading-relaxed mb-6">
                      We searched every corner of the popcorn bucket, but couldn&apos;t find matches for &ldquo;{query}&rdquo;. Try checking under the seat cushions!
                    </p>
                  </motion.div>
                )}

                {/* 4. Results State */}
                {query && !loading && results.length > 0 && (
                  <motion.div
                    key="results"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                        },
                      },
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {results.slice(0, 8).map((movie) => (
                      <motion.div
                        key={movie.id}
                        variants={{
                          hidden: { opacity: 0, y: 15 },
                          visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
                        }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="p-3 rounded-2xl bg-surface-elevated/60 border border-white/5 hover:border-accent-gold/30 hover:bg-surface-elevated flex gap-4 transition-all"
                        onClick={() => {
                          handleAddRecentSearch(query);
                          closeSearch();
                        }}
                      >
                        <Link href={`/movie/${movie.id}`} className="flex gap-4 w-full">
                          {/* Small Poster */}
                          <div className="w-16 md:w-20 h-24 md:h-28 relative rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                            <img
                              src={getImagePath(movie.poster_path, "poster")}
                              alt={movie.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>

                          {/* Detail summary */}
                          <div className="flex-1 flex flex-col justify-center min-w-0">
                            <h4 className="font-outfit font-bold text-base md:text-lg text-text-primary leading-snug truncate group-hover:text-accent-gold transition-colors">
                              {movie.title}
                            </h4>
                            <p className="text-xs text-text-secondary line-clamp-2 mt-1 leading-relaxed">
                              {movie.overview}
                            </p>
                            <div className="flex items-center gap-4 mt-2.5">
                              {movie.vote_average > 0 && (
                                <div className="flex items-center gap-1">
                                  <Star className="w-3.5 h-3.5 fill-accent-gold text-accent-gold" />
                                  <span className="text-xs font-mono font-bold text-text-primary">
                                    {movie.vote_average.toFixed(1)}
                                  </span>
                                </div>
                              )}
                              {movie.release_date && (
                                <div className="flex items-center gap-1 text-text-secondary text-xs">
                                  <Calendar className="w-3.5 h-3.5" />
                                  <span>{movie.release_date.split("-")[0]}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
