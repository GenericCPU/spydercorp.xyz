#!/usr/bin/env node
/**
 * Rasterize social preview assets for link unfurling.
 * OG image: public/og-card-front.png → 1200×630 (fallback: business-card-front.svg).
 * Run: npm run social:generate
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(path.resolve(__dirname, '..'), 'public');
const printDir = path.join(publicDir, 'print');
const markPath = path.join(printDir, '_mark-light.svg');
const ogSourcePath = path.join(publicDir, 'og-card-front.png');

const OG_W = 1200;
const OG_H = 630;
const CARD_W = 1050;
const CARD_H = 600;
const OG_BG = { r: 255, g: 255, b: 255, alpha: 1 };

function loadMark() {
  return fs.readFileSync(markPath, 'utf8').replace(/<!--[\s\S]*?-->/g, '').trim();
}

function inlineMarks(svg, mark) {
  return svg
    .replace('<!-- MARK -->', mark)
    .replace('<!-- MARK_WATERMARK -->', mark);
}

function loadCardFrontSvg() {
  const raw = fs.readFileSync(path.join(printDir, 'business-card-front.svg'), 'utf8');
  return inlineMarks(raw, loadMark());
}

/** Wrap 1050×600 card in 1200×630 OG canvas (height-fit, centered). */
function buildOgSvg(cardInner) {
  const scale = OG_H / CARD_H;
  const scaledW = CARD_W * scale;
  const offsetX = (OG_W - scaledW) / 2;

  const cardDoc = cardInner
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .replace(/<!--[\s\S]*?-->/g, '');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}" viewBox="0 0 ${OG_W} ${OG_H}">
  <rect width="${OG_W}" height="${OG_H}" fill="#ffffff"/>
  <g transform="translate(${offsetX} 0) scale(${scale})">
    ${cardDoc}
  </g>
</svg>`;
}

function renderToPng(svg, outPath, width) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { loadSystemFonts: true },
  });
  const png = resvg.render().asPng();
  fs.writeFileSync(outPath, png);
  console.log(`wrote ${path.basename(outPath)} (${Math.round(png.length / 1024)} KB)`);
  return png;
}

async function writeOgFromSource() {
  const ogPng = await sharp(ogSourcePath)
    .resize(OG_W, OG_H, { fit: 'contain', background: OG_BG })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'og.png'), ogPng);
  console.log(`wrote og.png (${Math.round(ogPng.length / 1024)} KB) from og-card-front.png`);

  const ogJpg = await sharp(ogPng).jpeg({ quality: 90, mozjpeg: true }).toBuffer();
  fs.writeFileSync(path.join(publicDir, 'og.jpg'), ogJpg);
  console.log(`wrote og.jpg (${Math.round(ogJpg.length / 1024)} KB)`);
}

async function writeOgFromSvg() {
  const cardFront = loadCardFrontSvg();
  const ogSvg = buildOgSvg(cardFront);
  fs.writeFileSync(path.join(publicDir, 'og.svg'), ogSvg);

  const ogPng = renderToPng(ogSvg, path.join(publicDir, 'og.png'), OG_W);
  const ogJpg = await sharp(ogPng).jpeg({ quality: 90, mozjpeg: true }).toBuffer();
  fs.writeFileSync(path.join(publicDir, 'og.jpg'), ogJpg);
  console.log(`wrote og.jpg (${Math.round(ogJpg.length / 1024)} KB) from SVG`);
}

if (fs.existsSync(ogSourcePath)) {
  await writeOgFromSource();
} else {
  await writeOgFromSvg();
}

renderToPng(
  fs.readFileSync(path.join(publicDir, 'apple-touch-icon.svg'), 'utf8'),
  path.join(publicDir, 'apple-touch-icon.png'),
  180,
);
renderToPng(fs.readFileSync(path.join(publicDir, 'favicon.svg'), 'utf8'), path.join(publicDir, 'favicon-32.png'), 32);
