#!/usr/bin/env node
/**
 * Rasterize print assets (business cards @ 300 DPI).
 * Run: npm run print:cards
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const printDir = path.join(path.resolve(__dirname, '..'), 'public', 'print');

function inlineMark(svg) {
  const markPath = path.join(printDir, '_mark-light.svg');
  const mark = fs.readFileSync(markPath, 'utf8').replace(/<!--[\s\S]*?-->/g, '').trim();
  return svg.replace('<!-- MARK -->', mark);
}

function render(svgName, outName, width) {
  const svgPath = path.join(printDir, svgName);
  let svg = fs.readFileSync(svgPath, 'utf8');
  if (svg.includes('<!-- MARK -->')) svg = inlineMark(svg);

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { loadSystemFonts: true },
  });
  const png = resvg.render().asPng();
  const outPath = path.join(printDir, outName);
  fs.writeFileSync(outPath, png);
  console.log(`wrote ${outName} (${Math.round(png.length / 1024)} KB)`);
}

render('business-card-front.svg', 'business-card-front.png', 1050);
render('business-card-back.svg', 'business-card-back.png', 1050);
render('business-card-preview.svg', 'business-card-preview.png', 2200);
