"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const WHY_CARDS = [
  { icon: "📜", title: "MSME Verified Certificate", body: "Government recognized certification provided under MSME to validate your expertise." },
  { icon: "🤖", title: "AI Tools Workshops",       body: "Hands-on workshops on ChatGPT, Gemini, ad automation & AI creative workflows." },
  { icon: "🧑‍💼", title: "Expert Mentors Support",   body: "Trained and guided by working performance marketers — not slideshow trainers." },
  { icon: "🚀", title: "Practical Training",       body: "Run real Google & Meta ad campaigns with real budgets, real creatives and live data." },
  { icon: "🔄", title: "Revision Classes",          body: "Dedicated revision sessions & doubt clearing so every learner achieves mastery." },
  { icon: "🎯", title: "100% Placement Support",   body: "Optional career track with interview prep, 1-on-1 guidance & internship opportunity." },
  { icon: "🎁", title: "Free Demo Classes",        body: "Experience our practical teaching methodology live before enrolling." },
  { icon: "💻", title: "Online + Bangalore Studio",body: "Join interactive live online batches or attend at our Bangalore studios." },
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

interface PlanFeature {
  text: string;
  isAddon?: boolean;
  highlight?: boolean;
}

interface CoursePlan {
  name: string;
  badge?: string;
  duration: string;
  mode: string;
  originalPrice?: string;
  price: string;
  feeBreakdown: string;
  periodNote?: string;
  features: PlanFeature[];
  featured: boolean;
  cta: string;
  materialsNote?: string;
}

