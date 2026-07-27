"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import { Play, Star, Heart, Search, Filter, Grid, Clock, Radio, Tv, Popcorn } from "lucide-react";
import { CategoryItem } from "@/lib/categoriesData";
import { getImagePath } from "@/lib/tmdb";
import { useFavorites } from "@/hooks/useFavorites";
import { useSound } from "@/hooks/useSound";
import { TrailerModal } from "@/components/movies/TrailerModal";

interface CategoryPageClientProps {
  title: string;
  description: string;
  items: CategoryItem[];
  subtypes?: { value: string; label: string }[];
  subtypeKey?: keyof CategoryItem;
  themeColor?: string; // e.g. "gold", "red", "emerald", "cyan", "fuchsia"
}

export function CategoryPageClient({
  title,
  description,
  items,
  subtypes,
  subtypeKey,
  themeColor = "gold"
}: CategoryPageClientProps) {
  const { isFavorite, toggleFavorite, loaded } = useFavorites();
  const { playPop, playChime } = useSound();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubtype, setActiveSubtype] = useState("all");
  const [selectedItem, setSelectedItem] = useState<CategoryItem | null>(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  // Spotlight glow coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Filter items based on activeSubtype and search query
  const filteredItems = items.filter((item) => {
    // 1. Subtype filtering
    if (subtypes && subtypeKey && activeSubtype !== "all") {
      if (item[subtypeKey] !== activeSubtype) return false;
    }

    // 2. Search query filtering
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchTitle = (item.title || item.name || "").toLowerCase().includes(query);
      const matchOverview = (item.overview || "").toLowerCase().includes(query);
      return matchTitle || matchOverview;
    }

    return true;
  });

  // Highlight item (the first item matching criteria or first overall)
  const featuredItem = filteredItems[0] || items[0];

  // Theme gradient lookup
  const glowBorderClass =
    themeColor === "red"
      ? "hover:border-accent-red/20"
      : themeColor === "emerald"
      ? "hover:border-emerald-500/20"
      : themeColor === "cyan"
      ? "hover:border-cyan-500/20"
      : themeColor === "fuchsia"
      ? "hover:border-fuchsia-500/20"
      : "hover:border-accent-gold/20";

  const radialGlowClass =
    themeColor === "red"
      ? "rgba(225, 29, 72, 0.15)"
      : themeColor === "emerald"
      ? "rgba(34, 197, 94, 0.15)"
      : themeColor === "cyan"
      ? "rgba(6, 182, 212, 0.15)"
      : themeColor === "fuchsia"
      ? "rgba(217, 70, 239, 0.15)"
      : "rgba(228, 179, 67, 0.15)";

  const themeTextClass =
    themeColor === "red"
      ? "text-accent-red"
      : themeColor === "emerald"
      ? "text-emerald-400"
      : themeColor === "cyan"
      ? "text-cyan-400"
      : themeColor === "fuchsia"
      ? "text-fuchsia-400"
      : "text-accent-gold";

  const themeGradientClass =
    themeColor === "red"
      ? "from-accent-red via-rose-500 to-accent-red"
      : themeColor === "emerald"
      ? "from-emerald-500 via-teal-400 to-emerald-500"
      : themeColor === "cyan"
      ? "from-cyan-500 via-blue-400 to-cyan-500"
      : themeColor === "fuchsia"
      ? "from-fuchsia-500 via-pink-400 to-fuchsia-500"
      : "from-accent-gold via-amber-400 to-accent-gold";

  // Record item in local history when trailer starts
  const handlePlayMedia = (item: CategoryItem) => {
    playChime();
    setSelectedItem(item);
    setIsTrailerOpen(true);

    try {
      // Append item to watch history stored in LocalStorage
      const historyStr = localStorage.getItem("movie-hole-watch-history");
      let history: any[] = [];
      if (historyStr) {
        history = JSON.parse(historyStr);
      }
      // Remove previous duplicate of this item
      history = history.filter((h) => h.id !== item.id);
      // Insert item to beginning
      history.unshift({
        ...item,
        watchedAt: new Date().toISOString(),
      });
      // Limit to latest 30 items
      localStorage.setItem("movie-hole-watch-history", JSON.stringify(history.slice(0, 30)));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24 pt-4 flex flex-col gap-8 md:gap-12 min-h-screen">

      {/* 1. Header Metadata Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2.5 max-w-2xl">
          <span className={`text-xs font-mono font-bold uppercase tracking-widest ${themeTextClass} flex items-center gap-1.5`}>
            <Popcorn className="w-4 h-4 animate-bounce" />
            Popcorn Stream Discovery
          </span>
          <h1 className="text-4xl md:text-6xl font-outfit font-extrabold tracking-tight text-text-primary">
            {title}
          </h1>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed">
            {description}
          </p>
        </div>

        {/* Dynamic Category Mini-Search */}
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary group-focus-within:text-accent-gold transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${title.replace(/[^\w\s-]/g, "").trim()}...`}
            className="w-full bg-surface-elevated border border-white/5 focus:border-accent-gold/40 focus:outline-none pl-10 pr-4 py-2.5 rounded-full text-sm text-text-primary placeholder:text-text-secondary/50 focus:ring-1 focus:ring-accent-gold/20 transition-all"
          />
        </div>
      </div>

      {/* 2. Custom Tabs / Filter pills */}
      {subtypes && (
        <div className="flex flex-wrap items-center gap-2 border-b border-white/5 pb-4">
          <Filter className="w-4 h-4 text-text-secondary mr-2" />
          {subtypes.map((sub) => {
            const isActive = activeSubtype === sub.value;
            return (
              <motion.button
                key={sub.value}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  playPop();
                  setActiveSubtype(sub.value);
                }}
                className={`px-4.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all border ${
                  isActive
                    ? "bg-gradient-to-r from-accent-gold to-accent-red text-background font-bold border-transparent shadow-glow"
                    : "bg-surface-elevated border-white/5 text-text-secondary hover:text-text-primary hover:border-white/10"
                }`}
              >
                {sub.label}
              </motion.button>
            );
          })}
        </div>
      )}

      {/* 3. Featured Hero Showcase in this Category */}
      {featuredItem && !searchQuery && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full aspect-[21/9] min-h-[300px] rounded-3xl overflow-hidden border border-white/5 shadow-2xl group"
        >
          {/* Background cover image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-102"
            style={{ backgroundImage: `url(${getImagePath(featuredItem.backdrop_path, "backdrop")})` }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent opacity-90" />

          {/* Hero Content inside banner */}
          <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end items-start max-w-2xl gap-3 md:gap-4 z-10">
            <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-white/10 backdrop-blur-md border border-white/10 text-white`}>
              {featuredItem.liveStatus === "live" ? "🔴 Live Broadcast" : "⭐ Featured Content"}
            </span>
            <h2 className="text-2xl md:text-4xl font-outfit font-extrabold tracking-tight text-white drop-shadow-md">
              {featuredItem.title || featuredItem.name}
            </h2>
            <p className="text-xs md:text-sm text-text-secondary line-clamp-2 drop-shadow-md leading-relaxed">
              {featuredItem.overview}
            </p>

            <div className="flex items-center gap-3 mt-1 md:mt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePlayMedia(featuredItem)}
                className={`flex items-center gap-1.5 bg-gradient-to-r ${themeGradientClass} text-background font-bold text-xs md:text-sm px-5 py-2.5 rounded-full shadow-lg transition-all`}
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Play Media Now</span>
              </motion.button>

              <button
                onClick={() => {
                  playPop();
                  toggleFavorite(featuredItem);
                }}
                className="p-2.5 rounded-full bg-white/10 hover:bg-accent-red/20 border border-white/10 text-white hover:text-accent-red transition-all"
                aria-label="Add to favorites"
              >
                <Heart className={`w-4 h-4 ${loaded && isFavorite(featuredItem.id) ? "fill-accent-red text-accent-red" : ""}`} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* 4. Display Grid */}
      <AnimatePresence mode="wait">
        {filteredItems.length === 0 ? (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center mb-4">
              <Tv className="w-8 h-8 text-accent-gold animate-pulse" />
            </div>
            <h3 className="text-lg font-outfit font-bold text-text-primary mb-1">
              Nothing popped up yet 🍿
            </h3>
            <p className="text-xs md:text-sm text-text-secondary max-w-sm leading-relaxed">
              Try adjusting your search criteria or choosing a different flavor pill to discover matching binging records.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="grid-results"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.03 }
              }
            }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
          >
            {filteredItems.map((item) => {
              const isFav = isFavorite(item.id);
              return (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
                  }}
                  whileHover={{ scale: 1.04, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseMove={handleMouseMove}
                  className={`relative group bg-surface-elevated rounded-2xl overflow-hidden border border-white/5 hover:border-accent-gold/20 shadow-xl transition-all cursor-pointer select-none`}
                  onClick={() => handlePlayMedia(item)}
                >
                  <div className="relative aspect-[2/3] w-full overflow-hidden bg-white/5">
                    {/* Radial mouse light reflection */}
                    <motion.div
                      className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                      style={{
                        background: useMotionTemplate`
                          radial-gradient(
                            120px circle at ${mouseX}px ${mouseY}px,
                            ${radialGlowClass},
                            transparent 80%
                          )
                        `,
                      }}
                    />

                    {/* Poster Image */}
                    <img
                      src={getImagePath(item.poster_path, "poster")}
                      alt={item.title || item.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      loading="lazy"
                    />

                    {/* Dark bottom vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90 z-10" />

                    {/* Live indicator or score pill */}
                    <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2 py-0.5 rounded-md bg-background/80 backdrop-blur-md border border-white/10 font-mono text-[10px] font-bold text-text-primary">
                      {item.liveStatus === "live" ? (
                        <span className="flex items-center gap-1 text-accent-red">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-red animate-ping" />
                          LIVE
                        </span>
                      ) : (
                        <span className="flex items-center gap-0.5 text-accent-gold">
                          <Star className="w-3 h-3 fill-accent-gold text-accent-gold" />
                          {item.vote_average.toFixed(1)}
                        </span>
                      )}
                    </div>

                    {/* Favorite Heart toggle */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        playPop();
                        toggleFavorite(item);
                      }}
                      className="absolute top-3 left-3 z-20 p-2 rounded-full bg-background/80 backdrop-blur-md border border-white/10 text-text-secondary hover:text-accent-red hover:bg-background transition-all"
                    >
                      <Heart className={`w-3.5 h-3.5 ${loaded && isFav ? "fill-accent-red text-accent-red" : ""}`} />
                    </button>

                    {/* Detailed info on overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 z-20 flex flex-col justify-end">
                      <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-accent-gold/90 mb-1">
                        {item.release_date?.split("-")[0] || item.first_air_date?.split("-")[0] || "Live Feed"}
                      </span>
                      <h3 className="font-outfit font-extrabold text-sm text-text-primary leading-tight truncate group-hover:text-accent-gold transition-colors">
                        {item.title || item.name}
                      </h3>
                      {item.liveStatus === "live" && (
                        <p className="text-[10px] text-accent-red font-mono mt-1 animate-pulse">
                          ● Streams connected
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Embedded Iframe Modal */}
      {selectedItem && (
        <TrailerModal
          isOpen={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
          videoKey={selectedItem.videos?.results?.[0]?.key || "jfKfPfyJRdk"}
          movieTitle={selectedItem.title || selectedItem.name || "Live Stream"}
        />
      )}

    </div>
  );
}
