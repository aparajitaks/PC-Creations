/**
 * ReviewsSection.tsx
 * ─────────────────────────────────────────────────────────────
 * PC Creations — "Reviews" scroll target (navbar item ③).
 *
 * Hosts:
 *   ① In Their Words — client video reel + verified Google reviews
 *   ② CTA strip — "Want results like these?" (closes on social proof)
 */

"use client";

import React from "react";
import { GoogleReviews } from "./GoogleReviews";

export function ReviewsSection() {
  return (
    <section
      id="reviews"
      aria-label="PC Creations Client Reviews"
      className="bg-[#F7F8FA] pt-20 sm:pt-28 lg:pt-32 pb-20 sm:pb-28 lg:pb-32"
    >
      <div className="pc-container">
        {/* ── Video + Google Reviews (Creagenix style) ── */}
        <GoogleReviews />

        {/* ── CTA Strip ── */}
        <div
          className="mt-28 sm:mt-36 border-t border-[rgba(0,0,0,0.10)] pt-16 flex flex-col sm:flex-row items-center justify-between gap-6 reveal-up"
          data-reveal-delay="240"
        >
          <div>
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black text-[#000000] tracking-tight leading-[0.95]">
              BUILD BRAND
              <br />
              <span className="text-[#FF9D00]">NOT BUSINESS</span>
            </h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#FF9D00] text-[#000000] text-sm font-bold tracking-wider uppercase px-8 py-4 rounded-full hover:bg-[#000000] hover:text-[#F7F8FA] transition-all duration-300 shrink-0"
          >
            Start a Project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 7h12M8 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
