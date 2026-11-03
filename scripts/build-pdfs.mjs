import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

async function buildAllPdfs() {
  console.log('Starting Master PDF Generation for PC Creations...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--allow-running-insecure-content',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1440,
    height: 960,
    deviceScaleFactor: 2,
  });

  console.log('Loading website at http://localhost:3000...');
  await page.goto('http://localhost:3000', {
    waitUntil: 'networkidle0',
    timeout: 60000,
  });

  // Smooth scroll to trigger all IntersectionObservers, lazy images and canvases
  console.log('Triggering all scroll triggers and assets...');
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight + 1000) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 50);
    });
  });

  await new Promise((r) => setTimeout(r, 2500));

  // Prepare DOM elements
  await page.evaluate(() => {
    // 1. Reveal all hidden elements
    const selectors = [
      '.reveal-up', '.reveal-fade', '.reveal-scale', '.reveal-left', '.reveal-right', '.reveal-clip',
      '.gsap-hidden', '[data-stagger-child]', '.location-info', '.location-map', '.location-map-button',
      '.pricing-header', '.pricing-card', '.svc-cta-graphic', '.about-headline .line', '.about-body',
      '.about-pill', '.about-image-wrap', '.process-step', '.process-header'
    ];
    document.querySelectorAll(selectors.join(',')).forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.clipPath = 'none';
      el.style.visibility = 'visible';
    });

    document.querySelectorAll('.h-entrance, .h-bubble, .h-emoji, .h-graph').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.clipPath = 'none';
    });

    // 2. Hide floating widgets and decorative spacers
    document.querySelectorAll('a[aria-label="Call PC Creations"], a[aria-label="Chat with PC Creations on WhatsApp"]').forEach((el) => {
      el.style.display = 'none';
    });

    // Hide theme transitions and section dividers
    document.querySelectorAll('main > div[aria-hidden="true"]').forEach((el) => {
      el.style.display = 'none';
    });

    // Hide background floating elements in results and camera layers that cause ghost pages
    document.querySelectorAll('#results > div.pointer-events-none, #services > div.overflow-hidden').forEach((el) => {
      el.style.display = 'none';
    });

    // 3. Navbar: clean static header on page 1
    const nav = document.getElementById('navbar');
    if (nav) {
      nav.style.position = 'absolute';
      nav.style.top = '0';
      nav.style.left = '0';
      nav.style.right = '0';
      nav.style.background = 'transparent';
      nav.style.boxShadow = 'none';
      nav.style.borderBottom = '1px solid rgba(0,0,0,0.06)';
    }
  });

  // ─────────────────────────────────────────────────────────────
  // 1. BUILD CONTINUOUS FULL-PAGE PDF (Zero Cuts, 100% exact canvas)
  // ─────────────────────────────────────────────────────────────
  console.log('Generating 1. Continuous Full-Length PDF...');
  await page.evaluate(() => {
    const hero = document.getElementById('home');
    if (hero) {
      hero.style.height = '900px';
      hero.style.minHeight = '900px';
      hero.style.maxHeight = '900px';
    }
  });

  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const continuousPath = path.resolve('/Users/veritan/Work/agency-site/PC-Creations-Website-Continuous.pdf');
  await page.pdf({
    path: continuousPath,
    width: '1440px',
    height: `${scrollHeight}px`,
    printBackground: true,
    pageRanges: '1',
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  console.log(`✓ Continuous PDF saved to ${continuousPath}`);

  // ─────────────────────────────────────────────────────────────
  // 2. BUILD PRESENTATION MULTI-PAGE PDF (Paginated Executive Deck)
  // ─────────────────────────────────────────────────────────────
  console.log('Generating 2. Paginated Presentation PDF...');
  await page.evaluate(() => {
    const style = document.createElement('style');
    style.id = 'deck-styles';
    style.textContent = `
      @page {
        size: 1440px 960px;
        margin: 0;
      }
      *, *::before, *::after {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      body {
        background-color: #F7F8FA !important;
      }

      /* ── SLIDE 1: HERO ── */
      #home {
        height: 960px !important;
        min-height: 960px !important;
        max-height: 960px !important;
        padding-top: 70px !important;
        box-sizing: border-box !important;
        page-break-after: always !important;
        break-after: page !important;
        overflow: hidden !important;
      }

      /* ── RESULTS SECTION ── */
      #results {
        padding-top: 3.5rem !important;
        padding-bottom: 2rem !important;
        page-break-before: always !important;
        break-before: page !important;
      }
      #results > div > div.rounded-2xl:nth-of-type(2),
      #results > div > div.rounded-3xl:nth-of-type(2) {
        page-break-before: always !important;
        break-before: page !important;
        margin-top: 2rem !important;
      }
      #results .grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3 {
        page-break-before: always !important;
        break-before: page !important;
        padding-top: 3.5rem !important;
        gap: 1.25rem !important;
      }
      #results .grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3 > div {
        break-inside: avoid !important;
      }
      #results .mt-10 {
        margin-top: 1rem !important;
      }

      /* ── REVIEWS SECTION ── */
      #reviews {
        padding-top: 3.5rem !important;
        padding-bottom: 2.5rem !important;
        page-break-before: always !important;
        break-before: page !important;
      }
      #reviews .w-full.max-w-\\[340px\\],
      #reviews .w-full.max-w-\\[360px\\] {
        max-width: 260px !important;
        max-height: 460px !important;
      }
      #reviews .reveal-scale.float-idle-3 {
        margin-bottom: 0 !important;
      }
      #reviews .grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 {
        page-break-before: always !important;
        break-before: page !important;
        padding-top: 3.5rem !important;
        gap: 1.25rem !important;
      }
      #reviews .grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 > div {
        break-inside: avoid !important;
      }
      #reviews .mt-28 {
        margin-top: 2rem !important;
        padding-top: 1.5rem !important;
        break-inside: avoid !important;
      }

      /* ── SERVICES SECTION ── */
      #services {
        padding-top: 3.5rem !important;
        padding-bottom: 2rem !important;
        page-break-before: always !important;
        break-before: page !important;
      }
      #services .svc-hero {
        margin-bottom: 2.5rem !important;
      }
      #services .svc-grid {
        gap: 1.5rem !important;
      }
      #services .svc-grid > :nth-child(6) {
        page-break-after: always !important;
        break-after: page !important;
      }
      #services .svc-grid > :nth-child(7) {
        margin-top: 3.5rem !important;
      }
      #services .svc-cta {
        break-inside: avoid !important;
      }

      /* ── PRICING SECTION ── */
      #pricing {
        padding-top: 3.5rem !important;
        padding-bottom: 2.5rem !important;
        height: 960px !important;
        min-height: 960px !important;
        max-height: 960px !important;
        box-sizing: border-box !important;
        page-break-before: always !important;
        break-before: page !important;
        overflow: hidden !important;
      }
      #pricing .pricing-header {
        margin-bottom: 2rem !important;
      }
      #pricing .pricing-card {
        padding: 1.75rem !important;
      }
      #pricing .pricing-card ul {
        padding-top: 0.75rem !important;
        padding-bottom: 0.75rem !important;
        gap: 0.35rem !important;
      }
      #pricing p.mt-12 {
        margin-top: 1rem !important;
      }

      /* ── PROCESS SECTION ── */
      #process {
        padding-top: 3.5rem !important;
        padding-bottom: 2.5rem !important;
        height: 960px !important;
        min-height: 960px !important;
        max-height: 960px !important;
        box-sizing: border-box !important;
        page-break-before: always !important;
        break-before: page !important;
        overflow: hidden !important;
      }
      #process .relative.w-full.max-w-6xl {
        transform: scale(0.85);
        transform-origin: top center;
        margin-top: -1rem;
      }

      /* ── ABOUT SECTION ── */
      #about {
        padding-top: 4.5rem !important;
        padding-bottom: 4rem !important;
        height: 960px !important;
        min-height: 960px !important;
        max-height: 960px !important;
        box-sizing: border-box !important;
        page-break-before: always !important;
        break-before: page !important;
        overflow: hidden !important;
      }

      /* ── CONTACT SECTION ── */
      #contact {
        padding-top: 4.5rem !important;
        padding-bottom: 4rem !important;
        height: 960px !important;
        min-height: 960px !important;
        max-height: 960px !important;
        box-sizing: border-box !important;
        page-break-before: always !important;
        break-before: page !important;
        overflow: hidden !important;
      }

      /* ── LOCATION + FOOTER SECTION ── */
      #location {
        padding-top: 3.5rem !important;
        padding-bottom: 2rem !important;
        page-break-before: always !important;
        break-before: page !important;
      }
      footer#footer {
        padding-top: 2.5rem !important;
        padding-bottom: 2.5rem !important;
        break-inside: avoid !important;
      }

      /* Avoid item cutoffs */
      .pricing-card,
      .svc-block,
      .svc-cta,
      .location-info,
      .location-map,
      .about-image-wrap,
      article {
        break-inside: avoid !important;
        page-break-inside: avoid !important;
      }
    `;
    document.head.appendChild(style);
  });

  const presentationPath = path.resolve('/Users/veritan/Work/agency-site/PC-Creations-Website.pdf');
  await page.pdf({
    path: presentationPath,
    width: '1440px',
    height: '960px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  console.log(`✓ Presentation PDF saved to ${presentationPath}`);

  // ─────────────────────────────────────────────────────────────
  // 3. BUILD STANDARD A4 LANDSCAPE PDF (Printable Paper Document)
  // ─────────────────────────────────────────────────────────────
  console.log('Generating 3. Standard A4 Landscape Printable PDF...');
  const a4Path = path.resolve('/Users/veritan/Work/agency-site/PC-Creations-Website-A4.pdf');
  await page.pdf({
    path: a4Path,
    format: 'A4',
    landscape: true,
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  console.log(`✓ A4 Landscape PDF saved to ${a4Path}`);

  await browser.close();
  console.log('All PDF files generated successfully!');
}

buildAllPdfs().catch((err) => {
  console.error('Build error:', err);
  process.exit(1);
});
