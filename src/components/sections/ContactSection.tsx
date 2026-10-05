/**
 * ContactSection.tsx
 * ─────────────────────────────────────────────────────────────
 * PC Creations — Final CTA + Contact Form.
 *
 * REDESIGN:
 *   - Very large section (py-36/py-52) for genuine "final chapter" feel
 *   - Two-column: Left = headline + contact details, Right = form card
 *   - Form is a contained card (max-w ~560px) that sits lower than the
 *     headline via pt-16 offset, giving breathing room at top
 *   - Contact info consolidated: Phone, Email, then Social icon row
 *   - No content touches viewport edges; generous internal spacing
 *   - GSAP: staggered reveal on scroll
 */

"use client";

import React, { useRef, useState } from "react";
import { useGsap } from "@/hooks/useGsap";

const SERVICES = [
  "Social Media Marketing",
  "Performance Marketing",
  "Branding",
  "Website Development",
  "Content Creation",
  "Video Production",
  "SEO",
  "Influencer Marketing",
  "Other",
];

const BUDGETS = [
  "Under ₹25K",
  "₹25K – ₹50K",
  "₹50K – ₹1L",
  "₹1L+",
  "Let's Discuss",
];

// ── Social icon SVGs ──────────────────────────────────────────

function IconInstagram() {
  return (
    <img
      src="/assets/instagram-logo.png"
      alt="Instagram"
      width="24"
      height="24"
      className="w-6 h-6"
    />
  );
}

function IconFacebook() {
  return (
    <img
      src="/assets/facebook-logo.png"
      alt="Facebook"
      width="24"
      height="24"
      className="w-6 h-6"
    />
  );
}

function IconLinkedIn() {
  return (
    <img
      src="/assets/linkedin-logo.png"
      alt="LinkedIn"
      width="24"
      height="24"
      className="w-6 h-6"
    />
  );
}

function IconWhatsApp() {
  return (
    <img
      src="/assets/whatsapp-logo.png"
      alt="WhatsApp"
      width="24"
      height="24"
      className="w-6 h-6"
    />
  );
}

// ── Input field styles ────────────────────────────────────────
const inputCls =
  "w-full bg-[rgba(247,248,250,0.05)] border border-[rgba(247,248,250,0.12)] rounded-xl px-5 text-[#F7F8FA] text-sm sm:text-base placeholder:text-[rgba(247,248,250,0.28)] focus:outline-none focus:border-[#FF9D00] transition-colors duration-200";

