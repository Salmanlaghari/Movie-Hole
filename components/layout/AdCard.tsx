"use client";

import { motion } from "framer-motion";
import { useAds } from "@/hooks/useAds";
import { Sparkles, ExternalLink, Popcorn } from "lucide-react";

interface AdCardProps {
  variant: "row-native" | "search-result";
}

export function AdCard({ variant }: AdCardProps) {
  const { adsRemoved } = useAds();

  if (adsRemoved) return null;

  const isSearchResult = variant === "search-result";

  if (isSearchResult) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className="p-4 rounded-2xl bg-surface-elevated/70 border border-white/5 flex gap-4 transition-all relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-16 h-16 bg-accent-red/5 rounded-full blur-xl pointer-events-none" />

        {/* Small Poster placeholder */}
        <div className="w-16 md:w-20 h-24 md:h-28 relative rounded-xl overflow-hidden bg-accent-gold/5 flex-shrink-0 flex items-center justify-center border border-accent-gold/10">
          <Popcorn className="w-8 h-8 text-accent-gold animate-bounce" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-accent-gold/20 text-accent-gold">
              Sponsored
            </span>
            <h4 className="font-outfit font-bold text-base text-text-primary leading-snug truncate">
              Popcorn XL Combo (Special Discount)
            </h4>
          </div>
          <p className="text-xs text-text-secondary mt-1 leading-relaxed line-clamp-2">
            Get 30% off on your next cinema popcorn and beverage purchase. Redeem code &ldquo;HOLE30&rdquo; at participating ticket boxes.
          </p>
          <div className="mt-2.5">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-accent-gold hover:underline"
            >
              <span>Redeem Popcorn Coupon</span>
              <ExternalLink className="w-3 h-3" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    );
  }

  // Row native card variant
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="w-full max-w-7xl mx-auto px-4 md:px-8 my-6"
    >
      <div className="p-6 rounded-2xl bg-surface-elevated/60 border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden">
        {/* Background gradients */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-red/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-accent-gold/20 text-accent-gold flex items-center justify-center flex-shrink-0 border border-accent-gold/35">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-accent-gold/20 text-accent-gold">
                Featured Partner
              </span>
              <h3 className="font-outfit font-extrabold text-lg text-text-primary">
                CineStream IMAX Ultra Sub 📺
              </h3>
            </div>
            <p className="text-xs text-text-secondary/90 mt-1 leading-relaxed max-w-2xl">
              Tired of standard resolution? Upgrade to ultra high-fidelity 4K streaming with zero latency and Dolby Atmos integration. Sign up today and get your first month entirely free!
            </p>
          </div>
        </div>

        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#"
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-accent-gold to-accent-red text-text-primary font-bold text-xs flex items-center gap-1.5 shadow-glow-sm flex-shrink-0"
        >
          <span>Claim Free Month</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </motion.a>
      </div>
    </motion.div>
  );
}
