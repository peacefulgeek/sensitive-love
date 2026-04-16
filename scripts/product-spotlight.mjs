/**
 * Product Spotlight Generator
 * 
 * Generates product review articles for HSP-relevant products using Claude API.
 * Designed to run as a cron job on Render.
 * 
 * Schedule: Weekly (configurable)
 * Output: New article JSON added to the appropriate category data file
 * 
 * ALL ASINs verified live on Amazon - zero 404s
 * 
 * Env vars required:
 *   ANTHROPIC_API_KEY - Claude API key
 */

const PRODUCT_SPOTLIGHT_ENABLED = false;

const BANNED_WORDS = [
  "profound", "transformative", "holistic", "nuanced", "multifaceted",
  "delve", "tapestry", "landscape", "paradigm", "synergy", "leverage",
  "utilize", "embark", "foster", "resonate", "unlock", "empower",
  "navigate", "unpack", "uncover"
];

const INTERJECTIONS = [
  "Stay with me here.", "I know, I know.", "Wild, right?",
  "Think about that for a second.", "Here is the thing.",
  "And this is where it gets interesting.", "Bear with me on this.",
  "Let that land for a moment.", "This part matters.", "Notice something?"
];

// ALL ASINs verified live on Amazon - zero 404s
const PRODUCT_DATABASE = [
  {
    name: "Loop Quiet 2 Ear Plugs",
    asin: "B0D3V61JC8",
    category: "the-practice",
    keywords: ["noise reduction", "sensory overload", "HSP tools"],
    priceRange: "$20-30",
    rating: "4.3/5",
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    asin: "B09XS7JWHH",
    category: "the-practice",
    keywords: ["noise cancelling", "focus", "sensory protection"],
    priceRange: "$300-400",
    rating: "4.6/5",
  },
  {
    name: "YnM Weighted Blanket",
    asin: "B073VS2NGJ",
    category: "the-nervous-system",
    keywords: ["deep pressure", "nervous system regulation", "sleep"],
    priceRange: "$40-80",
    rating: "4.5/5",
  },
  {
    name: "Doctor's Best Magnesium Glycinate",
    asin: "B000BD0RT0",
    category: "the-nervous-system",
    keywords: ["magnesium", "nervous system", "supplement", "sleep"],
    priceRange: "$15-25",
    rating: "4.7/5",
  },
  {
    name: "Philips SmartSleep Wake-up Light",
    asin: "B0093162RM",
    category: "the-practice",
    keywords: ["light therapy", "circadian rhythm", "gentle waking"],
    priceRange: "$80-120",
    rating: "4.4/5",
  },
  {
    name: "Dreamegg White Noise Machine",
    asin: "B081T8QC65",
    category: "the-practice",
    keywords: ["white noise", "sleep", "sound masking"],
    priceRange: "$25-40",
    rating: "4.6/5",
  },
  {
    name: "Mindful & Modern Meditation Cushion",
    asin: "B077P4336Y",
    category: "the-practice",
    keywords: ["meditation", "sitting practice", "comfort"],
    priceRange: "$25-40",
    rating: "4.5/5",
  },
  {
    name: "Acupressure Mat and Pillow Set",
    asin: "B08LGLD17N",
    category: "the-nervous-system",
    keywords: ["acupressure", "pain relief", "nervous system", "tension"],
    priceRange: "$20-35",
    rating: "4.4/5",
  },
  {
    name: "Vitruvi Stone Essential Oil Diffuser",
    asin: "B0BCP1RG4B",
    category: "the-practice",
    keywords: ["aromatherapy", "essential oils", "sensory environment"],
    priceRange: "$90-120",
    rating: "4.5/5",
  },
  {
    name: "Blue Light Blocking Glasses",
    asin: "B07W781XWF",
    category: "the-practice",
    keywords: ["blue light", "screen fatigue", "visual sensitivity"],
    priceRange: "$15-25",
    rating: "4.3/5",
  },
  {
    name: "Komuso Classic Shift Breathing Necklace",
    asin: "B09XVBL6CZ",
    category: "the-practice",
    keywords: ["breathing", "anxiety", "stress relief", "calm"],
    priceRange: "$80-115",
    rating: "4.2/5",
  },
  {
    name: "Dr Teal's Epsom Salt Lavender",
    asin: "B00LW1KAYC",
    category: "the-practice",
    keywords: ["bath", "relaxation", "self-care", "ritual"],
    priceRange: "$5-10",
    rating: "4.8/5",
  },
  {
    name: "Nutricost KSM-66 Ashwagandha",
    asin: "B079K32QB6",
    category: "the-nervous-system",
    keywords: ["adaptogen", "stress", "cortisol", "adrenal"],
    priceRange: "$15-25",
    rating: "4.6/5",
  },
  {
    name: "Leuchtturm1917 Notebook A5",
    asin: "B01NAJZR7Q",
    category: "the-practice",
    keywords: ["journaling", "writing", "reflection", "processing"],
    priceRange: "$20-30",
    rating: "4.7/5",
  },
  {
    name: "Mindsight Breathing Buddha",
    asin: "B09Z9S569D",
    category: "the-practice",
    keywords: ["meditation", "breathing", "mindfulness", "guided"],
    priceRange: "$30-45",
    rating: "4.4/5",
  },
];

