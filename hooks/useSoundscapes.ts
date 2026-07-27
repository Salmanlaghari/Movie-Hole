"use client";

import { useState, useEffect, useRef } from "react";

export interface SoundscapeTrack {
  id: string;
  name: string;
  description: string;
  type: "synth" | "audio";
  url?: string;
}

export const SOUNDSCAPE_TRACKS: SoundscapeTrack[] = [
  {
    id: "midnight-popcorn",
    name: "Midnight Popcorn",
    description: "Deep, warm analog synth pads with slow resonant sweeps.",
    type: "synth",
  },
  {
    id: "retro-projector",
    name: "Retro Projector Hiss",
    description: "Cosy vintage film reel hum with subtle vinyl crackle.",
    type: "synth",
  },
  {
    id: "binging-lofi",
    name: "Lofi Binging Beats",
    description: "Relaxing chillhop study beats for long binging nights.",
    type: "audio",
    url: "https://assets.codepen.io/4358584/Anitek_-_01_-_Kisses.mp3",
  },
  {
    id: "cinematic-gold",
    name: "Cinematic Gold Loop",
    description: "Atmospheric, inspiring soundscapes for epic discoveries.",
    type: "audio",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
];

// Custom event name for cross-component sync
const SOUNDSCAPES_SYNC_EVENT = "movie-hole-soundscapes-sync";

export function useSoundscapes() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [ambientEnabled, setAmbientEnabled] = useState(false);
  const [activeTrackIdx, setActiveTrackIdx] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Synthesizer Web Audio nodes
  const synthNodesRef = useRef<{
    oscillators: OscillatorNode[];
    gainNodes: GainNode[];
    filterNode?: BiquadFilterNode;
    noiseNode?: AudioWorkletNode | AudioBufferSourceNode;
    lfo?: OscillatorNode;
  } | null>(null);

  // Sync state from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadSettings = () => {
      try {
        const storedSound = localStorage.getItem("movie-hole-sound-enabled");
        setSoundEnabled(storedSound === "true");

        const storedAmbient = localStorage.getItem("movie-hole-ambient-enabled");
        setAmbientEnabled(storedAmbient === "true");

        const storedTrack = localStorage.getItem("movie-hole-ambient-track");
        if (storedTrack !== null) {
          setActiveTrackIdx(Number(storedTrack));
        }

        const storedVolume = localStorage.getItem("movie-hole-ambient-volume");
        if (storedVolume !== null) {
          setVolume(Number(storedVolume));
        }
      } catch (e) {
        console.error("Failed to load soundscape state", e);
      }
    };

    loadSettings();

    const handleSync = () => {
      loadSettings();
    };

    window.addEventListener(SOUNDSCAPES_SYNC_EVENT, handleSync);
    window.addEventListener("movie-hole-sound-change", handleSync);

    return () => {
      window.removeEventListener(SOUNDSCAPES_SYNC_EVENT, handleSync);
      window.removeEventListener("movie-hole-sound-change", handleSync);
    };
  }, []);

  // Helper to trigger cross-tab / cross-component sync
  const triggerSync = (updatedKeys: Record<string, string>) => {
    try {
      Object.entries(updatedKeys).forEach(([key, val]) => {
        localStorage.setItem(key, val);
      });
      window.dispatchEvent(new Event(SOUNDSCAPES_SYNC_EVENT));
    } catch (e) {
      console.error(e);
    }
  };

  const setMasterSoundEnabled = (enabled: boolean) => {
    setSoundEnabled(enabled);
    triggerSync({
      "movie-hole-sound-enabled": String(enabled),
      // If turning off master sound, also pause ambient loops to avoid unexpected noises
      ...(!enabled ? { "movie-hole-ambient-enabled": "false" } : {}),
    });
    // Send standard sound change event
    window.dispatchEvent(new Event("movie-hole-sound-change"));
  };

  const setAmbientMusicEnabled = (enabled: boolean) => {
    // To play music, Master sound must be enabled
    const nextMaster = enabled ? true : soundEnabled;
    setAmbientEnabled(enabled);
    triggerSync({
      "movie-hole-sound-enabled": String(nextMaster),
      "movie-hole-ambient-enabled": String(enabled),
    });
    window.dispatchEvent(new Event("movie-hole-sound-change"));
  };

  const changeTrack = (idx: number) => {
    if (idx < 0 || idx >= SOUNDSCAPE_TRACKS.length) return;
    setActiveTrackIdx(idx);
    triggerSync({
      "movie-hole-ambient-track": String(idx),
    });
  };

  const changeVolume = (val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolume(clamped);
    triggerSync({
      "movie-hole-ambient-volume": String(clamped),
    });
  };

  return {
    soundEnabled,
    ambientEnabled,
    activeTrackIdx,
    activeTrack: SOUNDSCAPE_TRACKS[activeTrackIdx],
    volume,
    setMasterSoundEnabled,
    setAmbientMusicEnabled,
    changeTrack,
    changeVolume,
    tracks: SOUNDSCAPE_TRACKS,
  };
}
