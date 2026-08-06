import { techColor } from "@/lib/techColors";

type TechPillsProps = {
  tech: string[];
  className?: string;
};

// Tinted by brand colour but deliberately UNLIT — there are 60+ of these on the page,
// and glowing every one turned the skill lists into noise that drowned out the things
// that should draw the eye (stat values, the heatmap, the donut). Colour carries the
// distinction instead; the glow stays reserved for the few genuine focal points.
export default function TechPills({ tech, className = "" }: TechPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tech.map((t) => {
        const color = techColor(t);
        return (
          <span
            key={t}
            className={`rounded-full border px-2.5 py-1 font-mono text-[11px] transition-colors duration-200 ${
              color ? "" : "border-white/10 text-ink-muted hover:text-ink"
            } ${className}`}
            style={
              color
                ? {
                    color,
                    borderColor: `${color}59`,
                    backgroundColor: `${color}12`,
                  }
                : { backgroundColor: "rgba(255,255,255,0.02)" }
            }
          >
            {t}
          </span>
        );
      })}
    </div>
  );
}
