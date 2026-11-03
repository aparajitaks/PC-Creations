import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  console.log('Launching Chrome...');
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--allow-running-insecure-content',
      '--font-render-hinting=none',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
  });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', {
    waitUntil: 'networkidle0',
    timeout: 60000,
  });

  console.log('Scrolling down to trigger all animations, images and scroll triggers...');
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
      }, 100);
    });
  });

  // Wait 3 seconds for all images, fonts, and entrance animations to complete
  await new Promise((r) => setTimeout(r, 3000));

  console.log('Preparing styles for PDF generation...');
  // Force all animated and hidden elements to be visible
  await page.evaluate(() => {
    // Reveal all items
    document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-scale, .reveal-left, .reveal-right, .reveal-clip, .gsap-hidden, [data-stagger-child]').forEach((el) => {
      el.classList.add('is-revealed');
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.clipPath = 'none';
      el.style.visibility = 'visible';
    });

    // Make sure hero elements are visible
    document.querySelectorAll('.h-entrance, .h-bubble, .h-emoji').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });

    // Hide floating CTA buttons that obscure content during multi-page print
    const floatingElements = document.querySelectorAll('a[aria-label="Call PC Creations"], a[aria-label="Chat with PC Creations on WhatsApp"]');
    floatingElements.forEach(el => el.style.display = 'none');
  });

  const outputPath = path.resolve('/Users/veritan/Work/agency-site/PC-Creations-Website.pdf');
  console.log(`Generating PDF to ${outputPath}...`);

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: false,
    margin: {
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    },
  });

  console.log('PDF generation finished successfully!');
  await browser.close();
}

run().catch((err) => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
