import { useEffect, useState, useRef } from "react";
import { Link } from "wouter";

interface QuizQuestion {
  question: string;
  options: { text: string; score: number }[];
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  results: { min: number; max: number; title: string; description: string }[];
}

const QUIZZES: Quiz[] = [
  {
    id: "hsp-self-test",
    title: "Are You Highly Sensitive?",
    description: "Based on Elaine Aron's original HSP Self-Test. Discover whether you have the trait of high sensory processing sensitivity.",
    questions: [
      { question: "I am easily overwhelmed by strong sensory input.", options: [{ text: "Not at all", score: 0 }, { text: "Somewhat", score: 1 }, { text: "Very much", score: 2 }] },
      { question: "I seem to be aware of subtleties in my environment.", options: [{ text: "Not at all", score: 0 }, { text: "Somewhat", score: 1 }, { text: "Very much", score: 2 }] },
      { question: "Other people's moods affect me.", options: [{ text: "Not at all", score: 0 }, { text: "Somewhat", score: 1 }, { text: "Very much", score: 2 }] },
      { question: "I tend to be very sensitive to pain.", options: [{ text: "Not at all", score: 0 }, { text: "Somewhat", score: 1 }, { text: "Very much", score: 2 }] },
      { question: "I find myself needing to withdraw during busy days.", options: [{ text: "Not at all", score: 0 }, { text: "Somewhat", score: 1 }, { text: "Very much", score: 2 }] },
      { question: "I am particularly sensitive to the effects of caffeine.", options: [{ text: "Not at all", score: 0 }, { text: "Somewhat", score: 1 }, { text: "Very much", score: 2 }] },
      { question: "I am easily overwhelmed by things like bright lights, strong smells, or coarse fabrics.", options: [{ text: "Not at all", score: 0 }, { text: "Somewhat", score: 1 }, { text: "Very much", score: 2 }] },
      { question: "I have a rich, complex inner life.", options: [{ text: "Not at all", score: 0 }, { text: "Somewhat", score: 1 }, { text: "Very much", score: 2 }] },
      { question: "I am made uncomfortable by loud noises.", options: [{ text: "Not at all", score: 0 }, { text: "Somewhat", score: 1 }, { text: "Very much", score: 2 }] },
      { question: "I am deeply moved by the arts or music.", options: [{ text: "Not at all", score: 0 }, { text: "Somewhat", score: 1 }, { text: "Very much", score: 2 }] },
    ],
    results: [
      { min: 0, max: 6, title: "Low Sensitivity", description: "Your responses suggest you may not have the HSP trait. You likely process sensory input at a standard level. This does not mean you lack depth \u2014 it simply means your nervous system filters stimuli differently." },
      { min: 7, max: 13, title: "Moderate Sensitivity", description: "You show moderate sensitivity traits. You likely notice subtleties that others miss and may need more downtime than average. Understanding your patterns can help you create environments that support your processing style." },
      { min: 14, max: 20, title: "High Sensitivity", description: "Your responses strongly suggest the HSP trait. You process sensory and emotional information deeply, which is both a gift and a challenge. Learning to work with your sensitivity \u2014 rather than against it \u2014 is the key to thriving." },
    ],
  },
  {
    id: "overstimulation-patterns",
    title: "What Are Your Overstimulation Patterns?",
    description: "Identify which types of stimulation affect you most and discover your personal overstimulation signature.",
    questions: [
      { question: "After a crowded social event, I need:", options: [{ text: "A few minutes alone", score: 0 }, { text: "An hour or two of quiet", score: 1 }, { text: "The rest of the day to recover", score: 2 }] },
      { question: "Fluorescent lighting makes me feel:", options: [{ text: "Fine", score: 0 }, { text: "Slightly uncomfortable", score: 1 }, { text: "Drained or headachy", score: 2 }] },
      { question: "When multiple people talk at once, I:", options: [{ text: "Can follow along", score: 0 }, { text: "Get a bit lost", score: 1 }, { text: "Feel overwhelmed and shut down", score: 2 }] },
      { question: "Strong emotions from others:", options: [{ text: "I notice but stay separate", score: 0 }, { text: "Affect my mood somewhat", score: 1 }, { text: "I absorb them as if they were mine", score: 2 }] },
      { question: "After watching an intense movie, I:", options: [{ text: "Move on quickly", score: 0 }, { text: "Think about it for a while", score: 1 }, { text: "Feel it in my body for hours", score: 2 }] },
      { question: "Unexpected schedule changes make me:", options: [{ text: "Adapt easily", score: 0 }, { text: "Feel slightly unsettled", score: 1 }, { text: "Feel deeply destabilized", score: 2 }] },
      { question: "In a new environment, I first notice:", options: [{ text: "The general layout", score: 0 }, { text: "The atmosphere and energy", score: 1 }, { text: "Every detail \u2014 sounds, smells, textures, lighting", score: 2 }] },
      { question: "My energy at the end of a workday is:", options: [{ text: "Usually fine", score: 0 }, { text: "Somewhat depleted", score: 1 }, { text: "Completely drained most days", score: 2 }] },
    ],
    results: [
      { min: 0, max: 5, title: "Resilient Processor", description: "You handle stimulation well and recover quickly. Your nervous system has a high threshold for input. You may still benefit from intentional rest, but overstimulation is not a primary challenge for you." },
      { min: 6, max: 10, title: "Selective Sensitivity", description: "Certain types of stimulation affect you more than others. Identifying your specific triggers \u2014 whether auditory, emotional, visual, or social \u2014 will help you create targeted strategies for regulation." },
      { min: 11, max: 16, title: "Deep Processor", description: "You process stimulation at a very deep level, which means you need more recovery time and more intentional boundaries. This is not a flaw \u2014 it is how your nervous system is wired. Building a lifestyle that respects this is essential." },
    ],
  },
  {
    id: "nervous-system-state",
    title: "What Is Your Nervous System State Right Now?",
    description: "A quick check-in to identify whether your autonomic nervous system is in ventral vagal (safe), sympathetic (fight/flight), or dorsal vagal (shutdown).",
    questions: [
      { question: "Right now, my breathing feels:", options: [{ text: "Easy and natural", score: 0 }, { text: "Shallow or tight", score: 1 }, { text: "Almost absent \u2014 I have to remind myself", score: 2 }] },
      { question: "My body feels:", options: [{ text: "Relaxed and present", score: 0 }, { text: "Tense or restless", score: 1 }, { text: "Heavy, numb, or disconnected", score: 2 }] },
      { question: "My thoughts are:", options: [{ text: "Clear and focused", score: 0 }, { text: "Racing or scattered", score: 1 }, { text: "Foggy or blank", score: 2 }] },
      { question: "If someone asked me how I feel, I would:", options: [{ text: "Know immediately", score: 0 }, { text: "Need a moment to figure it out", score: 1 }, { text: "Not really know", score: 2 }] },
      { question: "My energy level is:", options: [{ text: "Steady and available", score: 0 }, { text: "Wired or anxious", score: 1 }, { text: "Flat or depleted", score: 2 }] },
      { question: "I feel connected to the people around me:", options: [{ text: "Yes, naturally", score: 0 }, { text: "I feel on guard or defensive", score: 1 }, { text: "I feel withdrawn or isolated", score: 2 }] },
    ],
    results: [
      { min: 0, max: 3, title: "Ventral Vagal (Safe & Social)", description: "Your nervous system is in a regulated state. You feel present, connected, and capable of engaging with the world. This is the state where healing, creativity, and deep connection happen." },
      { min: 4, max: 8, title: "Sympathetic Activation (Fight/Flight)", description: "Your nervous system is mobilized. You may feel anxious, restless, or on edge. This is your body preparing for action. Grounding practices, slow breathing, and bilateral stimulation can help you return to regulation." },
      { min: 9, max: 12, title: "Dorsal Vagal (Shutdown)", description: "Your nervous system has moved into conservation mode. You may feel numb, disconnected, or exhausted. Gentle movement, warm beverages, and co-regulation with a safe person can help you slowly re-engage." },
    ],
  },
  {
    id: "sensitivity-strengths",
    title: "What Are Your Sensitivity Strengths?",
    description: "Discover which of the four core HSP strengths \u2014 depth of processing, emotional responsiveness, sensory awareness, or pattern recognition \u2014 is most developed in you.",
    questions: [
      { question: "When making a decision, I tend to:", options: [{ text: "Consider every angle thoroughly", score: 0 }, { text: "Feel my way to the right answer", score: 1 }, { text: "Notice details others miss", score: 2 }, { text: "See the bigger pattern", score: 3 }] },
      { question: "People most often come to me for:", options: [{ text: "Thoughtful analysis", score: 0 }, { text: "Emotional support", score: 1 }, { text: "Noticing what's off", score: 2 }, { text: "Seeing connections", score: 3 }] },
      { question: "In a new space, I first notice:", options: [{ text: "The meaning of the space", score: 0 }, { text: "How it makes me feel", score: 1 }, { text: "The sensory details", score: 2 }, { text: "How things relate to each other", score: 3 }] },
      { question: "My creative expression tends toward:", options: [{ text: "Writing or analysis", score: 0 }, { text: "Music or emotional art", score: 1 }, { text: "Visual or tactile art", score: 2 }, { text: "Systems or design", score: 3 }] },
      { question: "When something feels wrong, I:", options: [{ text: "Think it through systematically", score: 0 }, { text: "Feel it in my body first", score: 1 }, { text: "Notice the specific sensory cue", score: 2 }, { text: "See the pattern that's breaking", score: 3 }] },
      { question: "My greatest asset in relationships is:", options: [{ text: "Understanding complexity", score: 0 }, { text: "Emotional attunement", score: 1 }, { text: "Noticing subtle shifts", score: 2 }, { text: "Seeing the whole picture", score: 3 }] },
    ],
    results: [
      { min: 0, max: 4, title: "Depth of Processing", description: "Your primary strength is deep cognitive processing. You think thoroughly, consider multiple perspectives, and arrive at insights that others miss. This makes you an exceptional analyst, writer, and problem-solver." },
      { min: 5, max: 8, title: "Emotional Responsiveness", description: "Your primary strength is emotional depth. You feel deeply, connect authentically, and bring emotional intelligence to every interaction. This makes you a natural healer, counselor, and creative." },
      { min: 9, max: 13, title: "Sensory Awareness", description: "Your primary strength is sensory acuity. You notice details, textures, sounds, and shifts that others overlook. This makes you an exceptional designer, artist, and quality assessor." },
      { min: 14, max: 18, title: "Pattern Recognition", description: "Your primary strength is seeing connections. You recognize patterns across domains, anticipate outcomes, and synthesize information intuitively. This makes you a natural strategist and visionary." },
    ],
  },
  {
    id: "boundary-style",
    title: "What Is Your Boundary Style?",
    description: "Understand how you set and maintain boundaries as a sensitive person \u2014 and where your growth edges are.",
    questions: [
      { question: "When someone asks me to do something I don't want to do:", options: [{ text: "I say no clearly", score: 0 }, { text: "I hesitate but eventually decline", score: 1 }, { text: "I usually say yes and regret it", score: 2 }] },
      { question: "After saying no to someone, I feel:", options: [{ text: "Fine \u2014 it was the right choice", score: 0 }, { text: "Slightly guilty but okay", score: 1 }, { text: "Terrible \u2014 I replay it for hours", score: 2 }] },
      { question: "In conversations, I tend to:", options: [{ text: "Share and listen equally", score: 0 }, { text: "Listen more than I share", score: 1 }, { text: "Absorb the other person's energy completely", score: 2 }] },
      { question: "When I need alone time, I:", options: [{ text: "Take it without explanation", score: 0 }, { text: "Feel I need to justify it", score: 1 }, { text: "Push through and skip it", score: 2 }] },
      { question: "My energy after being with a difficult person:", options: [{ text: "Returns quickly", score: 0 }, { text: "Takes a while to recover", score: 1 }, { text: "Stays depleted for a long time", score: 2 }] },
      { question: "I know what I need in a given moment:", options: [{ text: "Almost always", score: 0 }, { text: "Sometimes", score: 1 }, { text: "Rarely \u2014 I'm more attuned to others' needs", score: 2 }] },
      { question: "When someone crosses a boundary, I:", options: [{ text: "Address it directly", score: 0 }, { text: "Feel it but don't always speak up", score: 1 }, { text: "Absorb it and move on", score: 2 }] },
    ],
    results: [
      { min: 0, max: 4, title: "Clear Boundaries", description: "You have strong, healthy boundaries. You know your limits, communicate them clearly, and protect your energy without guilt. This is a significant strength for a sensitive person." },
      { min: 5, max: 9, title: "Developing Boundaries", description: "You are aware of your boundaries but sometimes struggle to enforce them. The awareness is there \u2014 the practice is still developing. Focus on small, consistent boundary-setting in low-stakes situations." },
      { min: 10, max: 14, title: "Porous Boundaries", description: "You tend to absorb others' emotions and needs at the expense of your own. This is common for sensitive people and is not a character flaw \u2014 it is a pattern that can be rewired with practice. Start with one boundary per day." },
    ],
  },
  {
    id: "regulation-toolkit",
    title: "What Regulation Tools Work Best for You?",
    description: "Discover which nervous system regulation strategies align with your body's natural preferences.",
    questions: [
      { question: "When stressed, I instinctively want to:", options: [{ text: "Move my body", score: 0 }, { text: "Be still and breathe", score: 1 }, { text: "Connect with someone", score: 2 }, { text: "Create something", score: 3 }] },
      { question: "The environment that calms me most is:", options: [{ text: "Nature \u2014 trees, water, open sky", score: 0 }, { text: "A quiet, dark room", score: 1 }, { text: "Being held or near someone safe", score: 2 }, { text: "My creative workspace", score: 3 }] },
      { question: "Music affects me by:", options: [{ text: "Making me want to move", score: 0 }, { text: "Slowing my breathing", score: 1 }, { text: "Connecting me to emotions", score: 2 }, { text: "Inspiring ideas", score: 3 }] },
      { question: "After a difficult day, I recover best by:", options: [{ text: "Walking or yoga", score: 0 }, { text: "Meditation or bath", score: 1 }, { text: "Talking to a trusted person", score: 2 }, { text: "Writing, drawing, or making", score: 3 }] },
      { question: "My body responds most to:", options: [{ text: "Physical movement", score: 0 }, { text: "Stillness and silence", score: 1 }, { text: "Touch and warmth", score: 2 }, { text: "Rhythm and flow", score: 3 }] },
    ],
    results: [
      { min: 0, max: 4, title: "Movement-Based Regulation", description: "Your nervous system regulates best through physical movement. Walking, yoga, dance, and somatic exercises are your primary tools. Your body needs to discharge energy through motion." },
      { min: 5, max: 9, title: "Stillness-Based Regulation", description: "Your nervous system regulates best through quiet and stillness. Meditation, breathwork, baths, and sensory reduction are your primary tools. Your body needs space to process." },
      { min: 10, max: 14, title: "Connection-Based Regulation", description: "Your nervous system regulates best through co-regulation with safe people. Conversation, physical touch, and shared presence are your primary tools. Your body needs relational safety." },
      { min: 15, max: 20, title: "Creative-Based Regulation", description: "Your nervous system regulates best through creative expression. Writing, art, music, and making are your primary tools. Your body needs to transform experience into form." },
    ],
  },
  {
    id: "hsp-workplace",
    title: "How Does Sensitivity Show Up at Work?",
    description: "Understand your workplace sensitivity patterns and discover strategies for thriving professionally.",
    questions: [
      { question: "Open office environments make me:", options: [{ text: "Productive \u2014 I like the energy", score: 0 }, { text: "Somewhat distracted", score: 1 }, { text: "Completely unable to focus", score: 2 }] },
      { question: "After receiving critical feedback, I:", options: [{ text: "Process it and move on", score: 0 }, { text: "Think about it for a day", score: 1 }, { text: "Replay it for weeks", score: 2 }] },
      { question: "In meetings, I tend to:", options: [{ text: "Speak up easily", score: 0 }, { text: "Wait for the right moment", score: 1 }, { text: "Have great ideas but struggle to share them", score: 2 }] },
      { question: "Workplace conflict makes me:", options: [{ text: "Uncomfortable but I handle it", score: 0 }, { text: "Anxious and distracted", score: 1 }, { text: "Physically ill or unable to function", score: 2 }] },
      { question: "My best work happens when:", options: [{ text: "I'm part of a team", score: 0 }, { text: "I have some autonomy", score: 1 }, { text: "I have complete control over my environment", score: 2 }] },
      { question: "At the end of a workday, I:", options: [{ text: "Have energy for evening plans", score: 0 }, { text: "Need some transition time", score: 1 }, { text: "Am completely depleted", score: 2 }] },
    ],
    results: [
      { min: 0, max: 3, title: "Workplace Resilient", description: "You navigate workplace demands well. Your sensitivity may give you advantages in reading team dynamics and producing quality work without the typical HSP challenges." },
      { min: 4, max: 8, title: "Workplace Adaptive", description: "You manage workplace sensitivity with some effort. Strategic adjustments \u2014 noise-canceling headphones, scheduled breaks, written communication preferences \u2014 can make a significant difference." },
      { min: 9, max: 12, title: "Workplace Sensitive", description: "The standard workplace is genuinely challenging for your nervous system. Consider remote work, flexible hours, or roles with high autonomy. Your sensitivity is an asset \u2014 but only in the right environment." },
    ],
  },
  {
    id: "hsp-relationship",
    title: "How Does Sensitivity Affect Your Relationships?",
    description: "Explore how your sensitivity shapes your closest relationships and discover your relational strengths.",
    questions: [
      { question: "In close relationships, I tend to:", options: [{ text: "Maintain healthy independence", score: 0 }, { text: "Merge somewhat with my partner's emotions", score: 1 }, { text: "Lose myself in the other person's experience", score: 2 }] },
      { question: "When my partner is upset, I:", options: [{ text: "Offer support while staying grounded", score: 0 }, { text: "Feel their pain but can separate", score: 1 }, { text: "Feel it as intensely as they do", score: 2 }] },
      { question: "I need alone time in relationships:", options: [{ text: "Occasionally", score: 0 }, { text: "Regularly", score: 1 }, { text: "Constantly \u2014 and feel guilty about it", score: 2 }] },
      { question: "Conflict in relationships makes me:", options: [{ text: "Want to resolve it directly", score: 0 }, { text: "Feel anxious but I engage", score: 1 }, { text: "Shut down or flee", score: 2 }] },
      { question: "My greatest relationship strength is:", options: [{ text: "Loyalty and commitment", score: 0 }, { text: "Emotional attunement", score: 1 }, { text: "Deep understanding of my partner", score: 2 }] },
      { question: "What I struggle with most in relationships:", options: [{ text: "Expressing vulnerability", score: 0 }, { text: "Setting boundaries", score: 1 }, { text: "Not taking everything personally", score: 2 }] },
    ],
    results: [
      { min: 0, max: 3, title: "Grounded Partner", description: "You bring stability and presence to relationships. Your sensitivity enhances your connection without overwhelming it. You likely model healthy emotional regulation for those around you." },
      { min: 4, max: 8, title: "Empathic Partner", description: "You feel deeply in relationships and bring extraordinary emotional intelligence. Your growth edge is maintaining your own center while staying connected. Practice noticing where you end and your partner begins." },
      { min: 9, max: 12, title: "Absorptive Partner", description: "You merge deeply with your partner's emotional world, which creates profound intimacy but can also lead to burnout. Learning to love without losing yourself is your core relationship work." },
    ],
  },
];

