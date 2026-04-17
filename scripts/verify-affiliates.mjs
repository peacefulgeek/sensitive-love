/**
 * Verify Affiliate Links — sensitive.love
 * Weekly ASIN health check: verify all ASINs used in articles
 * Runs Sundays at 05:00 UTC
 * 
 * For static site: reads JSON data files, checks ASINs, replaces dead ones
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { verifyAsin, buildAmazonUrl, extractAsinsFromText } from './lib/amazon-verify.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '..', 'client', 'src', 'data');
const GH_PAT = process.env.GH_PAT;

// Verified fallback ASINs by category
const FALLBACK_ASINS = {
  books: ['0553062182', '0806540060', '0544327861', '006116239X', '1401946593', '0062116959'],
  sensory: ['B0051U7W32', 'B07Q2WBT8L', 'B076TRJHVB', 'B07RWBHFM4', 'B09XS7JWHH'],
  wellness: ['B0C4KV5Y9H', 'B07H2BJQF3', 'B07PXLF6KG', 'B08BNHTFGD', 'B0BFC2KN1V'],
  journal: ['B0BSNF68VN', 'B09WN4T8FQ', 'B0C1JB9JLH'],
  comfort: ['B073429DV2', 'B07JR3WGXZ', 'B07RKXSP6Q', 'B0BVLF5DLY', 'B0D1FHGX8Q']
};

export async function verifyAffiliateLinks() {
  console.log('[verify-affiliates] Starting weekly ASIN health check...');
  
  const categories = ['the-science', 'the-nervous-system', 'the-world', 'the-gift', 'the-practice'];
  let totalChecked = 0;
  let totalDead = 0;
  let totalReplaced = 0;
  
  // Collect all unique ASINs across all articles
  const allAsins = new Set();
  
  for (const cat of categories) {
    const filePath = path.join(DATA_DIR, `articles-${cat}.json`);
    try {
      const data = JSON.parse(await fs.readFile(filePath, 'utf8'));
      for (const article of data) {
        const asins = extractAsinsFromText(article.bodyHtml || '');
        asins.forEach(a => allAsins.add(a));
      }
    } catch { continue; }
  }
  
  console.log(`[verify-affiliates] Checking ${allAsins.size} unique ASINs...`);
  
  // Verify each ASIN
  const deadAsins = new Set();
  const asinArray = [...allAsins];
  
  for (let i = 0; i < asinArray.length; i++) {
    const result = await verifyAsin(asinArray[i]);
    totalChecked++;
    
    // Only mark as dead if we got a clear 404 or soft-404
    // 503/405 are rate limiting, not dead
    if (!result.valid && (result.reason === 'soft-404' || result.reason === 'redirected-to-search' || result.reason === 'http-404')) {
      deadAsins.add(asinArray[i]);
      totalDead++;
      console.warn(`[verify-affiliates] DEAD: ${asinArray[i]} (${result.reason})`);
    }
    
    // Rate limit: 2.5s between checks
    if (i < asinArray.length - 1) await new Promise(r => setTimeout(r, 2500));
  }
  
  // If any dead ASINs found, replace them in articles
  if (deadAsins.size > 0) {
    console.log(`[verify-affiliates] Replacing ${deadAsins.size} dead ASINs...`);
    
    const allFallbacks = Object.values(FALLBACK_ASINS).flat().filter(a => !deadAsins.has(a));
    let fallbackIdx = 0;
    
    for (const cat of categories) {
      const filePath = path.join(DATA_DIR, `articles-${cat}.json`);
      try {
        let data = JSON.parse(await fs.readFile(filePath, 'utf8'));
        let changed = false;
        
        for (let i = 0; i < data.length; i++) {
          let body = data[i].bodyHtml || '';
          for (const dead of deadAsins) {
            if (body.includes(dead)) {
              const replacement = allFallbacks[fallbackIdx % allFallbacks.length];
              fallbackIdx++;
              body = body.replace(new RegExp(dead, 'g'), replacement);
              changed = true;
              totalReplaced++;
            }
          }
          data[i].bodyHtml = body;
        }
        
        if (changed) {
          await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        }
      } catch { continue; }
    }
    
    // Also update the index file
    const indexPath = path.join(DATA_DIR, 'articles-index.json');
    try {
      let index = JSON.parse(await fs.readFile(indexPath, 'utf8'));
      for (let i = 0; i < index.length; i++) {
        if (index[i].bodyHtml) {
          for (const dead of deadAsins) {
            if (index[i].bodyHtml.includes(dead)) {
              const replacement = allFallbacks[fallbackIdx % allFallbacks.length];
              fallbackIdx++;
              index[i].bodyHtml = index[i].bodyHtml.replace(new RegExp(dead, 'g'), replacement);
            }
          }
        }
      }
      await fs.writeFile(indexPath, JSON.stringify(index, null, 2));
    } catch {}
    
    // Push to GitHub
    if (GH_PAT) {
      try {
        const { execSync } = await import('child_process');
        execSync(`git add -A && git commit -m "Replace ${totalReplaced} dead ASINs" && git push`, {
          cwd: path.resolve(__dirname, '..'),
          env: { ...process.env, GIT_AUTHOR_NAME: 'Cron Bot', GIT_AUTHOR_EMAIL: 'cron@sensitive.love' },
          stdio: 'pipe'
        });
        console.log('[verify-affiliates] Pushed replacements to GitHub');
      } catch (e) {
        console.error('[verify-affiliates] Git push failed:', e.message);
      }
    }
  }
  
  console.log(`[verify-affiliates] Done. Checked: ${totalChecked}, Dead: ${totalDead}, Replaced: ${totalReplaced}`);
}
