/**
 * CreatorAsset.tsx
 * "Content Creator / Media" hero 3D asset.
 * Uses background-removed WebP. Falls back to a flat-color plane if not ready.
 */
"use client";

import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";

const C_BLACK    = "#000000";
const C_ORANGE   = "#FF9D00";
const C_BLUE     = "#3155E7";
const C_OFFWHITE = "#F7F8FA";

function useOptionalTexture(url: string) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      url,
      (t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        setTexture(t);
      },
      undefined,
      () => {
        // Texture not found — stay null, fallback material will be used
        setTexture(null);
      },
    );
  }, [url]);

  return texture;
}

export function CreatorAsset({
  position = [-2.8, 0.4, 0.5] as [number, number, number],
  scale    = 1,
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const texture  = useOptionalTexture("/images/hero/camera-nobg.webp");

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z =
      Math.sin(clock.getElapsedTime() * 0.35) * 0.022;
  });

  const w = 1.55 * scale;
  const h = 2.05 * scale;

  return (
    <Float speed={1.5} rotationIntensity={0.18} floatIntensity={0.45}>
      <group ref={groupRef} position={position} rotation={[0, 0.18, 0]}>

        {/* ── Layer 0: Studio Plate (always visible) ── */}
        <RoundedBox
          args={[w, h, 0.04 * scale]}
          radius={0.06 * scale}
          smoothness={4}
          position={[0, 0, -0.18 * scale]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color={C_OFFWHITE}
            roughness={0.4}
            metalness={0.05}
          />
        </RoundedBox>

        {/* ── Layer 1: Black framing card ── */}
        <RoundedBox
          args={[w + 0.04 * scale, h + 0.04 * scale, 0.025 * scale]}
          radius={0.07 * scale}
          smoothness={4}
          position={[0, 0, -0.22 * scale]}
        >
          <meshStandardMaterial
            color={C_BLACK}
            roughness={0.3}
            metalness={0.6}
          />
        </RoundedBox>

        {/* ── Layer 2: Creator image OR fallback placeholder ── */}
        <mesh position={[0, 0, 0]} castShadow>
          <planeGeometry args={[w, h]} />
          {texture ? (
            <meshStandardMaterial
              map={texture}
              transparent
              roughness={0.35}
              metalness={0.05}
            />
          ) : (
            /* Fallback: Orange tinted card while loading */
            <meshStandardMaterial
              color={C_ORANGE}
              roughness={0.5}
              metalness={0.1}
              transparent
              opacity={0.18}
            />
          )}
        </mesh>

        {/* ── Blue frame accent ── */}
        <mesh position={[0, 0, -0.12 * scale]}>
          <planeGeometry args={[w + 0.08 * scale, h + 0.08 * scale]} />
          <meshStandardMaterial
            color={C_BLUE}
            roughness={0.2}
            metalness={0.5}
            transparent
            opacity={0.18}
          />
        </mesh>

        {/* ── Orange accent ring (camera lens callout) ── */}
        <mesh position={[-0.2 * scale, 0.45 * scale, 0.08 * scale]}>
          <torusGeometry args={[0.14 * scale, 0.012 * scale, 16, 48]} />
          <meshStandardMaterial
            color={C_ORANGE}
            roughness={0.15}
            metalness={0.4}
            emissive={C_ORANGE}
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* ── Studio label strip (bottom) ── */}
        <mesh position={[0, (-h / 2 + 0.1 * scale), 0.06 * scale]}>
          <planeGeometry args={[w, 0.18 * scale]} />
          <meshStandardMaterial
            color={C_BLACK}
            roughness={0.3}
            metalness={0.5}
            transparent
            opacity={0.82}
          />
        </mesh>

        {/* ── Orange bottom bar ── */}
        <mesh position={[0, (-h / 2 + 0.02 * scale), 0.07 * scale]}>
          <planeGeometry args={[w, 0.03 * scale]} />
          <meshBasicMaterial color={C_ORANGE} />
        </mesh>
      </group>
    </Float>
  );
}
