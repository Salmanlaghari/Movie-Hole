"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Film, Heart, Grid, Sparkles, Tv, HelpCircle, CornerDownLeft, Terminal } from "lucide-react";
import { useSound } from "@/hooks/useSound";
import { GENRES_LIST } from "@/lib/tmdb";

interface PaletteOption {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  action: () => void;
}

export function CommandPalette() {
  const router = useRouter();
  const { playPop } = useSound();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Monitor Cmd+K or Ctrl+K key triggers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setSearch("");
      setSelectedIndex(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Command Options database
  const getOptions = (): PaletteOption[] => {
    const defaultOptions: PaletteOption[] = [
      {
        title: "Go to Home Page",
        subtitle: "Return to the main movie Discovery Hole",
        icon: <Film className="w-4 h-4 text-accent-gold" />,
        action: () => router.push("/"),
      },
      {
        title: "Explore Curated Genres",
        subtitle: "View the grid of premium movie categories",
        icon: <Grid className="w-4 h-4 text-accent-gold" />,
        action: () => router.push("/genres"),
      },
      {
        title: "Open My Favorites Hole",
        subtitle: "Manage your private saved binging queue",
        icon: <Heart className="w-4 h-4 text-accent-red" />,
        action: () => router.push("/favorites"),
      },
      {
        title: "Popcorn TV Shows",
        subtitle: "Discover high-profile TV series",
        icon: <Tv className="w-4 h-4 text-emerald-400" />,
        action: () => router.push("/tv/1396"), // Default to Breaking Bad mock or category
      },
    ];

    // Append some quick-jump genres
    const genreJumps = GENRES_LIST.slice(0, 4).map((genre) => ({
      title: `Category: ${genre.name}`,
      subtitle: `Jump straight to curated ${genre.name.toLowerCase()} binging list`,
      icon: <Sparkles className="w-4 h-4 text-accent-gold/70" />,
      action: () => {
        router.push("/genres");
        // We can communicate or trigger category selections if we want
      },
    }));

    return [...defaultOptions, ...genreJumps];
  };

  const allOptions = getOptions();

  // Filter options based on query
  const filteredOptions = allOptions.filter(
    (opt) =>
      opt.title.toLowerCase().includes(search.toLowerCase()) ||
      opt.subtitle.toLowerCase().includes(search.toLowerCase())
  );

  // Keyboard navigation inside list
  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredOptions.length);
      playPop();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredOptions.length) % filteredOptions.length);
      playPop();
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = filteredOptions[selectedIndex];
      if (selected) {
        selected.action();
        setIsOpen(false);
        playPop();
      }
    }
  };

  return (
    <>
      {/* Universal floating hint block bottom-right */}
      <div className="fixed bottom-6 left-6 z-30 hidden md:flex items-center gap-2 bg-surface-elevated/80 backdrop-blur-md border border-white/10 px-3.5 py-2 rounded-xl text-xs text-text-secondary/80 font-mono shadow-md select-none pointer-events-none">
        <Terminal className="w-3.5 h-3.5 text-accent-gold" />
        <span>Press</span>
        <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-text-primary text-[10px] font-bold border border-white/5">⌘</kbd>
        <span>+</span>
        <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-text-primary text-[10px] font-bold border border-white/5">K</kbd>
        <span>for Spotlight</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/70 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              ref={containerRef}
              initial={{ scale: 0.95, y: -10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: -10, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-surface-elevated border border-white/10 rounded-2xl overflow-hidden shadow-glow"
            >
              {/* Top search box */}
              <div className="relative flex items-center border-b border-white/5 p-4">
                <Search className="w-5 h-5 text-text-secondary mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Where do you want to dig?..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleListKeyDown}
                  className="w-full bg-transparent text-text-primary placeholder:text-text-secondary/50 outline-none font-sans text-base"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] font-mono text-text-secondary"
                >
                  ESC
                </button>
              </div>

              {/* Options list */}
              <div className="max-h-80 overflow-y-auto p-2 flex flex-col gap-1">
                {filteredOptions.length === 0 ? (
                  <div className="p-8 text-center text-sm text-text-secondary font-mono flex flex-col items-center gap-2">
                    <HelpCircle className="w-6 h-6 text-accent-red animate-bounce" />
                    <span>Command not found in The Hole.</span>
                  </div>
                ) : (
                  filteredOptions.map((opt, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <div
                        key={opt.title}
                        onMouseEnter={() => {
                          setSelectedIndex(idx);
                        }}
                        onClick={() => {
                          opt.action();
                          setIsOpen(false);
                          playPop();
                        }}
                        className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? "bg-accent-gold/15 border border-accent-gold/20"
                            : "bg-transparent border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isSelected ? "bg-accent-gold/20 text-accent-gold" : "bg-white/5 text-text-secondary"}`}>
                            {opt.icon}
                          </div>
                          <div className="flex flex-col">
                            <span className={`text-sm font-bold ${isSelected ? "text-accent-gold" : "text-text-primary"}`}>
                              {opt.title}
                            </span>
                            <span className="text-xs text-text-secondary/80">
                              {opt.subtitle}
                            </span>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="flex items-center gap-1 text-[10px] text-accent-gold font-mono">
                            <span>Select</span>
                            <CornerDownLeft className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Status bar */}
              <div className="p-3 bg-black/25 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-text-secondary">
                <span>Use &uarr;&darr; arrows to navigate</span>
                <span>Press Enter to select</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
