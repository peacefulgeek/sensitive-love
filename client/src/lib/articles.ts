import articlesIndex from "@/data/articles-index.json";

export interface ArticleIndex {
  id: number;
  title: string;
  slug: string;
  category: string;
  categoryName: string;
  excerpt: string;
  metaDescription: string;
  dateISO: string;
  dateHuman: string;
  readingTime: number;
  heroImage: string;
  ogImage: string;
  namedRef: string;
  openerType: string;
}

export interface ArticleFull extends ArticleIndex {
  bodyHtml: string;
  toc: { id: string; title: string }[];
  faqs: { q: string; a: string }[];
  internalLinks: { slug: string; title: string; category: string }[];
  namedRefObj: { name: string; topic: string };
  conclusionType: string;
  backlinkType: string;
  actualWordCount: number;
}

export const CATEGORIES = [
  { slug: "the-science", name: "The Science", description: "Neuroscience, genetics, and research behind sensory processing sensitivity" },
  { slug: "the-nervous-system", name: "The Nervous System", description: "Understanding and regulating the HSP autonomic nervous system" },
  { slug: "the-world", name: "The World", description: "Navigating relationships, work, and daily life as a highly sensitive person" },
  { slug: "the-gift", name: "The Gift", description: "The unique capacities, creativity, and depth that sensitivity brings" },
  { slug: "the-practice", name: "The Practice", description: "Practical tools, routines, and embodiment practices for HSPs" },
];

function filterPublished(articles: ArticleIndex[]): ArticleIndex[] {
  const now = new Date();
  return articles.filter((a) => new Date(a.dateISO) <= now);
}

export function getAllArticles(): ArticleIndex[] {
  return filterPublished(articlesIndex as ArticleIndex[]);
}

export function getAllArticlesUnfiltered(): ArticleIndex[] {
  return articlesIndex as ArticleIndex[];
}

export function getArticlesByCategory(category: string): ArticleIndex[] {
  return filterPublished((articlesIndex as ArticleIndex[]).filter((a) => a.category === category));
}

export function getCategoryInfo(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

// Lazy load full article data by category
const categoryDataCache: Record<string, any[]> = {};

export async function getFullArticle(category: string, slug: string): Promise<ArticleFull | null> {
  if (!categoryDataCache[category]) {
    try {
      const mod = await import(`@/data/articles-${category}.json`);
      categoryDataCache[category] = mod.default;
    } catch {
      return null;
    }
  }
  const articles = categoryDataCache[category];
  const article = articles.find((a: any) => a.slug === slug);
  return article || null;
}

export function getRecentArticles(count: number = 10): ArticleIndex[] {
  return filterPublished([...(articlesIndex as ArticleIndex[])])
    .sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime())
    .slice(0, count);
}

export function getRelatedArticles(currentSlug: string, category: string, count: number = 4): ArticleIndex[] {
  return filterPublished((articlesIndex as ArticleIndex[]))
    .filter((a) => a.slug !== currentSlug)
    .filter((a) => a.category === category)
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}