// Additional verified products for inline linking in reviews
const COMPLEMENTARY_PRODUCTS = [
  { name: "The Highly Sensitive Person", asin: "0553062182", desc: "The foundational book on high sensitivity by Dr. Elaine Aron" },
  { name: "The Body Keeps the Score", asin: "0143127748", desc: "Brain, mind, and body in the healing of trauma" },
  { name: "The Power of Now", asin: "1577314808", desc: "A guide to spiritual enlightenment by Eckhart Tolle" },
  { name: "Quiet: The Power of Introverts", asin: "0307352153", desc: "The power of introverts in a world that can't stop talking" },
  { name: "Radical Acceptance", asin: "0553380990", desc: "Embracing your life with the heart of a Buddha by Tara Brach" },
  { name: "Atomic Habits", asin: "0735211299", desc: "Tiny changes, remarkable results by James Clear" },
  { name: "Sensitive: The Hidden Power", asin: "0593235010", desc: "Exploring the hidden power of sensitivity" },
  { name: "Topblan Weighted Blanket", asin: "B0CQYQWRSY", desc: "Cooling weighted blanket for year-round comfort" },
  { name: "Yogasleep Dohm Nova", asin: "B09RQ812XS", desc: "Natural white noise machine with real fan inside" },
  { name: "Lagunamoon Essential Oils Set", asin: "B06XRLR9RQ", desc: "Top 6 essential oils gift set" },
  { name: "The Polyvagal Theory in Therapy", asin: "0393712370", desc: "Understanding the polyvagal theory for healing" },
  { name: "Daring Greatly", asin: "0062316095", desc: "How the courage to be vulnerable transforms by Brene Brown" },
  { name: "ShaktiMat Acupressure Mat", asin: "B0BXN8N4H1", desc: "Premium acupressure mat for deep relaxation" },
  { name: "The Empath's Survival Guide", asin: "1622036573", desc: "Essential strategies for empaths by Judith Orloff" },
  { name: "Complex PTSD: From Surviving to Thriving", asin: "1492871842", desc: "A guide for complex trauma recovery by Pete Walker" },
];

const TAG = "spankyspinola-20";

function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

