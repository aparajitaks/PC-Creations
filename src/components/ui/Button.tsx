/**
 * Button component
 * ─────────────────────────────────────────────────────────────
 * Variants:
 *   primary  → orange CTA (filled)
 *   secondary→ black outline
 *   ghost    → transparent, subtle hover
 *   blue     → electric-blue filled (digital/tech contexts)
 *
 * Sizes: sm | md | lg
 */

import React from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "blue";
type Size    = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?:    Size;
  asChild?: boolean;
  /** Render as an anchor tag */
  href?:    string;
  /** Icon slot (left) */
  iconLeft?: React.ReactNode;
  /** Icon slot (right) */
  iconRight?: React.ReactNode;
  loading?:  boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[#FF9D00] text-[#000000] border border-[#FF9D00] " +
    "hover:bg-[#FF9D00]/90 active:scale-[0.98]",
  secondary:
    "bg-transparent text-[#000000] border border-[#000000] " +
    "hover:bg-[#000000] hover:text-[#F7F8FA] active:scale-[0.98]",
  ghost:
    "bg-transparent text-[#000000] border border-transparent " +
    "hover:bg-[rgba(0,0,0,0.05)] active:scale-[0.98]",
  blue:
    "bg-[#3155E7] text-[#F7F8FA] border border-[#3155E7] " +
    "hover:bg-[#3155E7]/90 active:scale-[0.98]",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9  px-4  text-xs  gap-1.5 rounded-[6px]",
  md: "h-11 px-6  text-sm  gap-2   rounded-[8px]",
  lg: "h-14 px-8  text-base gap-2.5 rounded-[10px]",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant  = "primary",
      size     = "md",
      className,
      children,
      iconLeft,
      iconRight,
      loading  = false,
      disabled,
      href,
      ...props
    },
    ref,
  ) => {
    const base =
      "inline-flex items-center justify-center font-semibold tracking-tight " +
      "transition-all duration-[250ms] ease-out select-none whitespace-nowrap " +
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3155E7] focus-visible:ring-offset-2 " +
      "disabled:pointer-events-none disabled:opacity-40";

    const classes = cn(base, variantClasses[variant], sizeClasses[size], className);

    const content = (
      <>
        {loading && (
          <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {!loading && iconLeft && <span className="shrink-0">{iconLeft}</span>}
        <span>{children}</span>
        {!loading && iconRight && <span className="shrink-0">{iconRight}</span>}
      </>
    );

    if (href) {
      return (
        <a href={href} className={classes}>
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={classes}
        {...props}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";
