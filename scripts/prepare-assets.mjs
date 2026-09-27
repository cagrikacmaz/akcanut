// Builds web-ready masters and static files from the originals in ./AkcanutAssets.
// The originals folder stays out of git; everything this script writes is committed.
// Only crops and compression are applied: no retouching, no colour changes.
//
// Run after replacing an original:  npm run assets
import { mkdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'AkcanutAssets';
const BRAND = 'src/assets/brand';
const PHOTOS = 'src/assets/photos';
const PUBLIC = 'public';

const PAPER = { r: 246, g: 242, b: 232, alpha: 1 };
const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 };

const src = (name) => path.join(SRC, name);
const png = (s) => s.png({ compressionLevel: 9, effort: 10 });

/** Bounding box of the pixels whose alpha is above the threshold. */
async function opaqueBox(file, threshold = 8) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let minX = info.width;
  let minY = info.height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * 4 + 3] > threshold) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

/** Logos: crop the empty transparent margin, keep a thin even border, lossless PNG. */
async function trimLogo(input, output, border = 8) {
  const box = await opaqueBox(src(input));
  await png(
    sharp(src(input))
      .extract(box)
      .extend({ top: border, bottom: border, left: border, right: border, background: CLEAR }),
  ).toFile(output);
  const { width, height } = await sharp(output).metadata();
  console.log(`  ${output}  ${width}x${height}`);
}

// Photo crops. Each master feeds Astro's image pipeline, which produces AVIF/WebP/JPEG at build.
const PHOTO_CROPS = [
  // Journey step 1: the family at harvest (5:4).
  { from: 'akcakoca-hasat-v2.jpeg', to: 'harvest-family.jpg', box: { left: 0, top: 420, width: 900, height: 720 } },
  // Origin: the orchard canopy (3:2).
  { from: 'akcakoca-hasat-v2.jpeg', to: 'orchard-canopy.jpg', box: { left: 0, top: 0, width: 900, height: 600 } },
  // Journey step 2: the drying crop and the sacks (5:4).
  { from: 'akcakoca-kurutma-v2.jpeg', to: 'sun-drying-sacks.jpg', box: { left: 0, top: 580, width: 1200, height: 960 } },
  // Origin: the hills above the drying ground (3:2).
  { from: 'akcakoca-kurutma-v2.jpeg', to: 'drying-hills.jpg', box: { left: 0, top: 120, width: 1200, height: 800 } },
  // akcakoca_ic_findik_3 holds two frames side by side, split by a white gutter at x 495 to 504.
  // Left frame: kernel close-up, the main product image.
  { from: 'akcakoca_ic_findik_3.png', to: 'kernels-close-up.png', box: { left: 0, top: 0, width: 495, height: 511 } },
  // Right frame: the vacuum packs (same shot as akcakoca_ic_findik_2, measured slightly sharper).
  { from: 'akcakoca_ic_findik_3.png', to: 'kernels-vacuum-packs.png', box: { left: 505, top: 0, width: 491, height: 511 } },
];

