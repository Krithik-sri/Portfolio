"use client";

import { type ComponentPropsWithoutRef, type PointerEventHandler } from "react";

type GlassProps = ComponentPropsWithoutRef<"div">;

export default function Glass({
  className = "",
  onPointerMove,
  children,
  ...props
}: GlassProps) {
  const handlePointerMove: PointerEventHandler<HTMLDivElement> = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
    onPointerMove?.(e);
  };

  return (
    <div
      className={`glass backdrop-blur-xl backdrop-saturate-150 ${className}`}
      onPointerMove={handlePointerMove}
      {...props}
    >
      {children}
    </div>
  );
}
