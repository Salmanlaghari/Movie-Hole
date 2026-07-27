"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Film } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      label: "Github",
      href: "https://github.com",
      svg: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      label: "Twitter",
      href: "https://twitter.com",
      svg: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    {
      label: "Instagram",
      href: "https://instagram.com",
      svg: (
        <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    }
  ];

  return (
    <footer className="relative z-10 mt-24 border-t border-white/5 bg-surface-elevated/40 backdrop-blur-xl py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8">

        {/* Left Side: Brand & Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
          <Logo showTagline={true} size="sm" />
          <p className="text-xs text-text-secondary max-w-sm mt-1 leading-relaxed">
            Your premium, cheekily immersive, ultimate wormhole into high-fidelity movie discovery. Pop some corn, grab a seat, and let the binging begin.
          </p>
        </div>

        {/* Right Side: Social Media & Powered By */}
        <div className="flex flex-col items-center md:items-end gap-4">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-full bg-white/5 hover:bg-accent-gold/15 text-text-secondary hover:text-accent-gold transition-colors"
                aria-label={social.label}
              >
                {social.svg}
              </motion.a>
            ))}
          </div>

          {/* Credits and TMDB */}
          <div className="text-center md:text-right">
            <p className="text-[11px] font-mono text-text-secondary tracking-wide">
              Movie Hole © {currentYear} — Handcrafted with 🍿 & 💖
            </p>
            <div className="flex items-center gap-1.5 justify-center md:justify-end mt-1 text-[10px] text-text-secondary/70">
              <Film className="w-3.5 h-3.5 text-accent-gold" />
              <span>Powered by TMDB API. No actual holes were harmed in the making.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
