import {
  siDocker,
  siFastapi,
  siGo,
  siMongodb,
  siNextdotjs,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siRust,
  siTypescript,
} from "simple-icons";

// Structural rather than importing simple-icons' own type name, so a package
// rename of the exported type can't break the build.
export type BrandMark = { title: string; path: string; hex: string };

// Brand colours for technology labels, used to tint skill/tech pills and to keep
// dark brand marks legible on a near-black page.
//
// Ordered: the first pattern that matches wins, so compound labels like
// "PostgreSQL / pgvector" or "Docker / LocalStack" resolve to their primary tech.
const TECH_COLORS: [RegExp, string][] = [
  [/typescript|javascript/i, "#3178c6"],
  [/next\.?js/i, "#e8eaed"],
  [/react/i, "#61dafb"],
  [/nest\.?js/i, "#e0234e"],
  [/fastapi/i, "#05998b"],
  [/tailwind/i, "#38bdf8"],
  [/plasmo|chrome mv3/i, "#f4b400"],
  [/python/i, "#3776ab"],
  [/\bgo\b|golang/i, "#00add8"],
  [/rust/i, "#dea584"],
  [/postgres|pgvector|neon/i, "#4169e1"],
  [/mongo|prisma/i, "#47a248"],
  [/redis/i, "#ff4438"],
  [/docker|localstack/i, "#2496ed"],
  [/grpc|protocol buffers/i, "#2db6af"],
  [/websocket/i, "#f59e0b"],
  [/raft|consensus/i, "#a78bfa"],
  [/rag|embedding|vector/i, "#c084fc"],
  [/vitest/i, "#6e9f18"],
  [/supabase/i, "#3fcf8e"],
  [/github actions|ci\/cd/i, "#2088ff"],
  [/azure|msal|entra/i, "#0078d4"],
  [/clerk/i, "#6c47ff"],
  [/cloudinary/i, "#3448c5"],
  [/drizzle/i, "#c5f74f"],
  [/pwa/i, "#5a0fc8"],
];

const TECH_MARKS: [RegExp, BrandMark][] = [
  [/\bgo\b|golang/i, siGo],
  [/rust/i, siRust],
  [/fastapi/i, siFastapi],
  [/next\.?js/i, siNextdotjs],
  [/typescript/i, siTypescript],
  [/python/i, siPython],
  [/react/i, siReact],
  [/postgres|pgvector|neon/i, siPostgresql],
  [/mongo/i, siMongodb],
  [/redis/i, siRedis],
  [/docker/i, siDocker],
];

/**
 * Brand mark for a project, chosen by walking its `tech` array IN ORDER — the first
 * listed technology that has a known logo wins. Scanning the tech list (rather than
 * the pattern list) means content.ts controls which logo represents a project simply
 * by how the stack is ordered, e.g. RLForge leads with FastAPI, not Python.
 */
export function projectMark(tech: string[]): BrandMark | null {
  for (const t of tech) {
    for (const [pattern, mark] of TECH_MARKS) {
      if (pattern.test(t)) return mark;
    }
  }
  return null;
}

/** Brand colour for a tech label, or null when nothing sensible matches. */
export function techColor(name: string): string | null {
  for (const [pattern, color] of TECH_COLORS) {
    if (pattern.test(name)) return color;
  }
  return null;
}

/**
 * Several brands (Rust, Next.js, Express, Vercel) use pure black as their official
 * mark. Rendered on a near-black page they vanish, and glowing them in their own
 * colour paints a dark smudge rather than light. Swap anything too dark for a
 * neutral light so the logo stays readable.
 */
export function readableBrandColor(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  // Rec. 709 luma — good enough for a legibility threshold.
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luma < 0.18 ? "#e8eaed" : `#${h}`;
}