function QuizComponent({ quiz, onBack }: { quiz: Quiz; onBack: () => void }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const totalScore = answers.reduce((sum, s) => sum + s, 0);
  const result = quiz.results.find(
    (r) => totalScore >= r.min && totalScore <= r.max
  ) || quiz.results[quiz.results.length - 1];

  const exportPDF = () => {
    const content = `
THE EMPOWERED SENSITIVE — QUIZ RESULTS
=======================================

Quiz: ${quiz.title}
Date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
Score: ${totalScore} / ${quiz.questions.length * 2}

RESULT: ${result.title}

${result.description}

---

Your Answers:
${quiz.questions.map((q, i) => `${i + 1}. ${q.question}\n   Answer: ${q.options.find(o => o.score === answers[i])?.text || "N/A"}`).join("\n\n")}

---
The Empowered Sensitive | sensitive.love
By Kalesh — Consciousness Teacher & Writer | kalesh.love
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${quiz.id}-results.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (showResult) {
    return (
      <div ref={resultRef}>
        <button onClick={onBack} className="font-ui text-sm text-muted-foreground hover:text-foreground mb-6 flex items-center gap-2">
          &larr; Back to all quizzes
        </button>
        <div className="thick-rule pt-4 mb-6">
          <h2 className="text-2xl font-bold mb-2">Your Result</h2>
          <p className="text-sm text-muted-foreground">Score: {totalScore} / {quiz.questions.length * 2}</p>
        </div>
        <div className="border-2 border-foreground p-6 mb-6">
          <h3 className="text-xl font-bold mb-3 gold-accent">{result.title}</h3>
          <p className="text-muted-foreground leading-relaxed">{result.description}</p>
        </div>
        <div className="flex gap-3 mb-8">
          <button onClick={exportPDF} className="font-ui text-xs tracking-wider uppercase px-4 py-2 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors">
            Download Results
          </button>
          <button onClick={() => { setCurrentQ(0); setAnswers([]); setShowResult(false); }} className="font-ui text-xs tracking-wider uppercase px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">
            Retake Quiz
          </button>
        </div>
        <div className="border border-border/60 bg-secondary/30 p-5">
          <h4 className="font-ui text-xs font-bold tracking-wider uppercase mb-2 text-muted-foreground">Educational Disclaimer</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This quiz is for educational and self-reflection purposes only. It is not a clinical assessment or diagnostic tool. For professional evaluation, consult a qualified healthcare provider.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack} className="font-ui text-sm text-muted-foreground hover:text-foreground mb-6 flex items-center gap-2">
        &larr; Back to all quizzes
      </button>
      <div className="thick-rule pt-4 mb-6">
        <h2 className="text-xl font-bold mb-1">{quiz.title}</h2>
        <p className="text-sm text-muted-foreground">Question {currentQ + 1} of {quiz.questions.length}</p>
      </div>
      <div className="mb-2 h-1 bg-muted">
        <div className="h-1 bg-foreground transition-all" style={{ width: `${((currentQ) / quiz.questions.length) * 100}%` }} />
      </div>
      <div className="py-6">
        <p className="text-lg font-bold mb-6">{quiz.questions[currentQ].question}</p>
        <div className="space-y-3">
          {quiz.questions[currentQ].options.map((option, i) => (
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

export default function QuizzesPage() {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);

  useEffect(() => {
    document.title = "HSP Quizzes — The Empowered Sensitive";
    window.scrollTo(0, 0);
  }, []);

  const quiz = QUIZZES.find((q) => q.id === activeQuiz);

  if (quiz) {
    return (
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <QuizComponent quiz={quiz} onBack={() => setActiveQuiz(null)} />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="thick-rule pt-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">HSP Quizzes</h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-2">
            Eight research-informed quizzes to help you understand your sensitivity patterns, nervous system states, and personal strengths. Each quiz takes 2-5 minutes and provides immediate results you can download.
          </p>
          <p className="text-sm text-muted-foreground">
            Created by{" "}
            <a href="https://kalesh.love" className="gold-accent hover:underline" target="_blank" rel="noopener">Kalesh</a>
            {" "}&mdash; for educational purposes only.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {QUIZZES.map((q) => (
            <button
              key={q.id}
              onClick={() => { setActiveQuiz(q.id); window.scrollTo(0, 0); }}
              className="text-left border border-border/60 bg-secondary/20 p-5 hover:border-foreground transition-colors group"
            >
              <h3 className="font-bold text-lg mb-2 group-hover:text-gold-accent transition-colors">
                {q.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {q.description}
              </p>
              <span className="font-ui text-xs tracking-wider uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                Take Quiz &rarr;
              </span>
            </button>
          ))}
        </div>

        <div className="thick-rule pt-6 mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            Want deeper self-assessment? Try our{" "}
            <Link href="/assessments" className="gold-accent hover:underline">
              Assessments
            </Link>{" "}
            for more comprehensive evaluation tools.
          </p>
        </div>
      </div>
    </div>
  );
}
