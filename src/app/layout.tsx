import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { FilmStripBackground } from "@/components/layout/FilmStripBackground";
import { ScrollAnimations } from "@/components/layout/ScrollAnimations";
import "./globals.css";

/* ── Fonts ── */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

/* ── Metadata ── */
export const metadata: Metadata = {
  title: {
    default: "PC Creations — Digital Marketing Agency",
    template: "%s | PC Creations",
  },
  description:
    "PC Creations is a premium digital marketing agency driving measurable growth through strategy, creativity, and technology.",
  robots: { index: true, follow: true },
  icons: {
    icon:     "/favicon.ico",
    shortcut: "/favicon.ico",
    apple:    "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F8FA",
};

/* ── Root Layout ── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <FilmStripBackground />
        <ScrollAnimations />
        {children}
      </body>
    </html>
  );
}
