/**
 * LocationSection.tsx
 * ─────────────────────────────────────────────────────────────
 * PC Creations — Google Maps location display.
 *
 * Displays the PC Creations office location with an interactive map card.
 */

"use client";

import React, { useRef } from "react";
import { useGsap } from "@/hooks/useGsap";

export function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // ── GSAP animations ──────────────────────────────────────────
  useGsap((gsap) => {
    const el = sectionRef.current;
    if (!el) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 80%", once: true },
    });

    tl.fromTo(".location-info",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
    )
    .fromTo(".location-map",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      "-=0.4",
    )
    .fromTo(".location-map-button",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
      "-=0.3",
    );
  }, sectionRef);

  return (
    <section
      ref={sectionRef}
      aria-label="PC Creations Location"
      className="bg-[#F7F8FA] relative overflow-hidden"
      style={{ paddingTop: "clamp(5rem,8vw,7rem)", paddingBottom: "clamp(5rem,8vw,7rem)" }}
    >
      <div className="pc-container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] font-mono font-bold text-[#FF9D00] tracking-widest uppercase mb-3">
            VISIT US
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black text-[#000000] tracking-tight">
            Our Location
          </h2>
        </div>

        {/* Location Card */}
        <div className="bg-white rounded-3xl border border-[rgba(0,0,0,0.08)] shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: Contact Information */}
            <div className="location-info p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
              <div className="flex flex-col gap-8">
                {/* Brand Info */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#000000] tracking-tight mb-2">
                    PC Creations
                  </h3>
                  <p className="text-base text-[rgba(0,0,0,0.58)] leading-relaxed">
                    Your Creative Marketing Team
                  </p>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[rgba(255,157,0,0.1)] border border-[rgba(255,157,0,0.2)] flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M10 2C6.686 2 4 4.686 4 8c0 4.5 6 10 6 10s6-5.5 6-10c0-3.314-2.686-6-6-6z" stroke="#FF9D00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="10" cy="8" r="2" stroke="#FF9D00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono font-bold text-[rgba(0,0,0,0.45)] tracking-widest uppercase mb-1.5">
                      OUR LOCATION
                    </p>
                    <p className="text-base text-[#000000] font-medium leading-relaxed">
                      Rajajinagar, Bangalore – 560086
                    </p>
                    <p className="text-sm text-[rgba(0,0,0,0.58)] mt-1">
                      9th Main, Indiranagar 2nd Stage<br />
                      Bangalore – 560038
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[rgba(49,85,231,0.1)] border border-[rgba(49,85,231,0.2)] flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V15a2 2 0 01-2 2h-1C9.716 17 3 10.284 3 3V5z" stroke="#3155E7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono font-bold text-[rgba(0,0,0,0.45)] tracking-widest uppercase mb-1.5">
                      CALL US
                    </p>
                    <a
                      href="tel:+917204511681"
                      className="text-base text-[#000000] font-medium hover:text-[#FF9D00] transition-colors duration-200"
                    >
                      +91 72045 11681
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[rgba(255,157,0,0.1)] border border-[rgba(255,157,0,0.2)] flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="#FF9D00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono font-bold text-[rgba(0,0,0,0.45)] tracking-widest uppercase mb-1.5">
                      EMAIL
                    </p>
                    <a
                      href="mailto:pccreations25@gmail.com"
                      className="text-base text-[#000000] font-medium hover:text-[#FF9D00] transition-colors duration-200"
                    >
                      pccreations25@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Google Map */}
            <div className="location-map relative bg-[#000000] overflow-hidden" style={{ minHeight: "clamp(280px,35vw,450px)" }}>
              {/* Map Image */}
              <img
                src="/assets/pc-creations-map.png"
                alt="PC Creations Location - Rajajinagar, Bangalore"
                className="w-full h-full object-cover"
                style={{ minHeight: "clamp(280px,35vw,450px)" }}
              />

              {/* Map Overlay Button */}
              <div className="location-map-button absolute bottom-6 left-6 right-6 sm:left-8 sm:right-8">
                <a
                  href="https://maps.google.com/?q=PC+Creations+Rajajinagar+Bangalore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 bg-white text-[#000000] px-6 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="text-sm sm:text-base font-bold tracking-wide">
                    VIEW ON GOOGLE MAPS
                  </span>
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M3 10h14M11 3l7 7-7 7"
                      stroke="#FF9D00"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
