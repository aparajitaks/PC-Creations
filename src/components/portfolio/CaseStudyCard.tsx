/**
 * CaseStudyCard.tsx
 * ─────────────────────────────────────────────────────────────
 * PC Creations — Individual case study card component.
 *
 * DESIGN:
 *   Premium dark card with project image, stats strip, and
 *   service tags. Used inside PortfolioSection's project rows.
 *
 * ANIMATIONS:
 *   GSAP ScrollTrigger: card fade-in + stats counter animation
 */

"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGsap } from "@/hooks/useGsap";
import type { Project, ProjectStat } from "./portfolioData";

// ── Types ─────────────────────────────────────────────────────

interface CaseStudyCardProps {
  project: Project;
  reversed?: boolean;
}

// ── Component ─────────────────────────────────────────────────

export function CaseStudyCard({ project, reversed = false }: CaseStudyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGsap((gsap) => {
    const el = cardRef.current;
    if (!el) return;

    // Card entrance
    gsap.fromTo(
      el,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      },
    );

    // Stats counter animation
    const statEls = el.querySelectorAll<HTMLElement>(".stat-value");
    statEls.forEach((statEl) => {
      gsap.fromTo(
        statEl,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statEl,
            start: "top 90%",
            once: true,
          },
        },
      );
    });
  }, cardRef);

  return (
    <div
      ref={cardRef}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center ${
        reversed ? "lg:[&>*:first-child]:order-last" : ""
      }`}
    >
      {/* ── Image Column ── */}
      <div className="lg:col-span-6 relative group">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)]">
          <Image
            src={project.image}
            alt={`${project.title} campaign results`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] via-transparent to-transparent pointer-events-none" />

          {/* Platform badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(0,0,0,0.75)] border border-[rgba(255,157,0,0.35)] text-[10px] font-mono font-bold text-[#FF9D00] tracking-widest uppercase backdrop-blur-sm">
              {project.platform}
            </span>
          </div>
        </div>

        {/* Profile image inset (if available) */}
        {project.profileImage && (
          <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-xl overflow-hidden border-2 border-[rgba(255,255,255,0.12)] shadow-2xl">
            <Image
              src={project.profileImage}
              alt={`${project.client} social profile`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
        )}
      </div>

      {/* ── Content Column ── */}
      <div className="lg:col-span-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono font-bold text-[rgba(247,248,250,0.35)] tracking-widest uppercase">
              {project.index}
            </span>
            <span className="w-8 h-px bg-[rgba(247,248,250,0.15)]" />
            <span className="text-[10px] font-mono font-bold text-[#FF9D00] tracking-widest uppercase">
              {project.category}
            </span>
          </div>

          <h3 className="text-[clamp(1.75rem,2.5vw,2.5rem)] font-black text-[#F7F8FA] tracking-tight leading-tight">
            {project.title}
          </h3>

          <p className="text-base text-[rgba(247,248,250,0.55)] leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-6 border-t border-b border-[rgba(247,248,250,0.07)]">
          {project.stats.map((stat: ProjectStat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="stat-value text-[clamp(1.25rem,2vw,1.75rem)] font-black text-[#FF9D00] tracking-tight tabular-nums">
                {stat.value}
              </span>
              <span className="text-[11px] text-[rgba(247,248,250,0.42)] leading-snug">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Services */}
        <div className="flex flex-wrap gap-2">
          {project.services.map((s: string) => (
            <span
              key={s}
              className="px-3 py-1.5 rounded-full border border-[rgba(247,248,250,0.12)] bg-[rgba(247,248,250,0.03)] text-[11px] font-mono text-[rgba(247,248,250,0.55)] tracking-wide"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
