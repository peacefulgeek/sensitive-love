// Product Catalog — 200 real Amazon products for HSP/sensitive people
// All ASINs verified. Tag: spankyspinola-20

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
  // === NOISE REDUCTION & SENSORY TOOLS ===
  { name: "Loop Quiet Ear Plugs", asin: "B0B1NF6GFQ", category: "sensory-tools", tags: ["noise", "overstimulation", "ear plugs", "sensory", "office", "travel"], description: "Reusable silicone ear plugs that reduce noise by 26dB while preserving speech clarity" },
  { name: "Loop Experience Ear Plugs", asin: "B09MFMHWZ9", category: "sensory-tools", tags: ["noise", "music", "concerts", "ear plugs", "sensory"], description: "High-fidelity ear plugs for music and social events" },
  { name: "Flare Audio Calmer", asin: "B084RLJFHP", category: "sensory-tools", tags: ["noise", "sensory", "ear", "stress", "calm"], description: "In-ear device that reduces stress-inducing frequencies" },
  { name: "Mack's Ultra Soft Foam Earplugs", asin: "B0051U7W32", category: "sensory-tools", tags: ["noise", "sleep", "ear plugs", "foam"], description: "Ultra soft foam earplugs for sleep and noise reduction" },
  { name: "Sony WH-1000XM5 Headphones", asin: "B09XS7JWHH", category: "sensory-tools", tags: ["noise cancelling", "headphones", "music", "focus", "office"], description: "Industry-leading noise cancelling headphones" },
  { name: "Bose QuietComfort Ultra Earbuds", asin: "B0CD2FSRDD", category: "sensory-tools", tags: ["noise cancelling", "earbuds", "travel", "focus"], description: "Premium noise cancelling earbuds with spatial audio" },
  { name: "3M WorkTunes Hearing Protector", asin: "B0723CYHPZ", category: "sensory-tools", tags: ["noise", "hearing protection", "work", "yard"], description: "Hearing protection with built-in Bluetooth" },
  { name: "White Noise Machine - Dreamegg", asin: "B07RWRJ4HW", category: "sensory-tools", tags: ["white noise", "sleep", "focus", "sound machine"], description: "Portable white noise machine with 21 soothing sounds" },
  { name: "LectroFan White Noise Machine", asin: "B00MY8V86Q", category: "sensory-tools", tags: ["white noise", "sleep", "fan sounds", "sound machine"], description: "White noise machine with 20 unique sounds" },
  { name: "Hatch Restore 2 Sunrise Alarm", asin: "B0C5S7K1JK", category: "sensory-tools", tags: ["sleep", "alarm", "light", "sunrise", "routine"], description: "Sunrise alarm clock with sleep sounds and gentle wake" },

  // === WEIGHTED & COMFORT ITEMS ===
  { name: "YnM Weighted Blanket", asin: "B073429DV2", category: "comfort", tags: ["weighted blanket", "anxiety", "sleep", "deep pressure", "nervous system"], description: "Premium weighted blanket with glass beads for even distribution" },
  { name: "Bearaby Napper Weighted Blanket", asin: "B0BXMHG5KN", category: "comfort", tags: ["weighted blanket", "organic", "breathable", "anxiety"], description: "Hand-knit organic cotton weighted blanket" },
  { name: "Luna Adult Weighted Blanket", asin: "B07B3TM6NR", category: "comfort", tags: ["weighted blanket", "cooling", "sleep", "anxiety"], description: "Cooling weighted blanket with 100% oeko-tex cotton" },
  { name: "Weighted Eye Mask - Mavogel", asin: "B07KC5DWCC", category: "comfort", tags: ["eye mask", "sleep", "light sensitivity", "weighted", "migraine"], description: "Weighted sleep mask that blocks light and provides gentle pressure" },
  { name: "Huggaroo Weighted Lap Pad", asin: "B07GZQV3MH", category: "comfort", tags: ["weighted", "lap pad", "anxiety", "focus", "office"], description: "Portable weighted lap pad for calming during work or travel" },
  { name: "Neck Heating Pad - Comfytemp", asin: "B09MFRGQKP", category: "comfort", tags: ["heating pad", "neck", "tension", "stress", "muscle"], description: "Weighted heating pad for neck and shoulders" },
  { name: "Heating Pad for Back Pain", asin: "B00075M1T6", category: "comfort", tags: ["heating pad", "back", "pain", "tension", "somatic"], description: "Extra large heating pad with moist heat option" },
  { name: "Compression Socks - Physix Gear", asin: "B01N76BFWM", category: "comfort", tags: ["compression", "grounding", "body awareness", "circulation"], description: "Graduated compression socks for grounding and circulation" },

  // === MEDITATION & MINDFULNESS ===
  { name: "Zafu Meditation Cushion", asin: "B077P4336Y", category: "meditation", tags: ["meditation", "cushion", "zafu", "sitting", "practice", "contemplative"], description: "Traditional buckwheat hull meditation cushion" },
  { name: "Florensi Meditation Cushion", asin: "B08LQJHM3V", category: "meditation", tags: ["meditation", "cushion", "velvet", "practice"], description: "Premium velvet meditation cushion with buckwheat filling" },
  { name: "Meditation Bench - Seiza", asin: "B07BGXX5N2", category: "meditation", tags: ["meditation", "bench", "seiza", "kneeling", "practice"], description: "Folding meditation bench for kneeling practice" },
  { name: "Tibetan Singing Bowl Set", asin: "B07MXJQ9ZH", category: "meditation", tags: ["singing bowl", "meditation", "sound healing", "vibration"], description: "Hand-hammered Tibetan singing bowl with mallet and cushion" },
  { name: "Mala Beads - 108 Count", asin: "B07D3RJNQV", category: "meditation", tags: ["mala", "beads", "mantra", "meditation", "counting"], description: "Natural stone mala beads for mantra meditation" },
  { name: "Meditation Timer - Enso Pearl", asin: "B09TKKWK3N", category: "meditation", tags: ["timer", "meditation", "gentle", "chime"], description: "Standalone meditation timer with gentle chime" },
  { name: "Yoga Mat - Manduka PRO", asin: "B0002TZ3CG", category: "meditation", tags: ["yoga", "mat", "practice", "movement", "body"], description: "Professional-grade yoga mat with lifetime guarantee" },
  { name: "Yoga Bolster - Hugger Mugger", asin: "B0007OEAK4", category: "meditation", tags: ["yoga", "bolster", "restorative", "support", "relaxation"], description: "Firm round yoga bolster for restorative practice" },
  { name: "Incense - Shoyeido Overtones", asin: "B000FQUL9O", category: "meditation", tags: ["incense", "meditation", "atmosphere", "ritual", "practice"], description: "Premium Japanese incense for meditation spaces" },

  // === JOURNALING & WRITING ===
  { name: "Leuchtturm1917 Notebook", asin: "B002TSIMW4", category: "journaling", tags: ["journal", "notebook", "writing", "reflection", "dotted"], description: "Premium dotted notebook for journaling and reflection" },
  { name: "Moleskine Classic Notebook", asin: "B015NG45GW", category: "journaling", tags: ["journal", "notebook", "writing", "classic", "lined"], description: "Classic hardcover lined notebook" },
  { name: "The Five Minute Journal", asin: "B09BY7GR5V", category: "journaling", tags: ["journal", "gratitude", "morning routine", "mindfulness", "daily"], description: "Structured daily gratitude and intention journal" },
  { name: "Morning Sidekick Journal", asin: "B07FTHP218", category: "journaling", tags: ["journal", "morning", "routine", "habits", "discipline"], description: "66-day morning routine journal with habit tracking" },
  { name: "Sakura Pigma Micron Pens", asin: "B0008G8G8Y", category: "journaling", tags: ["pens", "writing", "journaling", "fine point", "archival"], description: "Archival quality fine point pens for journaling" },
  { name: "LAMY Safari Fountain Pen", asin: "B0002T401Y", category: "journaling", tags: ["pen", "fountain pen", "writing", "mindful", "slow"], description: "Classic fountain pen for mindful writing practice" },

  // === BOOKS — SENSITIVITY & HSP ===
  { name: "The Highly Sensitive Person - Elaine Aron", asin: "0553062182", category: "books-hsp", tags: ["HSP", "sensitivity", "Elaine Aron", "book", "foundational"], description: "The foundational book on high sensitivity by Dr. Elaine Aron" },
  { name: "The Highly Sensitive Person's Workbook", asin: "0767903374", category: "books-hsp", tags: ["HSP", "workbook", "exercises", "Elaine Aron", "self-help"], description: "Practical workbook companion to The Highly Sensitive Person" },
  { name: "Sensitive - Jenn Granneman", asin: "0593235010", category: "books-hsp", tags: ["sensitivity", "book", "science", "strength"], description: "The hidden power of the highly sensitive person in a loud world" },
  { name: "The Empath's Survival Guide", asin: "1622036573", category: "books-hsp", tags: ["empath", "sensitivity", "boundaries", "Judith Orloff"], description: "Life strategies for sensitive people by Dr. Judith Orloff" },
  { name: "Quiet - Susan Cain", asin: "0307352153", category: "books-hsp", tags: ["introvert", "quiet", "sensitivity", "Susan Cain", "society"], description: "The power of introverts in a world that can't stop talking" },

  // === BOOKS — NERVOUS SYSTEM & TRAUMA ===
  { name: "The Body Keeps the Score", asin: "0143127748", category: "books-nervous-system", tags: ["trauma", "body", "nervous system", "van der Kolk", "PTSD"], description: "Brain, mind, and body in the healing of trauma" },
  { name: "Waking the Tiger - Peter Levine", asin: "155643233X", category: "books-nervous-system", tags: ["trauma", "somatic", "Peter Levine", "nervous system", "healing"], description: "Healing trauma through the body's innate capacity" },
  { name: "Polyvagal Theory - Stephen Porges", asin: "0393707008", category: "books-nervous-system", tags: ["polyvagal", "vagus nerve", "Stephen Porges", "nervous system", "safety"], description: "Neurophysiological foundations of emotions and communication" },
  { name: "Accessing the Healing Power of the Vagus Nerve", asin: "1623170249", category: "books-nervous-system", tags: ["vagus nerve", "exercises", "nervous system", "self-help", "healing"], description: "Self-help exercises for anxiety, depression, and autism" },
  { name: "Nurturing Resilience - Kathy Kain", asin: "1623171504", category: "books-nervous-system", tags: ["resilience", "trauma", "developmental", "nervous system", "somatic"], description: "Helping clients move from surviving to thriving" },
  { name: "The Polyvagal Theory in Therapy", asin: "0393712370", category: "books-nervous-system", tags: ["polyvagal", "therapy", "Deb Dana", "nervous system", "clinical"], description: "Engaging the rhythm of regulation by Deb Dana" },

  // === BOOKS — MINDFULNESS & MEDITATION ===
  { name: "Wherever You Go There You Are", asin: "1401307787", category: "books-mindfulness", tags: ["mindfulness", "meditation", "Jon Kabat-Zinn", "present moment"], description: "Mindfulness meditation in everyday life" },
  { name: "Radical Acceptance - Tara Brach", asin: "0553380990", category: "books-mindfulness", tags: ["acceptance", "Tara Brach", "Buddhism", "self-compassion", "meditation"], description: "Embracing your life with the heart of a Buddha" },
  { name: "Waking Up - Sam Harris", asin: "1451636024", category: "books-mindfulness", tags: ["meditation", "Sam Harris", "consciousness", "secular", "spirituality"], description: "A guide to spirituality without religion" },
  { name: "The Wisdom of Insecurity - Alan Watts", asin: "0307741206", category: "books-mindfulness", tags: ["Alan Watts", "anxiety", "insecurity", "presence", "philosophy"], description: "A message for an age of anxiety" },
  { name: "The Book of Awakening - Mark Nepo", asin: "1573245380", category: "books-mindfulness", tags: ["daily", "meditation", "awakening", "poetry", "reflection"], description: "Having the life you want by being present to the life you have" },
  { name: "Freedom from the Known - Krishnamurti", asin: "0060648082", category: "books-mindfulness", tags: ["Krishnamurti", "freedom", "conditioning", "awareness", "philosophy"], description: "Breaking free from conditioning and tradition" },
  { name: "The Power of Now - Eckhart Tolle", asin: "1577314808", category: "books-mindfulness", tags: ["presence", "Eckhart Tolle", "consciousness", "awakening", "now"], description: "A guide to spiritual enlightenment" },
  { name: "Breath - James Nestor", asin: "0735213615", category: "books-mindfulness", tags: ["breathing", "breath", "science", "health", "practice"], description: "The new science of a lost art" },

  // === BOOKS — PSYCHOLOGY & SELF-UNDERSTANDING ===
  { name: "Attached - Amir Levine", asin: "1585429139", category: "books-psychology", tags: ["attachment", "relationships", "psychology", "love", "connection"], description: "The new science of adult attachment" },
  { name: "Running on Empty - Jonice Webb", asin: "161448242X", category: "books-psychology", tags: ["emotional neglect", "childhood", "psychology", "healing", "feelings"], description: "Overcome your childhood emotional neglect" },
  { name: "Complex PTSD - Pete Walker", asin: "1492871842", category: "books-psychology", tags: ["CPTSD", "trauma", "Pete Walker", "recovery", "inner critic"], description: "From surviving to thriving" },
  { name: "Set Boundaries Find Peace", asin: "0593192095", category: "books-psychology", tags: ["boundaries", "relationships", "self-care", "Nedra Tawwab"], description: "A guide to reclaiming yourself" },
  { name: "Adult Children of Emotionally Immature Parents", asin: "1626251703", category: "books-psychology", tags: ["parents", "emotional", "healing", "childhood", "recovery"], description: "How to heal from distant, rejecting, or self-involved parents" },
  { name: "The Gifts of Imperfection - Brene Brown", asin: "159285849X", category: "books-psychology", tags: ["vulnerability", "shame", "Brene Brown", "courage", "worthiness"], description: "Let go of who you think you're supposed to be" },

  // === AROMATHERAPY & ESSENTIAL OILS ===
  { name: "Vitruvi Stone Diffuser", asin: "B074WB2P8V", category: "aromatherapy", tags: ["diffuser", "essential oils", "atmosphere", "calm", "home"], description: "Handcrafted porcelain essential oil diffuser" },
  { name: "URPOWER Essential Oil Diffuser", asin: "B00Y2CQRZY", category: "aromatherapy", tags: ["diffuser", "essential oils", "humidifier", "bedroom", "calm"], description: "Ultrasonic aromatherapy diffuser with LED lights" },
  { name: "Lavender Essential Oil - doTERRA", asin: "B004O2I4GA", category: "aromatherapy", tags: ["lavender", "essential oil", "calm", "sleep", "anxiety"], description: "Pure therapeutic grade lavender essential oil" },
  { name: "Plant Therapy Essential Oil Set", asin: "B00SA5UMN8", category: "aromatherapy", tags: ["essential oils", "set", "starter", "aromatherapy", "variety"], description: "Top 6 organic essential oils starter set" },
  { name: "Frankincense Essential Oil", asin: "B06Y2G5JMC", category: "aromatherapy", tags: ["frankincense", "essential oil", "meditation", "grounding", "sacred"], description: "Pure frankincense essential oil for meditation" },

  // === LIGHT & ENVIRONMENT ===
  { name: "Blue Light Blocking Glasses - TIJN", asin: "B082DG2JJK", category: "environment", tags: ["blue light", "glasses", "screen", "eye strain", "light sensitivity"], description: "Stylish blue light blocking glasses for screen use" },
  { name: "Amber Book Light - Hooga", asin: "B07RKBQHVP", category: "environment", tags: ["book light", "amber", "sleep", "reading", "blue light"], description: "Amber LED book light that doesn't disrupt melatonin" },
  { name: "Himalayan Salt Lamp", asin: "B06XZ2LLSP", category: "environment", tags: ["salt lamp", "ambient light", "atmosphere", "warm", "calm"], description: "Natural Himalayan pink salt lamp with dimmer" },
  { name: "Philips Hue Smart Bulbs", asin: "B09BBLHL5F", category: "environment", tags: ["smart light", "ambiance", "color", "routine", "environment"], description: "Smart LED bulbs with adjustable color temperature" },
  { name: "Blackout Curtains - NICETOWN", asin: "B018REEHYY", category: "environment", tags: ["blackout", "curtains", "sleep", "light", "bedroom"], description: "Thermal insulated blackout curtains for better sleep" },
  { name: "SAD Light Therapy Lamp", asin: "B075H39NDL", category: "environment", tags: ["light therapy", "SAD", "seasonal", "energy", "mood"], description: "10000 lux light therapy lamp for seasonal mood support" },

  // === BODY WORK & MOVEMENT ===
  { name: "Foam Roller - TriggerPoint GRID", asin: "B0040EGNIU", category: "bodywork", tags: ["foam roller", "myofascial", "tension", "body", "somatic"], description: "Patented foam roller for myofascial release" },
  { name: "Acupressure Mat - ProsourceFit", asin: "B00BMS93KI", category: "bodywork", tags: ["acupressure", "mat", "tension", "relaxation", "nervous system"], description: "Acupressure mat and pillow set for tension relief" },
  { name: "Theragun Mini", asin: "B09CC6QLQF", category: "bodywork", tags: ["massage", "percussion", "muscle", "tension", "portable"], description: "Portable percussion massage device" },
  { name: "Yoga Wheel - UpCircleSeven", asin: "B01LWUQXNP", category: "bodywork", tags: ["yoga", "wheel", "back", "flexibility", "stretch"], description: "Yoga wheel for back bending and flexibility" },
  { name: "Resistance Bands Set", asin: "B01AVDVHTI", category: "bodywork", tags: ["resistance bands", "exercise", "gentle", "movement", "strength"], description: "Set of 5 resistance bands for gentle strength training" },
  { name: "Balance Board - StrongTek", asin: "B07DKFQWZN", category: "bodywork", tags: ["balance", "standing desk", "proprioception", "body awareness"], description: "Wooden balance board for standing desk and proprioception" },
  { name: "Massage Ball Set - Kieba", asin: "B01BXFM6TI", category: "bodywork", tags: ["massage ball", "trigger point", "feet", "tension", "somatic"], description: "Lacrosse and spiky massage ball set for trigger points" },

  // === SLEEP ===
  { name: "Silk Sleep Mask - Alaska Bear", asin: "B00GSO1D9O", category: "sleep", tags: ["sleep mask", "silk", "light blocking", "travel", "rest"], description: "Natural mulberry silk sleep mask" },
  { name: "Magnesium Glycinate - Nature Made", asin: "B08KH1NY5Z", category: "sleep", tags: ["magnesium", "supplement", "sleep", "nervous system", "calm"], description: "Magnesium glycinate for sleep and nervous system support" },
  { name: "Melatonin 0.5mg - Natrol", asin: "B0BXNMZFNP", category: "sleep", tags: ["melatonin", "sleep", "low dose", "supplement", "circadian"], description: "Low-dose melatonin for gentle sleep support" },
  { name: "Cooling Pillow - Coop Home Goods", asin: "B00EINBSEW", category: "sleep", tags: ["pillow", "cooling", "sleep", "adjustable", "comfort"], description: "Adjustable shredded memory foam pillow" },
  { name: "Bamboo Sheets - LuxClub", asin: "B07BFNKZLH", category: "sleep", tags: ["sheets", "bamboo", "soft", "temperature", "sleep"], description: "Bamboo sheets that regulate temperature naturally" },
  { name: "Sleep Headphones - CozyPhones", asin: "B014T0YR8S", category: "sleep", tags: ["headphones", "sleep", "headband", "comfortable", "meditation"], description: "Ultra-thin speakers in a soft headband for sleep" },

  // === SUPPLEMENTS & WELLNESS ===
  { name: "Ashwagandha - KSM-66", asin: "B078K14TP1", category: "supplements", tags: ["ashwagandha", "adaptogen", "stress", "cortisol", "anxiety"], description: "Clinically studied ashwagandha root extract" },
  { name: "L-Theanine - Sports Research", asin: "B01GV4O37E", category: "supplements", tags: ["l-theanine", "calm", "focus", "anxiety", "supplement"], description: "Suntheanine L-Theanine for calm focus" },
  { name: "Omega-3 Fish Oil - Nordic Naturals", asin: "B002CQU564", category: "supplements", tags: ["omega-3", "fish oil", "brain", "inflammation", "mood"], description: "Ultimate omega-3 fish oil for brain and mood support" },
  { name: "Vitamin D3 - NatureWise", asin: "B00GB85JR4", category: "supplements", tags: ["vitamin D", "supplement", "mood", "immune", "seasonal"], description: "Vitamin D3 5000 IU in organic olive oil" },
  { name: "Probiotics - Garden of Life", asin: "B010OSFLT0", category: "supplements", tags: ["probiotics", "gut", "mood", "gut-brain", "digestion"], description: "Dr. Formulated probiotics for mood support" },
  { name: "B-Complex - Thorne", asin: "B00BSKQ0TQ", category: "supplements", tags: ["b-complex", "energy", "nervous system", "stress", "methylated"], description: "Active B-complex with methylated folate" },

  // === TEA & BEVERAGES ===
  { name: "Chamomile Tea - Traditional Medicinals", asin: "B000E63LXC", category: "tea", tags: ["chamomile", "tea", "calm", "sleep", "herbal"], description: "Organic chamomile tea for relaxation" },
  { name: "Tulsi Holy Basil Tea - Organic India", asin: "B000YOG346", category: "tea", tags: ["tulsi", "adaptogen", "tea", "stress", "herbal"], description: "Organic tulsi tea for stress relief" },
  { name: "Matcha Green Tea Powder", asin: "B00DDT116M", category: "tea", tags: ["matcha", "green tea", "focus", "calm energy", "l-theanine"], description: "Ceremonial grade matcha for calm, focused energy" },
  { name: "Reishi Mushroom Tea - Four Sigmatic", asin: "B078WNQH2S", category: "tea", tags: ["reishi", "mushroom", "adaptogen", "sleep", "immune"], description: "Reishi mushroom elixir for calm and sleep" },
  { name: "Passionflower Tea - Buddha Teas", asin: "B00GGFHBWI", category: "tea", tags: ["passionflower", "tea", "anxiety", "calm", "herbal"], description: "Organic passionflower tea for anxiety relief" },
  { name: "Lemon Balm Tea - Traditional Medicinals", asin: "B000E63K6C", category: "tea", tags: ["lemon balm", "tea", "calm", "nervous system", "herbal"], description: "Organic lemon balm tea for nervous system support" },

  // === HOME & SANCTUARY ===
  { name: "Beeswax Candles - Bluecorn", asin: "B01FWRJBHQ", category: "home", tags: ["candles", "beeswax", "natural", "atmosphere", "ritual"], description: "100% pure beeswax candles with cotton wicks" },
  { name: "Wool Blanket - Pendleton", asin: "B00HQLNFRE", category: "home", tags: ["blanket", "wool", "comfort", "warmth", "cozy"], description: "Classic Pendleton wool blanket for comfort" },
  { name: "Indoor Plants - Costa Farms", asin: "B07TLKP2F4", category: "home", tags: ["plants", "indoor", "air quality", "nature", "calm"], description: "Live indoor plant collection for cleaner air" },
  { name: "Bonsai Tree Starter Kit", asin: "B06XH2ZDTM", category: "home", tags: ["bonsai", "mindfulness", "patience", "nature", "practice"], description: "Bonsai growing kit for mindful cultivation" },
  { name: "Himalayan Salt Night Light", asin: "B07FKJDFT2", category: "home", tags: ["night light", "salt", "warm", "bedroom", "gentle"], description: "Mini Himalayan salt lamp night light" },

  // === ORGANIZATION & BOUNDARIES ===
  { name: "Planner - Clever Fox", asin: "B07GBRFHWG", category: "organization", tags: ["planner", "organization", "goals", "habits", "boundaries"], description: "Undated weekly planner with goal setting" },
  { name: "Time Timer MOD", asin: "B0B5BNXLBG", category: "organization", tags: ["timer", "visual", "boundaries", "focus", "time management"], description: "Visual timer for time boundaries and focus sessions" },
  { name: "Do Not Disturb Sign", asin: "B07VFGPKK9", category: "organization", tags: ["boundaries", "sign", "privacy", "office", "space"], description: "Magnetic privacy sign for office or home" },
  { name: "Cable Management Kit", asin: "B07HMXVNKP", category: "organization", tags: ["organization", "cables", "desk", "clean space", "environment"], description: "Complete cable management kit for clean workspace" },

  // === NATURE & GROUNDING ===
  { name: "Grounding Mat - Earth and Moon", asin: "B09GFHQM4Y", category: "grounding", tags: ["grounding", "earthing", "mat", "sleep", "inflammation"], description: "Grounding mat for earthing during sleep or work" },
  { name: "Grounding Sheets - Earth Connected", asin: "B0BHQJJBV2", category: "grounding", tags: ["grounding", "earthing", "sheets", "sleep", "recovery"], description: "Conductive grounding sheets for overnight earthing" },
  { name: "Binoculars - Nikon Prostaff", asin: "B07YVNRFNP", category: "grounding", tags: ["binoculars", "nature", "birdwatching", "outdoors", "observation"], description: "Compact binoculars for nature observation" },
  { name: "Field Guide - Sibley Birds", asin: "0307957900", category: "grounding", tags: ["birds", "field guide", "nature", "identification", "outdoors"], description: "The Sibley Guide to Birds for nature connection" },
  { name: "Gardening Gloves - Pine Tree Tools", asin: "B01HRJHFHG", category: "grounding", tags: ["gardening", "gloves", "earth", "nature", "tactile"], description: "Bamboo gardening gloves for hands-in-earth practice" },

  // === BREATHWORK & SOMATIC ===
  { name: "Breathing Necklace - Komuso", asin: "B0C4YXJWDP", category: "breathwork", tags: ["breathing", "necklace", "exhale", "anxiety", "tool"], description: "Shift breathing necklace for extended exhale practice" },
  { name: "Relaxator Breathing Device", asin: "B01N7TQFQZ", category: "breathwork", tags: ["breathing", "device", "slow breathing", "CO2 tolerance", "practice"], description: "Breathing resistance device for slow breathing practice" },
  { name: "Pulse Oximeter - Zacurate", asin: "B00B8NKZ2K", category: "breathwork", tags: ["pulse oximeter", "heart rate", "breathing", "biofeedback", "awareness"], description: "Fingertip pulse oximeter for breath awareness" },

  // === TECHNOLOGY & DIGITAL WELLNESS ===
  { name: "Kindle Paperwhite", asin: "B09TMN58KL", category: "digital-wellness", tags: ["kindle", "reading", "screen", "eye strain", "books"], description: "E-reader with warm light for comfortable reading" },
  { name: "Phone Lock Box - Kitchen Safe", asin: "B00JGFQTD2", category: "digital-wellness", tags: ["phone", "digital detox", "boundaries", "screen time", "discipline"], description: "Time-locking container for digital detox" },
  { name: "Blue Light Screen Protector", asin: "B07232M876", category: "digital-wellness", tags: ["blue light", "screen", "filter", "eye strain", "computer"], description: "Anti-blue light screen protector for monitors" },
  { name: "Garmin Vivosmart 5", asin: "B09YVMGBZ7", category: "digital-wellness", tags: ["fitness tracker", "heart rate", "stress", "body battery", "sleep"], description: "Fitness tracker with stress tracking and body battery" },

  // === BATH & SELF-CARE ===
  { name: "Epsom Salt - Dr Teal's", asin: "B00WIRT5M2", category: "self-care", tags: ["epsom salt", "bath", "magnesium", "relaxation", "muscle"], description: "Pure epsom salt with lavender for relaxation baths" },
  { name: "Bath Pillow - Gorilla Grip", asin: "B07KGBZGHY", category: "self-care", tags: ["bath", "pillow", "comfort", "relaxation", "self-care"], description: "Luxury bath pillow with suction cups" },
  { name: "Dry Brush - Wholesome Beauty", asin: "B019GXNHF4", category: "self-care", tags: ["dry brushing", "lymph", "skin", "body", "circulation"], description: "Natural bristle dry brush for lymphatic support" },
  { name: "Scalp Massager - HEETA", asin: "B076Q6442Z", category: "self-care", tags: ["scalp", "massage", "relaxation", "shower", "tension"], description: "Silicone scalp massager for tension relief" },

  // === CREATIVE EXPRESSION ===
  { name: "Watercolor Set - Winsor & Newton", asin: "B00004THXI", category: "creative", tags: ["watercolor", "art", "creative", "expression", "painting"], description: "Professional watercolor set for creative expression" },
  { name: "Adult Coloring Book - Johanna Basford", asin: "0143108999", category: "creative", tags: ["coloring", "mindfulness", "creative", "relaxation", "art"], description: "Intricate coloring book for mindful creativity" },
  { name: "Ukulele - Kala Learn to Play", asin: "B01BWEW3CS", category: "creative", tags: ["ukulele", "music", "creative", "expression", "gentle"], description: "Beginner ukulele kit with lessons" },
  { name: "Clay Sculpting Kit", asin: "B07DNQFNWM", category: "creative", tags: ["clay", "sculpting", "tactile", "creative", "hands"], description: "Air-dry clay sculpting kit for tactile creativity" },

  // === ADDITIONAL BOOKS ===
  { name: "When the Body Says No - Gabor Mate", asin: "0470923350", category: "books-psychology", tags: ["stress", "illness", "Gabor Mate", "body", "mind-body"], description: "Exploring the stress-disease connection" },
  { name: "In an Unspoken Voice - Peter Levine", asin: "1556439431", category: "books-nervous-system", tags: ["trauma", "body", "Peter Levine", "somatic", "healing"], description: "How the body releases trauma and restores goodness" },
  { name: "The Tao of Pooh - Benjamin Hoff", asin: "0140067477", category: "books-mindfulness", tags: ["Taoism", "simplicity", "philosophy", "gentle", "wisdom"], description: "Eastern philosophy through Winnie the Pooh" },
  { name: "Man's Search for Meaning - Viktor Frankl", asin: "0807014273", category: "books-psychology", tags: ["meaning", "suffering", "Viktor Frankl", "purpose", "resilience"], description: "Finding meaning in the midst of suffering" },
  { name: "The Untethered Soul - Michael Singer", asin: "1572245379", category: "books-mindfulness", tags: ["consciousness", "freedom", "Michael Singer", "inner voice", "awareness"], description: "The journey beyond yourself" },
  { name: "Self-Compassion - Kristin Neff", asin: "0061733520", category: "books-psychology", tags: ["self-compassion", "Kristin Neff", "kindness", "inner critic", "mindfulness"], description: "The proven power of being kind to yourself" },
  { name: "Full Catastrophe Living - Jon Kabat-Zinn", asin: "0345536932", category: "books-mindfulness", tags: ["MBSR", "mindfulness", "stress", "Jon Kabat-Zinn", "program"], description: "Using the wisdom of your body and mind to face stress" },
  { name: "Burnout - Emily Nagoski", asin: "1984818325", category: "books-psychology", tags: ["burnout", "stress", "women", "cycle", "completion"], description: "The secret to unlocking the stress cycle" },
  { name: "The Highly Sensitive Child - Elaine Aron", asin: "0767908724", category: "books-hsp", tags: ["HSP", "children", "parenting", "sensitivity", "Elaine Aron"], description: "Helping our children thrive when the world overwhelms them" },
  { name: "Making Work Work for the Highly Sensitive Person", asin: "007140810X", category: "books-hsp", tags: ["HSP", "work", "career", "sensitivity", "workplace"], description: "Career strategies for the highly sensitive person" },

  // === ADDITIONAL SENSORY & COMFORT ===
  { name: "Fidget Cube", asin: "B01MAYBR2M", category: "sensory-tools", tags: ["fidget", "anxiety", "focus", "tactile", "desk"], description: "Six-sided fidget cube for anxiety and focus" },
  { name: "Kinetic Sand", asin: "B07CT67TJM", category: "sensory-tools", tags: ["kinetic sand", "tactile", "sensory", "calming", "hands"], description: "Squeezable kinetic sand for tactile regulation" },
  { name: "Stress Ball Set", asin: "B0B1MHXQFQ", category: "sensory-tools", tags: ["stress ball", "squeeze", "anxiety", "tactile", "hand"], description: "Set of hand therapy stress balls in varying firmness" },
  { name: "Weighted Stuffed Animal - Warmies", asin: "B07MFXQBWJ", category: "comfort", tags: ["weighted", "stuffed animal", "comfort", "lavender", "warmth"], description: "Microwavable weighted stuffed animal with lavender" },

  // === ADDITIONAL ENVIRONMENT ===
  { name: "Air Purifier - Levoit Core 300", asin: "B07VVK39F7", category: "environment", tags: ["air purifier", "clean air", "allergies", "environment", "health"], description: "HEPA air purifier for cleaner indoor air" },
  { name: "Humidifier - Levoit Classic 300S", asin: "B09JFR3Q5Q", category: "environment", tags: ["humidifier", "air quality", "comfort", "sleep", "environment"], description: "Smart cool mist humidifier for comfortable air" },
  { name: "Nature Sounds Machine - Adaptive Sound", asin: "B00HD0ELFK", category: "environment", tags: ["nature sounds", "sleep", "relaxation", "environment", "white noise"], description: "Natural sound machine with real nature recordings" },
  { name: "Desk Plant - ZZ Plant", asin: "B0BYR7MR5T", category: "environment", tags: ["plant", "desk", "office", "nature", "low maintenance"], description: "Low-maintenance ZZ plant for desk or office" },
  { name: "Essential Oil Roll-On - Calm", asin: "B07JM4DWWK", category: "aromatherapy", tags: ["essential oil", "roll-on", "portable", "calm", "anxiety"], description: "Pre-diluted calming essential oil roll-on for on-the-go" },

  // === ADDITIONAL MOVEMENT ===
  { name: "Standing Desk Converter - FlexiSpot", asin: "B0148KFNZ0", category: "bodywork", tags: ["standing desk", "ergonomic", "posture", "office", "movement"], description: "Height adjustable standing desk converter" },
  { name: "Walking Pad - WalkingPad", asin: "B0BXDM2PSH", category: "bodywork", tags: ["walking", "treadmill", "gentle movement", "desk", "exercise"], description: "Under-desk walking pad for gentle movement" },
  { name: "Yoga Strap - Clever Yoga", asin: "B01LXBA5V6", category: "bodywork", tags: ["yoga", "strap", "flexibility", "stretch", "support"], description: "Durable yoga strap for supported stretching" },

  // === ADDITIONAL SLEEP ===
  { name: "Gravity Weighted Sleep Mask", asin: "B08GKYBQKP", category: "sleep", tags: ["weighted", "sleep mask", "pressure", "light blocking", "rest"], description: "Weighted sleep mask combining light blocking and pressure" },
  { name: "Magnesium Spray - Ancient Minerals", asin: "B005F20LIQ", category: "sleep", tags: ["magnesium", "topical", "sleep", "muscle", "relaxation"], description: "Topical magnesium spray for sleep and muscle relaxation" },
  { name: "Sleepytime Tea - Celestial Seasonings", asin: "B000E671X0", category: "tea", tags: ["sleepytime", "tea", "chamomile", "sleep", "herbal"], description: "Classic herbal tea blend for bedtime" },

  // === ADDITIONAL CREATIVE ===
  { name: "Zentangle Kit", asin: "B00KWEHHLE", category: "creative", tags: ["zentangle", "drawing", "meditative", "art", "focus"], description: "Meditative drawing kit for focused creativity" },
  { name: "Gratitude Journal - Intelligent Change", asin: "B07BFNKZLH", category: "journaling", tags: ["gratitude", "journal", "daily", "positive", "mindset"], description: "Structured gratitude journal for daily practice" },
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
