import { CalendarDays, Flame, Zap } from "lucide-react";
import BentoCard from "@/components/BentoCard";
import StatTile from "@/components/StatTile";
import type { Calendar } from "@/lib/github";

// This card used to render its own compact 20-week heatmap. Once GitHubActivityCell
// moved into this same section at full width, that put two of the same graph side by
// side — so this is now purely the streak/milestone readout the full-year graph can't show.
function formatBusiestDay(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

type ContributionDetailCellProps = {
  calendar: Calendar | null;
};

export default function ContributionDetailCell({ calendar }: ContributionDetailCellProps) {
  return (
    <BentoCard title="Contribution Streaks">
      {calendar ? (
        <>
          <div className="flex flex-col gap-3">
            <StatTile
              label="Longest streak"
              value={`${calendar.longestStreak} day${calendar.longestStreak === 1 ? "" : "s"}`}
              icon={<Flame size={16} aria-hidden />}
            />
            <StatTile
              label="Current streak"
              value={`${calendar.currentStreak} day${calendar.currentStreak === 1 ? "" : "s"}`}
              icon={<Zap size={16} aria-hidden />}
            />
            <StatTile
              label="Busiest day"
              value={
                calendar.busiestDay
                  ? `${calendar.busiestDay.count} on ${formatBusiestDay(calendar.busiestDay.date)}`
                  : "—"
              }
              icon={<CalendarDays size={16} aria-hidden />}
            />
          </div>
        </>
      ) : (
        <p className="text-sm text-ink-muted">Contribution calendar isn&apos;t available right now.</p>
      )}
    </BentoCard>
  );
}
