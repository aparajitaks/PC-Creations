/**
 * ResultsGallery.tsx
 * ─────────────────────────────────────────────────────────────
 * PC Creations — Results Gallery (Creagenix Media Style).
 *
 * Requirements:
 * - Two buttons: Content Result and Add Result
 * - Display all results with actual data (handles, categories, stats)
 * - No lightbox, no click-to-view functionality
 * - Featured top result + grid layout
 */

"use client";

import React, { useState } from "react";

type Tab = "content" | "ads";

interface ResultItem {
  image: string;
  handle: string;
  name: string;
  category: string;
  statValue: string;
  statLabel: string;
  description: string;
  followersValue: number;
  posts?: string;
  following?: string;
}

const CONTENT_RESULTS: ResultItem[] = [
  {
    image: "/assets/screenshot-2.png",
    handle: "@thefitnessgonewild",
    name: "Thefitnessgonewild",
    category: "LOCAL & TRAVEL · BANGALORE",
    statValue: "9,036",
    statLabel: "followers",
    followersValue: 9036,
    posts: "1,202",
    following: "246",
    description: "Corporate retreats & student trips, fixed departures, treks and getaways.",
  },
  {
    image: "/assets/content-ss-1.png",
    handle: "@sri_tourist",
    name: "Sri Tourist",
    category: "TRAVEL & DEVOTIONAL",
    statValue: "4,105",
    statLabel: "followers",
    followersValue: 4105,
    posts: "188",
    following: "178",
    description: "Pilgrimage and devotional travel operator with high-engagement social storytelling across South India.",
  },
  {
    image: "/assets/content-ss-3.png",
    handle: "@dreams2heaventourstravels",
    name: "Dreams 2 Heaven Tours & Travels",
    category: "TOURS & HOLIDAY PACKAGES",
    statValue: "2,204",
    statLabel: "followers",
    followersValue: 2204,
    posts: "376",
    following: "7",
    description: "Custom domestic and international leisure itineraries with proven organic community growth.",
  },
  {
    image: "/assets/content-ss-2.png",
    handle: "@basilwoods_juniors_haralur",
    name: "Basilwoods Preschool and Daycare",
    category: "EDUCATION & PRESCHOOL",
    statValue: "384",
    statLabel: "followers",
    followersValue: 384,
    posts: "222",
    following: "11",
    description: "Preschool community brand building and admissions content marketing in Haralur, Bangalore.",
  },
  {
    image: "/assets/content-ss-4.png",
    handle: "@prana_yoga_01",
    name: "Prana Yoga | Wellness | Mindfulness studio",
    category: "WELLNESS & FITNESS",
    statValue: "166",
    statLabel: "followers",
    followersValue: 166,
    posts: "4",
    following: "1",
    description: "Holistic wellness and yoga studio brand presence built with focused local targeting.",
  },
  {
    image: "/assets/content-ss-5.png",
    handle: "@cutiblesshairclinic",
    name: "Cutibless Hair Transplant | Bangalore",
    category: "HEALTHCARE & AESTHETICS",
    statValue: "5,169",
    statLabel: "followers",
    followersValue: 5169,
    posts: "129",
    following: "0",
    description: "A verified aesthetic authority built from the ground up — proof that strategic content and targeted creative production drive real, high-value client consultations.",
  },
  {
    image: "/assets/screenshot-1.png",
    handle: "@bwisbangalore",
    name: "Basil Woods International",
    category: "EDUCATION",
    statValue: "6,856",
    statLabel: "followers",
    followersValue: 6856,
    posts: "327",
    following: "7",
    description: "Cambridge Pathway School from EYP to A Level in Gunjur, East Bangalore.",
  },
  {
    image: "/assets/screenshot-3.png",
    handle: "@shilpab",
    name: "Shilpa B",
    category: "FOOD & BEVERAGE / BEAUTY & MAKEUP",
    statValue: "45.4K",
    statLabel: "followers",
    followersValue: 45400,
    posts: "2,019",
    following: "269",
    description: "ISO 9001:2015 International Certified Professional MUA & Hair stylist Salon.",
  },
  {
    image: "/assets/screenshot-4.png",
    handle: "@paramadventures",
    name: "Param Adventures",
    category: "TECHNOLOGY",
    statValue: "1,326",
    statLabel: "followers",
    followersValue: 1326,
    posts: "181",
    following: "168",
    description: "Adventure and technology content creator with growing community.",
  },
];

