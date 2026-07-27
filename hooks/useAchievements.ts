"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useSound } from "@/hooks/useSound";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: number | null;
}

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: "welcome",
    title: "The First Dig",
    description: "Successfully completed 'Welcome to The Hole' tour.",
    icon: "🕳️",
    unlockedAt: null,
  },
  {
    id: "first-pop",
    title: "First Pop",
    description: "Added your first film or TV show to your Hole.",
    icon: "🍿",
    unlockedAt: null,
  },
  {
    id: "hole-digger",
    title: "Hole Digger",
    description: "Stored 10 or more cinematic items inside your Hole.",
    icon: "⛏️",
    unlockedAt: null,
  },
  {
    id: "tv-enthusiast",
    title: "TV Enthusiast",
    description: "Discovered a premium television series.",
    icon: "📺",
    unlockedAt: null,
  },
  {
    id: "sound-master",
    title: "Sound Master",
    description: "Activated premium action synthesizer sound effects.",
    icon: "🔊",
    unlockedAt: null,
  },
];

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const { playChime, soundEnabled } = useSound();

  // Load state on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("movie-hole-achievements");
      if (stored) {
        setAchievements(JSON.parse(stored));
      } else {
        setAchievements(INITIAL_ACHIEVEMENTS);
      }
    } catch (e) {
      setAchievements(INITIAL_ACHIEVEMENTS);
    }
  }, []);

  const saveAchievements = (updated: Achievement[]) => {
    setAchievements(updated);
    try {
      localStorage.setItem("movie-hole-achievements", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const unlockAchievement = (id: string) => {
    // Avoid double unlock or unmounted runs
    if (achievements.length === 0) return;

    const index = achievements.findIndex((a) => a.id === id);
    if (index === -1 || achievements[index].unlockedAt !== null) return;

    const updated = [...achievements];
    updated[index] = {
      ...updated[index],
      unlockedAt: Date.now(),
    };

    saveAchievements(updated);

    // Play victory chime!
    // Since useSound relies on soundEnabled, we will temporarily synthesize the sound directly
    // to bypass the state update lag if needed. Let's make sure it chimes beautifully!
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        const playNote = (freq: number, startDelay: number, duration: number) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + startDelay);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + startDelay + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startDelay + duration);
          osc.start(ctx.currentTime + startDelay);
          osc.stop(ctx.currentTime + startDelay + duration);
        };
        playNote(523.25, 0, 0.3); // C5
        playNote(659.25, 0.06, 0.3); // E5
        playNote(783.99, 0.12, 0.4); // G5
        playNote(1046.50, 0.2, 0.6); // C6
      }
    } catch (err) {}

    // Show achievement toast
    toast.success(`Achievement Unlocked! 🏆`, {
      description: `"${updated[index].title}" — ${updated[index].description}`,
      duration: 5000,
      className: "bg-surface-elevated border-2 border-accent-gold text-text-primary rounded-2xl p-5 shadow-glow font-sans",
    });
  };

  return {
    achievements,
    unlockAchievement,
    unlockedCount: achievements.filter((a) => a.unlockedAt !== null).length,
  };
}
