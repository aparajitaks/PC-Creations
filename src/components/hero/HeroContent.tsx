/**
 * HeroContent.tsx
 * ─────────────────────────────────────────────────────────────
 * PC Creations Hero — Left-side editorial copy.
 *
 * LAYOUT: Left-aligned split. Text lives in the left ~45% of the viewport.
 * The right side is occupied by HeroAssets (the animated social universe).
 *
 * NOTE: The studio badge pill has been removed per design direction.
 */

"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { useGsap } from "@/hooks/useGsap";

export function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  // ── GSAP animations (disabled scroll effects) ───────────────
  // useGsap((gsap) => {
  //   const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  //   tl.fromTo(
  //     ".hero-title-line",
  //     { opacity: 0, y: 60 },
  //     { opacity: 1, y: 0, duration: 0.9, stagger: 0.14 },
  //   )
  //   .fromTo(
  //     ".hero-subtitle",
  //     { opacity: 0, y: 24 },
  //     { opacity: 1, y: 0, duration: 0.7 },
  //     "-=0.35",
  //   )
  //   .fromTo(
  //     ".hero-actions",
  //     { opacity: 0, y: 20 },
  //     { opacity: 1, y: 0, duration: 0.6 },
  //     "-=0.3",
  //   )
  //   .fromTo(
  //     ".hero-metrics",
  //     { opacity: 0, y: 20 },
  //     { opacity: 1, y: 0, duration: 0.6 },
  //     "-=0.2",
  //   );
  // }, containerRef);

  return (
    <div
      ref={containerRef}
      className="relative z-10 pc-container flex items-center min-h-[calc(100dvh-70px)] py-16"
    >
      {/* Left column — max 48% on desktop, full width on mobile */}
      <div className="w-full lg:max-w-[48%] xl:max-w-[44%] flex flex-col gap-8 text-left">

        {/* ── Headline ── */}
        <h1 className="flex flex-col tracking-tight select-none overflow-hidden">
          <span className="hero-title-line block text-[clamp(2.6rem,5vw+0.5rem,6rem)] font-black text-[#000000] leading-[0.95] tracking-[-0.03em]">
            Your Creative
          </span>
          <span className="hero-title-line block text-[clamp(2.6rem,5vw+0.5rem,6rem)] font-black leading-[0.95] tracking-[-0.03em]">
            <span className="text-[#FF9D00]">Marketing</span>
          </span>
          <span className="hero-title-line block relative text-[clamp(2.6rem,5vw+0.5rem,6rem)] font-black text-[#000000] leading-[0.95] tracking-[-0.03em]">
            Team.
            {/* Subtle underline accent */}
            <span
              className="absolute -bottom-2 left-0 h-[5px] bg-[#FF9D00] rounded-full"
              style={{ width: "clamp(60px, 10vw, 140px)" }}
              aria-hidden="true"
            />
          </span>
        </h1>

        {/* ── Supporting copy ── */}
        <p className="hero-subtitle text-base sm:text-lg text-[rgba(0,0,0,0.58)] leading-relaxed max-w-[40ch] font-normal">
          Your digital marketing team to help you Build your Brand and Businesses through creative marketing.
        </p>

        {/* ── CTAs ── */}
        <div className="hero-actions flex flex-wrap items-center gap-4">
          <Button variant="primary" size="lg" href="#contact">
            Get Started
          </Button>
          <Button variant="secondary" size="lg" href="#results">
            See Our Results
          </Button>
        </div>

        {/* ── Metrics strip ── */}
        <div className="hero-metrics flex items-center gap-6 sm:gap-8 pt-6 border-t border-[rgba(0,0,0,0.09)]">
          <div className="flex flex-col gap-0.5">
            <span className="text-xl sm:text-2xl font-black text-[#000000] tracking-tight leading-none">
              3.8<span className="text-[#FF9D00]">X</span>
            </span>
            <span className="text-[10px] font-mono font-semibold tracking-widest uppercase text-[rgba(0,0,0,0.44)]">
              Avg ROAS
            </span>
          </div>
          <div className="w-px h-8 bg-[rgba(0,0,0,0.10)]" />
          <div className="flex flex-col gap-0.5">
            <span className="text-xl sm:text-2xl font-black text-[#000000] tracking-tight leading-none">
              120<span className="text-[#3155E7]">M+</span>
            </span>
            <span className="text-[10px] font-mono font-semibold tracking-widest uppercase text-[rgba(0,0,0,0.44)]">
              Impressions
            </span>
          </div>
          <div className="w-px h-8 bg-[rgba(0,0,0,0.10)]" />
          <div className="flex flex-col gap-0.5">
            <span className="text-xl sm:text-2xl font-black text-[#000000] tracking-tight leading-none">
              94<span className="text-[#FF9D00]">%</span>
            </span>
            <span className="text-[10px] font-mono font-semibold tracking-widest uppercase text-[rgba(0,0,0,0.44)]">
              Retention
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
