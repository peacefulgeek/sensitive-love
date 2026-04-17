/**
 * Start With Cron — Render Start Command
 * Spawns the web server + all 5 cron schedules via node-cron
 * 
 * Usage: NODE_ENV=production node scripts/start-with-cron.mjs
 * 
 * Cron schedules (all UTC):
 * 1. Article generation:    Mon-Fri 06:00 UTC  (5/week)
 * 2. Product spotlight:     Saturdays 08:00 UTC (1/week)
 * 3. Monthly refresh:       1st of month 03:00 UTC (10 articles)
 * 4. Quarterly deep refresh: 1st of Jan,Apr,Jul,Oct 04:00 UTC (20 articles)
 * 5. ASIN health check:     Sundays 05:00 UTC (verify all affiliate links)
 */

import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cron from 'node-cron';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');

const AUTO_GEN_ENABLED = process.env.AUTO_GEN_ENABLED === 'true';

// Start the web server
console.log('[startup] Starting web server...');
const server = spawn('node', [path.join(PROJECT_ROOT, 'dist/index.js')], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'production' },
});

server.on('error', (err) => {
  console.error('[startup] Server error:', err);
  process.exit(1);
});

// Cron 1: Article generation — Mon-Fri 06:00 UTC
cron.schedule('0 6 * * 1-5', async () => {
  if (!AUTO_GEN_ENABLED) {
    console.log('[cron] article-gen skipped (AUTO_GEN_ENABLED=false)');
    return;
  }
  try {
    console.log('[cron] article-gen starting...');
    const { runCronJob } = await import('./cron-worker.mjs');
    await runCronJob();
    console.log('[cron] article-gen completed');
  } catch (e) { console.error('[cron] article-gen failed:', e); }
}, { timezone: 'UTC' });
console.log('[startup] Cron 1 registered: article-gen (Mon-Fri 06:00 UTC)');

// Cron 2: Product spotlight — Saturdays 08:00 UTC
cron.schedule('0 8 * * 6', async () => {
  if (!AUTO_GEN_ENABLED) {
    console.log('[cron] product-spotlight skipped (AUTO_GEN_ENABLED=false)');
    return;
  }
  try {
    console.log('[cron] product-spotlight starting...');
    const { runProductSpotlight } = await import('./product-spotlight.mjs');
    await runProductSpotlight();
    console.log('[cron] product-spotlight completed');
  } catch (e) { console.error('[cron] product-spotlight failed:', e); }
}, { timezone: 'UTC' });
console.log('[startup] Cron 2 registered: product-spotlight (Sat 08:00 UTC)');

// Cron 3: Monthly content refresh — 1st of every month 03:00 UTC
cron.schedule('0 3 1 * *', async () => {
  try {
    console.log('[cron] refresh-monthly starting...');
    const { refreshMonthly } = await import('./refresh-monthly.mjs');
    await refreshMonthly();
    console.log('[cron] refresh-monthly completed');
  } catch (e) { console.error('[cron] refresh-monthly failed:', e); }
}, { timezone: 'UTC' });
console.log('[startup] Cron 3 registered: refresh-monthly (1st of month 03:00 UTC)');

// Cron 4: Quarterly deep refresh — 1st of Jan,Apr,Jul,Oct 04:00 UTC
cron.schedule('0 4 1 1,4,7,10 *', async () => {
  try {
    console.log('[cron] refresh-quarterly starting...');
    const { refreshQuarterly } = await import('./refresh-quarterly.mjs');
    await refreshQuarterly();
    console.log('[cron] refresh-quarterly completed');
  } catch (e) { console.error('[cron] refresh-quarterly failed:', e); }
}, { timezone: 'UTC' });
console.log('[startup] Cron 4 registered: refresh-quarterly (1st of Jan,Apr,Jul,Oct 04:00 UTC)');

// Cron 5: ASIN health check — Sundays 05:00 UTC
cron.schedule('0 5 * * 0', async () => {
  try {
    console.log('[cron] verify-affiliates starting...');
    const { verifyAffiliateLinks } = await import('./verify-affiliates.mjs');
    await verifyAffiliateLinks();
    console.log('[cron] verify-affiliates completed');
  } catch (e) { console.error('[cron] verify-affiliates failed:', e); }
}, { timezone: 'UTC' });
console.log('[startup] Cron 5 registered: verify-affiliates (Sun 05:00 UTC)');

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('[startup] SIGTERM received. Shutting down...');
  server.kill('SIGTERM');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('[startup] SIGINT received. Shutting down...');
  server.kill('SIGINT');
  process.exit(0);
});
