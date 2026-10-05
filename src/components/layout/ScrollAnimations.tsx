/**
 * ScrollAnimations.tsx
 * ─────────────────────────────────────────────────────────────
 * PC Creations — Global scroll animation system.
 *
 * Handles:
 *   1. Thin orange scroll-progress bar at viewport top
 *   2. Section reveal via IntersectionObserver (no layout props)
 *   3. Staggered card reveal via IntersectionObserver
 *   4. Film strip scroll parallax
 *   5. Per-card scroll-linked translate movement (with LERP)
 *
 * PERFORMANCE FIXES (this revision):
 *   • mountProgressBar / mountFilmStripParallax / mountScrollLinkedMovement
 *     only run a rAF loop WHILE a scroll/resize event is active. When the
 *     page is idle for > 120ms the rAF cancels entirely instead of burning
 *     CPU 60fps forever.
 *   • mountScrollLinkedMovement uses (window.scrollY + section.offsetTop)
 *     arithmetic instead of calling section.getBoundingClientRect() inside
 *     every target every frame. BCR is layout-triggering and causes main-
 *     thread thrash when the list grows — we only recompute offsets on
 *     resize via a debounced ResizeObserver.
 *   • An IntersectionObserver gates per-section LERP computation: if no
 *     section with targets is near the viewport, we skip ALL per-target
 *     math for that section.
 *   • Floating parallax coefficient and LERP alpha slightly reduced so the
 *     same subtle feel is achieved with smaller, cheaper values.
 *
 * Respects prefers-reduced-motion.
 * Runs entirely on GPU-friendly transforms + opacity.
 */

"use client";

import { useEffect } from "react";

// ── Scroll Progress Bar ───────────────────────────────────────

