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
    name: "ISKCON Bangalore",
    src: "/assets/clients/client-iskcon-bangalore.png",
    width: 502,
    height: 214,
  },
  {
    name: "Paramathma Pub Bar & Restaurant",
    src: "/assets/clients/client-paramathma.png",
    width: 424,
    height: 200,
  },
  {
    name: "Agastya Academy",
    src: "/assets/clients/client-agastya-academy.png",
    width: 226,
    height: 219,
  },
  {
    name: "Cutibless Aesthetics",
    src: "/assets/clients/client-cutibless.png",
    width: 462,
    height: 214,
  },
  {
    name: "World Tour International",
    src: "/assets/clients/client-world-tour.png",
    width: 593,
    height: 214,
  },
  {
    name: "Basil Woods Juniors",
    src: "/assets/clients/client-basil-woods.png",
    width: 285,
    height: 214,
  },
  {
    name: "Siddaganga Holidays",
    src: "/assets/clients/client-siddaganga-holidays.png",
    width: 333,
    height: 200,
  },
  {
    name: "Samruddhi Construction",
    src: "/assets/clients/client-samruddhi-construction.png",
    width: 222,
    height: 213,
  },
  {
    name: "SpaceXpress Ventures",
    src: "/assets/clients/client-spacexpress.png",
    width: 264,
    height: 214,
  },
  {
    name: "Sri Tourist",
    src: "/assets/clients/client-sritourist.png",
    width: 215,
    height: 201,
  },
  {
    name: "CourierFort Easy Shipping",
    src: "/assets/clients/client-courierfort.png",
    width: 536,
    height: 213,
  },
  {
    name: "Pandith Kunal Guruji",
    src: "/assets/clients/client-kunal-guruji.png",
    width: 210,
    height: 200,
  },
  {
    name: "CredSure Finance",
    src: "/assets/clients/client-credsure-finance.png",
    width: 363,
    height: 214,
  },
  {
    name: "Prana Yoga Studio",
    src: "/assets/clients/client-prana-yoga.png",
    width: 214,
    height: 214,
  },
  {
    name: "V Royal Emblem",
    src: "/assets/clients/client-v-royal.png",
    width: 255,
    height: 214,
  },
  {
    name: "Sri Sai Coaching Classes",
    src: "/assets/clients/client-sri-sai-coaching.png",
    width: 226,
    height: 218,
  },
  {
    name: "Sanvi Travels",
    src: "/assets/clients/client-sanvi-travels.png",
    width: 255,
    height: 201,
  },
  {
    name: "Royal Wings Crest",
    src: "/assets/clients/client-wings-crest.png",
    width: 327,
    height: 214,
  },
  {
    name: "Radiant Expeditions Tours & Travels",
    src: "/assets/clients/client-radiant-expeditions.png",
    width: 222,
    height: 214,
  },
  {
    name: "Hanu Travels Brookefield",
    src: "/assets/clients/client-hanu-travels.png",
    width: 214,
    height: 214,
  },
  {
    name: "Jaya's Space Co Works and Beyond",
    src: "/assets/clients/client-jayas-space.png",
    width: 249,
    height: 214,
  },
  {
    name: "Dreams 2 Heaven Tours & Travels",
    src: "/assets/clients/client-dreams-2-heaven.png",
    width: 281,
    height: 201,
  },
  {
    name: "Pranav Build Home",
    src: "/assets/clients/client-pranav-build-home.png",
    width: 227,
    height: 218,
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

// Repeat 2x to ensure uninterrupted track width on any viewport size
const MARQUEE_ITEMS = [
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