async function cropPhoto({ from, to, box }) {
  const output = path.join(PHOTOS, to);
  const pipeline = sharp(src(from)).extract(box).removeAlpha();
  if (to.endsWith('.png')) {
    await png(pipeline).toFile(output);
  } else {
    await pipeline.jpeg({ quality: 92, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(output);
  }
  console.log(`  ${output}  ${box.width}x${box.height}`);
}

/**
 * The supplied icon PNG carries faint, invisible alpha noise (alpha under 12) around the mark.
 * It is harmless at full size but gathers into specks at favicon sizes, so it is cleared for
 * the small derivatives only. The mark itself is untouched.
 */
async function iconWithoutAlphaNoise() {
  const { data, info } = await sharp(path.join(BRAND, 'akcanut-icon.png'))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 3; i < data.length; i += 4) if (data[i] < 12) data[i] = 0;
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
}

/** The icon centred on a square canvas, scaled to `scale` of the side. */
async function squareIcon(size, { background = CLEAR, scale = 1 } = {}) {
  const inner = Math.round(size * scale);
  const icon = await sharp(await iconWithoutAlphaNoise())
    .resize(inner, inner, { fit: 'contain', background: CLEAR, kernel: 'lanczos3' })
    .toBuffer();
  return png(
    sharp({ create: { width: size, height: size, channels: 4, background } }).composite([
      { input: icon, gravity: 'center' },
    ]),
  ).toBuffer();
}

/** Minimal ICO writer: every entry is a PNG, which all current browsers accept. */
function toIco(images) {
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, i) => {
    const entry = 6 + 16 * i;
    header.writeUInt8(size >= 256 ? 0 : size, entry);
    header.writeUInt8(size >= 256 ? 0 : size, entry + 1);
    header.writeUInt8(0, entry + 2);
    header.writeUInt8(0, entry + 3);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((i) => i.data)]);
}

async function favicons() {
  const ico = [];
  for (const size of [16, 32, 48]) ico.push({ size, data: await squareIcon(size) });
  await writeFile(path.join(PUBLIC, 'favicon.ico'), toIco(ico));
  await writeFile(path.join(PUBLIC, 'icon-192.png'), await squareIcon(192));
  await writeFile(path.join(PUBLIC, 'icon-512.png'), await squareIcon(512));
  // Maskable: platforms crop to a circle or squircle, so the mark stays inside the safe zone.
  await writeFile(path.join(PUBLIC, 'icon-maskable-512.png'), await squareIcon(512, { background: PAPER, scale: 0.62 }));
  // iOS fills transparency with black, so the touch icon gets the paper background.
  await writeFile(path.join(PUBLIC, 'apple-touch-icon.png'), await squareIcon(180, { background: PAPER, scale: 0.76 }));
  console.log('  public/favicon.ico (16, 32, 48), icon-192.png, icon-512.png, icon-maskable-512.png, apple-touch-icon.png');
}

/** Cover-crop a photo to an exact panel size. */
const panel = (file, width, height) =>
  sharp(path.join(PHOTOS, file)).resize(width, height, { fit: 'cover', position: 'centre', kernel: 'lanczos3' }).toBuffer();

// Open Graph / Twitter card, 1200x630. The logo sits in the centre so WhatsApp's square
// thumbnail (a centre crop) still shows the whole mark; kernel photos frame it on both sides.
async function ogImage() {
  const W = 1200;
  const H = 630;
  const side = 330;
  const logo = await sharp(path.join(BRAND, 'akcanut-logo.png'))
    .resize({ height: 470, fit: 'inside', kernel: 'lanczos3' })
    .toBuffer();
  const out = path.join(PUBLIC, 'og', 'akcanut-og.jpg');
  await sharp({ create: { width: W, height: H, channels: 4, background: PAPER } })
    .composite([
      { input: await panel('kernels-close-up.png', side, H), left: 0, top: 0 },
      { input: await panel('kernels-vacuum-packs.png', side, H), left: W - side, top: 0 },
      { input: logo, gravity: 'center' },
    ])
    .flatten({ background: PAPER })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(out);
  const { size } = await stat(out);
  console.log(`  ${out}  ${W}x${H}, ${Math.round(size / 1024)} KB`);
}

async function main() {
  for (const dir of [BRAND, PHOTOS, PUBLIC, path.join(PUBLIC, 'og')]) await mkdir(dir, { recursive: true });

  console.log('Logos');
  await trimLogo('AkcaNut Logo.png', path.join(BRAND, 'akcanut-logo.png'));
  await trimLogo('Akcanut Logo Base.png', path.join(BRAND, 'akcanut-icon.png'));

  console.log('Photos');
  for (const crop of PHOTO_CROPS) await cropPhoto(crop);

  console.log('Favicons');
  await favicons();

  console.log('Social image');
  await ogImage();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
