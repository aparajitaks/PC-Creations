/**
 * ServicesSection.tsx
 * ─────────────────────────────────────────────────────────────
 * PC Creations — Services (editorial redesign).
 *
 * Composition:
 *   01 / WHAT WE OFFER        — small label
 *   EVERYTHING YOU NEED.      — oversized display heading
 *   NOTHING YOU DON’T.        · muted supporting copy
 *   ────────────────          — hairline divider (orange tick)
 *   12 editorial service modules + orange CTA tile (3-col grid)
 *
 * Hover on any module reveals its mapped creative assets as a
 * miniature 3D collage (see ServiceBlock). The global floating
 * creative layer (FloatingImages) runs above this section.
 */

"use client";

import React, { useEffect, useRef } from "react";
import { useGsap } from "@/hooks/useGsap";
import { SERVICES } from "@/data/services";
import { ServiceBlock } from "./ServiceBlock";
import { FloatingCamera } from "@/components/layout/FloatingCamera";

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  /* Preload service imagery once the section nears the viewport
     so the first hover never waits on the network. */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const urls = SERVICES.flatMap((s) => s.images);
    let done = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done) {
          done = true;
          urls.forEach((src) => {
            const im = new Image();
            im.src = src;
          });
          io.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Entrance choreography (disabled scroll effects) */
  // useGsap((gsap) => {
  //   const el = sectionRef.current;
  //   if (!el) return;

  //   gsap.fromTo(
  //     ".svc-hero-line span",
  //     { yPercent: 115 },
  //     {
  //       yPercent: 0,
  //       duration: 1.1,
  //       ease: "power4.out",
  //       stagger: 0.09,
  //       scrollTrigger: { trigger: el, start: "top 80%", once: true },
  //     },
  //   );

  //   gsap.fromTo(
  //     ".svc-hero-label, .svc-hero-sub",
  //     { opacity: 0, y: 24 },
  //     {
  //       opacity: 1,
  //       y: 0,
  //       duration: 0.9,
  //       ease: "power3.out",
  //       stagger: 0.1,
  //       scrollTrigger: { trigger: el, start: "top 80%", once: true },
  //     },
  //   );

  //   gsap.fromTo(
  //     ".svc-block, .svc-cta, .svc-cta-graphic",
  //     { opacity: 0, y: 40 },
  //     {
  //       opacity: 1,
  //       y: 0,
  //       duration: 0.9,
  //       ease: "power3.out",
  //       stagger: 0.06,
  //       clearProps: "transform",
  //       scrollTrigger: { trigger: ".svc-grid", start: "top 88%", once: true },
  //     },
  //   );
  // }, sectionRef);

  return (
    <section
      id="services"
      ref={sectionRef}
      aria-label="PC Creations Services"
      className="bg-[#F7F8FA] pc-section-major relative"
    >
      {/* ── Camera decorative layer (behind content) ── */}
      <div className="absolute inset-0 z-[5] overflow-hidden">
        <FloatingCamera sectionRef={sectionRef} />
      </div>

      <div className="pc-container relative z-[10]">

        {/* ── Section hero ── */}
        <div className="svc-hero">
          <p className="svc-hero-label type-label">
            <span className="text-[#FF9D00]">03</span>
            <span className="text-[rgba(0,0,0,0.35)]"> / </span>
            What We Offer
          </p>

          <div className="svc-hero-grid">
            <div className="svc-hero-title-wrap">
              <h2 className="svc-hero-title">
                <span className="svc-hero-line"><span>EVERYTHING</span></span>
                <span className="svc-hero-line"><span>YOU NEED.</span></span>
                <span className="svc-hero-line"><span>NOTHING</span></span>
                <span className="svc-hero-line"><span>YOU DON’T.</span></span>
              </h2>
            </div>
            <p className="svc-hero-sub">
              End-to-end digital solutions and high-performance campaigns
              built to make brands impossible to ignore.
            </p>
          </div>

          <div className="svc-hero-rule" aria-hidden="true" />
        </div>

        {/* ── Service grid ── */}
        <div className="svc-grid" data-stagger-group>
          {SERVICES.map((svc, i) => {
            const floatCls =
              i % 3 === 1
                ? i % 6 === 1
                  ? "float-idle-1"
                  : "float-idle-2"
                : "";
            const y = i % 2 === 0 ? 18 : -18;
            const x = i % 3 === 2 ? (i % 6 === 2 ? 12 : -12) : 0;
            return (
              <ServiceBlock
                key={svc.id}
                service={svc}
                extraClass={floatCls}
                scrollY={y}
                scrollX={x}
              />
            );
          })}

          {/* ── CTA tile — the final module ── */}
          <a
            className="svc-cta float-idle-3"
            href="#contact"
            data-scroll-y="-16"
            data-scroll-x="10"
          >
            <span className="svc-cta-plus" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 2v12M2 8h12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <h3 className="svc-cta-title">Not sure where to start?</h3>
            <p className="svc-cta-desc">
              Tell us your goal and timeline — we’ll tell you what you
              actually need.
            </p>
            <div className="svc-cta-foot">
              <span className="svc-cta-btn">
                Start a Project
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M2 14L14 2M14 2H5M14 2v9"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </a>

          {/* ── Right-corner visual illustration ── */}
          <div
            className="svc-cta-graphic"
            aria-hidden="true"
            data-scroll-y="12"
          >
            <img
              src="/images/services/services-cta-character.png"
              alt="Creative Strategy and Marketing Growth"
              className="svc-cta-graphic-img"
              loading="lazy"
              draggable={false}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
