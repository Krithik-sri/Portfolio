"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import BentoCard from "@/components/BentoCard";
import Glass from "@/components/Glass";
import TechPills from "@/components/TechPills";
import { experience, type ExperienceRole } from "@/content";

type RoleColumnProps = {
  role: ExperienceRole;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  reduced: boolean;
};

function RoleColumn({ role, index, isOpen, onToggle, reduced }: RoleColumnProps) {
  const panelId = `experience-panel-${index}`;
  const shown = role.bullets.slice(0, 3);
  const rest = role.bullets.slice(3);

  return (
    <Glass className="flex h-full flex-col p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div>
          <p className="text-ink">{role.role}</p>
          <p className="mt-0.5 text-sm text-ink-muted">{role.company}</p>
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">
          {role.period} · {role.location}
        </p>
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {shown.map((bullet) => (
          <li key={bullet} className="text-sm leading-relaxed text-ink-muted">
            {bullet}
          </li>
        ))}
      </ul>

      {rest.length > 0 && (
        <>
          {reduced ? (
            isOpen && (
              <ul id={panelId} className="mt-2 flex flex-col gap-2">
                {rest.map((bullet) => (
                  <li key={bullet} className="text-sm leading-relaxed text-ink-muted">
                    {bullet}
                  </li>
                ))}
              </ul>
            )
          ) : (
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <ul className="mt-2 flex flex-col gap-2">
                    {rest.map((bullet) => (
                      <li key={bullet} className="text-sm leading-relaxed text-ink-muted">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          )}
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={panelId}
            className="mt-3 flex items-center gap-1 self-start font-mono text-[11px] uppercase tracking-widest text-ink-faint transition-colors hover:text-accent-300"
          >
            {isOpen ? "Show less" : `+${rest.length} more`}
            <ChevronDown
              size={12}
              className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        </>
      )}

      <div className="mt-4 flex-1" />
      <div className="mt-4">
        <TechPills tech={role.stack} />
      </div>
    </Glass>
  );
}

export default function ExperienceCell() {
  const reduced = Boolean(useReducedMotion());
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setOpen((s) => ({ ...s, [i]: !s[i] }));

  return (
    <BentoCard title="Experience" id="experience">
      {/* Vertical timeline: one full-width role per row, connected by a left rail.
          The rail is inset-y-3 rather than inset-y-0 so it starts and stops at the
          first and last node dots instead of overshooting past them. */}
      <div className="relative sm:pl-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-3 left-[5px] hidden w-px bg-white/10 sm:block"
        />

        <div className="flex flex-col gap-5">
          {experience.map((role, i) => (
            <div key={role.company} className="relative">
              <span
                aria-hidden
                className="absolute -left-8 top-6 hidden h-2.5 w-2.5 rounded-full bg-accent-400 sm:block"
                style={{ boxShadow: "0 0 8px 1px rgba(74, 222, 128, 0.65)" }}
              />
              <RoleColumn
                role={role}
                index={i}
                isOpen={Boolean(open[i])}
                onToggle={() => toggle(i)}
                reduced={reduced}
              />
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
