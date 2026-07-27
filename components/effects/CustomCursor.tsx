"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredType, setHoveredType] = useState<"standard" | "interactive" | "card" | "red-card">("standard");

  // Mouse coords motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for fluid cinematic response
  const springConfig = { damping: 35, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16); // Center the 32px cursor
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Monitor what element is being hovered
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find closest interactive parent
      const interactive = target.closest("button, a, input, select, textarea, [role='button']");
      if (interactive) {
        // Special hover on Movie/TV Cards
        if (interactive.closest(".group")) {
          setHoveredType("card");
        } else if (interactive.classList.contains("hover:bg-accent-red/10") || interactive.classList.contains("bg-accent-red")) {
          setHoveredType("red-card");
        } else {
          setHoveredType("interactive");
        }
      } else {
        setHoveredType("standard");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible, shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  // Custom styling states depending on hovered element
  const getStyles = () => {
    switch (hoveredType) {
      case "interactive":
        return {
          scale: 1.5,
          borderColor: "#E4B343", // Gold glow
          background: "rgba(228, 179, 67, 0.1)",
        };
      case "card":
        return {
          scale: 1.8,
          borderColor: "#E4B343", // Signature Movie Hole Gold
          background: "rgba(228, 179, 67, 0.05)",
        };
      case "red-card":
        return {
          scale: 1.8,
          borderColor: "#E11D48", // Popcorn red
          background: "rgba(225, 29, 72, 0.05)",
        };
      case "standard":
      default:
        return {
          scale: 1,
          borderColor: "rgba(255, 255, 255, 0.4)",
          background: "rgba(255, 255, 255, 0.03)",
        };
    }
  };

  const innerStyles = () => {
    switch (hoveredType) {
      case "interactive":
      case "card":
        return { scale: 0.5, backgroundColor: "#E4B343" };
      case "red-card":
        return { scale: 0.5, backgroundColor: "#E11D48" };
      case "standard":
      default:
        return { scale: 1, backgroundColor: "#FAFAFA" };
    }
  };

  return (
    <>
      {/* Outer Spring Circle Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 pointer-events-none z-50 hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 1 : 0,
        }}
        animate={getStyles()}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      />
      {/* Inner Dot following cursor instantly */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-50 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          // center the dot inside the outer circle (16 - 5 = 11px offset)
          marginLeft: "11px",
          marginTop: "11px",
          opacity: isVisible ? 0.9 : 0,
        }}
        animate={innerStyles()}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
