/**
 * ResultsSection.tsx
 * ─────────────────────────────────────────────────────────────
 * PC Creations — "Results" scroll target (navbar item ②).
 *
 * Hosts the Results Gallery (Content Results & Ad Results tabs —
 * Creagenix style). Sits directly beneath the Hero so proof of work
 * is the first thing visitors meet below the fold.
 */

"use client";

import React from "react";
import { ResultsGallery } from "./ResultsGallery";
import { FloatingLottieElements } from "@/components/layout/FloatingLottieElements";

export function ResultsSection() {
  return (
    <section
      id="results"
      aria-label="PC Creations Results"
      className="bg-[#F7F8FA] pt-20 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 lg:pb-16 relative overflow-hidden"
    >
      <div className="pc-container relative z-[10]">
        <ResultsGallery />
      </div>

      {/* ── Floating Lottie Elements (fills whitespace to Reviews) ── */}
      <div className="absolute inset-0 top-[60%] pointer-events-none z-[5]">
        <FloatingLottieElements />
      </div>
    </section>
  );
}
