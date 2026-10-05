/**
 * Section component
 * ─────────────────────────────────────────────────────────────
 * Standardises page section spacing, max-width, and background
 * options across the entire site.
 *
 * Props:
 *   bg         → "default" | "black" | "off-white" | "white"
 *   container  → apply inner container constraint (default true)
 *   id         → HTML id for anchor links / scroll targets
 */

import React from "react";
import { cn } from "@/lib/cn";

type BgVariant = "default" | "black" | "off-white" | "white";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  bg?:        BgVariant;
  container?: boolean;
  as?:        "section" | "div" | "article" | "aside";
}

const bgClasses: Record<BgVariant, string> = {
  "default":   "bg-[#F7F8FA]",
  "off-white": "bg-[#F7F8FA]",
  "white":     "bg-white",
  "black":     "bg-[#000000] text-[#F7F8FA]",
};

export function Section({
  bg        = "default",
  container = true,
  as: Tag   = "section",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(
        "w-full",
        "[padding-block:clamp(4rem,5vw+2rem,8rem)]",
        bgClasses[bg],
        className,
      )}
      {...props}
    >
      {container ? (
        <div className="container-site">{children}</div>
      ) : (
        children
      )}
    </Tag>
  );
}
