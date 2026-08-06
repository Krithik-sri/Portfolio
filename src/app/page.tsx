import AboutCell from "@/components/AboutCell";
import BentoCard from "@/components/BentoCard";
import ContactCell from "@/components/ContactCell";
import ContributionDetailCell from "@/components/ContributionDetailCell";
import ExperienceCell from "@/components/ExperienceCell";
import Footer from "@/components/Footer";
import GitHubActivityCell from "@/components/GitHubActivityCell";
import HeroCell from "@/components/HeroCell";
import NavCell from "@/components/NavCell";
import ProjectsCell from "@/components/ProjectsCell";
import RecentActivityCell from "@/components/RecentActivityCell";
import Reveal from "@/components/Reveal";
import StackCell from "@/components/StackCell";
import TopLanguagesCell from "@/components/TopLanguagesCell";
import { getGitHubData } from "@/lib/github";

export default async function Home() {
  // Awaited ONCE here and passed down as slices. Calling getGitHubData() inside each
  // GitHub cell would refetch per cell and let one slow call block independent cells.
  const gh = await getGitHubData();

  return (
    <>
      <main
        id="main"
        className="mx-auto w-full max-w-[1440px] px-3 py-4 sm:px-5 sm:py-6"
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="lg:col-span-12">
            <NavCell />
          </div>

          {/* Hero — full width now that the GitHub panel lives in the GitHub section */}
          <Reveal className="h-full lg:col-span-12" delay={0}>
            <BentoCard className="p-7 sm:p-9" glow>
              <HeroCell />
            </BentoCard>
          </Reveal>

          {/* About and Stack stack vertically — side by side read as cluttered */}
          <Reveal className="h-full lg:col-span-12" delay={0}>
            <AboutCell />
          </Reveal>
          <Reveal className="h-full lg:col-span-12" delay={0}>
            <StackCell />
          </Reveal>

          {/* Experience before Projects */}
          <Reveal className="h-full lg:col-span-12" delay={0}>
            <ExperienceCell />
          </Reveal>

          <Reveal className="h-full lg:col-span-12" delay={0}>
            <ProjectsCell />
          </Reveal>

          {/* All GitHub together: full-year activity, then the detail trio */}
          <Reveal className="h-full lg:col-span-12" delay={0}>
            <GitHubActivityCell
              calendar={gh?.calendar ?? null}
              profileStats={gh?.profileStats ?? null}
            />
          </Reveal>
          <Reveal className="h-full lg:col-span-4" delay={0}>
            <RecentActivityCell events={gh?.events ?? null} />
          </Reveal>
          <Reveal className="h-full lg:col-span-4" delay={0.06}>
            <ContributionDetailCell calendar={gh?.calendar ?? null} />
          </Reveal>
          <Reveal className="h-full lg:col-span-4" delay={0.12}>
            <TopLanguagesCell repoStats={gh?.repoStats ?? null} />
          </Reveal>

          {/* Contact */}
          <Reveal className="h-full lg:col-span-12" delay={0}>
            <BentoCard className="p-7 sm:p-9" glow>
              <ContactCell />
            </BentoCard>
          </Reveal>
        </div>

        <Footer />
      </main>
    </>
  );
}
