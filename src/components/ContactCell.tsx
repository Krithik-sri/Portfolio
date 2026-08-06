import { CircleCheck, Mail, MapPin } from "lucide-react";
import GlassObject from "@/components/GlassObject";
import MagneticButton from "@/components/MagneticButton";
import { profile } from "@/content";

const INFO_ROWS = [
  { icon: Mail, label: "Email", value: profile.email },
  { icon: MapPin, label: "Location", value: profile.location },
  { icon: CircleCheck, label: "Availability", value: "Open to opportunities" },
];

export default function ContactCell() {
  return (
    <div id="contact" className="grid h-full gap-8 lg:grid-cols-[1.1fr_1fr_0.8fr] lg:items-center">
      <div className="flex flex-col gap-4">
        <h2 className="text-display glow-text-soft text-3xl leading-tight sm:text-4xl lg:text-5xl">
          Let&apos;s build something awesome together.
        </h2>
        <p className="max-w-sm text-sm text-ink-muted">
          Have a role, a project, or just want to talk systems? I&apos;m always open to a
          conversation.
        </p>
        <MagneticButton href={`mailto:${profile.email}`} variant="solid" className="w-fit hover:glow-ring">
          Get In Touch
        </MagneticButton>
      </div>

      <div className="flex flex-col gap-4">
        {INFO_ROWS.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="glass flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-accent-300">
              <Icon size={16} aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">
                {label}
              </p>
              <p className="truncate text-sm text-ink">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <GlassObject variant="plane" className="h-48 sm:h-56 lg:h-full" />
    </div>
  );
}
