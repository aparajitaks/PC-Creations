/**
 * FloatingButtons.tsx
 * ─────────────────────────────────────────────────────────────
 * PC Creations — Floating WhatsApp and Call buttons.
 */

"use client";

import React from "react";

export function FloatingButtons() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917204511681";
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || "07204511681";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi PC Creations, I would like to discuss a project with you."
  )}`;

  const telUrl = `tel:${phoneNumber}`;

  return (
    <>
      {/* Floating Call Button - LEFT */}
      <a
        href={telUrl}
        aria-label="Call PC Creations"
        className="fixed left-6 bottom-24 sm:left-6 sm:bottom-24 lg:left-6 lg:bottom-24 w-14 h-14 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-[#FF9D00] shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 z-50"
        style={{
          boxShadow: "0 4px 20px rgba(255, 157, 0, 0.4)",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>

      {/* Floating WhatsApp Button - RIGHT */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with PC Creations on WhatsApp"
        className="fixed right-6 bottom-24 sm:right-6 sm:bottom-24 lg:right-6 lg:bottom-24 w-14 h-14 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-[#25D366] shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 z-50"
        style={{
          boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
        }}
      >
        <img
          src="/assets/whatsapp-logo.png"
          alt="WhatsApp"
          width="28"
          height="28"
          className="w-7 h-7 sm:w-8 sm:h-8"
        />
      </a>
    </>
  );
}
