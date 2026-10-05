/**
 * cn.ts — className utility
 * Merges Tailwind classes safely, resolving conflicts.
 * Thin wrapper so we can swap implementations later.
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
