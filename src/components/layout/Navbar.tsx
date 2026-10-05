/**
 * Navbar.tsx
 * ─────────────────────────────────────────────────────────────
 * PC Creations — Floating navigation bar.
 *
 * FEATURES:
 *   - Active section detection via IntersectionObserver
 *   - Route-based highlight for off-page links (Courses)
 *   - Orange underline on active link
 *   - Scrolled → frosted glass background
 *   - Mobile full-screen overlay menu
 *   - Smooth scroll on link click
 *   - GSAP entrance animation on mount
 */

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link    from "next/link";
import { usePathname } from "next/navigation";
import { cn }    from "@/lib/cn";
import { gsap }  from "@/lib/gsap";
import { Button } from "@/components/ui/Button";

interface NavLink {
  label:   string;
  href:    string;
  section: string;
  route?:  boolean; // true = Next.js route, not an anchor
}

/**
 * Order mirrors the home page scroll order.
 *
 * `section` is the id of the element the link scrolls to. "Courses" is the
 * only entry with no section on the home page — it points at the /courses
 * route, so it is highlighted by pathname and never while scrolling.
 */
const NAV_LINKS: NavLink[] = [
  { label: "Home",     href: "/#home",     section: "home"     },
  { label: "Results",  href: "/#results",  section: "results"  },
  { label: "Reviews",  href: "/#reviews",  section: "reviews"  },
  { label: "Services", href: "/#services", section: "services" },
  { label: "Process",  href: "/#process",  section: "process"  },
  { label: "Courses",  href: "/courses",   section: "courses",  route: true },
  { label: "About Us", href: "/#about",    section: "about"    },
  { label: "Contact",  href: "/#contact",  section: "contact"  },
];

/** Home page route — scroll-spy only applies here */
const HOME_PATH = "/";

