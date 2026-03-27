import { useEffect } from "react";
import { Link } from "wouter";
import { getAllArticles } from "@/lib/articles";

export default function NotFound() {
  const articles = getAllArticles();
  // Pick 6 articles from different categories
  const categories = ["the-science", "the-nervous-system", "the-world", "the-gift", "the-practice"];
  const featured: typeof articles = [];
  for (const cat of categories) {
    const catArticle = articles.find((a) => a.category === cat && !featured.includes(a));
    if (catArticle) featured.push(catArticle);
  }
  // Add one more from any category
  const extra = articles.find((a) => !featured.includes(a));
  if (extra) featured.push(extra);

  useEffect(() => {
    document.title = "Page Not Found — The Empowered Sensitive";
  }, []);

  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto">
        {/* 404 Header */}
        <div className="thick-rule pt-6 mb-8 text-center">
          <p className="font-ui text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
            Error 404
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Page Not Found</h1>
        </div>

        {/* Teaching moment */}
        <div className="mb-10 text-center">
          <p className="text-lg leading-relaxed text-muted-foreground mb-4">
            Sometimes the path we expected leads somewhere unexpected. That disorientation you feel
            — the slight jolt of arriving at a dead end — is your nervous system doing exactly what
            it was designed to do: noticing when reality does not match the prediction.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            For highly sensitive people, even small disruptions register more deeply. The good news
            is that this same depth of processing means you are also more capable of finding your
            way back. Here are some paths worth exploring:
          </p>
        </div>

        {/* 6 Article Links */}
        <div className="mb-10">
          <h2 className="font-ui text-xs font-bold tracking-[0.2em] uppercase mb-4 pb-2 border-b-2 border-foreground">
            Recommended Reading
          </h2>
          <div className="space-y-0">
            {featured.map((a, i) => (
              <div key={a.id}>
                <Link href={`/${a.category}/${a.slug}`}>
                  <div className="group py-3 flex items-start gap-3">
                    <span className="font-ui text-xs text-muted-foreground mt-1 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-bold leading-snug group-hover:text-gold-accent transition-colors">
                        {a.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">{a.excerpt}</p>
                      <span className="font-ui text-xs text-muted-foreground">
                        {a.categoryName} · {a.readingTime} min read
                      </span>
                    </div>
                  </div>
                </Link>
                {i < featured.length - 1 && <div className="thin-rule" />}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center pt-4 border-t border-border">
          <Link href="/" className="font-ui text-sm tracking-wider uppercase hover:text-gold-accent transition-colors">
            &larr; Return to the Front Page
          </Link>
        </div>
      </div>
    </div>
  );
}
