"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { type MouseEvent, type ReactNode } from "react";

type MagneticButtonProps = {
  href: string;
  download?: boolean;
  className?: string;
  variant?: "solid" | "outline";
  children: ReactNode;
};

export default function MagneticButton({
  href,
  download,
  className = "",
  variant = "outline",
  children,
}: MagneticButtonProps) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variantClass =
    variant === "solid"
      ? "bg-accent-300 text-base hover:bg-accent-200"
      : "glass text-ink hover:text-accent-300";

  // Only genuinely off-site links open a new tab. In-page anchors (#work) and
  // mailto: must stay in-tab — target="_blank" on those spawns a blank tab.
  const isExternal = /^https?:\/\//i.test(href);

  return (
    <motion.a
      href={href}
      download={download}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={reduced ? undefined : { x: springX, y: springY }}
      className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-colors ${variantClass} ${className}`}
    >
      {children}
    </motion.a>
  );
}
