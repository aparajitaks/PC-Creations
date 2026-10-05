import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Three.js runs on the client only; mark it as a server external
  // so Next.js / Turbopack doesn't try to bundle it for SSR.
  serverExternalPackages: ["three", "mongodb"],

  // Empty turbopack config — silences the "webpack config but no turbopack config" warning
  // in Next.js 16+ (which defaults to Turbopack).
  turbopack: {},
};

export default nextConfig;
