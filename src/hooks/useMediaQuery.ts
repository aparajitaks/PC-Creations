/**
 * useMediaQuery — responsive breakpoint hook
 * ─────────────────────────────────────────────────────────────
 * Returns true when the provided media query matches.
 *
 * Usage:
 *   const isMobile = useMediaQuery("(max-width: 640px)");
 *   const isDesktop = useMediaQuery("(min-width: 1024px)");
 */

"use client";

import { useSyncExternalStore, useCallback } from "react";

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia(query);
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    [query],
  );

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  }, [query]);

  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/* Convenience breakpoint hooks aligned to design-tokens.ts */
export const useIsMobile  = () => useMediaQuery("(max-width: 639px)");
export const useIsTablet  = () => useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
