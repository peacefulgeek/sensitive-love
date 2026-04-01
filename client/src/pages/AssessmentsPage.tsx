import { useEffect, useState, useRef } from "react";
import { Link } from "wouter";

interface AssessmentQuestion {
  question: string;
  options: { text: string; score: number }[];
}

interface Assessment {
  id: string;
  title: string;
  description: string;
  timeEstimate: string;
  questions: AssessmentQuestion[];
  results: { min: number; max: number; title: string; description: string; recommendations: string[] }[];
}

const ASSESSMENTS: Assessment[] = [
  {
    id: "sensory-sensitivity-profile",
    title: "Sensory Sensitivity Profile",
    description: "A comprehensive assessment of your sensory processing across five modalities: visual, auditory, tactile, olfactory, and gustatory. Identifies your most and least sensitive channels.",
    timeEstimate: "8-10 minutes",
    questions: [
      { question: "Bright or flickering lights cause me physical discomfort.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I notice visual details that others miss (color shifts, movement, patterns).", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "Background noise makes it difficult for me to concentrate.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I can hear sounds that others cannot (electrical hums, distant conversations).", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "Certain fabric textures or clothing tags bother me significantly.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I am very aware of temperature changes in my environment.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "Strong smells (perfume, cleaning products, food) overwhelm me.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I can detect subtle scents that others do not notice.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I am sensitive to the taste or texture of certain foods.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "Sensory overload from multiple channels at once (noise + light + crowds) is my biggest challenge.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
    ],
    results: [
      { min: 0, max: 12, title: "Moderate Sensory Sensitivity", description: "Your sensory processing is within the typical range. You may notice some sensory input more than others, but it rarely disrupts your daily functioning.", recommendations: ["Continue building awareness of your sensory preferences", "Use sensory input intentionally for regulation (calming music, pleasant textures)", "Notice which environments help you focus best"] },
      { min: 13, max: 26, title: "Elevated Sensory Sensitivity", description: "You process sensory information more deeply than average. Certain environments and stimuli can significantly affect your energy, focus, and wellbeing.", recommendations: ["Create a sensory-friendly workspace (lighting, noise control, temperature)", "Carry a sensory toolkit (earplugs, sunglasses, essential oil)", "Schedule sensory breaks throughout your day", "Communicate your sensory needs to close relationships"] },
      { min: 27, max: 40, title: "High Sensory Sensitivity", description: "You have very high sensory processing sensitivity across multiple channels. Your nervous system processes environmental input at a deep level, which requires intentional environmental design.", recommendations: ["Audit your daily environments for sensory triggers", "Invest in noise-canceling headphones, blue-light glasses, and natural fiber clothing", "Build a dedicated sensory recovery space at home", "Consider working with an occupational therapist who specializes in sensory processing", "Practice bottom-up regulation (cold water, weighted blanket, bilateral stimulation)"] },
    ],
  },
  {
    id: "emotional-regulation-capacity",
    title: "Emotional Regulation Capacity Assessment",
    description: "Evaluate your current capacity to identify, process, and regulate emotional experiences. Covers emotional awareness, tolerance, and recovery.",
    timeEstimate: "8-10 minutes",
    questions: [
      { question: "I can name what I am feeling in any given moment.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I can sit with uncomfortable emotions without immediately trying to fix or escape them.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "After an emotional experience, I return to baseline within a reasonable time.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I can distinguish between my own emotions and those I have absorbed from others.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I have specific tools or practices I use when emotions become overwhelming.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I can express my emotions to others without being overwhelmed by them.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I recognize my emotional triggers before they escalate.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I can hold space for someone else's pain without losing my own center.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
    ],
    results: [
      { min: 0, max: 10, title: "Developing Regulation", description: "Your emotional regulation capacity is still developing. You may feel frequently overwhelmed by emotions or struggle to identify what you are feeling. This is a starting point, not a destination.", recommendations: ["Begin a daily emotion-naming practice (3 times per day, name the feeling)", "Start with one regulation tool and practice it daily (box breathing is a good first choice)", "Work with a therapist who understands emotional sensitivity", "Read about the window of tolerance and polyvagal theory"] },
      { min: 11, max: 21, title: "Building Regulation", description: "You have some emotional regulation capacity but it is inconsistent. You can manage emotions in calm conditions but may struggle when multiple stressors converge.", recommendations: ["Expand your regulation toolkit to include body-based practices", "Practice emotional granularity \u2014 naming emotions with more specificity", "Build a daily nervous system check-in routine", "Identify your top 3 emotional triggers and create response plans"] },
      { min: 22, max: 32, title: "Strong Regulation", description: "You have well-developed emotional regulation capacity. You can identify, process, and recover from emotional experiences effectively. Your sensitivity is well-integrated.", recommendations: ["Continue deepening your practice with advanced techniques", "Consider mentoring or supporting others in developing regulation skills", "Explore how your emotional depth can serve creative or professional goals", "Practice regulation in increasingly challenging contexts to build resilience"] },
    ],
  },
  {
    id: "burnout-risk",
    title: "HSP Burnout Risk Assessment",
    description: "Evaluate your current risk of sensitivity-related burnout across physical, emotional, cognitive, and social dimensions.",
    timeEstimate: "6-8 minutes",
    questions: [
      { question: "I wake up feeling tired even after adequate sleep.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I feel emotionally flat or numb.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I have difficulty concentrating or making decisions.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I avoid social situations I used to enjoy.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I feel resentful about demands on my time and energy.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "My body shows stress symptoms (headaches, digestive issues, muscle tension).", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I feel like I am running on empty.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I have lost interest in things that used to matter to me.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
    ],
    results: [
      { min: 0, max: 10, title: "Low Burnout Risk", description: "Your current stress and energy levels are manageable. You appear to be maintaining adequate self-care and boundaries. Continue your current practices.", recommendations: ["Maintain your current self-care routines", "Build buffer time into your schedule for unexpected demands", "Practice preventive regulation rather than reactive regulation"] },
      { min: 11, max: 21, title: "Moderate Burnout Risk", description: "You are showing early signs of burnout. Your reserves are depleting faster than they are replenishing. This is the critical window for intervention.", recommendations: ["Audit your commitments and eliminate non-essential demands", "Increase sleep by 30-60 minutes per night", "Add one daily regulation practice (walk, breathwork, journaling)", "Reduce screen time, especially in the evening", "Consider taking a mental health day within the next week"] },
      { min: 22, max: 32, title: "High Burnout Risk", description: "You are in or approaching burnout. Your nervous system is in a state of chronic depletion. Immediate action is needed to prevent deeper exhaustion.", recommendations: ["This is not a willpower issue \u2014 your nervous system needs rest", "Cancel or postpone all non-essential commitments for the next 2 weeks", "Prioritize sleep above all other interventions", "Seek professional support (therapist, coach, or healthcare provider)", "Practice radical permission to do less", "Consider whether your current lifestyle is sustainable for your nervous system"] },
    ],
  },
  {
    id: "attachment-sensitivity",
    title: "Attachment & Sensitivity Assessment",
    description: "Explore how your attachment patterns interact with your sensitivity trait. Understand your relational needs and growth edges.",
    timeEstimate: "8-10 minutes",
    questions: [
      { question: "I worry about being abandoned or rejected by people I care about.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I find it difficult to depend on others or let them get close.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I need more reassurance than most people in relationships.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I feel overwhelmed by closeness and need to pull away.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I can communicate my needs clearly in close relationships.", options: [{ text: "Always", score: 0 }, { text: "Often", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Rarely", score: 3 }, { text: "Never", score: 4 }] },
      { question: "I feel safe being vulnerable with the people closest to me.", options: [{ text: "Always", score: 0 }, { text: "Often", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Rarely", score: 3 }, { text: "Never", score: 4 }] },
      { question: "Small relational ruptures (a missed text, a tone shift) feel catastrophic.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I oscillate between wanting deep connection and needing complete independence.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
    ],
    results: [
      { min: 0, max: 10, title: "Secure Attachment with Sensitivity", description: "You have a secure attachment style that works well with your sensitivity. You can be close without losing yourself and independent without feeling abandoned.", recommendations: ["Continue nurturing your secure base", "Use your sensitivity as a relational superpower \u2014 attunement, empathy, depth", "Model healthy attachment for others in your life"] },
      { min: 11, max: 21, title: "Anxious-Sensitive Pattern", description: "Your sensitivity amplifies attachment anxiety. You may read into small relational cues, need more reassurance, and struggle with the space between connection and independence.", recommendations: ["Practice self-soothing before seeking reassurance from others", "Build a daily self-regulation practice to calm attachment activation", "Learn to distinguish between intuition and anxiety", "Work with a therapist who understands both attachment and sensitivity"] },
      { min: 22, max: 32, title: "Avoidant-Sensitive Pattern", description: "Your sensitivity may have led you to develop protective distance in relationships. You feel deeply but have learned to manage that depth by withdrawing.", recommendations: ["Practice small acts of vulnerability with safe people", "Notice when withdrawal is protective versus when it is habitual", "Explore somatic approaches to relational safety", "Consider that your sensitivity needs connection, even when your nervous system says otherwise"] },
    ],
  },
  {
    id: "creative-sensitivity",
    title: "Creative Sensitivity Assessment",
    description: "Measure how your sensitivity fuels creative expression and identify which creative modalities align with your processing style.",
    timeEstimate: "6-8 minutes",
    questions: [
      { question: "I experience creative ideas as physical sensations or emotional surges.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I process difficult experiences through creative expression (writing, art, music).", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I notice aesthetic details that others overlook.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "Creative work leaves me feeling both energized and depleted.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I need solitude and silence to access my deepest creative work.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I am deeply affected by the creative work of others (moved to tears by a painting, a poem, a piece of music).", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
    ],
    results: [
      { min: 0, max: 7, title: "Latent Creative Sensitivity", description: "Your creative sensitivity is present but may not yet be fully expressed. There is creative potential waiting to be activated through the right conditions and practices.", recommendations: ["Experiment with low-pressure creative activities (doodling, free-writing, humming)", "Remove perfectionism as a barrier to creative expression", "Create a dedicated creative space, even if small", "Try morning pages \u2014 three pages of stream-of-consciousness writing each morning"] },
      { min: 8, max: 16, title: "Active Creative Sensitivity", description: "You actively channel your sensitivity into creative expression. Your depth of processing gives you access to nuance, beauty, and meaning that enriches your creative work.", recommendations: ["Protect your creative time as non-negotiable", "Develop a pre-creative ritual that signals your nervous system to open", "Alternate between generative and restorative creative practices", "Share your work \u2014 your sensitivity-informed perspective is needed"] },
      { min: 17, max: 24, title: "Deep Creative Sensitivity", description: "Creativity is central to how you process and make meaning of your experience. Your sensitivity and creativity are deeply intertwined \u2014 one feeds the other.", recommendations: ["Honor the cyclical nature of your creative process (fallow periods are productive)", "Build recovery time into your creative schedule", "Explore cross-modal creativity (if you write, try painting; if you paint, try music)", "Consider your creative work as a form of nervous system regulation", "Your work has the potential to help others understand their own sensitivity"] },
    ],
  },
  {
    id: "energy-management",
    title: "Energy Management Assessment",
    description: "Evaluate how effectively you manage your energy as a sensitive person. Covers energy inputs, outputs, recovery, and sustainability.",
    timeEstimate: "8-10 minutes",
    questions: [
      { question: "I know which activities drain my energy and which replenish it.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I schedule recovery time after high-stimulation activities.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I say no to commitments that exceed my energy budget.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I have a morning routine that sets my energy for the day.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I notice early signs of energy depletion before I crash.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "My sleep quality supports my energy needs.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I have clear boundaries around technology and screen time.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "My weekly schedule reflects my energy reality, not just my ambitions.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
    ],
    results: [
      { min: 0, max: 10, title: "Energy Deficit", description: "You are currently spending more energy than you are replenishing. Your energy management systems need significant restructuring to support your sensitive nervous system.", recommendations: ["Start tracking your energy levels 3 times daily for one week", "Identify your top 3 energy drains and create boundaries around them", "Add one restorative practice per day (even 10 minutes counts)", "Prioritize sleep as your primary energy intervention", "Consider that your current pace may not be sustainable for your nervous system"] },
      { min: 11, max: 21, title: "Energy Awareness", description: "You have awareness of your energy patterns but inconsistent practices. You know what helps but do not always prioritize it.", recommendations: ["Move from awareness to action \u2014 schedule your regulation practices", "Create an energy budget for each week and stick to it", "Build transition rituals between high-demand activities", "Automate energy-protective habits (phone curfew, meal prep, sleep schedule)"] },
      { min: 22, max: 32, title: "Energy Mastery", description: "You have developed strong energy management skills. You understand your capacity, protect your resources, and recover effectively. This is a significant achievement for a sensitive person.", recommendations: ["Continue refining your system as your life changes", "Share your energy management strategies with other sensitive people", "Explore how surplus energy can be directed toward creative or meaningful projects", "Practice energy generosity from a place of abundance, not depletion"] },
    ],
  },
  {
    id: "spiritual-sensitivity",
    title: "Spiritual Sensitivity Assessment",
    description: "Explore the intersection of your sensitivity and spiritual or contemplative experience. Covers presence, transcendence, interconnection, and meaning-making.",
    timeEstimate: "6-8 minutes",
    questions: [
      { question: "I have moments of profound connection to something larger than myself.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "Nature evokes a sense of awe or reverence in me.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I sense the interconnection of all living things.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "Silence and solitude feel nourishing rather than empty.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I experience synchronicities or meaningful coincidences.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "My sensitivity feels like it has a purpose beyond personal comfort.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I am drawn to contemplative or meditative practices.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I feel that my sensitivity gives me access to dimensions of experience that others do not perceive.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
    ],
    results: [
      { min: 0, max: 10, title: "Grounded Sensitivity", description: "Your sensitivity is primarily expressed through practical, embodied channels. Spiritual or transcendent experiences may not be central to your identity, and that is perfectly valid.", recommendations: ["Explore body-based practices (yoga, tai chi, walking meditation) as entry points", "Notice moments of awe or beauty in daily life without forcing meaning", "Your grounded approach to sensitivity has its own wisdom"] },
      { min: 11, max: 21, title: "Emerging Spiritual Sensitivity", description: "You have glimpses of the spiritual dimension of sensitivity \u2014 moments of awe, connection, or meaning that transcend the ordinary. These experiences are invitations to explore further.", recommendations: ["Develop a regular contemplative practice (meditation, prayer, journaling)", "Spend intentional time in nature as a spiritual practice", "Read contemplative writers who bridge science and spirituality", "Visit kalesh.love for guided exploration of these themes"] },
      { min: 22, max: 32, title: "Deep Spiritual Sensitivity", description: "Spirituality and sensitivity are deeply intertwined in your experience. You perceive dimensions of reality that inform your understanding of yourself and the world. This is both a gift and a responsibility.", recommendations: ["Deepen your contemplative practice with a teacher or community", "Explore how your spiritual sensitivity can serve others", "Balance transcendent experiences with embodied, grounded practices", "Visit kalesh.love for advanced contemplative resources and guided sessions", "Your sensitivity may be pointing toward a calling \u2014 listen to it"] },
    ],
  },
  {
    id: "hsp-resilience",
    title: "HSP Resilience Assessment",
    description: "Measure your current resilience as a sensitive person across five domains: physical, emotional, cognitive, social, and spiritual.",
    timeEstimate: "10-12 minutes",
    questions: [
      { question: "I bounce back from setbacks within a reasonable timeframe.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I maintain physical health practices even during stressful periods.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I can hold multiple emotions simultaneously without being overwhelmed.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I can think clearly under pressure.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I have people I can turn to for support during difficult times.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I find meaning in difficult experiences.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I adapt to change without losing my sense of self.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I trust my ability to handle whatever comes.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I learn from my mistakes without excessive self-criticism.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
      { question: "I maintain hope even during dark periods.", options: [{ text: "Never", score: 0 }, { text: "Rarely", score: 1 }, { text: "Sometimes", score: 2 }, { text: "Often", score: 3 }, { text: "Always", score: 4 }] },
    ],
    results: [
      { min: 0, max: 13, title: "Building Resilience", description: "Your resilience is still developing. Setbacks may feel overwhelming, and recovery takes longer than you would like. This is not a reflection of weakness \u2014 it is a starting point for growth.", recommendations: ["Focus on one resilience domain at a time (start with physical or social)", "Build a support network of people who understand sensitivity", "Practice self-compassion as a resilience tool", "Start small \u2014 micro-challenges build resilience over time", "Consider professional support to build your resilience foundation"] },
      { min: 14, max: 26, title: "Moderate Resilience", description: "You have moderate resilience with some areas stronger than others. You can handle most challenges but may struggle with prolonged stress or multiple simultaneous demands.", recommendations: ["Identify your weakest resilience domain and focus development there", "Build redundancy in your support systems", "Practice stress inoculation \u2014 gradually increasing challenge in controlled conditions", "Develop a crisis plan for high-stress periods"] },
      { min: 27, max: 40, title: "Strong Resilience", description: "You have developed strong resilience as a sensitive person. You can navigate difficulty while maintaining your wellbeing and sense of self. This is a remarkable achievement.", recommendations: ["Share your resilience strategies with others", "Continue challenging yourself in growth-promoting ways", "Use your resilience to take on meaningful work that requires emotional strength", "Remember that resilience is not about never struggling \u2014 it is about recovering well"] },
    ],
  },
];

function AssessmentComponent({ assessment, onBack }: { assessment: Assessment; onBack: () => void }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    if (currentQ < assessment.questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const totalScore = answers.reduce((sum, s) => sum + s, 0);
  const maxScore = assessment.questions.length * 4;
  const result = assessment.results.find(
    (r) => totalScore >= r.min && totalScore <= r.max
  ) || assessment.results[assessment.results.length - 1];

  const exportPDF = () => {
    const content = `
THE EMPOWERED SENSITIVE — ASSESSMENT RESULTS
=============================================

Assessment: ${assessment.title}
Date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
Score: ${totalScore} / ${maxScore}

RESULT: ${result.title}

${result.description}

RECOMMENDATIONS:
${result.recommendations.map((r, i) => `${i + 1}. ${r}`).join("\n")}

---

Your Answers:
${assessment.questions.map((q, i) => `${i + 1}. ${q.question}\n   Answer: ${q.options.find(o => o.score === answers[i])?.text || "N/A"}`).join("\n\n")}

---
The Empowered Sensitive | sensitive.love
By Kalesh — Consciousness Teacher & Writer | kalesh.love
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${assessment.id}-results.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (showResult) {
    return (
      <div ref={resultRef}>
        <button onClick={onBack} className="font-ui text-sm text-muted-foreground hover:text-foreground mb-6 flex items-center gap-2">
          &larr; Back to all assessments
        </button>
        <div className="thick-rule pt-4 mb-6">
          <h2 className="text-2xl font-bold mb-2">Your Assessment Results</h2>
          <p className="text-sm text-muted-foreground">Score: {totalScore} / {maxScore}</p>
        </div>
        <div className="border-2 border-foreground p-6 mb-6">
          <h3 className="text-xl font-bold mb-3 gold-accent">{result.title}</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">{result.description}</p>
          <h4 className="font-ui text-xs font-bold tracking-wider uppercase mb-3 text-muted-foreground">Recommendations</h4>
          <ul className="space-y-2">
            {result.recommendations.map((rec, i) => (
              <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                <span className="font-bold text-foreground flex-shrink-0">{i + 1}.</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-3 mb-8">
          <button onClick={exportPDF} className="font-ui text-xs tracking-wider uppercase px-4 py-2 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors">
            Download Results
          </button>
          <button onClick={() => { setCurrentQ(0); setAnswers([]); setShowResult(false); }} className="font-ui text-xs tracking-wider uppercase px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">
            Retake Assessment
          </button>
        </div>
        <div className="border border-border/60 bg-secondary/30 p-5">
          <h4 className="font-ui text-xs font-bold tracking-wider uppercase mb-2 text-muted-foreground">Educational Disclaimer</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This assessment is for educational and self-reflection purposes only. It is not a clinical assessment or diagnostic tool. For professional evaluation, consult a qualified healthcare provider.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack} className="font-ui text-sm text-muted-foreground hover:text-foreground mb-6 flex items-center gap-2">
        &larr; Back to all assessments
      </button>
      <div className="thick-rule pt-4 mb-6">
        <h2 className="text-xl font-bold mb-1">{assessment.title}</h2>
        <p className="text-sm text-muted-foreground">Question {currentQ + 1} of {assessment.questions.length}</p>
      </div>
      <div className="mb-2 h-1 bg-muted">
        <div className="h-1 bg-foreground transition-all" style={{ width: `${((currentQ) / assessment.questions.length) * 100}%` }} />
      </div>
      <div className="py-6">
        <p className="text-lg font-bold mb-6">{assessment.questions[currentQ].question}</p>
        <div className="space-y-3">
          {assessment.questions[currentQ].options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(option.score)}
              className="w-full text-left p-4 border border-border hover:border-foreground hover:bg-secondary/50 transition-colors"
            >
              <span className="text-sm">{option.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AssessmentsPage() {
  const [activeAssessment, setActiveAssessment] = useState<string | null>(null);

  useEffect(() => {
    document.title = "HSP Assessments — The Empowered Sensitive";
    window.scrollTo(0, 0);
  }, []);

  const assessment = ASSESSMENTS.find((a) => a.id === activeAssessment);

  if (assessment) {
    return (
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <AssessmentComponent assessment={assessment} onBack={() => setActiveAssessment(null)} />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="thick-rule pt-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">HSP Assessments</h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-2">
            Eight comprehensive assessments for deeper self-understanding. Each assessment includes detailed results with personalized recommendations you can download. More thorough than our quizzes, these tools help you map your sensitivity across multiple dimensions.
          </p>
          <p className="text-sm text-muted-foreground">
            Created by{" "}
            <a href="https://kalesh.love" className="gold-accent hover:underline" target="_blank" rel="noopener">Kalesh</a>
            {" "}&mdash; for educational purposes only.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ASSESSMENTS.map((a) => (
            <button
              key={a.id}
              onClick={() => { setActiveAssessment(a.id); window.scrollTo(0, 0); }}
              className="text-left border border-border/60 bg-secondary/20 p-5 hover:border-foreground transition-colors group"
            >
              <h3 className="font-bold text-lg mb-2 group-hover:text-gold-accent transition-colors">
                {a.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {a.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-ui text-xs text-muted-foreground">{a.timeEstimate}</span>
                <span className="font-ui text-xs tracking-wider uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                  Begin &rarr;
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="thick-rule pt-6 mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            For quicker self-discovery, try our{" "}
            <Link href="/quizzes" className="gold-accent hover:underline">
              Quizzes
            </Link>{" "}
            — shorter explorations of specific sensitivity themes.
          </p>
        </div>
      </div>
    </div>
  );
}
