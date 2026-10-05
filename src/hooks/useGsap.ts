/**
 * useGsap — safe GSAP hook for Next.js (App Router)
 * ─────────────────────────────────────────────────────────────
 * Wraps GSAP context creation and cleanup to prevent memory
 * leaks and double-invocation in React Strict Mode.
 *
 * Usage:
 *   const containerRef = useRef<HTMLDivElement>(null);
 *   useGsap((gsap, ctx) => {
 *     gsap.from(".item", { opacity: 0, y: 40, stagger: 0.1 });
 *     // returned cleanup is handled automatically
 *   }, containerRef);
 */

"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

type GsapContextCallback = (
  gsapInstance: typeof gsap,
  ctx: gsap.Context,
) => void | (() => void);

export function useGsap<T extends HTMLElement = HTMLElement>(
  callback: GsapContextCallback,
  scope?: RefObject<T | null>,
  deps: React.DependencyList = [],
) {
  const savedCallback = useRef<GsapContextCallback>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      savedCallback.current(gsap, self);
    }, scope?.current ?? undefined);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
