/**
 * Card component
 * ─────────────────────────────────────────────────────────────
 * A flexible surface container with optional padding, border,
 * and hover-lift animation. Uses only brand design tokens.
 *
 * Sub-components:
 *   Card          → root wrapper
 *   CardHeader    → top section (title/description)
 *   CardBody      → main content area
 *   CardFooter    → bottom action area
 */

import React from "react";
import { cn } from "@/lib/cn";

/* ── Card ── */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds a subtle border */
  bordered?: boolean;
  /** Adds hover lift + shadow effect */
  hoverable?: boolean;
  /** Remove default padding */
  noPadding?: boolean;
}

export function Card({
  bordered   = true,
  hoverable  = false,
  noPadding  = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-[12px]",
        !noPadding && "p-6",
        bordered   && "border border-[rgba(0,0,0,0.08)]",
        hoverable  &&
          "transition-all duration-[250ms] ease-out cursor-pointer " +
          "hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ── CardHeader ── */
export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn("flex flex-col gap-1 mb-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

/* ── CardTitle ── */
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h2" | "h3" | "h4" | "h5" | "h6";
}

export function CardTitle({
  as: Tag  = "h3",
  className,
  children,
  ...props
}: CardTitleProps) {
  return (
    <Tag
      className={cn(
        "text-[#000000] font-semibold leading-snug tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* ── CardDescription ── */
export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-[rgba(0,0,0,0.60)] text-sm leading-relaxed", className)}
      {...props}
    >
      {children}
    </p>
  );
}

/* ── CardBody ── */
export function CardBody({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}

/* ── CardFooter ── */
export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center mt-4 pt-4 border-t border-[rgba(0,0,0,0.08)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
