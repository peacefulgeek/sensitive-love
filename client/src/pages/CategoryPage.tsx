import { Link } from "wouter";
import { getArticlesByCategory, getCategoryInfo, type ArticleIndex } from "@/lib/articles";
import { useEffect, useState } from "react";

export default function CategoryPage({ category }: { category: string }) {
  const catInfo = getCategoryInfo(category);
  const articles = getArticlesByCategory(category);
  const [page, setPage] = useState(1);
  const perPage = 12;
  const totalPages = Math.ceil(articles.length / perPage);
  const displayed = articles.slice(0, page * perPage);

  useEffect(() => {
    if (catInfo) {
      document.title = `${catInfo.name} — The Empowered Sensitive`;
    }
    window.scrollTo(0, 0);
    setPage(1);
  }, [category]);

  if (!catInfo) return <div className="container py-16 text-center">Category not found.</div>;

  const featured = articles[0];
  const rest = displayed.slice(1);

  return (
    <div className="container py-8">
      {/* Category header */}
      <div className="thick-rule pt-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{catInfo.name}</h1>
        <p className="text-muted-foreground max-w-2xl">{catInfo.description}</p>
        <p className="font-ui text-xs text-muted-foreground mt-2">
          {articles.length} articles
        </p>
      </div>

      {/* Featured article */}
      {featured && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 mb-8 pb-8 border-b border-border">
          <div className="md:col-span-7 md:pr-6 md:column-rule">
            <Link href={`/${featured.category}/${featured.slug}`}>
              <div className="group">
                <div className="aspect-[16/9] overflow-hidden mb-4">
                  <img
                    src={featured.heroImage}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-gold-accent transition-colors mb-2">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{featured.excerpt}</p>
                <div className="font-ui text-xs text-muted-foreground mt-3 flex gap-3">
                  <span>{featured.readingTime} min read</span>
                  <span>{featured.dateHuman}</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="md:col-span-5 md:pl-6 mt-6 md:mt-0">
            {articles.slice(1, 4).map((a, i) => (
              <div key={a.id}>
                <Link href={`/${a.category}/${a.slug}`}>
                  <div className="group py-3">
                    <h3 className="font-bold leading-snug group-hover:text-gold-accent transition-colors">
                      {a.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{a.excerpt}</p>
                    <span className="font-ui text-xs text-muted-foreground mt-1 inline-block">
                      {a.readingTime} min
                    </span>
                  </div>
                </Link>
                {i < 2 && <div className="thin-rule" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Article grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
        {rest.map((a, i) => (
          <div
            key={a.id}
            className={`px-3 py-4 ${i % 3 !== 2 ? "lg:column-rule" : ""} ${
              i % 2 !== 1 ? "sm:column-rule lg:border-r-0" : "sm:border-r-0"
            } ${i % 3 !== 2 ? "lg:border-r lg:border-border" : ""}`}
          >
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
                <h3 className="text-base font-bold leading-snug group-hover:text-gold-accent transition-colors">
                  {a.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{a.excerpt}</p>
                <div className="font-ui text-xs text-muted-foreground mt-2 flex gap-3">
                  <span>{a.readingTime} min read</span>
                  <span>{a.dateHuman}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Load more */}
      {page < totalPages && (
        <div className="text-center py-8">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="font-ui text-sm tracking-wider uppercase px-6 py-2 border border-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            Load More Articles
          </button>
        </div>
      )}
    </div>
  );
}
