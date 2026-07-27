"use client";

import { useState, useEffect } from "react";

export function useSound() {
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("movie-hole-sound-enabled");
      if (stored === "true") {
        setSoundEnabled(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    try {
      localStorage.setItem("movie-hole-sound-enabled", String(nextVal));
    } catch (e) {
      console.error(e);
    }
  };

  // Synthesize custom premium click/pop sound
  const playPop = () => {
    if (!soundEnabled) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();

      // Node chains
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      // Sound characteristics: a subtle high-end bubble pop sound
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {
      // Audio context might be blocked or uninitialized
    }
  };

  // Synthesize a high-pitch success achievement chime
  const playChime = () => {
    if (!soundEnabled) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();

      // Play 2 quick overlapping notes for a premium chime feel
      const playNote = (freq: number, startDelay: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + startDelay);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + startDelay + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startDelay + duration);

        osc.start(ctx.currentTime + startDelay);
        osc.stop(ctx.currentTime + startDelay + duration);
      };

      // Play major third chime
      playNote(880, 0, 0.4); // A5
      playNote(1108.73, 0.08, 0.5); // C#6
    } catch (e) {
      // Audio context blocked
    }
  };

  return {
    soundEnabled,
    toggleSound,
    playPop,
    playChime,
  };
}
