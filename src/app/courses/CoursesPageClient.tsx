"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const WHY_CARDS = [
  { icon: "🎯", title: "Placement Support",     body: "Dedicated hiring drives, referrals & interview calls until you land the role." },
  { icon: "📈", title: "Business Growth Skills", body: "Master revenue, lead-generation and scaling to grow any brand profitably." },
  { icon: "🤖", title: "AI-Integrated Curriculum", body: "ChatGPT, Gemini & automation woven into every marketing module." },
  { icon: "🧑‍💼", title: "Industry Mentors",     body: "Trained by working performance marketers — not slideshow trainers." },
  { icon: "🚀", title: "Live Projects",          body: "Run real Google & Meta ad campaigns with real budgets and real data." },
  { icon: "🗺️", title: "Career Guidance",       body: "1-on-1 mentoring, portfolio reviews and a clear roadmap to your goal." },
  { icon: "👥", title: "Small Batch Size",       body: "Small groups so every learner gets personal attention and feedback." },
  { icon: "💻", title: "Offline + Live Online",  body: "Learn at our Bangalore studio or join interactive live online batches." },
];

const CURRICULUM = [
  {
    module: "Module 01",
    title:  "Digital Marketing Foundations",
    lessons: ["What is digital marketing?", "Understanding the buyer journey", "Brand positioning for digital", "Setting up your marketing stack"],
  },
  {
    module: "Module 02",
    title:  "Social Media Marketing (SMM)",
    lessons: ["Instagram & Facebook strategy", "YouTube growth playbook", "LinkedIn for B2B", "Content calendar & scheduling", "Reels & Shorts creation"],
  },
  {
    module: "Module 03",
    title:  "Meta Ads — Paid Social",
    lessons: ["Campaign structure & objectives", "Audience research & targeting", "Ad creatives that convert", "Retargeting & lookalike audiences", "Budget optimisation & scaling"],
  },
  {
    module: "Module 04",
    title:  "Google Ads & SEM",
    lessons: ["Search campaign setup", "Keyword research & match types", "Quality Score & ad rank", "Display & YouTube ads", "Performance Max campaigns"],
  },
  {
    module: "Module 05",
    title:  "SEO — Search Engine Optimisation",
    lessons: ["On-page & technical SEO", "Keyword strategy & content clusters", "Link building fundamentals", "Local SEO & Google My Business", "SEO reporting & analytics"],
  },
  {
    module: "Module 06",
    title:  "AI Tools & Marketing Automation",
    lessons: ["ChatGPT & Gemini for content", "AI image & video tools", "Email marketing automation", "CRM fundamentals", "Workflow & chatbot setup"],
  },
  {
    module: "Module 07",
    title:  "Analytics, Reporting & Capstone",
    lessons: ["Google Analytics 4 mastery", "Meta Business Suite insights", "Building client reports", "Live capstone project (real brand)", "Portfolio review & placement prep"],
  },
];

const TOOLS = [
  { name: "Meta Ads",        color: "#1877F2", initial: "M" },
  { name: "Google Ads",      color: "#4285F4", initial: "G" },
  { name: "GA4",             color: "#E37400", initial: "A" },
  { name: "ChatGPT",         color: "#10A37F", initial: "C" },
  { name: "Canva",           color: "#00C4CC", initial: "C" },
  { name: "Hootsuite",       color: "#1DB954", initial: "H" },
  { name: "Mailchimp",       color: "#FFE01B", initial: "M", textColor: "#000" },
  { name: "SEMrush",         color: "#FF6B35", initial: "S" },
  { name: "Ahrefs",          color: "#2563EB", initial: "A" },
  { name: "WordPress",       color: "#21759B", initial: "W" },
  { name: "Zapier",          color: "#FF4A00", initial: "Z" },
  { name: "Google My Business", color: "#34A853", initial: "G" },
];