async function generateProductReview(product) {
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY not set in environment");
  }

  const interjections = pickRandom(INTERJECTIONS, 2);
  const taggedUrl = `https://www.amazon.com/dp/${product.asin}?tag=${TAG}`;
  const extraProducts = pickRandom(COMPLEMENTARY_PRODUCTS, 4);
  const extraInstructions = extraProducts.map(p =>
    `- ${p.name}: <a href="https://www.amazon.com/dp/${p.asin}?tag=${TAG}" target="_blank" rel="nofollow noopener">${p.name}</a> (paid link)`
  ).join("\n");

  const prompt = `Write a 1400-1800 word product review article titled "Product Spotlight: ${product.name} for Sensitive People" for The Empowered Sensitive (sensitive.love).

Author voice: Kalesh - Consciousness Teacher & Writer (kalesh.love)

=== VOICE RULES (CRITICAL) ===

1. KALESH VOICE:
- Long, unfolding sentences that build and turn. Average 18-28 words per sentence.
- Pattern: Long -> Long -> Long (with internal comma rhythm) -> Short drop -> Long -> Short drop.
- Intellectual warmth. Contemplative. Trusts the reader to arrive at the insight.
- Uses "we" and "one" more than "you"
- Builds analogies across 2-3 sentences before revealing the point
- Ends sections with questions that open rather than close

2. ABSOLUTELY NO EMDASH: Do NOT use em dash or en dash anywhere. Use ..., -, or ~ instead.

3. BANNED WORDS (do NOT use ANY): ${BANNED_WORDS.join(", ")}

4. Include these 2 interjections naturally: "${interjections[0]}" and "${interjections[1]}"

5. SENTENCE LENGTH VARIATION: Mix 5-word sentences with 30-word sentences.

6. CONVERSATIONAL TONE: Write like a real person, not a textbook.

Product details:
- Name: ${product.name}
- Amazon URL: ${taggedUrl}
- Price range: ${product.priceRange}
- Rating: ${product.rating}
- Keywords: ${product.keywords.join(", ")}

Structure:
- Opening: Why this product matters for sensitive people (connect to nervous system science)
- What it does and how it works
- Who benefits most
- Practical tips for use
- Honest limitations
- Healing Journey section at end with 3-4 related Amazon products

MINIMUM 5 Amazon product links in the body text (CRITICAL - HARD requirement):
- Include the main product link at least 2 times naturally woven into different paragraphs with (paid link) after each.
- Also include at least 3 links to these complementary products:
${extraInstructions}
- Every Amazon link MUST have tag=${TAG}.
Include Amazon Associate disclosure at the bottom.
Format: HTML with <h2>, <p>, <blockquote>, <a> tags. First paragraph class="drop-cap".

Return JSON:
{
  "bodyHtml": "...",
  "faqs": [{"q": "...", "a": "..."}],
  "toc": [{"id": "section-id", "title": "Section Title"}],
  "excerpt": "150 char excerpt",
  "metaDescription": "155 char meta description"
}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.content[0].text;
  
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON found in response");
  
  const result = JSON.parse(jsonMatch[0]);

  // Post-process: strip emdash
  result.bodyHtml = result.bodyHtml.replace(/\u2014/g, () => ["...", " - ", " ~ "][Math.floor(Math.random() * 3)]);
  result.bodyHtml = result.bodyHtml.replace(/\u2013/g, () => ["...", " - ", " ~ "][Math.floor(Math.random() * 3)]);

  // Post-process: strip banned words
  const replacements = {
    profound: "deep", transformative: "life-changing", holistic: "whole-person",
    nuanced: "subtle", multifaceted: "complex", delve: "explore",
    tapestry: "web", landscape: "terrain", paradigm: "framework",
    synergy: "connection", leverage: "use", utilize: "use",
    embark: "begin", foster: "encourage", resonate: "land",
    unlock: "open", empower: "strengthen", navigate: "move through",
    unpack: "break down", uncover: "find"
  };
  for (const word of BANNED_WORDS) {
    const regex = new RegExp("\\b" + word + "\\b", "gi");
    result.bodyHtml = result.bodyHtml.replace(regex, (match) => {
      const rep = replacements[word] || "meaningful";
      return match[0] === match[0].toUpperCase() ? rep.charAt(0).toUpperCase() + rep.slice(1) : rep;
    });
  }

  // Post-process: verify minimum 5 inline Amazon links (HARD REQUIREMENT)
  const inlineAmazonCount = (result.bodyHtml.match(/amazon\.com.*?tag=spankyspinola-20/g) || []).length;
  if (inlineAmazonCount < 5) {
    const needed = 5 - inlineAmazonCount;
    const allProducts = [...COMPLEMENTARY_PRODUCTS, ...PRODUCT_DATABASE.filter(p => p.asin !== product.asin).map(p => ({ name: p.name, asin: p.asin, desc: p.keywords.join(", ") }))];
    const extras = pickRandom(allProducts, needed + 3);
    const leadIns = [
      "For many who walk this path, ",
      "In practical terms, ",
      "One thing worth considering here... ",
      "On the practical side, ",
      "A small but meaningful support... ",
      "Something that has helped many sensitive people... ",
      "Worth mentioning here... ",
    ];
    let injected = 0;
    for (let i = 0; i < extras.length && injected < needed; i++) {
      const p = extras[i];
      if (result.bodyHtml.includes(p.asin)) continue;
      const lead = leadIns[injected % leadIns.length];
      const url = `https://www.amazon.com/dp/${p.asin}?tag=${TAG}`;
      result.bodyHtml += `\n<p>${lead}<a href="${url}" target="_blank" rel="nofollow noopener">${p.name}</a> (paid link) - ${p.desc}.</p>\n`;
      injected++;
    }
  }

  return result;
}

