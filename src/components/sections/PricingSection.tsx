/**
 * PricingSection.tsx
 * ─────────────────────────────────────────────────────────────
 * PC Creations — Pricing plans from Company Overview PDF (Page 2).
 *
 * SOURCE: "PRICING — Choose Your Plan" section of the PDF.
 * All plan names, features and copy taken verbatim.
 *
 * THREE PLANS:
 *   Basic    → Starter Pack
 *   Standard → Growth Pack   (highlighted)
 *   Custom   → Premium Pack
 *
 * NOTE: No prices are shown — the PDF has none. CTA goes to contact.
 */

"use client";

import React, { useRef } from "react";
import { useGsap } from "@/hooks/useGsap";
import { cn } from "@/lib/cn";

interface Plan {
  tier:     string;
  name:     string;
  tagline:  string;
  features: string[];
  featured: boolean;
  cta:      string;
}

// Verbatim from PDF
const PLANS: Plan[] = [
  {
    tier:    "BASIC",
    name:    "Starter Pack",
    tagline: "Everything you need to get started.",
    featured: false,
    cta:     "Get Started",
    features: [
      "Instagram & Facebook",
      "Google My Business",
      "YouTube",
      "META Ads & Google Ads",
      "Video editing",
      "Graphic designing",
      "Content creation",
      "Monthly report",
      "Voice mail",
      "Festival poster",
      "Ad budget excluded",
    ],
  },
  {
    tier:    "STANDARD",
    name:    "Growth Pack",
    tagline: "The most popular choice for scaling brands.",
    featured: true,
    cta:     "Start Growing",
    features: [
      "Instagram & Facebook",
      "Google My Business",
      "YouTube",
      "META Ads & Google Ads",
      "Video editing",
      "Graphic designing",
      "Content creation",
      "Monthly report",
      "Voice mail",
      "Festival poster",
      "Ad budget excluded",
      "TV channel news ads (1–2)",
      "Priority support",
      "Advanced reporting",
    ],
  },
  {
    tier:    "CUSTOMIZED",
    name:    "Premium Pack",
    tagline: "Full-stack marketing for ambitious brands.",
    featured: false,
    cta:     "Go Premium",
    features: [
      "Everything in Standard",
      "LinkedIn management",
      "Influencer marketing",
      "Two photo tools",
      "One podcast",
      "S&D management",
      "Website management",
      "TV channel news ads (1–2)",
    ],
  },
];

const CHECK_ICON = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
    <path d="M2 7l4 4 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsap((gsap) => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(".pricing-header",
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      },
    );

    gsap.fromTo(".pricing-card",
      { opacity: 0, y: 40, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: ".pricing-grid", start: "top 82%", once: true },
      },
    );
  }, sectionRef);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      aria-label="PC Creations Pricing"
      className="bg-[#000000] py-28 sm:py-36 lg:py-44 overflow-hidden relative"
    >
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[rgba(49,85,231,0.05)] pointer-events-none blur-3xl" aria-hidden="true" />

      <div className="pc-container relative z-10">

        {/* ── Section Header ── */}
        <div className="pricing-header reveal-up mb-20 sm:mb-24 text-center max-w-2xl mx-auto">
          <p className="text-[11px] font-mono font-bold text-[#FF9D00] tracking-widest uppercase mb-4">
            Pricing & Packages
          </p>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black text-[#F7F8FA] tracking-tight leading-[0.95] mb-6">
            Choose Your Plan
          </h2>
          <p className="text-base sm:text-lg text-[rgba(247,248,250,0.55)] leading-relaxed">
            Transparent, high-performance packages designed around your brand&apos;s growth velocity.
          </p>
        </div>

        {/* ── Cards Grid ── */}
        <div className="pricing-grid grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8 xl:gap-10 items-stretch" data-stagger-group>
          {PLANS.map((plan, i) => {
            const scrollY = i === 0 ? 22 : i === 1 ? 0 : -22;
            const floatCls = plan.featured ? "float-idle-2" : "";
            return (
              <div
                key={plan.tier}
                data-stagger-child
                data-scroll-y={String(scrollY)}
                className={cn(
                  `pricing-card card-hover-premium relative flex flex-col justify-between rounded-3xl transition-all duration-300 p-8 sm:p-10 lg:p-11 ${floatCls}`,
                  plan.featured
                    ? "border-2 border-[#FF9D00] bg-[rgba(255,157,0,0.035)] shadow-[0_0_50px_rgba(255,157,0,0.12)]"
                    : "border border-[rgba(247,248,250,0.10)] bg-[rgba(247,248,250,0.02)] hover:border-[rgba(247,248,250,0.22)]",
                )}
              >
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#FF9D00] text-[#000000] text-[10px] font-mono font-bold tracking-widest uppercase">
                  RECOMMENDED
                </div>
              )}

              {/* Top part: Tier & features */}
              <div className="flex flex-col flex-1">
                {/* Tier & name */}
                <div className="pb-8 border-b border-[rgba(247,248,250,0.08)]">
                  <span className={cn(
                    "text-[10px] font-mono font-bold tracking-[0.2em] uppercase",
                    plan.featured ? "text-[#FF9D00]" : "text-[rgba(247,248,250,0.45)]",
                  )}>
                    {plan.tier}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#F7F8FA] mt-2 tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-[rgba(247,248,250,0.52)] mt-2 leading-relaxed">
                    {plan.tagline}
                  </p>
                </div>

                {/* Feature list */}
                <ul className="flex flex-col gap-3.5 py-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className={cn(
                      "flex items-start gap-3 text-sm leading-snug",
                      plan.featured ? "text-[#F7F8FA]" : "text-[rgba(247,248,250,0.72)]",
                    )}>
                      <span className={plan.featured ? "text-[#FF9D00]" : "text-[rgba(247,248,250,0.40)]"}>
                        {CHECK_ICON}
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom CTA */}
              <div className="pt-6 border-t border-[rgba(247,248,250,0.08)]">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={cn(
                    "block w-full text-center text-sm font-bold tracking-wider uppercase px-8 py-4 rounded-full transition-all duration-300",
                    plan.featured
                      ? "bg-[#FF9D00] text-[#000000] hover:bg-[#F7F8FA]"
                      : "border border-[rgba(247,248,250,0.25)] text-[#F7F8FA] hover:border-[#FF9D00] hover:text-[#FF9D00]",
                  )}
                >
                  {plan.cta}
                </a>
              </div>
            </div>
            );
          })}
        </div>

        {/* Note */}
        <p className="text-center text-xs text-[rgba(247,248,250,0.35)] mt-12 font-mono">
          Ad budget not included. Contact us for custom deliverables and enterprise retainers.
        </p>

      </div>
    </section>
  );
}
