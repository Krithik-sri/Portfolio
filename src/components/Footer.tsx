import { ArrowUp } from "lucide-react";
import { profile } from "@/content";

export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 px-2 py-6 font-mono text-xs text-ink-faint">
      <span className="flex items-center gap-2">
        <span
          aria-hidden
          className="flex h-6 w-6 items-center justify-center rounded-md bg-accent-300/10 text-[10px] font-semibold text-accent-300"
        >
          KS
        </span>
        © {new Date().getFullYear()} {profile.name}
      </span>
      <a href="#main" className="flex items-center gap-1 transition-colors hover:text-accent-300">
        Back to top <ArrowUp size={12} aria-hidden />
      </a>
    </footer>
  );
}
