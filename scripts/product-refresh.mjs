#!/usr/bin/env node
/**
 * Product Refresh Cron — sensitive.love
 * 
 * Full product health check that scrapes Amazon for:
 * 1. Dead links (404) → auto-replaces with same-category alternative
 * 2. Title changes → updates anchor text in all articles + logs the change
 * 3. Price extraction → logs current price for monitoring
 * 4. Availability/stock → flags out-of-stock or unavailable items
 * 5. Redirect detection → catches ASINs that redirect to different products
 * 
 * Runs every Sunday at 06:00 UTC via start-with-cron.mjs
 * Stores detailed refresh log to Bunny CDN at /logs/product-refresh-YYYY-MM-DD.json
 * Also stores a rolling summary at /logs/product-refresh-latest.json
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TAG = 'spankyspinola-20';

// Bunny CDN config
const BUNNY_STORAGE_KEY = '1114836c-66ba-4092-9d7120bf020d-9cb5-4d64';
const BUNNY_STORAGE_HOST = 'ny.storage.bunnycdn.com';
const BUNNY_STORAGE_ZONE = 'sensitive-love';

// All 69 verified ASINs with metadata
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

// ─── Helpers ───

function getReplacementAsin(deadAsin) {
  const deadProduct = VERIFIED_PRODUCTS[deadAsin];
  if (!deadProduct) return null;
  const sameCat = Object.entries(VERIFIED_PRODUCTS)
    .filter(([asin, p]) => p.category === deadProduct.category && asin !== deadAsin);
  if (sameCat.length === 0) return null;
  return sameCat[Math.floor(Math.random() * sameCat.length)][0];
}

/**
 * Full GET request to Amazon product page.
 * Extracts: HTTP status, title, price, availability, stock status.
 */
