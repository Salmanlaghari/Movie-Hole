"use client";

import React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  const easeCurve = [0.16, 1, 0.3, 1] as const;

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 15
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: easeCurve,
      }
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -15,
      transition: {
        duration: 0.3,
        ease: easeCurve,
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  );
}
