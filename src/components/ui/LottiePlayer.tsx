/**
 * LottiePlayer.tsx
 * ─────────────────────────────────────────────────────────────
 * Lottie animation wrapper for lottie-react v3.x.
 *
 * v3 API: useLottie({ src, loop, autoplay, speed, subscriptions })
 * returns LottieInstance with setDisplayRef — attach to the container div.
 * Speed is reactive through the options, no need for imperative setSpeed.
 */

"use client";

import React from "react";
import { useLottie } from "lottie-react";
import { cn } from "@/lib/cn";

export interface LottiePlayerProps {
  /** Pre-imported JSON animation data object */
  animationData?: Record<string, unknown>;
  /** Loop the animation (default: true) */
  loop?: boolean;
  /** Auto-play on mount (default: true) */
  autoplay?: boolean;
  /** Playback speed multiplier (default: 1) */
  speed?: number;
  /** Additional CSS classes for sizing / layout */
  className?: string;
  style?: React.CSSProperties;
  /** Accessible label for screen readers */
  ariaLabel?: string;
  /** Called when the animation completes */
  onComplete?: () => void;
  /** Called on each loop iteration */
  onLoopComplete?: () => void;
}

/* Inner component — only rendered when animationData is present */
function LottieInner({
  animationData,
  loop       = true,
  autoplay   = true,
  speed      = 1,
  className,
  style,
  ariaLabel  = "Animation",
  onComplete,
  onLoopComplete,
}: Required<Pick<LottiePlayerProps, "animationData">> &
  Omit<LottiePlayerProps, "animationData">) {

  // v3: `src` accepts a string URL or a parsed animation object
  const { setDisplayRef } = useLottie({
    src: animationData as object,
    loop,
    autoplay,
    speed,   // reactive — v3 handles changes automatically
    subscriptions: {
      ...(onComplete     ? { complete:     onComplete }     : {}),
      ...(onLoopComplete ? { loopComplete: onLoopComplete } : {}),
    },
  });

  return (
    <div
      ref={setDisplayRef}
      role="img"
      aria-label={ariaLabel}
      className={cn("overflow-hidden", className)}
      style={{ width: "100%", height: "100%", ...style }}
    />
  );
}

export function LottiePlayer(props: LottiePlayerProps) {
  const {
    animationData,
    loop           = true,
    autoplay       = true,
    speed          = 1,
    className,
    style,
    ariaLabel      = "Animation",
    onComplete,
    onLoopComplete,
  } = props;

  if (!animationData) {
    return (
      <div
        role="img"
        aria-label={ariaLabel}
        className={cn(
          "flex items-center justify-center rounded-lg",
          "border border-dashed border-[rgba(0,0,0,0.12)]",
          "text-[11px] font-semibold text-[rgba(0,0,0,0.35)] tracking-widest uppercase",
          className,
        )}
        style={style}
      >
        Lottie
      </div>
    );
  }

  return (
    <LottieInner
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      speed={speed}
      className={className}
      style={style}
      ariaLabel={ariaLabel}
      onComplete={onComplete}
      onLoopComplete={onLoopComplete}
    />
  );
}
