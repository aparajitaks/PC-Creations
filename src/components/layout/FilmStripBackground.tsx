"use client";

import React, { useRef, useEffect } from "react";

/**
 * FilmStripBackground
 * ─────────────────────────────────────────────────────────────
 * A subtle, seamless, looping film-strip traveling through the
 * website background. Fixed, pointer-events: none.
 * Respects prefers-reduced-motion.
 *
 * PERFORMANCE (this file):
 *   • No React state — zero re-renders after mount.
 *   • Reduced-motion detected synchronously inside an effect; a
 *     CSS class hides the layer rather than returning null so we
 *     never trigger setState-in-effect cascades.
 *   • SVG animateMotion (CPU SVG engine) replaced with a single
 *     shared CSS @keyframes transform on the <image> using
 *     translate3d for pure-GPU compositing. The path shape is
 *     approximated with a gentle 6-waypoint drift that matches
 *     the original S-curve "winding" visual feel.
 *   • ScrollAnimations still reads #filmstrip-img for a tiny
 *     scroll-linked translateY parallax; both transforms stack.
 */

const FILM_SRC = "/images/floating images/anim/_.png";

/**
 * Returns a CSS @keyframes string that approximates the original
 * SVG bezier S-curve (see TRACK_PATH in a previous revision) with
 * waypoint-percentage transforms. We avoid the SVG engine for the
 * repetitive loop because browsers often schedule SMIL on the main
 * thread, while CSS keyframes are promoted to the compositor.
 *
 * Travel is bounded inside the filmstrip's own SVG viewBox so the
 * decorative clip never leaves its fixed slot.
 */
const DRIFT_KEYFRAMES = `
@keyframes filmstrip-css-drift {
  0%   { transform: translate3d(2%, 6%, 0) rotate(-3deg); }
  20%  { transform: translate3d(18%, -10%, 0) rotate(-1deg); }
  40%  { transform: translate3d(32%, 8%, 0) rotate(1deg); }
  60%  { transform: translate3d(14%, 22%, 0) rotate(2deg); }
  80%  { transform: translate3d(-6%, 12%, 0) rotate(0deg); }
  100% { transform: translate3d(2%, 6%, 0) rotate(-3deg); }
}`;

export function FilmStripBackground() {
  const rootRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const root = rootRef.current;
    if (!root) return;

    if (reduced) {
      root.style.setProperty("display", "none");
    }

    // No cleanup needed — we never mutate state, only DOM style
    // on the SVG itself. A display:none pin is sufficient for PRM
    // because the fixed layer no longer paints.
  }, []);

  return (
    <>
      {/* Inject keyframes once globally (idempotent, no React state) */}
      <style
        data-filmstrip-keyframes
        dangerouslySetInnerHTML={{ __html: DRIFT_KEYFRAMES }}
      />

      <svg
        ref={rootRef}
        id="filmstrip-svg"
        aria-hidden="true"
        className="fixed inset-0 w-full h-full pointer-events-none select-none"
        style={{
          zIndex: 15,
          willChange: "transform",
        }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <clipPath id="filmstrip-clip">
            <rect x="0" y="0" width="1440" height="900" />
          </clipPath>
        </defs>

        {/* id="filmstrip-img" is targeted by ScrollAnimations for
            a tiny additive scroll parallax (translateY). The primary
            drift animation runs via pure CSS below. */}
        <g clipPath="url(#filmstrip-clip)">
          <image
            id="filmstrip-img"
            href={FILM_SRC}
            x="-240"
            y="-240"
            width="520"
            height="520"
            style={{
              opacity: 0.13,
              filter: "blur(0.4px)",
              willChange: "transform",
              animation:
                "filmstrip-css-drift 92s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite",
            }}
          />
        </g>
      </svg>
    </>
  );
}
