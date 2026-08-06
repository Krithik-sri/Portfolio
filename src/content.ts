// Single typed source of truth for all portfolio copy. Sections read from here
// so content edits never touch component/layout code.

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
  };
  resumeUrl: string;
  avatar: string;
}

export const profile: Profile = {
  name: "Krithik Srinivas",
  role: "Software Engineer — full-stack, with a genuine interest in systems and infrastructure.",
  tagline:
    "I ship production services in NestJS, FastAPI, React and Next.js, and spend my own time taking distributed systems apart to see how they actually work.",
  location: "Chennai, India",
  email: "krithikfordev@gmail.com",
  socials: {
    github: "https://github.com/Krithik-sri",
    linkedin: "https://linkedin.com/in/krithik-srinivas",
  },
  resumeUrl: "/resume/Krithik_Srinivas_Resume.pdf",
  avatar: "/images/avatar.png",
};

export const about: string[] = [
  "Full-stack by trade: NestJS and FastAPI services, React and Next.js frontends, PostgreSQL/MongoDB/Redis data layers. Production work spans enterprise data pipelines, ML platform services, client delivery, and browser automation.",
  "Outside of paid work, I build systems from first principles — a Raft consensus implementation, an LSM storage engine, a Go realtime backend — to understand the tradeoffs frameworks usually hide. These are personal projects, not production infrastructure experience, but they're where I do my most rigorous testing, and where raft-kv in particular has held up under real chaos runs.",
  "I like owning a subsystem end-to-end, architecture through tests, and I write tests as a matter of course rather than an afterthought.",
];

export interface ExperienceRole {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  stack: string[];
}

