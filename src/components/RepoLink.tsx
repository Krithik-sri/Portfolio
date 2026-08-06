import { ExternalLink } from "lucide-react";

type RepoLinkProps = {
  href: string;
  live?: string;
};

export default function RepoLink({ href, live }: RepoLinkProps) {
  return (
    <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-1.5 text-ink-muted transition-colors hover:text-accent-300 hover:glow-ring"
      >
        Repo <ExternalLink size={13} />
      </a>
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-ink-muted transition-colors hover:text-accent-300 hover:glow-ring"
        >
          Live <ExternalLink size={13} />
        </a>
      )}
    </div>
  );
}
