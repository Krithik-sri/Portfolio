import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import Glass from "@/components/Glass";

type BentoCardProps = {
  title?: string;
  /** Optional leading icon shown before the title, replacing the default glow dot. */
  icon?: ReactNode;
  action?: { label: string; href: string };
  id?: string;
  className?: string;
  bodyClassName?: string;
  glow?: boolean;
  children: ReactNode;
};

export default function BentoCard({
  title,
  icon,
  action,
  id,
  className = "",
  bodyClassName = "",
  glow = false,
  children,
}: BentoCardProps) {
  return (
    <Glass id={id} className={`h-full p-6 sm:p-7 ${glow ? "glow-panel" : ""} ${className}`}>
      {title && (
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            {icon ? (
              <span aria-hidden className="flex shrink-0 items-center text-accent-300 glow-text">
                {icon}
              </span>
            ) : (
              <span
                aria-hidden
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-200"
                style={{
                  boxShadow:
                    "0 0 5px 1px rgba(220,252,231,0.95), 0 0 14px 2px rgba(74,222,128,0.7), 0 0 30px 4px rgba(34,197,94,0.4)",
                }}
              />
            )}
            <h3 className="text-lg text-ink glow-text-soft">{title}</h3>
          </div>
          {action && (
            <a
              href={action.href}
              target={/^https?:\/\//i.test(action.href) ? "_blank" : undefined}
              rel={/^https?:\/\//i.test(action.href) ? "noreferrer" : undefined}
              className="flex shrink-0 items-center gap-1 text-xs text-ink-muted transition-colors hover:text-accent-300"
            >
              {action.label} <ArrowUpRight size={13} aria-hidden />
            </a>
          )}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </Glass>
  );
}
