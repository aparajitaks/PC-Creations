/**
 * VideoReel.tsx
 * ─────────────────────────────────────────────────────────────
 * Three real PC Creations video files presented as a vertical reel.
 * Muted autoplay on scroll-into-view. Click to unmute.
 */

"use client";

import React, { useRef, useEffect, useState } from "react";
import { videos } from "./portfolioData";

function VideoCard({
  src,
  poster,
  label,
  index,
}: {
  src: string;
  poster: string;
  label: string;
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef  = useRef<HTMLDivElement>(null);
  const [muted, setMuted]   = useState(true);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const wrap  = wrapRef.current;
    if (!video || !wrap) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
          setActive(true);
        } else {
          video.pause();
          setActive(false);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div
      ref={wrapRef}
      className="group relative overflow-hidden rounded-2xl bg-[#0e0e10] border border-[rgba(0,0,0,0.08)] shadow-md hover:shadow-2xl hover:border-[#FF9D00]/40 transition-all duration-300 cursor-pointer w-full max-w-[340px] mx-auto"
      style={{ aspectRatio: "9/16" }}
      onClick={toggle}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[rgba(0,0,0,0.15)] to-transparent pointer-events-none" />

      {/* Index */}
      <span className="absolute top-4 left-4 text-[10px] font-mono font-bold text-[rgba(255,255,255,0.60)] tracking-widest bg-[rgba(0,0,0,0.40)] backdrop-blur-sm px-2.5 py-1 rounded-md">
        REEL /{String(index + 1).padStart(2, "0")}
      </span>

      {/* Sound toggle button */}
      <button
        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[rgba(0,0,0,0.65)] backdrop-blur-sm border border-[rgba(255,255,255,0.20)] flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-200"
        onClick={(e) => { e.stopPropagation(); toggle(); }}
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M11 5L6 9H2v6h4l5 4V5z"/>
            <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
        )}
      </button>

      {/* Bottom label */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
        <span className="text-[10px] font-mono font-bold text-[#FF9D00] tracking-widest uppercase block mb-1">
          PC Creations
        </span>
        <p className="text-base font-bold text-[#F7F8FA] leading-snug">{label}</p>
        <p className="text-xs text-[rgba(247,248,250,0.50)] mt-1.5 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF9D00]" />
          {muted ? "Tap anywhere to unmute" : "Playing with sound"}
        </p>
      </div>
    </div>
  );
}

export function VideoReel() {
  const firstVideo = videos[0];
  if (!firstVideo) return null;

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-sm">
        <VideoCard
          src={firstVideo.src}
          poster={firstVideo.poster}
          label={firstVideo.label}
          index={0}
        />
      </div>
    </div>
  );
}
