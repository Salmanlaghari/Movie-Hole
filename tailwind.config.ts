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
        background: "#0A0A0F",
        surface: {
          elevated: "#14141B",
          glass: "rgba(20, 20, 27, 0.6)",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
        },
        accent: {
          gold: "#E4B343",
          red: "#E11D48",
        },
        text: {
          primary: "#FAFAFA",
          secondary: "#A1A1AA",
        },
        rating: {
          green: "#22C55E",
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
