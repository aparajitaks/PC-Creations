/**
 * GoogleReviews.tsx
 * ─────────────────────────────────────────────────────────────
 * PC Creations — "In Their Words / What Our Clients Say"
 * (Exact architecture & aesthetics inspired by Creagenix Media)
 *
 * Structure:
 *   1. Centered Header:
 *      - Eyebrow: "IN THEIR WORDS"
 *      - Headline: "What Our Clients Say."
 *      - Subtitle
 *      - Google 4.9 Reviews Badge (linking to Google reviews search)
 *   2. Video Testimonials:
 *      - Centered 9:16 Vertical Reel Card:
 *        "REEL /01", "PC Creations", "Client Video", "Tap anywhere to unmute"
 *   3. Written Reviews:
 *      - Label: "Written Reviews"
 *      - 3-column grid of dark quote cards with client avatar, review text, and Google verification
 */

"use client";

import React, { useRef, useEffect, useState } from "react";
import { videos } from "./portfolioData";

// ── Star Rating ───────────────────────────────────────────────

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="#FF9D00"
          stroke="#FF9D00"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

// ── Google "G" Logo ───────────────────────────────────────────

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-label="Google" role="img">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

// ── Written Reviews Data ──────────────────────────────────────

interface WrittenReview {
  id: string;
  name: string;
  role: string;
  initial: string;
  text: string;
  service: string;
}

const WRITTEN_REVIEWS: WrittenReview[] = [
  {
    id: "r1",
    name: "Santhosh Kumar",
    role: "Bangalore",
    initial: "SK",
    service: "Meta Ads Management",
    text: "PC Creations completely transformed our digital presence. Our Meta Ads ROAS improved by 3.8X within the first two months. Pradeep and his team are incredibly professional, data-driven, and always deliver on their promises. Highly recommended!",
  },
  {
    id: "r2",
    name: "Divya R.",
    role: "Clinic Founder, Bangalore",
    initial: "DR",
    service: "Social Media & Branding",
    text: "We reached out to PC Creations for our Instagram management and social media content — and honestly they exceeded every expectation. Our follower count grew significantly and engagement went through the roof. Their team understood our brand voice perfectly.",
  },
  {
    id: "r3",
    name: "Ramesh Nair",
    role: "Suvega Infra, Real Estate",
    initial: "RN",
    service: "Meta Ads & Lead Gen",
    text: "Running a real estate business, I was skeptical about digital marketing. But PC Creations ran a single Meta Ads campaign that generated over ₹1 Crore in verified revenue. The results were real, traceable, and the reporting was completely transparent.",
  },
  {
    id: "r4",
    name: "Anjali Menon",
    role: "Managing Director",
    initial: "AM",
    service: "Website & Google Ads",
    text: "The website and branding work done by PC Creations for our clinic was outstanding. Clean, modern, and converts visitors to inquiries. They also handled our Google Ads campaign with great ROI. Responsive team with great communication.",
  },
  {
    id: "r5",
    name: "Karthik B.",
    role: "Venture Partner",
    initial: "KB",
    service: "Brand Building & Growth",
    text: "Best digital marketing agency in Bangalore for growing businesses. They helped us build our brand from scratch — logo, social media, performance ads, everything. Pradeep personally guided us at every step. Our business grew 200% in 6 months.",
  },
  {
    id: "r6",
    name: "Meera Krishnan",
    role: "E-Commerce Founder",
    initial: "MK",
    service: "Social Media Management",
    text: "PC Creations handled our entire social media marketing and the growth has been phenomenal. Our Instagram page went from near zero engagement to a highly active community. Their creative direction and ad targeting is top notch!",
  },
];

// ── Reel Video Component ──────────────────────────────────────