const TESTIMONIALS = [
  {
    name: "Arjun Mehta",
    role: "Placed at a Bangalore agency",
    text: "PC Creations taught me real Meta Ads — not theory. Within 3 months of completing the course I was running ₹5L/month ad budgets for clients.",
  },
  {
    name: "Priya Sharma",
    role: "Now a freelance marketer",
    text: "The curriculum covers everything a client asks for. I now handle 4 clients on my own. The placement support was genuinely helpful.",
  },
  {
    name: "Rohit Nair",
    role: "E-commerce business owner",
    text: "I took the course to run my own store's ads. Our ROAS jumped from 1.2x to 4.8x in 60 days. The AI tools module alone was worth it.",
  },
  {
    name: "Sneha Kulkarni",
    role: "Social media manager",
    text: "The live project experience was the best part. I built a real campaign that I now show in every interview. Got hired within 6 weeks.",
  },
];

const PLANS = [
  {
    name:    "Foundation",
    duration: "2 Months",
    mode:    "Online / Offline",
    features: ["Modules 1–3", "Meta & Google Ads", "Live project", "Certificate", "Community access"],
    featured: false,
    cta:     "Enquire Now",
  },
  {
    name:    "Pro Marketer",
    duration: "4 Months",
    mode:    "Online / Offline",
    features: ["All 7 Modules", "AI Tools", "2 Live projects", "Portfolio review", "Placement support", "Priority mentoring"],
    featured: true,
    cta:     "Enroll Now",
  },
  {
    name:    "Agency Ready",
    duration: "6 Months",
    mode:    "Bangalore Classroom",
    features: ["Everything in Pro", "Internship at PC Creations", "1-on-1 mentoring", "Client-facing experience", "Guaranteed interviews"],
    featured: false,
    cta:     "Enquire Now",
  },
];

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */

function CurriculumAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="flex flex-col divide-y divide-[rgba(0,0,0,0.07)]">
      {CURRICULUM.map((item, i) => (
        <div key={i}>
          <button
            className="w-full flex items-center justify-between gap-4 py-5 text-left group"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-mono font-bold text-[#3155E7] tracking-widest shrink-0">{item.module}</span>
              <span className="text-base sm:text-lg font-bold text-[#000000] group-hover:text-[#3155E7] transition-colors duration-200">{item.title}</span>
            </div>
            <span className={cn("text-[#000000] text-xl leading-none transition-transform duration-200 shrink-0", open === i && "rotate-45")}>+</span>
          </button>
          {open === i && (
            <ul className="pb-5 pl-4 sm:pl-[140px] flex flex-col gap-2">
              {item.lessons.map((l, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-[rgba(0,0,0,0.65)] leading-relaxed">
                  <span className="text-[#FF9D00] mt-0.5">→</span>
                  {l}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

function LeadForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", mode: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917204511681";
    
    // Format the message for WhatsApp (plain text, no formatting)
    const message = `Course Enquiry from PC Creations Website\n\n` +
      `Name: ${form.name}\n` +
      `Phone: ${form.phone}\n` +
      `Email: ${form.email || 'Not specified'}\n` +
      `Preferred Mode: ${form.mode || 'Not specified'}\n\n` +
      `I'm interested in the Digital Marketing Course. Please share batch details.`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    setSent(true);
  };

  return sent ? (
    <div className="flex flex-col items-center gap-4 py-12 text-center">
      <div className="w-14 h-14 rounded-full bg-[#FF9D00] flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 11l5 5L18 6" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <h3 className="text-xl font-black text-[#000000]">Request Sent!</h3>
      <p className="text-sm text-[rgba(0,0,0,0.55)]">Our counsellor will call you within 24 hours with batch details.</p>
    </div>
  ) : (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input required name="name"  value={form.name}  onChange={handleChange} placeholder="Your name *"  className="border border-[rgba(0,0,0,0.15)] rounded-xl px-4 py-3 text-sm text-[#000] placeholder:text-[rgba(0,0,0,0.35)] focus:outline-none focus:border-[#3155E7] bg-white transition-colors" />
        <input required name="phone" value={form.phone} onChange={handleChange} placeholder="Phone number *" type="tel" className="border border-[rgba(0,0,0,0.15)] rounded-xl px-4 py-3 text-sm text-[#000] placeholder:text-[rgba(0,0,0,0.35)] focus:outline-none focus:border-[#3155E7] bg-white transition-colors" />
      </div>
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email address" type="email" className="border border-[rgba(0,0,0,0.15)] rounded-xl px-4 py-3 text-sm text-[#000] placeholder:text-[rgba(0,0,0,0.35)] focus:outline-none focus:border-[#3155E7] bg-white transition-colors" />
      <select name="mode" value={form.mode} onChange={handleChange} className="border border-[rgba(0,0,0,0.15)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3155E7] bg-white transition-colors" style={{ color: form.mode ? "#000" : "rgba(0,0,0,0.35)" }}>
        <option value="" disabled>Preferred mode</option>
        <option value="online">Live Online</option>
        <option value="offline">Classroom – Bangalore</option>
        <option value="either">Either works for me</option>
      </select>
      <button type="submit" className="bg-[#FF9D00] text-[#000000] font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-full hover:bg-[#000000] hover:text-[#F7F8FA] transition-all duration-300">
        Book Free Demo Session
      </button>
      <p className="text-[11px] text-[rgba(0,0,0,0.40)] text-center">No spam. 100% confidential. No obligation.</p>
    </form>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export function CoursesPageClient() {
  return (
    <main id="courses-main" className="bg-[#F7F8FA] pt-[72px]">

      {/* ── 1. HERO ── */}
      <section className="relative bg-[#000000] overflow-hidden py-20 sm:py-28">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[rgba(49,85,231,0.12)] blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center gap-8">
          <span className="text-[11px] font-mono font-bold text-[#FF9D00] tracking-widest uppercase border border-[rgba(255,157,0,0.30)] px-4 py-1.5 rounded-full">
            PC Creations Digital Institute
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#F7F8FA] tracking-tight leading-[0.92]">
            India&apos;s Most Practical<br />
            <span className="text-[#FF9D00]">AI Digital Marketing</span><br />
            Course — Bangalore
          </h1>

          <p className="text-lg text-[rgba(247,248,250,0.60)] max-w-2xl leading-relaxed">
            Master Meta Ads, Google Ads, SEO, SMM, AI Tools & live projects.
            Trained by working performance marketers at PC Creations.
            100% placement support included.
          </p>

          {/* Proof pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {["Live Agency Projects", "100% Placement Support", "AI-Integrated", "Classroom & Online"].map(p => (
              <span key={p} className="bg-[rgba(247,248,250,0.08)] border border-[rgba(247,248,250,0.12)] text-[#F7F8FA] text-xs font-medium px-4 py-1.5 rounded-full">{p}</span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#enroll" className="bg-[#FF9D00] text-[#000000] font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-full hover:bg-[#F7F8FA] transition-all duration-300">
              Book Free Demo
            </a>
            <a href="#curriculum" className="border border-[rgba(247,248,250,0.25)] text-[#F7F8FA] font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-full hover:border-[#FF9D00] hover:text-[#FF9D00] transition-all duration-300">
              View Curriculum
            </a>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-[rgba(247,248,250,0.08)] w-full mt-4">
            {[
              { val: "500+", label: "Students Trained" },
              { val: "7",    label: "Course Modules" },
              { val: "100%", label: "Placement Support" },
              { val: "2",    label: "Bangalore Branches" },
            ].map(s => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <span className="text-3xl font-black text-[#FF9D00]">{s.val}</span>
                <span className="text-[11px] text-[rgba(247,248,250,0.50)] uppercase tracking-widest font-mono">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. WHY PC CREATIONS ── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[11px] font-mono font-bold text-[#3155E7] tracking-widest uppercase mb-3">Why Choose Us</p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#000000] tracking-tight leading-[0.92]">
              Not just lectures —<br className="hidden sm:block" /> a full ecosystem.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY_CARDS.map(c => (
              <div key={c.title} className="group bg-white border border-[rgba(0,0,0,0.07)] rounded-2xl p-6 hover:border-[#3155E7] hover:shadow-lg transition-all duration-300">
                <div className="text-3xl mb-3">{c.icon}</div>
                <h3 className="text-base font-bold text-[#000000] mb-1.5 group-hover:text-[#3155E7] transition-colors duration-200">{c.title}</h3>
                <p className="text-xs text-[rgba(0,0,0,0.55)] leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. CURRICULUM ── */}
      <section id="curriculum" className="py-20 sm:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[11px] font-mono font-bold text-[#FF9D00] tracking-widest uppercase mb-3">Curriculum</p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#000000] tracking-tight leading-[0.92]">
              A curriculum that<br className="hidden sm:block" /> mirrors a real marketing job.
            </h2>
            <p className="text-base text-[rgba(0,0,0,0.52)] mt-4 max-w-lg mx-auto leading-relaxed">
              Seven guided modules take you from fundamentals to AI-powered performance marketing and a job-ready portfolio.
            </p>
          </div>
          <CurriculumAccordion />
        </div>
      </section>

      {/* ── 4. TOOLS ── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[11px] font-mono font-bold text-[#3155E7] tracking-widest uppercase mb-3">Tools</p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#000000] tracking-tight leading-[0.92]">
              Tools you will master.
            </h2>
            <p className="text-base text-[rgba(0,0,0,0.52)] mt-4 max-w-lg mx-auto">
              Get hands-on with the exact platforms top marketing teams use every day.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {TOOLS.map(t => (
              <div key={t.name} className="flex items-center gap-2.5 bg-white border border-[rgba(0,0,0,0.08)] rounded-xl px-4 py-2.5 hover:shadow-md hover:border-[rgba(0,0,0,0.16)] transition-all duration-200">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black text-white shrink-0" style={{ backgroundColor: t.color, color: t.textColor ?? "white" }}>
                  {t.initial}
                </div>
                <span className="text-sm font-medium text-[#000000]">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. TESTIMONIALS ── */}
      <section className="py-20 sm:py-28 bg-[#000000]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[11px] font-mono font-bold text-[#FF9D00] tracking-widest uppercase mb-3">Student Reviews</p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#F7F8FA] tracking-tight leading-[0.92]">
              What our learners say.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="bg-[rgba(247,248,250,0.05)] border border-[rgba(247,248,250,0.10)] rounded-2xl p-6 hover:border-[rgba(255,157,0,0.30)] transition-all duration-300">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#FF9D00"><path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z"/></svg>
                  ))}
                </div>
                <p className="text-sm text-[rgba(247,248,250,0.75)] leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="text-sm font-bold text-[#F7F8FA]">{t.name}</p>
                  <p className="text-xs text-[rgba(247,248,250,0.45)]">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. PRICING ── */}
      <section id="enroll" className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[11px] font-mono font-bold text-[#3155E7] tracking-widest uppercase mb-3">Pricing</p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#000000] tracking-tight leading-[0.92]">
              Choose your learning path.
            </h2>
            <p className="text-base text-[rgba(0,0,0,0.52)] mt-4">Contact us for exact fees — EMI options available.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PLANS.map(plan => (
              <div key={plan.name} className={cn(
                "rounded-2xl flex flex-col p-7 gap-6 transition-all duration-300",
                plan.featured
                  ? "bg-[#000000] border-2 border-[#FF9D00] shadow-[0_0_40px_rgba(255,157,0,0.15)]"
                  : "bg-white border border-[rgba(0,0,0,0.08)] hover:border-[rgba(0,0,0,0.20)] hover:shadow-md",
              )}>
                {plan.featured && (
                  <span className="text-[10px] font-mono font-bold text-[#FF9D00] tracking-[0.18em] uppercase">Most Popular</span>
                )}
                <div>
                  <h3 className={cn("text-2xl font-black tracking-tight", plan.featured ? "text-[#F7F8FA]" : "text-[#000000]")}>{plan.name}</h3>
                  <p className={cn("text-sm mt-1", plan.featured ? "text-[rgba(247,248,250,0.50)]" : "text-[rgba(0,0,0,0.50)]")}>{plan.duration} · {plan.mode}</p>
                </div>
                <ul className="flex flex-col gap-2.5 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className={cn("flex items-start gap-2 text-sm leading-snug", plan.featured ? "text-[rgba(247,248,250,0.80)]" : "text-[rgba(0,0,0,0.70)]")}>
                      <span className="text-[#FF9D00] mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#contact-form" className={cn(
                  "block text-center text-sm font-bold tracking-wider uppercase px-6 py-3.5 rounded-full transition-all duration-300",
                  plan.featured
                    ? "bg-[#FF9D00] text-[#000000] hover:bg-[#F7F8FA]"
                    : "border border-[rgba(0,0,0,0.20)] text-[#000000] hover:border-[#FF9D00] hover:text-[#FF9D00]",
                )}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. LEAD FORM ── */}
      <section id="contact-form" className="py-20 sm:py-28 bg-[#F7F8FA] border-t border-[rgba(0,0,0,0.06)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="flex flex-col gap-6">
            <p className="text-[11px] font-mono font-bold text-[#FF9D00] tracking-widest uppercase">Reserve Your Seat</p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#000000] tracking-tight leading-[0.92]">
              Book your free<br />
              <span className="text-[#3155E7]">demo session.</span>
            </h2>
            <p className="text-base text-[rgba(0,0,0,0.55)] leading-relaxed max-w-sm">
              Share your details and our counsellor will reach out with batch timings, fees and the full syllabus — no obligation, just clarity.
            </p>
            <ul className="flex flex-col gap-3">
              {["Live interactive demo session", "Personalised career roadmap", "Instant brochure download", "EMI & fee options explained"].map(b => (
                <li key={b} className="flex items-center gap-2.5 text-sm text-[rgba(0,0,0,0.70)]">
                  <span className="w-5 h-5 rounded-full bg-[rgba(49,85,231,0.10)] flex items-center justify-center shrink-0">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 3.5-4" stroke="#3155E7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            {/* Direct contact */}
            <div className="flex flex-col gap-2 pt-4 border-t border-[rgba(0,0,0,0.08)]">
              <a href="tel:+917204511681" className="text-sm text-[rgba(0,0,0,0.55)] hover:text-[#000000] transition-colors duration-200">📞 72045 11681</a>
              <a href="mailto:pccreations25@gmail.com" className="text-sm text-[rgba(0,0,0,0.55)] hover:text-[#000000] transition-colors duration-200">✉️ pccreations25@gmail.com</a>
              <p className="text-sm text-[rgba(0,0,0,0.55)]">📍 Rajajinagar & Indiranagar, Bangalore</p>
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.08)] p-8 shadow-sm">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="bg-[#000000] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center flex flex-col gap-6">
          <h2 className="text-3xl sm:text-4xl font-black text-[#F7F8FA] tracking-tight">
            Ready to launch your digital marketing career?
          </h2>
          <p className="text-base text-[rgba(247,248,250,0.55)]">
            Secure your seat in the next PC Creations batch and start building skills that brands are hiring for right now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact-form" className="bg-[#FF9D00] text-[#000000] font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-full hover:bg-[#F7F8FA] transition-all duration-300">
              Book Free Demo
            </a>
            <Link href="/" className="border border-[rgba(247,248,250,0.25)] text-[#F7F8FA] font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-full hover:border-[#FF9D00] hover:text-[#FF9D00] transition-all duration-300">
              ← Back to PC Creations
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
