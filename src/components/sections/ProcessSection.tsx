/**
 * ProcessSection.tsx
 * ─────────────────────────────────────────────────────────────
 * PC Creations — 5-Step Agency Process.
 *
 * STEPS: Discover → Strategize → Create → Launch → Optimize
 *
 * VISUAL: Premium string-roadmap. One continuous curved S-shaped
 * SVG path connects 5 nodes; scroll-in draws the string, nodes
 * light up, and cards gently fade-slide into place.
 */

"use client";

import React, { useRef, useState, useEffect } from "react";
import { useGsap } from "@/hooks/useGsap";

interface Step {
  number: string;
  title:  string;
  description: string;
  color: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    title:  "Discover",
    description:
      "We start by understanding your brand, audience, competitors, and goals. Deep research forms the foundation of every campaign.",
    color: "#3155E7",
  },
  {
    number: "02",
    title:  "Strategize",
    description:
      "We build a data-backed campaign strategy — audience targeting, platform selection, budget allocation, and creative direction.",
    color: "#FF9D00",
  },
  {
    number: "03",
    title:  "Create",
    description:
      "Content, copy, and creatives are developed to match your brand voice and connect with your specific audience segments.",
    color: "#3155E7",
  },
  {
    number: "04",
    title:  "Launch",
    description:
      "Campaigns go live across Meta and other relevant platforms. We monitor performance from day one and respond rapidly.",
    color: "#FF9D00",
  },
  {
    number: "05",
    title:  "Optimize",
    description:
      "Ongoing A/B testing, audience refinement, and creative iteration ensure campaigns improve continuously over time.",
    color: "#3155E7",
  },
];

type Breakpoint = "mobile" | "tablet" | "desktop";

function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("mobile");
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      const w = window.innerWidth;
      if (w >= 1024) setBp("desktop");
      else if (w >= 768) setBp("tablet");
      else setBp("mobile");
    };
    calc();
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(calc);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);
  return bp;
}

/**
 * Roadmap coordinate configs.
 *  - viewBox : SVG viewBox (width x height)
 *  - stageMinH : Tailwind-style className for roadmap stage min-height
 *  - nodes   : 5 node positions (in viewBox units) → also positions of step wrappers
 *  - path    : the SVG "d" attribute for both base + primary string lines
 *              (curves smoothly between nodes)
 *  - wrapperPositions : absolute % top/left/right for each 5 step wrappers
 *                       (nodes are centered inside wrappers; cards are adjacent)
 */

interface RoadmapCfg {
  viewBox: string;
  stageMinH: string;
  path: string;
  wrappers: Array<{
    top: string;
    left?: string;
    right?: string;
    width: string;
    cardAlign: "right" | "left" | "center";
  }>;
}

const DESKTOP: RoadmapCfg = {
  viewBox: "0 0 1000 1100",
  stageMinH: "min-h-[1100px]",
  // Nodes (viewBox units)
  // 01: x=150, y=90   (left upper)
  // 02: x=870, y=200  (right upper)
  // 03: x=500, y=500  (center)
  // 04: x=150, y=780  (left lower)
  // 05: x=870, y=990  (right lower)
  path:
    "M 150 90 " +
    "C 260 110, 760 170, 870 200 " +
    "C 780 290, 590 420, 500 500 " +
    "C 430 580, 240 710, 150 780 " +
    "C 240 860, 780 930, 870 990",
  wrappers: [
    { top: "8%",  left: "6%",  width: "44%", cardAlign: "right"  },
    { top: "18%", right: "6%", width: "44%", cardAlign: "left"   },
    { top: "45%", left: "28%", width: "44%", cardAlign: "center" },
    { top: "71%", left: "6%",  width: "44%", cardAlign: "right"  },
    { top: "90%", right: "6%", width: "44%", cardAlign: "left"   },
  ],
};

const TABLET: RoadmapCfg = {
  viewBox: "0 0 800 1600",
  stageMinH: "min-h-[1600px]",
  // nodes
  // 01: 100, 90
  // 02: 700, 330
  // 03: 100, 680
  // 04: 700, 1040
  // 05: 100, 1450
  path:
    "M 100 90 " +
    "C 230 150, 570 260, 700 330 " +
    "C 550 430, 250 570, 100 680 " +
    "C 240 810, 570 920, 700 1040 " +
    "C 560 1180, 240 1340, 100 1450",
  wrappers: [
    { top: "5%",  left: "2%",  width: "58%", cardAlign: "right" },
    { top: "20%", right: "2%", width: "58%", cardAlign: "left"  },
    { top: "42%", left: "2%",  width: "58%", cardAlign: "right" },
    { top: "65%", right: "2%", width: "58%", cardAlign: "left"  },
    { top: "89%", left: "2%",  width: "58%", cardAlign: "right" },
  ],
};

