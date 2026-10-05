/**
 * design-tokens.ts
 * ─────────────────────────────────────────────────────────────
 * Single source of truth for all design tokens as TypeScript
 * constants. Use these when you need tokens in JS/TS logic
 * (e.g. Three.js colours, GSAP animations, inline styles).
 *
 * The CSS custom-property equivalents live in globals.css.
 */

/* ── Brand Colors ── */
export const colors = {
  black:    "#000000",
  offWhite: "#F7F8FA",
  orange:   "#FF9D00",
  blue:     "#3155E7",

  /* Opacity helpers — black */
  black90: "rgba(0,   0,   0, 0.90)",
  black80: "rgba(0,   0,   0, 0.80)",
  black60: "rgba(0,   0,   0, 0.60)",
  black40: "rgba(0,   0,   0, 0.40)",
  black20: "rgba(0,   0,   0, 0.20)",
  black10: "rgba(0,   0,   0, 0.10)",
  black05: "rgba(0,   0,   0, 0.05)",

  /* Opacity helpers — orange */
  orange90: "rgba(255, 157,   0, 0.90)",
  orange60: "rgba(255, 157,   0, 0.60)",
  orange20: "rgba(255, 157,   0, 0.20)",
  orange10: "rgba(255, 157,   0, 0.10)",

  /* Opacity helpers — blue */
  blue90: "rgba( 49,  85, 231, 0.90)",
  blue60: "rgba( 49,  85, 231, 0.60)",
  blue20: "rgba( 49,  85, 231, 0.20)",
  blue10: "rgba( 49,  85, 231, 0.10)",

  /* Opacity helpers — off-white */
  offWhite90: "rgba(247, 248, 250, 0.90)",
  offWhite60: "rgba(247, 248, 250, 0.60)",
  offWhite20: "rgba(247, 248, 250, 0.20)",
} as const;

/** Hex values only — useful for Three.js `new THREE.Color(hex)` */
export const hexColors = {
  black:    0x000000,
  offWhite: 0xf7f8fa,
  orange:   0xff9d00,
  blue:     0x3155e7,
} as const;

/* ── Typography Scale (rem) ── */
export const fontSizes = {
  xs:   "0.75rem",
  sm:   "0.875rem",
  base: "1rem",
  md:   "1.125rem",
  lg:   "1.25rem",
  xl:   "1.5rem",
  "2xl":"2rem",
  "3xl":"2.5rem",
  "4xl":"3.25rem",
  "5xl":"4.5rem",
  "6xl":"6rem",
  hero: "7.5rem",
} as const;

export const fontWeights = {
  regular:  400,
  medium:   500,
  semibold: 600,
  bold:     700,
  black:    900,
} as const;

/* ── Spacing (rem) ── */
export const spacing = {
  1:  "0.25rem",
  2:  "0.5rem",
  3:  "0.75rem",
  4:  "1rem",
  5:  "1.25rem",
  6:  "1.5rem",
  8:  "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",
  40: "10rem",
  48: "12rem",
} as const;

/* ── Breakpoints (px) ── */
export const breakpoints = {
  sm:  640,
  md:  768,
  lg:  1024,
  xl:  1280,
  "2xl": 1440,
} as const;

/* ── Durations (ms) ── */
export const durations = {
  fast: 150,
  base: 250,
  slow: 400,
  xslow: 800,
} as const;

/* ── Easing (GSAP-compatible strings) ── */
export const easing = {
  out:    "power2.out",
  inOut:  "power2.inOut",
  spring: "back.out(1.5)",
  expo:   "expo.out",
  circ:   "circ.out",
} as const;
