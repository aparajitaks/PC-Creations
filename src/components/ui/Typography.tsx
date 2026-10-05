/**
 * Typography components
 * ─────────────────────────────────────────────────────────────
 * Semantic, strongly-typed heading and text elements that
 * consume the CSS type scale defined in globals.css.
 *
 * Usage:
 *   <Heading level={1} size="hero">Title</Heading>
 *   <Text variant="body-lg" muted>Subtitle copy</Text>
 *   <Label>Category</Label>
 */

import React from "react";
import { cn } from "@/lib/cn";

/* ───────────────────────── Heading ───────────────────────── */
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingSize  = "hero" | "h1" | "h2" | "h3" | "h4" | "h5";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  size?:  HeadingSize;
  /** Off-white colour override — for use on black backgrounds */
  light?: boolean;
}

const headingSizeMap: Record<HeadingSize, string> = {
  hero: "type-hero",
  h1:   "type-h1",
  h2:   "type-h2",
  h3:   "type-h3",
  h4:   "type-h4",
  h5:   "type-h5",
};

const defaultSizeForLevel: Record<HeadingLevel, HeadingSize> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h5",
};

export function Heading({
  level   = 2,
  size,
  light   = false,
  className,
  children,
  ...props
}: HeadingProps) {
  const headingTags = {
    1: "h1",
    2: "h2",
    3: "h3",
    4: "h4",
    5: "h5",
    6: "h6",
  } as const;

  const Tag = headingTags[level] ?? "h2";
  const sizeClass = headingSizeMap[size ?? defaultSizeForLevel[level]];

  return React.createElement(
    Tag,
    {
      className: cn(
        sizeClass,
        light ? "text-[#F7F8FA]" : "text-[#000000]",
        className,
      ),
      ...props,
    },
    children,
  );
}

/* ───────────────────────── Text ───────────────────────── */
type TextVariant = "body-lg" | "body" | "body-sm" | "caption";
type TextAs      = "p" | "span" | "div" | "li";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  /** Reduced-opacity text colour */
  muted?:   boolean;
  /** Off-white text — for dark backgrounds */
  light?:   boolean;
  as?:      TextAs;
}

const textVariantMap: Record<TextVariant, string> = {
  "body-lg":  "type-body-lg",
  "body":     "type-body",
  "body-sm":  "type-body-sm",
  "caption":  "type-caption",
};

export function Text({
  variant  = "body",
  muted    = false,
  light    = false,
  as: Tag  = "p",
  className,
  children,
  ...props
}: TextProps) {
  return React.createElement(
    Tag,
    {
      className: cn(
        textVariantMap[variant],
        !light && !muted && "text-[#000000]",
        muted             && "text-[rgba(0,0,0,0.60)]",
        light             && "text-[rgba(247,248,250,0.80)]",
        className,
      ),
      ...props,
    },
    children,
  );
}

/* ───────────────────────── Label ───────────────────────── */
type LabelColor = "black" | "orange" | "blue";

export interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: LabelColor;
}

const labelColorMap: Record<LabelColor, string> = {
  black:  "text-[rgba(0,0,0,0.50)]",
  orange: "text-[#FF9D00]",
  blue:   "text-[#3155E7]",
};

export function Label({
  color     = "black",
  className,
  children,
  ...props
}: LabelProps) {
  return (
    <span
      className={cn("type-label", labelColorMap[color], className)}
      {...props}
    >
      {children}
    </span>
  );
}

/* ───────────────────────── Mono ───────────────────────── */
export function Mono({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("type-mono text-[rgba(0,0,0,0.50)]", className)}
      {...props}
    >
      {children}
    </span>
  );
}
