/**
 * HeroAssets.tsx — Social Media Universe Hero
 * ─────────────────────────────────────────────────────────────
 * PC Creations — Animated "Social Media Marketing Universe"
 *
 * Every visual element is an independent animated layer:
 *   placement div (left/top/width) → parallax div → entrance div → float div → img
 *
 * ANIMATIONS:
 *   - Entrance sequence (staggered, ~1.6s)
 *   - Continuous asynchronous float loops (unique duration/delay)
 *   - Mouse parallax with per-layer depth coefficients (lerp)
 *   - prefers-reduced-motion respected
 */

"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import META from "./anim-meta.json";

const A = "/images/hero/anim";
const SCENE_W = 1303;
const SCENE_H = 1207;

const px = (v?: number) => (v !== undefined ? `${(v / SCENE_W) * 100}%` : undefined);
const py = (v?: number) => (v !== undefined ? `${(v / SCENE_H) * 100}%` : undefined);

interface MetaEntry { x: number; y: number; w: number; h: number }

function SceneSprite({
  src, alt, meta, depth, depthY, entCls, fCls, z, extra,
}: {
  src: string; alt: string; meta: MetaEntry;
  depth: number; depthY?: number;
  entCls: string; fCls: string; z?: number;
  extra?: React.ReactNode;
}) {
  return (
    <div
      className="absolute"
      style={{ left: px(meta.x), top: py(meta.y), width: px(meta.w), aspectRatio: `${meta.w} / ${meta.h}`, zIndex: z ?? 1, willChange: "transform" }}
    >
      <div className="h-parallax" data-depth-x={depth} data-depth-y={depthY ?? depth * 0.75}>
        <div className={`h-entrance ${entCls}`} style={{ opacity: 0, willChange: "transform" }}>
          <div className={fCls} style={{ willChange: "transform" }}>
            {extra}
            <img src={src} alt={alt} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", display: "block", objectFit: "contain" }} draggable={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Same layer stack for root-level elements (positioned with arbitrary CSS) */
function RootSprite({
  src, alt, entCls, fCls, depth, depthY, style, imgStyle,
}: {
  src: string; alt: string;
  entCls: string; fCls: string;
  depth: number; depthY?: number;
  style: React.CSSProperties;
  imgStyle?: React.CSSProperties;
}) {
  return (
    <div className="absolute" style={{ ...style, willChange: "transform" }}>
      <div className="h-parallax" data-depth-x={depth} data-depth-y={depthY ?? depth * 0.75}>
        <div className={`h-entrance ${entCls}`} style={{ opacity: 0, willChange: "transform" }}>
          <div className={fCls} style={{ willChange: "transform" }}>
            <img src={src} alt={alt} loading="lazy" decoding="async" style={{ width: "100%", height: "auto", display: "block", ...imgStyle }} draggable={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroAssets() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = wrapRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const parEls = gsap.utils.toArray<HTMLElement>(".h-parallax");
      const entranceEls = gsap.utils.toArray<HTMLElement>(".h-entrance");

      if (reducedMotion) {
        gsap.set(entranceEls, { opacity: 1 });
        gsap.set(".h-bubble", { opacity: 1 });
        gsap.set(".h-emoji", { opacity: 1 });
        gsap.utils.toArray<HTMLElement>(".h-graph").forEach((el) => gsap.set(el, { clipPath: "inset(0 0% 0 0)" }));
        return;
      }

      // ── ENTRANCE SEQUENCE (≈1.6s total) ──
      const t0 = 0.6;
      gsap.utils.toArray<HTMLElement>(".h-ent-char").forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 60, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power3.out", delay: t0 + i * 0.09 });
      });
      gsap.fromTo(".h-laptop", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: t0 + 0.3 });
      gsap.fromTo(".h-fb", { opacity: 0, x: -60, y: -30, scale: 0.7 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.9, ease: "back.out(1.4)", delay: t0 + 0.35 });
      gsap.fromTo(".h-ig", { opacity: 0, x: 60, y: -30, scale: 0.7 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.9, ease: "back.out(1.4)", delay: t0 + 0.5 });
      gsap.fromTo(".h-wa", { opacity: 0, x: -50, y: 10, scale: 0.7 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.9, ease: "back.out(1.4)", delay: t0 + 0.65 });
      gsap.fromTo(".h-like-btn", { opacity: 0, x: -30, y: 24 }, { opacity: 1, x: 0, y: 0, duration: 0.8, ease: "power3.out", delay: t0 + 0.8 });
      gsap.fromTo(".h-comment-btn", { opacity: 0, x: 40, y: -20 }, { opacity: 1, x: 0, y: 0, duration: 0.8, ease: "power3.out", delay: t0 + 0.95 });
      gsap.fromTo(".h-share-btn", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: t0 + 1.1 });
      gsap.fromTo(".h-mkt", { opacity: 0, scale: 0.75, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(1.6)", stagger: 0.07, delay: t0 + 0.55 });
      gsap.fromTo(".h-emoji", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)", stagger: 0.09, delay: t0 + 0.85 });
      gsap.fromTo(".h-bubble", { opacity: 0, scale: 0.5 }, { opacity: (i, el) => parseFloat((el as HTMLElement).dataset.op || "0.9"), scale: 1, duration: 0.8, ease: "power2.out", stagger: 0.05, delay: t0 + 1.15 });
      gsap.utils.toArray<HTMLElement>(".h-graph").forEach((el, i) => {
        gsap.fromTo(el, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.3, ease: "power2.inOut", delay: t0 + 0.9 + i * 0.2 });
      });

      const LOOP = t0 + 1.6;

      // ── 1. CHARACTERS ──
      const charSpecs = [
        { sel: ".h-char1-f", y: 6, d: 4.5, r: 1.6 },
        { sel: ".h-char2-f", y: -8, d: 5.2, r: -1.6 },
        { sel: ".h-char3-f", y: 5, d: 4.8, r: 1.2 },
        { sel: ".h-char4-f", y: -6, d: 5.5, r: -1.8 },
      ];
      charSpecs.forEach((c, i) => {
        gsap.to(c.sel, { y: c.y, duration: c.d / 2, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP + i * 0.3 });
        gsap.to(c.sel, { rotation: c.r, duration: c.d, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP + i * 0.2, transformOrigin: "50% 90%" });
      });

      // ── 17. LAPTOP ──
      gsap.to(".h-laptop-float", { y: 5, duration: 2.4, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP + 0.6 });
      gsap.to(".h-laptop-float img", { rotation: 0.7, duration: 2.8, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP, transformOrigin: "50% 100%" });
      gsap.to(".h-laptop-float img", { filter: "brightness(1.07)", duration: 2.2, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP + 0.4 });
      gsap.fromTo(".h-laptop-glow", { opacity: 0.05 }, { opacity: 0.22, duration: 2.6, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP + 0.3 });

      // ── 2. FACEBOOK ──
      gsap.to(".h-fb-float", { x: 8, y: 12, duration: 2.8, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP });
      gsap.fromTo(".h-fb-float", { rotation: -3 }, { rotation: 3, duration: 2.8, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP, immediateRender: false });
      gsap.to(".h-fb-float img", { scale: 1.04, duration: 2.8, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP });

      // ── 3. INSTAGRAM ──
      gsap.to(".h-ig-float", { y: 15, scale: 1.04, duration: 3, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP + 0.8 });
      gsap.fromTo(".h-ig-float", { rotation: -3 }, { rotation: 3, duration: 3, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP + 0.8, immediateRender: false });

      // ── 4. WHATSAPP ──
      gsap.to(".h-wa-float", { y: -11, x: 7, duration: 2.35, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP + 1.5 });
      gsap.fromTo(".h-wa-float", { rotation: -2.5 }, { rotation: 2.5, duration: 2.35, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP + 1.5, immediateRender: false });

      // ── 5. LIKE BUTTON ──
      const likeTl = gsap.timeline({ repeat: -1, delay: LOOP + 0.5 });
      likeTl.to(".h-like-float", { x: 12, y: -10, rotation: 2, duration: 1.8, ease: "sine.inOut" })
            .to(".h-like-float", { x: -4, y: -18, rotation: -2, duration: 1.8, ease: "sine.inOut" })
            .to(".h-like-float", { x: 0, y: 0, rotation: 0, duration: 1.9, ease: "sine.inOut" });

      // ── 6. COMMENT BUTTON ──
      const cTl = gsap.timeline({ repeat: -1, delay: LOOP + 1.1 });
      cTl.to(".h-comment-float", { x: 12, duration: 1.25, ease: "sine.inOut" })
         .to(".h-comment-float", { x: 0, duration: 1.25, ease: "sine.inOut" })
         .to(".h-comment-float", { x: -8, duration: 1.25, ease: "sine.inOut" })
         .to(".h-comment-float", { x: 0, duration: 1.25, ease: "sine.inOut" });
      gsap.to(".h-comment-float", { y: -8, rotation: 1.5, duration: 2.5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP + 1.1 });

      // ── 7. SHARE BUTTON ──
      const sTl = gsap.timeline({ repeat: -1, delay: LOOP + 1.8 });
      sTl.to(".h-share-float", { x: 10, y: -12, rotation: 3, duration: 1.8, ease: "sine.inOut" })
         .to(".h-share-float", { x: -5, y: -20, rotation: -3, duration: 1.8, ease: "sine.inOut" })
         .to(".h-share-float", { x: 0, y: 0, rotation: 0, duration: 1.9, ease: "sine.inOut" });

      // ── 8. REACTION EMOJIS ──
      const emojiSpecs = [
        { i: 1, vars: { y: 8 },  d: 4.2 },
        { i: 2, vars: { y: -12 }, d: 5.1 },
        { i: 3, vars: { x: 7 },  d: 3.8 },
        { i: 4, vars: { y: 10 }, d: 4.7 },
        { i: 5, vars: { x: -10 }, d: 5.6 },
        { i: 6, vars: { y: -7 }, d: 3.5 },
      ];
      emojiSpecs.forEach((e, idx) => {
        gsap.to(`.h-emoji-f${e.i}`, { ...e.vars, duration: e.d / 2, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP + idx * 0.35 });
        gsap.to(`.h-emoji-f${e.i}`, { rotation: idx % 2 ? 3 : -3, duration: e.d, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP + idx * 0.2 });
      });

      // ── 9. FLOATING BUBBLES ──
      gsap.utils.toArray<HTMLElement>(".h-bubble-f").forEach((el, i) => {
        const fg = (el as HTMLElement).dataset.depth === "fg";
        const d = 5 + (i % 5) * 1.1;
        const mode = i % 3;
        if (mode === 0) gsap.to(el, { y: fg ? -26 : -14, duration: d / 2, ease: "sine.inOut", repeat: -1, yoyo: true, delay: i * 0.5 });
        else if (mode === 1) gsap.to(el, { x: fg ? 16 : 9, duration: d / 2, ease: "sine.inOut", repeat: -1, yoyo: true, delay: i * 0.5 });
        else gsap.to(el, { y: fg ? 14 : 8, duration: d / 2, ease: "sine.inOut", repeat: -1, yoyo: true, delay: i * 0.5 });
        gsap.to(el, { rotation: i % 2 ? 6 : -6, duration: d, ease: "sine.inOut", repeat: -1, yoyo: true, delay: i * 0.4 });
      });

      // ── 10. GRAPHS ──
      gsap.to(".h-graph-f1", { y: 8, duration: 3.6, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP + 1.2 });
      gsap.to(".h-graph-f2", { x: 4, rotation: 2, duration: 4.3, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP + 1.8 });

      // ── 11. MEGAPHONE ──
      gsap.to(".h-megaphone-f", { y: -8, scale: 1.03, duration: 2, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP + 0.4, transformOrigin: "50% 80%" });
      gsap.fromTo(".h-megaphone-f", { rotation: -2 }, { rotation: 2, duration: 2, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP + 0.4, immediateRender: false, transformOrigin: "50% 80%" });

      // ── 12. HASHTAG ──
      gsap.to(".h-hashtag-f", { x: 5, y: 8, duration: 2.25, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP + 0.9 });
      gsap.fromTo(".h-hashtag-f", { rotation: -4 }, { rotation: 4, duration: 2.25, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP + 0.9, immediateRender: false });

      // ── 13. SEARCH BAR ──
      gsap.to(".h-search-f", { y: -6, duration: 2.5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP + 0.7 });
      gsap.to(".h-search-f", { rotation: 1, duration: 2.5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP + 0.7 });

      // ── 14. ADS CARD ──
      gsap.to(".h-ads-f", { y: -10, duration: 2.5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP + 1.3 });
      gsap.fromTo(".h-ads-f", { rotation: 1 }, { rotation: -1, duration: 2.5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP + 1.3, immediateRender: false });

      // ── 15. @ SYMBOL ──
      gsap.to(".h-at-f", { y: 10, duration: 3, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP + 1.7 });
      gsap.fromTo(".h-at-f", { rotation: -5 }, { rotation: 5, duration: 3, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP + 1.7, immediateRender: false });

      // ── 16. EMAIL ──
      gsap.to(".h-email-f", { y: -12, duration: 2.25, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP + 0.2 });
      gsap.fromTo(".h-email-f", { rotation: -3 }, { rotation: 3, duration: 2.25, ease: "sine.inOut", repeat: -1, yoyo: true, delay: LOOP + 0.2, immediateRender: false });

      // ── 18. MOUSE PARALLAX ──
      let mx = 0, my = 0;
      const state = parEls.map((el) => ({
        el,
        dx: parseFloat(el.dataset.depthX || "0"),
        dy: parseFloat(el.dataset.depthY || "0"),
        cx: 0, cy: 0,
      }));
      const onMove = (e: MouseEvent) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 2;
        my = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMove, { passive: true });
      let raf = 0;
      const tick = () => {
        for (const s of state) {
          s.cx += (mx * s.dx - s.cx) * 0.06;
          s.cy += (my * s.dy - s.cy) * 0.06;
          s.el.style.transform = `translate3d(${s.cx.toFixed(2)}px, ${s.cy.toFixed(2)}px, 0)`;
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      return () => {
        window.removeEventListener("mousemove", onMove);
        cancelAnimationFrame(raf);
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="hidden lg:block absolute inset-0 z-[2] pointer-events-none select-none overflow-hidden"
    >
      {/* ambient glow */}
      <div
        className="absolute"
        style={{
          right: "5%", top: "15%",
          width: "clamp(300px, 45vw, 700px)", height: "clamp(300px, 45vw, 700px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(49,85,231,0.06) 0%, rgba(255,157,0,0.04) 50%, transparent 75%)",
          filter: "blur(60px)",
        }}
      />

      {/* BACKGROUND: floating like/heart bubbles */}
      <div
        className="absolute z-[1]"
        style={{
          right: "clamp(60px, 8vw, 120px)", top: "clamp(60px, 10vh, 140px)",
          width: "clamp(120px, 16vw, 220px)", aspectRatio: `${META._panel.w} / ${META._panel.h}`,
        }}
      >
        {Object.entries(META._panel.bubbles).map(([key, b], i) => {
          const fg = i % 3 === 0;
          return (
            <div
              key={key}
              className="h-bubble absolute"
              data-depth={fg ? "fg" : "bg"}
              data-op={fg ? 0.95 : 0.6}
              style={{
                left: `${(b.x / META._panel.w) * 100}%`,
                top: `${(b.y / META._panel.h) * 100}%`,
                width: `${(b.w / META._panel.w) * 100}%`,
                opacity: 0, zIndex: fg ? 3 : 1, willChange: "transform",
              }}
            >
              <div className="h-parallax" data-depth-x={fg ? 4 : 2.5} data-depth-y={fg ? 3 : 1.8}>
                <div className="h-bubble-f" data-depth={fg ? "fg" : "bg"} style={{ willChange: "transform", aspectRatio: `${b.w} / ${b.h}` }}>
                  <img src={`${A}/${key}.png`} alt="" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", display: "block", objectFit: "contain", opacity: fg ? 1 : 0.7 }} draggable={false} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MIDGROUND: Facebook / Instagram / WhatsApp */}
      <RootSprite
        src={`${A}/facebook.png`} alt="Facebook" entCls="h-fb" fCls="h-fb-float" depth={7} depthY={5}
        style={{ right: "clamp(200px, 42vw, 620px)", top: "clamp(80px, 11vh, 160px)", width: "clamp(64px, 7vw, 110px)", zIndex: 4, filter: "drop-shadow(0 12px 32px rgba(24,119,242,0.45))" }}
        imgStyle={{ borderRadius: "22%" }}
      />
      <RootSprite
        src={`${A}/instagram.png`} alt="Instagram" entCls="h-ig" fCls="h-ig-float" depth={6} depthY={4.5}
        style={{ right: "clamp(60px, 7vw, 100px)", top: "clamp(80px, 10vh, 150px)", width: "clamp(70px, 7.5vw, 116px)", zIndex: 4, filter: "drop-shadow(0 12px 32px rgba(225,48,108,0.35))" }}
        imgStyle={{ borderRadius: "22%" }}
      />
      <RootSprite
        src={`${A}/whatsapp.png`} alt="WhatsApp" entCls="h-wa" fCls="h-wa-float" depth={6.5} depthY={5}
        style={{ right: "clamp(240px, 50vw, 720px)", top: "clamp(200px, 38vh, 440px)", width: "clamp(58px, 6vw, 96px)", zIndex: 4, filter: "drop-shadow(0 10px 28px rgba(37,211,102,0.40))" }}
        imgStyle={{ borderRadius: "22%" }}
      />

      {/* CENTER + MIDGROUND: character scene */}
      <div
        className="absolute z-[3]"
        style={{
          right: "clamp(0px, 1vw, 40px)", bottom: "clamp(0px, 2vh, 30px)",
          width: "clamp(340px, 52vw, 780px)", aspectRatio: `${SCENE_W} / ${SCENE_H}`,
        }}
      >
        <SceneSprite src={`${A}/graph-left.png`} alt="Growth graph" meta={META["graph-left"]} depth={8} entCls="h-mkt h-graph" fCls="h-graph-f1" z={0} />
        <SceneSprite src={`${A}/graph-right.png`} alt="Growth graph" meta={META["graph-right"]} depth={8} entCls="h-mkt h-graph" fCls="h-graph-f2" z={0} />

        <SceneSprite src={`${A}/char1.png`} alt="Character 1" meta={META.char1} depth={4} entCls="h-ent-char" fCls="h-char1-f" z={2} />
        <SceneSprite src={`${A}/char2.png`} alt="Character 2" meta={META.char2} depth={5} entCls="h-ent-char" fCls="h-char2-f" z={3} />
        <SceneSprite src={`${A}/char3.png`} alt="Character 3" meta={META.char3} depth={4.5} entCls="h-ent-char" fCls="h-char3-f" z={4} />
        <SceneSprite src={`${A}/char4.png`} alt="Character 4" meta={META.char4} depth={5.5} entCls="h-ent-char" fCls="h-char4-f" z={3} />

        <SceneSprite
          src={`${A}/laptop.png`} alt="Analytics dashboard laptop" meta={META.laptop} depth={4.5}
          entCls="h-laptop" fCls="h-laptop-float" z={5}
          extra={
            <div
              className="h-laptop-glow absolute pointer-events-none"
              style={{
                inset: "8% 6% 18% 6%", borderRadius: 12,
                background: "radial-gradient(ellipse at 50% 40%, rgba(120,255,160,0.5), transparent 70%)",
                mixBlendMode: "screen", opacity: 0.05,
              }}
            />
          }
        />

        <SceneSprite src={`${A}/megaphone.png`} alt="Megaphone" meta={META.megaphone} depth={8} entCls="h-mkt" fCls="h-megaphone-f" z={5} />
        <SceneSprite src={`${A}/hashtag.png`} alt="Hashtag" meta={META.hashtag} depth={9} entCls="h-mkt" fCls="h-hashtag-f" z={5} />
        <SceneSprite src={`${A}/search-bar.png`} alt="Search growth..." meta={META["search-bar"]} depth={7} entCls="h-mkt" fCls="h-search-f" z={6} />
        <SceneSprite src={`${A}/ads-card.png`} alt="Ads card" meta={META["ads-card"]} depth={9} entCls="h-mkt" fCls="h-ads-f" z={6} />
        <SceneSprite src={`${A}/at-symbol.png`} alt="@ symbol" meta={META["at-symbol"]} depth={10} entCls="h-mkt" fCls="h-at-f" z={6} />
        <SceneSprite src={`${A}/email.png`} alt="Email" meta={META.email} depth={8} entCls="h-mkt" fCls="h-email-f" z={6} />
      </div>

      {/* REACTION EMOJI ROW */}
      <div
        className="absolute z-[5]"
        style={{
          right: "clamp(80px, 12vw, 190px)", bottom: "clamp(60px, 14vh, 200px)",
          width: "clamp(160px, 22vw, 320px)", aspectRatio: `${META._reactions.w} / ${META._reactions.h}`,
          filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.20))",
        }}
      >
        {Object.entries(META._reactions.emojis).map(([key, e], i) => (
          <div
            key={key}
            className="h-emoji absolute"
            style={{
              left: `${(e.x / META._reactions.w) * 100}%`,
              top: `${(e.y / META._reactions.h) * 100}%`,
              width: `${(e.w / META._reactions.w) * 100}%`,
              opacity: 0, willChange: "transform",
            }}
          >
            <div className="h-parallax" data-depth-x={4} data-depth-y={3}>
              <div className={`h-emoji-f${i + 1}`} style={{ willChange: "transform", aspectRatio: `${e.w} / ${e.h}` }}>
                <img src={`${A}/${key}.png`} alt={`Reaction ${i + 1}`} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", display: "block", objectFit: "contain" }} draggable={false} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOREGROUND: Like / Comment / Share */}
      <RootSprite
        src={`${A}/like-btn.png`} alt="Like" entCls="h-like-btn" fCls="h-like-float" depth={13} depthY={10}
        style={{ right: "clamp(200px, 46vw, 680px)", bottom: "clamp(100px, 22vh, 280px)", width: "clamp(100px, 12vw, 175px)", zIndex: 6, filter: "drop-shadow(0 10px 28px rgba(24,119,242,0.50))" }}
      />
      <RootSprite
        src={`${A}/comment-btn.png`} alt="Comment" entCls="h-comment-btn" fCls="h-comment-float" depth={11} depthY={8}
        style={{ right: "clamp(50px, 5.5vw, 80px)", top: "clamp(240px, 40vh, 470px)", width: "clamp(110px, 13vw, 185px)", zIndex: 6, filter: "drop-shadow(0 10px 28px rgba(24,119,242,0.50))" }}
      />
      <RootSprite
        src={`${A}/share-btn.png`} alt="Share" entCls="h-share-btn" fCls="h-share-float" depth={12} depthY={9}
        style={{ right: "clamp(30px, 3.5vw, 55px)", bottom: "clamp(60px, 16vh, 230px)", width: "clamp(100px, 12vw, 165px)", zIndex: 6, filter: "drop-shadow(0 10px 28px rgba(24,119,242,0.50))" }}
      />
    </div>
  );
}
