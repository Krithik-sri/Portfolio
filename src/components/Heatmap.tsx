"use client";

import { useMemo, useState, type MouseEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Calendar, ContributionDay } from "@/lib/github";

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const WEEKDAY_LABELS: Record<number, string> = { 1: "Mon", 3: "Wed", 5: "Fri" };

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function cellLabel(day: ContributionDay) {
  const date = formatDate(day.date);
  return day.count === 0
    ? `No contributions on ${date}`
    : `${day.count} contribution${day.count === 1 ? "" : "s"} on ${date}`;
}

type TooltipState = { x: number; y: number; below: boolean; text: string } | null;

// The tooltip is position:fixed and centred on the cursor. A fixed element whose
// visual box extends past the viewport still counts toward document overflow, so an
// unclamped tooltip near the right edge makes the page's horizontal scrollbar flicker
// in and out as the cursor moves. Clamping needs a known width, hence the hard cap —
// TOOLTIP_MAX_W must stay in sync with the max-w-[240px] class on the tooltip.
const TOOLTIP_MAX_W = 240;
const EDGE_PAD = 8;

type HeatmapProps = {
  calendar: Calendar;
  /** Render only the most recent N weeks instead of the full calendar. */
  weeks?: number;
};

export default function Heatmap({ calendar, weeks }: HeatmapProps) {
  const reduced = useReducedMotion();
  const [tooltip, setTooltip] = useState<TooltipState>(null);

  const visibleWeeks = useMemo(
    () => (weeks ? calendar.weeks.slice(-weeks) : calendar.weeks),
    [calendar.weeks, weeks],
  );
  const weekCount = visibleWeeks.length;

  const columns = useMemo(() => {
    let prevMonth = -1;
    return visibleWeeks.map((week, weekIndex) => {
      const days: (ContributionDay | null)[] = Array(7).fill(null);
      for (const day of week) days[day.weekday] = day;

      let monthLabel: string | null = null;
      const firstDay = week[0];
      if (firstDay) {
        const month = new Date(`${firstDay.date}T00:00:00Z`).getUTCMonth();
        if (month !== prevMonth) {
          monthLabel = MONTH_LABELS[month];
          prevMonth = month;
        }
      }
      return { weekIndex, days, monthLabel };
    });
  }, [visibleWeeks]);

  // When windowed to a subset of weeks, the total/range wording must reflect
  // that window rather than claiming a full year of contributions.
  const totalInView = weeks
    ? visibleWeeks.reduce((sum, week) => sum + week.reduce((s, day) => s + day.count, 0), 0)
    : calendar.totalContributions;
  const rangeLabel = weeks ? `the last ${weeks} weeks` : "the last year";

  const summary = `${totalInView.toLocaleString()} contributions in ${rangeLabel}. Longest streak ${
    calendar.longestStreak
  } day${calendar.longestStreak === 1 ? "" : "s"}, current streak ${calendar.currentStreak} day${
    calendar.currentStreak === 1 ? "" : "s"
  }${
    calendar.busiestDay
      ? `. Busiest day: ${calendar.busiestDay.count} contributions on ${formatDate(calendar.busiestDay.date)}`
      : ""
  }.`;

  function showTooltip(e: MouseEvent<HTMLDivElement>, day: ContributionDay) {
    const half = TOOLTIP_MAX_W / 2;
    const x = Math.min(
      Math.max(e.clientX, half + EDGE_PAD),
      window.innerWidth - half - EDGE_PAD,
    );
    // Flip below the cursor when there isn't room above, so it can't sit off-screen.
    setTooltip({ x, y: e.clientY, below: e.clientY < 56, text: cellLabel(day) });
  }
  function hideTooltip() {
    setTooltip(null);
  }

  const gridColumns = { gridTemplateColumns: `repeat(${weekCount}, minmax(0, 1fr))` };

  return (
    <div className="thin-scroll w-full overflow-x-auto pb-2">
      <div className="min-w-[640px]">
        <div role="img" aria-label={summary} className="flex flex-col gap-1">
          <div className="flex gap-[3px]">
            <div aria-hidden className="w-8 shrink-0" />
            <div className="grid flex-1 gap-[3px]" style={gridColumns}>
              {columns.map((col) => (
                <div key={col.weekIndex} className="truncate text-[10px] text-ink-faint">
                  {col.monthLabel ?? ""}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-[3px]">
            <div className="flex w-8 shrink-0 flex-col gap-[3px] pr-1 text-right text-[10px] text-ink-faint">
              {Array.from({ length: 7 }, (_, row) => (
                <div key={row} className="flex flex-1 items-center justify-end">
                  {WEEKDAY_LABELS[row] ?? ""}
                </div>
              ))}
            </div>

            <motion.div
              className="grid flex-1 gap-[3px]"
              style={{ ...gridColumns, gridTemplateRows: "repeat(7, minmax(0, 1fr))", gridAutoFlow: "column" }}
              initial={reduced ? undefined : "hidden"}
              whileInView={reduced ? undefined : "visible"}
              viewport={{ once: true, margin: "-40px" }}
            >
              {columns.flatMap((col) =>
                col.days.map((day, dayIndex) => {
                  const key = `${col.weekIndex}-${dayIndex}`;
                  if (!day) return <div key={key} className="aspect-square w-full" />;

                  const style = {
                    backgroundColor: `var(--heat-${day.level})`,
                    boxShadow: `var(--heat-glow-${day.level})`,
                  };
                  if (reduced) {
                    return (
                      <div
                        key={key}
                        aria-hidden
                        className="aspect-square w-full rounded-[2px]"
                        style={style}
                        onMouseEnter={(e) => showTooltip(e, day)}
                        onMouseLeave={hideTooltip}
                      />
                    );
                  }
                  return (
                    <motion.div
                      key={key}
                      aria-hidden
                      className="aspect-square w-full rounded-[2px]"
                      style={style}
                      variants={{ hidden: { opacity: 0, scale: 0.4 }, visible: { opacity: 1, scale: 1 } }}
                      transition={{ duration: 0.25, ease: "easeOut", delay: (col.weekIndex + dayIndex) * 0.006 }}
                      onMouseEnter={(e) => showTooltip(e, day)}
                      onMouseLeave={hideTooltip}
                    />
                  );
                }),
              )}
            </motion.div>
          </div>
        </div>

        <p className="sr-only">{summary}</p>
      </div>

      {tooltip && (
        <div
          className={`pointer-events-none fixed z-50 max-w-[240px] -translate-x-1/2 rounded-md bg-base-raised px-2 py-1 text-center text-xs text-ink shadow-lg ${
            tooltip.below ? "" : "-translate-y-full"
          }`}
          style={{ left: tooltip.x, top: tooltip.below ? tooltip.y + 16 : tooltip.y - 8 }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
