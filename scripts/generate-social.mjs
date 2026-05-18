#!/usr/bin/env node
/**
 * Rasterize social preview assets for link unfurling.
 * Run: npm run social:generate
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(path.resolve(__dirname, '..'), 'public');

function renderToFile(svgPath, outPath, width) {
  const svg = fs.readFileSync(svgPath, 'utf8');
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { loadSystemFonts: true },
  });
  const png = resvg.render().asPng();
  fs.writeFileSync(outPath, png);
  console.log(`wrote ${path.basename(outPath)} (${Math.round(png.length / 1024)} KB)`);
}

renderToFile(path.join(publicDir, 'og.svg'), path.join(publicDir, 'og.png'), 1200);
renderToFile(
  path.join(publicDir, 'apple-touch-icon.svg'),
  path.join(publicDir, 'apple-touch-icon.png'),
  180,
);
