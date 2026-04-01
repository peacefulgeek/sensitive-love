import { useEffect } from "react";
import { Link } from "wouter";

interface Product {
  name: string;
  description: string;
  url: string;
  isAmazon: boolean;
}

interface Category {
  title: string;
  products: Product[];
}

const TAG = "spankyspinola-20";

const CATEGORIES: Category[] = [
  {
    title: "Essential Books",
    products: [
      {
        name: "The Highly Sensitive Person by Elaine N. Aron",
        description:
          "The foundational text. If you read one book on sensitivity, this is it. Aron's research changed how we understand the trait \u2014 and this book makes that research accessible to anyone living with it.",
        url: `https://www.amazon.com/dp/0553062182?tag=${TAG}`,
        isAmazon: true,
      },
      {
        name: "The Highly Sensitive Person in Love by Elaine N. Aron",
        description:
          "Relationships are where sensitivity gets tested most. Aron walks through the specific dynamics that arise when one or both partners process deeply \u2014 and how to navigate them without losing yourself.",
        url: `https://www.amazon.com/dp/0767903358?tag=${TAG}`,
        isAmazon: true,
      },
      {
        name: "Sensitive by Jenn Granneman & Andre S\u00f3lo",
        description:
          "A modern reframing of sensitivity as a strength. Granneman and S\u00f3lo draw on the latest research to show that sensitive people are not fragile \u2014 they are among the most resilient and creative people in any room.",
        url: `https://www.amazon.com/dp/0593235010?tag=${TAG}`,
        isAmazon: true,
      },
      {
        name: "The Body Keeps the Score by Bessel van der Kolk",
        description:
          "Not specifically about HSPs, but essential reading for anyone whose nervous system carries more than it should. Van der Kolk's work on how trauma lives in the body changed the field.",
        url: `https://www.amazon.com/dp/0143127748?tag=${TAG}`,
        isAmazon: true,
      },
      {
        name: "Quiet by Susan Cain",
        description:
          "The book that made introversion visible. While sensitivity and introversion are different traits, they overlap significantly. Cain's research on the power of quiet temperaments is deeply validating.",
        url: `https://www.amazon.com/dp/0307352153?tag=${TAG}`,
        isAmazon: true,
      },
      {
        name: "Waking the Tiger by Peter Levine",
        description:
          "Levine's somatic experiencing framework is particularly powerful for sensitive people. This book explains how the body processes and releases stored stress \u2014 and why intellectual understanding alone is never enough.",
        url: `https://www.amazon.com/dp/155643233X?tag=${TAG}`,
        isAmazon: true,
      },
      {
        name: "The Empath's Survival Guide by Judith Orloff",
        description:
          "Orloff bridges clinical psychology with energetic sensitivity in a way that feels grounded. Practical strategies for empaths who absorb other people's emotions and need tools to stay centered.",
        url: `https://www.amazon.com/dp/1622036573?tag=${TAG}`,
        isAmazon: true,
      },
    ],
  },
  {
    title: "Journals & Workbooks",
    products: [
      {
        name: "The Highly Sensitive Person's Workbook by Elaine N. Aron",
        description:
          "The companion workbook to Aron's original book. Structured exercises that help you map your own sensitivity patterns, triggers, and strengths.",
        url: `https://www.amazon.com/dp/0767903374?tag=${TAG}`,
        isAmazon: true,
      },
      {
        name: "The Artist's Way by Julia Cameron",
        description:
          "Morning pages and artist dates \u2014 Cameron's framework unlocks the creative depth that sensitive people carry but often suppress. The daily writing practice alone is worth the price.",
        url: `https://www.amazon.com/dp/0143129252?tag=${TAG}`,
        isAmazon: true,
      },
      {
        name: "Leuchtturm1917 Dotted Notebook",
        description:
          "The best journal for freewriting, gratitude practice, or nervous system check-ins. Dot grid gives structure without rigidity \u2014 which is exactly what most sensitive people need.",
        url: `https://www.amazon.com/dp/B002TSIMW4?tag=${TAG}`,
        isAmazon: true,
      },
      {
        name: "Somatic Therapy Cards for Nervous System Regulation",
        description:
          "A deck of guided exercises for grounding, breathwork, and body awareness. Useful when you need a quick regulation practice but cannot remember what to do in the moment.",
        url: `https://www.amazon.com/dp/B0CVKM7QJH?tag=${TAG}`,
        isAmazon: true,
      },
    ],
  },
  {
    title: "Nervous System Regulation Tools",
    products: [
      {
        name: "Weighted Blanket (15\u201320 lbs)",
        description:
          "Deep pressure stimulation activates the parasympathetic nervous system. A weighted blanket is the single most effective physical tool for calming an overstimulated HSP nervous system. We recommend 10% of your body weight.",
        url: `https://www.amazon.com/dp/B073429DV2?tag=${TAG}`,
        isAmazon: true,
      },
      {
        name: "Loop Quiet Ear Plugs",
        description:
          "These reduce noise by 26dB without blocking conversation entirely. Essential for sensitive people in open offices, restaurants, or any environment where sound accumulates faster than you can process it.",
        url: `https://www.amazon.com/dp/B0B1NF6GFQ?tag=${TAG}`,
        isAmazon: true,
      },
      {
        name: "Muse 2 Brain Sensing Headband",
        description:
          "Real-time neurofeedback during meditation. For HSPs who struggle with racing thoughts, the Muse gives concrete feedback on when your brain is settling \u2014 which makes the invisible visible.",
        url: `https://www.amazon.com/dp/B07HL2S9GQ?tag=${TAG}`,
        isAmazon: true,
      },
      {
        name: "Acupressure Mat and Pillow Set",
        description:
          "Lying on an acupressure mat for 15\u201320 minutes triggers endorphin release and deep relaxation. It feels intense for the first minute, then the nervous system surrenders.",
        url: `https://www.amazon.com/dp/B01BZGYLQE?tag=${TAG}`,
        isAmazon: true,
      },
      {
        name: "Sensory Brush for Wilbarger Protocol",
        description:
          "Originally designed for occupational therapy, sensory brushing helps desensitize an overactive tactile system. Gentle, rhythmic brushing on the arms and legs can reset sensory processing in minutes.",
        url: `https://www.amazon.com/dp/B01MUCZZ6E?tag=${TAG}`,
        isAmazon: true,
      },
    ],
  },
  {
    title: "Meditation & Breathwork",
    products: [
      {
        name: "Retrospec Sedona Zafu Meditation Cushion",
        description:
          "Buckwheat hull filling, cotton cover, proper height for cross-legged sitting. A good cushion removes the physical discomfort that pulls sensitive people out of meditation before they settle.",
        url: `https://www.amazon.com/dp/B077P4336Y?tag=${TAG}`,
        isAmazon: true,
      },
      {
        name: "Insight Timer App",
        description:
          "Free meditation app with over 150,000 guided meditations. The timer function with ambient sounds is particularly useful for HSPs who prefer unguided practice.",
        url: "https://insighttimer.com",
        isAmazon: false,
      },
      {
        name: "Breath by James Nestor",
        description:
          "Nestor's investigation into the science of breathing is revelatory. For sensitive people, breathwork is one of the most direct pathways to nervous system regulation \u2014 and this book explains exactly why.",
        url: `https://www.amazon.com/dp/0735213615?tag=${TAG}`,
        isAmazon: true,
      },
      {
        name: "Tibetan Singing Bowl Set",
        description:
          "Sound vibration is a powerful regulation tool for sensitive nervous systems. A quality singing bowl creates resonance that the body feels as much as the ears hear.",
        url: `https://www.amazon.com/dp/B07QMJNBPF?tag=${TAG}`,
        isAmazon: true,
      },
    ],
  },
  {
    title: "Supplements & Nutrition",
    products: [
      {
        name: "Pure Encapsulations Magnesium Glycinate",
        description:
          "Magnesium glycinate is the most bioavailable and gentle form. It supports muscle relaxation, sleep quality, and nervous system calm. Many HSPs report it is the single supplement that makes the most noticeable difference.",
        url: `https://www.amazon.com/dp/B07P5K7DQP?tag=${TAG}`,
        isAmazon: true,
      },
      {
        name: "L-Theanine by NOW Foods",
        description:
          "An amino acid found naturally in green tea that promotes calm alertness without drowsiness. Useful for sensitive people who need to stay focused in stimulating environments.",
        url: `https://www.amazon.com/dp/B0013OQGO6?tag=${TAG}`,
        isAmazon: true,
      },
      {
        name: "Organic Ashwagandha by Garden of Life",
        description:
          "An adaptogenic herb with strong evidence for reducing cortisol and supporting stress resilience. Particularly helpful for HSPs whose nervous systems run hot from chronic overstimulation.",
        url: `https://www.amazon.com/dp/B07BKQNBSP?tag=${TAG}`,
        isAmazon: true,
      },
      {
        name: "Omega-3 Fish Oil by Nordic Naturals",
        description:
          "High-quality omega-3s support brain health and reduce inflammation. Research links omega-3 intake to improved mood regulation \u2014 which matters more when your system processes emotions at higher resolution.",
        url: `https://www.amazon.com/dp/B002CQU564?tag=${TAG}`,
        isAmazon: true,
      },
    ],
  },
  {
    title: "Environment & Self-Care",
    products: [
      {
        name: "Philips SmartSleep Wake-Up Light",
        description:
          "Simulates sunrise to wake you gradually instead of jolting you awake with an alarm. For sensitive nervous systems, how you wake up determines the baseline for the entire day.",
        url: `https://www.amazon.com/dp/B0093162RM?tag=${TAG}`,
        isAmazon: true,
      },
      {
        name: "LectroFan White Noise Machine",
        description:
          "Consistent ambient sound masks the unpredictable noises that pull sensitive people out of sleep or focus. The LectroFan offers true white noise (not loops), which the brain habituates to more naturally.",
        url: `https://www.amazon.com/dp/B00MY8V86Q?tag=${TAG}`,
        isAmazon: true,
      },
      {
        name: "Blue Light Blocking Glasses",
        description:
          "Screen light disrupts melatonin production, and sensitive people tend to be more affected. Wearing blue light glasses in the evening is a simple intervention that protects sleep quality.",
        url: `https://www.amazon.com/dp/B07JN8KQZM?tag=${TAG}`,
        isAmazon: true,
      },
      {
        name: "Calm App",
        description:
          "Guided meditations, sleep stories, and breathing exercises designed for daily use. The sleep stories are particularly effective for HSPs whose minds stay active at bedtime.",
        url: "https://www.calm.com",
        isAmazon: false,
      },
      {
        name: "URPOWER Essential Oil Diffuser",
        description:
          "Aromatherapy activates the olfactory system, which connects directly to the limbic brain. Lavender, frankincense, and vetiver are particularly calming for sensitive nervous systems.",
        url: `https://www.amazon.com/dp/B00Y2CQRZY?tag=${TAG}`,
        isAmazon: true,
      },
    ],
  },
];

