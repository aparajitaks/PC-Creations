/**
 * portfolioData.ts
 * ─────────────────────────────────────────────────────────────
 * SOURCE OF TRUTH — PC Creations verified projects.
 * All metrics come directly from supplied campaign screenshots.
 * No values are invented.
 */

export interface ProjectStat {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  index: string;          // "01", "02" …
  title: string;          // Short display title
  client: string;
  category: string;
  platform: string;
  description: string;
  services: string[];
  image: string;          // Primary result screenshot
  profileImage?: string;  // Social profile screenshot (optional)
  stats: ProjectStat[];
}

export const projects: Project[] = [
  {
    id: "sri-tourist",
    index: "01",
    title: "Sri Tourist",
    client: "Sri Tourist",
    category: "Travel & Devotional",
    platform: "Meta Ads",
    description:
      "Meta Ads campaign management for a devotional and leisure travel operator. Multiple active campaigns running across pilgrimage destinations including Tirupati, Mysore to Mantralaya, and Bangalore to Mantralaya — one campaign marked High Performing.",
    services: ["Meta Ads Management", "Social Media Management", "Messaging Campaigns"],
    image: "/assets/Sri tourist mata ads result.png",
    profileImage: "/assets/content-ss-1.png",
    // All values from Sri tourist mata ads result.png + content-ss-1.png
    stats: [
      { value: "1,446",  label: "Conversations — Bangalore to Mantralaya" },
      { value: "880",    label: "Conversations — Tirupati (High Performing)" },
      { value: "19",     label: "Total Campaigns" },
      { value: "4,105",  label: "Instagram Followers" },
    ],
  },
  {
    id: "cutibless",
    index: "02",
    title: "Cutibless Hair Clinic",
    client: "Cutibless Hair Transplant",
    category: "Healthcare & Aesthetics",
    platform: "Meta Ads",
    description:
      "Full-funnel Meta Ads management for a premium hair transplant and cosmetic surgery clinic in Bangalore. 79 campaigns spanning hair loss, liposuction, mommy makeover, and awareness.",
    services: ["Meta Ads Management", "Lead Generation", "Multi-Campaign Strategy"],
    image: "/assets/cutibless meta ads.png",
    profileImage: "/assets/content-ss-5.png",
    // From cutibless meta ads.png + content-ss-5.png
    stats: [
      { value: "79",      label: "Campaigns Managed" },
      { value: "100/100", label: "Meta Opportunity Score" },
      { value: "5,169",   label: "Instagram Followers" },
    ],
  },
  {
    id: "suvega",
    index: "03",
    title: "Suvega Infra",
    client: "Suvega Infra",
    category: "Real Estate & Infrastructure",
    platform: "Meta Ads",
    description:
      "High-performance Meta Ads campaign for a real estate infrastructure brand. The campaign's revenue outcome is stated in the original PC Creations project file supplied for this case study.",
    services: ["Meta Ads Management", "Lead Generation", "Performance Marketing"],
    image: "/assets/suvega meta ads result  revenue made 1cr+ in one singal campin.png",
    // From filename supplied by PC Creations + screenshot data
    stats: [
      { value: "₹1Cr+",  label: "Revenue — Single Campaign (per PC Creations files)" },
      { value: "43",     label: "Messaging Conversations" },
      { value: "₹78.83", label: "Cost per Conversation" },
    ],
  },
  {
    id: "spacexpress",
    index: "04",
    title: "SpaceXpress Ventures",
    client: "SpaceXpress Ventures",
    category: "Business Services",
    platform: "Meta Ads",
    description:
      "Ongoing Meta Ads management combining large-scale awareness campaigns with direct messaging conversion for a growing ventures brand. Opportunity score of 92 across active campaigns.",
    services: ["Meta Ads Management", "Awareness Campaigns", "Messaging Campaigns"],
    image: "/assets/spacexpress 2nd campin still thy are geting result.png",
    // From spacexpress screenshot
    stats: [
      { value: "116,584", label: "Awareness Reach" },
      { value: "178",     label: "Messaging Conversations" },
      { value: "92/100",  label: "Meta Opportunity Score" },
    ],
  },
];

/** Instagram-managed client profiles */
export interface SocialClient {
  id: string;
  handle: string;
  name: string;
  category: string;
  followers: string;
  posts: string;
  profileImage: string;
}

export const socialClients: SocialClient[] = [
  {
    id: "sri-tourist-social",
    handle: "sri_tourist",
    name: "Sri Tourist",
    category: "Travel",
    followers: "4,105",
    posts: "188",
    profileImage: "/assets/content-ss-1.png",
  },
  {
    id: "dreams2heaven",
    handle: "dreams2heaventourstravels",
    name: "Dreams 2 Heaven Tours & Travels",
    category: "Travel",
    followers: "2,204",
    posts: "376",
    profileImage: "/assets/content-ss-3.png",
  },
  {
    id: "cutibless-social",
    handle: "cutiblesshairclinic",
    name: "Cutibless Hair Clinic",
    category: "Healthcare",
    followers: "5,169",
    posts: "129",
    profileImage: "/assets/content-ss-5.png",
  },
  {
    id: "basilwoods",
    handle: "basilwoods_juniors_haralur",
    name: "Basilwoods Preschool & Daycare",
    category: "Education",
    followers: "384",
    posts: "222",
    profileImage: "/assets/content-ss-2.png",
  },
  {
    id: "prana-yoga",
    handle: "prana_yoga_01",
    name: "Prana Yoga Studio",
    category: "Wellness",
    followers: "166",
    posts: "4",
    profileImage: "/assets/content-ss-4.png",
  },
];

export const videos = [
  {
    id: "client-1",
    src:    "/assets/client-testimonial.mp4",
    poster: "/assets/testimonial-video-poster.jpg",
    label:  "Client Video",
  },
  {
    id: "sample-1",
    src:    "/assets/sample-testimonial.mp4",
    poster: "/assets/testimonial-video-poster.jpg",
    label:  "Campaign Showcase",
  },
  {
    id: "reel-1",
    src:    "/assets/My Movie 3 (online-video-cutter.com).mp4",
    poster: "/assets/testimonial-video-poster.jpg",
    label:  "PC Creations Reel",
  },
];