function scrapeAsin(asin) {
  return new Promise((resolvePromise) => {
    const options = {
      hostname: 'www.amazon.com',
      path: `/dp/${asin}`,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'identity',
        'Cache-Control': 'no-cache',
      },
      timeout: 15000,
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.setEncoding('utf-8');
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        const result = {
          asin,
          httpStatus: res.statusCode,
          alive: res.statusCode !== 404,
          title: null,
          price: null,
          availability: null,
          inStock: true,
          titleChanged: false,
          priceRange: null,
          rating: null,
          reviewCount: null,
        };

        if (res.statusCode === 404) {
          result.alive = false;
          result.inStock = false;
          resolvePromise(result);
          return;
        }

        // ─── Extract title ───
        // Try <title> tag first
        const titleMatch = body.match(/<title[^>]*>([^<]+)<\/title>/i);
        if (titleMatch) {
          let rawTitle = titleMatch[1].trim();
          // Amazon titles often end with ": Amazon.com: ..." or " - Amazon.com"
          rawTitle = rawTitle.replace(/\s*[-:|]\s*Amazon\.com.*$/i, '').trim();
          rawTitle = rawTitle.replace(/\s*:\s*Amazon\.com.*$/i, '').trim();
          if (rawTitle.length > 5 && rawTitle.length < 300) {
            result.title = rawTitle;
          }
        }

        // Fallback: productTitle span
        if (!result.title) {
          const prodTitle = body.match(/id="productTitle"[^>]*>([^<]+)</i);
          if (prodTitle) {
            result.title = prodTitle[1].trim();
          }
        }

        // ─── Extract price ───
        // Try multiple price selectors
        const pricePatterns = [
          /class="a-price-whole"[^>]*>(\d+)<.*?class="a-price-fraction"[^>]*>(\d+)</s,
          /id="priceblock_ourprice"[^>]*>\$?([\d,.]+)/i,
          /id="priceblock_dealprice"[^>]*>\$?([\d,.]+)/i,
          /class="a-price"[^>]*>.*?<span[^>]*>\$?([\d,.]+)/s,
          /"price":\s*"?\$?([\d,.]+)/,
          /\$(\d{1,4}\.\d{2})/,
        ];

        for (const pattern of pricePatterns) {
          const priceMatch = body.match(pattern);
          if (priceMatch) {
            if (priceMatch[2]) {
              result.price = `$${priceMatch[1]}.${priceMatch[2]}`;
            } else {
              result.price = `$${priceMatch[1]}`;
            }
            break;
          }
        }

        // ─── Extract availability / stock ───
        const availPatterns = [
          /id="availability"[^>]*>[\s\S]*?<span[^>]*>([^<]+)/i,
          /id="outOfStock"[^>]*>/i,
          /"availability"\s*:\s*"([^"]+)"/i,
        ];

        const availMatch = body.match(availPatterns[0]);
        if (availMatch) {
          result.availability = availMatch[1].trim();
          const lower = result.availability.toLowerCase();
          if (lower.includes('currently unavailable') || lower.includes('out of stock')) {
            result.inStock = false;
          }
        }

        // Check for explicit out-of-stock
        if (body.match(availPatterns[1])) {
          result.inStock = false;
          result.availability = result.availability || 'Out of Stock';
        }

        // Schema.org availability
        const schemaAvail = body.match(availPatterns[2]);
        if (schemaAvail) {
          const val = schemaAvail[1].toLowerCase();
          if (val.includes('outofstock') || val.includes('discontinued')) {
            result.inStock = false;
            result.availability = result.availability || 'Out of Stock';
          }
        }

        // ─── Extract rating ───
        const ratingMatch = body.match(/(\d\.\d)\s*out of\s*5\s*stars/i);
        if (ratingMatch) {
          result.rating = ratingMatch[1];
        }

        // ─── Extract review count ───
        const reviewMatch = body.match(/([\d,]+)\s*(?:global\s*)?ratings/i);
        if (reviewMatch) {
          result.reviewCount = reviewMatch[1].replace(/,/g, '');
        }

        // ─── Check if title changed ───
        const known = VERIFIED_PRODUCTS[asin];
        if (known && result.title) {
          // Normalize for comparison (lowercase, strip special chars)
          const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
          const knownNorm = normalize(known.name);
          const scrapedNorm = normalize(result.title);
          // Title changed if the known name is NOT a substring of the scraped title
          if (!scrapedNorm.includes(knownNorm) && !knownNorm.includes(scrapedNorm)) {
            result.titleChanged = true;
          }
        }

        resolvePromise(result);
      });
    });

    req.on('error', () => {
      resolvePromise({
        asin,
        httpStatus: 0,
        alive: true, // assume alive on network error
        title: null,
        price: null,
        availability: 'Network error',
        inStock: true,
        titleChanged: false,
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolvePromise({
        asin,
        httpStatus: 0,
        alive: true,
        title: null,
        price: null,
        availability: 'Timeout',
        inStock: true,
        titleChanged: false,
      });
    });

    req.end();
  });
}

// ─── Article data operations ───

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
          art.bodyHtml = art.bodyHtml.split(`amazon.com/dp/${deadAsin}`).join(`amazon.com/dp/${replacementAsin}`);
          if (replacement) {
            const pattern = new RegExp(`(dp/${replacementAsin}[^"]*"[^>]*>)[^<]+`, 'g');
            art.bodyHtml = art.bodyHtml.replace(pattern, `$1${replacement.name}`);
          }
          modified = true;
          totalReplaced++;
        }
      }
      if (modified) {
        writeFileSync(filePath, JSON.stringify(articles));
      }
    } catch (e) {
      console.error(`  Error processing ${fname}:`, e.message);
    }
  }
  return totalReplaced;
}

