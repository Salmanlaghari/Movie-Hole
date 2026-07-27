"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoKey: string;
  movieTitle: string;
}

export function TrailerModal({ isOpen, onClose, videoKey, movieTitle }: TrailerModalProps) {

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Disable/enable scroll
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-4xl bg-surface-elevated border border-white/10 rounded-2xl overflow-hidden shadow-glow"
            onClick={(e) => e.stopPropagation()} // Prevent close on modal content click
          >
            {/* Header / Title */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-background/50">
              <h3 className="font-outfit font-bold text-lg md:text-xl text-text-primary truncate">
                <span className="text-accent-gold mr-1.5">Trailer:</span>
                {movieTitle}
              </h3>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-1.5 rounded-full bg-white/5 hover:bg-accent-red/20 text-text-secondary hover:text-accent-red transition-all"
                aria-label="Close trailer modal"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Video container */}
            <div className="relative aspect-video w-full bg-black">
              {videoKey ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
                  title={`${movieTitle} Trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-4xl mb-3">🍿</span>
                  <p className="text-text-secondary font-mono text-sm max-w-sm leading-relaxed">
                    Trailer is temporarily sleeping in the movie hole. Grab some popcorn while we dig it up!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
