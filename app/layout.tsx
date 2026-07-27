import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchModal } from "@/components/layout/SearchModal";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { SplashScreen } from "@/components/effects/SplashScreen";
import { OnboardingTour } from "@/components/effects/OnboardingTour";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Movie Hole — Hop in. Binge out.",
  description: "The cinematic, premium-grade discovery wormhole for movie lovers. Explore trending hits, curated genres, and save your favorites. Your hole for every movie.",
  keywords: ["movies", "discovery", "cinema", "binge", "netflix", "tmdb", "framer motion"],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-text-primary font-sans selection:bg-accent-red selection:text-text-primary">
        <SmoothScroll />
        <CustomCursor />
        <SplashScreen />
        <OnboardingTour />
        <CommandPalette />
        <Toaster position="bottom-right" theme="dark" />
        <Navbar />
        <SearchModal />

        {/* Main Content Area: push down under fixed transparent navbar */}
        <main className="min-h-screen pt-28">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
