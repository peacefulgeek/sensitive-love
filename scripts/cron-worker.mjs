/**
 * Cron Worker — Runs Mon-Fri at 12:00 UTC
 * Generates 5 articles per week (1 per weekday) after the initial 270 are exhausted
 * 600s timeout per run
 * 
 * Phase 1 (first 54 days): Articles already gated at 5/day — cron just monitors
 * Phase 2 (after 54 days): Cron generates 5 new articles per week (Mon-Fri, 1/day)
 */

import { AUTO_GEN_ENABLED, generateArticle, generateImage, CATEGORIES, BUNNY_CDN_BASE } from "./generate-articles.mjs";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const TIMEOUT_MS = 600_000; // 600 seconds

const TOPICS_POOL = [
  "The Neuroscience of Emotional Contagion in Sensitive People",
  "How Sensory Processing Sensitivity Shapes Creative Expression",
  "Building Resilience Without Losing Sensitivity",
  "The Role of Interoception in Highly Sensitive Experiences",
  "Vagal Tone and the Sensitive Nervous System",
  "Navigating Grief as a Highly Sensitive Person",
  "The Connection Between Sensitivity and Intuitive Decision-Making",
  "How HSPs Can Thrive in Open Office Environments",
  "Sensitivity and the Microbiome-Gut-Brain Axis",
  "The Evolutionary Advantage of High Sensitivity",
  "Polyvagal Theory and the HSP Experience",
  "How Sensitivity Influences Attachment Styles",
  "The Sensitive Person's Guide to Conflict Resolution",
  "Neuroplasticity and Rewiring the Sensitive Brain",
  "Somatic Experiencing for Highly Sensitive People",
  "The Intersection of Sensitivity and Spiritual Awakening",
  "How HSPs Process Music Differently",
  "Sensitivity in the Workplace: A Manager's Guide",
  "The Role of Nature in Regulating the Sensitive Nervous System",
  "Understanding Sensory Overload: Mechanisms and Management",
];

async function runCronJob() {
  console.log(`[cron] Starting at ${new Date().toISOString()}`);
  console.log(`[cron] AUTO_GEN_ENABLED: ${AUTO_GEN_ENABLED}`);

  if (!AUTO_GEN_ENABLED) {
    console.log("[cron] Auto-generation is disabled. Exiting.");
    return;
  }

  const timeout = setTimeout(() => {
    console.error("[cron] Timeout reached (600s). Exiting.");
    process.exit(1);
  }, TIMEOUT_MS);

  try {
    // Pick a random topic and category
    const topic = TOPICS_POOL[Math.floor(Math.random() * TOPICS_POOL.length)];
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];

    console.log(`[cron] Generating: "${topic}" in ${category.name}`);

    // Generate article content
    const article = await generateArticle(topic, category);
    if (!article) {
      console.log("[cron] No article generated (disabled).");
      return;
    }

    // Generate slug
    const slug = topic
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80);

    // Generate image
    console.log("[cron] Generating image...");
    const images = await generateImage(slug, topic);

    // Create article entry
    const now = new Date();
    const entry = {
      id: Date.now(),
      title: topic,
      slug,
      category: category.slug,
      categoryName: category.name,
      excerpt: article.excerpt,
      metaDescription: article.metaDescription,
      dateISO: now.toISOString(),
      dateHuman: now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      readingTime: Math.ceil(article.bodyHtml.split(/\s+/).length / 250),
      heroImage: images?.heroImage || `${BUNNY_CDN_BASE}/images/default-hero.webp`,
      ogImage: images?.ogImage || `${BUNNY_CDN_BASE}/og/default-og.webp`,
      namedRef: "Elaine Aron",
      openerType: "varied",
    };

    // Update articles-index.json
    const indexPath = path.join(PROJECT_ROOT, "client/src/data/articles-index.json");
    const index = JSON.parse(readFileSync(indexPath, "utf-8"));
    index.push(entry);
    writeFileSync(indexPath, JSON.stringify(index));

    // Update category file
    const catPath = path.join(PROJECT_ROOT, `client/src/data/articles-${category.slug}.json`);
    const catArticles = JSON.parse(readFileSync(catPath, "utf-8"));
    catArticles.push({
      ...entry,
      bodyHtml: article.bodyHtml,
      toc: article.toc,
      faqs: article.faqs || [],
      internalLinks: [],
      namedRefObj: { name: "Elaine Aron", topic: "sensory processing sensitivity" },
      conclusionType: "varied",
      backlinkType: "internal",
      actualWordCount: article.bodyHtml.split(/\s+/).length,
    });
    writeFileSync(catPath, JSON.stringify(catArticles));

    console.log(`[cron] Article generated: ${slug}`);

    // Git commit and push
    const GH_PAT = process.env.GH_PAT;
    if (GH_PAT) {
      try {
        execSync("git add -A", { cwd: PROJECT_ROOT });
        execSync(`git commit -m "auto-gen: ${slug}"`, { cwd: PROJECT_ROOT });
        execSync("git push origin main", { cwd: PROJECT_ROOT });
        console.log("[cron] Pushed to GitHub.");
      } catch (e) {
        console.error("[cron] Git push failed:", e.message);
      }
    }

    console.log(`[cron] Done at ${new Date().toISOString()}`);
  } catch (err) {
    console.error("[cron] Error:", err);
  } finally {
    clearTimeout(timeout);
  }
}

export { runCronJob };

// Run if called directly
if (process.argv[1] && process.argv[1].includes("cron-worker")) {
  runCronJob().catch(console.error);
}
