import {
  siDocker,
  siFastapi,
  siGo,
  siMongodb,
  siNestjs,
  siNextdotjs,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siRust,
  siTypescript,
} from "simple-icons";
import Glass from "@/components/Glass";
import { readableBrandColor } from "@/lib/techColors";

const TILES = [
  { icon: siTypescript, label: "TypeScript" },
  { icon: siGo, label: "Go" },
  { icon: siPython, label: "Python" },
  { icon: siRust, label: "Rust" },
  { icon: siReact, label: "React" },
  { icon: siNextdotjs, label: "Next.js" },
  { icon: siNestjs, label: "NestJS" },
  { icon: siFastapi, label: "FastAPI" },
  { icon: siPostgresql, label: "PostgreSQL" },
  { icon: siMongodb, label: "MongoDB" },
  { icon: siRedis, label: "Redis" },
  { icon: siDocker, label: "Docker" },
];

export default function TechStackTiles() {
  return (
    <div className="flex flex-wrap gap-3">
      {TILES.map(({ icon, label }) => (
        <Glass
          key={icon.slug}
          className="group flex w-[76px] shrink-0 flex-col items-center gap-2 p-3 transition-shadow duration-300 hover:glow-ring"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6">
            {/* Plain brand marks, no glow. Rust and Next.js both register #000000, so
                a drop-shadow in the brand's own colour painted a black smudge behind
                them — which is what made this row look wrong. readableBrandColor also
                lifts those near-black marks so they don't vanish against the page. */}
            <path
              d={icon.path}
              fill={readableBrandColor(icon.hex)}
              className="opacity-90 transition-opacity duration-300 group-hover:opacity-100"
            />
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
            {label}
          </span>
        </Glass>
      ))}
    </div>
  );
}
