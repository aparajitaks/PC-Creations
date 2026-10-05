/**
 * SocialOrbitSystem.tsx
 * ─────────────────────────────────────────────────────────────
 * Master GSAP-Driven Social Motion System for PC Creations Hero.
 *
 * FEATURES:
 *   - Continuous asynchronous orbital drifting (X, Y, Rotation, Scale)
 *   - Dedicated orbital tracks surrounding the headline corridor
 *   - Mouse-driven 60fps parallax with layered depth coefficients
 *   - Responsive visibility (scales gracefully down on tablet/mobile)
 *   - Staggered GSAP entrance animation
 */

"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import {
  InstagramElement,
  FacebookElement,
  YouTubeElement,
  LinkedInElement,
  LikeElement,
  CommentElement,
  ShareElement,
  NotificationElement,
  CameraElement,
  CursorElement,
} from "./SocialElements";

interface OrbitItemConfig {
  id: string;
  component: React.ComponentType<{ className?: string }>;
  // Base position coordinates
  style: React.CSSProperties;
  // Unique animation parameters
  xRange: [number, number];
  yRange: [number, number];
  rotRange: [number, number];
  scaleRange: [number, number];
  duration: number;
  depth: number; // Parallax responsiveness
  hideOnMobile?: boolean;
}

const ORBIT_ITEMS: OrbitItemConfig[] = [
  // 1. Instagram — Upper Left Periphery
  {
    id: "orbit-instagram",
    component: InstagramElement,
    style: { top: "14%", left: "3%" },
    xRange: [-15, 18],
    yRange: [-12, 14],
    rotRange: [-3, 3],
    scaleRange: [0.96, 1.01],
    duration: 14,
    depth: 0.02,
  },
  // 2. YouTube — Upper Right Periphery
  {
    id: "orbit-youtube",
    component: YouTubeElement,
    style: { top: "14%", right: "3%" },
    xRange: [15, -18],
    yRange: [-14, 12],
    rotRange: [-3, 3],
    scaleRange: [0.95, 1.01],
    duration: 15,
    depth: 0.02,
  },
  // 3. Camera — Mid Outer Left
  {
    id: "orbit-camera",
    component: CameraElement,
    style: { top: "46%", left: "2%" },
    xRange: [-12, 16],
    yRange: [-18, 16],
    rotRange: [3, -3],
    scaleRange: [0.96, 1.01],
    duration: 16,
    depth: 0.015,
    hideOnMobile: true,
  },
  // 4. LinkedIn — Mid Outer Right
  {
    id: "orbit-linkedin",
    component: LinkedInElement,
    style: { top: "46%", right: "2%" },
    xRange: [14, -16],
    yRange: [-16, 20],
    rotRange: [-3, 3],
    scaleRange: [0.97, 1.01],
    duration: 17,
    depth: 0.015,
    hideOnMobile: true,
  },
  // 5. Facebook — Lower Left Periphery
  {
    id: "orbit-facebook",
    component: FacebookElement,
    style: { top: "78%", left: "4%" },
    xRange: [-14, 16],
    yRange: [-12, 14],
    rotRange: [-2, 2],
    scaleRange: [0.95, 1.01],
    duration: 15,
    depth: 0.02,
  },
  // 6. Share — Lower Right Periphery
  {
    id: "orbit-share",
    component: ShareElement,
    style: { top: "78%", right: "4%" },
    xRange: [16, -14],
    yRange: [-14, 16],
    rotRange: [-2, 2],
    scaleRange: [0.97, 1.01],
    duration: 14,
    depth: 0.02,
  },
];

export function SocialOrbitSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // 1. Initial Staggered Reveal
      gsap.from(".orbit-node", {
        opacity: 0,
        scale: 0.7,
        y: 40,
        stagger: 0.08,
        duration: 0.9,
        ease: "back.out(1.4)",
        delay: 0.4,
      });

      // 2. Individual Orbital Paths
      ORBIT_ITEMS.forEach((item) => {
        const el = elementsRef.current.get(item.id);
        if (!el) return;

        // X Movement Timeline (Sine wave)
        gsap.to(el, {
          x: item.xRange[1],
          duration: item.duration,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        // Y Movement Timeline (Shifted phase & duration for natural orbit)
        gsap.to(el, {
          y: item.yRange[1],
          duration: item.duration * 0.82,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: item.duration * 0.15,
        });

        // Rotation Wave
        gsap.to(el, {
          rotation: item.rotRange[1],
          duration: item.duration * 1.15,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        });

        // Subtle Breathing Scale
        gsap.to(el, {
          scale: item.scaleRange[1],
          duration: item.duration * 0.65,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      // 3. Mouse Parallax Integration with quickTo for buttery 60fps
      const parallaxSetters = ORBIT_ITEMS.map((item) => {
        const el = elementsRef.current.get(item.id);
        if (!el) return null;
        return {
          depth: item.depth,
          quickX: gsap.quickTo(el, "xPercent", { duration: 0.8, ease: "power2.out" }),
          quickY: gsap.quickTo(el, "yPercent", { duration: 0.8, ease: "power2.out" }),
        };
      }).filter(Boolean);

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;

        parallaxSetters.forEach((setter) => {
          if (setter) {
            setter.quickX(deltaX * setter.depth);
            setter.quickY(deltaY * setter.depth);
          }
        });
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="hidden xl:block absolute inset-0 z-20 pointer-events-none overflow-hidden select-none opacity-80"
      aria-hidden="true"
    >
      {ORBIT_ITEMS.map((item) => {
        const Component = item.component;
        return (
          <div
            key={item.id}
            ref={(node) => {
              if (node) {
                elementsRef.current.set(item.id, node);
              } else {
                elementsRef.current.delete(item.id);
              }
            }}
            style={item.style}
            className={`orbit-node absolute ${
              item.hideOnMobile ? "hidden xl:block" : "hidden md:block"
            }`}
          >
            <Component />
          </div>
        );
      })}
    </div>
  );
}
