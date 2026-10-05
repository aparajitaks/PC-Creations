/**
 * PhoneAsset.tsx
 * "Social Media / Giant Smartphone" hero 3D asset.
 * Falls back gracefully when phone-nobg.webp isn't ready.
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
      () => { setTexture(null); },
    );
  }, [url]);

  return texture;
}

export function PhoneAsset({
  position = [2.8, -0.2, 0.3] as [number, number, number],
  scale    = 1,
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  const groupRef  = useRef<THREE.Group>(null);
  const personTex = useOptionalTexture("/images/hero/phone-nobg.webp");

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.28) * 0.08 + 0.12;
    groupRef.current.rotation.x = Math.sin(t * 0.22 + 1.2) * 0.04 - 0.06;
  });

  const pw = 1.5  * scale;
  const ph = 2.8  * scale;
  const pd = 0.1  * scale;
  const sw = pw * 0.88;
  const sh = ph * 0.89;

  return (
    <Float speed={1.35} rotationIntensity={0.12} floatIntensity={0.38}>
      <group ref={groupRef} position={position}>

        {/* Phone Chassis */}
        <RoundedBox args={[pw, ph, pd]} radius={0.08 * scale} smoothness={5} castShadow receiveShadow>
          <meshStandardMaterial color={C_BLACK} roughness={0.12} metalness={0.88} />
        </RoundedBox>

        {/* Screen surface */}
        <mesh position={[0, 0, pd / 2 + 0.001]}>
          <planeGeometry args={[sw, sh]} />
          <meshStandardMaterial color={C_OFFWHITE} roughness={0.18} metalness={0.06} />
        </mesh>

        {/* Dynamic Island */}
        <mesh position={[0, sh / 2 - 0.07 * scale, pd / 2 + 0.005]}>
          <planeGeometry args={[0.22 * scale, 0.05 * scale]} />
          <meshBasicMaterial color={C_BLACK} />
        </mesh>

        {/* Nav dots */}
        {[-0.28, 0, 0.28].map((x, i) => (
          <mesh key={i} position={[x * scale, -sh / 2 + 0.07 * scale, pd / 2 + 0.006]}>
            <circleGeometry args={[0.028 * scale, 12]} />
            <meshBasicMaterial color={i === 1 ? C_BLUE : C_BLACK} />
          </mesh>
        ))}

        {/* Content grid strips */}
        {[-0.34, 0, 0.34].map((x, i) => (
          <mesh key={i} position={[x * scale, -sh / 2 + 0.36 * scale, pd / 2 + 0.004]}>
            <planeGeometry args={[0.28 * scale, 0.38 * scale]} />
            <meshStandardMaterial color={i === 2 ? "#DADADA" : i === 1 ? "#E8E8E8" : "#CFCFCF"} roughness={0.5} />
          </mesh>
        ))}

        {/* Profile header */}
        <mesh position={[0, sh / 2 - 0.42 * scale, pd / 2 + 0.004]}>
          <planeGeometry args={[sw, 0.6 * scale]} />
          <meshStandardMaterial color={C_OFFWHITE} roughness={0.2} />
        </mesh>

        {/* Profile avatar */}
        <mesh position={[-sw / 2 + 0.13 * scale, sh / 2 - 0.38 * scale, pd / 2 + 0.007]}>
          <circleGeometry args={[0.1 * scale, 24]} />
          <meshStandardMaterial color={C_BLUE} roughness={0.3} />
        </mesh>

        {/* Orange follower strip */}
        <mesh position={[0.15 * scale, sh / 2 - 0.55 * scale, pd / 2 + 0.006]}>
          <planeGeometry args={[0.28 * scale, 0.05 * scale]} />
          <meshBasicMaterial color={C_ORANGE} />
        </mesh>

        {/* Person texture (above phone) — OR placeholder */}
        <mesh position={[0.08 * scale, ph / 2 + 0.85 * scale, pd / 2 + 0.01]}>
          <planeGeometry args={[sw * 0.74, ph * 0.7]} />
          {personTex ? (
            <meshStandardMaterial
              map={personTex}
              transparent
              roughness={0.4}
              metalness={0.05}
              alphaTest={0.05}
            />
          ) : (
            /* Fallback: Blue placeholder silhouette */
            <meshStandardMaterial
              color={C_BLUE}
              roughness={0.4}
              transparent
              opacity={0.12}
            />
          )}
        </mesh>

        {/* Volume buttons (left) */}
        {[0.28, 0].map((y, i) => (
          <RoundedBox key={i} args={[0.025 * scale, 0.18 * scale, 0.06 * scale]} radius={0.01 * scale} smoothness={2} position={[-pw / 2 - 0.013 * scale, y * scale, 0]}>
            <meshStandardMaterial color={C_BLACK} roughness={0.15} metalness={0.85} />
          </RoundedBox>
        ))}

        {/* Power button (right) */}
        <RoundedBox args={[0.025 * scale, 0.28 * scale, 0.06 * scale]} radius={0.01 * scale} smoothness={2} position={[pw / 2 + 0.013 * scale, 0.12 * scale, 0]}>
          <meshStandardMaterial color={C_BLACK} roughness={0.15} metalness={0.85} />
        </RoundedBox>

        {/* Blue rim glow */}
        <mesh position={[0, 0, -pd / 2 - 0.004]}>
          <planeGeometry args={[pw + 0.02 * scale, ph + 0.02 * scale]} />
          <meshStandardMaterial color={C_BLUE} roughness={0.2} metalness={0.6} transparent opacity={0.12} />
        </mesh>
      </group>
    </Float>
  );
}
