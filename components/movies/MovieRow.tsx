"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Movie } from "@/types/movie";
import { MovieCard } from "./MovieCard";

interface MovieRowProps {
  title: string;
  movies: Movie[];
  viewAllHref?: string;
}

export function MovieRow({ title, movies, viewAllHref }: MovieRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Check scroll position to dynamically show/hide arrows
  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftArrow(scrollLeft > 10);
      // Allow slight threshold padding for rounding differences
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      // Trigger initial check
      checkScroll();
    }
    return () => {
      container?.removeEventListener("scroll", checkScroll);
    };
  }, [movies]);

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const { clientWidth } = container;
      const scrollAmount = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (movies.length === 0) return null;

  return (
    <div className="relative group/row flex flex-col gap-4 py-6">

      {/* Row Header */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex items-end justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent-gold animate-pulse" />
          <h3 className="font-outfit font-extrabold text-xl md:text-3xl tracking-tight text-text-primary">
            {title}
          </h3>
        </div>

        {viewAllHref && (
          <Link href={viewAllHref}>
            <motion.span
              whileHover={{ x: 4 }}
              className="font-mono text-xs md:text-sm font-bold text-accent-gold hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              View All &rarr;
            </motion.span>
          </Link>
        )}
      </div>

      {/* Row Scroll Container */}
      <div className="relative w-full">
        {/* Left Arrow Controller */}
        {showLeftArrow && (
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-background/80 hover:bg-accent-gold hover:text-background border border-white/10 shadow-glow hidden md:flex items-center justify-center transition-all duration-300 transform scale-90 hover:scale-105"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Right Arrow Controller */}
        {showRightArrow && (
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-background/80 hover:bg-accent-gold hover:text-background border border-white/10 shadow-glow hidden md:flex items-center justify-center transition-all duration-300 transform scale-90 hover:scale-105"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Horizontal Slider Area */}
        <div
          ref={scrollContainerRef}
          className="w-full flex gap-5 overflow-x-auto overflow-y-hidden px-4 md:px-8 pb-4 scroll-smooth snap-x snap-mandatory no-scrollbar"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="snap-start">
              <MovieCard movie={movie} />
            </div>
          ))}

          {/* End spacer for elegant peeking */}
          <div className="w-4 md:w-8 flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}
