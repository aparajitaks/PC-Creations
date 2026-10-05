"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

/**
 * FloatingIconsLayer.tsx
 * ─────────────────────────────────────────────────────────────
 * Full-page fixed overlay of floating 3D social media icons.
 *
 * PERFORMANCE FIXES (this revision):
 *   • Removed useState/useEffect cascading render for reduced-motion.
 *     Detected synchronously inside a single effect; a class/style pin
 *     disables animation when PRM is set — no React state, no double
 *     render.
 *   • Icons have explicit width/height and CSS aspect ratio containment
 *     so they reserve space during paint and avoid layout jumps.
 *   • Mouse parallax now throttles writes to a single rAF batch and
 *     updates icon transforms via directly-mutated refs instead of
 *     per-icon gsap.to() invocations on every mousemove event.
 *   • Reduced max parallax depth coefficients so transforms remain
 *     small and cheap for the compositor.
 */

interface IconConfig {
  id:       string;
  src:      string;
  alt:      string;
  x:        number;
  y:        number;
  size:     number;
  floatY:   number;
  floatX:   number;
  rotation: number;
  duration: number;
  delay:    number;
  opacity:  number;
  depth:    number;
  rotateZ:  number;
}

const ICONS: IconConfig[] = [
  { id: "like-tr",  src: "/assets/icon-like-3d.png",      alt: "Facebook Like", x: 78, y: 8,  size: 130, floatY: 18, floatX: 5, rotation: 6, duration: 4.8, delay: 0,   opacity: 0.92, depth: 0.04, rotateZ: -8 },
  { id: "fb-left",  src: "/assets/facebook-logo.png",    alt: "Facebook",      x: 3,  y: 18, size: 110, floatY: 22, floatX: 6, rotation: 8, duration: 5.6, delay: 0.7, opacity: 0.88, depth: 0.06, rotateZ: 12 },
  { id: "ig-mr",    src: "/assets/instagram-logo.png",   alt: "Instagram",     x: 84, y: 38, size: 90,  floatY: 16, floatX: 4, rotation: 5, duration: 4.2, delay: 1.2, opacity: 0.85, depth: 0.05, rotateZ: -14 },
  { id: "wa-bl",    src: "/assets/whatsapp-logo.png",     alt: "WhatsApp",      x: 5,  y: 62, size: 95,  floatY: 20, floatX: 7, rotation: 7, duration: 5.0, delay: 0.4, opacity: 0.87, depth: 0.07, rotateZ: 10 },
  { id: "react-tl", src: "/assets/icon-reactions-3d.png", alt: "Reactions",     x: 2,  y: 5,  size: 200, floatY: 12, floatX: 3, rotation: 3, duration: 6.0, delay: 1.8, opacity: 0.75, depth: 0.02, rotateZ: -3 },
  { id: "like-br",  src: "/assets/icon-like-3d.png",      alt: "Facebook Like", x: 88, y: 72, size: 80,  floatY: 14, floatX: 5, rotation: 9, duration: 3.8, delay: 2.1, opacity: 0.70, depth: 0.08, rotateZ: 18 },
  { id: "ig-cl",    src: "/assets/instagram-logo.png",   alt: "Instagram",     x: 7,  y: 42, size: 65,  floatY: 18, floatX: 6, rotation: 12, duration: 4.5, delay: 0.9, opacity: 0.65, depth: 0.09, rotateZ: -20 },
  { id: "fb-br",    src: "/assets/facebook-logo.png",    alt: "Facebook",      x: 74, y: 82, size: 72,  floatY: 16, floatX: 4, rotation: 7, duration: 4.9, delay: 1.5, opacity: 0.68, depth: 0.06, rotateZ: 8 },
  { id: "wa-tr",    src: "/assets/whatsapp-logo.png",     alt: "WhatsApp",      x: 91, y: 18, size: 60,  floatY: 14, floatX: 3, rotation: 10, duration: 4.1, delay: 2.5, opacity: 0.65, depth: 0.10, rotateZ: -12 },
  { id: "react-bc", src: "/assets/icon-reactions-3d.png", alt: "Reactions",     x: 30, y: 88, size: 140, floatY: 10, floatX: 3, rotation: 2, duration: 5.5, delay: 3.0, opacity: 0.60, depth: 0.03, rotateZ: 5 },
];

