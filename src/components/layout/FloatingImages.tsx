/**
 * FloatingImages.tsx
 * ─────────────────────────────────────────────────────────────
 * Global "creative studio" layer — the 18 PC Creations service
 * creatives distributed around the viewport edges, drifting
 * slowly through 3D space (perspective 1200px, preserve-3d).
 *
 * - Hidden during the homepage hero; on everywhere else
 *   (Services → Work → About → Process → Courses → Contact)
 * - 8 anchor zones: TL, TR, ML, MR, CL, CR, BL, BR
 * - Each object cycles through its assigned images (~2s) while
 *   the whole object drifts on its own organic motion pattern
 *   (diagonal / vertical / horizontal / rotation / breathing),
 *   8–18s, so nothing moves synchronously
 * - Depth layers (bg / mid / fg) with distinct scale, opacity,
 *   blur and parallax — some assets feel near, others far away
 * - Mobile: fewer objects, calmer drift
 * - pointer-events: none — never blocks clicks
 */

"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { ALL_SERVICE_IMAGES } from "@/data/services";

/* ── Organic motion patterns ── */
type Motion = "diagonal" | "vertical" | "horizontal" | "rotate" | "breathe";

/* ── Depth presets ── */
type Depth = "fg" | "mid" | "bg";
const DEPTH: Record<
  Depth,
  { size: string; opacity: number; blur: number; speed: number; parallax: number }
> = {
  fg:  { size: "clamp(104px, 16vw, 220px)", opacity: 0.95, blur: 0,   speed: 1.3, parallax: 0.045 },
  mid: { size: "clamp(80px, 12vw, 150px)",  opacity: 0.75,  blur: 0.6, speed: 1,   parallax: 0.025 },
  bg:  { size: "clamp(56px, 8vw, 100px)",   opacity: 0.45,  blur: 1.8, speed: 0.7, parallax: 0.015 },
};

interface ObjCfg {
  /** anchor position as a fraction of the viewport */
  x: number;
  y: number;
  depth: Depth;
  /** organic motion pattern */
  motion: Motion;
  /** drift amplitude (px) */
  drift: number;
  /** rotation drift (deg, signed) */
  rotationDrift: number;
  /** base duration (s) — per-axis durations derive from it */
  duration: number;
  /** indices into ALL_SERVICE_IMAGES */
  images: number[];
}

/** 8 viewport zones · all 18 creatives distributed across them */
const OBJECTS: ObjCfg[] = [
  { x: 0.06,  y: 0.16, depth: "bg",  motion: "vertical",   drift: 30, rotationDrift:  5, duration: 14, images: [0, 1, 2] },
  { x: 0.93,  y: 0.20, depth: "mid", motion: "diagonal",   drift: 38, rotationDrift: -6, duration: 11, images: [3, 4, 5] },
  { x: 0.045, y: 0.42, depth: "fg",  motion: "horizontal", drift: 42, rotationDrift:  4, duration: 9,  images: [6, 7] },
  { x: 0.95,  y: 0.40, depth: "bg",  motion: "breathe",    drift: 24, rotationDrift: -3, duration: 16, images: [8, 9] },
  { x: 0.08,  y: 0.62, depth: "mid", motion: "rotate",     drift: 26, rotationDrift:  6, duration: 12, images: [10, 11] },
  { x: 0.90,  y: 0.63, depth: "fg",  motion: "diagonal",   drift: 40, rotationDrift: -5, duration: 10, images: [12, 13, 14] },
  { x: 0.11,  y: 0.88, depth: "bg",  motion: "vertical",   drift: 28, rotationDrift:  4, duration: 17, images: [15, 16] },
  { x: 0.89,  y: 0.86, depth: "mid", motion: "horizontal", drift: 34, rotationDrift: -4, duration: 13, images: [17] },
];

/** Small screens — fewer objects, calmer drift */
const MOBILE_OBJECTS = [1, 2, 4, 7];

function segmentDurations(n: number) {
  if (n >= 3) return 0.65;
  if (n === 2) return 0.75;
  return 1.6;
}

