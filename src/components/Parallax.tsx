"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react";

interface ParallaxProps {
  children: React.ReactNode;
  offset?: number; // Distance in px to shift (positive moves up, negative moves down)
  clamp?: boolean;
  className?: string;
}

export default function Parallax({ children, offset = 40, className = "" }: ParallaxProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Map scroll progress from 0 (entering from bottom) to 1 (leaving top)
  const rawY = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const y = useSpring(rawY, { stiffness: 100, damping: 24, mass: 0.2 });

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
