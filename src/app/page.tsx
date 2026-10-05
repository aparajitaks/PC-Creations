/**
 * Home page — PC Creations
 * ─────────────────────────────────────────────────────────────
 * Full page assembly — all sections wired with real content.
 *
 * Section order (top → bottom, mirrors the navbar):
 *   01 Home (Hero)
 *   02 Results
 *   03 Reviews
 *   04 Services
 *       Pricing          — no navbar entry (supporting block)
 *   05 Process
 *   06 About
 *   07 Contact
 *
 * Navbar order: Home · Results · Reviews · Services · Process
 *               · Courses · About Us · Contact
 * "Courses" is a separate route (/courses) with no section on this
 * page, so it highlights by route — never while scrolling.
 */

import { Navbar, Footer } from "@/components/layout";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { Hero }           from "@/components/hero";
import { ResultsSection, ReviewsSection } from "@/components/portfolio";
import {
  ServicesSection,
  PricingSection,
  AboutSection,
  ProcessSection,
  ContactSection,
  LocationSection,
} from "@/components/sections";

/** Thin gradient rule for light→light section transitions */
function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: "100%",
        height: "1px",
        background:
          "linear-gradient(to right, transparent, rgba(0,0,0,0.10) 20%, rgba(0,0,0,0.10) 80%, transparent)",
      }}
    />
  );
}

/**
 * Gradient bridge between a light and a dark section (either direction).
 * Creates an unmistakable chapter boundary instead of a hard colour cut —
 * used wherever the page flips between the #F7F8FA and #000000 blocks.
 */
function ThemeTransition({ to }: { to: "dark" | "light" }) {
  return (
    <div
      aria-hidden="true"
      style={{
        height: "clamp(72px, 8vw, 120px)",
        background:
          to === "dark"
            ? "linear-gradient(to bottom, #F7F8FA 0%, #000000 100%)"
            : "linear-gradient(to bottom, #000000 0%, #F7F8FA 100%)",
      }}
    />
  );
}

export default function Home() {
  return (
    <>
      <Navbar />

      <main id="main-content" className="flex flex-col relative z-[10]">

        {/* ── 01 HOME ── */}
        <Hero />

        <SectionDivider />

        {/* ── 02 RESULTS ── */}
        <ResultsSection />

        <SectionDivider />

        {/* ── 03 REVIEWS ── */}
        <ReviewsSection />

        <SectionDivider />

        {/* ── 04 SERVICES ── */}
        <ServicesSection />

        <ThemeTransition to="dark" />

        {/* ── PRICING (no navbar entry) ── */}
        <PricingSection />

        <ThemeTransition to="light" />

        {/* ── 05 PROCESS ── */}
        <ProcessSection />

        <ThemeTransition to="dark" />

        {/* ── 06 ABOUT ── */}
        <AboutSection />

        {/* ── 07 CONTACT — final CTA ── */}
        <ContactSection />

        {/* ── 08 LOCATION — Google Maps ── */}
        <LocationSection />

      </main>

      {/* Floating WhatsApp and Call buttons */}
      <FloatingButtons />

      {/* Footer has its own internal separator */}
      <Footer />
    </>
  );
}
