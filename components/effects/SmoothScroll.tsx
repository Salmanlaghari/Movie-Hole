"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    // Add smooth scrolling to body/html
    document.documentElement.style.scrollBehavior = "smooth";

    // Smooth scrolling active indicators
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      if (scrolled) {
        document.documentElement.classList.add("is-scrolled");
      } else {
        document.documentElement.classList.remove("is-scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}
