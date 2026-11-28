"use client";

import { useEffect, useRef, useState } from "react";
import { useCursorStyle, type CursorStyleId } from "@/cursor/CursorContext";

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  age: number;
  vx: number;
  vy: number;
  rotation: number;
}

type Cfg = { trail: number; fade: number; minDist: number };

const CONFIGS: Record<CursorStyleId, Cfg> = {
  pixel:   { trail: 50, fade: 0.025, minDist: 18 },
  sparkle: { trail: 32, fade: 0.028, minDist: 14 },
  comet:   { trail: 65, fade: 0.015, minDist: 7  },
  bubble:  { trail: 20, fade: 0.038, minDist: 22 },
  ripple:  { trail: 16, fade: 0.044, minDist: 28 },
};

export default function CursorTrail() {
  const { cursorStyle } = useCursorStyle();
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef    = useRef(0);
  const lastPos  = useRef({ x: 0, y: 0 });
  const animRef  = useRef<number | undefined>(undefined);
  const styleRef = useRef(cursorStyle);

  // Keep ref in sync; wipe stale particles on style switch (via RAF to avoid cascading renders)
  useEffect(() => {
    styleRef.current = cursorStyle;
    const id = requestAnimationFrame(() => setParticles([]));
    return () => cancelAnimationFrame(id);
  }, [cursorStyle]);

  // Single persistent mouse listener — reads style from ref
  useEffect(() => {
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      ("msMaxTouchPoints" in navigator &&
        Number((navigator as Navigator & { msMaxTouchPoints?: number }).msMaxTouchPoints) > 0);
    if (isTouch) return;

    const handler = (e: MouseEvent) => {
      const style = styleRef.current;
      const { trail, minDist } = CONFIGS[style];
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      if (Math.hypot(dx, dy) > minDist) {
        setParticles(prev => [
          ...prev.slice(-trail),
          {
            id: idRef.current++,
            x: e.clientX,
            y: e.clientY,
            opacity: 1,
            age: 0,
            vx: style === "sparkle" ? (Math.random() - 0.5) * 3   : 0,
            vy: style === "sparkle" ? -(Math.random() * 2 + 0.5)  : 0,
            rotation: Math.random() * 360,
          },
        ]);
        lastPos.current = { x: e.clientX, y: e.clientY };
      }
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  // Single persistent RAF animation loop — reads config from ref
  useEffect(() => {
    const tick = () => {
      const style = styleRef.current;
      const { fade } = CONFIGS[style];
      setParticles(prev =>
        prev
          .map(p => ({
            ...p,
            opacity: p.opacity - fade,
            age: p.age + 1,
            x: style === "sparkle" ? p.x + p.vx : p.x,
            y: style === "sparkle" ? p.y + p.vy : p.y,
          }))
          .filter(p => p.opacity > 0)
      );
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  const count = particles.length;
  // Pixel uses mix-blend-difference so white squares invert on any background.
  // All other styles render at normal blend mode using accent/color vars.
  const blendMode: React.CSSProperties["mixBlendMode"] =
    cursorStyle === "pixel" ? "difference" : "normal";

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[60] overflow-hidden"
      style={{ mixBlendMode: blendMode }}
    >
      {particles.map((p, i) => {
        // progress: 0 = oldest, 1 = newest (head of trail)
        const prog = count > 1 ? i / (count - 1) : 1;
        const { id, x, y, opacity, age, rotation } = p;

        // ── PIXEL ───────────────────────────────────────────────────────
        if (cursorStyle === "pixel") {
          const s = 18 * Math.max(0.45, 1 - age / 70);
          return (
            <div
              key={id}
              className="absolute bg-white"
              style={{
                left: x - s / 2,
                top:  y - s / 2,
                width: s,
                height: s,
                opacity,
              }}
            />
          );
        }

        // ── SPARKLE ─────────────────────────────────────────────────────
        if (cursorStyle === "sparkle") {
          const s = 9 + prog * 9;
          const hue = (id * 53 + 20) % 360;
          return (
            <div
              key={id}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: 0,
                height: 0,
                pointerEvents: "none",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  transform: `translate(-50%, -50%) rotate(${rotation + age * 5}deg)`,
                  opacity,
                  color: `hsl(${hue}, 90%, 72%)`,
                  fontSize: s,
                  lineHeight: "1",
                  filter: `drop-shadow(0 0 ${3 * opacity}px hsl(${hue}, 90%, 72%))`,
                  whiteSpace: "nowrap",
                  userSelect: "none",
                }}
              >
                ✦
              </span>
            </div>
          );
        }

        // ── COMET ───────────────────────────────────────────────────────
        if (cursorStyle === "comet") {
          const s = 30 * Math.max(0.04, prog);
          const hue = 190 + prog * 55;          // deep blue → electric cyan at head
          const lum = 42 + prog * 50;           // dim → bright
          const blur = (1 - prog) * 3;
          return (
            <div
              key={id}
              style={{
                position: "absolute",
                left: x - s / 2,
                top:  y - s / 2,
                width: s,
                height: s,
                borderRadius: "50%",
                background: `radial-gradient(circle at 38% 38%,
                  hsl(${hue},95%,${lum + 12}%) 0%,
                  hsl(${hue},85%,${lum}%) 55%,
                  transparent 100%)`,
                opacity: opacity * (0.35 + prog * 0.65),
                filter: blur > 0.1 ? `blur(${blur}px)` : undefined,
                pointerEvents: "none",
              }}
            />
          );
        }

        // ── BUBBLE ──────────────────────────────────────────────────────
        if (cursorStyle === "bubble") {
          const scale = 1 + age * 0.07;
          const s = 24 * scale;
          return (
            <div
              key={id}
              style={{
                position: "absolute",
                left: x - s / 2,
                top:  y - s / 2,
                width: s,
                height: s,
                borderRadius: "50%",
                border: `1.5px solid var(--accent)`,
                opacity,
                boxShadow: `0 0 ${5 * opacity}px var(--accent)`,
                pointerEvents: "none",
              }}
            />
          );
        }

        // ── RIPPLE ──────────────────────────────────────────────────────
        if (cursorStyle === "ripple") {
          const scale = 1 + age * 0.22;
          const s = 7 * scale;
          // Newest particle: solid filled dot; older ones: expanding ring
          const isHead = prog > 0.9;
          return (
            <div
              key={id}
              style={{
                position: "absolute",
                left: x - s / 2,
                top:  y - s / 2,
                width: s,
                height: s,
                borderRadius: "50%",
                border: isHead ? "none" : `1px solid var(--accent)`,
                background: isHead ? "var(--accent)" : "transparent",
                opacity: opacity * (isHead ? 1 : 0.65),
                pointerEvents: "none",
              }}
            />
          );
        }

        return null;
      })}
    </div>
  );
}
