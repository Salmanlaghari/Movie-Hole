"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, Menu, X, Popcorn, Sun, Moon, Volume2, VolumeX } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useFavorites } from "@/hooks/useFavorites";
import { useSearchModal } from "@/hooks/useSearchModal";
import { useSound } from "@/hooks/useSound";
import { useAchievements } from "@/hooks/useAchievements";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/genres", label: "Genres" },
  { href: "/favorites", label: "My Hole 🍿" },
];

export function Navbar() {
  const pathname = usePathname();
  const { favoritesCount, loaded } = useFavorites();
  const { openSearch } = useSearchModal();
  const { soundEnabled, toggleSound, playPop } = useSound();
  const { unlockAchievement } = useAchievements();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Load and apply theme and scroll triggers
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("movie-hole-theme");
      if (storedTheme === "light") {
        setTheme("light");
        document.documentElement.classList.add("light");
      } else {
        setTheme("dark");
        document.documentElement.classList.remove("light");
      }
    } catch (e) {
      console.error(e);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleTheme = () => {
    playPop();
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    try {
      localStorage.setItem("movie-hole-theme", nextTheme);
      if (nextTheme === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleSound = () => {
    toggleSound();
    // Award Sound Master achievement on toggle
    setTimeout(() => {
      unlockAchievement("sound-master");
    }, 200);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-background/75 backdrop-blur-md border-b border-white/5 py-4 shadow-xl"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Logo showTagline={false} size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => playPop()}
                  className={`relative font-sans text-sm font-semibold tracking-wide transition-colors py-2 px-1 ${
                    isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-gold to-accent-red rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right section actions */}
          <div className="flex items-center gap-3">

            {/* Theme Switcher Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleTheme}
              className="p-2.5 rounded-full bg-white/5 hover:bg-accent-gold/10 text-text-secondary hover:text-accent-gold transition-colors focus:outline-none"
              aria-label="Toggle Theme Mode"
              title="Toggle Theme Mode"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            {/* Sound Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleSound}
              className="p-2.5 rounded-full bg-white/5 hover:bg-accent-red/10 text-text-secondary hover:text-accent-red transition-colors focus:outline-none"
              aria-label="Toggle Synthesizer Sound"
              title="Toggle Synthesizer Sound"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </motion.button>

            {/* Search Icon Trigger */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playPop();
                openSearch();
              }}
              className="p-2.5 rounded-full bg-white/5 hover:bg-accent-gold/10 text-text-secondary hover:text-accent-gold transition-colors focus:outline-none focus:ring-2 focus:ring-accent-gold"
              aria-label="Open Search Modal"
              title="Search (or Cmd/Ctrl+K)"
            >
              <Search className="w-5 h-5" />
            </motion.button>

            {/* My Hole / Favorites shortcut */}
            <Link href="/favorites" onClick={() => playPop()}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2.5 rounded-full bg-white/5 hover:bg-accent-red/10 text-text-secondary hover:text-accent-red transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent-red"
                aria-label="View Favorites"
              >
                <Heart className={`w-5 h-5 ${favoritesCount > 0 && loaded ? "fill-accent-red text-accent-red" : ""}`} />
                <AnimatePresence>
                  {loaded && favoritesCount > 0 && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 bg-accent-red text-text-primary font-mono text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-background"
                    >
                      {favoritesCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </Link>

            {/* Hamburger (Mobile Menu Toggle) */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playPop();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="md:hidden p-2.5 rounded-full bg-white/5 text-text-primary hover:bg-white/10"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Backdrop + Content */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-background/98 backdrop-blur-xl flex flex-col justify-center items-center md:hidden"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.1,
                  }
                },
                exit: {
                  opacity: 0,
                  transition: { staggerChildren: 0.05, staggerDirection: -1 }
                }
              }}
              className="flex flex-col items-center gap-8 w-full max-w-xs px-4"
            >
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      visible: { y: 0, opacity: 1 },
                      exit: { y: -20, opacity: 0 }
                    }}
                    className="w-full text-center"
                  >
                    <Link
                      href={link.href}
                      onClick={() => playPop()}
                      className={`block py-3 text-2xl font-outfit font-bold tracking-wider rounded-2xl border transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-accent-gold to-accent-red text-text-primary border-transparent shadow-glow"
                          : "border-white/5 hover:border-white/10 text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Cinematic Quote inside menu */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 0.5 },
                  exit: { opacity: 0 }
                }}
                className="mt-8 text-center"
              >
                <Popcorn className="w-6 h-6 text-accent-gold mx-auto mb-2 animate-bounce" />
                <p className="text-xs font-mono text-text-secondary tracking-widest uppercase">
                  Hop In. Binge Out. 🍿
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