export default function ToolsPage() {
  useEffect(() => {
    document.title =
      "Best HSP Tools & Resources We Recommend | The Empowered Sensitive";
    window.scrollTo(0, 0);
  }, []);

  const totalProducts = CATEGORIES.reduce(
    (sum, cat) => sum + cat.products.length,
    0
  );

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Tools We Recommend for Highly Sensitive People",
    description:
      "Curated list of the best books, tools, apps, and resources for highly sensitive people. Personally vetted recommendations from Kalesh.",
    numberOfItems: totalProducts,
    itemListElement: CATEGORIES.flatMap((cat, ci) =>
      cat.products.map((product, pi) => ({
        "@type": "ListItem",
        position: ci * 10 + pi + 1,
        name: product.name,
        url: product.url,
      }))
    ),
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />

        <div className="affiliate-disclosure mb-8">
          This page contains affiliate links. We may earn a small commission if
          you make a purchase — at no extra cost to you.
        </div>

        <div className="thick-rule pt-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Tools We Recommend
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-2">
            These are the tools, books, and resources we actually trust. Every
            recommendation here has been chosen because it serves the work this
            site is about — understanding sensitivity, regulating the nervous
            system, and building a life that honors depth instead of numbing it.
          </p>
          <p className="text-sm text-muted-foreground">
            Curated by{" "}
            <a
              href="https://kalesh.love"
              className="gold-accent hover:underline"
              target="_blank"
              rel="noopener"
            >
              Kalesh
            </a>
            {" "}&mdash; {totalProducts} products across {CATEGORIES.length} categories.
          </p>
        </div>

        {CATEGORIES.map((category) => (
          <section key={category.title} className="mb-12">
            <h2 className="font-ui text-xs font-bold tracking-[0.2em] uppercase mb-6 pb-2 border-b-2 border-foreground">
              {category.title}
            </h2>
            <div className="space-y-4">
              {category.products.map((product) => (
                <div
                  key={product.name}
                  className="border border-border/60 bg-secondary/20 p-5 hover:border-border transition-colors"
                >
                  <h3 className="font-bold text-lg mb-2">
                    <a
                      href={product.url}
                      target="_blank"
                      rel={product.isAmazon ? "noopener" : "noopener nofollow"}
                      className="hover:text-gold-accent transition-colors"
                    >
                      {product.name}
                    </a>
                    {product.isAmazon && (
                      <span className="text-xs text-muted-foreground font-normal ml-2">
                        (paid link)
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-3">
                    <a
                      href={product.url}
                      target="_blank"
                      rel={product.isAmazon ? "noopener" : "noopener nofollow"}
                      className="inline-block font-ui text-xs tracking-wider uppercase px-4 py-2 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
                    >
                      {product.isAmazon ? "View on Amazon" : "Visit Website"} &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="thick-rule pt-6 mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            Looking for more guidance? Explore our{" "}
            <Link href="/start-here" className="gold-accent hover:underline">
              Start Here
            </Link>{" "}
            page or browse{" "}
            <Link href="/the-science" className="gold-accent hover:underline">
              The Science
            </Link>{" "}
            for research-backed articles on sensitivity.
          </p>
        </div>
      </div>
    </div>
  );
}