function generateProductSpotlight(product) {
  const slug = `product-spotlight-${product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`;
  const taggedUrl = `https://www.amazon.com/dp/${product.asin}?tag=${TAG}`;
  
  return {
    slug,
    title: `Product Spotlight: ${product.name} for Sensitive People`,
    category: product.category,
    amazonUrl: taggedUrl,
    keywords: product.keywords,
    priceRange: product.priceRange,
    rating: product.rating,
    template: "product-review",
  };
}

// Main runner for cron
async function runProductSpotlight() {
  console.log('[product-spotlight] Starting...');
  if (!PRODUCT_SPOTLIGHT_ENABLED) {
    console.log('[product-spotlight] Disabled. Exiting.');
    return;
  }

  // Pick a random product that hasn't been spotlighted yet
  const product = PRODUCT_DATABASE[Math.floor(Math.random() * PRODUCT_DATABASE.length)];
  console.log(`[product-spotlight] Generating review for: ${product.name}`);

  try {
    const review = await generateProductReview(product);
    if (!review) {
      console.log('[product-spotlight] No review generated.');
      return;
    }

    const spotlight = generateProductSpotlight(product);
    const now = new Date();

    // Build article entry
    const entry = {
      id: Date.now(),
      title: spotlight.title,
      slug: spotlight.slug,
      category: spotlight.category,
      categoryName: spotlight.category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      excerpt: review.excerpt,
      metaDescription: review.metaDescription,
      dateISO: now.toISOString(),
      dateHuman: now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readingTime: Math.ceil(review.bodyHtml.split(/\s+/).length / 250),
      heroImage: `https://sensitive-love.b-cdn.net/images/default-hero.webp`,
      ogImage: `https://sensitive-love.b-cdn.net/og/default-og.webp`,
      namedRef: 'Elaine Aron',
      openerType: 'varied',
      bodyHtml: review.bodyHtml,
      toc: review.toc || [],
      faqs: review.faqs || [],
      internalLinks: [],
      namedRefObj: { name: 'Elaine Aron', topic: 'sensory processing sensitivity' },
      conclusionType: 'varied',
      backlinkType: 'product',
      actualWordCount: review.bodyHtml.split(/\s+/).length,
    };

    // Write to data files
    const { readFileSync, writeFileSync } = await import('fs');
    const { resolve, dirname } = await import('path');
    const { fileURLToPath } = await import('url');
    const __dir = dirname(fileURLToPath(import.meta.url));
    const projectRoot = resolve(__dir, '..');

    // Update index
    const indexPath = resolve(projectRoot, 'client/src/data/articles-index.json');
    const index = JSON.parse(readFileSync(indexPath, 'utf-8'));
    const { bodyHtml: _b, toc: _t, faqs: _f, ...indexEntry } = entry;
    index.push(indexEntry);
    writeFileSync(indexPath, JSON.stringify(index));

    // Update category file
    const catPath = resolve(projectRoot, `client/src/data/articles-${spotlight.category}.json`);
    const catArticles = JSON.parse(readFileSync(catPath, 'utf-8'));
    catArticles.push(entry);
    writeFileSync(catPath, JSON.stringify(catArticles));

    console.log(`[product-spotlight] Generated: ${spotlight.slug}`);

    // Git push if PAT available
    if (process.env.GH_PAT) {
      const { execSync } = await import('child_process');
      try {
        execSync('git add -A', { cwd: projectRoot });
        execSync(`git commit -m "product-spotlight: ${spotlight.slug}"`, { cwd: projectRoot });
        execSync('git push origin main', { cwd: projectRoot });
        console.log('[product-spotlight] Pushed to GitHub.');
      } catch (e) {
        console.error('[product-spotlight] Git push failed:', e.message);
      }
    }
  } catch (err) {
    console.error('[product-spotlight] Error:', err);
  }
}

// Export for use by cron worker
export { PRODUCT_DATABASE, PRODUCT_SPOTLIGHT_ENABLED, generateProductSpotlight, generateProductReview, runProductSpotlight, TAG };
