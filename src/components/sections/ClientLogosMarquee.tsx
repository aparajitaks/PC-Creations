/**
 * ClientLogosMarquee.tsx
 * ─────────────────────────────────────────────────────────────
 * Smooth moving client/partner logo ticker positioned between
 * AboutSection ("05 / About PC Creations") and
 * ContactSection ("Ready to build your brand?").
 */

"use client";

import React from "react";

const CLIENT_LOGOS = [
  {
    name: "Pandith Parashuram Guruji",
    src: "/assets/clients/client-parashuram-guruji.png",
    width: 210,
    height: 200,
  },
  {
    name: "Paramathma Pub Bar & Restaurant",
    src: "/assets/clients/client-paramathma.png",
    width: 424,
    height: 200,
  },
  {
    name: "Siddaganga Holidays",
    src: "/assets/clients/client-siddaganga-holidays.png",
    width: 333,
    height: 200,
  },
  {
    name: "Sri Tourist",
    src: "/assets/clients/client-sritourist.png",
    width: 215,
    height: 201,
  },
  {
    name: "Pandith Kunal Guruji",
    src: "/assets/clients/client-kunal-guruji.png",
    width: 210,
    height: 200,
  },
  {
    name: "Sanvi Travels",
    src: "/assets/clients/client-sanvi-travels.png",
    width: 255,
    height: 201,
  },
  {
    name: "Dreams 2 Heaven Tours & Travels",
    src: "/assets/clients/client-dreams-2-heaven.png",
    width: 281,
    height: 201,
  },
  {
    name: "Nisarga Holidays",
    src: "/assets/clients/client-nisarga-holidays.png",
    width: 226,
    height: 219,
  },
  {
    name: "Suraksha Tours & Travels",
    src: "/assets/clients/client-suraksha-tours.png",
    width: 215,
    height: 199,
  },
  {
    name: "Swarna Tours & Travels",
    src: "/assets/clients/client-swarna-tours.png",
    width: 227,
    height: 219,
  },
];

// Repeat 3x to ensure uninterrupted track width on any viewport size
const MARQUEE_ITEMS = [
  ...CLIENT_LOGOS,
  ...CLIENT_LOGOS,
  ...CLIENT_LOGOS,
];

export function ClientLogosMarquee() {
  return (
    <section
      aria-label="Brands and clients who trust PC Creations"
      className="bg-[#000000] py-14 sm:py-18 lg:py-20 overflow-hidden relative border-y border-[rgba(247,248,250,0.08)]"
    >
      <div className="pc-container mb-8 sm:mb-10 text-center">
        <p className="text-[11px] font-mono font-bold text-[#FF9D00] tracking-widest uppercase">
          Trusted By Brands &amp; Growing Businesses
        </p>
      </div>

      {/* Marquee viewport with subtle edge gradient fade */}
      <div
        className="group relative flex overflow-hidden w-full select-none"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        {/* Track 1 */}
        <div className="animate-client-marquee flex items-center">
          {MARQUEE_ITEMS.map((logo, idx) => (
            <div
              key={`track1-${idx}`}
              className="shrink-0 flex items-center justify-center px-4 sm:px-7 group/logo"
            >
              <img
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                loading="lazy"
                className="h-14 sm:h-18 md:h-20 w-auto object-contain rounded-xl sm:rounded-2xl transition-transform duration-300 group-hover/logo:scale-105 filter drop-shadow-md"
              />
            </div>
          ))}
        </div>

        {/* Track 2 (seamless continuation) */}
        <div
          aria-hidden="true"
          className="animate-client-marquee flex items-center"
        >
          {MARQUEE_ITEMS.map((logo, idx) => (
            <div
              key={`track2-${idx}`}
              className="shrink-0 flex items-center justify-center px-4 sm:px-7 group/logo"
            >
              <img
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                loading="lazy"
                className="h-14 sm:h-18 md:h-20 w-auto object-contain rounded-xl sm:rounded-2xl transition-transform duration-300 group-hover/logo:scale-105 filter drop-shadow-md"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

