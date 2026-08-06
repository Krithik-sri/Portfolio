import {
  ArrowUpRight,
  CircleDot,
  GitBranch,
  GitCommitHorizontal,
  GitFork,
  GitPullRequest,
  Globe,
  Star,
  Tag,
  type LucideIcon,
} from "lucide-react";
import { siGithub } from "simple-icons";
import BentoCard from "@/components/BentoCard";
import Glass from "@/components/Glass";
import type { GitHubEvent } from "@/lib/github";

// lucide-react carries no brand marks; siGithub matches the glyph already used in
// HeroCell/NavCell for the same GitHub link.
function GitHubGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d={siGithub.path} />
    </svg>
  );
}

const LOGIN = process.env.GITHUB_LOGIN ?? "Krithik-sri";
const PROFILE_URL = `https://github.com/${LOGIN}`;

// Lives here rather than in lib/github.ts: that module is server-only (reads
// GITHUB_TOKEN) and its header comment forbids client imports, so a
// component-level icon map keeps that boundary intact.
const EVENT_ICONS: Record<GitHubEvent["type"], LucideIcon> = {
  PushEvent: GitCommitHorizontal,
  PullRequestEvent: GitPullRequest,
  IssuesEvent: CircleDot,
  CreateEvent: GitBranch,
  PublicEvent: Globe,
  WatchEvent: Star,
  ForkEvent: GitFork,
  ReleaseEvent: Tag,
};

// Colour per event kind so the feed isn't a column of identical green dots.
const EVENT_TONES: Record<GitHubEvent["type"], string> = {
  PushEvent: "#4ade80",
  PullRequestEvent: "#a78bfa",
  IssuesEvent: "#fbbf24",
  CreateEvent: "#38bdf8",
  PublicEvent: "#2dd4bf",
  WatchEvent: "#fbbf24",
  ForkEvent: "#f472b6",
  ReleaseEvent: "#f97316",
};

function relativeTime(iso: string): string {
  const diffSec = Math.round((Date.now() - new Date(iso).getTime()) / 1000);
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  for (const [unit, secs] of units) {
    if (diffSec >= secs) return rtf.format(-Math.floor(diffSec / secs), unit);
  }
  return "just now";
}

type RecentActivityCellProps = {
  events: GitHubEvent[] | null;
};

export default function RecentActivityCell({ events }: RecentActivityCellProps) {
  return (
    <BentoCard title="Recent GitHub Activity">
      {events && events.length > 0 ? (
        <>
          <ul className="flex flex-col">
            {events.map((event, i) => {
              const Icon = EVENT_ICONS[event.type];
              const tone = EVENT_TONES[event.type];
              return (
                <li key={i} className="relative pb-5 last:pb-0">
                  {i < events.length - 1 && (
                    <span aria-hidden className="absolute top-8 bottom-0 left-4 w-px bg-white/10" />
                  )}
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start gap-3 text-sm text-ink-muted hover:text-ink"
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-base-raised"
                      style={{
                        color: tone,
                        boxShadow: `0 0 0 1px ${tone}30, 0 0 8px ${tone}55`,
                      }}
                    >
                      <Icon size={14} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="truncate text-ink group-hover:glow-text">{event.title}</span>
                        <span className="shrink-0 text-xs text-ink-faint">{relativeTime(event.createdAt)}</span>
                      </span>
                      {event.detail && (
                        <span className="mt-0.5 block truncate text-xs text-ink-faint">{event.detail}</span>
                      )}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          <Glass className="mt-5 rounded-full">
            <a
              href={PROFILE_URL}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-ink-muted transition-colors hover:text-ink"
            >
              <GitHubGlyph />
              <span>View GitHub Profile</span>
              <ArrowUpRight size={15} aria-hidden className="ml-auto" />
            </a>
          </Glass>
        </>
      ) : (
        <p className="text-sm text-ink-muted">No recent activity to show right now.</p>
      )}
    </BentoCard>
  );
}