const MOBILE: RoadmapCfg = {
  viewBox: "0 0 500 2200",
  stageMinH: "min-h-[2200px]",
  // nodes centered around x; weave ±60px horizontally
  // 01: 250, 100
  // 02: 330, 500
  // 03: 170, 940
  // 04: 330, 1400
  // 05: 250, 1920
  path:
    "M 250 100 " +
    "C 290 210, 330 380, 330 500 " +
    "C 330 640, 200 780, 170 940 " +
    "C 170 1090, 330 1240, 330 1400 " +
    "C 330 1580, 290 1780, 250 1920",
  wrappers: [
    { top: "3%",  left: "50%", width: "100%", cardAlign: "center" },
    { top: "22%", left: "50%", width: "100%", cardAlign: "center" },
    { top: "42%", left: "50%", width: "100%", cardAlign: "center" },
    { top: "63%", left: "50%", width: "100%", cardAlign: "center" },
    { top: "86%", left: "50%", width: "100%", cardAlign: "center" },
  ],
};

const CFG: Record<Breakpoint, RoadmapCfg> = {
  desktop: DESKTOP,
  tablet: TABLET,
  mobile: MOBILE,
};

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bp = useBreakpoint();
  const cfg = CFG[bp];

  useGsap((gsap) => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(".process-header",
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      },
    );

    const stage = stageRef.current;
    if (!stage) return;
    const string = stage.querySelector<SVGPathElement>(".roadmap-string");
    const prm =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.utils.toArray<HTMLElement>(".process-number").forEach((num) => {
      gsap.to(num, {
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: num,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    });

    const totalLen = string?.getTotalLength() ?? 0;
    if (string && totalLen > 0) {
      string.style.strokeDasharray = String(totalLen);
      string.style.strokeDashoffset = String(totalLen);
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: "top 82%",
        once: true,
      },
      defaults: { ease: "power2.out" },
    });

    if (!prm && string && totalLen > 0) {
      tl.to(string, { strokeDashoffset: 0, duration: 1.5, ease: "power2.out" }, 0);
    }

    const steps = [
      { node: ".roadmap-node-1", card: ".roadmap-card-1" },
      { node: ".roadmap-node-2", card: ".roadmap-card-2" },
      { node: ".roadmap-node-3", card: ".roadmap-card-3" },
      { node: ".roadmap-node-4", card: ".roadmap-card-4" },
      { node: ".roadmap-node-5", card: ".roadmap-card-5" },
    ];

    const nodeStart = [0.15, 0.5, 0.9, 1.2, 1.5];
    const cardStart = [0.35, 0.7, 1.1, 1.4, 1.7];

    steps.forEach((s, idx) => {
      tl.fromTo(
        s.node,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.6)",
        },
        nodeStart[idx],
      );
      if (prm) {
        tl.fromTo(
          s.card,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          cardStart[idx] - 0.1,
        );
      } else {
        tl.fromTo(
          s.card,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" },
          cardStart[idx],
        );
      }
    });
  }, sectionRef);

  return (
    <section
      id="process"
      ref={sectionRef}
      aria-label="PC Creations Process"
      className="bg-[#F7F8FA] overflow-hidden"
      style={{
        paddingTop: "clamp(7rem,10vw,11rem)",
        paddingBottom: "clamp(8rem,12vw,13rem)",
      }}
    >
      <div className="pc-container">
        {/* ── Section Header ── */}
        <div className="process-header reveal-up mb-16 sm:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-10 border-b border-[rgba(0,0,0,0.08)]">
          <div>
            <p className="text-[11px] font-mono font-bold text-[#3155E7] tracking-widest uppercase mb-4">
              04 / Our Process
            </p>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black text-[#000000] tracking-tight leading-[0.95]">
              How We <span className="text-[#FF9D00]">Work.</span>
            </h2>
          </div>
          <p className="text-base sm:text-lg text-[rgba(0,0,0,0.58)] max-w-md leading-relaxed lg:text-right">
            A structured, transparent five-step methodology engineered to take campaigns from discovery to continuous scale.
          </p>
        </div>

        {/* ── String Roadmap Stage ── */}
        <div
          key={bp}
          ref={stageRef}
          className={`roadmap-stage relative w-full ${cfg.stageMinH}`}
        >
          {/* ─── SVG String Layer ─── */}
          <svg
            className="roadmap-svg absolute inset-0 w-full h-full z-0"
            viewBox={cfg.viewBox}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="roadStringGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"  stopColor="#3155E7" stopOpacity="0.55" />
                <stop offset="50%" stopColor="#FF9D00" stopOpacity="0.8"  />
                <stop offset="100%" stopColor="#3155E7" stopOpacity="0.55" />
              </linearGradient>
              <filter id="roadmapNodeGlow" x="-140%" y="-140%" width="380%" height="380%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* faint base line */}
            <path
              d={cfg.path}
              fill="none"
              stroke="rgba(0,0,0,0.10)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* primary draw line */}
            <path
              className="roadmap-string"
              d={cfg.path}
              fill="none"
              stroke="url(#roadStringGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* ─── Nodes + Cards Layer ─── */}
          {STEPS.map((step, i) => {
            const w = cfg.wrappers[i];
            const isEven = i % 2 === 0;
            const accent = step.color;

            const wrapperStyle: React.CSSProperties = {
              top: w.top,
              ...(w.left !== undefined ? { left: w.left } : null),
              ...(w.right !== undefined ? { right: w.right } : null),
              width: w.width,
              ...(bp === "mobile" ? { transform: "translateX(-50%)" } : null),
            };

            // Node is positioned on the wrapper's "card edge" to meet the string
            const nodePositionStyle: React.CSSProperties = (() => {
              if (bp === "mobile") {
                return {
                  top: 0,
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                } as React.CSSProperties;
              }
              if (w.cardAlign === "left") {
                // Card sits to the RIGHT of the node; node is on wrapper LEFT edge
                return {
                  top: "1.75rem",
                  left: 0,
                  transform: "translate(-50%, -50%)",
                } as React.CSSProperties;
              }
              if (w.cardAlign === "right") {
                // Card sits to the LEFT of the node; node is on wrapper RIGHT edge
                return {
                  top: "1.75rem",
                  right: 0,
                  transform: "translate(50%, -50%)",
                } as React.CSSProperties;
              }
              // center (only desktop step 3)
              return {
                top: "-1.5rem",
                left: "50%",
                transform: "translate(-50%, -50%)",
              } as React.CSSProperties;
            })();

            const cardOffsetStyle: React.CSSProperties = (() => {
              if (bp === "mobile") {
                return { marginTop: "1.5rem", marginLeft: "auto", marginRight: "auto", maxWidth: "36rem" };
              }
              if (w.cardAlign === "left") {
                return { marginLeft: "1.75rem", marginRight: 0 };
              }
              if (w.cardAlign === "right") {
                return { marginRight: "1.75rem", marginLeft: 0 };
              }
              return { marginLeft: "auto", marginRight: "auto", marginTop: "1rem" };
            })();

            return (
              <div
                key={step.number}
                className="group absolute z-20 select-none"
                style={wrapperStyle}
              >
                {/* Node */}
                <div
                  className={`roadmap-node roadmap-node-${i + 1} absolute rounded-full w-6 h-6 border-[3px] transition-all duration-400 ease-out ${
                    isEven
                      ? "bg-[#3155E7] border-[#3155E7]"
                      : "bg-[#FF9D00] border-[#FF9D00]"
                  }`}
                  style={{
                    ...nodePositionStyle,
                    boxShadow: `0 0 0 4px ${isEven ? "rgba(49,85,231,0.14)" : "rgba(255,157,0,0.18)"}, 0 0 18px ${accent}33`,
                    filter: "url(#roadmapNodeGlow)",
                  }}
                />

                {/* Card */}
                <article
                  className={`roadmap-card roadmap-card-${i + 1} w-full bg-white/75 backdrop-blur-[2px] border border-[rgba(0,0,0,0.08)] rounded-2xl p-6 sm:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.05)] transition-all duration-400 ease-out hover:-translate-y-2 hover:shadow-[0_22px_60px_rgba(0,0,0,0.09)] hover:border-[${isEven ? "rgba(49,85,231,0.28)" : "rgba(255,157,0,0.32)"}]`}
                  style={cardOffsetStyle}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span
                      className="process-number shrink-0 text-sm font-mono font-black tracking-widest w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                      style={{
                        color: "#3155E7",
                        background: "rgba(49,85,231,0.08)",
                        border: "1px solid rgba(49,85,231,0.20)",
                      }}
                    >
                      {step.number}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#000000] tracking-tight leading-tight transition-colors duration-200 group-hover:text-[#3155E7]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-[rgba(0,0,0,0.60)] leading-relaxed">
                    {step.description}
                  </p>
                </article>

                {/* Hover ring around node (CSS only) */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute rounded-full border-2 border-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out"
                  style={{
                    ...nodePositionStyle,
                    width: "3rem",
                    height: "3rem",
                    borderColor: `${accent}55`,
                    transform: (nodePositionStyle.transform as string)?.replace("-50%, -50%", "-50%, -50% scale(1.15)") ?? undefined,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* ── Section End Marker ── */}
        <div className="mt-20 sm:mt-24 flex items-center gap-6" aria-hidden="true">
          <div className="h-px flex-1 bg-gradient-to-r from-[rgba(0,0,0,0.10)] to-transparent" />
          <span className="text-[10px] font-mono font-bold text-[rgba(0,0,0,0.20)] tracking-[0.25em] uppercase select-none">
            END OF SECTION 04
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-[rgba(0,0,0,0.10)] to-transparent" />
        </div>
      </div>
    </section>
  );
}