export function FloatingIconsLayer() {
  const layerRef  = useRef<HTMLDivElement>(null);
  const itemRefs  = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // ── Pin to rest positions immediately if PRM ───────────────
    if (prefersReduced) {
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const cfg = ICONS[i];
        el.style.opacity = String(cfg.opacity);
        el.style.transform = `rotate(${cfg.rotateZ}deg)`;
      });
      return undefined;
    }

    // ── Compute pointer parallax targets using a single rAF batch
    let pointerX = 0; // normalized -1..1
    let pointerY = 0;
    let rafPtr: number | null = null;
    const parallaxState = ICONS.map((cfg) => ({ cx: 0, cy: 0, depth: cfg.depth }));

    const pointerTick = () => {
      rafPtr = null;
      for (let i = 0; i < parallaxState.length; i++) {
        const s = parallaxState[i];
        const el = itemRefs.current[i];
        if (!el) continue;
        s.cx += (pointerX * s.depth - s.cx) * 0.07;
        s.cy += (pointerY * s.depth - s.cy) * 0.07;
        el.style.translate = `${s.cx.toFixed(2)}px ${s.cy.toFixed(2)}px`;
      }
    };

    const onMove = (e: MouseEvent) => {
      pointerX = (e.clientX / window.innerWidth  - 0.5) * 2;
      pointerY = (e.clientY / window.innerHeight - 0.5) * 2;
      if (rafPtr === null) rafPtr = requestAnimationFrame(pointerTick);
    };

    const ctx = gsap.context(() => {
      const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];

      // Entrance
      gsap.fromTo(items,
        { opacity: 0, scale: 0.5 },
        {
          opacity: (i) => ICONS[i].opacity,
          scale:   1,
          duration: 1.1,
          ease:    "power3.out",
          stagger: 0.22,
          delay:   0.7,
        },
      );

      // Per-icon continuous float — shared sine loops with offsets so
      // no two icon tween cycles perfectly align.
      ICONS.forEach((cfg, i) => {
        const el = itemRefs.current[i];
        if (!el) return;
        gsap.to(el, {
          y:        cfg.floatY,
          x:        cfg.floatX,
          rotation: cfg.rotateZ + cfg.rotation,
          duration: cfg.duration,
          ease:     "sine.inOut",
          repeat:   -1,
          yoyo:     true,
          delay:    cfg.delay,
        });
      });

      window.addEventListener("mousemove", onMove, { passive: true });
    }, layer);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafPtr !== null) cancelAnimationFrame(rafPtr);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={layerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 3 }}
      aria-hidden="true"
    >
      {ICONS.map((cfg, i) => (
        <div
          key={cfg.id}
          ref={(el) => { itemRefs.current[i] = el; }}
          style={{
            position:    "absolute",
            left:        `${cfg.x}vw`,
            top:         `${cfg.y}vh`,
            width:       cfg.size,
            aspectRatio: "1 / 1",
            opacity:     0,
            transform:   `rotate(${cfg.rotateZ}deg)`,
            willChange:  "transform, opacity, translate",
            filter:      "drop-shadow(0 8px 24px rgba(0,0,0,0.35))",
          }}
        >
          <img
            src={cfg.src}
            alt={cfg.alt}
            width={cfg.size}
            height={cfg.size}
            loading="lazy"
            decoding="async"
            draggable={false}
            style={{
              width:       "100%",
              height:      "100%",
              display:     "block",
              objectFit:   "contain",
              userSelect:  "none",
            }}
          />
        </div>
      ))}
    </div>
  );
}
