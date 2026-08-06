import Glass from "@/components/Glass";
import RepoLink from "@/components/RepoLink";
import Reveal from "@/components/Reveal";
import TechPills from "@/components/TechPills";
import type { Project } from "@/content";
import { projectMark, readableBrandColor, techColor } from "@/lib/techColors";

type ProjectCardProps = {
  project: Project;
  index?: number;
};

const FALLBACK_TINT = "#4ade80"; // accent-300

// Tint comes from the same shared map the pills use, so a card header and its
// language pill can't drift to different shades of the same technology.
function headerTint(tech: string[]): string {
  for (const t of tech) {
    const color = techColor(t);
    if (color) return color;
  }
  return FALLBACK_TINT;
}

function hexToRgb(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const rgb = hexToRgb(headerTint(project.tech));
  const mark = projectMark(project.tech);

  return (
    <Reveal delay={index * 0.06} className="h-full">
      <Glass
        className={`flex h-full flex-col overflow-hidden p-0 ${project.featured ? "glow-panel" : ""}`}
      >
        <div
          className="relative h-[120px] shrink-0"
          style={{
            background: `linear-gradient(135deg, rgba(${rgb}, 0.32), rgba(${rgb}, 0.08) 55%, transparent 100%)`,
          }}
        >
          {mark ? (
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="absolute bottom-3 right-4 h-16 w-16"
              style={{ filter: `drop-shadow(0 0 14px ${readableBrandColor(mark.hex)}55)` }}
            >
              <path d={mark.path} fill={readableBrandColor(mark.hex)} fillOpacity={0.55} />
            </svg>
          ) : (
            <span
              aria-hidden
              className="absolute bottom-3 right-4 select-none font-mono text-6xl leading-none text-white/20"
            >
              {project.name.slice(0, 2)}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-6">
          <div>
            <h3 className="text-display text-xl text-ink">{project.name}</h3>
            <p className="mt-1 text-sm text-ink-muted">{project.tagline}</p>
          </div>
          <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-ink-muted">
            {project.description}
          </p>
          <TechPills tech={project.tech} />
          <RepoLink href={project.repo} live={project.live} />
        </div>
      </Glass>
    </Reveal>
  );
}
