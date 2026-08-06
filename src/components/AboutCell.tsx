import { Award, GraduationCap } from "lucide-react";
import BentoCard from "@/components/BentoCard";
import GlassObject from "@/components/GlassObject";
import { about, certifications, education } from "@/content";

export default function AboutCell() {
  return (
    <BentoCard id="about" title="About Me">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8">
        <div className="flex flex-col gap-4">
          {about.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-relaxed text-ink-muted">
              {paragraph}
            </p>
          ))}
        </div>
        <GlassObject
          variant="crystal"
          className="mx-auto h-32 w-32 shrink-0 sm:h-36 sm:w-36 lg:mx-0 lg:h-40 lg:w-40"
        />
      </div>

      {/* min-w-0 on both grid children is load-bearing: grid items default to
          min-width:auto, so a `truncate` descendant (white-space:nowrap) reports its
          full untruncated width as min-content and blows the track past the cell. */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="glass flex min-w-0 items-center gap-3 rounded-xl px-4 py-3">
          <GraduationCap className="shrink-0 text-accent-300" size={18} aria-hidden />
          <div className="min-w-0">
            <p className="truncate text-sm text-ink">{education.institution}</p>
            <p className="text-xs text-ink-muted">{education.degree}</p>
            <p className="text-xs text-ink-faint">
              {education.period} · {education.gpa}
            </p>
          </div>
        </div>

        <div className="glass min-w-0 rounded-xl px-4 py-3">
          <p className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink-faint">
            <Award size={14} aria-hidden /> Certifications
          </p>
          <ul className="flex min-w-0 flex-col gap-1.5">
            {certifications.map((line) => (
              <li key={line} title={line} className="line-clamp-2 text-xs text-ink-muted">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </BentoCard>
  );
}
