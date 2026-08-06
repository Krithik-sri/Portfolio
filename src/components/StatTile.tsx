import type { ReactNode } from "react";
import Glass from "@/components/Glass";

type StatTileProps = {
  label: string;
  value: string;
  icon?: ReactNode;
  /** Hex driving the icon + value glow. `glow-text` builds its halo from
   *  currentColor, so setting the colour is all that's needed. Defaults to accent. */
  tone?: string;
};

const DEFAULT_TONE = "#4ade80";

export default function StatTile({ label, value, icon, tone = DEFAULT_TONE }: StatTileProps) {
  return (
    <Glass className="min-w-[130px] flex-1 px-5 py-4">
      {icon && (
        <div
          className="mb-2"
          aria-hidden
          style={{ color: tone, filter: `drop-shadow(0 0 5px ${tone}) drop-shadow(0 0 11px ${tone}80)` }}
        >
          {icon}
        </div>
      )}
      <div className="glow-text text-2xl" style={{ color: tone }}>
        {value}
      </div>
      <div className="mt-1 text-xs text-ink-muted">{label}</div>
    </Glass>
  );
}
