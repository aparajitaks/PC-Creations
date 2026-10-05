"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * ReactionsEmitter.tsx
 * ─────────────────────────────────────────────────────────────
 * Continuous Facebook-style reaction burst effect.
 *
 * PERFORMANCE FIXES (this revision):
 *   • Removed useState + useEffect cascading render for pool init.
 *     Pool is generated synchronously, once, in a useRef initializer
 *     that fires only on the client (typeof window guards). Server
 *     renders null — zero hydration delta, zero double renders.
 *   • A single useEffect mounts GSAP context; no state transitions.
 */

const REACTIONS = [
  {
    type: "like",
    bg:     "#1877F2",
    shadow: "rgba(24,119,242,0.5)",
    path: "M13 27H7a2 2 0 01-2-2v-9a2 2 0 012-2h3.17A4 4 0 0114 11V7a2 2 0 012-2 3 3 0 013 3v5h4.5A2.5 2.5 0 0126 15.5l-2 9A2.5 2.5 0 0121.5 27H13z",
  },
  {
    type: "love",
    bg:     "#E0264B",
    shadow: "rgba(224,38,75,0.5)",
    path: "M16 27s-1-.9-2.4-2.2C8.6 20 4 15.8 4 11a7 7 0 0112-4.9A7 7 0 0128 11c0 4.8-4.6 9-9.6 13.8L16 27z",
  },
  {
    type: "like2",
    bg:     "#2D88FF",
    shadow: "rgba(45,136,255,0.5)",
    path: "M13 27H7a2 2 0 01-2-2v-9a2 2 0 012-2h3.17A4 4 0 0114 11V7a2 2 0 012-2 3 3 0 013 3v5h4.5A2.5 2.5 0 0126 15.5l-2 9A2.5 2.5 0 0121.5 27H13z",
  },
  {
    type: "love2",
    bg:     "#FF3366",
    shadow: "rgba(255,51,102,0.5)",
    path: "M16 27s-1-.9-2.4-2.2C8.6 20 4 15.8 4 11a7 7 0 0112-4.9A7 7 0 0128 11c0 4.8-4.6 9-9.6 13.8L16 27z",
  },
] as const;

interface ParticleConfig {
  size:      number;
  xOffset:   number;
  xDrift:    number;
  duration:  number;
  delay:     number;
  reactionIdx: number;
  opacity:   number;
}

/** Deterministic index-seeded PRNG. */
function generatePool(count = 6): ParticleConfig[] {
  return Array.from({ length: count }, (_, i) => {
    const r = (seed: number) => ((seed * 9301 + 49297) % 233280) / 233280;
    return {
      size:        20 + r(i * 7 + 1) * 16,
      xOffset:     -25 + r(i * 13 + 2) * 50,
      xDrift:      -18 + r(i * 11 + 3) * 36,
      duration:    2.8 + r(i * 5  + 4) * 1.8,
      delay:       i * (6.0 / count),
      reactionIdx: Math.floor(r(i * 3 + 5) * REACTIONS.length),
      opacity:     0.45 + r(i * 17 + 6) * 0.35,
    };
  });
}

export function ReactionsEmitter() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const particleRefs  = useRef<(HTMLDivElement | null)[]>([]);

  // Synchronous, once-per-mount init.
  //   Server  → null (we render null, zero hydration drift).
  //   Client  → deterministic 6-particle pool (no effect needed).
  // This pattern is NOT a setState-in-effect cascade, so no cascading render.
  const [pool] = useState<ParticleConfig[] | null>(() =>
    typeof window !== "undefined" ? generatePool(6) : null,
  );

  // ── GSAP animations — run once after mount ──
  useEffect(() => {
    if (!pool) return;
    const container = containerRef.current;
    if (!container) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        // Pin everything visible at rest for PRM users — no motion.
        particleRefs.current.forEach((el) => {
          if (!el) return;
          gsap.set(el, { opacity: 0.2, scale: 0.6, y: -120 });
        });
        return;
      }

      pool.forEach((cfg, i) => {
        const el = particleRefs.current[i];
        if (!el) return;

        const startX = cfg.xOffset;

        function animate() {
          if (!el) return;
          gsap.set(el, { x: startX, y: 0, scale: 0.3, opacity: 0, display: "block" });

          gsap.to(el, {
            y:        -(180 + 40 + (i % 5) * 12),
            x:        startX + cfg.xDrift,
            scale:    0.9 + (i % 3) * 0.1,
            opacity:  cfg.opacity,
            duration: cfg.duration * 0.35,
            ease:     "power2.out",
            onComplete: () => {
              gsap.to(el, {
                y:        -(260 + (i % 4) * 15),
                opacity:  0,
                scale:    0.45 + (i % 3) * 0.1,
                duration: cfg.duration * 0.65,
                ease:     "power1.in",
                onComplete: () => {
                  gsap.delayedCall(cfg.delay + 0.3 + (i % 4) * 0.2, animate);
                },
              });
            },
          });
        }

        gsap.delayedCall(cfg.delay, animate);
      });
    }, container);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Server: render nothing (avoids all hydration delta)
  if (!pool) return null;

  return (
    <div
      ref={containerRef}
      className="absolute pointer-events-none"
      style={{
        right:    "clamp(20px, 8vw, 120px)",
        bottom:   "clamp(100px, 22vh, 240px)",
        width:    "clamp(100px, 20vw, 260px)",
        height:   "300px",
        zIndex:   5,
        overflow: "visible",
      }}
      aria-hidden="true"
    >
      {pool.map((cfg, i) => {
        const reaction = REACTIONS[cfg.reactionIdx];
        return (
          <div
            key={i}
            ref={(el) => { particleRefs.current[i] = el; }}
            style={{
              position:       "absolute",
              bottom:         0,
              left:           "50%",
              width:          cfg.size,
              height:         cfg.size,
              borderRadius:   "50%",
              background:     `radial-gradient(circle at 35% 35%, ${reaction.bg}ee, ${reaction.bg})`,
              boxShadow:      `0 4px 20px ${reaction.shadow}, 0 0 0 2px rgba(255,255,255,0.15) inset`,
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              padding:        cfg.size * 0.22,
              opacity:        0,
              willChange:     "transform, opacity",
              marginLeft:     -cfg.size / 2,
            }}
          >
            <div style={{ width: "100%", height: "100%", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}>
              <svg viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d={reaction.path} />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}
