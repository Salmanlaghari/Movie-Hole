"use client";

import { useState, useEffect } from "react";
import { Movie } from "@/types/movie";
import { toast } from "sonner";

export interface HistoryItem extends Movie {
  watchedAt: string;
}

export const useWatchHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load watch history from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("movie-hole-watch-history");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load watch history", e);
    }
    setLoaded(true);
  }, []);

  const saveHistory = (newHistory: HistoryItem[]) => {
    setHistory(newHistory);
    try {
      localStorage.setItem("movie-hole-watch-history", JSON.stringify(newHistory));
    } catch (e) {
      console.error("Failed to save watch history", e);
    }
  };

  const addToHistory = (movie: Movie) => {
    // Prevent duplicate entries
    const cleaned = history.filter((item) => item.id !== movie.id);
    const newItem: HistoryItem = {
      ...movie,
      watchedAt: new Date().toISOString(),
    };
    const updated = [newItem, ...cleaned].slice(0, 50); // limit to latest 50 entries
    saveHistory(updated);
  };

  const clearHistory = () => {
    saveHistory([]);
    toast.success("Watch history cleared 🍿", {
      description: "Your binging footprint has been successfully wiped.",
      duration: 3000,
      className: "bg-surface-elevated border border-border-subtle text-text-primary rounded-xl font-sans",
    });
  };

  const removeFromHistory = (id: number) => {
    const updated = history.filter((item) => item.id !== id);
    saveHistory(updated);
  };

  return {
    history,
    loaded,
    addToHistory,
    clearHistory,
    removeFromHistory,
    historyCount: history.length,
  };
};
