import { useEffect } from "react";
import { Link } from "wouter";
import { getAllArticles, CATEGORIES } from "@/lib/articles";

export default function SitemapPage() {
  const articles = getAllArticles();

  useEffect(() => {
    document.title = "Sitemap — The Empowered Sensitive";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="thick-rule pt-4 mb-8">
          <h1 className="text-3xl font-bold mb-2">Sitemap</h1>
          <p className="text-muted-foreground">All 300 articles organized by category</p>
        </div>

        {/* Pages */}
        <section className="mb-8">
          <h2 className="font-ui text-xs font-bold tracking-[0.2em] uppercase mb-4 pb-2 border-b border-border">
            Pages
          </h2>
          <ul className="space-y-1 font-ui text-sm">
            <li><Link href="/" className="text-muted-foreground hover:text-foreground">Home</Link></li>
            <li><Link href="/about" className="text-muted-foreground hover:text-foreground">About</Link></li>
            {CATEGORIES.map((cat) => (
              <li key={cat.slug}>
                <Link href={`/${cat.slug}`} className="text-muted-foreground hover:text-foreground">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Articles by category */}
        {CATEGORIES.map((cat) => {
          const catArticles = articles.filter((a) => a.category === cat.slug);
          return (
            <section key={cat.slug} className="mb-8">
              <h2 className="font-ui text-xs font-bold tracking-[0.2em] uppercase mb-4 pb-2 border-b border-border">
                {cat.name} ({catArticles.length} articles)
              </h2>
              <ul className="space-y-1">
                {catArticles.map((a) => (
                  <li key={a.id} className="font-ui text-sm">
                    <Link
                      href={`/${a.category}/${a.slug}`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {a.title}
                    </Link>
                    <span className="text-xs text-muted-foreground/60 ml-2">{a.readingTime} min</span>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
