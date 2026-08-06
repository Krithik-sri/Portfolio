"use client";

import { Mail } from "lucide-react";
import { siGithub } from "simple-icons";
import GlassObject from "@/components/GlassObject";
import MagneticButton from "@/components/MagneticButton";
import { profile } from "@/content";

function GitHubGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
      <path d={siGithub.path} />
    </svg>
  );
}

// simple-icons dropped LinkedIn's brand asset after a takedown request, so this is a
// minimal generic "in" badge built from primitives rather than a copied brand glyph.
function LinkedInGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
      <circle cx="4.5" cy="4.5" r="2.5" />
      <rect x="2.5" y="9" width="4" height="12" rx="0.5" />
      <path d="M10.5 9h4v2.3c.9-1.6 2.6-2.6 4.6-2.6 3.6 0 5.4 2.4 5.4 6.4V21h-4v-5.4c0-1.9-.7-3.2-2.4-3.2-1.3 0-2.1.9-2.5 1.8-.1.3-.2.7-.2 1.2V21h-4z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { href: profile.socials.github, label: "GitHub", icon: <GitHubGlyph /> },
  { href: profile.socials.linkedin, label: "LinkedIn", icon: <LinkedInGlyph /> },
  { href: `mailto:${profile.email}`, label: "Email", icon: <Mail size={15} aria-hidden /> },
];

export default function HeroCell() {
  return (
    <div className="grid h-full items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
      <div className="flex flex-col gap-5">
        <span className="glass w-fit rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-accent-300">
          Backend · Full-stack · Systems
        </span>

        <div>
          <p className="font-mono text-sm text-ink-muted">Hi, I&apos;m</p>
          <h1
            className="text-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl"
            style={{
              // Solid fallback colour first: -webkit-text-fill-color only kicks in
              // where the clip is honoured, so the name is never invisible.
              color: "var(--color-accent-300)",
              backgroundImage:
                "linear-gradient(135deg, var(--color-accent-100), var(--color-accent-300) 55%, var(--color-accent-700))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {profile.name}
          </h1>
        </div>

        <p className="max-w-lg text-ink-muted">{profile.tagline}</p>

        <div className="mt-2 flex flex-wrap gap-3">
          <MagneticButton href="#work" variant="solid" className="hover:glow-ring">
            View My Work
          </MagneticButton>
          <MagneticButton href={profile.resumeUrl} download variant="outline">
            Download Resume
          </MagneticButton>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">
            Connect with me
          </span>
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target={s.label === "Email" ? undefined : "_blank"}
                rel={s.label === "Email" ? undefined : "noreferrer"}
                className="glass flex h-8 w-8 items-center justify-center rounded-full text-ink-muted transition-colors hover:text-accent-300 hover:glow-ring"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <GlassObject variant="slab" className="h-56 sm:h-72 lg:h-full" />
    </div>
  );
}
