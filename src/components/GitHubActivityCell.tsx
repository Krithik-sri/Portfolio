import { Activity, FolderGit2, GitCommitHorizontal, UserPlus, Users } from "lucide-react";
import BentoCard from "@/components/BentoCard";
import Heatmap from "@/components/Heatmap";
import StatTile from "@/components/StatTile";
import type { Calendar, ProfileStats } from "@/lib/github";

const LOGIN = process.env.GITHUB_LOGIN ?? "Krithik-sri";
const PROFILE_URL = `https://github.com/${LOGIN}`;

type GitHubActivityCellProps = {
  calendar: Calendar | null;
  profileStats: ProfileStats | null;
};

export default function GitHubActivityCell({ calendar, profileStats }: GitHubActivityCellProps) {
  return (
    <BentoCard
      id="github"
      title="GitHub Activity"
      icon={<Activity size={16} aria-hidden />}
      action={{ label: "View Profile", href: PROFILE_URL }}
      glow
    >
      {calendar ? (
        <>
          <p className="text-3xl">
            <span className="glow-text text-accent-300">
              {calendar.totalContributions.toLocaleString()}
            </span>
            <span className="ml-2 text-sm text-ink-muted">contributions this year</span>
          </p>
          <div className="mt-5">
            <Heatmap calendar={calendar} />
          </div>
          <div className="mt-3 flex items-center justify-end gap-1.5 text-[11px] text-ink-faint">
            <span>Less</span>
            {([0, 1, 2, 3, 4] as const).map((level) => (
              <span
                key={level}
                aria-hidden
                className="h-2.5 w-2.5 rounded-[2px]"
                style={{ backgroundColor: `var(--heat-${level})`, boxShadow: `var(--heat-glow-${level})` }}
              />
            ))}
            <span>More</span>
          </div>
        </>
      ) : (
        <p className="text-sm text-ink-muted">Contribution calendar isn&apos;t available right now.</p>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        <StatTile
          label="Repositories"
          value={profileStats ? profileStats.publicRepos.toLocaleString() : "—"}
          icon={<FolderGit2 size={16} aria-hidden />}
          tone="#38bdf8"
        />
        <StatTile
          label="Contributions"
          value={calendar ? calendar.totalContributions.toLocaleString() : "—"}
          icon={<GitCommitHorizontal size={16} aria-hidden />}
          tone="#4ade80"
        />
        <StatTile
          label="Followers"
          value={profileStats ? profileStats.followers.toLocaleString() : "—"}
          icon={<Users size={16} aria-hidden />}
          tone="#f472b6"
        />
        <StatTile
          label="Following"
          value={profileStats ? profileStats.following.toLocaleString() : "—"}
          icon={<UserPlus size={16} aria-hidden />}
          tone="#a78bfa"
        />
      </div>
    </BentoCard>
  );
}
