#!/usr/bin/env node
// Export every channel template to its delivery format.
//
//   npm run export                     # builds docs first if docs-dist/ is missing
//   npm run export -- --only=whatsapp  # filter by export id substring
//
// Output (./exports):
//   slide-*.png                1920 × 1080 (laid out at 1280 × 720, rendered at 1.5×)
//   social-*.png               native size
//   linkedin-*.png             native size, 1×
//   linkedin-carousel.pdf      one page per carousel canvas, 1080 × 1350
//   whatsapp-status-*.jpg      JPEG, stepped down in quality until under 1 MB
//   emailer-600.html           paste-ready; logo from TPCL_LOGO_URL (https)
//
// Env: CHROMIUM_PATH — use a specific Chromium binary (e.g. /opt/pw-browsers/chromium).
//      TPCL_LOGO_URL — hosted https URL of tpc_white.png for the email masthead.

import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { chromium } from 'playwright';
import { PDFDocument } from 'pdf-lib';
import { preview } from 'vite';

const root = resolve(import.meta.dirname, '..');
const outDir = join(root, 'exports');
const only = process.argv.find((a) => a.startsWith('--only='))?.slice(7);

const pages = [
  'templates/slide-16x9',
  'templates/social-square-1080',
  'templates/social-portrait-1080x1350',
  'templates/social-story-1080x1920',
  'templates/whatsapp-status-1080x1920',
  'templates/linkedin-single-1200x627',
  'templates/linkedin-banner-1584x396',
  'templates/linkedin-carousel-1080x1350',
];

const MAX_JPEG = 1024 * 1024;

async function launch() {
  const executablePath = process.env.CHROMIUM_PATH;
  if (executablePath) return chromium.launch({ executablePath });
  try {
    return await chromium.launch();
  } catch (e) {
    const fallback = '/opt/pw-browsers/chromium';
    if (existsSync(fallback)) return chromium.launch({ executablePath: fallback });
    throw e;
  }
}

async function main() {
  if (!existsSync(join(root, 'docs-dist/index.html'))) {
    console.log('docs-dist/ missing — building docs…');
    execSync('npm run build:docs', { cwd: root, stdio: 'inherit' });
  }
  mkdirSync(outDir, { recursive: true });

  const server = await preview({ configFile: join(root, 'vite.docs.config.ts'), preview: { port: 0, open: false } });
  const base = server.resolvedUrls.local[0];
  const browser = await launch();
  const written = [];
  const carousel = [];

  try {
    for (const scale of [1, 1.5]) {
      const ctx = await browser.newContext({ viewport: { width: 2400, height: 2400 }, deviceScaleFactor: scale });
      const page = await ctx.newPage();
      for (const path of pages) {
        await page.goto(`${base}#/${path}?export`);
        await page.waitForSelector('[data-export]');
        await page.evaluate(() => document.fonts.ready);
        const ids = await page.$$eval('[data-export]', (els, s) =>
          els.filter((el) => Number(el.getAttribute('data-export-scale') ?? 1) === s)
            .map((el) => el.getAttribute('data-export')), scale);
        for (const id of ids) {
          if (only && !id.includes(only)) continue;
          const el = page.locator(`[data-export="${id}"]`);
          if (id.startsWith('whatsapp')) {
            let quality = 92;
            let buf = await el.screenshot({ type: 'jpeg', quality });
            while (buf.length > MAX_JPEG && quality > 50) {
              quality -= 6;
              buf = await el.screenshot({ type: 'jpeg', quality });
            }
            const file = join(outDir, `${id}.jpg`);
            writeFileSync(file, buf);
            if (buf.length > MAX_JPEG) console.warn(`  ! ${id}.jpg is still over 1 MB at q${quality}`);
            written.push(`${file} (q${quality}, ${(buf.length / 1024).toFixed(0)} kB)`);
          } else {
            const file = join(outDir, `${id}.png`);
            const buf = await el.screenshot({ type: 'png' });
            writeFileSync(file, buf);
            written.push(file);
            if (id.startsWith('carousel-')) carousel.push({ id, buf });
          }
        }
      }
      await ctx.close();
    }

    if (carousel.length) {
      const pdf = await PDFDocument.create();
      pdf.setTitle('TPCL — LinkedIn carousel');
      for (const { buf } of carousel.sort((a, b) => a.id.localeCompare(b.id))) {
        const img = await pdf.embedPng(buf);
        const p = pdf.addPage([1080, 1350]);
        p.drawImage(img, { x: 0, y: 0, width: 1080, height: 1350 });
      }
      const file = join(outDir, 'linkedin-carousel.pdf');
      writeFileSync(file, await pdf.save());
      written.push(`${file} (${carousel.length} pages)`);
    }

    if (!only || 'emailer'.includes(only)) {
      const logo = process.env.TPCL_LOGO_URL;
      if (!logo) console.warn('TPCL_LOGO_URL not set — email uses a placeholder logo URL. Host tpc_white.png and set it before sending.');
      const ctx = await browser.newContext();
      const page = await ctx.newPage();
      const q = logo ? `&logo=${encodeURIComponent(logo)}` : '';
      await page.goto(`${base}#/export/email-source?export${q}`);
      const html = await page.textContent('#email-source');
      if (!html?.startsWith('<!doctype html>')) throw new Error(`Email render failed: ${html}`);
      const file = join(outDir, 'emailer-600.html');
      writeFileSync(file, html);
      written.push(file);
      await ctx.close();
    }
  } finally {
    await browser.close();
    await new Promise((r) => server.httpServer.close(r));
  }

  for (const f of written) console.log('  ✓', f.replace(root + '/', ''));
}

main().catch((e) => { console.error(e); process.exit(1); });
