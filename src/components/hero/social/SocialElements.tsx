/**
 * SocialElements.tsx
 * ─────────────────────────────────────────────────────────────
 * Reusable animated social-media components for the PC Creations
 * hero motion system.
 *
 * Elements:
 *   1.  InstagramElement
 *   2.  FacebookElement
 *   3.  YouTubeElement
 *   4.  LinkedInElement
 *   5.  LikeElement         (Lottie animated heart)
 *   6.  CommentElement      (Lottie animated comment)
 *   7.  ShareElement        (Network node & forward share)
 *   8.  NotificationElement (Lottie animated bell alert)
 *   9.  CameraElement       (Studio production shutter)
 *   10. CursorElement       (Digital precision pointer & ripple)
 */

"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { LottiePlayer } from "@/components/ui/LottiePlayer";
import { heartLottie, notificationLottie, commentLottie } from "./lottie-data";

/* Base Card Style Helper */
const baseCardClasses =
  "inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl " +
  "bg-white/95 backdrop-blur-md border border-[rgba(0,0,0,0.08)] " +
  "shadow-[0_8px_30px_rgba(0,0,0,0.06)] select-none pointer-events-auto " +
  "transition-transform duration-300 hover:scale-105";

/* ── 1. INSTAGRAM ── */
export function InstagramElement({ className }: { className?: string }) {
  return (
    <div className={cn(baseCardClasses, className)}>
      <div className="size-8 rounded-lg bg-[#000000] flex items-center justify-center text-white shrink-0">
        <img src="/assets/instagram-logo.png" alt="Instagram" width={16} height={16} className="size-4" />
      </div>
      <div className="flex flex-col text-left">
        <span className="text-[10px] font-mono tracking-wider uppercase text-[rgba(0,0,0,0.45)]">
          @PC_CREATIONS
        </span>
        <span className="text-xs font-bold text-[#000000] tracking-tight">
          +48.2K <span className="text-[#3155E7]">Engaged</span>
        </span>
      </div>
    </div>
  );
}

/* ── 2. FACEBOOK ── */
export function FacebookElement({ className }: { className?: string }) {
  return (
    <div className={cn(baseCardClasses, className)}>
      <div className="size-8 rounded-lg bg-[#3155E7] flex items-center justify-center text-white shrink-0 shadow-sm">
        <img src="/assets/facebook-logo.png" alt="Facebook" width={16} height={16} className="size-4" />
      </div>
      <div className="flex flex-col text-left">
        <span className="text-[10px] font-mono tracking-wider uppercase text-[rgba(0,0,0,0.45)]">
          CAMPAIGN REACH
        </span>
        <span className="text-xs font-bold text-[#000000] tracking-tight">
          2.4M <span className="text-[#3155E7]">Impressions</span>
        </span>
      </div>
    </div>
  );
}

/* ── 3. YOUTUBE ── */
export function YouTubeElement({ className }: { className?: string }) {
  return (
    <div className={cn(baseCardClasses, "bg-[#000000] text-[#F7F8FA] border-[rgba(247,248,250,0.12)]", className)}>
      <div className="size-8 rounded-lg bg-[#FF9D00] flex items-center justify-center text-black shrink-0">
        <svg className="size-4 text-black fill-current translate-x-0.5" viewBox="0 0 24 24">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      </div>
      <div className="flex flex-col text-left">
        <span className="text-[10px] font-mono tracking-wider uppercase text-[rgba(247,248,250,0.55)]">
          SHOWREEL 4K
        </span>
        <span className="text-xs font-bold text-[#F7F8FA] tracking-tight">
          180K <span className="text-[#FF9D00]">Views</span>
        </span>
      </div>
    </div>
  );
}

/* ── 4. LINKEDIN ── */
export function LinkedInElement({ className }: { className?: string }) {
  return (
    <div className={cn(baseCardClasses, className)}>
      <div className="size-8 rounded-lg bg-[#000000] flex items-center justify-center text-[#3155E7] shrink-0 font-bold text-xs font-mono">
        <img src="/assets/linkedin-logo.png" alt="LinkedIn" width={16} height={16} className="size-4" />
      </div>
      <div className="flex flex-col text-left">
        <span className="text-[10px] font-mono tracking-wider uppercase text-[rgba(0,0,0,0.45)]">
          B2B NETWORK
        </span>
        <span className="text-xs font-bold text-[#000000] tracking-tight">
          Enterprise <span className="text-[#3155E7]">Scale</span>
        </span>
      </div>
    </div>
  );
}

