"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, Music, Play, Pause, Radio, Settings2, Sparkles, HelpCircle } from "lucide-react";
import { useSettingsDrawer } from "@/hooks/useSettingsDrawer";
import { useSoundscapes } from "@/hooks/useSoundscapes";
import { useSound } from "@/hooks/useSound";
import { useAds } from "@/hooks/useAds";

export function SettingsDrawer() {
  const { isOpen, closeDrawer } = useSettingsDrawer();
  const { playPop } = useSound();
  const { adsRemoved, setAdsRemovedState } = useAds();
  const {
    soundEnabled,
    ambientEnabled,
    activeTrackIdx,
    tracks,
    volume,
    setMasterSoundEnabled,
    setAmbientMusicEnabled,
    changeTrack,
    changeVolume,
  } = useSoundscapes();

  const overlayRef = useRef<HTMLDivElement>(null);

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeDrawer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeDrawer]);

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleTrackClick = (idx: number) => {
    playPop();
    changeTrack(idx);
    if (!ambientEnabled) {
      setAmbientMusicEnabled(true);
    }
  };

  const handleToggleAmbient = () => {
    playPop();
    setAmbientMusicEnabled(!ambientEnabled);
  };

  const handleToggleMaster = () => {
    playPop();
    setMasterSoundEnabled(!soundEnabled);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              playPop();
              closeDrawer();
            }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            ref={overlayRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-surface-elevated/95 backdrop-blur-xl border-l border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Settings2 className="w-5 h-5 text-accent-gold" />
                <h2 className="font-outfit font-bold text-xl text-text-primary">
                  Cinematic <span className="text-accent-red italic">Settings</span>
                </h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  playPop();
                  closeDrawer();
                }}
                className="p-2 rounded-full hover:bg-white/5 text-text-secondary hover:text-text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Content Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">

              {/* Module 1: Interaction Sounds Toggle */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-outfit font-bold text-base text-text-primary">
                      Interface Sound Effects
                    </h3>
                    <p className="text-xs text-text-secondary mt-0.5">
                      Auditory pops and chimes on button hovers & clicks.
                    </p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleToggleMaster}
                    className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 outline-none ${
                      soundEnabled ? "bg-accent-gold" : "bg-white/10"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-background shadow-md transition-transform duration-300 ${
                        soundEnabled ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </motion.button>
                </div>
              </div>

              {/* Premium Ads Toggle Module */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-outfit font-bold text-base text-text-primary flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-accent-gold" />
                      Remove Ads (VIP Premium)
                    </h3>
                    <p className="text-xs text-text-secondary mt-0.5">
                      Turn off all non-intrusive native sponsored cards and banners.
                    </p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      playPop();
                      setAdsRemovedState(!adsRemoved);
                    }}
                    className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 outline-none ${
                      adsRemoved ? "bg-accent-gold" : "bg-white/10"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-background shadow-md transition-transform duration-300 ${
                        adsRemoved ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </motion.button>
                </div>
              </div>

              {/* Module 1 Part 2: Ambient Soundscapes (Beats for Binging) */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-outfit font-bold text-base text-text-primary">
                      Ambient Sound <span className="text-accent-red italic">scapes</span>
                    </h3>
                    <p className="text-xs text-text-secondary mt-0.5">
                      Soothing lofi beats or synthetic sweeps to binge out to.
                    </p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    disabled={!soundEnabled}
                    onClick={handleToggleAmbient}
                    className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 outline-none ${
                      !soundEnabled ? "opacity-50 cursor-not-allowed bg-white/5" : ambientEnabled ? "bg-accent-red" : "bg-white/10"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-background shadow-md transition-transform duration-300 ${
                        soundEnabled && ambientEnabled ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </motion.button>
                </div>

                {!soundEnabled && (
                  <div className="p-3 bg-accent-gold/10 border border-accent-gold/10 rounded-xl text-xs text-accent-gold/90 flex gap-2">
                    <HelpCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Please enable <strong>Interface Sound Effects</strong> to unlock ambient audio features!</span>
                  </div>
                )}

                {soundEnabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    {/* Volume Controls */}
                    <div className="space-y-2 p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-text-secondary flex items-center gap-1.5">
                          {ambientEnabled ? <Volume2 className="w-3.5 h-3.5 text-accent-red animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
                          Soundscape Volume
                        </span>
                        <span className="text-text-primary font-bold">{Math.round(volume * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => changeVolume(parseFloat(e.target.value))}
                        className="w-full accent-accent-red h-1 bg-white/10 rounded-lg cursor-pointer outline-none"
                      />
                    </div>

                    {/* Curated Track List ("Beats for Binging") */}
                    <div className="space-y-2.5">
                      <div className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary flex items-center gap-1.5">
                        <Music className="w-3.5 h-3.5 text-accent-gold" />
                        Beats for Binging
                      </div>

                      <div className="space-y-2">
                        {tracks.map((track, idx) => {
                          const isActive = idx === activeTrackIdx && ambientEnabled;
                          return (
                            <motion.div
                              key={track.id}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handleTrackClick(idx)}
                              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                                isActive
                                  ? "bg-accent-gold/10 border-accent-gold/30 shadow-glow-sm"
                                  : "bg-white/5 hover:bg-white/10 border-transparent hover:border-white/5"
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                  isActive ? "bg-accent-gold/20 text-accent-gold animate-pulse" : "bg-white/5 text-text-secondary"
                                }`}>
                                  {track.type === "synth" ? <Sparkles className="w-4 h-4" /> : <Radio className="w-4 h-4" />}
                                </div>
                                <div className="min-w-0">
                                  <h4 className={`text-xs font-bold truncate ${isActive ? "text-accent-gold" : "text-text-primary"}`}>
                                    {track.name}
                                  </h4>
                                  <p className="text-[10px] text-text-secondary/80 truncate">
                                    {track.description}
                                  </p>
                                </div>
                              </div>

                              <button className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                                isActive ? "bg-accent-gold text-background" : "bg-white/5 text-text-secondary"
                              }`}>
                                {isActive ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                              </button>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-black/25 border-t border-white/5 text-center text-[10px] font-mono text-text-secondary select-none">
              🍿 Premium Binging Controls • Movie Hole © 2025
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