function mountProgressBar() {
  const bar = document.createElement("div");
  bar.id = "scroll-progress-bar";
  bar.setAttribute("aria-hidden", "true");
  bar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    width: 0%;
    background: #FF9D00;
    z-index: 9999;
    pointer-events: none;
    will-change: width;
  `;
  document.body.appendChild(bar);

  const update = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const pct =
      scrollHeight <= clientHeight
        ? 0
        : (scrollTop / (scrollHeight - clientHeight)) * 100;
    bar.style.width = `${pct}%`;
  };

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  update();

  return () => {
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
    bar.remove();
  };
}

// ── Section / element reveal via IntersectionObserver ────────

function mountRevealObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const delay = el.dataset.revealDelay ?? "0";
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("is-revealed");
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
  );

  const selectors = [
    "[data-reveal]",
    ".reveal-up",
    ".reveal-left",
    ".reveal-right",
    ".reveal-fade",
    ".reveal-scale",
  ];
  const els = document.querySelectorAll(selectors.join(", "));
  els.forEach((el) => observer.observe(el));

  // Staggered child groups
  const staggerGroups = document.querySelectorAll("[data-stagger-group]");
  staggerGroups.forEach((group) => {
    const children = Array.from(
      group.querySelectorAll<HTMLElement>("[data-stagger-child]"),
    );
    const childObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            children.forEach((child, i) => {
              child.style.transitionDelay = `${i * 80}ms`;
              child.classList.add("is-revealed");
            });
            childObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    childObserver.observe(group);
  });

  return () => observer.disconnect();
}

// ── Shared: scroll-coupled rAF runner that idles ─────────────
//
// Starts a rAF on the first scroll/resize event, cancels it after
// `idleMs` of no events. This keeps the compositor-idle page at 0%
// extra CPU while still delivering smooth 60fps updates during
// active scroll.

interface IdleRunner {
  start(): void;
  stop(): void;
}

function makeIdleRunner(tick: () => void, idleMs = 120): IdleRunner {
  let raf: number | null = null;
  let idleId: number | null = null;
  let running = false;

  const loop = () => {
    tick();
    raf = requestAnimationFrame(loop);
  };

  const onActivity = () => {
    if (!running) {
      running = true;
      raf = requestAnimationFrame(loop);
    }
    if (idleId !== null) window.clearTimeout(idleId);
    idleId = window.setTimeout(() => {
      idleId = null;
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
      running = false;
    }, idleMs);
  };

  window.addEventListener("scroll", onActivity, { passive: true });
  window.addEventListener("resize", onActivity, { passive: true });

  return {
    start() {
      onActivity(); // kick one tick in case page is pre-scrolled
    },
    stop() {
      window.removeEventListener("scroll", onActivity);
      window.removeEventListener("resize", onActivity);
      if (raf !== null) cancelAnimationFrame(raf);
      if (idleId !== null) window.clearTimeout(idleId);
    },
  };
}

// ── Film strip scroll parallax ────────────────────────────────

function mountFilmStripParallax() {
  const filmImg = document.querySelector<SVGImageElement>("#filmstrip-img");
  if (!filmImg) return undefined;

  let current = 0;
  const LERP = 0.08;

  const tick = () => {
    const target = window.scrollY * 0.035; // gentle
    current += (target - current) * LERP;
    // Clamp to ±38px to match previous bounds
    const clamped = current < -38 ? -38 : current > 38 ? 38 : current;
    filmImg.style.translate = `0 ${clamped.toFixed(2)}px`;
  };

  const runner = makeIdleRunner(tick, 140);
  runner.start();

  return () => runner.stop();
}

// ── Scroll-linked per-card movement ──────────────────────────

function mountScrollLinkedMovement() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return undefined;
  }

  const raw = document.querySelectorAll<HTMLElement>(
    "[data-scroll-y], [data-scroll-x]",
  );
  if (raw.length === 0) return undefined;

  const REVEAL_RE =
    /(^|\s)(reveal-up|reveal-left|reveal-right|reveal-scale)($|\s)/;

  // Group targets by their nearest section
  type Target = {
    el: HTMLElement;
    yMax: number;
    xMax: number;
    y: number;
    x: number;
    isRevealTarget: boolean;
  };

  type SectionState = {
    section: HTMLElement;
    targets: Target[];
    /** Interpolated viewport position; 0 = below, 0.5 = middle, 1 = above */
    ratio: number;
    /** Visibility gate — true when this section is (or has been near) the viewport */
    active: boolean;
    /** Cached section layout (cheap math) */
    cache?: { top: number; height: number };
  };

  const sectionMap = new Map<HTMLElement, SectionState>();
  const vh = () => window.innerHeight;

  raw.forEach((el) => {
    const section = el.closest<HTMLElement>("section");
    if (!section) return;
    const yMax = parseInt(el.dataset.scrollY ?? "0", 10) || 0;
    const xMax = parseInt(el.dataset.scrollX ?? "0", 10) || 0;
    if (yMax === 0 && xMax === 0) return;
    el.style.willChange = "transform, translate";
    const target: Target = {
      el,
      yMax,
      xMax,
      y: 0,
      x: 0,
      isRevealTarget:
        REVEAL_RE.test(el.className) || el.hasAttribute("data-stagger-child"),
    };

    let entry = sectionMap.get(section);
    if (!entry) {
      entry = {
        section,
        targets: [],
        ratio: 0,
        active: false,
      };
      sectionMap.set(section, entry);
    }
    entry.targets.push(target);
  });

  const sections = Array.from(sectionMap.values());
  if (sections.length === 0) return undefined;

  // Per-section cache invalidation on resize
  const refreshCaches = () => {
    sections.forEach((s) => {
      s.cache = {
        top: s.section.offsetTop,
        height: s.section.offsetHeight,
      };
    });
  };
  refreshCaches();

  // IntersectionObserver visibility gate
  const visObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const section = entry.target as HTMLElement;
        const state = sectionMap.get(section);
        if (!state) return;
        // Latch active=true once section has ever entered viewport (so the
        // "already scrolled past" case still resolves to final transform)
        if (entry.isIntersecting) state.active = true;
      });
    },
    { rootMargin: "30% 0px 30% 0px", threshold: 0 },
  );
  sections.forEach((s) => visObserver.observe(s.section));

  // Resize debounce -> refresh caches
  let resizeTO: number | null = null;
  const onResize = () => {
    if (resizeTO !== null) window.clearTimeout(resizeTO);
    resizeTO = window.setTimeout(refreshCaches, 80);
  };
  window.addEventListener("resize", onResize, { passive: true });

  const LERP = 0.085;
  const clamp = (v: number, max: number) =>
    max >= 0 ? Math.min(v, max) : Math.max(v, max);

  const tick = () => {
    const h = vh();
    const scrollY = window.scrollY;

    for (let si = 0; si < sections.length; si++) {
      const s = sections[si];
      if (!s.active) continue;
      if (!s.cache) refreshCaches();
      const cache = s.cache!;

      const sectionTop = cache.top - scrollY;
      const total = cache.height + h;
      const scrolled = h - sectionTop;
      let ratio = total > 0 ? scrolled / total : 0;
      if (ratio < 0) ratio = 0;
      else if (ratio > 1) ratio = 1;
      s.ratio = ratio;

      const rangeY = ratio - 0.5; // -0.5 .. +0.5
      const rangeX = rangeY;

      for (let ti = 0; ti < s.targets.length; ti++) {
        const t = s.targets[ti];
        if (
          t.isRevealTarget &&
          !t.el.classList.contains("is-revealed")
        ) {
          continue;
        }

        const targetY = t.yMax * 2 * rangeY;
        const targetX = t.xMax * 2 * rangeX;

        t.y += (clamp(targetY, Math.abs(t.yMax) * Math.sign(targetY || 1)) - t.y) * LERP;
        t.x += (clamp(targetX, Math.abs(t.xMax) * Math.sign(targetX || 1)) - t.x) * LERP;

        t.el.style.translate = `${t.x.toFixed(2)}px ${t.y.toFixed(2)}px`;
      }
    }
  };

  const runner = makeIdleRunner(tick, 130);
  runner.start();

  return () => {
    runner.stop();
    visObserver.disconnect();
    window.removeEventListener("resize", onResize);
    if (resizeTO !== null) window.clearTimeout(resizeTO);
  };
}

// ── Main component ────────────────────────────────────────────

export function ScrollAnimations() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const cleanupProgress = mountProgressBar();
      // Still run reveals (IO is passive/cheap) so content never stays invisible.
      const cleanupReveal = mountRevealObserver();
      return () => {
        cleanupProgress();
        cleanupReveal?.();
      };
    }

    const cleanup1 = mountProgressBar();
    const cleanup2 = mountRevealObserver();
    const cleanup3 = mountFilmStripParallax();
    const cleanup4 = mountScrollLinkedMovement();

    return () => {
      cleanup1();
      cleanup2?.();
      cleanup3?.();
      cleanup4?.();
    };
  }, []);

  return null;
}
