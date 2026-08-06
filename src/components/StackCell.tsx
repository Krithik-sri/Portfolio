import BentoCard from "@/components/BentoCard";
import CareerStatsCell from "@/components/CareerStatsCell";
import TechPills from "@/components/TechPills";
import TechStackTiles from "@/components/TechStackTiles";
import { skills } from "@/content";

// Holds what the old Skills section carried. TechStackTiles covers the 12 headline
// logos; the grouped list below keeps the things a logo row can't show — gRPC,
// WebSockets, RAG, Vitest, LocalStack — which are real evidence, not filler.
export default function StackCell() {
  return (
    <BentoCard id="skills" title="Stack">
      <div className="flex flex-col gap-7">
        <CareerStatsCell />

        <TechStackTiles />

        <div className="flex flex-col gap-3 border-t border-white/5 pt-6">
          {skills.map((group) => (
            <div key={group.category} className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              <span className="shrink-0 pt-1 font-mono text-[11px] uppercase tracking-widest text-ink-faint sm:w-40">
                {group.category}
              </span>
              <TechPills tech={group.items} />
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
