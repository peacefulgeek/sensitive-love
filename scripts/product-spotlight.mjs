/**
 * Product Spotlight Generator
 * 
 * Generates product review articles for HSP-relevant products using Claude API.
 * Designed to run as a cron job on Render.
 * 
 * Schedule: Weekly (configurable)
 * Output: New article JSON added to the appropriate category data file
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

const PRODUCT_DATABASE = [
  {
    name: "Loop Quiet Ear Plugs",
    asin: "B0B1NF6GFQ",
    category: "the-practice",
    keywords: ["noise reduction", "sensory overload", "HSP tools"],
    priceRange: "$20-30",
    rating: "4.3/5",
  },
  {
    name: "Muse 2 Brain Sensing Headband",
    asin: "B07HL2S9GQ",
    category: "the-practice",
    keywords: ["meditation", "neurofeedback", "mindfulness"],
    priceRange: "$200-250",
    rating: "4.0/5",
  },
  {
    name: "Weighted Blanket (20 lbs)",
    asin: "B073429DV2",
    category: "the-nervous-system",
    keywords: ["deep pressure", "nervous system regulation", "sleep"],
    priceRange: "$40-80",
    rating: "4.5/5",
  },
  {
    name: "Pure Encapsulations Magnesium Glycinate",
    asin: "B07P5K7DQP",
    category: "the-nervous-system",
    keywords: ["magnesium", "nervous system", "supplement"],
    priceRange: "$20-35",
    rating: "4.7/5",
  },
  {
    name: "Philips SmartSleep Wake-Up Light",
    asin: "B0093162RM",
    category: "the-practice",
    keywords: ["light therapy", "circadian rhythm", "gentle waking"],
    priceRange: "$80-120",
    rating: "4.4/5",
  },
  {
    name: "LectroFan White Noise Machine",
    asin: "B00MY8V86Q",
    category: "the-practice",
    keywords: ["white noise", "sleep", "sound masking"],
    priceRange: "$40-55",
    rating: "4.6/5",
  },
  {
    name: "Retrospec Zafu Meditation Cushion",
    asin: "B077P4336Y",
    category: "the-practice",
    keywords: ["meditation", "sitting practice", "comfort"],
    priceRange: "$25-40",
    rating: "4.5/5",
  },
  {
    name: "Acupressure Mat and Pillow Set",
    asin: "B01BZGYLQE",
    category: "the-nervous-system",
    keywords: ["acupressure", "pain relief", "nervous system"],
    priceRange: "$20-35",
    rating: "4.4/5",
  },
  {
    name: "URPOWER Essential Oil Diffuser",
    asin: "B00Y2CQRZY",
    category: "the-practice",
    keywords: ["aromatherapy", "essential oils", "sensory environment"],
    priceRange: "$15-25",
    rating: "4.5/5",
  },
  {
    name: "Blue Light Blocking Glasses",
    asin: "B07JN8KQZM",
    category: "the-practice",
    keywords: ["blue light", "screen fatigue", "visual sensitivity"],
    priceRange: "$15-25",
    rating: "4.3/5",
  },
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

MINIMUM 3 Amazon product links in the body text (CRITICAL - hard requirement):
- Include the main product link 3 times naturally woven into different paragraphs with (paid link) after each.
- Also include 1-2 links to complementary products from the database.
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
  result.bodyHtml = result.bodyHtml.replace(/—/g, () => ["...", " - ", " ~ "][Math.floor(Math.random() * 3)]);
  result.bodyHtml = result.bodyHtml.replace(/–/g, () => ["...", " - ", " ~ "][Math.floor(Math.random() * 3)]);

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

  // Post-process: verify minimum 3 inline Amazon links
  const inlineAmazonCount = (result.bodyHtml.match(/amazon\.com.*?tag=spankyspinola-20/g) || []).length;
  if (inlineAmazonCount < 3) {
    const needed = 3 - inlineAmazonCount;
    const complementary = PRODUCT_DATABASE.filter(p => p.asin !== product.asin);
    const extras = pickRandom(complementary, needed + 1);
    const leadIns = [
      "For many who walk this path, ",
      "In practical terms, ",
      "One thing worth considering here... ",
    ];
    for (let i = 0; i < needed && i < extras.length; i++) {
      const p = extras[i];
      const lead = leadIns[i % leadIns.length];
      const url = `https://www.amazon.com/dp/${p.asin}?tag=${TAG}`;
      result.bodyHtml += `\n<p>${lead}<a href="${url}" target="_blank" rel="nofollow noopener">${p.name}</a> (paid link) pairs well with this for sensitive people.</p>\n`;
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

// Export for use by cron worker
export { PRODUCT_DATABASE, PRODUCT_SPOTLIGHT_ENABLED, generateProductSpotlight, generateProductReview, TAG };
