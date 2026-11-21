import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const illustrations = path.join(root, 'src/assets/illustrations');

const covers = [
  ['cover-nao-abre.svg', 'whatsapp-nao-abre-no-android'],
  ['cover-audio.svg', 'whatsapp-nao-envia-ou-nao-grava-audio'],
  ['cover-backup.svg', 'backup-do-whatsapp-travado-no-google-drive'],
  ['cover-espaco.svg', 'armazenamento-do-whatsapp-cheio'],
];

async function raster(svg, width) {
  const renderer = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: {
      loadSystemFonts: true,
      defaultFontFamily: 'Inter',
    },
  });
  const png = renderer.render().asPng();
  return sharp(png).png({ compressionLevel: 9, palette: true, effort: 10 }).toBuffer();
}

async function writeRaster(svgPath, targets) {
  const svg = await readFile(svgPath);
  for (const target of targets) {
    await mkdir(path.dirname(target.file), { recursive: true });
    const png = await raster(svg, target.width);
    if (target.file.endsWith('.webp')) {
      const webp = await sharp(png).webp({ quality: 78 }).toBuffer();
      await writeFile(target.file, webp);
    } else {
      await writeFile(target.file, png);
    }
    const meta = await sharp(target.file).metadata();
    if (meta.width !== target.width) {
      throw new Error(`${target.file} saiu com largura ${meta.width}, esperada ${target.width}`);
    }
  }
}

const publicDir = path.join(root, 'public');
const iconSvg = path.join(illustrations, 'icon.svg');
await mkdir(path.join(publicDir, 'brand'), { recursive: true });
await writeFile(path.join(publicDir, 'favicon.svg'), await readFile(iconSvg));
await writeFile(path.join(publicDir, 'brand/marktech-logo.svg'), await readFile(iconSvg));

await writeRaster(iconSvg, [
  { file: path.join(publicDir, 'favicon-32.png'), width: 32 },
  { file: path.join(publicDir, 'apple-touch-icon.png'), width: 180 },
  { file: path.join(publicDir, 'brand/marktech-logo.png'), width: 512 },
]);

await writeRaster(path.join(illustrations, 'og.svg'), [
  { file: path.join(publicDir, 'images/og/marktech.png'), width: 1920 },
  { file: path.join(publicDir, 'images/og/marktech.webp'), width: 1920 },
]);

for (const [svgName, slug] of covers) {
  const base = path.join(publicDir, 'images/covers', slug);
  await writeRaster(path.join(illustrations, svgName), [
    { file: `${base}.png`, width: 1920 },
    { file: `${base}.webp`, width: 1920 },
    { file: `${base}-800.png`, width: 800 },
    { file: `${base}-800.webp`, width: 800 },
  ]);
  const meta = await sharp(`${base}.png`).metadata();
  if (meta.width < 1200 || Math.abs(meta.width / meta.height - 16 / 9) > 0.01) {
    throw new Error(`${slug} não está em 16:9 com pelo menos 1200 px (${meta.width}x${meta.height})`);
  }
}

console.log('Imagens do MarkTech geradas em public/.');