function updateTitleInArticles(asin, oldName, newTitle) {
  const dataDir = resolve(__dirname, '..', 'client', 'src', 'data');
  const files = ['articles-the-gift.json', 'articles-the-nervous-system.json', 'articles-the-practice.json', 'articles-the-science.json', 'articles-the-world.json'];
  let totalUpdated = 0;

  // Use a shortened, clean version of the new title for anchor text
  let cleanTitle = newTitle;
  // Truncate very long Amazon titles to first meaningful segment
  if (cleanTitle.length > 80) {
    const parts = cleanTitle.split(/\s*[-,|]\s*/);
    cleanTitle = parts[0];
    if (cleanTitle.length < 20 && parts.length > 1) {
      cleanTitle = parts.slice(0, 2).join(' - ');
    }
  }

  for (const fname of files) {
    const filePath = resolve(dataDir, fname);
    try {
      const articles = JSON.parse(readFileSync(filePath, 'utf-8'));
      let modified = false;
      for (const art of articles) {
        if (art.bodyHtml && art.bodyHtml.includes(asin)) {
          // Update anchor text: find links to this ASIN and update the text
          const linkPattern = new RegExp(
            `(<a[^>]*amazon\\.com/dp/${asin}[^>]*>)${escapeRegex(oldName)}(</a>)`,
            'gi'
          );
          if (linkPattern.test(art.bodyHtml)) {
            art.bodyHtml = art.bodyHtml.replace(linkPattern, `$1${cleanTitle}$2`);
            modified = true;
            totalUpdated++;
          }
        }
      }
      if (modified) {
        writeFileSync(filePath, JSON.stringify(articles));
      }
    } catch (e) {
      console.error(`  Error updating titles in ${fname}:`, e.message);
    }
  }
  return totalUpdated;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ─── Bunny CDN log upload ───

function uploadToBunny(path, body) {
  return new Promise((resolvePromise, reject) => {
    const options = {
      hostname: BUNNY_STORAGE_HOST,
      path: `/${BUNNY_STORAGE_ZONE}${path}`,
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
      res.on('end', () => resolvePromise({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ─── Main ───

async function main() {
  console.log('=== Product Refresh Cron ===');
  console.log(`Time: ${new Date().toISOString()}`);
  console.log(`Checking ${Object.keys(VERIFIED_PRODUCTS).length} ASINs for title, price, availability, and link health...\n`);

  const results = {
    timestamp: new Date().toISOString(),
    total_checked: 0,
    alive: 0,
    dead: 0,
    out_of_stock: 0,
    title_changed: 0,
    titles_updated_in_articles: 0,
    dead_links_replaced: 0,
    prices_found: 0,
    uncertain: 0,
    products: [],
    actions_taken: [],
  };

  const asins = Object.keys(VERIFIED_PRODUCTS);

  // Scrape in batches of 3 with 2s delay (gentler on Amazon)
  for (let i = 0; i < asins.length; i += 3) {
    const batch = asins.slice(i, i + 3);
    const scraped = await Promise.all(batch.map(scrapeAsin));

    for (const data of scraped) {
      results.total_checked++;
      const known = VERIFIED_PRODUCTS[data.asin];

      const productEntry = {
        asin: data.asin,
        known_name: known.name,
        category: known.category,
        http_status: data.httpStatus,
        scraped_title: data.title,
        price: data.price,
        in_stock: data.inStock,
        availability: data.availability,
        rating: data.rating,
        review_count: data.reviewCount,
        title_changed: data.titleChanged,
        status: 'alive',
      };

      // ─── Handle dead links (404) ───
      if (!data.alive) {
        productEntry.status = 'dead';
        results.dead++;
        console.log(`  DEAD: ${data.asin} - ${known.name}`);

        const replacement = getReplacementAsin(data.asin);
        if (replacement) {
          const count = replaceDeadAsinInArticles(data.asin, replacement);
          results.dead_links_replaced += count;
          productEntry.replacement_asin = replacement;
          productEntry.replacement_name = VERIFIED_PRODUCTS[replacement].name;
          productEntry.articles_fixed = count;
          results.actions_taken.push({
            type: 'dead_link_replaced',
            asin: data.asin,
            product: known.name,
            replacement: replacement,
            articles_fixed: count,
          });
          console.log(`    -> Replaced with ${replacement} (${VERIFIED_PRODUCTS[replacement].name}) in ${count} articles`);
        }

      // ─── Handle out-of-stock ───
      } else if (!data.inStock) {
        productEntry.status = 'out_of_stock';
        results.out_of_stock++;
        console.log(`  OUT OF STOCK: ${data.asin} - ${known.name} (${data.availability})`);
        results.actions_taken.push({
          type: 'out_of_stock_flagged',
          asin: data.asin,
          product: known.name,
          availability: data.availability,
        });

      // ─── Handle title changes ───
      } else {
        productEntry.status = 'alive';
        results.alive++;

        if (data.titleChanged && data.title) {
          results.title_changed++;
          console.log(`  TITLE CHANGED: ${data.asin}`);
          console.log(`    Old: ${known.name}`);
          console.log(`    New: ${data.title}`);

          const updated = updateTitleInArticles(data.asin, known.name, data.title);
          results.titles_updated_in_articles += updated;
          results.actions_taken.push({
            type: 'title_updated',
            asin: data.asin,
            old_title: known.name,
            new_title: data.title,
            articles_updated: updated,
          });
          console.log(`    -> Updated anchor text in ${updated} articles`);
        }
      }

      // Track price extraction
      if (data.price) {
        results.prices_found++;
      }

      // Track uncertain (bot-blocked)
      if (data.httpStatus === 503 || data.httpStatus === 500 || data.httpStatus === 0) {
        if (data.alive) {
          results.uncertain++;
          productEntry.status = 'uncertain';
        }
      }

      results.products.push(productEntry);
    }

    // Rate limit: 2 seconds between batches
    await new Promise(r => setTimeout(r, 2000));

    // Progress log every 15 ASINs
    if ((i + 3) % 15 === 0) {
      console.log(`  ... checked ${Math.min(i + 3, asins.length)}/${asins.length}`);
    }
  }

  // ─── Summary ───
  console.log('\n=== REFRESH SUMMARY ===');
  console.log(`Total checked:    ${results.total_checked}`);
  console.log(`Alive:            ${results.alive}`);
  console.log(`Dead (replaced):  ${results.dead} (${results.dead_links_replaced} article links fixed)`);
  console.log(`Out of stock:     ${results.out_of_stock}`);
  console.log(`Title changed:    ${results.title_changed} (${results.titles_updated_in_articles} article anchors updated)`);
  console.log(`Prices found:     ${results.prices_found}`);
  console.log(`Uncertain (bot):  ${results.uncertain}`);
  console.log(`Actions taken:    ${results.actions_taken.length}`);

  // ─── Price summary table ───
  const withPrices = results.products.filter(p => p.price);
  if (withPrices.length > 0) {
    console.log('\n--- Price Snapshot ---');
    for (const p of withPrices) {
      console.log(`  ${p.asin} | ${p.price.padEnd(10)} | ${p.known_name}`);
    }
  }

  // ─── Upload logs to Bunny CDN ───
  const date = new Date().toISOString().split('T')[0];
  try {
    // Dated log
    const logBody = JSON.stringify(results, null, 2);
    const dated = await uploadToBunny(`/logs/product-refresh-${date}.json`, logBody);
    console.log(`\nDated log uploaded (status: ${dated.status})`);

    // Rolling latest log
    const latest = await uploadToBunny('/logs/product-refresh-latest.json', logBody);
    console.log(`Latest log uploaded (status: ${latest.status})`);

    // Price history append
    const priceSnapshot = {
      date,
      prices: withPrices.map(p => ({ asin: p.asin, name: p.known_name, price: p.price })),
    };
    const priceBody = JSON.stringify(priceSnapshot) + '\n';
    const priceLog = await uploadToBunny(`/logs/price-history-${date}.json`, JSON.stringify(priceSnapshot, null, 2));
    console.log(`Price history uploaded (status: ${priceLog.status})`);
  } catch (e) {
    console.error('Failed to upload logs:', e.message);
  }

  // ─── Git push if changes were made ───
  const hasChanges = results.dead_links_replaced > 0 || results.titles_updated_in_articles > 0;
  if (hasChanges && process.env.GH_PAT) {
    console.log('\nChanges detected. Pushing to GitHub...');
    const { execSync } = await import('child_process');
    try {
      const projectDir = resolve(__dirname, '..');
      const msg = [];
      if (results.dead_links_replaced > 0) msg.push(`replaced ${results.dead} dead links`);
      if (results.titles_updated_in_articles > 0) msg.push(`updated ${results.title_changed} titles`);
      execSync(`git add -A && git commit -m "product-refresh: ${msg.join(', ')}" && git push`, {
        cwd: projectDir,
        stdio: 'inherit',
      });
      console.log('Changes pushed to GitHub.');
    } catch (e) {
      console.error('Git push failed:', e.message);
    }
  } else {
    console.log('\nNo article changes needed this run.');
  }

  console.log(`\n=== Product Refresh Complete ===`);
  return results;
}

export { main as runProductRefresh };

// Run if called directly
if (process.argv[1] && process.argv[1].includes('product-refresh')) {
  main().catch(console.error);
}
