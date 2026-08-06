import BentoCard from "@/components/BentoCard";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/content";

export default function ProjectsCell() {
  return (
    <BentoCard
      id="work"
      title="Featured Projects"
      action={{ label: "View All Projects", href: "https://github.com/Krithik-sri" }}
    >
      <div className="thin-scroll flex gap-5 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
        {projects.map((project, i) => (
          <div
            key={project.name}
            className={`shrink-0 lg:w-auto lg:shrink ${
              project.featured ? "w-[340px] sm:w-[420px] lg:col-span-2" : "w-[280px] sm:w-[320px]"
            }`}
          >
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
