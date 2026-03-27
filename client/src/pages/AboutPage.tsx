import { useEffect } from "react";
import { Link } from "wouter";
import { CATEGORIES } from "@/lib/articles";

export default function AboutPage() {
  useEffect(() => {
    document.title = "About — The Empowered Sensitive";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="thick-rule pt-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">About This Publication</h1>
          <p className="text-muted-foreground">The Empowered Sensitive — Evidence-Based Guidance for Highly Sensitive People</p>
        </div>

        {/* Mission */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b border-border">Our Mission</h2>
          <div className="article-body">
            <p>
              The Empowered Sensitive exists to bridge the gap between what scientific research reveals about
              sensory processing sensitivity and what highly sensitive people actually need to thrive. We
              publish evidence-based articles that honor both the rigor of neuroscience and the lived reality
              of navigating the world with a finely tuned nervous system.
            </p>
            <p>
              Sensitivity is not a diagnosis. It is not a disorder. It is a trait — present in roughly 20-30%
              of the population — that shapes how deeply you process information, how strongly you respond to
              stimuli, and how profoundly you experience the texture of being alive. This publication treats
              that trait with the seriousness it deserves.
            </p>
          </div>
        </section>

        {/* About the Author */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b border-border">About the Author</h2>
          <div className="flex items-start gap-6 mb-6">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <span className="text-3xl font-bold gold-accent">K</span>
            </div>
            <div>
              <h3 className="text-lg font-bold">
                <a href="https://kalesh.love" className="hover:text-gold-accent transition-colors" target="_blank" rel="noopener">
                  Kalesh
                </a>
              </h3>
              <p className="font-ui text-sm text-muted-foreground uppercase tracking-wider">
                Consciousness Teacher &amp; Writer
              </p>
            </div>
          </div>
          <div className="article-body">
            <p>
              Kalesh writes at the intersection of contemplative wisdom and modern neuroscience, exploring
              how sensitivity, awareness, and embodied practice reshape our understanding of what it means
              to be human. His work bridges the gap between what the research reveals and what the body
              already knows.
            </p>
            <p>
              Drawing from decades of contemplative practice and deep engagement with the research literature
              on sensory processing sensitivity, Kalesh brings a perspective that is both rigorously informed
              and experientially grounded. His writing has been described as "what happens when someone who
              actually meditates reads the neuroscience papers" — precise without being clinical, warm without
              being sentimental.
            </p>
            <p>
              The Empowered Sensitive represents one dimension of Kalesh's broader exploration of consciousness,
              embodiment, and the quiet revolution that happens when people stop pathologizing their depth and
              start working with it.
            </p>
            <p>
              Learn more at{" "}
              <a href="https://kalesh.love" target="_blank" rel="noopener">kalesh.love</a>.
            </p>
          </div>
        </section>

        {/* The Five Dimensions */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b border-border">The Five Dimensions</h2>
          <p className="text-muted-foreground mb-6">
            Our 300 articles are organized across five dimensions of the HSP experience, each containing
            60 deeply researched explorations.
          </p>
          <div className="space-y-4">
            {CATEGORIES.map((cat) => (
              <div key={cat.slug} className="py-3 border-b border-border/50">
                <Link href={`/${cat.slug}`}>
                  <h3 className="font-bold text-lg hover:text-gold-accent transition-colors">
                    {cat.name}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground mt-1">{cat.description}</p>
                <span className="font-ui text-xs text-muted-foreground">60 articles</span>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial Standards */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b border-border">Editorial Standards</h2>
          <div className="article-body">
            <p>
              Every article published on The Empowered Sensitive meets our Gold Standard requirements:
              research-backed claims with named researchers and specific findings, lived experience
              integration, practical application, and genuine depth of exploration. We do not publish
              surface-level listicles or recycled wellness content.
            </p>
            <p>
              Our articles reference the work of researchers including Dr. Elaine Aron, Dr. Bianca Acevedo,
              Dr. Michael Pluess, Dr. Stephen Porges, Dr. Dario Nardi, and many others whose work has
              advanced our understanding of sensory processing sensitivity, polyvagal theory, and the
              neuroscience of temperament.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b border-border">Connect</h2>
          <div className="article-body">
            <p>
              The Empowered Sensitive is a publication by{" "}
              <a href="https://kalesh.love" target="_blank" rel="noopener">Kalesh</a>.
              For inquiries, collaborations, or to learn more about Kalesh's work in consciousness
              teaching and writing, visit{" "}
              <a href="https://kalesh.love" target="_blank" rel="noopener">kalesh.love</a>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
