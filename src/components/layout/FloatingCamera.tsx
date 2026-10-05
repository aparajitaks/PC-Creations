/**
 * FloatingCamera.tsx
 * ─────────────────────────────────────────────────────────────
 * A large, floating Fujifilm AX-1 camera decorative element that
 * travels through the Services section with 3D scroll-linked animation.
 *
 * Behavior:
 * - Camera moves in 3D space through the entire section
 * - Subtle 3D rotation (rotateX, rotateY, rotateZ)
 * - Scale changes with depth perception
 * - Continuous subtle floating motion
 * - Positioned as a floating layer with perspective
 * - Responsive sizing and movement (desktop/tablet/mobile)
 * - Performance-optimized with transform-based animation
 */

"use client";

import React, { useRef } from "react";
import { useGsap } from "@/hooks/useGsap";

const CAMERA_SRC = "/images/floating images/_ (4).jpeg";

interface FloatingCameraProps {
  sectionRef?: React.RefObject<HTMLElement | null>;
}

export function FloatingCamera({ sectionRef }: FloatingCameraProps) {
  const cameraRef = useRef<HTMLImageElement>(null);

  useGsap<HTMLImageElement>((gsap) => {
    const camera = cameraRef.current;
    const section = sectionRef?.current;
    if (!camera || !section) return;

    // Check for reduced motion preference
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      // Static position for reduced motion
      gsap.set(camera, {
        opacity: 0.8,
        scale: 0.7,
        rotation: -5,
      });
      return;
    }

    // Add 3D perspective to the camera
    gsap.set(camera, {
      transformOrigin: "center center",
      perspective: 1000,
    });

    // Scroll-linked 3D animation
    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Initial position: lower-right
    gsap.set(camera, {
      x: "30vw",
      y: "20vh",
      rotateX: -5,
      rotateY: -8,
      rotateZ: -4,
      scale: 0.95,
      opacity: 1,
    });

    // Animate to midpoint: move upward and toward center
    scrollTimeline.to(camera, {
      x: "10vw",
      y: "-5vh",
      rotateX: 3,
      rotateY: 5,
      rotateZ: 2,
      scale: 1.05,
      duration: 0.5,
    });

    // Animate to end: move toward upper-right
    scrollTimeline.to(camera, {
      x: "-15vw",
      y: "-15vh",
      rotateX: -3,
      rotateY: -6,
      rotateZ: -2,
      scale: 0.98,
      duration: 0.5,
    });

    // Continuous subtle 3D floating motion (independent of scroll)
    const floatTimeline = gsap.timeline({ repeat: -1, yoyo: true });
    floatTimeline.to(camera, {
      x: "+=20",
      y: "+=15",
      rotateX: "+=3",
      rotateY: "+=4",
      rotateZ: "+=2",
      scale: "+=0.05",
      duration: 8,
      ease: "sine.inOut",
    });

    // Responsive adjustments
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 768) {
        // Mobile: simplified movement, smaller scale
        gsap.set(camera, {
          x: "20vw",
          y: "15vh",
          rotateX: -3,
          rotateY: -5,
          rotateZ: -2,
          scale: 0.65,
          opacity: 1,
        });
        scrollTimeline.clear();
        scrollTimeline.to(camera, {
          x: "5vw",
          y: "-3vh",
          rotateX: 2,
          rotateY: 3,
          rotateZ: 1,
          scale: 0.75,
          duration: 0.5,
        });
        scrollTimeline.to(camera, {
          x: "-10vw",
          y: "-8vh",
          rotateX: -2,
          rotateY: -3,
          rotateZ: -1,
          scale: 0.7,
          duration: 0.5,
        });
        floatTimeline.kill();
      } else if (width < 1024) {
        // Tablet: moderate movement
        gsap.set(camera, {
          x: "25vw",
          y: "18vh",
          rotateX: -4,
          rotateY: -6,
          rotateZ: -3,
          scale: 0.8,
          opacity: 1,
        });
        scrollTimeline.clear();
        scrollTimeline.to(camera, {
          x: "8vw",
          y: "-4vh",
          rotateX: 2.5,
          rotateY: 4,
          rotateZ: 1.5,
          scale: 0.95,
          duration: 0.5,
        });
        scrollTimeline.to(camera, {
          x: "-12vw",
          y: "-12vh",
          rotateX: -2.5,
          rotateY: -5,
          rotateZ: -1.5,
          scale: 0.88,
          duration: 0.5,
        });
        if (!floatTimeline.isActive()) {
          floatTimeline.restart();
        }
      } else {
        // Desktop: full 3D cinematic movement
        gsap.set(camera, {
          x: "30vw",
          y: "20vh",
          rotateX: -5,
          rotateY: -8,
          rotateZ: -4,
          scale: 0.95,
          opacity: 1,
        });
        scrollTimeline.clear();
        scrollTimeline.to(camera, {
          x: "10vw",
          y: "-5vh",
          rotateX: 3,
          rotateY: 5,
          rotateZ: 2,
          scale: 1.05,
          duration: 0.5,
        });
        scrollTimeline.to(camera, {
          x: "-15vw",
          y: "-15vh",
          rotateX: -3,
          rotateY: -6,
          rotateZ: -2,
          scale: 0.98,
          duration: 0.5,
        });
        if (!floatTimeline.isActive()) {
          floatTimeline.restart();
        }
      }
    };

    // Initial responsive setup
    handleResize();

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
      scrollTimeline.kill();
      floatTimeline.kill();
    };
  }, cameraRef, []);

  return (
    <img
      ref={cameraRef}
      src={CAMERA_SRC}
      alt=""
      aria-hidden="true"
      className="absolute pointer-events-none"
      style={{
        width: "clamp(220px, 35vw, 600px)",
        height: "auto",
        maxWidth: "600px",
        minWidth: "220px",
        objectFit: "contain",
        willChange: "transform",
        zIndex: 5,
        // Position relative to section, not fixed to bottom
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        // No opacity reduction - camera should be fully visible
        opacity: 1,
        // Add drop shadow for depth
        filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.25))",
      }}
      loading="lazy"
      draggable={false}
    />
  );
}
