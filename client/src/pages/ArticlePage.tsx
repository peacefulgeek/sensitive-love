import { Link } from "wouter";
import { useEffect, useState } from "react";
import { getFullArticle, getRelatedArticles, getCategoryInfo, type ArticleIndex } from "@/lib/articles";
import { ArrowLeft, Clock, Calendar, ChevronRight } from "lucide-react";

interface ArticleData {
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
  bodyHtml: string;
  toc: { id: string; title: string }[];
  faqs: { q: string; a: string }[];
  internalLinks: { slug: string; title: string; category: string }[];
  actualWordCount: number;
}

export default function ArticlePage({ category, slug }: { category: string; slug: string }) {
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState<ArticleIndex[]>([]);

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);

    getFullArticle(category, slug).then((data) => {
      setArticle(data as any);
      setLoading(false);
      if (data) {
        document.title = `${data.title} — The Empowered Sensitive`;
        // Update OG meta tags
        updateMeta("og:title", data.title);
        updateMeta("og:description", data.metaDescription);
        updateMeta("og:image", data.ogImage);
        updateMeta("og:url", `https://sensitive.love/${category}/${slug}`);
        updateMeta("og:type", "article");
        updateMeta("twitter:title", data.title);
        updateMeta("twitter:description", data.metaDescription);
        updateMeta("twitter:image", data.ogImage);
        updateMeta("description", data.metaDescription);
      }
    });

    setRelated(getRelatedArticles(slug, category, 4));
  }, [category, slug]);

  if (loading) {
    return (
      <div className="container py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-3/4 mx-auto mb-4" />
          <div className="h-4 bg-muted rounded w-1/2 mx-auto mb-2" />
          <div className="h-4 bg-muted rounded w-1/3 mx-auto" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <Link href={`/${category}`} className="text-muted-foreground hover:text-foreground">
          &larr; Back to {getCategoryInfo(category)?.name || "category"}
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* JSON-LD for article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.metaDescription,
            image: article.ogImage,
            datePublished: article.dateISO,
            dateModified: article.dateISO,
            author: {
              "@type": "Person",
              name: "Kalesh",
              url: "https://kalesh.love",
              jobTitle: "Consciousness Teacher & Writer",
            },
            publisher: {
              "@type": "Organization",
              name: "The Empowered Sensitive",
              url: "https://sensitive.love",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://sensitive.love/${category}/${slug}`,
            },
            wordCount: article.actualWordCount,
            articleSection: article.categoryName,
            ...(article.faqs.length > 0 && {
              mainEntity: article.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.a,
                },
              })),
            }),
          }),
        }}
      />

      <article className="container">
        {/* Breadcrumb */}
        <nav className="py-4 font-ui text-xs text-muted-foreground flex items-center gap-1.5">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight size={12} />
          <Link href={`/${category}`} className="hover:text-foreground">
            {article.categoryName}
          </Link>
          <ChevronRight size={12} />
          <span className="text-foreground truncate max-w-[200px]">{article.title}</span>
        </nav>

        {/* Article header */}
        <header className="max-w-3xl mx-auto pb-6">
          <div className="mb-3">
            <span className="category-badge text-muted-foreground">{article.categoryName}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">{article.excerpt}</p>
          <div className="font-ui text-sm text-muted-foreground flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {article.dateHuman}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {article.readingTime} min read
            </span>
            <span>{article.actualWordCount.toLocaleString()} words</span>
            <span>
              By{" "}
              <a href="https://kalesh.love" className="gold-accent hover:underline" target="_blank" rel="noopener">
                Kalesh
              </a>
            </span>
          </div>
        </header>

        {/* Hero image */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={article.heroImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Article layout: content + sidebar */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Table of Contents - sidebar on desktop */}
          {article.toc.length > 0 && (
            <aside className="lg:col-span-3 order-2 lg:order-1">
              <div className="lg:sticky lg:top-4">
                <h4 className="font-ui text-xs font-bold tracking-wider uppercase mb-3 text-muted-foreground">
                  Contents
                </h4>
                <nav className="space-y-1.5">
                  {article.toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-xs text-muted-foreground hover:text-foreground transition-colors leading-snug font-ui"
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Article body */}
          <div className={`${article.toc.length > 0 ? "lg:col-span-9" : "lg:col-span-12"} order-1 lg:order-2`}>
            <div
              className="article-body drop-cap"
              dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
            />
          </div>
        </div>

        {/* Author box */}
        <div className="max-w-3xl mx-auto mt-12 pt-8 border-t-2 border-foreground">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold gold-accent">K</span>
            </div>
            <div>
              <h3 className="font-bold text-lg">
                <a href="https://kalesh.love" className="hover:text-gold-accent transition-colors" target="_blank" rel="noopener">
                  Kalesh
                </a>
              </h3>
              <p className="font-ui text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Consciousness Teacher &amp; Writer
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Kalesh writes at the intersection of contemplative wisdom and modern neuroscience,
                exploring how sensitivity, awareness, and embodied practice reshape our understanding
                of what it means to be human. His work bridges the gap between what the research
                reveals and what the body already knows.
              </p>
              <a
                href="https://kalesh.love"
                className="inline-block mt-2 font-ui text-xs tracking-wider uppercase gold-accent hover:underline"
                target="_blank"
                rel="noopener"
              >
                kalesh.love &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="max-w-4xl mx-auto mt-12">
            <div className="thick-rule pt-4 mb-6">
              <h2 className="font-ui text-xs font-bold tracking-[0.2em] uppercase">
                Related Reading
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
              {related.map((a, i) => (
                <div key={a.id} className={`px-3 py-2 ${i < related.length - 1 ? "lg:column-rule" : ""}`}>
                  <Link href={`/${a.category}/${a.slug}`}>
                    <div className="group">
                      <div className="aspect-[16/9] overflow-hidden mb-2">
                        <img
                          src={a.heroImage}
                          alt={a.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="text-sm font-bold leading-snug group-hover:text-gold-accent transition-colors">
                        {a.title}
                      </h3>
                      <span className="font-ui text-xs text-muted-foreground">{a.readingTime} min</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="max-w-3xl mx-auto mt-8 pb-8">
          <Link
            href={`/${category}`}
            className="font-ui text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to {article.categoryName}
          </Link>
        </div>
      </article>
    </>
  );
}

function updateMeta(name: string, content: string) {
  // Update both name and property meta tags
  let el = document.querySelector(`meta[property="${name}"]`) || document.querySelector(`meta[name="${name}"]`);
  if (el) {
    el.setAttribute("content", content);
  }
}
