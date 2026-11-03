import puppeteer from 'puppeteer-core';
import path from 'path';

async function testLandscape() {
  console.log('Testing Landscape / Presentation PDF...');
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

  // Scroll down
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

  await new Promise((r) => setTimeout(r, 2000));

  await page.evaluate(() => {
    // 1. Reveal all hidden elements
    const selectors = [
      '.reveal-up', '.reveal-fade', '.reveal-scale', '.reveal-left', '.reveal-right', '.reveal-clip',
      '.gsap-hidden', '[data-stagger-child]', '.location-info', '.location-map', '.location-map-button',
      '.pricing-header', '.pricing-card', '.svc-cta-graphic', '.about-headline .line', '.about-body',
      '.about-pill', '.about-image-wrap'
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

    // 3. Navbar absolute
    const nav = document.getElementById('navbar');
    if (nav) {
      nav.style.position = 'absolute';
      nav.style.top = '0';
      nav.style.left = '0';
      nav.style.right = '0';
      nav.style.background = 'transparent';
      nav.style.boxShadow = 'none';
    }

    // 4. Inject styles to prevent broken cards and section cuts
    const style = document.createElement('style');
    style.textContent = `
      @page {
        size: 1440px 900px;
        margin: 0;
      }
      body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      /* Prevent breaks inside cards */
      .pricing-card,
      .svc-block,
      .svc-cta,
      .process-step,
      [data-stagger-child],
      .location-info,
      .location-map {
        break-inside: avoid !important;
        page-break-inside: avoid !important;
      }
    `;
    document.head.appendChild(style);
  });

  const outputPath = path.resolve('/Users/veritan/Work/agency-site/PC-Creations-Presentation.pdf');
  await page.pdf({
    path: outputPath,
    width: '1440px',
    height: '900px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  console.log('Presentation PDF generated!');
  await browser.close();
}

testLandscape().catch(console.error);
