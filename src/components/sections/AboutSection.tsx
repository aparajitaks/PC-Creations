/**
 * AboutSection.tsx
 * ─────────────────────────────────────────────────────────────
 * PC Creations — About the agency.
 *
 * CONTENT:
 *   Only verified content from actual PC Creations project files:
 *   - banner_theme.jpg  — brand banner (real asset)
 *   - founder.jpg       — real photo
 *   - Brand tagline "Build brand, Not business" (from banner_theme.jpg)
 *   - "In a digital world, be the trend — not the follower" (from banner_theme.jpg)
 *
 *   No fake stats. No fake history. No invented awards.
 *
 * ANIMATIONS:
 *   GSAP ScrollTrigger:
 *   - Headline split reveal (clip-path + y)
 *   - Image parallax on scroll
 *   - Process items stagger
 */

"use client";

import React, { useRef } from "react";
import { useGsap } from "@/hooks/useGsap";

export function AboutSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const imageRef    = useRef<HTMLDivElement>(null);

  // ── Headline + content reveal (disabled scroll effects) ──
  // useGsap((gsap) => {
  //   const el = sectionRef.current;
  //   if (!el) return;

  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: el,
  //       start: "top 80%",
  //       once: true,
  //     },
  //   });

  //   tl.fromTo(".about-eyebrow",
  //     { opacity: 0, y: 20 },
  //     { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
  //   )
  //   .fromTo(".about-headline .line",
  //     { opacity: 0, y: 50, skewY: 1.5 },
  //     { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "power3.out", stagger: 0.13 },
  //     "-=0.3",
  //   )
  //   .fromTo(".about-body",
  //     { opacity: 0, y: 24 },
  //     { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1 },
  //     "-=0.6",
  //   )
  //   .fromTo(".about-pill",
  //     { opacity: 0, scale: 0.85 },
  //     { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)", stagger: 0.07 },
  //     "-=0.5",
  //   )
  //   .fromTo(".about-image-wrap",
  //     { opacity: 0, x: 60, scale: 0.96 },
  //     { opacity: 1, x: 0, scale: 1, duration: 1.1, ease: "power3.out" },
  //     0.1,
  //   );
  // }, sectionRef);

  // ── Image scroll parallax (disabled) ──
  // useGsap((gsap) => {
  //   const img = imageRef.current;
  //   if (!img) return;
  //   gsap.to(img, {
  //     y: -40,
  //     ease: "none",
  //     scrollTrigger: {
  //       trigger: img,
  //       start: "top bottom",
  //       end: "bottom top",
  //       scrub: 1.2,
  //     },
  //   });
  // }, imageRef);

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-label="About PC Creations"
      className="bg-[#000000] py-28 sm:py-36 lg:py-44 overflow-hidden"
    >
      <div className="pc-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">

          {/* ── LEFT: Editorial Statement & Narrative (7 cols) ── */}
          <div className="lg:col-span-7 flex flex-col gap-8 sm:gap-10">

            {/* Eyebrow */}
            <p className="about-eyebrow text-[11px] font-mono font-bold text-[#FF9D00] tracking-widest uppercase">
              05 / About PC Creations
            </p>

            {/* Headline */}
            <h2 className="about-headline overflow-hidden">
              <span className="line block text-[clamp(2.5rem,4.5vw,4.25rem)] font-black text-[#F7F8FA] tracking-tight leading-[0.94]">
                Digital Marketing
              </span>
              <span className="line block text-[clamp(2.5rem,4.5vw,4.25rem)] font-black text-[#F7F8FA] tracking-tight leading-[0.94] mt-1 sm:mt-2">
                That Builds
              </span>
              <span className="line block text-[clamp(2.5rem,4.5vw,4.25rem)] font-black text-[#FF9D00] tracking-tight leading-[0.94] mt-1 sm:mt-2">
                Real Brands.
              </span>
            </h2>

            {/* Body copy — from verified PC Creations banner */}
            <div className="flex flex-col gap-5 max-w-xl">
              <p className="about-body text-lg sm:text-xl text-[rgba(247,248,250,0.72)] leading-relaxed font-normal">
                PC Creations is a digital marketing agency built around one belief:
                in a digital world, be the trend — not the follower.
              </p>
              <p className="about-body text-base text-[rgba(247,248,250,0.52)] leading-relaxed">
                We combine performance marketing, social media management, and
                content strategy to grow brands that matter — not just businesses
                that exist.
              </p>
            </div>

            {/* What we do — service pills */}
            <div className="flex flex-wrap gap-2.5">
              {[
                "Meta Ads",
                "Social Media Management",
                "Performance Marketing",
                "Lead Generation",
                "Content Strategy",
                "Brand Building",
              ].map((s) => (
                <span
                  key={s}
                  className="about-pill text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full border border-[rgba(247,248,250,0.14)] text-[rgba(247,248,250,0.60)] bg-[rgba(247,248,250,0.03)] hover:border-[#FF9D00] hover:text-[#FF9D00] transition-colors duration-200"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Tagline bar */}
            <div className="about-body border-l-2 border-[#FF9D00] pl-5 mt-2">
              <p className="text-lg font-semibold text-[#FF9D00] italic leading-snug">
                &ldquo;Build brand, Not business.&rdquo;
              </p>
              <p className="text-xs font-mono text-[rgba(247,248,250,0.40)] tracking-wider mt-1 uppercase">
                PC Creations — Core Philosophy
              </p>
            </div>
          </div>

          {/* ── RIGHT: Founder Portrait & Brand Identity (5 cols) ── */}
          <div className="lg:col-span-5 about-image-wrap relative flex flex-col gap-6" data-scroll-x="15">

            {/* Founder photo */}
            <div
              ref={imageRef}
              className="reveal-img relative overflow-hidden rounded-3xl border border-[rgba(247,248,250,0.12)] shadow-2xl bg-[#0e0e10]"
              style={{ aspectRatio: "4/5" }}
            >
              <img
                src="/assets/founder.jpg"
                alt="PC Creations founder"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Subtle bottom shadow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-50" />
              {/* Index label */}
              <div className="absolute bottom-6 left-6">
                <span className="text-[11px] font-mono font-bold text-[#FF9D00] tracking-widest uppercase bg-[rgba(0,0,0,0.60)] backdrop-blur-sm px-3 py-1.5 rounded-full border border-[rgba(255,157,0,0.30)]">
                  PC Creations Studio
                </span>
              </div>
            </div>

            {/* Brand banner strip */}
            <div className="reveal-scale relative overflow-hidden rounded-2xl border border-[rgba(247,248,250,0.10)] bg-[#0e0e10]">
              <img
                src="/assets/banner_theme.jpg"
                alt="PC Creations Digital Marketing Agency"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
