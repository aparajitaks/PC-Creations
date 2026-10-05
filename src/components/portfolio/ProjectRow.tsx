/**
 * ProjectRow.tsx
 * ─────────────────────────────────────────────────────────────
 * Editorial expandable project row.
 *
 * Collapsed: index — client name — category — thumbnail peek — expand icon
 * Expanded:  Full image + detail panel (description, services, stats, CTA)
 *
 * GSAP:
 *   - Detail panel: clip-path + height reveal on open
 *   - Image: scale + brightness on hover (CSS transition, no GSAP overhead)
 *   - Thumbnail: opacity/translate on row hover (GSAP quickTo)
 */

"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { Project } from "./portfolioData";

interface ProjectRowProps {
  project: Project;
  enterDelay: number;
}

export function ProjectRow({ project, enterDelay }: ProjectRowProps) {
  const [isOpen, setIsOpen]   = useState(false);
  const rowRef                = useRef<HTMLDivElement>(null);
  const detailRef             = useRef<HTMLDivElement>(null);
  const thumbRef              = useRef<HTMLDivElement>(null);
  const tlRef                 = useRef<gsap.core.Timeline | null>(null);

  // ── Scroll-triggered row entrance ──
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        row,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          delay: enterDelay,
          scrollTrigger: {
            trigger: row,
            start: "top 88%",
            once: true,
          },
        },
      );
    });
    return () => ctx.revert();
  }, [enterDelay]);

  // ── Detail panel expand / collapse (GSAP height + clip-path) ──
  useEffect(() => {
    const detail = detailRef.current;
    if (!detail) return;

    if (isOpen) {
      // Measure natural height
      detail.style.display = "block";
      const h = detail.scrollHeight;
      detail.style.height = "0px";
      detail.style.opacity = "0";
      detail.style.overflow = "hidden";

      gsap.to(detail, {
        height: h,
        opacity: 1,
        duration: 0.65,
        ease: "power3.inOut",
        onComplete: () => {
          // Remove fixed height so content reflows naturally
          detail.style.height = "auto";
          detail.style.overflow = "visible";
        },
      });
    } else {
      const h = detail.scrollHeight;
      detail.style.height = `${h}px`;
      detail.style.overflow = "hidden";

      gsap.to(detail, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          detail.style.display = "none";
        },
      });
    }
  }, [isOpen]);

  // Init: hide detail
  useEffect(() => {
    const detail = detailRef.current;
    if (detail) {
      detail.style.display = "none";
      detail.style.height = "0px";
      detail.style.opacity = "0";
    }
  }, []);

  // ── Thumbnail hover: quickTo for smooth follow ──
  const thumbXTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const thumbYTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useEffect(() => {
    const thumb = thumbRef.current;
    if (!thumb) return;
    thumbXTo.current = gsap.quickTo(thumb, "x", { duration: 0.4, ease: "power2.out" });
    thumbYTo.current = gsap.quickTo(thumb, "y", { duration: 0.4, ease: "power2.out" });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    thumbXTo.current?.(x * 0.08);
    thumbYTo.current?.(y * 0.08);
  }, []);

  const handleMouseLeave = useCallback(() => {
    thumbXTo.current?.(0);
    thumbYTo.current?.(0);
  }, []);

  return (
    <div ref={rowRef} className="border-b border-[rgba(0,0,0,0.09)] last:border-b-0">

      {/* ── Row Header (spacious editorial row, click to expand) ── */}
      <button
        className="group w-full text-left py-8 sm:py-12 lg:py-14 flex items-center gap-4 sm:gap-8 lg:gap-10 transition-colors duration-300 hover:bg-[rgba(0,0,0,0.015)] px-2 sm:px-4 rounded-xl cursor-pointer"
        onClick={() => setIsOpen((o) => !o)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-expanded={isOpen}
        aria-controls={`project-detail-${project.id}`}
      >
        {/* Index */}
        <span className="shrink-0 text-xs sm:text-sm font-mono font-bold text-[rgba(0,0,0,0.30)] tracking-widest w-6 sm:w-8">
          {project.index}
        </span>

        {/* Divider dot */}
        <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[rgba(0,0,0,0.18)]" />

        {/* Client name — dominant editorial typography */}
        <span className="flex-1 min-w-0 text-2xl sm:text-4xl lg:text-5xl font-black text-[#000000] tracking-tight leading-tight transition-colors duration-300 group-hover:text-[#3155E7] truncate">
          {project.client}
        </span>

        {/* Category chip — secondary */}
        <span className="hidden md:inline-flex shrink-0 items-center text-xs font-mono font-bold tracking-widest uppercase text-[#3155E7] bg-[rgba(49,85,231,0.06)] border border-[rgba(49,85,231,0.20)] px-3.5 py-1.5 rounded-full">
          {project.category}
        </span>

        {/* Thumbnail peek — supporting visual, emerges smoothly on hover */}
        <div
          ref={thumbRef}
          className="shrink-0 relative w-16 h-12 sm:w-24 sm:h-16 lg:w-28 lg:h-18 rounded-xl overflow-hidden bg-[rgba(0,0,0,0.06)] border border-[rgba(0,0,0,0.08)] shadow-sm transition-all duration-400 ease-out opacity-70 group-hover:opacity-100 group-hover:scale-105"
          aria-hidden="true"
        >
          <img
            src={project.image}
            alt=""
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        </div>

        {/* Platform label */}
        <span className="hidden lg:inline shrink-0 text-xs font-mono font-bold text-[rgba(0,0,0,0.38)] tracking-widest uppercase w-20 text-right">
          {project.platform}
        </span>

        {/* Expand button — clear interaction */}
        <span
          className="shrink-0 w-10 h-10 rounded-full border border-[rgba(0,0,0,0.16)] flex items-center justify-center text-[#000000] transition-all duration-300 group-hover:border-[#000000] group-hover:bg-[#000000] group-hover:text-[#F7F8FA]"
          aria-hidden="true"
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.35s ease, background 0.2s, border 0.2s" }}
        >
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </span>
      </button>

      {/* ── Expanded Detail Panel ── */}
      <div
        ref={detailRef}
        id={`project-detail-${project.id}`}
        role="region"
        aria-label={`${project.client} project details`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-18 pb-16 pt-4 px-2 sm:px-4">

          {/* Image — full screenshot, natural height */}
          <div className="relative rounded-2xl bg-[#000000] shadow-2xl border border-[rgba(0,0,0,0.08)]">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={project.image}
                alt={`${project.client} — campaign results`}
                className="w-full h-auto"
                style={{ objectFit: "contain" }}
                loading="lazy"
              />
            </div>
            {/* Platform badge */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[rgba(0,0,0,0.75)] backdrop-blur-sm text-[#F7F8FA] text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full font-mono border border-[rgba(255,255,255,0.12)]">
              <span className="size-1.5 rounded-full bg-[#FF9D00]" />
              {project.platform}
            </div>
            {/* Profile badge */}
            {project.profileImage && (
              <div className="absolute -bottom-4 right-5 w-36 rounded-xl overflow-hidden shadow-xl border-2 border-[#F7F8FA]">
                <img
                  src={project.profileImage}
                  alt={`${project.client} social profile`}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center gap-6">
            {/* Category */}
            <span className="text-xs font-mono font-bold text-[#3155E7] tracking-widest uppercase">
              {project.category}
            </span>

            {/* Title */}
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#000000] leading-tight tracking-tight">
              {project.client}
            </h3>

            {/* Description */}
            <p className="text-base sm:text-lg text-[rgba(0,0,0,0.64)] leading-relaxed">
              {project.description}
            </p>

            {/* Services */}
            <div className="flex flex-wrap gap-2.5">
              {project.services.map((s) => (
                <span
                  key={s}
                  className="text-xs font-semibold tracking-wider uppercase px-3.5 py-2 rounded-full border border-[rgba(0,0,0,0.12)] text-[rgba(0,0,0,0.60)] bg-white shadow-2xs"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-[rgba(0,0,0,0.08)]">
              {project.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black text-[#000000] tracking-tight leading-none">
                    {stat.value}
                  </span>
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-[rgba(0,0,0,0.48)] leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-3">
              <button
                className="inline-flex items-center gap-2.5 bg-[#FF9D00] text-[#000000] text-sm font-bold tracking-wider uppercase px-8 py-4 rounded-full hover:bg-[#000000] hover:text-[#F7F8FA] transition-all duration-300"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Start a Similar Campaign
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
