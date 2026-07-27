"use client";

import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSound } from "@/hooks/useSound";

const CATEGORIES = [
  { href: "/", label: "🏠 Home" },
  { href: "/movies", label: "🎬 Movies" },
  { href: "/tv-shows", label: "📺 TV Shows" },
  { href: "/trending", label: "🔥 Trending" },
  { href: "/sports", label: "🏏 Sports" },
  { href: "/drama", label: "🎭 Drama" },
  { href: "/cartoons-anime", label: "🎨 Cartoons" },
  { href: "/music", label: "🎵 Music" },
  { href: "/reels-shorts", label: "🎥 Reels" },
  { href: "/social-media", label: "📱 Social" },
  { href: "/documentaries", label: "📚 Docs" },
  { href: "/news", label: "📰 News" },
  { href: "/gaming", label: "🎮 Gaming" },
  { href: "/live-tv", label: "📡 Live TV" },
  { href: "/podcasts", label: "🎤 Podcasts" },
  { href: "/radio", label: "📻 Radio" },
  { href: "/entertainment", label: "🎭 Gala" },
  { href: "/favorites", label: "❤️ My Hole" },
  { href: "/watch-history", label: "🕒 History" },
];

export function CategoryHeader() {
  const pathname = usePathname();
  const { playPop } = useSound();
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll active category into view
  useEffect(() => {
    if (!containerRef.current) return;
    const activeElement = containerRef.current.querySelector(".active-category-pill");
    if (activeElement) {
      activeElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [pathname]);

  return (
    <div className="w-full bg-background/40 backdrop-blur-md border-b border-white/5 sticky top-[72px] md:top-[88px] z-30 py-3 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div
          ref={containerRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth w-full py-1"
          style={{ scrollbarWidth: "none" }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = pathname === cat.href;
            return (
              <Link
                key={cat.href}
                href={cat.href}
                onClick={() => playPop()}
                className={`relative px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wide transition-all border shrink-0 flex items-center justify-center ${
                  isActive
                    ? "active-category-pill bg-gradient-to-r from-accent-gold/20 to-accent-red/20 border-accent-gold text-accent-gold font-extrabold shadow-glow-sm"
                    : "bg-surface-elevated/40 border-white/5 hover:border-white/15 text-text-secondary hover:text-text-primary"
                }`}
              >
                <span>{cat.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryHeaderIndicator"
                    className="absolute -bottom-1 left-2 right-2 h-0.5 bg-accent-gold rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