const PLANS: CoursePlan[] = [
  {
    name: "Digital Marketing + AI",
    badge: "Special Festive Offer",
    duration: "2 Months",
    mode: "Live Online Classes",
    originalPrice: "₹10,000",
    price: "₹7,999",
    feeBreakdown: "₹7,500 course fees + ₹499 registration fees",
    periodNote: "Complete Course & MSME Certification",
    featured: true,
    cta: "Enroll for ₹7,999",
    materialsNote: "Materials provided (digital access package included)",
    features: [
      { text: "We provide this in standard class", highlight: true },
      { text: "Expert mentors support throughout" },
      { text: "Practical hands-on campaign training (SEO & Ads)" },
      { text: "Dedicated AI tools workshops (ChatGPT, Gemini)" },
      { text: "Weekly revision classes & live doubt sessions" },
      { text: "Verified certificate provided under MSME", highlight: true },
      { text: "Free Demo Classes included (limited offer)" },
    ],
  },
  {
    name: "Pro + Career Accelerator",
    badge: "Career Growth Track",
    duration: "2 Months",
    mode: "Online / Hybrid",
    price: "₹15,000",
    feeBreakdown: "Complete Course + Career Growth Track",
    periodNote: "Standard Course + Premium Career Growth Track",
    featured: false,
    cta: "Enroll with Career Track",
    materialsNote: "Includes complete digital agency toolkit & templates",
    features: [
      { text: "Everything in Standard Digital Marketing + AI", highlight: true },
      { text: "Interview Preparation Support", isAddon: true },
      { text: "One on One Guidance Support", isAddon: true },
      { text: "Live Projects Workshops (real client ad spend)", isAddon: true },
      { text: "100% Job Assistance & Placement Support", isAddon: true },
      { text: "Internship Opportunity Provided at PC Creations", isAddon: true },
      { text: "Verified MSME Certificate + Portfolio Review" },
    ],
  },
  {
    name: "Bangalore Classroom",
    badge: "Classroom Experience",
    duration: "6 Months",
    mode: "Rajajinagar & Indiranagar",
    price: "Classroom Batch",
    feeBreakdown: "Physical Workstations & Studio Access",
    periodNote: "In-Person Immersive Training",
    featured: false,
    cta: "Launching Soon",
    materialsNote: "Physical training materials & kits provided",
    features: [
      { text: "In-person daily classroom training in Bangalore" },
      { text: "Physical materials & hardware workstation provided" },
      { text: "Direct daily mentorship with working marketers" },
      { text: "Live client campaigns & capstone project" },
      { text: "Guaranteed agency internship at PC Creations" },
      { text: "100% Placement Support & MSME Certificate" },
      { text: "Free in-person demo session" },
    ],
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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    paymentOption: "both",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 12MB
    if (file.size > 12 * 1024 * 1024) {
      setError("File is too large. Please upload an image or PDF under 12MB.");
      return;
    }

    setScreenshot(file);
    setError(null);

    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const removeFile = () => {
    setScreenshot(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    const cleanPhone = form.phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!form.paymentOption) {
      setError("Please select a payment option (Registration Fee 499, Course Fee 7500, or Both).");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name.trim());
      formData.append("phone", form.phone.trim());
      formData.append("email", form.email.trim().toLowerCase());
      formData.append("paymentOption", form.paymentOption);

      if (screenshot) {
        formData.append("paymentScreenshot", screenshot);
      }

      const res = await fetch("/api/courses/enquiry", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Submission failed. Please try again.");
      }

      setSent(true);
    } catch (err) {
      console.error("Form submission error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again or WhatsApp us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const getOptionLabel = () => {
    switch (form.paymentOption) {
      case "registration_fee":
        return "Registration Fee (₹499)";
      case "course_fee":
        return "Course Fee (₹7,500)";
      case "both":
      default:
        return "Both (Course Fee + Registration Fee: ₹7,999)";
    }
  };

  return sent ? (
    <div className="flex flex-col items-center gap-5 py-8 text-center">
      <div className="w-16 h-16 rounded-full bg-[#10A37F]/15 border border-[#10A37F]/30 flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M5 13l4 4L19 7" stroke="#10A37F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="text-2xl font-black text-[#000000]">Enrollment Submitted!</h3>
        <p className="text-sm font-semibold text-[#FF9D00]">{getOptionLabel()}</p>
        <p className="text-xs text-[rgba(0,0,0,0.60)] max-w-sm mt-1 leading-relaxed">
          Thank you, <strong>{form.name}</strong>! Your details and payment proof have been sent to our team at <strong>pccreations25@gmail.com</strong>.
        </p>
      </div>

      <div className="w-full bg-[#F7F8FA] border border-[rgba(0,0,0,0.08)] rounded-xl p-4 text-left text-xs flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="text-[rgba(0,0,0,0.45)]">Student:</span>
          <span className="font-bold text-[#000000]">{form.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[rgba(0,0,0,0.45)]">Phone:</span>
          <span className="font-mono text-[#000000]">{form.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[rgba(0,0,0,0.45)]">Email:</span>
          <span className="font-mono text-[#000000]">{form.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[rgba(0,0,0,0.45)]">Payment Proof:</span>
          <span className="font-bold text-[#10A37F]">
            {screenshot ? `✓ ${screenshot.name}` : "Pending / Free Demo"}
          </span>
        </div>
      </div>

      <div className="flex flex-col w-full gap-2.5 mt-2">
        <a
          href={`https://wa.me/917204511681?text=${encodeURIComponent(
            `Hi PC Creations, I have just submitted the enrollment form for ${form.name} (${getOptionLabel()}). Please confirm my seat!`
          )}`}
          target="_blank"
          rel="noreferrer"
          className="w-full text-center bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-full transition-all shadow-md flex items-center justify-center gap-2"
        >
          <span>💬 Confirm on WhatsApp: 72045 11681</span>
        </a>

        <button
          type="button"
          onClick={() => {
            setSent(false);
            setScreenshot(null);
            setPreviewUrl(null);
            setForm({ name: "", phone: "", email: "", paymentOption: "both" });
          }}
          className="text-xs text-[rgba(0,0,0,0.50)] hover:text-[#000000] underline mt-1"
        >
          Submit another response
        </button>
      </div>
    </div>
  ) : (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      {/* Top Banner */}
      <div className="bg-[#FF9D00]/10 border border-[#FF9D00]/30 rounded-xl p-3 text-xs text-[#000000]">
        🔥 <strong>Course Enrollment & Payment</strong>: ₹7,500 course fee + ₹499 registration fee (Total ₹7,999).
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-xs flex items-start gap-2">
          <span className="font-bold shrink-0">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Name and Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-[11px] font-bold text-[rgba(0,0,0,0.70)] uppercase tracking-wider mb-1">
            Student Name *
          </label>
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            className="w-full border border-[rgba(0,0,0,0.15)] rounded-xl px-4 py-3 text-sm text-[#000] placeholder:text-[rgba(0,0,0,0.35)] focus:outline-none focus:border-[#3155E7] bg-white transition-colors"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-[rgba(0,0,0,0.70)] uppercase tracking-wider mb-1">
            Phone Number *
          </label>
          <input
            required
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            type="tel"
            className="w-full border border-[rgba(0,0,0,0.15)] rounded-xl px-4 py-3 text-sm text-[#000] placeholder:text-[rgba(0,0,0,0.35)] focus:outline-none focus:border-[#3155E7] bg-white transition-colors"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-[11px] font-bold text-[rgba(0,0,0,0.70)] uppercase tracking-wider mb-1">
          Email Address *
        </label>
        <input
          required
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="yourname@gmail.com"
          type="email"
          className="w-full border border-[rgba(0,0,0,0.15)] rounded-xl px-4 py-3 text-sm text-[#000] placeholder:text-[rgba(0,0,0,0.35)] focus:outline-none focus:border-[#3155E7] bg-white transition-colors"
        />
      </div>

      {/* Payment Options Dropdown */}
      <div>
        <label className="block text-[11px] font-bold text-[rgba(0,0,0,0.70)] uppercase tracking-wider mb-1">
          Select Fee / Payment Option *
        </label>
        <select
          name="paymentOption"
          value={form.paymentOption}
          onChange={handleChange}
          required
          className="w-full border border-[rgba(0,0,0,0.15)] rounded-xl px-4 py-3 text-sm font-semibold text-[#000000] focus:outline-none focus:border-[#3155E7] bg-white transition-colors"
        >
          <option value="registration_fee">1. Registration Fee – ₹499</option>
          <option value="course_fee">2. Course Fee – ₹7,500</option>
          <option value="both">3. Both (Course Fee + Registration Fee: ₹7,999)</option>
        </select>
      </div>

      {/* Scan & Pay QR Code Box */}
      <div className="bg-white border border-[rgba(0,0,0,0.12)] rounded-2xl p-4 flex flex-col items-center text-center gap-3 shadow-xs">
        <div className="flex items-center justify-between w-full">
          <span className="text-[11px] font-mono font-bold text-[#3155E7] uppercase tracking-wider">
            Scan &amp; Pay via UPI
          </span>
          <span className="text-[10px] font-mono font-bold bg-[#FF9D00] text-[#000000] px-2.5 py-0.5 rounded-full">
            {form.paymentOption === "registration_fee"
              ? "₹499"
              : form.paymentOption === "course_fee"
              ? "₹7,500"
              : "₹7,999"}
          </span>
        </div>

        <div className="relative p-2.5 bg-white border-2 border-[rgba(0,0,0,0.08)] rounded-2xl shadow-sm">
          <img
            src={
              form.paymentOption === "registration_fee"
                ? "/assets/qr-registration-fee.jpg"
                : form.paymentOption === "course_fee"
                ? "/assets/qr-course-fee.jpg"
                : "/assets/qr-both.jpg"
            }
            alt={
              form.paymentOption === "registration_fee"
                ? "QR code for ₹499 Registration Fee"
                : form.paymentOption === "course_fee"
                ? "QR code for ₹7,500 Course Fee"
                : "QR code for ₹7,999 (Both)"
            }
            width={200}
            height={200}
            className="w-44 h-44 sm:w-48 sm:h-48 object-contain rounded-xl"
          />
        </div>

        <p className="text-xs text-[rgba(0,0,0,0.60)] leading-relaxed max-w-xs">
          Scan with <strong>PhonePe, Google Pay, Paytm</strong> or any UPI app to pay, then upload the receipt below.
        </p>
      </div>

      {/* Payment Screenshot Upload Section */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[11px] font-bold text-[rgba(0,0,0,0.85)] uppercase tracking-wider">
            Upload Payment Screenshot *
          </label>
          <span className="text-[10px] text-[rgba(0,0,0,0.45)] font-mono">
            PNG, JPG, PDF (max 12MB)
          </span>
        </div>

        {screenshot ? (
          <div className="flex items-center justify-between bg-white border-2 border-[#10A37F] rounded-xl p-3 shadow-sm">
            <div className="flex items-center gap-3 overflow-hidden">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Screenshot preview"
                  className="w-12 h-12 object-cover rounded-lg border border-[rgba(0,0,0,0.10)] shrink-0"
                />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-[#10A37F]/10 text-[#10A37F] flex items-center justify-center font-bold text-lg shrink-0">
                  📄
                </div>
              )}
              <div className="flex flex-col truncate">
                <span className="text-xs font-bold text-[#000000] truncate">
                  {screenshot.name}
                </span>
                <span className="text-[10px] text-[rgba(0,0,0,0.45)]">
                  {(screenshot.size / 1024).toFixed(1)} KB · Ready to send
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={removeFile}
              className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors shrink-0 ml-2"
            >
              Change
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-[rgba(0,0,0,0.20)] hover:border-[#FF9D00] bg-[rgba(0,0,0,0.01)] hover:bg-[#FFF9EE] rounded-xl p-5 cursor-pointer transition-all group">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="w-10 h-10 rounded-full bg-[rgba(255,157,0,0.12)] text-[#FF9D00] flex items-center justify-center text-lg mb-2 group-hover:scale-110 transition-transform">
              📸
            </div>
            <p className="text-xs font-bold text-[#000000] group-hover:text-[#FF9D00] transition-colors">
              Click to upload payment screenshot
            </p>
            <p className="text-[11px] text-[rgba(0,0,0,0.45)] mt-0.5">
              or drag &amp; drop transaction receipt here
            </p>
          </label>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-[#FF9D00] hover:bg-[#000000] text-[#000000] hover:text-[#F7F8FA] font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-full transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Submitting details...</span>
          </>
        ) : (
          <span>Submit Enrollment &amp; Payment Proof</span>
        )}
      </button>

      <p className="text-[11px] text-[rgba(0,0,0,0.45)] text-center">
        Details are securely delivered to <strong>pccreations25@gmail.com</strong> and logged to our admissions team.
      </p>
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
          {/* Festive Offer Badge */}
          <div className="inline-flex items-center gap-2 border border-[rgba(255,157,0,0.40)] bg-[rgba(255,157,0,0.10)] px-4 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#FF9D00] animate-pulse" />
            <span className="text-[11px] font-mono font-bold text-[#FF9D00] tracking-wider uppercase">
              Special Offer: ₹7,500 Course Fee + ₹499 Registration Fee • Free Demo Available
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#F7F8FA] tracking-tight leading-[0.92]">
            India&apos;s Most Practical<br />
            <span className="text-[#FF9D00]">Digital Marketing + AI</span><br />
            Classes — Bangalore
          </h1>

          <p className="text-lg text-[rgba(247,248,250,0.65)] max-w-2xl leading-relaxed">
            From SEO to social media, learn easy and quick with AI where it matters most.
            Trained by expert performance marketers at PC Creations. Verified certificate under MSME.
          </p>

          {/* Proof pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {["₹7,500 Course + ₹499 Reg Fee", "Free Demo Classes", "MSME Verified Certificate", "Live Agency Projects", "100% Placement Support"].map(p => (
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

      {/* ── 6. PRICING & SPECIAL OFFER ── */}
      <section id="enroll" className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 border border-[rgba(49,85,231,0.25)] bg-[rgba(49,85,231,0.06)] px-3.5 py-1 rounded-full mb-3">
              <span className="text-[11px] font-mono font-bold text-[#3155E7] tracking-widest uppercase">Course Fees & Special Offer</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#000000] tracking-tight leading-[0.92]">
              Choose your learning path.
            </h2>
            <p className="text-base text-[rgba(0,0,0,0.52)] mt-4">
              Transparent fees: <strong>₹7,500 course fees + ₹499 registration fees</strong> · Free demo classes available.
            </p>
          </div>

          {/* Special Festive Offer Highlight Banner (Flyer Alignment) */}
          <div className="relative mb-14 rounded-3xl bg-gradient-to-br from-[#0c0f17] via-[#05070a] to-[#000000] border-2 border-[#FF9D00] p-6 sm:p-10 shadow-[0_20px_60px_rgba(255,157,0,0.15)] overflow-hidden">
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[rgba(255,157,0,0.15)] blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[rgba(49,85,231,0.15)] blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Left Column */}
              <div className="flex flex-col gap-3 text-center lg:text-left max-w-xl">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  <span className="bg-[#FF9D00] text-[#000000] text-[11px] font-black tracking-wider uppercase px-3 py-1 rounded-full">
                    Special Festive Offer
                  </span>
                  <span className="border border-[rgba(247,248,250,0.25)] text-[#F7F8FA] text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full">
                    Free Demo Classes
                  </span>
                  <span className="border border-[rgba(255,157,0,0.4)] text-[#FF9D00] text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full">
                    Verified MSME Certificate
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#F7F8FA] tracking-tight">
                  Digital Marketing + AI Classes
                </h3>
                <p className="text-sm text-[rgba(247,248,250,0.70)] leading-relaxed">
                  From SEO to social media, we help you to learn easy and quick with AI where it matters most.
                  Includes expert mentors support, practical campaign training, AI workshops, and revision classes.
                </p>

                {/* Additional Course notice from poster */}
                <div className="inline-flex items-center gap-2 text-xs text-[#FF9D00] bg-[rgba(255,157,0,0.08)] border border-[rgba(255,157,0,0.20)] rounded-xl px-3.5 py-2 mt-1">
                  <span>👑</span>
                  <span><strong>Premium Additional Course (Optional):</strong> Interview Preparation Support, One on One Guidance Support, Live Projects Workshops, 100% Job Assistance & Internship Opportunity Provided.</span>
                </div>
              </div>

              {/* Right Column: Pricing Tag */}
              <div className="flex flex-col items-center lg:items-end text-center lg:text-right shrink-0 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.10)] rounded-2xl p-6 sm:p-7 min-w-[280px]">
                <span className="text-xs font-mono font-bold text-[rgba(247,248,250,0.50)] uppercase tracking-widest">
                  Online Class Special Offer
                </span>
                
                <div className="flex items-baseline gap-3 my-1">
                  <span className="text-lg sm:text-xl font-bold text-[rgba(247,248,250,0.40)] line-through decoration-red-500 decoration-2">
                    ₹10,000/-
                  </span>
                  <span className="text-4xl sm:text-5xl font-black text-[#FF9D00] tracking-tight">
                    ₹7,999/-
                  </span>
                </div>

                {/* Exact breakdown highlight */}
                <div className="bg-[#FF9D00]/15 border border-[#FF9D00]/40 rounded-lg px-3 py-1.5 my-2">
                  <p className="text-xs font-bold text-[#FF9D00]">
                    7,500 course fees + 499 registration fees
                  </p>
                </div>

                <p className="text-[11px] text-[rgba(247,248,250,0.50)] mb-4">
                  Full access · MSME verified certificate included
                </p>

                <div className="flex flex-col w-full gap-2">
                  <a
                    href="#contact-form"
                    className="w-full text-center bg-[#FF9D00] hover:bg-[#F7F8FA] text-[#000000] font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-full transition-all duration-300 shadow-md"
                  >
                    Register Now / Book Free Demo
                  </a>
                  <a
                    href={`https://wa.me/917204511681?text=${encodeURIComponent("Hi PC Creations, I'm interested in the Digital Marketing Course (₹7,500 course fees + ₹499 registration fees). Please share batch details.")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full text-center border border-[rgba(247,248,250,0.25)] hover:border-[#FF9D00] text-[#F7F8FA] hover:text-[#FF9D00] font-semibold text-xs py-2.5 px-4 rounded-full transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>💬 WhatsApp: 72045 11681</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map(plan => (
              <div
                key={plan.name}
                className={cn(
                  "rounded-3xl flex flex-col p-7 sm:p-8 gap-6 transition-all duration-300 relative",
                  plan.featured
                    ? "bg-[#000000] text-[#F7F8FA] border-2 border-[#FF9D00] shadow-[0_15px_45px_rgba(255,157,0,0.18)]"
                    : "bg-white text-[#000000] border border-[rgba(0,0,0,0.08)] hover:border-[rgba(0,0,0,0.20)] hover:shadow-xl",
                )}
              >
                {/* Header / Badge */}
                {plan.badge && (
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "text-[10px] font-mono font-bold tracking-[0.16em] uppercase px-3 py-1 rounded-full",
                        plan.featured
                          ? "bg-[#FF9D00] text-[#000000]"
                          : "bg-[rgba(49,85,231,0.08)] text-[#3155E7] border border-[rgba(49,85,231,0.15)]",
                      )}
                    >
                      {plan.badge}
                    </span>
                    <span className={cn(
                      "text-[11px] font-mono",
                      plan.featured ? "text-[rgba(247,248,250,0.45)]" : "text-[rgba(0,0,0,0.40)]",
                    )}>
                      {plan.duration}
                    </span>
                  </div>
                )}

                <div>
                  <h3
                    className={cn(
                      "text-2xl font-black tracking-tight",
                      plan.featured ? "text-[#F7F8FA]" : "text-[#000000]",
                    )}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={cn(
                      "text-xs mt-1 font-medium",
                      plan.featured ? "text-[rgba(247,248,250,0.60)]" : "text-[rgba(0,0,0,0.50)]",
                    )}
                  >
                    {plan.mode}
                  </p>
                </div>

                {/* Price block */}
                <div className={cn(
                  "py-3 border-y",
                  plan.featured ? "border-[rgba(255,255,255,0.12)]" : "border-[rgba(0,0,0,0.08)]",
                )}>
                  <div className="flex items-baseline gap-2">
                    {plan.originalPrice && (
                      <span className="text-sm font-semibold line-through text-red-500">
                        {plan.originalPrice}
                      </span>
                    )}
                    <span
                      className={cn(
                        "text-3xl sm:text-4xl font-black tracking-tight",
                        plan.featured ? "text-[#FF9D00]" : "text-[#000000]",
                      )}
                    >
                      {plan.price}
                    </span>
                  </div>
                  <p
                    className={cn(
                      "text-xs font-bold mt-1.5",
                      plan.featured ? "text-[#FF9D00]" : "text-[#3155E7]",
                    )}
                  >
                    {plan.feeBreakdown}
                  </p>
                  {plan.periodNote && (
                    <p
                      className={cn(
                        "text-[11px] mt-0.5",
                        plan.featured ? "text-[rgba(247,248,250,0.50)]" : "text-[rgba(0,0,0,0.45)]",
                      )}
                    >
                      {plan.periodNote}
                    </p>
                  )}
                </div>

                {/* Features List */}
                <div className="flex-1 flex flex-col gap-3">
                  <p
                    className={cn(
                      "text-[11px] font-mono font-bold uppercase tracking-wider",
                      plan.featured ? "text-[rgba(247,248,250,0.60)]" : "text-[rgba(0,0,0,0.45)]",
                    )}
                  >
                    What&apos;s Included:
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {plan.features.map((f, idx) => (
                      <li
                        key={idx}
                        className={cn(
                          "flex items-start gap-2.5 text-xs sm:text-sm leading-snug",
                          plan.featured
                            ? f.isAddon
                              ? "text-[#FF9D00] font-semibold"
                              : f.highlight
                              ? "text-[#FFFFFF] font-bold"
                              : "text-[rgba(247,248,250,0.85)]"
                            : f.highlight
                            ? "text-[#000000] font-bold"
                            : f.isAddon
                            ? "text-[#000000] font-semibold"
                            : "text-[rgba(0,0,0,0.70)]",
                        )}
                      >
                        <span className="text-[#FF9D00] mt-0.5 shrink-0">
                          {f.isAddon ? "★" : "✓"}
                        </span>
                        <span>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Materials note */}
                {plan.materialsNote && (
                  <p
                    className={cn(
                      "text-[11px] italic border-t pt-3",
                      plan.featured
                        ? "border-[rgba(255,255,255,0.10)] text-[rgba(247,248,250,0.50)]"
                        : "border-[rgba(0,0,0,0.06)] text-[rgba(0,0,0,0.45)]",
                    )}
                  >
                    ℹ️ {plan.materialsNote}
                  </p>
                )}

                {/* CTA */}
                <a
                  href="#contact-form"
                  className={cn(
                    "block text-center text-xs sm:text-sm font-bold tracking-wider uppercase px-6 py-4 rounded-full transition-all duration-300 shadow-sm",
                    plan.featured
                      ? "bg-[#FF9D00] text-[#000000] hover:bg-[#F7F8FA]"
                      : "bg-[#000000] text-[#FFFFFF] hover:bg-[#3155E7]",
                  )}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>

          {/* Fee Breakdown & Transparency Box */}
          <div className="mt-12 bg-white rounded-2xl border border-[rgba(0,0,0,0.08)] p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-[rgba(0,0,0,0.08)]">
              
              <div className="flex flex-col gap-1.5 md:pr-6">
                <span className="text-[11px] font-mono font-bold text-[#3155E7] uppercase tracking-wider">Fee Component 01</span>
                <h4 className="text-lg font-black text-[#000000]">Course Fees: ₹7,500</h4>
                <p className="text-xs text-[rgba(0,0,0,0.60)] leading-relaxed">
                  Covers all live interactive classes, hands-on campaign sessions, dedicated AI tools workshops, and weekly revision doubt-clearing batches.
                </p>
              </div>

              <div className="flex flex-col gap-1.5 pt-4 md:pt-0 md:px-6">
                <span className="text-[11px] font-mono font-bold text-[#FF9D00] uppercase tracking-wider">Fee Component 02</span>
                <h4 className="text-lg font-black text-[#000000]">Registration Fees: ₹499</h4>
                <p className="text-xs text-[rgba(0,0,0,0.60)] leading-relaxed">
                  Covers student LMS account setup, verified certificate issuance under MSME, digital learning materials access, and seat reservation.
                </p>
              </div>

              <div className="flex flex-col gap-1.5 pt-4 md:pt-0 md:pl-6">
                <span className="text-[11px] font-mono font-bold text-[#10A37F] uppercase tracking-wider">Total Special Offer</span>
                <h4 className="text-lg font-black text-[#000000]">Total: ₹7,999 <span className="text-xs font-normal text-red-500 line-through">₹10,000</span></h4>
                <p className="text-xs text-[rgba(0,0,0,0.60)] leading-relaxed">
                  Limited time offer. Free demo classes available before enrollment. Helpline: <a href="tel:+917204511681" className="font-bold underline text-[#000000]">72045 11681</a> / <a href="tel:+917204184681" className="font-bold underline text-[#000000]">72041 84681</a>.
                </p>
              </div>

            </div>
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
              Share your details and our counselor will reach out with batch timings, fee confirmation (<strong>₹7,500 course fee + ₹499 registration fee</strong>), and demo link.
            </p>
            <ul className="flex flex-col gap-3">
              {["Live interactive demo session", "Personalised career roadmap", "Verified certificate under MSME", "EMI & fee options explained"].map(b => (
                <li key={b} className="flex items-center gap-2.5 text-sm text-[rgba(0,0,0,0.70)]">
                  <span className="w-5 h-5 rounded-full bg-[rgba(49,85,231,0.10)] flex items-center justify-center shrink-0">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 3.5-4" stroke="#3155E7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            {/* Direct contact with both flyer numbers */}
            <div className="flex flex-col gap-2 pt-4 border-t border-[rgba(0,0,0,0.08)]">
              <div className="flex flex-wrap items-center gap-2 text-sm text-[rgba(0,0,0,0.75)]">
                <span>📞 Call / WhatsApp:</span>
                <a href="tel:+917204511681" className="font-bold text-[#000000] hover:text-[#3155E7] transition-colors duration-200">72045 11681</a>
                <span>/</span>
                <a href="tel:+917204184681" className="font-bold text-[#000000] hover:text-[#3155E7] transition-colors duration-200">72041 84681</a>
              </div>
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
