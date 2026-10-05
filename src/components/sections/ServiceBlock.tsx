/**
 * ServiceBlock.tsx
 * ─────────────────────────────────────────────────────────────
 * Editorial Service Module with strictly contained 3D hover image.
 *
 * Requirements:
 * - Card: position: relative; overflow: hidden;
 * - Image: position: absolute; strictly inside the hovered card
 * - Hover in: opacity 0 → 1, scale 0.75 → 1, rotate -8° → 0°, translateY 20px → 0 (500–700ms)
 * - Subtle floating while cursor stays: translateY: 0 → -6px → 0
 * - 3D depth: perspective(800px) rotateY(-10deg) rotateX(6deg), drop-shadow(0 20px 30px rgba(0,0,0,0.25))
 * - Never blocks text readability (content sits at z-index 2)
 * - Mobile: viewport detection / tap reveal
 */

"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import type { ServiceItem } from "@/data/services";

export function ServiceBlock({
  service,
  extraClass = "",
  scrollY,
  scrollX,
}: {
  service: ServiceItem;
  extraClass?: string;
  scrollY?: number;
  scrollX?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLElement>(null);
  const floatTweenRef = useRef<gsap.core.Tween | null>(null);
  const cycleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none) or (max-width: 768px)");
    const updateMq = () => setIsMobile(mq.matches);
    updateMq();
    mq.addEventListener("change", updateMq);
    return () => mq.removeEventListener("change", updateMq);
  }, []);

  /* Initial 3D state — hidden, recessed down in 3D perspective */
  useEffect(() => {
    const cardEl = cardRef.current;
    if (!cardEl) return;

    gsap.set(cardEl, {
      opacity: 0,
      scale: 0.75,
      rotationZ: -8,
      rotationY: -10,
      rotationX: 6,
      y: 20,
      transformPerspective: 800,
      transformOrigin: "center center",
    });
  }, []);

  /* Mobile viewport reveal */
  useEffect(() => {
    if (!isMobile) return;
    const blockEl = blockRef.current;
    const cardEl = cardRef.current;
    if (!blockEl || !cardEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(cardEl, {
            opacity: 0.88,
            scale: 0.95,
            rotationZ: -3,
            rotationY: -8,
            rotationX: 5,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          });
        } else {
          gsap.to(cardEl, {
            opacity: 0,
            scale: 0.75,
            rotationZ: -8,
            y: 20,
            duration: 0.4,
            ease: "power2.in",
          });
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(blockEl);
    return () => observer.disconnect();
  }, [isMobile]);

  /* Hover enter — emerge from inside the card */
  const handleEnter = () => {
    if (isMobile) return;
    const cardEl = cardRef.current;
    if (!cardEl) return;

    gsap.killTweensOf(cardEl);
    if (floatTweenRef.current) {
      floatTweenRef.current.kill();
      floatTweenRef.current = null;
    }

    // 1. Entrance animation (opacity 0 → 1, scale 0.75 → 1, rotate -8° → 0°, translateY 20px → 0)
    gsap.to(cardEl, {
      opacity: 1,
      scale: 1,
      rotationZ: 0,
      rotationY: -10,
      rotationX: 6,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
        // 2. Subtle floating motion while cursor remains over card (translateY: 0 → -6px → 0)
        floatTweenRef.current = gsap.to(cardEl, {
          y: -6,
          duration: 1.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      },
    });

    // Optional subtle crossfade if service has multiple images
    if (service.images.length > 1) {
      if (cycleIntervalRef.current) clearInterval(cycleIntervalRef.current);
      cycleIntervalRef.current = setInterval(() => {
        setActiveImgIndex((prev) => (prev + 1) % service.images.length);
      }, 2400);
    }
  };

  /* Hover leave — smooth retreat back inside card */
  const handleLeave = () => {
    if (isMobile) return;
    const cardEl = cardRef.current;
    if (!cardEl) return;

    if (cycleIntervalRef.current) {
      clearInterval(cycleIntervalRef.current);
      cycleIntervalRef.current = null;
    }
    if (floatTweenRef.current) {
      floatTweenRef.current.kill();
      floatTweenRef.current = null;
    }
    gsap.killTweensOf(cardEl);

    gsap.to(cardEl, {
      opacity: 0,
      scale: 0.75,
      rotationZ: -8,
      rotationY: -10,
      rotationX: 6,
      y: 20,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        setActiveImgIndex(0);
      },
    });
  };

  /* Mobile tap toggle */
  const handleTouch = () => {
    if (!isMobile) return;
    const cardEl = cardRef.current;
    if (!cardEl) return;

    const next = !isTapped;
    setIsTapped(next);

    gsap.killTweensOf(cardEl);
    if (next) {
      gsap.to(cardEl, {
        opacity: 1,
        scale: 1,
        rotationZ: 0,
        rotationY: -10,
        rotationX: 6,
        y: 0,
        duration: 0.55,
        ease: "power2.out",
      });
    } else {
      gsap.to(cardEl, {
        opacity: 0,
        scale: 0.75,
        rotationZ: -8,
        y: 20,
        duration: 0.35,
        ease: "power2.in",
      });
    }
  };

  return (
    <article
      ref={blockRef}
      className={`svc-block card-hover-premium ${extraClass}`.trim()}
      data-stagger-child
      {...(typeof scrollY === "number"
        ? { "data-scroll-y": String(scrollY) }
        : {})}
      {...(typeof scrollX === "number"
        ? { "data-scroll-x": String(scrollX) }
        : {})}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      onTouchStart={handleTouch}
    >
      {/* Orange accent line */}
      <span className="svc-accent" aria-hidden="true" />

      {/* Text content — guaranteed above image via z-index */}
      <div className="svc-content-layer">
        <div className="svc-top">
          <span className="svc-index">{service.index}</span>
          <span className="svc-index-rule" aria-hidden="true" />
        </div>

        <h3 className="svc-title">{service.title}</h3>
        <p className="svc-desc">{service.description}</p>
      </div>

      {/* 3D image — strictly contained within this card */}
      <div className="svc-stage" aria-hidden="true">
        <div ref={cardRef} className="svc-3d-card">
          {service.images.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt=""
              loading="lazy"
              draggable={false}
              className={`svc-3d-img ${
                idx === activeImgIndex ? "svc-3d-active" : "svc-3d-hidden"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Footer: hairline + arrow button */}
      <div className="svc-footer">
        <span className="svc-line" aria-hidden="true" />
        <a
          className="svc-arrow"
          href="#contact"
          aria-label={`Start a ${service.title} project`}
        >
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M2 14L14 2M14 2H5M14 2v9"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </article>
  );
}