const AD_RESULTS: ResultItem[] = [
  {
    image: "/assets/ad-suvega.png",
    handle: "Suvega Infra",
    name: "Suvega Infra",
    category: "REAL ESTATE & INFRASTRUCTURE",
    statValue: "₹1Cr+",
    statLabel: "revenue generated",
    followersValue: 1000000,
    description: "Verified ₹1 Crore+ revenue outcome generated from a single high-performance Meta Ads campaign.",
  },
  {
    image: "/assets/ad-sri-tourist.png",
    handle: "Sri Tourist",
    name: "Sri Tourist",
    category: "TRAVEL & PILGRIMAGE CAMPAIGNS",
    statValue: "1,446",
    statLabel: "conversations",
    followersValue: 1446,
    description: "19 active Meta Ads campaigns scaling pilgrimage bookings with High-Performing status.",
  },
  {
    image: "/assets/ad-cutibless.png",
    handle: "Cutibless Hair Clinic",
    name: "Cutibless Hair Clinic",
    category: "HEALTHCARE & AESTHETICS",
    statValue: "100/100",
    statLabel: "opportunity score",
    followersValue: 100,
    description: "79 scalable campaigns running simultaneously with a perfect Meta Opportunity Score.",
  },
  {
    image: "/assets/ad-spacexpress.png",
    handle: "SpaceXpress Ventures",
    name: "SpaceXpress Ventures",
    category: "BUSINESS SERVICES & SCALING",
    statValue: "116,584",
    statLabel: "awareness reach",
    followersValue: 116584,
    description: "Dual-layer campaign architecture combining massive awareness with direct messaging conversions.",
  },
];

