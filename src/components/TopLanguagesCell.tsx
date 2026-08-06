import { ArrowUpRight } from "lucide-react";
import BentoCard from "@/components/BentoCard";
import LanguageDonut from "@/components/LanguageDonut";
import type { RepoStats } from "@/lib/github";

const LOGIN = process.env.GITHUB_LOGIN ?? "Krithik-sri";
const PROFILE_URL = `https://github.com/${LOGIN}`;

type TopLanguagesCellProps = {
  repoStats: RepoStats | null;
};

export default function TopLanguagesCell({ repoStats }: TopLanguagesCellProps) {
  const languages = repoStats?.languages ?? [];

  return (
    // flex chain: Glass -> body -> donut wrapper. The donut wrapper takes flex-1 so it
    // absorbs the extra height this card inherits from its taller row siblings, instead
    // of leaving a dead gap under a legend pinned to the top.
    <BentoCard title="Top Languages" className="flex flex-col" bodyClassName="flex flex-1 flex-col">
      {languages.length > 0 ? (
        <>
          <div className="flex flex-1 items-center justify-center py-2">
            <LanguageDonut languages={languages} />
          </div>

          <ul className="mt-5 flex flex-col gap-2.5">
            {languages.map((lang) => {
              const color = lang.color ?? "var(--color-ink-faint)";
              return (
                <li key={lang.name} className="flex items-center gap-2.5 text-sm">
                  <span
                    aria-hidden
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{
                      backgroundColor: color,
                      boxShadow: lang.color ? `0 0 9px 1px ${lang.color}80` : undefined,
                    }}
                  />
                  <span className="truncate text-ink">{lang.name}</span>
                  <span
                    className="ml-auto shrink-0 font-mono text-ink-muted"
                    style={{ textShadow: lang.color ? `0 0 12px ${lang.color}66` : undefined }}
                  >
                    {lang.percent.toFixed(0)}%
                  </span>
                </li>
              );
            })}
          </ul>

          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-5 flex items-center gap-1 text-xs text-ink-muted transition-colors hover:text-accent-300 hover:glow-text"
          >
            View GitHub Profile <ArrowUpRight size={13} aria-hidden />
          </a>
        </>
      ) : (
        <p className="text-sm text-ink-muted">Language data isn&apos;t available right now.</p>
      )}
    </BentoCard>
  );
}
