#!/usr/bin/env node
/**
 * Rasterize social preview assets for link unfurling.
 * Run: npm run social:generate
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(path.resolve(__dirname, '..'), 'public');

function renderToPng(svgPath, outPath, width) {
  const svg = fs.readFileSync(svgPath, 'utf8');
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { loadSystemFonts: true },
  });
  const png = resvg.render().asPng();
  fs.writeFileSync(outPath, png);
  console.log(`wrote ${path.basename(outPath)} (${Math.round(png.length / 1024)} KB)`);
  return png;
}

const ogPng = renderToPng(path.join(publicDir, 'og.svg'), path.join(publicDir, 'og.png'), 1200);

const ogJpg = await sharp(ogPng).jpeg({ quality: 90, mozjpeg: true }).toBuffer();
fs.writeFileSync(path.join(publicDir, 'og.jpg'), ogJpg);
console.log(`wrote og.jpg (${Math.round(ogJpg.length / 1024)} KB)`);

renderToPng(
  path.join(publicDir, 'apple-touch-icon.svg'),
  path.join(publicDir, 'apple-touch-icon.png'),
  180,
);
renderToPng(path.join(publicDir, 'favicon.svg'), path.join(publicDir, 'favicon-32.png'), 32);