export const experience: ExperienceRole[] = [
  {
    company: "Engrew Labs — DipSight",
    role: "Software Engineer (Contract)",
    period: "Apr 2026 – Aug 2026",
    location: "Remote",
    summary:
      "Owned the autofill automation subsystem end-to-end — architecture, AI classification, and the test suite it shipped with.",
    bullets: [
      "Sole owner of the Automation subsystem (form autofill) across all three MV3 execution contexts — background service worker, injected content script, and React side panel — including the typed cross-context messaging between them.",
      "Designed a cross-site autofill architecture: an on-device semantic identity-profile store and field-mapping pipeline that never sends profile data off the browser, shipped as a 44-file, ~2,900-line pull request.",
      "Built the AI field-classification layer (Ollama Cloud, Gemma 4 31B) that maps arbitrary form fields to semantic keys, with responses cached by a versioned form signature, in-flight request deduplication, abort-based timeouts, and a typed error taxonomy.",
      "Added support for four component-library families (MUI, react-select, Headless UI, Radix) by reverse-engineering each one's real DOM behavior — including MUI's animated menu-close and react-select's focus+ArrowDown-only open path — and fixed a detector bug that was silently mis-filling MUI selects as text inputs.",
      "Built a fail-closed auto-submit decision function that blocks the click on password/payment fields, visible CAPTCHAs, filled honeypots, or an ambiguous submit button — off by default, and un-armable until a manual fill has already succeeded on that domain.",
      "Diagnosed a cross-context async race where a freshly-switched tab returned an empty scan: a stale-result guard was racing an async tab-context resolution. Found the identical unreported bug in a second hook and fixed both.",
      "Extracted fill, submit, step-advance, and tab-state logic into pure, DOM-free modules covered by ~700 lines of unit tests — became the team's default pattern for automation logic.",
      "Landed 9 of the project's 53 merged pull requests at a 100% merge rate and closed 7 assigned issues on a five-person team, every change gated on tsc --noEmit and the Vitest suite.",
    ],
    stack: ["TypeScript", "React", "Chrome MV3", "Plasmo", "Vitest", "Supabase", "Tailwind"],
  },
  {
    company: "C1X",
    role: "Software Engineer Intern",
    period: "Dec 2025 – Mar 2026",
    location: "Chennai",
    summary:
      "Built ingestion and canonicalization pipelines for enterprise data, and prototyped an Azure AD auth module.",
    bullets: [
      "Built an end-to-end Microsoft 365 ingestion pipeline feeding enterprise data into internal knowledge systems.",
      "Built a text canonicalization pipeline — cleaning, normalizing, and structuring unstructured enterprise documents before embedding generation — to improve retrieval quality.",
      "Prototyped (POC, not shipped) a reusable NestJS auth module for Azure AD wrapping MSAL: pre-authenticated service clients with centralized token acquisition and refresh.",
    ],
    stack: ["NestJS", "Python", "Azure AD", "MSAL", "RAG"],
  },
  {
    company: "Authenta (Phosphene.ai)",
    role: "Full-Stack Developer Intern",
    period: "Mar 2025 – Dec 2025",
    location: "Chennai",
    summary:
      "Built NestJS service modules, a self-healing job queue, and Docker/LocalStack infrastructure for ML workloads.",
    bullets: [
      "Built NestJS service modules on a modular, dependency-injected architecture, including a support ticket system and a role-based ML model handler.",
      "Built a self-healing background job queue with automatic retry and exponential backoff, cutting manual re-runs of failed tasks to zero.",
      "Built backend infrastructure orchestrating ML workload deployment across environments with Docker and LocalStack, giving the team AWS-compatible execution without a cloud dependency.",
    ],
    stack: ["NestJS", "TypeScript", "Docker", "LocalStack"],
  },
  {
    company: "Adrig AI Technologies",
    role: "Full-Stack Developer Intern",
    period: "Dec 2024 – Mar 2025",
    location: "Chennai",
    summary:
      "Refactored a production codebase and owned client feature delivery for Southern Railways of India.",
    bullets: [
      "Refactored a large production codebase, decomposing 1,000+ line monolithic files into modular, reusable components and eliminating duplicated logic.",
      "Owned end-to-end feature development for Southern Railways of India, translating direct client requirements into shipped full-stack work on roughly one-week turnaround cycles across multiple client deliverables.",
    ],
    stack: ["Next.js", "TypeScript", "React"],
  },
];

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  repo: string;
  live?: string;
  metrics?: ProjectMetric[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    name: "raft-kv",
    tagline: "A distributed key-value store, built from the Raft paper with no consensus library.",
    description:
      "Personal project — not paid infrastructure work, but the most rigorously tested thing I've built. Leader election, log replication, snapshots with log compaction, pre-vote, CheckQuorum, dynamic membership, and lease-based linearizable reads, verified across five layers including Porcupine linearizability checking that is itself tested against known-bad histories.",
    tech: ["Go", "gRPC", "Protocol Buffers", "Raft"],
    repo: "https://github.com/Krithik-sri/raft-kv",
    metrics: [
      { label: "Test functions", value: "109" },
      { label: "3-node writes", value: "393/s @ 18.1ms p50" },
      { label: "Linearizable reads", value: "13.5K/s" },
      { label: "Failover", value: "~225ms" },
      { label: "15-min chaos run", value: "179,748 checks, 0 violations" },
    ],
    featured: true,
  },
  {
    name: "Research Radar",
    tagline: "A research knowledge base with resumable arXiv ingestion and conversational RAG.",
    description:
      "Crawls arXiv month-by-month through a keyword gate, LLM classification, summarization, and embedding, with a canvas knowledge-graph visualization written without a graph library. Provider-swappable LLM and embedding layer (Groq, OpenRouter, Gemini, Jina v3), Slack and Discord /ask bots, and scheduled digests on Inngest crons.",
    tech: ["TypeScript", "Next.js", "Neon Postgres", "pgvector", "Drizzle"],
    repo: "https://github.com/Krithik-sri/research-radar",
    live: "https://research-radar.metronis.space",
    featured: false,
  },
  {
    name: "Horizon",
    tagline: "Live group-ride tracking, rebuilt as a Go-majority realtime backend.",
    description:
      "Personal project, rebuilt from a documentation-heavy prototype into a real backend developed test-first on a ticket-based PR workflow: CORS and panic-recovery middleware, a WebSocket hub for room-based fan-out, and OpenRouteService integration for cycling directions, backed by 57 Go test functions. The client is an installable PWA with MapLibre on keyless OpenFreeMap tiles.",
    tech: ["Go", "TypeScript", "WebSockets", "PWA"],
    repo: "https://github.com/Krithik-sri/Horizon",
    featured: false,
  },
  {
    name: "RLForge",
    tagline: "A browser-based RL environment platform streaming Gymnasium over WebSockets.",
    description:
      "FastAPI and WebSockets step Gymnasium environments server-side and stream base64 frames to a React client, with support for complex action spaces (Box, MultiDiscrete, Dict) and headless EGL rendering so 3D environments render in-browser without a display server. Multi-stage Docker setup with an in-UI installer for MuJoCo, Atari, and Box2D.",
    tech: ["FastAPI", "Python", "React", "WebSockets", "Docker"],
    repo: "https://github.com/Krithik-sri/rl-forge-v1",
    featured: false,
  },
  {
    name: "ztfv2",
    tagline: "A zero-trust policy engine and middleware for Express, Fastify, Koa, and Hono.",
    description:
      "ABSTAIN / ALLOW / DENY policy evaluation with DENY always winning, HMAC-SHA256-signed session tokens, and fail-closed behavior on a Redis outage — a 503, never a silent bypass. Ships as drop-in middleware with constructor injection and no singletons.",
    tech: ["TypeScript", "Redis"],
    repo: "https://github.com/Krithik-sri/ztfv2",
    featured: false,
  },
  {
    name: "Pitch Deck Practice Platform",
    tagline: "Pitch-practice platform built for Smart India Hackathon 2024 — National Finalist.",
    description:
      "Next.js App Router with Clerk authentication and Cloudinary media uploads, and a Prisma-on-MongoDB schema (Course, Category, Chapter, Purchase) with full-text search. Built as a course platform and re-framed as a pitch-practice product under hackathon time pressure — a call I'd make again.",
    tech: ["Next.js", "Prisma", "MongoDB", "Clerk", "Cloudinary"],
    repo: "https://github.com/Krithik-sri/pitch-deck",
    featured: false,
  },
];

