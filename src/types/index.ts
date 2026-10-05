/**
 * Shared TypeScript types and interfaces
 * ─────────────────────────────────────────────────────────────
 * Central place for site-wide types. Import from "@/types".
 */

/* ── Navigation ── */
export interface NavLink {
  label:    string;
  href:     string;
  external?: boolean;
}

/* ── Brand Color Keys ── */
export type BrandColor = "black" | "off-white" | "orange" | "blue";

/* ── Component Variants ── */
export type ButtonVariant  = "primary" | "secondary" | "ghost" | "blue";
export type ButtonSize     = "sm" | "md" | "lg";
export type BadgeVariant   = "default" | "orange" | "blue" | "outline";
export type SectionBg      = "default" | "off-white" | "white" | "black";

/* ── Content block stubs (filled in content phase) ── */
export interface ServiceItem {
  id:          string;
  title:       string;
  description: string;
  icon?:       string; /* Lottie JSON path or icon name */
}

export interface CaseStudy {
  id:       string;
  title:    string;
  client:   string;
  category: string;
  year:     number;
  slug:     string;
}

export interface Insight {
  id:          string;
  title:       string;
  excerpt:     string;
  category:    string;
  publishedAt: string;
  slug:        string;
}

/* ── Lottie animation JSON (generic) ── */
export type LottieData = Record<string, unknown>;
