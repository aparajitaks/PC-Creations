import puppeteer from 'puppeteer-core';
import path from 'path';

async function generateContinuous() {
  console.log('Testing fixed continuous PDF...');
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

  // Scroll down to trigger everything
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
      }, 80);
    });
  });

  await new Promise((r) => setTimeout(r, 2500));

  await page.evaluate(() => {
    // Reveal all hidden elements
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

    // Fix Hero container height so dvh doesn't blow up
    const hero = document.getElementById('home');
    if (hero) {
      hero.style.minHeight = '900px';
      hero.style.height = '900px';
      hero.style.maxHeight = '900px';
    }
    const heroInner = hero?.querySelector('.pc-container');
    if (heroInner) {
      heroInner.style.minHeight = '800px';
      heroInner.style.height = '800px';
    }

    // Hide floating action buttons
    document.querySelectorAll('a[aria-label="Call PC Creations"], a[aria-label="Chat with PC Creations on WhatsApp"]').forEach((el) => {
      el.style.display = 'none';
    });

    // Position navbar absolute
    const nav = document.getElementById('navbar');
    if (nav) {
      nav.style.position = 'absolute';
      nav.style.top = '0';
      nav.style.left = '0';
      nav.style.right = '0';
    }
  });

  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  console.log(`Document scroll height: ${scrollHeight}px`);

  const outputPath = path.resolve('/Users/veritan/Work/agency-site/PC-Creations-Website-Continuous.pdf');
  await page.pdf({
    path: outputPath,
    width: '1440px',
    height: `${scrollHeight}px`,
    printBackground: true,
    pageRanges: '1',
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  console.log('Done!');
  await browser.close();
}

generateContinuous().catch(console.error);
