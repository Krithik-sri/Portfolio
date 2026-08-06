"use client";

import { Download, Mail } from "lucide-react";
import { motion } from "motion/react";
import { siGithub } from "simple-icons";
import Glass from "@/components/Glass";
import { profile } from "@/content";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Projects" },
  { href: "#github", label: "GitHub" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

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
  { href: `mailto:${profile.email}`, label: "Email", icon: <Mail size={14} aria-hidden /> },
];

const ICON_BUTTON =
  "glass flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink-muted transition-colors hover:text-accent-300 hover:glow-ring sm:h-9 sm:w-9";

export default function NavCell() {
  return (
    <Glass className="flex items-center gap-2 px-2.5 py-2 sm:gap-4 sm:px-5 sm:py-3">
      <div
        aria-hidden
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-300/15 font-mono text-[11px] font-semibold text-accent-300 glow-text-soft sm:h-8 sm:w-8 sm:text-xs"
      >
        KS
      </div>

      <div className="thin-scroll flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto sm:justify-center sm:gap-1">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="shrink-0 rounded-full px-2 py-1.5 font-mono text-[10px] uppercase tracking-wide text-ink-muted transition-colors hover:text-accent-300 sm:px-3 sm:text-xs sm:tracking-widest"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        {SOCIAL_LINKS.map((s) => (
          <motion.a
            key={s.label}
            href={s.href}
            aria-label={s.label}
            target={s.label === "Email" ? undefined : "_blank"}
            rel={s.label === "Email" ? undefined : "noreferrer"}
            whileHover={{ scale: 1.08 }}
            className={ICON_BUTTON}
          >
            {s.icon}
          </motion.a>
        ))}
        <motion.a
          href={profile.resumeUrl}
          download
          aria-label="Download résumé"
          whileHover={{ scale: 1.08 }}
          className={ICON_BUTTON}
        >
          <Download size={14} aria-hidden />
        </motion.a>
      </div>
    </Glass>
  );
}
