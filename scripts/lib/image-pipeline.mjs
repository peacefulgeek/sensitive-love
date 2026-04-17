/**
 * Image Pipeline — sensitive.love
 * Fetch from FAL, convert to WebP, compress <200KB, upload to Bunny CDN
 */

import sharp from 'sharp';

const BUNNY_STORAGE_ZONE = process.env.BUNNY_STORAGE_ZONE || 'sensitive-love';
const BUNNY_API_KEY = process.env.BUNNY_API_KEY || '1114836c-66ba-4092-9d7120bf020d-9cb5-4d64';
const BUNNY_PULL_ZONE_URL = process.env.BUNNY_PULL_ZONE_URL || 'https://sensitive-love.b-cdn.net';

/**
 * Take a source image URL (from FAL), fetch it, convert to WebP,
 * compress to under 200KB, upload to Bunny, return the CDN URL.
 */
export async function processAndUploadImage(sourceUrl, filename) {
  // 1. Fetch source
  const res = await fetch(sourceUrl);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const inputBuffer = Buffer.from(await res.arrayBuffer());

  // 2. Convert to WebP, start at quality 82, drop if over 200KB
  let quality = 82;
  let outBuffer;
  while (quality >= 50) {
    outBuffer = await sharp(inputBuffer)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();
    if (outBuffer.length <= 200 * 1024) break;
    quality -= 8;
  }
  if (outBuffer.length > 200 * 1024) {
    outBuffer = await sharp(inputBuffer)
      .resize({ width: 1200 })
      .webp({ quality: 70 })
      .toBuffer();
  }

  // 3. Upload to Bunny
  const safeName = filename.replace(/[^a-z0-9-_.]/gi, '-').toLowerCase();
  const finalName = safeName.endsWith('.webp') ? safeName : `${safeName}.webp`;
  const uploadUrl = `https://ny.storage.bunnycdn.com/${BUNNY_STORAGE_ZONE}/${finalName}`;

  const upload = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'AccessKey': BUNNY_API_KEY,
      'Content-Type': 'image/webp'
    },
    body: outBuffer
  });
  if (!upload.ok) throw new Error(`Bunny upload failed: ${upload.status} ${await upload.text()}`);

  return `${BUNNY_PULL_ZONE_URL}/${finalName}`;
}

/**
 * Generate OG image from hero image — smaller, optimized for social sharing
 */
export async function processAndUploadOGImage(sourceUrl, filename) {
  const res = await fetch(sourceUrl);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const inputBuffer = Buffer.from(await res.arrayBuffer());

  const outBuffer = await sharp(inputBuffer)
    .resize({ width: 1200, height: 630, fit: 'cover' })
    .webp({ quality: 75 })
    .toBuffer();

  const safeName = filename.replace(/[^a-z0-9-_.]/gi, '-').toLowerCase();
  const finalName = safeName.endsWith('.webp') ? safeName : `${safeName}.webp`;
  const uploadUrl = `https://ny.storage.bunnycdn.com/${BUNNY_STORAGE_ZONE}/og/${finalName}`;

  const upload = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'AccessKey': BUNNY_API_KEY,
      'Content-Type': 'image/webp'
    },
    body: outBuffer
  });
  if (!upload.ok) throw new Error(`Bunny upload failed: ${upload.status}`);

  return `${BUNNY_PULL_ZONE_URL}/og/${finalName}`;
}
