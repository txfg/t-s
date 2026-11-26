// Builds the team collage for the Home page's "Meet the team" card:
// public/images/home-meet-the-team.jpg, 1600 x 900 (16:9), a 4 x 2 grid of headshots
// with dark squares in the empty spots.
//
// Run it again after adding, removing or swapping a headshot in public/images/team/:
//   npm run team-collage
//
// It uses "sharp", the image library that comes with Astro, so there is nothing extra to install.

import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const teamDir = path.join(root, 'public/images/team');
const out = path.join(root, 'public/images/home-meet-the-team.jpg');

const WIDTH = 1600;
const HEIGHT = 900;
const COLS = 4;
const ROWS = 2;
const TILE_W = WIDTH / COLS; // 400
const TILE_H = HEIGHT / ROWS; // 450
const EMPTY = '#0b1620'; // the site's deep navy (the dark panels)

// The grid, left to right, top row first. null = a dark square.
// Each photo has a crop so the heads come out about the same size:
//   x, y: where the middle of the face is, as a fraction of the photo's width and height (0 to 1)
//   h:    how much of the photo's height to keep (1 = all of it; smaller zooms in)
const tiles = [
  { file: 'fernando-guzman.jpg', x: 0.5, y: 0.4, h: 0.7 },
  { file: 'kabir-muzumdar.jpg', x: 0.5, y: 0.42, h: 0.75 },
  null,
  { file: 'sam-cakici.jpg', x: 0.5, y: 0.5, h: 1 },
  { file: 'alvin-zheng.jpg', x: 0.48, y: 0.42, h: 0.85 },
  { file: 'omeed-tafreshi.jpg', x: 0.36, y: 0.45, h: 0.68 },
  { file: 'dominick-chu.jpg', x: 0.5, y: 0.5, h: 1 },
  { file: 'nicholas-khu.jpg', x: 0.46, y: 0.38, h: 0.6 },
];

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

async function tileImage({ file, x, y, h }) {
  const img = sharp(path.join(teamDir, file));
  const { width: iw, height: ih } = await img.metadata();
  // crop box with the tile's shape, as tall as asked, never bigger than the photo
  let cropH = Math.round(ih * h);
  let cropW = Math.round((cropH * TILE_W) / TILE_H);
  if (cropW > iw) {
    cropW = iw;
    cropH = Math.round((cropW * TILE_H) / TILE_W);
  }
  const left = Math.round(clamp(iw * x - cropW / 2, 0, iw - cropW));
  const top = Math.round(clamp(ih * y - cropH / 2, 0, ih - cropH));
  return img
    .extract({ left, top, width: cropW, height: cropH })
    .resize(TILE_W, TILE_H)
    .toBuffer();
}

const layers = [];
for (const [i, tile] of tiles.entries()) {
  if (!tile) continue;
  layers.push({
    input: await tileImage(tile),
    left: (i % COLS) * TILE_W,
    top: Math.floor(i / COLS) * TILE_H,
  });
}

await sharp({ create: { width: WIDTH, height: HEIGHT, channels: 3, background: EMPTY } })
  .composite(layers)
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(out);

console.log(`Saved ${path.relative(root, out)}`);
