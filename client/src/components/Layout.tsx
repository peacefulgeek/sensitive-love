import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const CATEGORIES = [
  { slug: "the-science", name: "The Science", short: "Science" },
  { slug: "the-nervous-system", name: "The Nervous System", short: "Nervous System" },
  { slug: "the-world", name: "The World", short: "World" },
  { slug: "the-gift", name: "The Gift", short: "Gift" },
  { slug: "the-practice", name: "The Practice", short: "Practice" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const today = new Date();
  const edition = `Vol. I, No. ${Math.floor((today.getTime() - new Date("2025-01-01").getTime()) / (1000 * 60 * 60 * 24))}`;
  const dateStr = today.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Masthead */}
      <header className="masthead">
        {/* Top rule with edition info */}
        <div className="masthead-rule py-1.5 px-4 flex justify-between items-center font-ui text-xs tracking-wider text-muted-foreground">
          <span className="uppercase">{edition}</span>
          <span>{dateStr}</span>
          <span className="uppercase">sensitive.love</span>
        </div>

        {/* Main masthead */}
        <div className="py-6 md:py-8 text-center border-b border-border">
          <Link href="/">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none">
              The Empowered Sensitive
            </h1>
          </Link>
          <p className="mt-2 font-ui text-xs md:text-sm tracking-[0.2em] uppercase text-muted-foreground">
            Evidence-Based Guidance for Highly Sensitive People
          </p>
          <p className="mt-1 font-ui text-xs tracking-wider text-muted-foreground">
            By{" "}
            <a
              href="https://kalesh.love"
              className="gold-accent hover:underline"
              target="_blank"
              rel="noopener"
            >
              Kalesh
            </a>
            {" "}— Consciousness Teacher &amp; Writer
          </p>
        </div>

        {/* Navigation */}
        <nav className="border-b border-border">
          {/* Desktop nav */}
          <div className="hidden md:flex justify-center items-center gap-0 py-0">
            {CATEGORIES.map((cat, i) => (
              <div key={cat.slug} className="flex items-center">
                {i > 0 && <span className="text-border mx-0">|</span>}
                <Link
                  href={`/${cat.slug}`}
                  className={`font-ui text-xs tracking-[0.15em] uppercase py-3 px-4 transition-colors hover:text-gold-accent ${
                    location.startsWith(`/${cat.slug}`)
                      ? "text-foreground font-bold border-b-2 border-current"
                      : "text-muted-foreground"
                  }`}
                >
                  {cat.name}
                </Link>
              </div>
            ))}
            <span className="text-border mx-0">|</span>
            <Link
              href="/about"
              className={`font-ui text-xs tracking-[0.15em] uppercase py-3 px-4 transition-colors hover:text-gold-accent ${
                location === "/about" ? "text-foreground font-bold border-b-2 border-current" : "text-muted-foreground"
              }`}
            >
              About
            </Link>
          </div>

          {/* Mobile nav */}
          <div className="md:hidden flex justify-between items-center px-4 py-3">
            <span className="font-ui text-xs tracking-wider uppercase text-muted-foreground">
              Navigation
            </span>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          {menuOpen && (
            <div className="md:hidden border-t border-border">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className={`block font-ui text-sm tracking-wider py-3 px-6 border-b border-border/50 transition-colors ${
                    location.startsWith(`/${cat.slug}`)
                      ? "text-foreground font-semibold bg-secondary/50"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                href="/about"
                className="block font-ui text-sm tracking-wider py-3 px-6 text-muted-foreground"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
            </div>
          )}
        </nav>
      </header>

      {/* Main content */}
      <main className="min-h-[60vh]">{children}</main>

      {/* Footer */}
      <footer className="mt-16 border-t-2 border-foreground">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About */}
            <div>
              <h3 className="font-bold text-lg mb-3">The Empowered Sensitive</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Evidence-based articles on sensory processing sensitivity, nervous system regulation,
                and thriving as a highly sensitive person. 300 research-backed explorations across
                five dimensions of the HSP experience.
              </p>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-ui font-bold text-sm uppercase tracking-wider mb-3">Categories</h3>
              <ul className="space-y-1.5">
                {CATEGORIES.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/${cat.slug}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {cat.name}
                    </Link>
                    <span className="text-xs text-muted-foreground/60 ml-2">60 articles</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Author */}
            <div>
              <h3 className="font-ui font-bold text-sm uppercase tracking-wider mb-3">Author</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                Written by{" "}
                <a href="https://kalesh.love" className="gold-accent hover:underline" target="_blank" rel="noopener">
                  Kalesh
                </a>
                , Consciousness Teacher &amp; Writer.
              </p>
              <div className="flex gap-4 mt-3">
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About
                </Link>
                <Link href="/sitemap" className="text-sm text-muted-foreground hover:text-foreground">
                  Sitemap
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom rule */}
          <div className="thin-rule mt-8 pt-4 flex flex-col md:flex-row justify-between items-center gap-2 font-ui text-xs text-muted-foreground">
            <span>&copy; {today.getFullYear()} The Empowered Sensitive. All rights reserved.</span>
            <span>
              <a href="https://kalesh.love" className="hover:text-foreground" target="_blank" rel="noopener">
                kalesh.love
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
