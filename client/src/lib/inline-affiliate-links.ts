// Inline Affiliate Links — keyword-based natural embedding
// Selects 4-6 products per article and generates soft, conversational recommendation sentences
// ALL ASINs verified live on Amazon — zero 404s

import { type Product, AFFILIATE_TAG, matchProducts, PRODUCT_CATALOG } from "./product-catalog";

const SOFT_INTROS = [
  "One option that many people like is",
  "A tool that often helps with this is",
  "Something worth considering might be",
  "For those looking for a simple solution, this works well:",
  "You could also try",
  "A popular choice for situations like this is",
  "Many sensitive people find relief with",
  "One thing that tends to support this process is",
  "If you are looking for something practical, consider",
  "A resource that comes up often in this context is",
];

function pickIntro(index: number): string {
  return SOFT_INTROS[index % SOFT_INTROS.length];
}

export interface InlineLink {
  html: string;
  product: Product;
}

export function generateInlineLinks(
  title: string,
  category: string,
  tags: string[]
): InlineLink[] {
  const matched = matchProducts(title, category, tags);
  // Pick 4-6 products (minimum 4, target 5)
  const count = Math.min(Math.max(4, Math.floor(matched.length / 2)), 6);
  const selected = matched.slice(0, count);

  return selected.map((product, i) => {
    const url = `https://www.amazon.com/dp/${product.asin}?tag=${AFFILIATE_TAG}`;
    const intro = pickIntro(i);
    const html = `<p class="affiliate-recommendation">${intro} <a href="${url}" target="_blank" rel="nofollow noopener">${product.name}</a> (paid link). ${product.description}.</p>`;
    return { html, product };
  });
}

export function generateHealingJourneySection(
  title: string,
  category: string,
  tags: string[]
): string {
  const matched = matchProducts(title, category, tags);
  // Pick 3-4 for the bottom section
  const selected = matched.slice(0, Math.min(4, matched.length));
  
  if (selected.length === 0) {
    // Fallback: pick from general categories
    const fallback = PRODUCT_CATALOG.filter(p => 
      p.category === "books-hsp" || p.category === "meditation" || p.category === "comfort"
    ).slice(0, 3);
    if (fallback.length === 0) return "";
    return buildSection(fallback);
  }
  
  return buildSection(selected);
}

function buildSection(products: Product[]): string {
  const items = products.map(p => {
    const url = `https://www.amazon.com/dp/${p.asin}?tag=${AFFILIATE_TAG}`;
    return `<li><a href="${url}" target="_blank" rel="nofollow noopener">${p.name}</a> (paid link) - ${p.description}</li>`;
  }).join("\n");

  return `
<div class="healing-journey-section">
<h3>The Healing Journey: Tools That Support This Work</h3>
<ul>
${items}
</ul>
<p class="affiliate-disclosure"><em>As an Amazon Associate, I earn from qualifying purchases. This does not affect editorial independence or the honesty of recommendations.</em></p>
</div>`;
}