interface ObjectRuntime {
  tiltEl: HTMLDivElement;
  imgEls: (HTMLImageElement | null)[];
  cycleTl: gsap.core.Timeline | null;
  cfg: ObjCfg;
  mouseTx: number;
  mouseTy: number;
  targetMouseTx: number;
  targetMouseTy: number;
  scrollYCur: number;
  scrollYTarget: number;
}

export function FloatingImages() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [pastHero, setPastHero] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const bgRoot = useRef<HTMLDivElement>(null);
  const fgRoot = useRef<HTMLDivElement>(null);
  const instances = useRef<ObjectRuntime[]>([]);
  const raf = useRef(0);
  const scrolledRef = useRef(0);

  const enabled = reduced ? false : (!isHome || pastHero);

  /* ── scroll gating (hidden during the homepage hero) ── */
  useEffect(() => {
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.6);
      scrolledRef.current = window.scrollY;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* ── preferences ── */
  useEffect(() => {
    const checkReduced = () => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    checkReduced();
    const mq = window.matchMedia("(max-width: 767px)");
    const onMq = () => setIsMobile(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  /* ── build the floating layer ── */
  useEffect(() => {
    if (!enabled) return;
    if (bgRoot.current) bgRoot.current.innerHTML = "";
    if (fgRoot.current) fgRoot.current.innerHTML = "";
    instances.current = [];

    const bgParent = bgRoot.current;
    const fgParent = fgRoot.current;
    if (!bgParent || !fgParent) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const objects = isMobile ? MOBILE_OBJECTS.map((i) => OBJECTS[i]) : OBJECTS;
    const driftScale = isMobile ? 0.5 : 1;

    const ctx = gsap.context(() => {
      objects.forEach((cfg, oi) => {
        const d = DEPTH[cfg.depth];
        const isBg = cfg.depth === "bg";
        const drift = cfg.drift * driftScale;

        /* root — viewport anchor */
        const root = document.createElement("div");
        root.style.cssText = `position:absolute;left:0;top:0;width:${d.size};aspect-ratio:1/1;pointer-events:none;will-change:transform;opacity:0;`;
        (isBg ? bgParent : fgParent).appendChild(root);

        /* scroll parallax wrapper */
        const scrollEl = document.createElement("div");
        scrollEl.style.cssText = "position:absolute;inset:0;will-change:transform;";
        root.appendChild(scrollEl);

        /* drift wrapper — organic motion lives here */
        const moveEl = document.createElement("div");
        moveEl.style.cssText = "position:absolute;inset:0;will-change:transform;";
        scrollEl.appendChild(moveEl);

        /* mouse-tilt wrapper */
        const tiltEl = document.createElement("div");
        tiltEl.style.cssText = "position:absolute;inset:0;will-change:transform;";
        moveEl.appendChild(tiltEl);

        /* creative assets */
        const imgEls = cfg.images.map((idx) => {
          const img = document.createElement("img");
          img.src = ALL_SERVICE_IMAGES[idx];
          img.alt = "";
          img.draggable = false;
          img.decoding = "async";
          img.style.cssText = `position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;will-change:transform,opacity,filter;filter:blur(${d.blur}px) drop-shadow(0 12px 20px rgba(0,0,0,0.14));`;
          tiltEl.appendChild(img);
          return img;
        });

        /* preload so cycles never pop */
        cfg.images.forEach((idx) => {
          const pre = new Image();
          pre.src = ALL_SERVICE_IMAGES[idx];
        });

        /* ── image cycle — assets float through every ~2s ── */
        const seg = segmentDurations(cfg.images.length);
        const cycleTl = gsap.timeline({ repeat: -1, repeatDelay: 0.15 });
        imgEls.forEach((el, i) => {
          if (!el) return;
          gsap.set(el, { transformPerspective: 1200 });
          const at = i * seg;
          cycleTl.fromTo(
            el,
            {
              scale: 0.72,
              xPercent: i % 2 ? 26 : -26,
              yPercent: i % 2 === 0 ? -18 : 6,
              rotationY: i % 2 ? 14 : -16,
              rotationX: i % 2 === 0 ? 9 : -7,
              rotationZ: i % 3 === 0 ? -7 : 0,
              opacity: 0,
              filter: "blur(9px) drop-shadow(0 12px 20px rgba(0,0,0,0.14))",
            },
            {
              scale: 1,
              xPercent: 0,
              yPercent: 0,
              rotationX: 0,
              rotationY: 0,
              rotationZ: 0,
              opacity: 1,
              filter: `blur(${d.blur}px) drop-shadow(0 12px 20px rgba(0,0,0,0.14))`,
              duration: 0.34,
              ease: "power2.out",
            },
            at,
          );
          /* gentle float while the asset is up */
          cycleTl.to(el, { y: -6, rotationZ: 1.1, duration: 0.35, ease: "sine.inOut" }, at + 0.34);
          /* drift back out */
          cycleTl.to(
            el,
            {
              scale: 0.85,
              xPercent: i % 2 ? -22 : 22,
              yPercent: i % 2 === 0 ? 16 : -12,
              rotationY: i % 2 ? -11 : 11,
              opacity: 0,
              filter: "blur(6px) drop-shadow(0 12px 20px rgba(0,0,0,0.14))",
              duration: 0.2,
              ease: "power2.in",
            },
            at + seg - 0.2,
          );
        });
        cycleTl.progress((oi * 0.31) % 1);

        instances.current.push({
          tiltEl,
          imgEls,
          cycleTl,
          cfg,
          mouseTx: 0,
          mouseTy: 0,
          targetMouseTx: 0,
          targetMouseTy: 0,
          scrollYCur: scrolledRef.current,
          scrollYTarget: scrolledRef.current,
        });

        /* ── organic drift — a different pattern per object ── */
        const baseX = cfg.x * vw;
        const baseY = cfg.y * vh;
        const dur = cfg.duration;

        gsap.set(moveEl, { x: baseX, y: baseY, opacity: 0 });
        gsap.to(moveEl, { opacity: 1, duration: 0.9, ease: "power2.out" });

        switch (cfg.motion) {
          case "diagonal":
            gsap.to(moveEl, { x: baseX + drift, y: baseY + drift * 0.7, duration: dur * 0.55, repeat: -1, yoyo: true, ease: "sine.inOut" });
            break;
          case "vertical":
            gsap.to(moveEl, { y: baseY + drift, duration: dur * 0.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
            break;
          case "horizontal":
            gsap.to(moveEl, { x: baseX + drift, duration: dur * 0.6, repeat: -1, yoyo: true, ease: "sine.inOut" });
            break;
          case "rotate":
            gsap.to(moveEl, { rotation: cfg.rotationDrift, duration: dur * 0.6, repeat: -1, yoyo: true, ease: "sine.inOut" });
            gsap.to(moveEl, { y: baseY + drift * 0.4, duration: dur * 0.45, repeat: -1, yoyo: true, ease: "sine.inOut" });
            break;
          case "breathe":
            gsap.to(moveEl, { scale: 1.07, duration: dur * 0.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
            break;
        }
      });
    }, bgRoot.current!);

    /* ── mouse + scroll parallax (lerped in rAF) ── */
    let mx = 0;
    let my = 0;
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    const tick = () => {
      for (const ins of instances.current) {
        const pf = DEPTH[ins.cfg.depth];
        ins.targetMouseTx = mx * 26 * pf.speed;
        ins.targetMouseTy = my * 18 * pf.speed;
        ins.mouseTx += (ins.targetMouseTx - ins.mouseTx) * 0.06;
        ins.mouseTy += (ins.targetMouseTy - ins.mouseTy) * 0.06;
        ins.scrollYTarget = scrolledRef.current;
        ins.scrollYCur += (ins.scrollYTarget - ins.scrollYCur) * 0.05;
        ins.tiltEl.style.transform =
          `rotateX(${(-ins.mouseTy / 6).toFixed(2)}deg) ` +
          `rotateY(${(ins.mouseTx / 6).toFixed(2)}deg) ` +
          `translate3d(${ins.mouseTx.toFixed(1)}px, ${(-ins.scrollYCur * pf.parallax).toFixed(1)}px, 0)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      ctx.revert();
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMouse);
      instances.current = [];
    };
  }, [enabled, isMobile]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={bgRoot}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 15, perspective: 1200 }}
      />
      <div
        ref={fgRoot}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 20, perspective: 1200 }}
      />
    </>
  );
}