function ReelVideoCard() {
  const firstVideo = videos[0] ?? {
    src: "/assets/client-testimonial.mp4",
    poster: "/assets/testimonial-video-poster.jpg",
    label: "Client Video",
  };

  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!video || !wrap) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.3 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const togglePlayback = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-[11px] font-mono font-bold text-[rgba(0,0,0,0.40)] tracking-widest uppercase text-center mb-8 reveal-scale">
        Client Testimonial Video
      </p>
      <div
        ref={wrapRef}
        onClick={togglePlayback}
        className="group relative overflow-hidden rounded-3xl bg-[#0e0e10] border border-[rgba(255,255,255,0.12)] shadow-2xl hover:border-[#FF9D00]/50 transition-all duration-300 cursor-pointer w-full max-w-[340px] sm:max-w-[360px] reveal-scale float-idle-3 card-hover-premium"
        style={{ aspectRatio: "9/16" }}
        data-scroll-y="-18"
      >
        <style>{`
          @media (hover: hover) and (pointer: fine) {
            .group:hover .reel-video-inner {
              transform: translateY(-10px) scale(1.04);
            }
          }
        `}</style>
        <video
          ref={videoRef}
          src={firstVideo.src}
          poster={firstVideo.poster}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          className="reel-video-inner w-full h-full object-cover transition-transform duration-500 ease-out"
          style={{ willChange: "transform" }}
        />

        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40 pointer-events-none" />

        {/* Top bar: REEL badge + Sound button */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="text-[11px] font-mono font-bold text-white tracking-widest bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            REEL /01
          </span>

          <button
            onClick={toggleSound}
            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#FF9D00] hover:text-black transition-all cursor-pointer shadow-lg"
            aria-label={muted ? "Unmute video" : "Mute video"}
          >
            {muted ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
            )}
          </button>
        </div>

        {/* Center Play Icon when paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-[#FF9D00] flex items-center justify-center text-black shadow-2xl pl-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
              </svg>
            </div>
          </div>
        )}

        {/* Bottom card details */}
        <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none z-10">
          <span className="text-[11px] font-mono font-bold text-[#FF9D00] tracking-widest uppercase block mb-1">
            PC Creations
          </span>
          <p className="text-lg font-bold text-white leading-snug">
            {firstVideo.label}
          </p>
          <div className="mt-2 flex items-center gap-2 text-xs text-[rgba(255,255,255,0.7)] font-mono">
            <span className="w-2 h-2 rounded-full bg-[#FF9D00] animate-pulse" />
            <span>{muted ? "Tap anywhere to unmute" : "Playing with sound"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────

export function GoogleReviews() {
  return (
    <div>
      {/* ── 1. Centered Section Header ── */}
      <div className="text-center max-w-3xl mx-auto mb-16 reveal-up">
        <p className="text-[11px] font-mono font-bold text-[#FF9D00] tracking-widest uppercase mb-3">
          02 / In Their Words
        </p>

        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#000000] tracking-tight leading-tight">
          What Our <span className="text-[#FF9D00]">Clients Say.</span>
        </h3>

        <p className="mt-3 text-base text-[rgba(0,0,0,0.55)] max-w-xl mx-auto leading-relaxed">
          Real stories from business owners, creators, and brands who trusted
          PC Creations to build their authority and scale revenue online.
        </p>

        {/* ── Google Reviews 4.9 Rating Badge ── */}
        <div className="mt-6 flex justify-center">
          <a
            href="https://www.google.com/search?q=PC+Creations+digital+marketing+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-[rgba(0,0,0,0.12)] hover:border-[#FF9D00] hover:shadow-xl transition-all duration-300 group cursor-pointer"
            aria-label="View verified Google reviews"
          >
            <GoogleLogo />
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[rgba(0,0,0,0.5)] uppercase tracking-wider">
                Reviews
              </span>
              <span className="text-lg font-black text-black leading-none">
                4.9
              </span>
              <Stars count={5} />
            </div>
            <span className="text-xs font-bold text-[#FF9D00] group-hover:translate-x-0.5 transition-transform border-l border-[rgba(0,0,0,0.1)] pl-3">
              View on Google →
            </span>
          </a>
        </div>
      </div>

      {/* ── 2. Video Testimonials (Creagenix Style) ── */}
      <div className="mb-20">
        <ReelVideoCard />
      </div>

      {/* ── 3. Written Reviews (Creagenix Style — 3 Column Grid) ── */}
      <div>
        <p className="text-[11px] font-mono font-bold text-[rgba(0,0,0,0.40)] tracking-widest uppercase text-center mb-8 reveal-up">
          Written Reviews · Verified Google Feedback
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-stagger-group>
          {WRITTEN_REVIEWS.map((review, i) => {
            const y = i % 2 === 0 ? 18 : -18;
            const x = i % 3 === 2 ? (i % 6 === 2 ? 12 : -12) : 0;
            const floatCls =
              i === 2 ? "float-idle-1" : i === 4 ? "float-idle-2" : "";
            return (
            <div
              key={review.id}
              className={`rounded-2xl p-7 bg-[#111114] border border-[rgba(255,255,255,0.08)] hover:border-[#FF9D00]/50 transition-all duration-300 shadow-xl flex flex-col justify-between reveal-up card-hover-premium ${floatCls}`.trim()}
              data-stagger-child
              data-scroll-y={String(y)}
              {...(x !== 0
                ? { "data-scroll-x": String(x) }
                : {})}
            >
              <div>
                {/* Top: Quote Icon + Google logo + Stars */}
                <div className="flex items-center justify-between mb-5">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FF9D00"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-90"
                  >
                    <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                    <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                  </svg>
                  <div className="flex items-center gap-2">
                    <Stars count={5} />
                    <GoogleLogo />
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-sm text-[rgba(255,255,255,0.75)] leading-relaxed italic mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FF9D00] text-black font-black text-xs flex items-center justify-center shrink-0">
                    {review.initial}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white leading-tight">
                      {review.name}
                    </h5>
                    <p className="text-[11px] text-[rgba(255,255,255,0.45)] font-mono">
                      {review.role}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-[rgba(255,255,255,0.40)] bg-white/5 px-2.5 py-1 rounded-md">
                  {review.service}
                </span>
              </div>
            </div>
            );
          })}
        </div>

        {/* View all on Google button */}
        <div className="mt-12 text-center reveal-fade" data-reveal-delay="240">
          <a
            href="https://www.google.com/search?q=PC+Creations+digital+marketing+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border-2 border-[rgba(0,0,0,0.14)] text-[rgba(0,0,0,0.7)] hover:border-[#FF9D00] hover:text-black font-bold text-sm transition-all duration-300 bg-white"
          >
            <GoogleLogo />
            <span>See All Customer Reviews on Google →</span>
          </a>
        </div>
      </div>
    </div>
  );
}
