import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: {
          elevated: "var(--surface-elevated)",
          glass: "var(--surface-glass)",
        },
        border: {
          subtle: "var(--border-subtle)",
        },
        accent: {
          gold: "var(--accent-gold)",
          red: "var(--accent-red)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
        },
        rating: {
          green: "var(--rating-green)",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 25px rgba(228, 179, 67, 0.15)",
        glowRed: "0 0 25px rgba(225, 29, 72, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
