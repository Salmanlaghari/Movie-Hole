"use client";

import { useState, useEffect } from "react";
import { Movie } from "@/types/movie";
import { toast } from "sonner";

export interface FavoriteItem extends Movie {
  addedAt: number;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load favorites from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("movie-hole-favorites");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load favorites", e);
    }
    setLoaded(true);
  }, []);

  // Sync favorites with LocalStorage
  const saveFavorites = (newFavs: FavoriteItem[]) => {
    setFavorites(newFavs);
    try {
      localStorage.setItem("movie-hole-favorites", JSON.stringify(newFavs));
    } catch (e) {
      console.error("Failed to save favorites", e);
    }
  };

  const isFavorite = (id: number): boolean => {
    return favorites.some((item) => item.id === id);
  };

  const toggleFavorite = (movie: Movie) => {
    const favorited = isFavorite(movie.id);
    if (favorited) {
      const updated = favorites.filter((item) => item.id !== movie.id);
      saveFavorites(updated);
      toast.success(`Removed from your Hole 🍿`, {
        description: `"${movie.title}" is no longer binging in your hole.`,
        duration: 3000,
        className: "bg-surface-elevated border border-border-subtle text-text-primary rounded-xl font-sans",
      });
    } else {
      const newItem: FavoriteItem = {
        ...movie,
        addedAt: Date.now(),
      };
      const updated = [newItem, ...favorites];
      saveFavorites(updated);
      toast.success(`Added to your Hole! 🍿`, {
        description: `"${movie.title}" has been saved for binging.`,
        duration: 3000,
        className: "bg-surface-elevated border border-accent-gold/20 text-text-primary rounded-xl font-sans",
      });
    }
  };

  const removeFavorite = (id: number) => {
    const movie = favorites.find((m) => m.id === id);
    const updated = favorites.filter((item) => item.id !== id);
    saveFavorites(updated);
    if (movie) {
      toast.success(`Removed from your Hole 🍿`, {
        description: `"${movie.title}" is no longer binging in your hole.`,
        duration: 3000,
      });
    }
  };

  return {
    favorites,
    loaded,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    favoritesCount: favorites.length,
  };
};
