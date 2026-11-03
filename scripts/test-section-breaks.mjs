import puppeteer from 'puppeteer-core';
import path from 'path';

async function testSectionBreaks() {
  console.log('Testing section-based clean PDF generation...');
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
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
    height: 900,
    deviceScaleFactor: 2,
  });

  await page.goto('http://localhost:3000', {
    waitUntil: 'networkidle0',
    timeout: 60000,
  });

  // Scroll through page to trigger all IntersectionObservers & lazy images
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
      }, 60);
    });
  });

  await new Promise((r) => setTimeout(r, 2500));

  await page.evaluate(() => {
    // 1. Reveal all hidden elements from GSAP and reveal classes
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

    // 2. Hide floating buttons
    document.querySelectorAll('a[aria-label="Call PC Creations"], a[aria-label="Chat with PC Creations on WhatsApp"]').forEach((el) => {
      el.style.display = 'none';
    });

    // 3. Navbar absolute at top of page 1
    const nav = document.getElementById('navbar');
    if (nav) {
      nav.style.position = 'absolute';
      nav.style.top = '0';
      nav.style.left = '0';
      nav.style.right = '0';
      nav.style.background = 'transparent';
      nav.style.boxShadow = 'none';
    }

    // 4. Inject high quality print CSS
    const style = document.createElement('style');
    style.textContent = `
      @page {
        size: 1440px 960px;
        margin: 0;
      }
      body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        background-color: #F7F8FA !important;
      }

      /* Clean section boundaries */
      #home {
        height: 960px !important;
        min-height: 960px !important;
        max-height: 960px !important;
        padding-top: 70px !important;
        box-sizing: border-box !important;
        page-break-after: always !important;
        break-after: page !important;
      }

      #results,
      #reviews,
      #services,
      #pricing,
      #process,
      #about,
      #contact,
      #location {
        page-break-before: always !important;
        break-before: page !important;
      }

      /* Compact padding for sections so they fit naturally on their pages */
      #results {
        padding-top: 3.5rem !important;
        padding-bottom: 3.5rem !important;
      }
      #reviews {
        padding-top: 3.5rem !important;
        padding-bottom: 3.5rem !important;
      }
      #services {
        padding-top: 3.5rem !important;
        padding-bottom: 3.5rem !important;
      }
      #pricing {
        padding-top: 4rem !important;
        padding-bottom: 4rem !important;
        min-height: 960px !important;
        box-sizing: border-box !important;
      }
      #process {
        padding-top: 3.5rem !important;
        padding-bottom: 3.5rem !important;
      }
      #about {
        padding-top: 4rem !important;
        padding-bottom: 4rem !important;
        min-height: 960px !important;
        box-sizing: border-box !important;
      }
      #contact {
        padding-top: 4rem !important;
        padding-bottom: 4rem !important;
        min-height: 960px !important;
        box-sizing: border-box !important;
      }
      #location {
        padding-top: 3.5rem !important;
        padding-bottom: 3.5rem !important;
      }

      /* Prevent break inside cards and content blocks */
      .pricing-card,
      .svc-block,
      .svc-cta,
      .process-step,
      [data-stagger-child],
      .location-info,
      .location-map,
      .about-image-wrap,
      .pricing-grid,
      .svc-hero,
      article,
      figure,
      img,
      svg,
      video {
        break-inside: avoid !important;
        page-break-inside: avoid !important;
      }

      h1, h2, h3, h4, h5, h6,
      .pricing-header {
        break-after: avoid !important;
        page-break-after: avoid !important;
      }

      /* Remove floating camera/lottie from interrupting print flow */
      .pointer-events-none {
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);
  });

  const outputPath = path.resolve('/Users/veritan/Work/agency-site/PC-Creations-Website.pdf');
  await page.pdf({
    path: outputPath,
    width: '1440px',
    height: '960px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  console.log(`Generated cleanly to ${outputPath}`);
  await browser.close();
}

testSectionBreaks().catch(console.error);
