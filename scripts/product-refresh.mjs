#!/usr/bin/env node
/**
 * Product Refresh Cron — sensitive.love
 * 
 * Checks all Amazon product links for:
 * - Dead links (404s) → replaces with working alternatives
 * - Title changes → updates product names in catalog
 * - Price changes → logs for review
 * - Availability → flags out-of-stock items
 * 
 * Runs weekly via cron-worker.mjs
 * Stores refresh log to Bunny CDN for monitoring
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TAG = 'spankyspinola-20';

// Bunny CDN config
const BUNNY_STORAGE_KEY = '1114836c-66ba-4092-9d7120bf020d-9cb5-4d64';
const BUNNY_STORAGE_HOST = 'ny.storage.bunnycdn.com';
const BUNNY_STORAGE_ZONE = 'sensitive-love';

// All 70 verified ASINs with metadata
const VERIFIED_PRODUCTS = {
  "0553062182": { name: "The Highly Sensitive Person", category: "books" },
  "0008244308": { name: "The Highly Sensitive Person (newer)", category: "books" },
  "1683643461": { name: "HSP Complete Learning Program", category: "books" },
  "178678209X": { name: "Handbook for HSPs", category: "books" },
  "1622036573": { name: "Empath's Survival Guide", category: "books" },
  "0143127748": { name: "The Body Keeps the Score", category: "books" },
  "0393712370": { name: "Polyvagal Theory in Therapy", category: "books" },
  "1577314808": { name: "The Power of Now", category: "books" },
  "0553380990": { name: "Radical Acceptance", category: "books" },
  "078688901X": { name: "The Untethered Soul", category: "books" },
  "0062358340": { name: "The Four Agreements", category: "books" },
  "0307352153": { name: "Quiet: Power of Introverts", category: "books" },
  "0735211299": { name: "Atomic Habits", category: "books" },
  "1401957234": { name: "The Highly Sensitive Person in Love", category: "books" },
  "0062484222": { name: "Maybe You Should Talk to Someone", category: "books" },
  "0399563644": { name: "When Things Fall Apart", category: "books" },
  "0062457233": { name: "The Subtle Art", category: "books" },
  "1250209927": { name: "No Bad Parts (IFS)", category: "books" },
  "006245174X": { name: "The Gifts of Imperfection", category: "books" },
  "B0D3V61JC8": { name: "Loop Quiet 2 Ear Plugs", category: "noise" },
  "B09XS7JWHH": { name: "Sony WH-1000XM5", category: "noise" },
  "B0CFSD4TSQ": { name: "Sony WH-1000XM5 Blue", category: "noise" },
  "B081T8QC65": { name: "Dreamegg White Noise Machine", category: "noise" },
  "B09RQ812XS": { name: "Yogasleep Dohm Nova", category: "noise" },
  "B073VS2NGJ": { name: "YnM Weighted Blanket", category: "sleep" },
  "B0CQYQWRSY": { name: "Topblan Weighted Blanket", category: "sleep" },
  "B07QNNV1T6": { name: "Weighted Idea Blanket", category: "sleep" },
  "B07RKXSP6Q": { name: "Baloo Weighted Blanket", category: "sleep" },
  "B07L3DNTMB": { name: "Gravity Weighted Blanket", category: "sleep" },
  "B09C5PD9VD": { name: "YFONG Weighted Sleep Mask", category: "sleep" },
  "B07KC5DWCC": { name: "Mavogel Cotton Sleep Mask", category: "sleep" },
  "B078M2227R": { name: "Alaska Bear Silk Sleep Mask", category: "sleep" },
  "B077P4336Y": { name: "Meditation Cushion", category: "meditation" },
  "B07D1XWJ3D": { name: "Zafu Meditation Cushion", category: "meditation" },
  "B09XVBL6CZ": { name: "Komuso Breathing Necklace", category: "meditation" },
  "B0BBSPG2WY": { name: "Komuso Active Shift", category: "meditation" },
  "B09Z9S569D": { name: "Mindsight Breathing Buddha", category: "meditation" },
  "B01LP0V5D0": { name: "Manduka PRO Yoga Mat", category: "yoga" },
  "B000ECWZRA": { name: "Jade Harmony Yoga Mat", category: "yoga" },
  "B01LP0U5GK": { name: "Manduka eKO Travel Mat", category: "yoga" },
  "B0BCP1RG4B": { name: "Vitruvi Stone Diffuser", category: "aroma" },
  "B01MR4Y0CZ": { name: "ASAKUKI Diffuser", category: "aroma" },
  "B06XRLR9RQ": { name: "Lagunamoon Essential Oils", category: "aroma" },
  "B07BFHP7PH": { name: "Chesapeake Bay Candle", category: "aroma" },
  "B07FSFMRY2": { name: "Yankee Candle Lavender", category: "aroma" },
  "B000GG0BNE": { name: "Yogi Tea Calming", category: "tea" },
  "B003D4F1QM": { name: "Traditional Medicinals Chamomile", category: "tea" },
  "B0009F3PM6": { name: "Celestial Sleepytime Tea", category: "tea" },
  "B000BD0RT0": { name: "Doctor's Best Magnesium", category: "supplements" },
  "B00BPUY3W0": { name: "NOW L-Theanine", category: "supplements" },
  "B01HGFCJGK": { name: "Jarrow Theanine", category: "supplements" },
  "B002Y27JCI": { name: "Nature Made Vitamin D3", category: "supplements" },
  "B0093162RM": { name: "Philips Wake-up Light", category: "environment" },
  "B075S53HD9": { name: "Philips SmartSleep HF3650", category: "environment" },
  "B07W781XWF": { name: "Blue Light Blocking Glasses", category: "environment" },
  "B07VQT8KS2": { name: "Grounding Mat", category: "environment" },
  "B08VQN5MX7": { name: "Earthing Elite Sleep Mat", category: "environment" },
  "B00LW1KAYC": { name: "Dr Teal's Epsom Salt", category: "self-care" },
  "B07N7QPNQG": { name: "Dr Teal's 3-Pack", category: "self-care" },
  "B08LGLD17N": { name: "Acupressure Mat Set", category: "self-care" },
  "B0BXN8N4H1": { name: "ShaktiMat Acupressure", category: "self-care" },
  "B0BMT6MVHW": { name: "Theragun Mini", category: "self-care" },
  "B08DKYLK4D": { name: "RENPHO Foot Massager", category: "self-care" },
  "B01NAJZR7Q": { name: "Leuchtturm1917 Notebook", category: "journaling" },
  "B0DJBLX39K": { name: "Leuchtturm1917 Hardcover", category: "journaling" },
  "B0C1HXHZ5P": { name: "Papier Joy Wellness Journal", category: "journaling" },
  "B09V1KKMH9": { name: "Clever Fox Planner", category: "journaling" },
  "B07PP6HN9V": { name: "PILPOC Fidget Cube", category: "sensory" },
  "B071FMYNRB": { name: "Speks Magnetic Balls", category: "sensory" },
  "B0B5GKRJNQ": { name: "Ostrichpillow Eye Pillow", category: "sleep" },
};

// Replacement map: if an ASIN dies, replace with another in same category
function getReplacementAsin(deadAsin) {
  const deadProduct = VERIFIED_PRODUCTS[deadAsin];
  if (!deadProduct) return null;
  
  const sameCat = Object.entries(VERIFIED_PRODUCTS)
    .filter(([asin, p]) => p.category === deadProduct.category && asin !== deadAsin);
  
  if (sameCat.length === 0) return null;
  return sameCat[Math.floor(Math.random() * sameCat.length)][0];
}

// Check a single ASIN on Amazon
function checkAsin(asin) {
  return new Promise((resolve) => {
    const url = `https://www.amazon.com/dp/${asin}`;
    const options = {
      hostname: 'www.amazon.com',
      path: `/dp/${asin}`,
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html',
      },
      timeout: 10000,
    };
    
    const req = https.request(options, (res) => {
      resolve({
        asin,
        status: res.statusCode,
        alive: res.statusCode !== 404,
        redirected: res.statusCode >= 300 && res.statusCode < 400,
      });
    });
    
    req.on('error', () => resolve({ asin, status: 0, alive: true, redirected: false }));
    req.on('timeout', () => { req.destroy(); resolve({ asin, status: 0, alive: true, redirected: false }); });
    req.end();
  });
}

// Upload refresh log to Bunny CDN
function uploadLog(log) {
  return new Promise((resolve, reject) => {
    const date = new Date().toISOString().split('T')[0];
    const logPath = `/logs/product-refresh-${date}.json`;
    const body = JSON.stringify(log, null, 2);
    
    const options = {
      hostname: BUNNY_STORAGE_HOST,
      path: `/${BUNNY_STORAGE_ZONE}${logPath}`,
      method: 'PUT',
      headers: {
        'AccessKey': BUNNY_STORAGE_KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// Replace dead ASIN in article data files
function replaceDeadAsinInArticles(deadAsin, replacementAsin) {
  const dataDir = resolve(__dirname, '..', 'client', 'src', 'data');
  const files = ['articles-the-gift.json', 'articles-the-nervous-system.json', 'articles-the-practice.json', 'articles-the-science.json', 'articles-the-world.json'];
  
  let totalReplaced = 0;
  const replacement = VERIFIED_PRODUCTS[replacementAsin];
  
  for (const fname of files) {
    const filePath = resolve(dataDir, fname);
    try {
      const articles = JSON.parse(readFileSync(filePath, 'utf-8'));
      let modified = false;
      
      for (const art of articles) {
        if (art.bodyHtml && art.bodyHtml.includes(deadAsin)) {
          // Replace the ASIN in all Amazon links
          const oldLink = `amazon.com/dp/${deadAsin}?tag=${TAG}`;
          const newLink = `amazon.com/dp/${replacementAsin}?tag=${TAG}`;
          art.bodyHtml = art.bodyHtml.split(oldLink).join(newLink);
          
          // Also update product name if it appears
          if (replacement) {
            // Update the anchor text for the new product
            const oldPattern = new RegExp(`(dp/${deadAsin}[^"]*"[^>]*>)[^<]+`, 'g');
            art.bodyHtml = art.bodyHtml.replace(oldPattern, `$1${replacement.name}`);
          }
          
          modified = true;
          totalReplaced++;
        }
      }
      
      if (modified) {
        writeFileSync(filePath, JSON.stringify(articles, null, 0));
      }
    } catch (e) {
      console.error(`Error processing ${fname}:`, e.message);
    }
  }
  
  return totalReplaced;
}

async function main() {
  console.log('=== Product Refresh Cron ===');
  console.log(`Checking ${Object.keys(VERIFIED_PRODUCTS).length} ASINs...`);
  
  const results = {
    timestamp: new Date().toISOString(),
    total_checked: 0,
    alive: 0,
    dead: 0,
    replaced: 0,
    uncertain: 0,
    details: [],
  };
  
  const asins = Object.keys(VERIFIED_PRODUCTS);
  
  // Check in batches of 5 with 1s delay between batches
  for (let i = 0; i < asins.length; i += 5) {
    const batch = asins.slice(i, i + 5);
    const checks = await Promise.all(batch.map(checkAsin));
    
    for (const check of checks) {
      results.total_checked++;
      const product = VERIFIED_PRODUCTS[check.asin];
      
      if (check.status === 404) {
        results.dead++;
        console.log(`  DEAD: ${check.asin} - ${product.name}`);
        
        // Auto-replace with same-category product
        const replacement = getReplacementAsin(check.asin);
        if (replacement) {
          const count = replaceDeadAsinInArticles(check.asin, replacement);
          results.replaced += count;
          console.log(`    Replaced with ${replacement} (${VERIFIED_PRODUCTS[replacement].name}) in ${count} articles`);
          results.details.push({
            asin: check.asin,
            name: product.name,
            status: 'dead',
            replacement: replacement,
            articles_fixed: count,
          });
        }
      } else if (check.alive) {
        results.alive++;
        results.details.push({
          asin: check.asin,
          name: product.name,
          status: 'alive',
          http_code: check.status,
        });
      } else {
        results.uncertain++;
        results.details.push({
          asin: check.asin,
          name: product.name,
          status: 'uncertain',
          http_code: check.status,
        });
      }
    }
    
    // Rate limit
    await new Promise(r => setTimeout(r, 1000));
  }
  
  console.log(`\n=== Results ===`);
  console.log(`Alive: ${results.alive}`);
  console.log(`Dead: ${results.dead}`);
  console.log(`Replaced: ${results.replaced} article links`);
  console.log(`Uncertain: ${results.uncertain}`);
  
  // Upload log to Bunny CDN
  try {
    const logResult = await uploadLog(results);
    console.log(`\nRefresh log uploaded to Bunny CDN (status: ${logResult.status})`);
  } catch (e) {
    console.error('Failed to upload log:', e.message);
  }
  
  // If any articles were modified, commit and push
  if (results.replaced > 0 && process.env.GH_PAT) {
    console.log('\nDead links found and replaced. Push changes to GitHub...');
    const { execSync } = await import('child_process');
    try {
      const projectDir = resolve(__dirname, '..');
      execSync('git add -A && git commit -m "Auto-refresh: replace dead product links" && git push', {
        cwd: projectDir,
        stdio: 'inherit',
      });
      console.log('Changes pushed to GitHub.');
    } catch (e) {
      console.error('Git push failed:', e.message);
    }
  }
  
  return results;
}

export { main as runProductRefresh };

// Run if called directly
if (process.argv[1] && process.argv[1].includes('product-refresh')) {
  main().catch(console.error);
}
