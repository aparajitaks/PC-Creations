/**
 * FloatingLottieElements.tsx
 * ─────────────────────────────────────────────────────────────
 * Floating Lottie animation elements that fill the whitespace
 * between Results and Testimonials sections.
 *
 * Features:
 * - 3-5 floating like/thumb-up animations (desktop)
 * - Subtle organic movement with different paths
 * - Responsive: 2-3 tablet, 1-2 mobile
 * - Performance-optimized with CSS transforms
 * - Respects prefers-reduced-motion
 */

"use client";

import React, { useRef, useEffect, useState } from "react";
import { useGsap } from "@/hooks/useGsap";
import dynamic from "next/dynamic";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  {
    ssr: false,
    loading: () => null,
  }
);

interface LottieElement {
  id: string;
  src: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  duration: number;
  delay: number;
  moveX: number;
  moveY: number;
  rotateTo: number;
  scaleTo: number;
}

const LOTTIE_ANIMATIONS = [
  "/lottie/like button.json",
  "/lottie/like it 2.0.json",
  "/lottie/Like animations.json",
];

// Generate positions for desktop (3-5 elements)
const getDesktopElements = (): LottieElement[] => [
  {
    id: "like-1",
    src: LOTTIE_ANIMATIONS[0],
    x: 10,
    y: 20,
    scale: 0.9,
    rotation: -5,
    duration: 8,
    delay: 0,
    moveX: 15,
    moveY: -10,
    rotateTo: 5,
    scaleTo: 1.0,
  },
  {
    id: "like-2",
    src: LOTTIE_ANIMATIONS[1],
    x: 75,
    y: 15,
    scale: 1.1,
    rotation: 8,
    duration: 10,
    delay: 1,
    moveX: -12,
    moveY: 12,
    rotateTo: -5,
    scaleTo: 1.0,
  },
  {
    id: "like-3",
    src: LOTTIE_ANIMATIONS[2],
    x: 20,
    y: 60,
    scale: 0.85,
    rotation: -3,
    duration: 9,
    delay: 2,
    moveX: 18,
    moveY: -8,
    rotateTo: 4,
    scaleTo: 0.95,
  },
  {
    id: "like-4",
    src: LOTTIE_ANIMATIONS[0],
    x: 80,
    y: 55,
    scale: 0.95,
    rotation: 6,
    duration: 11,
    delay: 0.5,
    moveX: -15,
    moveY: 10,
    rotateTo: -4,
    scaleTo: 1.05,
  },
  {
    id: "like-5",
    src: LOTTIE_ANIMATIONS[1],
    x: 50,
    y: 40,
    scale: 0.8,
    rotation: -8,
    duration: 7,
    delay: 1.5,
    moveX: 10,
    moveY: -12,
    rotateTo: 3,
    scaleTo: 0.9,
  },
];

// Generate positions for tablet (2-3 elements)
const getTabletElements = (): LottieElement[] => [
  {
    id: "like-1",
    src: LOTTIE_ANIMATIONS[0],
    x: 15,
    y: 25,
    scale: 0.85,
    rotation: -4,
    duration: 9,
    delay: 0,
    moveX: 12,
    moveY: -8,
    rotateTo: 4,
    scaleTo: 0.95,
  },
  {
    id: "like-2",
    src: LOTTIE_ANIMATIONS[1],
    x: 70,
    y: 50,
    scale: 1.0,
    rotation: 6,
    duration: 10,
    delay: 1,
    moveX: -10,
    moveY: 10,
    rotateTo: -4,
    scaleTo: 1.05,
  },
  {
    id: "like-3",
    src: LOTTIE_ANIMATIONS[2],
    x: 40,
    y: 35,
    scale: 0.9,
    rotation: -3,
    duration: 8,
    delay: 0.5,
    moveX: 8,
    moveY: -6,
    rotateTo: 3,
    scaleTo: 0.95,
  },
];

// Generate positions for mobile (1-2 elements)
const getMobileElements = (): LottieElement[] => [
  {
    id: "like-1",
    src: LOTTIE_ANIMATIONS[0],
    x: 15,
    y: 30,
    scale: 0.75,
    rotation: -3,
    duration: 10,
    delay: 0,
    moveX: 8,
    moveY: -6,
    rotateTo: 3,
    scaleTo: 0.85,
  },
  {
    id: "like-2",
    src: LOTTIE_ANIMATIONS[1],
    x: 65,
    y: 55,
    scale: 0.85,
    rotation: 5,
    duration: 11,
    delay: 1,
    moveX: -6,
    moveY: 8,
    rotateTo: -3,
    scaleTo: 0.95,
  },
];

export function FloatingLottieElements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useGsap<HTMLDivElement>((gsap) => {
    const container = containerRef.current;
    if (!container || !isMounted) return;

    // Check for reduced motion preference
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      // Static position for reduced motion
      gsap.set(elementRefs.current.values(), {
        opacity: 0.4,
      });
      return;
    }

    // Get elements based on viewport width
    const width = window.innerWidth;
    let elements: LottieElement[];

    if (width < 768) {
      elements = getMobileElements();
    } else if (width < 1024) {
      elements = getTabletElements();
    } else {
      elements = getDesktopElements();
    }

    // Create floating animations for each element
    const tweens = elements.map((el) => {
      const domEl = elementRefs.current.get(el.id);
      if (!domEl) return null;

      // Set initial position
      gsap.set(domEl, {
        left: `${el.x}%`,
        top: `${el.y}%`,
        scale: el.scale,
        rotation: el.rotation,
        opacity: 0.6,
      });

      // Create floating animation with deterministic values
      const floatTween = gsap.to(domEl, {
        x: el.moveX,
        y: el.moveY,
        rotation: el.rotateTo,
        scale: el.scaleTo,
        duration: el.duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: el.delay,
      });

      return floatTween;
    });

    // Responsive adjustments
    const handleResize = () => {
      const newWidth = window.innerWidth;
      let newElements: LottieElement[];

      if (newWidth < 768) {
        newElements = getMobileElements();
      } else if (newWidth < 1024) {
        newElements = getTabletElements();
      } else {
        newElements = getDesktopElements();
      }

      // Kill existing tweens
      tweens.forEach((tween) => tween?.kill());

      // Create new animations
      newElements.forEach((el) => {
        const domEl = elementRefs.current.get(el.id);
        if (!domEl) return;

        gsap.set(domEl, {
          left: `${el.x}%`,
          top: `${el.y}%`,
          scale: el.scale,
          rotation: el.rotation,
          opacity: 0.6,
        });

        gsap.to(domEl, {
          x: el.moveX,
          y: el.moveY,
          rotation: el.rotateTo,
          scale: el.scaleTo,
          duration: el.duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: el.delay,
        });
      });
    };

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 150);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimeout);
      tweens.forEach((tween) => tween?.kill());
    };
  }, containerRef);

  // Get current elements based on viewport
  const width = isMounted && typeof window !== "undefined" ? window.innerWidth : 1024;
  let elements: LottieElement[];

  if (width < 768) {
    elements = getMobileElements();
  } else if (width < 1024) {
    elements = getTabletElements();
  } else {
    elements = getDesktopElements();
  }

  if (!isMounted) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ zIndex: 3 }}
    >
      {elements.map((el) => (
        <div
          key={el.id}
          ref={(ref) => {
            if (ref) elementRefs.current.set(el.id, ref);
          }}
          className="absolute w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            willChange: "transform",
          }}
        >
          <Player
            src={el.src}
            loop={true}
            autoplay={true}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      ))}
    </div>
  );
}