export function Navbar() {
  const [scrolled,       setScrolled]      = useState(false);
  const [menuOpen,       setMenuOpen]      = useState(false);
  const [activeSection,  setActiveSection] = useState<string>("");
  const headerRef = useRef<HTMLElement>(null);
  const pathname  = usePathname();

  /** In-page link → active while its section is in view (home page only).
   *  Off-page link → active when we're on its route. */
  const isLinkActive = useCallback(
    (link: NavLink) =>
      link.route
        ? pathname === link.href
        : pathname === HOME_PATH && activeSection === link.section,
    [pathname, activeSection],
  );

  // ── GSAP entrance ──
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.3 },
      );
    });
    return () => ctx.revert();
  }, []);

  // ── Scroll detection ──
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 64);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // ── Active section via IntersectionObserver ──
  // Only the home page owns these section ids. Off-page routes (e.g.
  // /courses) highlight their link by pathname instead.
  useEffect(() => {
    if (pathname !== HOME_PATH) return;

    const observers: IntersectionObserver[] = [];

    NAV_LINKS.filter((l) => !l.route).forEach((l) => {
      const el = document.getElementById(l.section);
      if (!el) return;

      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(l.section);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
      );
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach((io) => io.disconnect());
  }, [pathname]);

  // ── Lock body scroll on mobile menu ──
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ── Smooth scroll handler ──
  // The hrefs stay real ("/#results") so deep links, keyboard activation
  // and navigation from other routes keep working. We only take over when
  // the target section exists on this page; `--navbar-offset` scroll
  // padding keeps the fixed navbar clear of the section heading.
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
      const target = document.getElementById(section);
      if (!target) return;
      e.preventDefault();
      setMenuOpen(false);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [],
  );

  return (
    <>
      <header
        id="navbar"
        ref={headerRef}
        role="banner"
        className={cn(
          "fixed top-0 left-0 right-0 z-[200]",
          "transition-all duration-300 ease-out",
          scrolled
            ? "bg-[rgba(247,248,250,0.95)] backdrop-blur-md border-b border-[rgba(0,0,0,0.08)] shadow-sm"
            : "bg-transparent",
        )}
      >
        <div
          className="nav-inner pc-container flex items-center justify-between transition-all duration-300 ease-out"
          style={{ height: scrolled ? "56px" : "70px" }}
        >

          {/* ── Logo ── */}
          <Link
            href="/"
            aria-label="PC Creations — Home"
            className="flex items-center gap-2.5 shrink-0 group"
          >
            <img
              src="/assets/logo-mark.png"
              alt="PC Creations logo"
              width={42}
              height={42}
              className="rounded-full object-cover transition-transform duration-300 group-hover:scale-105 shadow-sm"
              style={{ width: 42, height: 42 }}
            />
            <span className="hidden sm:flex flex-col leading-none">
              <span className="text-[#000000] font-black text-base tracking-[0.04em] uppercase">
                PC Creations
              </span>
              <span className="text-[9px] font-mono font-bold text-[#FF9D00] tracking-[0.12em] uppercase mt-0.5">
                Your Creative Marketing Team
              </span>
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-7">
                      {NAV_LINKS.map((link) => {
              const isActive = isLinkActive(link);
              const sharedClass = cn(
                "relative whitespace-nowrap text-sm font-medium transition-colors duration-200",
                "after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:rounded-full",
                "after:bg-[#FF9D00] after:transition-all after:duration-300",
                isActive
                  ? "text-[#000000] after:w-full"
                  : "text-[rgba(0,0,0,0.55)] hover:text-[#000000] after:w-0 hover:after:w-full",
              );
              if (link.route) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(sharedClass, "flex items-center gap-1.5")}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                    <span className="text-[10px] font-bold bg-[#FF9D00] text-[#000000] px-1.5 py-0.5 rounded-full tracking-wide leading-none">NEW</span>
                  </Link>
                );
              }
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.section)}
                  className={sharedClass}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:flex items-center">
            <Button variant="primary" size="sm" href="#contact">
              Get Started
            </Button>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            id="mobile-menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="lg:hidden flex flex-col gap-[5px] p-2 -mr-2"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={cn("block w-6 h-[1.5px] bg-[#000000] origin-center transition-transform duration-250", menuOpen && "translate-y-[6.5px] rotate-45")} />
            <span className={cn("block w-6 h-[1.5px] bg-[#000000] transition-opacity duration-250",               menuOpen && "opacity-0")} />
            <span className={cn("block w-6 h-[1.5px] bg-[#000000] origin-center transition-transform duration-250", menuOpen && "-translate-y-[6.5px] -rotate-45")} />
          </button>

        </div>
      </header>

      {/* ── Mobile menu overlay ── */}
      <div
        id="mobile-menu"
        aria-label="Mobile navigation"
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed inset-0 z-[190] bg-[#F7F8FA] flex flex-col",
          "transition-all duration-350 ease-out",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <div className="pt-[76px] pb-8 max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col flex-1 justify-center gap-7 overflow-y-auto">
          <nav className="flex flex-col gap-4">
                        {NAV_LINKS.map((link, i) => {
              const isActive = isLinkActive(link);
              const sharedClass = cn(
                "text-3xl sm:text-4xl font-bold tracking-tight transition-all duration-300 ease-out flex items-center gap-3",
                menuOpen ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0",
                isActive ? "text-[#FF9D00]" : "text-[#000000] hover:text-[#FF9D00]",
              );
              if (link.route) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
                    className={sharedClass}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                    <span className="text-sm font-bold bg-[#FF9D00] text-[#000000] px-2 py-1 rounded-full">NEW</span>
                  </Link>
                );
              }
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.section)}
                  style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
                  className={sharedClass}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#FF9D00] shrink-0" aria-hidden="true" />
                  )}
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="h-px bg-[rgba(0,0,0,0.08)]" />

          <Button
            variant="primary"
            size="lg"
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="w-full"
          >
            Get Started
          </Button>
        </div>
      </div>
    </>
  );
}
