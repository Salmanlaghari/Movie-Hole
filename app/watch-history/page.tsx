"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import { Trash2, Clock, Star, Play, PlayCircle, EyeOff } from "lucide-react";
import { useWatchHistory, HistoryItem } from "@/hooks/useWatchHistory";
import { useSound } from "@/hooks/useSound";
import { getImagePath } from "@/lib/tmdb";
import { TrailerModal } from "@/components/movies/TrailerModal";

export default function WatchHistoryPage() {
  const { history, loaded, clearHistory, removeFromHistory } = useWatchHistory();
  const { playPop, playChime } = useSound();
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  // Spotlight glow coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const handlePlayMedia = (item: HistoryItem) => {
    playChime();
    setSelectedItem(item);
    setIsTrailerOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24 pt-4 flex flex-col gap-8 md:gap-12 min-h-screen">

      {/* 1. Header with clear CTA */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-xl">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent-gold flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-accent-red animate-pulse" />
            Binging Footprint
          </span>
          <h1 className="text-4xl md:text-6xl font-outfit font-extrabold tracking-tight text-text-primary">
            Watch History
          </h1>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed">
            Review the latest trailers, broadcasts, and feeds you have explored inside the movie hole. We keep it strictly in your client storage.
          </p>
        </div>

        {loaded && history.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playPop();
              clearHistory();
            }}
            className="flex items-center gap-2 bg-accent-red/10 hover:bg-accent-red text-accent-red hover:text-white px-5 py-2.5 rounded-full border border-accent-red/20 text-xs font-mono font-bold transition-all self-start sm:self-auto shadow-lg shadow-accent-red/5"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear History</span>
          </motion.button>
        )}
      </div>

      {/* 2. Results display */}
      <AnimatePresence mode="wait">
        {!loaded ? (
          /* Loading indicator */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                <div className="aspect-[2/3] w-full rounded-2xl skeleton-shimmer" />
                <div className="h-4 w-3/4 rounded bg-white/5 skeleton-shimmer" />
              </div>
            ))}
          </div>
        ) : history.length === 0 ? (
          /* Empty state */
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <PlayCircle className="w-8 h-8 text-text-secondary" />
            </div>
            <h3 className="text-lg font-outfit font-bold text-text-primary mb-1">
              Your footprint is empty 🍿
            </h3>
            <p className="text-xs md:text-sm text-text-secondary max-w-sm leading-relaxed mb-6">
              You haven&apos;t baged any stream reels yet. Go ahead and start exploring the platforms!
            </p>
          </motion.div>
        ) : (
          /* Grid list of watched items */
          <motion.div
            key="results"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.03 } }
            }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
          >
            {history.map((item) => {
              const watchedTime = new Date(item.watchedAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <motion.div
                  key={item.id + item.watchedAt}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.04, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseMove={handleMouseMove}
                  className="relative group bg-surface-elevated rounded-2xl overflow-hidden border border-white/5 hover:border-accent-gold/20 shadow-xl cursor-pointer"
                  onClick={() => handlePlayMedia(item)}
                >
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

                    {/* Poster */}
                    <img
                      src={getImagePath(item.poster_path, "poster")}
                      alt={item.title || item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90 z-10" />

                    {/* Quick remove from history */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        playPop();
                        removeFromHistory(item.id);
                      }}
                      className="absolute top-3 left-3 z-20 p-2 rounded-full bg-background/85 backdrop-blur-sm border border-white/10 text-text-secondary hover:text-accent-red hover:bg-background transition-all"
                      title="Remove from history"
                    >
                      <EyeOff className="w-3.5 h-3.5" />
                    </button>

                    {/* Time marker top-right */}
                    <div className="absolute top-3 right-3 z-20 px-2 py-1 rounded bg-background/85 backdrop-blur-sm border border-white/10 font-mono text-[9px] font-bold text-text-secondary">
                      {watchedTime}
                    </div>

                    {/* Information panel */}
                    <div className="absolute inset-x-0 bottom-0 p-4 z-20 flex flex-col justify-end">
                      <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-accent-gold/90 mb-1 flex items-center gap-1">
                        <Play className="w-2.5 h-2.5 fill-current" />
                        Replayed stream
                      </span>
                      <h3 className="font-outfit font-extrabold text-sm text-text-primary leading-tight truncate group-hover:text-accent-gold transition-colors">
                        {item.title || item.name}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal trigger */}
      {selectedItem && (
        <TrailerModal
          isOpen={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
          videoKey={selectedItem.videos?.results?.[0]?.key || "jfKfPfyJRdk"}
          movieTitle={selectedItem.title || selectedItem.name || "Replayed Feed"}
        />
      )}

    </div>
  );
}