/* ── 5. LIKE (LOTTIE ANIMATED HEART) ── */
export function LikeElement({ className }: { className?: string }) {
  return (
    <div className={cn(baseCardClasses, "border-[#FF9D00]/30 shadow-[0_6px_24px_rgba(255,157,0,0.12)]", className)}>
      <div className="size-7 shrink-0 flex items-center justify-center">
        <LottiePlayer animationData={heartLottie} loop autoplay className="size-7" />
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-black text-[#000000] tracking-tight">14.8K</span>
        <span className="text-[10px] font-bold text-[#FF9D00] uppercase font-mono">Likes</span>
      </div>
    </div>
  );
}

/* ── 6. COMMENT (LOTTIE ANIMATED BUBBLE) ── */
export function CommentElement({ className }: { className?: string }) {
  return (
    <div className={cn(baseCardClasses, className)}>
      <div className="size-7 shrink-0 flex items-center justify-center">
        <LottiePlayer animationData={commentLottie} loop autoplay className="size-7" />
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-black text-[#000000] tracking-tight">1.2K</span>
        <span className="text-[10px] font-bold text-[#3155E7] uppercase font-mono">Comments</span>
      </div>
    </div>
  );
}

/* ── 7. SHARE ── */
export function ShareElement({ className }: { className?: string }) {
  return (
    <div className={cn(baseCardClasses, className)}>
      <div className="size-7 rounded-full bg-[rgba(49,85,231,0.1)] flex items-center justify-center text-[#3155E7] shrink-0">
        <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      </div>
      <span className="text-xs font-bold text-[#000000] tracking-tight">
        Share <span className="text-[#3155E7] font-mono text-[11px]">+320</span>
      </span>
    </div>
  );
}

/* ── 8. NOTIFICATION (LOTTIE ANIMATED BELL) ── */
export function NotificationElement({ className }: { className?: string }) {
  return (
    <div className={cn(baseCardClasses, "bg-white border-[#3155E7]/25", className)}>
      <div className="size-7 shrink-0 flex items-center justify-center">
        <LottiePlayer animationData={notificationLottie} loop autoplay className="size-7" />
      </div>
      <div className="flex items-center gap-2">
        <span className="size-2 rounded-full bg-[#FF9D00] animate-ping" />
        <span className="text-xs font-bold text-[#000000] tracking-tight">
          Viral Spike <span className="text-[#3155E7] font-mono">+180%</span>
        </span>
      </div>
    </div>
  );
}

/* ── 9. CAMERA (STUDIO PRODUCTION BADGE) ── */
export function CameraElement({ className }: { className?: string }) {
  return (
    <div className={cn(baseCardClasses, className)}>
      <div className="size-7 rounded-lg bg-[#000000] flex items-center justify-center text-[#FF9D00] shrink-0">
        <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-bold text-[#000000] tracking-tight">Studio Rig</span>
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[rgba(255,157,0,0.15)] text-[#FF9D00] font-bold">
          4K/60
        </span>
      </div>
    </div>
  );
}

/* ── 10. CURSOR (DIGITAL POINTER & PRECISION) ── */
export function CursorElement({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-2 select-none pointer-events-auto", className)}>
      <div className="relative">
        <svg className="size-6 text-[#3155E7] filter drop-shadow-[0_4px_10px_rgba(49,85,231,0.35)]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3l7 18 3-7 7-3L3 3z" />
        </svg>
        <span className="absolute -top-1 -right-1 size-2 rounded-full bg-[#FF9D00]" />
      </div>
      <div className="px-2.5 py-1 rounded-md bg-[#000000] text-white text-[10px] font-mono font-bold tracking-widest uppercase shadow-md">
        PC CLICK
      </div>
    </div>
  );
}
