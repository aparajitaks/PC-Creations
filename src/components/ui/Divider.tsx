/**
 * Divider component
 * Thin horizontal rule using the brand border token.
 * Optional vertical orientation.
 */

import React from "react";
import { cn } from "@/lib/cn";

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
  color?:       "subtle" | "strong" | "orange" | "blue";
}

const colorMap = {
  subtle: "bg-[rgba(0,0,0,0.08)]",
  strong: "bg-[rgba(0,0,0,0.20)]",
  orange: "bg-[#FF9D00]",
  blue:   "bg-[#3155E7]",
};

export function Divider({
  orientation = "horizontal",
  color       = "subtle",
  className,
  ...props
}: DividerProps) {
  return (
    <hr
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "border-none shrink-0",
        colorMap[color],
        orientation === "horizontal" ? "w-full h-px" : "h-full w-px",
        className,
      )}
      {...props}
    />
  );
}
