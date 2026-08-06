import type { LanguageStat } from "@/lib/github";

const STROKE_WIDTH = 16;
// Breathing room inside the viewBox for the arc glow. Without it the ring's outer
// edge lands exactly on the SVG boundary and the halo is clipped into a hard square.
const GLOW_PAD = 12;

type LanguageDonutProps = {
  languages: LanguageStat[];
  size?: number;
};

export default function LanguageDonut({ languages, size = 220 }: LanguageDonutProps) {
  const radius = (size - STROKE_WIDTH) / 2 - GLOW_PAD;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  // Percentages come from real repo counts and may not sum to exactly 100
  // (rounding, repos without a detected primary language) — normalize so the
  // arcs always tile the full ring instead of overflowing or leaving a gap.
  const total = languages.reduce((sum, lang) => sum + lang.percent, 0);

  let cursor = 0;
  const arcs = total > 0
    ? languages.map((lang) => {
        const arcLength = (lang.percent / total) * circumference;
        const dashoffset = -cursor;
        cursor += arcLength;
        return { ...lang, arcLength, dashoffset };
      })
    : [];

  const label =
    languages.length > 0
      ? `Language breakdown: ${languages.map((lang) => `${lang.name} ${lang.percent.toFixed(0)}%`).join(", ")}`
      : "No language data available";

  return (
    <svg
      role="img"
      aria-label={label}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="shrink-0 overflow-visible"
    >
      <circle cx={center} cy={center} r={radius} fill="none" stroke="var(--color-base-raised)" strokeWidth={STROKE_WIDTH} />
      <g transform={`rotate(-90 ${center} ${center})`}>
        {arcs.map((arc) => (
          <circle
            key={arc.name}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={arc.color ?? "var(--color-ink-faint)"}
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={`${arc.arcLength} ${circumference - arc.arcLength}`}
            strokeDashoffset={arc.dashoffset}
            style={{ filter: `drop-shadow(0 0 4px ${arc.color ?? "rgba(110, 117, 124, 0.6)"})` }}
          />
        ))}
      </g>
      <text
        x={center}
        y={center - 2}
        textAnchor="middle"
        fill="var(--color-ink)"
        className="text-3xl"
        style={{ filter: "drop-shadow(0 0 12px rgba(237,238,240,0.45))" }}
      >
        {languages.length}
      </text>
      <text
        x={center}
        y={center + 20}
        textAnchor="middle"
        fill="var(--color-ink-faint)"
        className="text-[10px] uppercase tracking-widest"
      >
        {languages.length === 1 ? "language" : "languages"}
      </text>
    </svg>
  );
}
