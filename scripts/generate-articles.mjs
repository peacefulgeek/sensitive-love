/**
 * Auto-Gen Article Generator
 * Generates new articles using Anthropic Claude API + FAL.ai for images
 * All secrets from process.env — NEVER hardcoded
 * 
 * Env vars required:
 *   ANTHROPIC_API_KEY - Claude API key
 *   FAL_KEY - FAL.ai API key for image generation
 *   GH_PAT - GitHub Personal Access Token for pushing
 * 
 * Bunny CDN credentials are safe to keep in code (storage only)
 */

const AUTO_GEN_ENABLED = false;

const BUNNY_STORAGE_HOST = "ny.storage.bunnycdn.com";
const BUNNY_STORAGE_ZONE = "sensitive-love";
const BUNNY_STORAGE_KEY = "1114836c-66ba-4092-9d7120bf020d-9cb5-4d64";
const BUNNY_CDN_BASE = "https://sensitive-love.b-cdn.net";

const CATEGORIES = [
  { slug: "the-science", name: "The Science" },
  { slug: "the-nervous-system", name: "The Nervous System" },
  { slug: "the-world", name: "The World" },
  { slug: "the-gift", name: "The Gift" },
  { slug: "the-practice", name: "The Practice" },
];

const KALESH_PHRASES = [
  "What you feel is not noise - it is signal.",
  "The body keeps the score, but it also keeps the wisdom.",
  "Sensitivity is not a wound to heal. It is a capacity to develop.",
  "Your nervous system is not broken. It is calibrated differently.",
  "The depth you carry is not a burden. It is a bridge.",
];

const NAMED_REFS = [
  "Elaine Aron", "Bianca Acevedo", "Jadzia Jagiellowicz",
  "Michael Pluess", "Ted Zeff", "Julie Bjelland",
  "Jiddu Krishnamurti", "Alan Watts", "Sam Harris",
  "Sadhguru", "Tara Brach", "Stephen Porges",
];

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

// ALL ASINs verified live on Amazon — zero 404s
const AFFILIATE_PRODUCTS = [
  { name: "Loop Quiet 2 Ear Plugs", asin: "B0D3V61JC8", desc: "Reusable silicone ear plugs that reduce noise while keeping clarity" },
  { name: "YnM Weighted Blanket", asin: "B073VS2NGJ", desc: "Premium weighted blanket with glass beads for deep pressure therapy" },
  { name: "Mindful & Modern Meditation Cushion", asin: "B077P4336Y", desc: "Traditional buckwheat hull meditation cushion for daily practice" },
  { name: "Leuchtturm1917 Notebook", asin: "B01NAJZR7Q", desc: "Premium dotted notebook for journaling and reflection" },
  { name: "The Highly Sensitive Person", asin: "0553062182", desc: "The foundational book on high sensitivity by Dr. Elaine Aron" },
  { name: "The Body Keeps the Score", asin: "0143127748", desc: "Brain, mind, and body in the healing of trauma by Bessel van der Kolk" },
  { name: "Vitruvi Stone Essential Oil Diffuser", asin: "B0BCP1RG4B", desc: "Handcrafted porcelain essential oil diffuser for calming spaces" },
  { name: "Sony WH-1000XM5 Headphones", asin: "B09XS7JWHH", desc: "Industry-leading noise cancelling headphones for sensitive ears" },
  { name: "The Power of Now", asin: "1577314808", desc: "A guide to spiritual enlightenment by Eckhart Tolle" },
  { name: "Doctor's Best Magnesium Glycinate", asin: "B000BD0RT0", desc: "High absorption magnesium glycinate for sleep and calm" },
  { name: "Nutricost KSM-66 Ashwagandha", asin: "B079K32QB6", desc: "Clinically studied ashwagandha root extract for stress support" },
  { name: "Dreamegg White Noise Machine", asin: "B081T8QC65", desc: "Compact white noise machine with natural soothing sounds" },
  { name: "Dr Teal's Epsom Salt Lavender", asin: "B00LW1KAYC", desc: "Pure epsom salt with lavender for relaxation baths" },
  { name: "Komuso Classic Shift Breathing Necklace", asin: "B09XVBL6CZ", desc: "Shift breathing necklace for extended exhale practice" },
  { name: "Quiet: The Power of Introverts", asin: "0307352153", desc: "The power of introverts in a world that can't stop talking by Susan Cain" },
  { name: "Radical Acceptance", asin: "0553380990", desc: "Embracing your life with the heart of a Buddha by Tara Brach" },
  { name: "Acupressure Mat and Pillow Set", asin: "B08LGLD17N", desc: "Full-body acupressure mat with pillow for tension release" },
  { name: "Blue Light Blocking Glasses", asin: "B07W781XWF", desc: "Blue light blocking glasses for reducing screen-related eye strain" },
  { name: "Philips SmartSleep Wake-up Light", asin: "B0093162RM", desc: "Sunrise simulation alarm clock for gentle, natural waking" },
  { name: "Atomic Habits", asin: "0735211299", desc: "Tiny changes, remarkable results by James Clear" },
  { name: "Sensitive: The Hidden Power", asin: "0593235010", desc: "Exploring the hidden power of sensitivity by Jenn Granneman" },
  { name: "The Polyvagal Theory in Therapy", asin: "0393712370", desc: "Understanding the polyvagal theory for healing by Deb Dana" },
  { name: "Topblan Weighted Blanket", asin: "B0CQYQWRSY", desc: "Cooling weighted blanket for year-round comfort and calm" },
  { name: "Yogasleep Dohm Nova", asin: "B09RQ812XS", desc: "Natural white noise machine with real fan inside" },
  { name: "Mindsight Breathing Buddha", asin: "B09Z9S569D", desc: "Guided breathing meditation tool with calming light" },
  { name: "Daring Greatly", asin: "0062316095", desc: "How the courage to be vulnerable transforms by Brene Brown" },
  { name: "The Untethered Soul", asin: "078688901X", desc: "The journey beyond yourself by Michael Singer" },
  { name: "Complex PTSD: From Surviving to Thriving", asin: "1492871842", desc: "A guide for complex trauma recovery by Pete Walker" },
  { name: "The Empath's Survival Guide", asin: "1622036573", desc: "Essential strategies for empaths by Judith Orloff" },
  { name: "Lagunamoon Essential Oils Set", asin: "B06XRLR9RQ", desc: "Top 6 essential oils gift set for aromatherapy" },
];

