"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Film,
  Heart,
  Grid,
  Sparkles,
  Tv,
  HelpCircle,
  CornerDownLeft,
  Terminal,
  Moon,
  Sun,
  Volume2,
  Trophy,
  Activity,
} from "lucide-react";
import { useSound } from "@/hooks/useSound";
import { useSettingsDrawer } from "@/hooks/useSettingsDrawer";
import { GENRES_LIST } from "@/lib/tmdb";
import { toast } from "sonner";

interface PaletteOption {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  action: () => void;
}

export function CommandPalette() {
  const router = useRouter();
  const { playPop } = useSound();
  const { openDrawer } = useSettingsDrawer();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentCommands, setRecentCommands] = useState<string[]>([]);
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

  // Focus input and load recents on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setSearch("");
      setSelectedIndex(0);
      document.body.style.overflow = "hidden";

      // Load recent commands from localStorage
      try {
        const stored = localStorage.getItem("movie-hole-recent-commands");
        if (stored) {
          setRecentCommands(JSON.parse(stored));
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle saving to recent commands memory
  const recordCommandTrigger = (commandTitle: string) => {
    try {
      const updated = [commandTitle, ...recentCommands.filter((c) => c !== commandTitle)].slice(0, 4);
      setRecentCommands(updated);
      localStorage.setItem("movie-hole-recent-commands", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Toggle Theme action
  const handleToggleThemeAction = () => {
    try {
      const currentTheme = localStorage.getItem("movie-hole-theme") || "dark";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      localStorage.setItem("movie-hole-theme", nextTheme);
      if (nextTheme === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
      window.dispatchEvent(new Event("movie-hole-theme-change"));
      toast.success(`Theme toggled to ${nextTheme === "dark" ? "Dark Cinema" : "Light Projector"} mode! 🎥`);
    } catch (e) {
      console.error(e);
    }
  };

  // View Achievements action
  const handleViewAchievementsAction = () => {
    try {
      const stored = localStorage.getItem("movie-hole-achievements");
      if (stored) {
        const list = JSON.parse(stored);
        const unlocked = list.filter((a: any) => a.unlockedAt !== null);
        const count = unlocked.length;
        const total = list.length;

        toast.info(`Trophy Collection: ${count}/${total} Unlocked 🏆`, {
          description: count > 0
            ? `Latest: "${unlocked[unlocked.length - 1].title}"`
            : "No achievements unlocked yet. Keep exploring!",
          duration: 4000,
          className: "bg-surface-elevated border border-accent-gold text-text-primary rounded-2xl p-4",
        });
      } else {
        toast.info("Achievements: 0/5 Unlocked 🏆", {
          description: "Start digging into the movie hole!",
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Command Options database
  const getOptions = (): PaletteOption[] => {
    const defaultOptions: PaletteOption[] = [
      {
        id: "home",
        title: "Go to Home Page",
        subtitle: "Return to the main movie Discovery Hole",
        icon: <Film className="w-4 h-4 text-accent-gold" />,
        action: () => router.push("/"),
      },
      {
        id: "genres",
        title: "Explore Curated Genres",
        subtitle: "View the grid of premium movie categories",
        icon: <Grid className="w-4 h-4 text-accent-gold" />,
        action: () => router.push("/genres"),
      },
      {
        id: "favorites",
        title: "Open My Favorites Hole",
        subtitle: "Manage your private saved binging queue",
        icon: <Heart className="w-4 h-4 text-accent-red" />,
        action: () => router.push("/favorites"),
      },
      {
        id: "trending",
        title: "Goto Trending Section",
        subtitle: "Jump straight to the latest hot cinema rows",
        icon: <Activity className="w-4 h-4 text-emerald-400" />,
        action: () => {
          router.push("/");
          setTimeout(() => {
            const el = document.getElementById("trending-row") || document.querySelector("[id*='trending']");
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }, 350);
        },
      },
      {
        id: "top-rated",
        title: "Goto Top Rated Section",
        subtitle: "Jump straight to the critically acclaimed movie row",
        icon: <Sparkles className="w-4 h-4 text-amber-400" />,
        action: () => {
          router.push("/");
          setTimeout(() => {
            const el = document.getElementById("top-rated-row") || document.querySelector("[id*='top']");
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }, 350);
        },
      },
      {
        id: "toggle-theme",
        title: "Toggle Visual Theme",
        subtitle: "Switch between Dark Cinema and Light Projector modes",
        icon: <Moon className="w-4 h-4 text-purple-400" />,
        action: handleToggleThemeAction,
      },
      {
        id: "sound-settings",
        title: "Open Sound Settings",
        subtitle: "Configure action sound effects & background soundscapes",
        icon: <Volume2 className="w-4 h-4 text-accent-gold" />,
        action: openDrawer,
      },
      {
        id: "view-achievements",
        title: "View Achievements",
        subtitle: "Check your unlocked cinematic trophies & progression",
        icon: <Trophy className="w-4 h-4 text-yellow-500 animate-pulse" />,
        action: handleViewAchievementsAction,
      },
    ];

    // Append some quick-jump genres
    const genreJumps = GENRES_LIST.slice(0, 4).map((genre) => ({
      id: `genre-${genre.id}`,
      title: `Category: ${genre.name}`,
      subtitle: `Jump straight to curated ${genre.name.toLowerCase()} binging list`,
      icon: <Sparkles className="w-4 h-4 text-accent-gold/70" />,
      action: () => {
        router.push("/genres");
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
        recordCommandTrigger(selected.title);
        selected.action();
        setIsOpen(false);
        playPop();
      }
    }
  };

  // Render and highlight matched text for high-fidelity look
  const highlightMatchedText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const regex = new RegExp(`(${escapeRegExp(highlight)})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="text-accent-gold underline decoration-accent-gold/40 font-extrabold bg-accent-gold/10 px-0.5 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
              className="w-full max-w-lg bg-surface-elevated border border-white/10 rounded-2xl overflow-hidden shadow-glow focus:outline-none focus:ring-2 focus:ring-accent-gold"
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-label="Command Spotlight Palette"
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
                  aria-label="Search settings and actions"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] font-mono text-text-secondary"
                  aria-label="Close settings palette"
                >
                  ESC
                </button>
              </div>

              {/* Recent commands memory block (when input search is empty) */}
              {search === "" && recentCommands.length > 0 && (
                <div className="px-4 pt-3 pb-1 border-b border-white/5 bg-black/10">
                  <span className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-widest flex items-center gap-1">
                    <Terminal className="w-3 h-3 text-accent-gold" />
                    Recently Digged Commands
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-2 mb-1">
                    {recentCommands.map((cmd) => (
                      <button
                        key={cmd}
                        onClick={() => {
                          setSearch(cmd);
                          inputRef.current?.focus();
                          playPop();
                        }}
                        className="px-2.5 py-1 text-[11px] font-medium bg-white/5 hover:bg-white/10 hover:text-accent-gold rounded-full border border-white/5 transition-all text-text-secondary"
                      >
                        {cmd}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Options list */}
              <div className="max-h-80 overflow-y-auto p-2 flex flex-col gap-1 custom-scrollbar">
                {filteredOptions.length === 0 ? (
                  <div className="p-8 text-center text-sm text-text-secondary font-mono flex flex-col items-center gap-2">
                    <HelpCircle className="w-6 h-6 text-accent-red animate-bounce" />
                    <span>Command not found in The Hole.</span>
                  </div>
                ) : (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.04,
                        },
                      },
                    }}
                    className="flex flex-col gap-1"
                  >
                    {filteredOptions.map((opt, idx) => {
                      const isSelected = idx === selectedIndex;
                      return (
                        <motion.div
                          key={opt.id}
                          variants={{
                            hidden: { opacity: 0, y: 5 },
                            visible: { opacity: 1, y: 0 },
                          }}
                          onMouseEnter={() => {
                            setSelectedIndex(idx);
                          }}
                          onClick={() => {
                            recordCommandTrigger(opt.title);
                            opt.action();
                            setIsOpen(false);
                            playPop();
                          }}
                          className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all border ${
                            isSelected
                              ? "bg-accent-gold/15 border-accent-gold/20"
                              : "bg-transparent border-transparent"
                          }`}
                          role="option"
                          aria-selected={isSelected}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`p-2 rounded-lg flex-shrink-0 ${isSelected ? "bg-accent-gold/20 text-accent-gold" : "bg-white/5 text-text-secondary"}`}>
                              {opt.icon}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className={`text-sm font-bold truncate ${isSelected ? "text-accent-gold" : "text-text-primary"}`}>
                                {highlightMatchedText(opt.title, search)}
                              </span>
                              <span className="text-xs text-text-secondary/80 truncate">
                                {highlightMatchedText(opt.subtitle, search)}
                              </span>
                            </div>
                          </div>

                          {isSelected && (
                            <div className="flex items-center gap-1 text-[10px] text-accent-gold font-mono flex-shrink-0">
                              <span>Select</span>
                              <CornerDownLeft className="w-3 h-3" />
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </div>

              {/* Status bar */}
              <div className="p-3 bg-black/25 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-text-secondary">
                <span>Use &uarr;&darr; keys to navigate</span>
                <span>Press Enter to select</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
