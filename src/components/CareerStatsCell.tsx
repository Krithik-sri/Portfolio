import { Briefcase, FolderGit2, GraduationCap, Trophy } from "lucide-react";
import StatTile from "@/components/StatTile";
import { achievements, education, experience, projects } from "@/content";

// Derived, not hardcoded — every value traces back to content.ts so it can't
// drift out of sync with the source of truth.
const achievement = achievements[0];
const [achievementLabel, achievementRest] = achievement.title.split(" — ");
const achievementValue = achievementRest?.replace(/\s*\(.*\)$/, "") ?? achievement.title;
const cgpaValue = education.gpa.replace(/^CGPA\s*/i, "");

// Tones are semantic rather than decorative: a trophy is gold, education is violet.
// Uniform green made four different facts look like one repeated stat.
const STATS = [
  { label: "Roles Held", value: String(experience.length), icon: <Briefcase size={20} />, tone: "#38bdf8" },
  { label: "Projects Shipped", value: String(projects.length), icon: <FolderGit2 size={20} />, tone: "#4ade80" },
  { label: achievementLabel, value: achievementValue, icon: <Trophy size={20} />, tone: "#fbbf24" },
  { label: "CGPA", value: cgpaValue, icon: <GraduationCap size={20} />, tone: "#a78bfa" },
];

export default function CareerStatsCell() {
  return (
    <div className="flex flex-wrap gap-4">
      {STATS.map((stat) => (
        <StatTile key={stat.label} {...stat} />
      ))}
    </div>
  );
}