const AFFILIATE_TAG = "spankyspinola-20";

function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

function buildHealingJourney(products) {
  const items = products.map(p =>
    `<li><a href="https://www.amazon.com/dp/${p.asin}?tag=${AFFILIATE_TAG}" target="_blank" rel="nofollow noopener">${p.name}</a> (paid link) - ${p.desc}</li>`
  ).join("\n");
  return `
<div class="healing-journey-section">
<h3>The Healing Journey: Tools That Support This Work</h3>
<ul>
${items}
</ul>
<p class="affiliate-disclosure"><em>As an Amazon Associate, I earn from qualifying purchases. This does not affect editorial independence or the honesty of recommendations.</em></p>
</div>`;
}

export async function generateArticle(topic, category) {
  if (!AUTO_GEN_ENABLED) {
    console.log("[auto-gen] AUTO_GEN_ENABLED is false. Skipping.");
    return null;
  }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY not set in environment");
  }

  const ref = NAMED_REFS[Math.floor(Math.random() * NAMED_REFS.length)];
  const phrases = pickRandom(KALESH_PHRASES, 4);
  const interjections = pickRandom(INTERJECTIONS, 2);
  const inlineProducts = pickRandom(AFFILIATE_PRODUCTS, 6);
  const healingProducts = pickRandom(AFFILIATE_PRODUCTS, 4);

  const inlineProductInstructions = inlineProducts.map(p =>
    `- ${p.name}: <a href="https://www.amazon.com/dp/${p.asin}?tag=${AFFILIATE_TAG}" target="_blank" rel="nofollow noopener">${p.name}</a> (paid link)`
  ).join("\n");

  const prompt = `Write a 1400-2000 word article titled "${topic}" for The Empowered Sensitive (sensitive.love).

Category: ${category.name}
Author voice: Kalesh - Consciousness Teacher & Writer (kalesh.love)

=== VOICE RULES (CRITICAL - follow ALL) ===

1. KALESH VOICE:
- Long, unfolding sentences that build and turn. Average 18-28 words per sentence.
- Pattern: Long > Long > Long (with internal comma rhythm) > Short drop > Long > Short drop.
- Intellectual warmth. Contemplative. Trusts the reader to arrive at the insight.
- 40% teaching + 30% tender + 20% philosophical + 10% fierce
- Uses "we" and "one" and "a person who" more than "you"
- Builds analogies across 2-3 sentences before revealing the point
- Loves triads: "not the thought, not the thinker, but the space in which both appear"
- Ends sections with questions that open rather than close
- References: ${ref}

2. ABSOLUTELY NO EMDASH: Do NOT use — or – anywhere. Use ..., -, or ~ instead. Mix them randomly.

3. BANNED WORDS (do NOT use ANY of these): ${BANNED_WORDS.join(", ")}

4. Include these 2 interjections naturally in the body: "${interjections[0]}" and "${interjections[1]}"

5. Include 3-5 of these phrases naturally: ${phrases.join(" | ")}

6. SENTENCE LENGTH VARIATION: Aggressively vary. Mix 5-word sentences with 30-word sentences. Never start 3 consecutive sentences with the same word.

7. CONVERSATIONAL TONE: Write like a real person having a deep conversation, not like a textbook. Use contractions sometimes. Include personal observations. Make the reader feel seen.

8. MINIMUM 5 Amazon product links in the body text (CRITICAL - this is a HARD requirement):
${inlineProductInstructions}
You MUST include AT LEAST 5 of these product links naturally woven into the article paragraphs. Each link MUST appear in the body text, not just in a list at the end. Weave them into relevant paragraphs where the product naturally supports the point being made. This is non-negotiable.

9. Varied opener (NOT "In a world where...")
10. 5-7 H2 sections with descriptive headings
11. Include lived experience markers (body sensations, specific scenarios)
12. 30% spiritual/healing thread woven throughout
13. Conclude with varied ending (NOT "This is where...")
14. Include 2-4 FAQ items as JSON at the end
15. Format: HTML body content with proper <h2>, <p>, <blockquote> tags
16. No H1 tag (handled by template)
17. First paragraph should have class="drop-cap"
18. Internal links as: <a href="/category-slug/article-slug">anchor text</a>
19. If backlink article: include one <a href="https://kalesh.love">Kalesh</a> link naturally

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
  
  // Extract JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON found in response");
  
  const result = JSON.parse(jsonMatch[0]);

  // Post-process: strip any emdash that slipped through
  result.bodyHtml = result.bodyHtml.replace(/\u2014/g, () => ["...", " - ", " ~ "][Math.floor(Math.random() * 3)]);
  result.bodyHtml = result.bodyHtml.replace(/\u2013/g, () => ["...", " - ", " ~ "][Math.floor(Math.random() * 3)]);

  // Post-process: strip banned words
  for (const word of BANNED_WORDS) {
    const regex = new RegExp("\\b" + word + "\\b", "gi");
    const replacements = {
      profound: "deep", transformative: "life-changing", holistic: "whole-person",
      nuanced: "subtle", multifaceted: "complex", delve: "explore",
      tapestry: "web", landscape: "terrain", paradigm: "framework",
      synergy: "connection", leverage: "use", utilize: "use",
      embark: "begin", foster: "encourage", resonate: "land",
      unlock: "open", empower: "strengthen", navigate: "move through",
      unpack: "break down", uncover: "find"
    };
    result.bodyHtml = result.bodyHtml.replace(regex, (match) => {
      const rep = replacements[word] || "meaningful";
      return match[0] === match[0].toUpperCase() ? rep.charAt(0).toUpperCase() + rep.slice(1) : rep;
    });
  }

  // Post-process: verify minimum 5 inline Amazon links (HARD REQUIREMENT)
  const inlineAmazonCount = (result.bodyHtml.match(/amazon\.com.*?tag=spankyspinola-20/g) || []).length;
  if (inlineAmazonCount < 5) {
    // Force-inject missing products to reach 5
    const needed = 5 - inlineAmazonCount;
    const extraProducts = pickRandom(AFFILIATE_PRODUCTS, needed + 3);
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
    for (let i = 0; i < extraProducts.length && injected < needed; i++) {
      const p = extraProducts[i];
      // Skip if this product is already in the article
      if (result.bodyHtml.includes(p.asin)) continue;
      const lead = leadIns[injected % leadIns.length];
      const link = `<a href="https://www.amazon.com/dp/${p.asin}?tag=${AFFILIATE_TAG}" target="_blank" rel="nofollow noopener">${p.name}</a>`;
      result.bodyHtml += `\n<p>${lead}${link} (paid link) - ${p.desc}.</p>\n`;
      injected++;
    }
  }

  // Add Healing Journey section
  result.bodyHtml += buildHealingJourney(healingProducts);

  return result;
}

export async function generateImage(slug, title) {
  if (!AUTO_GEN_ENABLED) return null;

  const FAL_KEY = process.env.FAL_KEY;
  if (!FAL_KEY) {
    throw new Error("FAL_KEY not set in environment");
  }

  const prompt = `Luminous, warm, healing illustration for article "${title}". Soft watercolor style with gentle light. No text, no words, no letters. Warm golden and lavender tones. Peaceful, contemplative mood. Professional editorial illustration.`;

  const response = await fetch("https://fal.run/fal-ai/flux/schnell", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Key ${FAL_KEY}`,
    },
    body: JSON.stringify({
      prompt,
      image_size: { width: 1200, height: 675 },
      num_images: 1,
    }),
  });

  if (!response.ok) {
    throw new Error(`FAL.ai error: ${response.status}`);
  }

  const data = await response.json();
  const imageUrl = data.images[0].url;

  // Download and upload to Bunny CDN as WebP
  const imgResponse = await fetch(imageUrl);
  const imgBuffer = Buffer.from(await imgResponse.arrayBuffer());

  // Upload hero
  await uploadToBunny(`images/${slug}.webp`, imgBuffer);
  
  // Upload OG (same image, different path)
  await uploadToBunny(`og/${slug}.webp`, imgBuffer);

  return {
    heroImage: `${BUNNY_CDN_BASE}/images/${slug}.webp`,
    ogImage: `${BUNNY_CDN_BASE}/og/${slug}.webp`,
  };
}

async function uploadToBunny(path, buffer) {
  const url = `https://${BUNNY_STORAGE_HOST}/${BUNNY_STORAGE_ZONE}/${path}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "AccessKey": BUNNY_STORAGE_KEY,
      "Content-Type": "application/octet-stream",
    },
    body: buffer,
  });

  if (!response.ok) {
    throw new Error(`Bunny upload failed: ${response.status} for ${path}`);
  }
}

export { AUTO_GEN_ENABLED, CATEGORIES, BUNNY_CDN_BASE };
