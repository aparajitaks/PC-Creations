/**
 * Badge component
 * Small label chip — used for tags, statuses, and category labels.
 *
 * Variants:
 *   default  → black/off-white
 *   orange   → orange highlight
 *   blue     → electric blue (tech/digital context)
 *   outline  → outlined, transparent background
 */

import React from "react";
import { cn } from "@/lib/cn";

type Variant = "default" | "orange" | "blue" | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  default: "bg-[rgba(0,0,0,0.08)] text-[#000000]",
  orange:  "bg-[rgba(255,157,0,0.12)] text-[#FF9D00]",
  blue:    "bg-[rgba(49,85,231,0.10)] text-[#3155E7]",
  outline: "border border-[rgba(0,0,0,0.15)] text-[#000000] bg-transparent",
};

export function Badge({
  variant   = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full",
        "text-[11px] font-semibold tracking-widest uppercase",
        "select-none whitespace-nowrap",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
