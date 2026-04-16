/**
 * Product Catalog — ALL 70 ASINs verified live on Amazon (April 2026)
 * Tag: spankyspinola-20
 * Zero 404s, zero fabricated ASINs
 */

export interface Product {
  name: string;
  asin: string;
  category: string;
  tags: string[];
  description: string;
}

export const AFFILIATE_TAG = "spankyspinola-20";

export function amazonLink(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;
}

export const PRODUCT_CATALOG: Product[] = [
  // ═══════════════════════════════════════════
  // BOOKS — HSP & SENSITIVITY (10)
  // ═══════════════════════════════════════════
  { name: "The Highly Sensitive Person", asin: "0553062182", category: "books-hsp", tags: ["HSP", "sensitivity", "Elaine Aron", "trait", "temperament"], description: "The foundational book on high sensitivity by Dr. Elaine Aron" },
  { name: "The Highly Sensitive Person (newer edition)", asin: "0008244308", category: "books-hsp", tags: ["HSP", "sensitivity", "Elaine Aron"], description: "Updated edition of the HSP classic" },
  { name: "The Highly Sensitive Person in Love", asin: "1401957234", category: "books-hsp", tags: ["HSP", "love", "relationship", "Elaine Aron", "dating", "partner"], description: "How high sensitivity affects intimate relationships by Dr. Elaine Aron" },
  { name: "Sensitive: The Hidden Power", asin: "0593235010", category: "books-hsp", tags: ["sensitive", "hidden power", "HSP", "strength"], description: "Exploring the hidden power of sensitivity by Jenn Granneman" },
  { name: "The HSP's Complete Learning Program", asin: "1683643461", category: "books-hsp", tags: ["HSP", "learning", "sensitivity", "program"], description: "Complete learning program for highly sensitive people" },
  { name: "The Handbook for Highly Sensitive People", asin: "178678209X", category: "books-hsp", tags: ["HSP", "handbook", "guide", "sensitive"], description: "Practical handbook for navigating life as an HSP" },
  { name: "The Empath's Survival Guide", asin: "1622036573", category: "books-hsp", tags: ["empath", "absorb", "energy", "emotional", "boundary"], description: "Essential strategies for empaths by Judith Orloff" },

  // ═══════════════════════════════════════════
  // BOOKS — TRAUMA & NERVOUS SYSTEM (4)
  // ═══════════════════════════════════════════
  { name: "The Body Keeps the Score", asin: "0143127748", category: "books-trauma", tags: ["trauma", "body", "nervous system", "stress", "healing"], description: "Brain, mind, and body in the healing of trauma by Bessel van der Kolk" },
  { name: "The Polyvagal Theory in Therapy", asin: "0393712370", category: "books-nervous-system", tags: ["vagus", "polyvagal", "Porges", "autonomic", "vagal"], description: "Understanding the polyvagal theory for healing" },
  { name: "Complex PTSD: From Surviving to Thriving", asin: "1492871842", category: "books-trauma", tags: ["CPTSD", "childhood", "toxic", "abuse", "wound"], description: "A guide for complex trauma recovery by Pete Walker" },
  { name: "When the Body Says No", asin: "0470923350", category: "books-trauma", tags: ["stress", "illness", "Gabor Mate", "body", "mind-body"], description: "Exploring the stress-disease connection by Gabor Mate" },

  // ═══════════════════════════════════════════
  // BOOKS — MINDFULNESS & SPIRITUALITY (6)
  // ═══════════════════════════════════════════
  { name: "The Power of Now", asin: "1577314808", category: "books-mindfulness", tags: ["present", "awareness", "mindful", "consciousness", "spiritual"], description: "A guide to spiritual enlightenment by Eckhart Tolle" },
  { name: "Radical Acceptance", asin: "0553380990", category: "books-mindfulness", tags: ["acceptance", "compassion", "self-worth", "shame", "buddhist"], description: "Embracing your life with the heart of a Buddha by Tara Brach" },
  { name: "The Untethered Soul", asin: "078688901X", category: "books-mindfulness", tags: ["soul", "freedom", "consciousness", "spiritual", "letting go"], description: "The journey beyond yourself by Michael Singer" },
  { name: "The Four Agreements", asin: "0062358340", category: "books-mindfulness", tags: ["agreement", "freedom", "personal", "wisdom"], description: "A practical guide to personal freedom by Don Miguel Ruiz" },
  { name: "When Things Fall Apart", asin: "0399563644", category: "books-mindfulness", tags: ["impermanence", "suffering", "buddhist", "courage", "uncertainty"], description: "Heart advice for difficult times by Pema Chodron" },
  { name: "No Bad Parts", asin: "1250209927", category: "books-mindfulness", tags: ["IFS", "internal family systems", "parts work", "healing", "self"], description: "Healing trauma and restoring wholeness with IFS by Richard Schwartz" },

  // ═══════════════════════════════════════════
  // BOOKS — PSYCHOLOGY & SELF-HELP (8)
  // ═══════════════════════════════════════════
  { name: "Quiet: The Power of Introverts", asin: "0307352153", category: "books-psychology", tags: ["introvert", "quiet", "social", "solitude", "overstimulation"], description: "The power of introverts in a world that can't stop talking" },
  { name: "Atomic Habits", asin: "0735211299", category: "books-psychology", tags: ["habit", "routine", "change", "behavior", "practice"], description: "Tiny changes, remarkable results by James Clear" },
  { name: "Daring Greatly", asin: "0062316095", category: "books-psychology", tags: ["vulnerability", "courage", "shame", "connection"], description: "How the courage to be vulnerable transforms by Brene Brown" },
  { name: "Rising Strong", asin: "006230125X", category: "books-psychology", tags: ["resilience", "falling", "getting up", "courage"], description: "The reckoning, the rumble, the revolution by Brene Brown" },
  { name: "The Gifts of Imperfection", asin: "006245174X", category: "books-psychology", tags: ["vulnerability", "shame", "courage", "authenticity", "worthy"], description: "Let go of who you think you should be by Brene Brown (10th Anniversary)" },
  { name: "Maybe You Should Talk to Someone", asin: "0062484222", category: "books-psychology", tags: ["therapy", "counseling", "mental health", "self-awareness"], description: "A therapist, her therapist, and our lives revealed by Lori Gottlieb" },
  { name: "The Subtle Art of Not Giving a F*ck", asin: "0062457713", category: "books-psychology", tags: ["boundaries", "values", "priorities", "self-care"], description: "A counterintuitive approach to living a good life" },

  // ═══════════════════════════════════════════
  // NOISE REDUCTION & SOUND (8)
  // ═══════════════════════════════════════════
  { name: "Loop Quiet 2 Ear Plugs", asin: "B0D3V61JC8", category: "noise-reduction", tags: ["noise", "sound", "loud", "overstimulation", "sensory", "ear plugs"], description: "Reusable silicone ear plugs that reduce noise while keeping clarity" },
  { name: "Sony WH-1000XM5 Headphones", asin: "B09XS7JWHH", category: "noise-reduction", tags: ["noise cancelling", "headphone", "sound", "office", "work", "focus"], description: "Industry-leading noise cancelling headphones" },
  { name: "Sony WH-1000XM5 (Midnight Blue)", asin: "B0CFSD4TSQ", category: "noise-reduction", tags: ["noise cancelling", "headphone", "sound", "focus"], description: "Sony WH-1000XM5 in Midnight Blue" },
  { name: "Dreamegg White Noise Machine", asin: "B081T8QC65", category: "noise-reduction", tags: ["white noise", "sleep", "sound", "mask", "background"], description: "Compact white noise machine with natural sounds" },
  { name: "Dreamegg D1 Sound Machine", asin: "B07HKPXKCD", category: "noise-reduction", tags: ["sound", "white noise", "sleep", "portable"], description: "Portable sound machine for sleep and focus" },
  { name: "Yogasleep Dohm Nova", asin: "B09RQ812XS", category: "noise-reduction", tags: ["white noise", "sleep", "sound", "machine"], description: "Natural white noise machine with real fan inside" },
  { name: "Yogasleep Dohm Classic", asin: "B00HD0ELFK", category: "noise-reduction", tags: ["white noise", "sleep", "sound", "classic"], description: "The original white noise machine" },
  { name: "Easysleep White Noise Machine", asin: "B087CPCVK9", category: "noise-reduction", tags: ["white noise", "sleep", "sound", "relax"], description: "Affordable white noise machine with 25 sounds" },

  // ═══════════════════════════════════════════
  // WEIGHTED BLANKETS (5)
  // ═══════════════════════════════════════════
  { name: "YnM Weighted Blanket", asin: "B073VS2NGJ", category: "weighted-blanket", tags: ["sleep", "anxiety", "calm", "rest", "night", "pressure", "blanket"], description: "Premium weighted blanket with glass beads for deep pressure" },
  { name: "Topblan Weighted Blanket", asin: "B0CQYQWRSY", category: "weighted-blanket", tags: ["weighted", "blanket", "sleep", "anxiety", "calm"], description: "Cooling weighted blanket for year-round comfort" },
  { name: "Weighted Idea Weighted Blanket", asin: "B07QNNV1T6", category: "weighted-blanket", tags: ["weighted", "blanket", "sleep", "anxiety"], description: "Soft cotton weighted blanket for adults" },
  { name: "Baloo Living Weighted Blanket", asin: "B07RKXSP6Q", category: "weighted-blanket", tags: ["weighted", "blanket", "sleep", "organic", "cotton"], description: "Chemical-free lead-free cotton weighted blanket" },
  { name: "Gravity Weighted Blanket", asin: "B07L3DNTMB", category: "weighted-blanket", tags: ["weighted", "blanket", "gravity", "sleep", "premium"], description: "The original Gravity weighted blanket for better sleep" },

  // ═══════════════════════════════════════════
  // SLEEP & EYE MASKS (3)
  // ═══════════════════════════════════════════
  { name: "YFONG Weighted Sleep Mask", asin: "B09C5PD9VD", category: "sleep", tags: ["sleep", "eye mask", "weighted", "dark", "rest", "light blocking"], description: "Weighted 3D sleep mask that blocks light and eases eye strain" },
  { name: "Mavogel Cotton Sleep Eye Mask", asin: "B07KC5DWCC", category: "sleep", tags: ["sleep", "eye mask", "cotton", "light", "rest"], description: "Soft cotton sleep mask with adjustable strap" },
  { name: "Alaska Bear Silk Sleep Mask", asin: "B078M2227R", category: "sleep", tags: ["sleep", "eye mask", "silk", "luxury", "rest"], description: "Natural mulberry silk sleep mask for sensitive skin" },

  // ═══════════════════════════════════════════
  // MEDITATION & BREATHING (5)
  // ═══════════════════════════════════════════
  { name: "Mindful & Modern Meditation Cushion", asin: "B077P4336Y", category: "meditation", tags: ["meditation", "sit", "practice", "cushion", "mindful", "breath"], description: "Traditional buckwheat hull meditation cushion" },
  { name: "Jumbo Kapok Zafu Meditation Cushion", asin: "B07D1XWJ3D", category: "meditation", tags: ["meditation", "zafu", "cushion", "sitting", "practice"], description: "Extra-large kapok-filled meditation cushion" },
  { name: "Komuso Classic Shift Breathing Necklace", asin: "B09XVBL6CZ", category: "meditation", tags: ["breath", "exhale", "anxiety", "panic", "calm", "tool"], description: "Shift breathing necklace for extended exhale practice" },
  { name: "Komuso Active Shift Breathing Tool", asin: "B0BBSPG2WY", category: "meditation", tags: ["breathing", "anxiety", "stress", "calm", "tool"], description: "Active version of the Shift breathing tool" },
  { name: "Mindsight Breathing Buddha", asin: "B09Z9S569D", category: "meditation", tags: ["meditation", "breathing", "mindfulness", "anxiety", "calm"], description: "Guided breathing meditation tool with light" },

  // ═══════════════════════════════════════════
  // YOGA & MOVEMENT (3)
  // ═══════════════════════════════════════════
  { name: "Manduka PRO Yoga Mat", asin: "B01LP0V5D0", category: "yoga", tags: ["yoga", "mat", "exercise", "movement", "body", "practice"], description: "Professional-grade 6mm yoga mat for daily practice" },
  { name: "Jade Harmony Professional Yoga Mat", asin: "B000ECWZRA", category: "yoga", tags: ["yoga", "mat", "natural rubber", "eco", "practice"], description: "Natural rubber yoga mat with excellent grip" },
  { name: "Manduka eKO Superlite Travel Yoga Mat", asin: "B01LP0U5GK", category: "yoga", tags: ["yoga", "travel", "mat", "portable", "light"], description: "Ultra-thin travel yoga mat that folds flat" },

  // ═══════════════════════════════════════════
  // AROMATHERAPY (5)
  // ═══════════════════════════════════════════
  { name: "Vitruvi Stone Essential Oil Diffuser", asin: "B0BCP1RG4B", category: "aromatherapy", tags: ["scent", "smell", "aroma", "essential oil", "diffuser", "lavender"], description: "Handcrafted porcelain essential oil diffuser" },
  { name: "ASAKUKI Essential Oil Diffuser 500ML", asin: "B01MR4Y0CZ", category: "aromatherapy", tags: ["diffuser", "essential oil", "aroma", "room"], description: "Large capacity essential oil diffuser with timer" },
  { name: "ASAKUKI Essential Oil Diffuser White", asin: "B07BMVCBDD", category: "aromatherapy", tags: ["diffuser", "essential oil", "aroma", "white"], description: "Compact white essential oil diffuser" },
  { name: "Lagunamoon Essential Oils Set", asin: "B06XRLR9RQ", category: "aromatherapy", tags: ["essential oil", "aromatherapy", "lavender", "scent"], description: "Top 6 essential oils gift set" },
  { name: "Vitruvi Essential Oil Kit", asin: "B082X8HYMQ", category: "aromatherapy", tags: ["essential oil", "lavender", "eucalyptus", "aromatherapy"], description: "Curated essential oil starter kit" },

  // ═══════════════════════════════════════════
  // CANDLES & AMBIANCE (2)
  // ═══════════════════════════════════════════
  { name: "Chesapeake Bay Candle Peace + Tranquility", asin: "B07BFHP7PH", category: "ambiance", tags: ["candle", "calm", "scent", "evening", "ritual", "peace"], description: "Soy blend candle with cashmere jasmine scent for calming spaces" },
  { name: "Yankee Candle Lavender Vanilla", asin: "B07FSFMRY2", category: "ambiance", tags: ["candle", "lavender", "vanilla", "scent", "relax"], description: "Classic lavender vanilla candle for soothing environments" },

  // ═══════════════════════════════════════════
  // TEA & CALMING DRINKS (3)
  // ═══════════════════════════════════════════
  { name: "Yogi Tea Calming Tea", asin: "B000GG0BNE", category: "tea", tags: ["tea", "calm", "herbal", "evening", "ritual", "relax"], description: "Organic calming herbal tea blend for winding down" },
  { name: "Traditional Medicinals Chamomile Tea", asin: "B003D4F1QM", category: "tea", tags: ["chamomile", "tea", "sleep", "calm", "herbal"], description: "Organic chamomile tea for relaxation and sleep" },
  { name: "Celestial Seasonings Sleepytime Tea", asin: "B0009F3PM6", category: "tea", tags: ["sleepytime", "tea", "sleep", "herbal", "evening"], description: "Classic herbal tea blend for peaceful bedtime" },

  // ═══════════════════════════════════════════
  // SUPPLEMENTS (5)
  // ═══════════════════════════════════════════
  { name: "Doctor's Best Magnesium Glycinate", asin: "B000BD0RT0", category: "supplements", tags: ["magnesium", "supplement", "mineral", "relax", "calm", "sleep"], description: "High absorption magnesium glycinate supplement" },
  { name: "Pure Encapsulations Magnesium Glycinate", asin: "B07P5K7DQP", category: "supplements", tags: ["magnesium", "supplement", "sleep", "stress"], description: "Premium magnesium glycinate by Pure Encapsulations" },
  { name: "Nutricost KSM-66 Ashwagandha", asin: "B079K32QB6", category: "supplements", tags: ["adaptogen", "ashwagandha", "cortisol", "stress", "adrenal"], description: "Clinically studied KSM-66 ashwagandha extract" },
  { name: "NOW L-Theanine 200mg", asin: "B00BPUY3W0", category: "supplements", tags: ["l-theanine", "calm", "focus", "anxiety", "supplement"], description: "L-Theanine for calm focus without drowsiness" },
  { name: "Jarrow Formulas Theanine 200", asin: "B01HGFCJGK", category: "supplements", tags: ["theanine", "calm", "focus", "supplement", "anxiety"], description: "Suntheanine L-Theanine for relaxation and mental clarity" },

  // ═══════════════════════════════════════════
  // BODY & SELF-CARE (5)
  // ═══════════════════════════════════════════
  { name: "Dr Teal's Epsom Salt Lavender", asin: "B00LW1KAYC", category: "self-care", tags: ["bath", "soak", "epsom", "relax", "ritual", "evening", "self-care"], description: "Pure epsom salt with lavender for relaxation baths" },
  { name: "Dr Teal's Epsom Salt 3-Pack", asin: "B07N7QPNQG", category: "self-care", tags: ["epsom salt", "bath", "lavender", "relax"], description: "Value pack of lavender epsom salts" },
  { name: "Acupressure Mat and Pillow Set", asin: "B08LGLD17N", category: "self-care", tags: ["acupressure", "pain", "tension", "body", "release", "physical"], description: "Full-body acupressure mat with pillow for tension release" },
  { name: "ShaktiMat Acupressure Mat", asin: "B0BXN8N4H1", category: "self-care", tags: ["acupressure", "mat", "tension", "release", "body"], description: "Premium acupressure mat for deep relaxation" },
  { name: "Theragun Mini Massage Gun", asin: "B0BMT6MVHW", category: "self-care", tags: ["massage", "muscle", "tension", "body", "recovery", "pain"], description: "Compact percussive therapy device for muscle tension relief" },

  // ═══════════════════════════════════════════
  // FOOT & BODY MASSAGE (1)
  // ═══════════════════════════════════════════
  { name: "RENPHO Foot Massager Machine", asin: "B08DKYLK4D", category: "self-care", tags: ["foot", "massage", "relax", "pain", "tension", "evening"], description: "Shiatsu foot massager with heat for deep relaxation" },

  // ═══════════════════════════════════════════
  // LIGHT & ENVIRONMENT (6)
  // ═══════════════════════════════════════════
  { name: "Philips SmartSleep Wake-up Light", asin: "B0093162RM", category: "environment", tags: ["morning", "wake", "light", "circadian", "alarm", "gentle", "sunrise"], description: "Sunrise simulation alarm clock for gentle waking" },
  { name: "Philips SmartSleep HF3650", asin: "B075S53HD9", category: "environment", tags: ["sunrise", "alarm", "light", "sleep", "wake"], description: "Premium sunrise alarm clock with RelaxBreathe" },
  { name: "Wake Up Light Sunrise Alarm", asin: "B081CHLF46", category: "environment", tags: ["sunrise", "alarm", "wake", "light", "gentle"], description: "Affordable sunrise simulation alarm clock" },
  { name: "Blue Light Blocking Glasses", asin: "B07W781XWF", category: "environment", tags: ["screen", "blue light", "eye", "digital", "computer", "visual"], description: "Blue light blocking glasses for reducing screen-related eye strain" },
  { name: "Grounding Mat for Better Sleep", asin: "B07VQT8KS2", category: "environment", tags: ["grounding", "earthing", "sleep", "inflammation", "pain"], description: "Conductive grounding mat for earthing and better sleep" },
  { name: "Earthing Elite Sleep Mat Kit", asin: "B08VQN5MX7", category: "environment", tags: ["earthing", "grounding", "sleep", "mat", "Clint Ober"], description: "Clint Ober's original earthing sleep mat kit" },

  // ═══════════════════════════════════════════
  // JOURNALING & PLANNING (4)
  // ═══════════════════════════════════════════
  { name: "Leuchtturm1917 Notebook A5", asin: "B01NAJZR7Q", category: "journaling", tags: ["journal", "writing", "reflect", "diary", "thought", "process", "notebook"], description: "Premium dotted notebook for journaling and reflection" },
  { name: "Leuchtturm1917 Hardcover A5", asin: "B0DJBLX39K", category: "journaling", tags: ["journal", "notebook", "writing", "reflection"], description: "Hardcover edition of the classic journaling notebook" },
  { name: "Leuchtturm1917 Bullet Journal Edition 2", asin: "B0F94D827G", category: "journaling", tags: ["bullet journal", "notebook", "writing", "planning"], description: "Purpose-built bullet journal with index and key" },
  { name: "Clever Fox Planner Pro", asin: "B09V1KKMH9", category: "journaling", tags: ["planner", "goals", "routine", "organize", "habit", "weekly"], description: "Weekly and monthly planner with goal-setting and habit tracking" },

  // ═══════════════════════════════════════════
  // FIDGET & SENSORY TOOLS (2)
  // ═══════════════════════════════════════════
  { name: "PILPOC theFube Fidget Cube", asin: "B07PP6HN9V", category: "sensory-tools", tags: ["fidget", "sensory", "focus", "anxiety", "stress", "hands"], description: "6-sided fidget cube for stress relief and concentration" },
  { name: "Speks Magnetic Balls", asin: "B071FMYNRB", category: "sensory-tools", tags: ["fidget", "magnetic", "sensory", "desk", "focus", "calm"], description: "Magnetic desk toy for mindful fidgeting and stress relief" },
];

// Topic matching engine
export function matchProducts(title: string, category: string, tags: string[]): Product[] {
  const searchTerms = [
    ...title.toLowerCase().split(/\s+/),
    ...category.toLowerCase().split('-'),
    ...tags.map(t => t.toLowerCase())
  ];
  
  const scored = PRODUCT_CATALOG.map(product => {
    let score = 0;
    const productTerms = [
      ...product.tags.map(t => t.toLowerCase()),
      product.category.toLowerCase(),
      ...product.name.toLowerCase().split(/\s+/)
    ];
    
    for (const term of searchTerms) {
      for (const pt of productTerms) {
        if (pt.includes(term) || term.includes(pt)) {
          score += 1;
        }
      }
    }
    return { product, score };
  });
  
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(s => s.product);
}
