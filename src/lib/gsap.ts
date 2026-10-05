/**
 * gsap.ts — GSAP singleton & plugin registration
 * ─────────────────────────────────────────────────────────────
 * Import from here instead of `gsap` directly so plugins are
 * registered exactly once across the entire app.
 *
 * Usage:
 *   import { gsap } from "@/lib/gsap";
 *   import { ScrollTrigger } from "@/lib/gsap";
 */

"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register all plugins once
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Set GSAP defaults to match our design system durations
gsap.defaults({
  ease:     "power2.out",
  duration: 0.4,
});

export { gsap, ScrollTrigger, ScrollToPlugin };
