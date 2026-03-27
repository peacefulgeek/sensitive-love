import { Link } from "wouter";
import { getAllArticles, getRecentArticles, CATEGORIES, type ArticleIndex } from "@/lib/articles";
import { useEffect } from "react";

function ArticleCard({ article, featured = false }: { article: ArticleIndex; featured?: boolean }) {
  return (
    <article className={featured ? "mb-6" : "mb-4"}>
      <Link href={`/${article.category}/${article.slug}`}>
        <div className="group">
          {featured && (
            <div className="aspect-[16/9] overflow-hidden mb-3">
              <img
                src={article.heroImage}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
          )}
          <div className="font-ui">
            <span className="category-badge text-muted-foreground mb-2 inline-block">
              {article.categoryName}
            </span>
          </div>
          <h3
            className={`font-bold leading-tight group-hover:text-gold-accent transition-colors ${
              featured ? "text-2xl md:text-3xl mb-2" : "text-base md:text-lg mb-1"
            }`}
          >
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>
          <div className="font-ui text-xs text-muted-foreground mt-2 flex gap-3">
            <span>{article.readingTime} min read</span>
            <span>{article.dateHuman}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function SectionDivider({ title }: { title: string }) {
  return (
    <div className="thick-rule mt-10 mb-6 pt-3">
      <h2 className="font-ui text-xs font-bold tracking-[0.2em] uppercase">{title}</h2>
    </div>
  );
}

export default function Home() {
  const allArticles = getAllArticles();
  const recent = getRecentArticles(30);

  // Featured articles (first 5 most recent)
  const featured = recent.slice(0, 1);
  const secondary = recent.slice(1, 4);
  const tertiary = recent.slice(4, 10);
  const more = recent.slice(10, 22);

  // Category highlights
  const categoryHighlights = CATEGORIES.map((cat) => ({
    ...cat,
    articles: allArticles.filter((a) => a.category === cat.slug).slice(0, 4),
  }));

  useEffect(() => {
    document.title = "The Empowered Sensitive — Evidence-Based Guidance for Highly Sensitive People";
  }, []);

  return (
    <div className="container">
      {/* Lead story section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0 py-6 md:py-8">
        {/* Main lead */}
        <div className="md:col-span-7 md:pr-6 md:column-rule">
          {featured.map((a) => (
            <ArticleCard key={a.id} article={a} featured />
          ))}
        </div>

        {/* Secondary stories */}
        <div className="md:col-span-5 md:pl-6">
          {secondary.map((a, i) => (
            <div key={a.id}>
              <ArticleCard article={a} />
              {i < secondary.length - 1 && <div className="thin-rule my-4" />}
            </div>
          ))}
        </div>
      </div>

      {/* Thin rule */}
      <div className="thick-rule" />

      {/* Tertiary grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 py-6">
        {tertiary.map((a, i) => (
          <div
            key={a.id}
            className={`px-4 py-3 ${
              i % 3 !== 2 ? "lg:column-rule" : ""
            } ${i % 2 !== 1 ? "sm:column-rule lg:border-r-0" : "sm:border-r-0"} ${
              i % 3 !== 2 ? "lg:border-r lg:border-border" : ""
            }`}
          >
            <ArticleCard article={a} />
          </div>
        ))}
      </div>

      {/* Category sections */}
      {categoryHighlights.map((cat) => (
        <section key={cat.slug}>
          <SectionDivider title={cat.name} />
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl">{cat.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {cat.articles.map((a, i) => (
              <div
                key={a.id}
                className={`px-3 py-2 ${i < cat.articles.length - 1 ? "lg:column-rule" : ""}`}
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
                    <h3 className="text-sm font-bold leading-snug group-hover:text-gold-accent transition-colors">
                      {a.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 font-ui">
                      {a.readingTime} min read
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-4 mb-2">
            <Link
              href={`/${cat.slug}`}
              className="font-ui text-xs tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              View all 60 articles in {cat.name} &rarr;
            </Link>
          </div>
        </section>
      ))}

      {/* More stories */}
      {more.length > 0 && (
        <>
          <SectionDivider title="More Stories" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 pb-8">
            {more.map((a, i) => (
              <div key={a.id} className={`px-3 py-2 ${i % 4 !== 3 ? "lg:column-rule" : ""}`}>
                <ArticleCard article={a} />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Stats bar */}
      <div className="thick-rule py-6 text-center">
        <div className="flex flex-wrap justify-center gap-8 font-ui text-sm text-muted-foreground">
          <div>
            <span className="text-2xl font-bold text-foreground block">300</span>
            Articles
          </div>
          <div>
            <span className="text-2xl font-bold text-foreground block">5</span>
            Categories
          </div>
          <div>
            <span className="text-2xl font-bold text-foreground block">60</span>
            Per Category
          </div>
          <div>
            <span className="text-2xl font-bold text-foreground block">Research</span>
            Backed
          </div>
        </div>
      </div>
    </div>
  );
}
