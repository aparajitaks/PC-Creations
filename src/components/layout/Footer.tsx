/**
 * Footer.tsx
 * ─────────────────────────────────────────────────────────────
 * PC Creations — Premium Structured Footer.
 *
 * REDESIGN:
 *   - Strong top border / visual separator from Contact section
 *   - Four columns: Brand description | Services | Company | Legal
 *   - Bottom bar: copyright + tagline + location
 *   - Clean, compact, organized
 *   - No mixed social icons (those live in Contact)
 */

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface FooterColumn {
  heading: string;
  links:   Array<{ label: string; href: string }>;
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Services",
    links: [
      { label: "Google Ads",        href: "#" },
      { label: "Meta Ads",          href: "#" },
      { label: "Social Media Mgmt", href: "#" },
      { label: "Video & Shoots",    href: "#" },
      { label: "Brand Identity",    href: "#" },
      { label: "Web & Tech",        href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Results",  href: "#results" },
      { label: "Reviews",  href: "#reviews" },
      { label: "Process",  href: "#process" },
      { label: "Courses",  href: "/courses" },
      { label: "About",    href: "#about" },
      { label: "Contact",  href: "#contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Use",   href: "#" },
      { label: "Cookie Policy",  href: "#" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      role="contentinfo"
      className="bg-[#000000] text-[#F7F8FA]"
    >
      {/* Strong visual separator from Contact section */}
      <div
        aria-hidden="true"
        style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(247,248,250,0.12) 20%, rgba(247,248,250,0.12) 80%, transparent)",
        }}
      />

      {/* ── Main footer body ── */}
      <div className="pc-container py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 lg:gap-10">

          {/* ── Brand column ── */}
          <div className="flex flex-col gap-6">
            <Link href="/" aria-label="PC Creations — Home" className="flex items-center gap-3 w-fit group">
              <img
                src="/assets/logo-mark.png"
                alt="PC Creations"
                width={38}
                height={38}
                className="rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
                style={{ width: 38, height: 38, filter: "invert(1)" }}
              />
              <span className="flex flex-col leading-none">
                <span className="text-[#F7F8FA] font-black text-[15px] tracking-[0.05em] uppercase">
                  PC Creations
                </span>
                <span className="text-[9px] font-mono font-bold text-[#FF9D00] tracking-[0.14em] uppercase mt-0.5">
                  Digital Marketing
                </span>
              </span>
            </Link>

            <p className="text-sm text-[rgba(247,248,250,0.50)] leading-relaxed max-w-[280px]">
              A premium digital marketing &amp; media agency driving measurable growth through data, creative production, and performance strategy.
            </p>

            {/* Location badges */}
            <div className="flex flex-wrap gap-2">
              {["Rajajinagar", "Indiranagar"].map((loc) => (
                <span
                  key={loc}
                  className="text-[10px] font-mono font-bold text-[rgba(247,248,250,0.35)] tracking-widest uppercase border border-[rgba(247,248,250,0.10)] rounded-full px-3 py-1"
                >
                  {loc}, BLR
                </span>
              ))}
            </div>
          </div>

          {/* ── Nav columns ── */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-5">
              <h3 className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-[rgba(247,248,250,0.35)]">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={cn(
                        "text-sm text-[rgba(247,248,250,0.55)]",
                        "hover:text-[#FF9D00]",
                        "transition-colors duration-200",
                        "inline-flex items-center gap-1.5 group",
                      )}
                    >
                      <span className="w-0 overflow-hidden group-hover:w-2.5 transition-all duration-200 opacity-0 group-hover:opacity-100 text-[#FF9D00]">›</span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        aria-hidden="false"
        style={{
          borderTop: "1px solid rgba(247,248,250,0.07)",
        }}
      >
        <div className="pc-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[rgba(247,248,250,0.38)] font-mono">
            © {year} PC Creations. Your Creative Marketing Team.
          </p>
          <p className="text-[11px] text-[rgba(247,248,250,0.25)] font-mono">
            Bangalore · Digital Marketing &amp; Media
          </p>
        </div>
      </div>
    </footer>
  );
}
