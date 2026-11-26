"use client";

import type React from "react";
import { useEffect, useRef, useState, useCallback } from "react";

interface Pixel {
  id: number;
  x: number;
  y: number;
  opacity: number;
  age: number;
}

const PIXEL_SIZE = 12;
const TRAIL_LENGTH = 40;
const FADE_SPEED = 0.04;

export default function PixelCursorTrail() {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const pixelIdRef = useRef(0);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | undefined>(undefined);

  const createPixel = useCallback((x: number, y: number) => {
    return {
      id: pixelIdRef.current++,
      x,
      y,
      opacity: 1,
      age: 0,
    };
  }, []);

  useEffect(() => {
    // Only run on non-touch devices
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0;

    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      const dx = x - lastPositionRef.current.x;
      const dy = y - lastPositionRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > PIXEL_SIZE) {
        const newPixel = createPixel(x, y);
        setPixels((prev) => [...prev.slice(-TRAIL_LENGTH), newPixel]);
        lastPositionRef.current = { x, y };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [createPixel]);

  useEffect(() => {
    const animate = () => {
      setPixels((prev) =>
        prev
          .map((pixel) => ({
            ...pixel,
            opacity: pixel.opacity - FADE_SPEED,
            age: pixel.age + 1,
          }))
          .filter((pixel) => pixel.opacity > 0)
      );
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden mix-blend-difference">
      {pixels.map((pixel) => {
        // Calculate size based on age - older pixels are smaller
        const sizeMultiplier = Math.max(0.3, 1 - pixel.age / 100);
        const currentSize = PIXEL_SIZE * sizeMultiplier;

        return (
          <div
            key={pixel.id}
            className="absolute bg-white"
            style={{
              left: pixel.x - currentSize / 2,
              top: pixel.y - currentSize / 2,
              width: currentSize,
              height: currentSize,
              opacity: pixel.opacity,
              transition: "width 0.1s ease-out, height 0.1s ease-out",
            }}
          />
        );
      })}
    </div>
  );
}
