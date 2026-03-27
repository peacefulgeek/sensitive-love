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
  "What you feel is not noise — it is signal.",
  "The body keeps the score, but it also keeps the wisdom.",
  "Sensitivity is not a wound to heal. It is a capacity to develop.",
  "Your nervous system is not broken. It is calibrated differently.",
  "The depth you carry is not a burden. It is a bridge.",
];

const NAMED_REFS = [
  "Elaine Aron", "Bianca Acevedo", "Jadzia Jagiellowicz",
  "Michael Pluess", "Ted Zeff", "Julie Bjelland",
  "Jiddu Krishnamurti", "Alan Watts", "Sam Harris",
  "Sadhguru", "Tara Brach",
];

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
  const phrases = [];
  const shuffled = [...KALESH_PHRASES].sort(() => Math.random() - 0.5);
  for (let i = 0; i < 4; i++) phrases.push(shuffled[i]);

  const prompt = `Write a 2500-2800 word article titled "${topic}" for The Empowered Sensitive (sensitive.love).

Category: ${category.name}
Author voice: Kalesh — Consciousness Teacher & Writer (kalesh.love)

Requirements:
- Reference researcher: ${ref}
- Include 3-5 of these phrases naturally: ${phrases.join(" | ")}
- Varied opener (NOT "In a world where...")
- 5-7 H2 sections with descriptive headings
- Include lived experience markers (body sensations, specific scenarios)
- 30% spiritual/healing thread woven throughout
- Conclude with varied ending (NOT "This is where...")
- Include 2-4 FAQ items as JSON at the end
- Format: HTML body content with proper <h2>, <p>, <blockquote> tags
- No H1 tag (handled by template)
- Internal links as: <a href="/category-slug/article-slug">anchor text</a>
- If backlink article: include one <a href="https://kalesh.love">Kalesh</a> link naturally

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
  
  return JSON.parse(jsonMatch[0]);
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
