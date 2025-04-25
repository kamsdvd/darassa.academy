import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceIcon = join(__dirname, '../src/assets/logo.svg');
const publicDir = join(__dirname, '../public/assets');

// Ensure the public/assets directory exists
if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
}

// Generate favicon.ico
sharp(sourceIcon)
  .resize(32, 32)
  .toFile(join(publicDir, 'favicon.ico'))
  .then(() => console.log('Generated favicon.ico'))
  .catch(err => console.error('Error generating favicon.ico:', err));

// Generate icon-192.png
sharp(sourceIcon)
  .resize(192, 192)
  .png()
  .toFile(join(publicDir, 'icon-192.png'))
  .then(() => console.log('Generated icon-192.png'))
  .catch(err => console.error('Error generating icon-192.png:', err));

// Generate icon-512.png
sharp(sourceIcon)
  .resize(512, 512)
  .png()
  .toFile(join(publicDir, 'icon-512.png'))
  .then(() => console.log('Generated icon-512.png'))
  .catch(err => console.error('Error generating icon-512.png:', err)); 