export function ResultsGallery() {
  const [activeTab, setActiveTab] = useState<Tab>("content");

  const results = activeTab === "content" ? CONTENT_RESULTS : AD_RESULTS;

  // Sort by follower count (highest first)
  const sortedResults = [...results].sort((a, b) => b.followersValue - a.followersValue);

  // Top result is the highest follower account
  const featuredResult = sortedResults[0];
  const gridResults = sortedResults.slice(1);

  return (
    <div className="relative">
      {/* ── Section Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
        <div>
          <p className="text-[11px] font-mono font-bold text-[#FF9D00] tracking-widest uppercase mb-3">
            Real Results
          </p>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#000000] tracking-tight leading-tight">
            Brands We&apos;ve Built
          </h3>
          <p className="mt-3 text-sm sm:text-base text-[rgba(0,0,0,0.55)] max-w-lg leading-relaxed">
            Real accounts. Real followers. Real authority — built through strategy,
            not luck.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab("content")}
            className={`px-6 py-3 text-xs sm:text-sm font-bold tracking-wider uppercase rounded-full transition-all duration-300 cursor-pointer ${
              activeTab === "content"
                ? "bg-[#FF9D00] text-black shadow-lg shadow-[#FF9D00]/25"
                : "bg-white text-[rgba(0,0,0,0.60)] border border-[rgba(0,0,0,0.14)] hover:border-[#FF9D00]/50"
            }`}
          >
            Content Result
          </button>
          <button
            onClick={() => setActiveTab("ads")}
            className={`px-6 py-3 text-xs sm:text-sm font-bold tracking-wider uppercase rounded-full transition-all duration-300 cursor-pointer ${
              activeTab === "ads"
                ? "bg-[#FF9D00] text-black shadow-lg shadow-[#FF9D00]/25"
                : "bg-white text-[rgba(0,0,0,0.60)] border border-[rgba(0,0,0,0.14)] hover:border-[#FF9D00]/50"
            }`}
          >
            Add Result
          </button>
        </div>
      </div>

      {/* ── Featured Large Card (Creagenix Style) ── */}
      {featuredResult && (
        <div
          className={`rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl mb-10 ${
            activeTab === "ads"
              ? "bg-[#0F0F12] border border-[#FF9D00]/40"
              : "bg-white border border-[rgba(0,0,0,0.08)]"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
            {/* Info Side */}
            <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase mb-5 ${
                  activeTab === "ads"
                    ? "bg-[#FF9D00]/15 border border-[#FF9D00]/40 text-[#FF9D00]"
                    : "bg-[#FF9D00] text-black"
                }`}
              >
                ★ Top Result
              </div>
              <h4
                className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-2 ${
                  activeTab === "ads" ? "text-white" : "text-[#000000]"
                }`}
              >
                {featuredResult.name}
              </h4>
              <p
                className={`text-[11px] font-mono font-bold tracking-widest uppercase mb-6 ${
                  activeTab === "ads" ? "text-[#FF9D00]" : "text-[#FF9D00]"
                }`}
              >
                {featuredResult.category}
              </p>
              <div className="flex items-baseline gap-3 mb-6">
                <span
                  className={`text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none ${
                    activeTab === "ads" ? "text-[#FF9D00]" : "text-[#FF9D00]"
                  }`}
                >
                  {featuredResult.statValue}
                </span>
                <span
                  className={`text-lg sm:text-xl font-semibold pb-1 ${
                    activeTab === "ads"
                      ? "text-[rgba(255,255,255,0.7)]"
                      : "text-[rgba(0,0,0,0.7)]"
                  }`}
                >
                  {featuredResult.statLabel}
                </span>
              </div>

              {/* Posts and Following for Top Result */}
              {featuredResult.posts && featuredResult.following && (
                <div className="flex items-center gap-4 mb-6">
                  <div>
                    <span
                      className={`text-sm font-bold ${
                        activeTab === "ads" ? "text-white" : "text-[#000000]"
                      }`}
                    >
                      {featuredResult.posts}
                    </span>
                    <span
                      className={`text-xs ml-1 ${
                        activeTab === "ads"
                          ? "text-[rgba(255,255,255,0.60)]"
                          : "text-[rgba(0,0,0,0.60)]"
                      }`}
                    >
                      posts
                    </span>
                  </div>
                  <div>
                    <span
                      className={`text-sm font-bold ${
                        activeTab === "ads" ? "text-white" : "text-[#000000]"
                      }`}
                    >
                      {featuredResult.following}
                    </span>
                    <span
                      className={`text-xs ml-1 ${
                        activeTab === "ads"
                          ? "text-[rgba(255,255,255,0.60)]"
                          : "text-[rgba(0,0,0,0.60)]"
                      }`}
                    >
                      following
                    </span>
                  </div>
                </div>
              )}
              <p
                className={`text-sm sm:text-base leading-relaxed max-w-md ${
                  activeTab === "ads"
                    ? "text-[rgba(255,255,255,0.65)]"
                    : "text-[rgba(0,0,0,0.65)]"
                }`}
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {featuredResult.description}
              </p>
            </div>

            {/* Image Side */}
            <div
              className={`flex items-center justify-center p-6 sm:p-8 lg:p-10 ${
                activeTab === "ads"
                  ? "bg-[#070709]"
                  : "bg-[#F7F8FA]"
              }`}
            >
              <div
                className={`w-full rounded-xl overflow-hidden flex items-center justify-center ${
                  activeTab === "ads"
                    ? "bg-black border border-[rgba(255,255,255,0.1)]"
                    : "bg-white border border-[rgba(0,0,0,0.08)]"
                }`}
                style={{ aspectRatio: "16 / 9" }}
              >
                <img
                  src={featuredResult.image}
                  alt={featuredResult.name}
                  className="w-full h-full object-contain"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Grid of Smaller Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gridResults.map((result, index) => {
          const isLowFollower = result.followersValue < 500;

          return (
            <div
              key={index}
              className={`rounded-2xl overflow-hidden shadow-lg flex flex-col h-full ${
                activeTab === "ads"
                  ? "bg-[#0F0F12] border border-[rgba(255,255,255,0.10)]"
                  : "bg-white border border-[rgba(0,0,0,0.08)]"
              }`}
            >
              {/* Screenshot Container - Fixed Height */}
              <div
                className={`p-4 ${
                  activeTab === "ads"
                    ? "bg-[#070709]"
                    : "bg-[#F7F8FA]"
                }`}
              >
                <div
                  className={`rounded-xl overflow-hidden flex items-center justify-center ${
                    activeTab === "ads"
                      ? "bg-black border border-[rgba(255,255,255,0.1)]"
                      : "bg-white border border-[rgba(0,0,0,0.08)]"
                  }`}
                  style={{ aspectRatio: "16 / 9" }}
                >
                  <img
                    src={result.image}
                    alt={result.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex flex-col flex-1">
                {isLowFollower ? (
                  // Simplified card for <500 followers - Image + Username only
                  <h5
                    className={`text-lg sm:text-xl font-black tracking-tight ${
                      activeTab === "ads" ? "text-white" : "text-[#000000]"
                    }`}
                  >
                    {result.handle}
                  </h5>
                ) : (
                  // Normal card for 500+ followers
                  <>
                    {/* Category */}
                    <p
                      className={`text-[11px] font-mono font-bold tracking-widest uppercase mb-2 ${
                        activeTab === "ads"
                          ? "text-[rgba(255,255,255,0.45)]"
                          : "text-[rgba(0,0,0,0.45)]"
                      }`}
                    >
                      {result.category}
                    </p>

                    {/* Instagram Username - Max 2 lines */}
                    <h5
                      className={`text-lg sm:text-xl font-black tracking-tight mb-2 ${
                        activeTab === "ads" ? "text-white" : "text-[#000000]"
                      }`}
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {result.handle}
                    </h5>

                    {/* Follower Count */}
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-2xl sm:text-3xl font-black text-[#FF9D00]">
                        {result.statValue}
                      </span>
                      <span
                        className={`text-xs sm:text-sm font-semibold ${
                          activeTab === "ads"
                            ? "text-[rgba(255,255,255,0.60)]"
                            : "text-[rgba(0,0,0,0.60)]"
                        }`}
                      >
                        {result.statLabel}
                      </span>
                    </div>

                    {/* Description - Max 2 lines */}
                    <p
                      className={`text-xs sm:text-sm leading-relaxed flex-1 ${
                        activeTab === "ads"
                          ? "text-[rgba(255,255,255,0.60)]"
                          : "text-[rgba(0,0,0,0.60)]"
                      }`}
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {result.description}
                    </p>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Footer note ── */}
      <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[rgba(0,0,0,0.45)] font-mono gap-2">
        <p>
          Showing {results.length} results · All screenshots are from live dashboards
        </p>
      </div>
    </div>
  );
}
