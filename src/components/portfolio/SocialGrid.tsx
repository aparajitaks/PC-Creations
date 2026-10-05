/**
 * SocialGrid.tsx
 * ─────────────────────────────────────────────────────────────
 * Compact Instagram managed-accounts grid.
 * Verified data from profile screenshots.
 */

"use client";

import React, { useRef } from "react";
import { useGsap } from "@/hooks/useGsap";
import { socialClients } from "./portfolioData";

export function SocialGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGsap((gsap) => {
    const el = gridRef.current;
    if (!el) return;
    gsap.fromTo(
      el.querySelectorAll(".social-card"),
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      },
    );
  }, gridRef);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-7"
    >
      {socialClients.map((c) => (
        <div
          key={c.id}
          className="social-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.07)] bg-white hover:border-[rgba(0,0,0,0.18)] hover:shadow-xl transition-all duration-300 h-full"
        >
          {/* Profile screenshot */}
          <div className="relative overflow-hidden bg-[rgba(0,0,0,0.04)]" style={{ aspectRatio: "4/3" }}>
            <img
              src={c.profileImage}
              alt={`${c.name} Instagram profile`}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.65)] via-transparent to-transparent" />
            {/* Handle badge overlay */}
            <div className="absolute bottom-2.5 left-3 right-3">
              <p className="text-[11px] font-mono font-bold text-white leading-tight truncate">
                @{c.handle}
              </p>
            </div>
          </div>

          {/* Info & Metrics */}
          <div className="p-5 flex flex-col justify-between flex-1 gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#3155E7] tracking-widest uppercase block mb-1.5">
                {c.category}
              </span>
              <p className="text-sm font-bold text-[#000000] leading-snug line-clamp-2">
                {c.name}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[rgba(0,0,0,0.06)]">
              <div>
                <p className="text-base font-black text-[#000000] leading-none">{c.followers}</p>
                <p className="text-[9px] text-[rgba(0,0,0,0.45)] font-semibold tracking-wider uppercase mt-1">Followers</p>
              </div>
              <div className="text-right">
                <p className="text-base font-black text-[#000000] leading-none">{c.posts}</p>
                <p className="text-[9px] text-[rgba(0,0,0,0.45)] font-semibold tracking-wider uppercase mt-1">Posts</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
