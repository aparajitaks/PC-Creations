/**
 * services.ts
 * ─────────────────────────────────────────────────────────────
 * PC Creations — service catalogue + creative asset mapping.
 *
 * The 18 images in public/images/services are mapped to their
 * corresponding services (1–3 images each), based on what each
 * asset depicts. All 18 remain in use: they power both the
 * service-grid hover sequences and the global floating layer.
 */

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  description: string;
  images: string[];
}

const img = (name: string) => `/images/services/${name}`;

export const SERVICES: ServiceItem[] = [
  {
    id: "smm",
    index: "01",
    title: "Social Media Management",
    description:
      "Always-on content, community and platform management that keeps your brand visible and relevant.",
    images: [
      img("Social media.jpeg"),
      img("Bem vinda ao nosso universo!❤️_🔥.jpeg"),
    ],
  },
  {
    id: "web",
    index: "02",
    title: "Web / App Development",
    description:
      "Performance-first websites, CMS and custom apps built to convert — not just to exist.",
    images: [
      img("Need a Stunning Website_ Build a Powerful Online Presence.jpeg"),
      img("How to Secure a WordPress Website_ 13 Free Steps.jpeg"),
    ],
  },
  {
    id: "content",
    index: "03",
    title: "Content & Production",
    description:
      "Scroll-stopping content engineered for the platforms your audience actually uses.",
    images: [
      img("Visual storytellers ideas of representing them_.jpeg"),
      img("_ (7).jpeg"),
    ],
  },
  {
    id: "influencer",
    index: "04",
    title: "Influencer Marketing",
    description:
      "Creator partnerships that turn trusted voices into measurable, authentic growth.",
    images: [img("_ (1).jpeg"), img("_ (2).jpeg")],
  },
  {
    id: "branding",
    index: "05",
    title: "Branding & Design",
    description:
      "Identity systems and visual languages that make your brand instantly recognisable.",
    images: [img("2026 brand portfolio cover trends.jpeg")],
  },
  {
    id: "google-ads",
    index: "06",
    title: "Google Ads",
    description:
      "High-converting search and display campaigns, optimised week after week.",
    images: [img("_.jpeg")],
  },
  {
    id: "meta-ads",
    index: "07",
    title: "Meta Ads",
    description:
      "Targeted Instagram and Facebook campaigns designed to scale what works.",
    images: [img("_ (4).jpeg")],
  },
  {
    id: "graphic",
    index: "08",
    title: "Graphic Design",
    description:
      "Festival posters, brand creatives and social visuals — always unmistakably you.",
    images: [img("_ (6).jpeg")],
  },
  {
    id: "video",
    index: "09",
    title: "Video & Shoots",
    description:
      "Greenscreen videos, ad shoots and sharp editing that holds attention to the last frame.",
    images: [img("_ (8).jpeg"), img("_ (5).jpeg")],
  },
  {
    id: "seo",
    index: "10",
    title: "SEO",
    description:
      "Search engine optimisation with monthly reporting and rankings that compound.",
    images: [
      img("Best SEO Agency in Doha for Business Growth & Google Rankings.jpeg"),
      img("_Content, Keywords, and Rankings_ The SEO Formula for Success_.jpeg"),
    ],
  },
  {
    id: "hosting",
    index: "11",
    title: "Hosting & Domain",
    description:
      "Domain registration and reliable, lightning-fast hosting — handled for you.",
    images: [img("Domain.jpeg")],
  },
  {
    id: "podcast",
    index: "12",
    title: "Podcast",
    description:
      "Full podcast production and distribution, from first concept to final launch.",
    images: [img("design and photo for a podcast.jpeg")],
  },
];

/**
 * All 18 creative assets in service order — consumed by the
 * global floating creative layer (FloatingImages.tsx).
 */
export const ALL_SERVICE_IMAGES: string[] = SERVICES.flatMap(
  (s) => s.images,
);
