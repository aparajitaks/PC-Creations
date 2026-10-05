/**
 * R3FCanvas.tsx
 * ─────────────────────────────────────────────────────────────
 * React Three Fiber canvas provider/wrapper for Next.js.
 *
 * PURPOSE:
 *   Centralises all R3F Canvas configuration in one place so
 *   every 3D scene across the site shares the same renderer
 *   settings, camera defaults, and performance options.
 *
 *   The actual 3D scene content (meshes, lights, etc.) is NOT
 *   created here — it is passed via children in the next phase.
 *
 * USAGE:
 *   import { R3FCanvas } from "@/components/three/R3FCanvas";
 *
 *   <R3FCanvas className="w-full h-screen">
 *     {/* your scene components here *\/}
 *   </R3FCanvas>
 *
 * NOTES:
 *   - `"use client"` is required — Three.js is browser-only.
 *   - `dpr` is capped at 2 to avoid GPU overload on retina displays.
 *   - `frameloop="demand"` means frames only render when the scene
 *     changes — more efficient for mostly-static views.
 *     Change to "always" for animated scenes.
 */

"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { cn } from "@/lib/cn";

export interface R3FCanvasProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /**
   * "demand" — renders only when invalidated (best for static/interactive scenes)
   * "always" — renders every frame (best for continuous animations)
   */
  frameloop?: "demand" | "always" | "never";
  /** Camera field of view in degrees (default: 50) */
  fov?: number;
  /** Near clip plane (default: 0.1) */
  near?: number;
  /** Far clip plane (default: 1000) */
  far?: number;
  /** Camera z position (default: 5) */
  cameraZ?: number;
  /** Enable flat shading / linear encoding for sharper look */
  flat?: boolean;
  /** Fallback UI while scene suspends */
  fallback?: React.ReactNode;
}

export function R3FCanvas({
  children,
  className,
  style,
  frameloop  = "demand",
  fov        = 50,
  near       = 0.1,
  far        = 1000,
  cameraZ    = 5,
  flat       = false,
  fallback   = null,
}: R3FCanvasProps) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={style}
      aria-hidden="true" /* 3D visuals are decorative */
    >
      <Canvas
        flat={flat}
        dpr={[1, 2]}          /* cap at 2× for performance */
        frameloop={frameloop}
        gl={{
          antialias:          true,
          alpha:              true,  /* transparent background by default */
          powerPreference:    "high-performance",
          preserveDrawingBuffer: false,
        }}
        camera={{
          fov,
          near,
          far,
          position: [0, 0, cameraZ],
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={fallback}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
