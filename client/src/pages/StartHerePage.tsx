import { useEffect } from "react";
import { Link } from "wouter";
import { getAllArticles, CATEGORIES } from "@/lib/articles";

export default function StartHerePage() {
  const articles = getAllArticles();

  useEffect(() => {
    document.title = "Start Here — The Empowered Sensitive";
    window.scrollTo(0, 0);
  }, []);

  // Pick one pillar article from each category (first published in each)
  const pillarArticles = CATEGORIES.map((cat) => {
    const catArticles = articles
      .filter((a) => a.category === cat.slug)
      .sort((a, b) => new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime());
    return catArticles[0];
  }).filter(Boolean);

  // Add one more cross-category article
  const extra = articles.find((a) => !pillarArticles.some((p) => p?.slug === a.slug));
  if (extra) pillarArticles.push(extra);

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="thick-rule pt-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Start Here</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            If you have recently discovered that you are a highly sensitive person — or if you have
            known for years but still feel like something is missing in how you understand your own
            experience — these articles are where to begin.
          </p>
        </div>

        {/* Site intro */}
        <div className="mb-10">
          <p className="leading-relaxed mb-4">
            The Empowered Sensitive publishes evidence-based articles on sensory processing sensitivity.
            We draw from neuroscience, psychology, and contemplative traditions to explore what it
            actually means to live with a nervous system that processes everything more deeply.
          </p>
          <p className="leading-relaxed mb-4">
            This is not a site about coping. It is a site about understanding — and through
            understanding, about thriving. The research is clear: sensitivity is not a disorder.
            It is a trait carried by roughly 20% of the population, with measurable neurological
            differences in how the brain processes sensory information, emotion, and subtlety.
          </p>
          <p className="leading-relaxed">
            Written by{" "}
            <a href="https://kalesh.love" className="gold-accent hover:underline" target="_blank" rel="noopener">
              Kalesh
            </a>
            , Consciousness Teacher &amp; Writer.
          </p>
        </div>

        {/* Pillar articles */}
        <div className="mb-10">
          <h2 className="font-ui text-xs font-bold tracking-[0.2em] uppercase mb-4 pb-2 border-b-2 border-foreground">
            Essential Reading
          </h2>
          <div className="space-y-0">
            {pillarArticles.map((a, i) => (
              <div key={a.slug}>
                <Link href={`/${a.category}/${a.slug}`}>
                  <div className="group py-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={a.heroImage}
                        alt={a.title}
                        width={120}
                        height={68}
                        loading="lazy"
                        className="flex-shrink-0 object-cover rounded-sm hidden sm:block"
                        style={{ width: 120, height: 68 }}
                      />
                      <div className="flex-1">
                        <span className="font-ui text-xs text-muted-foreground uppercase tracking-wider">
                          {a.categoryName}
                        </span>
                        <h3 className="font-bold text-lg leading-snug mt-0.5 group-hover:text-gold-accent transition-colors">
                          {a.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{a.excerpt}</p>
                        <span className="font-ui text-xs text-muted-foreground mt-1 inline-block">
                          {a.readingTime} min read
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
                {i < pillarArticles.length - 1 && <div className="thin-rule" />}
              </div>
            ))}
          </div>
        </div>

        {/* Categories overview */}
        <div className="mb-10">
          <h2 className="font-ui text-xs font-bold tracking-[0.2em] uppercase mb-4 pb-2 border-b-2 border-foreground">
            Explore by Category
          </h2>
          <div className="space-y-4">
            {CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={`/${cat.slug}`}>
                <div className="group py-2">
                  <h3 className="font-bold group-hover:text-gold-accent transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