export interface SkillGroup {
  category: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  { category: "Languages", items: ["TypeScript / JavaScript", "Python", "Go", "Rust"] },
  {
    category: "Web & Frameworks",
    items: ["React", "Next.js", "NestJS", "FastAPI", "Chrome MV3 / Plasmo"],
  },
  {
    category: "Data & Infra",
    items: ["PostgreSQL / pgvector", "MongoDB / Prisma", "Redis", "Docker / LocalStack"],
  },
  { category: "Systems & Protocols", items: ["gRPC / Protocol Buffers", "WebSockets"] },
  { category: "AI / RAG", items: ["RAG & embeddings"] },
  {
    category: "Testing & Tooling",
    items: ["Vitest", "Supabase", "CI/CD", "GitHub Actions"],
  },
];

export interface Education {
  institution: string;
  degree: string;
  period: string;
  gpa: string;
}

// Start year (2022) is inferred from a four-year B.Tech and the June 2026
// graduation date — not independently confirmed.
export const education: Education = {
  institution: "St. Joseph's Institute of Technology",
  degree: "B.Tech, Artificial Intelligence and Data Science",
  period: "2022 – 2026",
  gpa: "CGPA 7.7 / 10.0",
};

export const certifications: string[] = [
  "Google Cloud Skills Boost — ~10 badges spanning Cloud Computing Foundations, Infrastructure, Networking, Data/ML/AI, and Generative AI (2023–2024)",
  "Google Cybersecurity — Foundations of Cybersecurity, Managing Security Risks, Assets/Threats/Vulnerabilities, Tools of the Trade",
  "DeepLearning.AI / Coursera — TensorFlow, CNNs, PyTorch (GANs & Image Segmentation), Generative AI",
  "NVIDIA — Introduction to AI in the Data Center",
  "Cambridge Linguaskill Business English — B2 overall",
];

export interface Achievement {
  title: string;
  period: string;
  detail: string;
}

export const achievements: Achievement[] = [
  {
    title: "Smart India Hackathon 2024 — National Finalist (Software Edition)",
    period: "Dec 2024",
    detail: "Pitch Deck Practice Platform, pivoted from an LMS concept mid-event on judge feedback.",
  },
];
