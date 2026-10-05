/**
 * Hero.tsx
 * ─────────────────────────────────────────────────────────────
 * Master Hero Section for PC Creations.
 *
 * Z-INDEX LAYERING (bottom → top):
 *   z-0    — background grid guides
 *   z-[2]  — HeroAssets: social media universe (desktop)
 *   z-10   — HeroContent: headline, CTAs, metrics
 */

"use client";

import React from "react";
import { HeroContent } from "./HeroContent";
import { HeroAssets }  from "./HeroAssets";

export function Hero() {
  return (
    <section
      id="home"
      aria-label="PC Creations Hero"
      className="relative w-full min-h-dvh bg-[#F7F8FA] overflow-hidden pt-[70px] flex flex-col"
    >
      {/* ── Subtle editorial grid lines ── */}
      <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
        <div className="absolute top-0 bottom-0 left-6 sm:left-12 w-px bg-[rgba(0,0,0,0.04)]" />
        <div className="absolute top-0 bottom-0 right-6 sm:right-12 w-px bg-[rgba(0,0,0,0.04)]" />
      </div>

      {/* ── Animated Social Media Universe (desktop only) ── */}
      <HeroAssets />

      {/* ── Mobile Characters (tablet & below) ── */}
      <div
        aria-hidden="true"
        className="lg:hidden absolute bottom-0 right-0 w-[90vw] max-w-[420px] z-[2] pointer-events-none select-none"
        style={{ opacity: 0.55, aspectRatio: "1303 / 1207" }}
      >
        <img
          src="/images/hero/hero-characters.png"
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          style={{ width: "100%", height: "100%", display: "block", objectFit: "contain", objectPosition: "bottom right" }}
        />
      </div>

      {/* ── Editorial Typography & UI Content Overlay ── */}
      <HeroContent />
    </section>
  );
}
