/**
 * /courses — PC Creations Digital Marketing Course Page
 * ─────────────────────────────────────────────────────────────
 * Standalone dashboard-style page for PC Creations' own course.
 *
 * Structure (inspired by Upskill Rocket):
 *   1. Hero — headline + CTA + key proof points
 *   2. Why Choose PC Creations — 8 feature cards
 *   3. Curriculum — 7-module accordion
 *   4. Tools You'll Master — platform logos
 *   5. Testimonials — student reviews
 *   6. Pricing / Enroll CTA — packages
 *   7. Contact / Lead form
 */

import type { Metadata } from "next";
import { CoursesPageClient } from "./CoursesPageClient";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Digital Marketing Course | PC Creations",
  description:
    "Master Digital Marketing with AI, Meta Ads, Google Ads, SEO, SMM and live projects. Bangalore's most practical training by PC Creations.",
};

export default function CoursesPage() {
  return (
    <>
      <Navbar />
      <CoursesPageClient />
    </>
  );
}
