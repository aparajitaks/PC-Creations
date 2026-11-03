import puppeteer from 'puppeteer-core';
import path from 'path';

async function run() {
  console.log('Launching Chrome for continuous PDF...');
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

  await page.emulateMediaType('screen');

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', {
    waitUntil: 'networkidle0',
    timeout: 60000,
  });

  console.log('Scrolling down...');
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

  await new Promise((r) => setTimeout(r, 3000));

  console.log('Preparing styles...');
  await page.evaluate(() => {
    // Reveal all elements
    document.querySelectorAll('*').forEach((el) => {
      if (el.classList.contains('reveal-up') ||
          el.classList.contains('reveal-fade') ||
          el.classList.contains('reveal-scale') ||
          el.classList.contains('reveal-left') ||
          el.classList.contains('reveal-right') ||
          el.classList.contains('reveal-clip') ||
          el.classList.contains('gsap-hidden') ||
          el.hasAttribute('data-stagger-child') ||
          el.classList.contains('location-info') ||
          el.classList.contains('location-map') ||
          el.classList.contains('location-map-button') ||
          el.classList.contains('pricing-header') ||
          el.classList.contains('pricing-card')) {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.clipPath = 'none';
        el.style.visibility = 'visible';
      }
    });

    // Make hero entrance complete
    document.querySelectorAll('.h-entrance, .h-bubble, .h-emoji').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });

    // Hide floating action buttons
    const floatBtns = document.querySelectorAll('a[aria-label="Call PC Creations"], a[aria-label="Chat with PC Creations on WhatsApp"]');
    floatBtns.forEach(el => el.style.display = 'none');

    // Make navbar absolute at top
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
  console.log(`Generating continuous PDF to ${outputPath}...`);

  await page.pdf({
    path: outputPath,
    width: '1440px',
    height: `${scrollHeight}px`,
    printBackground: true,
    pageRanges: '1',
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  console.log('Continuous PDF generated successfully!');
  await browser.close();
}

run().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