const labelCls =
  "text-[11px] font-mono font-bold text-[rgba(247,248,250,0.45)] tracking-widest uppercase";

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ── Animations (disabled scroll effects) ─────────────────────
  // useGsap((gsap) => {
  //   const el = sectionRef.current;
  //   if (!el) return;

  //   const tl = gsap.timeline({
  //     scrollTrigger: { trigger: el, start: "top 78%", once: true },
  //   });

  //   tl.fromTo(".contact-eyebrow",
  //     { opacity: 0, y: 20 },
  //     { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
  //   )
  //   .fromTo(".contact-headline .line",
  //     { opacity: 0, y: 50, skewY: 1.5 },
  //     { opacity: 1, y: 0, skewY: 0, duration: 0.95, ease: "power3.out", stagger: 0.12 },
  //     "-=0.3",
  //   )
  //   .fromTo(".contact-sub",
  //     { opacity: 0, y: 20 },
  //     { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
  //     "-=0.5",
  //   )
  //   .fromTo(".contact-info",
  //     { opacity: 0, y: 24 },
  //     { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
  //     "-=0.3",
  //   )
  //   .fromTo(".contact-form-card",
  //     { opacity: 0, y: 40 },
  //     { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
  //     "-=0.55",
  //   );

  //   // Floating glow accents
  //   gsap.to(".contact-glow-1", {
  //     y: -20, x: 12,
  //     duration: 4.2, ease: "sine.inOut",
  //     repeat: -1, yoyo: true,
  //   });
  //   gsap.to(".contact-glow-2", {
  //     y: 16, x: -10,
  //     duration: 5.5, ease: "sine.inOut",
  //     repeat: -1, yoyo: true,
  //     delay: 1.2,
  //   });
  // }, sectionRef);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Send to backend API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit enquiry');
      }

      // Success - show success state
      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        budget: "",
        message: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-label="Contact PC Creations"
      className="bg-[#000000] relative overflow-hidden"
      style={{ paddingTop: "clamp(7rem,10vw,11rem)", paddingBottom: "clamp(7rem,10vw,11rem)" }}
    >
      {/* ── Ambient glow spheres ── */}
      <div
        className="contact-glow-1 absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: "10%", left: "5%",
          width: "clamp(280px,35vw,500px)",
          height: "clamp(280px,35vw,500px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(49,85,231,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="contact-glow-2 absolute pointer-events-none"
        aria-hidden="true"
        style={{
          bottom: "10%", right: "5%",
          width: "clamp(200px,28vw,400px)",
          height: "clamp(200px,28vw,400px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,157,0,0.06) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="pc-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 xl:gap-28 items-start">

          {/* ════════════════════════════════════════════════════
              LEFT — Headline + contact details + social icons
          ══════════════════════════════════════════════════════ */}
          <div className="flex flex-col gap-10" data-scroll-y="-16">

            {/* Eyebrow */}
            <p className="contact-eyebrow text-[11px] font-mono font-bold text-[#FF9D00] tracking-widest uppercase">
              06 / Let&apos;s Work Together
            </p>

            {/* Headline */}
            <h2 className="contact-headline overflow-hidden -mt-4">
              <span className="line block text-[clamp(2.75rem,5vw,4.5rem)] font-black text-[#F7F8FA] tracking-tight leading-[0.93]">
                Ready to
              </span>
              <span className="line block text-[clamp(2.75rem,5vw,4.5rem)] font-black text-[#F7F8FA] tracking-tight leading-[0.93] mt-1">
                build your
              </span>
              <span className="line block text-[clamp(2.75rem,5vw,4.5rem)] font-black text-[#FF9D00] tracking-tight leading-[0.93] mt-1">
                brand?
              </span>
            </h2>

            {/* Supporting paragraph */}
            <p className="contact-sub text-base sm:text-lg text-[rgba(247,248,250,0.58)] leading-relaxed max-w-[38ch]">
              Tell us about your project. We&apos;ll respond within 48 hours with a customized strategy, not a sales pitch.
            </p>

            {/* ── Contact details + social — consolidated block ── */}
            <div className="contact-info flex flex-col gap-0 pt-8 border-t border-[rgba(247,248,250,0.08)]">

              {/* Phone */}
              <div className="flex items-center gap-4 py-5 border-b border-[rgba(247,248,250,0.06)]">
                <div className="w-10 h-10 rounded-full border border-[rgba(255,157,0,0.25)] bg-[rgba(255,157,0,0.04)] flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M10.5 8.5c-.2-.2-1.2-.8-1.4-.9-.3-.1-.5-.1-.7.1l-.6.8c-.1.1-.3.2-.5.1-1-.4-1.8-1.2-2.2-2.2-.1-.2 0-.4.1-.5l.8-.6c.2-.2.2-.4.1-.7-.1-.2-.7-1.2-.9-1.4-.2-.3-.4-.2-.6-.2-.6 0-1.1.4-1.3.9-.5 1.1 0 3.1 1.8 4.9s3.8 2.3 4.9 1.8c.5-.2.9-.7.9-1.3 0-.2.1-.4-.4-.8z" stroke="#FF9D00" strokeWidth="1.2"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[rgba(247,248,250,0.35)] uppercase tracking-widest mb-0.5">Direct Line</p>
                  <a href="tel:+917204511681" className="text-[#F7F8FA] font-semibold hover:text-[#FF9D00] transition-colors duration-200 text-base">
                    +91 72045 11681
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 py-5 border-b border-[rgba(247,248,250,0.06)]">
                <div className="w-10 h-10 rounded-full border border-[rgba(255,157,0,0.25)] bg-[rgba(255,157,0,0.04)] flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M1 3l5 3.5L11 3M1 3h10v7H1V3z" stroke="#FF9D00" strokeWidth="1.2" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[rgba(247,248,250,0.35)] uppercase tracking-widest mb-0.5">Agency Email</p>
                  <a href="mailto:pccreations25@gmail.com" className="text-[#F7F8FA] font-semibold hover:text-[#FF9D00] transition-colors duration-200 text-base">
                    pccreations25@gmail.com
                  </a>
                </div>
              </div>

              {/* Social Icons Row */}
              <div className="flex items-center gap-4 pt-6">
                <p className="text-[10px] font-mono text-[rgba(247,248,250,0.35)] uppercase tracking-widest shrink-0">Connect With Us</p>
                <div className="flex items-center gap-3">
                  {[
                    { href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/pc_creations_1/", label: "Open PC Creations Instagram", Icon: IconInstagram },
                    { href: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/p/PC-Creations-61583072954049/", label: "Open PC Creations Facebook", Icon: IconFacebook },
                    { href: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/in/pc-creations-2895963a0/", label: "Open PC Creations LinkedIn", Icon: IconLinkedIn },
                    { href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917204511681"}`, label: "Chat with PC Creations on WhatsApp", Icon: IconWhatsApp },
                  ].map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-[rgba(247,248,250,0.14)] flex items-center justify-center text-[rgba(247,248,250,0.55)] hover:border-[#FF9D00] hover:text-[#FF9D00] hover:scale-110 transition-all duration-200"
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>

              {/* Branches */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-[rgba(247,248,250,0.06)]">
                <div>
                  <p className="text-[10px] font-mono font-bold text-[#3155E7] tracking-widest uppercase mb-1.5">Branch 1</p>
                  <p className="text-sm text-[rgba(247,248,250,0.48)] leading-relaxed">Rajajinagar, Bangalore – 560086</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold text-[#3155E7] tracking-widest uppercase mb-1.5">Branch 2</p>
                  <p className="text-sm text-[rgba(247,248,250,0.48)] leading-relaxed">9th Main, Indiranagar 2nd Stage, Bangalore – 560038</p>
                </div>
              </div>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════
              RIGHT — Form Card (offset down by pt-16)
          ══════════════════════════════════════════════════════ */}
          <div className="lg:pt-16 contact-form-card w-full lg:max-w-[560px] lg:justify-self-end" data-scroll-x="12">
            {submitted ? (
              /* ── Success state ── */
              <div className="flex flex-col items-center justify-center gap-6 py-24 text-center rounded-3xl border border-[rgba(255,157,0,0.25)] bg-[rgba(255,157,0,0.03)]">
                <div className="w-16 h-16 rounded-full bg-[#FF9D00] flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l5 5L19 7" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#F7F8FA] tracking-tight">Thank You!</h3>
                  <p className="text-base text-[rgba(247,248,250,0.55)] mt-2 max-w-sm">Your enquiry has been received. Our team will get back to you shortly.</p>
                </div>
              </div>
            ) : (
              /* ── Form card ── */
              <div
                className="rounded-3xl border border-[rgba(247,248,250,0.09)] bg-[rgba(255,255,255,0.025)] shadow-2xl"
                style={{ padding: "clamp(2rem,4vw,3.5rem)" }}
              >
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                  aria-label="Contact form"
                  noValidate
                >
                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2.5">
                      <label htmlFor="contact-name" className={labelCls}>Full Name *</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={inputCls}
                        style={{ height: "52px" }}
                      />
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <label htmlFor="contact-email" className={labelCls}>Email *</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className={inputCls}
                        style={{ height: "52px" }}
                      />
                    </div>
                  </div>

                  {/* Phone + Company row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2.5">
                      <label htmlFor="contact-phone" className={labelCls}>Phone Number *</label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className={inputCls}
                        style={{ height: "52px" }}
                      />
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <label htmlFor="contact-company" className={labelCls}>Company / Brand</label>
                      <input
                        id="contact-company"
                        name="company"
                        type="text"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Your brand or company"
                        className={inputCls}
                        style={{ height: "52px" }}
                      />
                    </div>
                  </div>

                  {/* Service + Budget row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2.5">
                      <label htmlFor="contact-service" className={labelCls}>Service Required *</label>
                      <div className="relative">
                        <select
                          id="contact-service"
                          name="service"
                          required
                          value={form.service}
                          onChange={handleChange}
                          className={`${inputCls} appearance-none cursor-pointer pr-10`}
                          style={{
                            height: "52px",
                            color: form.service ? "#F7F8FA" : "rgba(247,248,250,0.28)",
                          }}
                        >
                          <option value="" disabled style={{ background: "#111" }}>Select a service…</option>
                          {SERVICES.map((s) => (
                            <option key={s} value={s} style={{ background: "#111", color: "#F7F8FA" }}>{s}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(247,248,250,0.40)]">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <label htmlFor="contact-budget" className={labelCls}>Budget</label>
                      <div className="relative">
                        <select
                          id="contact-budget"
                          name="budget"
                          value={form.budget}
                          onChange={handleChange}
                          className={`${inputCls} appearance-none cursor-pointer pr-10`}
                          style={{
                            height: "52px",
                            color: form.budget ? "#F7F8FA" : "rgba(247,248,250,0.28)",
                          }}
                        >
                          <option value="" disabled style={{ background: "#111" }}>Select budget…</option>
                          {BUDGETS.map((b) => (
                            <option key={b} value={b} style={{ background: "#111", color: "#F7F8FA" }}>{b}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(247,248,250,0.40)]">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2.5">
                    <label htmlFor="contact-message" className={labelCls}>Message *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project, goals, and requirements…"
                      className={`${inputCls} resize-none leading-relaxed pt-4`}
                      style={{ minHeight: "140px" }}
                    />
                  </div>

                  {/* Error message */}
                  {error && (
                    <div className="text-red-500 text-sm font-semibold bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                      {error}
                    </div>
                  )}

                  {/* Submit button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-3 bg-[#FF9D00] text-[#000000] text-sm font-black tracking-wider uppercase rounded-xl hover:bg-[#F7F8FA] hover:scale-[1.018] hover:-translate-y-0.5 transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
                      style={{ height: "54px" }}
                    >
                      {isSubmitting ? "Sending..." : "Send Enquiry"}
                      {!isSubmitting && (
                        <svg
                          className="transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5"
                          width="14" height="14" viewBox="0 0 14 14" fill="none"
                        >
                          <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-[rgba(247,248,250,0.30)] leading-relaxed text-center">
                    * Required fields — no spam, strictly confidential. We respond within 48 hours.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
