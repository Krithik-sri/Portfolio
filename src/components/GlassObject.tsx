"use client";

import { useReducedMotion } from "motion/react";
import { useId } from "react";

type Variant = "slab" | "crystal" | "plane";

type GlassObjectProps = {
  variant: Variant;
  className?: string;
};

const FLOAT_DURATION: Record<Variant, number> = { slab: 14, crystal: 18, plane: 16 };

const EDGE = "rgba(209,250,229,0.85)";
const EDGE_DIM = "rgba(167,243,208,0.28)";

/**
 * Deliberately NO feDisplacementMap here. An earlier version ran one over every shape
 * to fake refraction; it warps straight edges into wobbly ones, which made precise
 * geometry read as sloppy hand-drawing. Depth comes from exact projection + a real
 * feGaussianBlur bloom on the strokes instead.
 */
function Defs({ glow, face, sheen }: { glow: string; face: string; sheen: string }) {
  return (
    <defs>
      <filter id={glow} x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="3.2" result="b1" />
        <feGaussianBlur stdDeviation="7" result="b2" />
        <feMerge>
          <feMergeNode in="b2" />
          <feMergeNode in="b1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <linearGradient id={face} x1="0%" y1="0%" x2="30%" y2="100%">
        {/* Clear at the top, catching the green pooled beneath at the bottom. */}
        <stop offset="0%" stopColor="rgba(255,255,255,0.10)" />
        <stop offset="55%" stopColor="rgba(255,255,255,0.03)" />
        <stop offset="100%" stopColor="rgba(74,222,128,0.16)" />
      </linearGradient>
      <linearGradient id={sheen} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.20)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
    </defs>
  );
}

/** Exact extruded box: front face + top + right, offset by a constant (dx,-dy). */
function SlabShape({ uid }: { uid: string }) {
  const glow = `go-glow-slab-${uid}`;
  const face = `go-face-slab-${uid}`;
  const sheen = `go-sheen-slab-${uid}`;
  return (
    <>
      <Defs glow={glow} face={face} sheen={sheen} />
      <g filter={`url(#${glow})`} strokeLinejoin="round">
        {/* back faces first so the front overlaps them cleanly */}
        <polygon points="40,55 66,35 176,35 150,55" fill={`url(#${face})`} stroke={EDGE_DIM} strokeWidth="1.1" />
        <polygon points="150,55 176,35 176,125 150,145" fill={`url(#${face})`} stroke={EDGE_DIM} strokeWidth="1.1" />
        <rect x="40" y="55" width="110" height="90" fill={`url(#${face})`} stroke={EDGE} strokeWidth="1.6" />
        <rect x="52" y="67" width="86" height="66" fill="none" stroke={EDGE_DIM} strokeWidth="0.9" />
        <polygon points="40,55 150,55 40,124" fill={`url(#${sheen})`} />
        <text
          x="95"
          y="112"
          textAnchor="middle"
          fontSize="30"
          letterSpacing="2"
          style={{ fontFamily: "var(--font-mono), monospace" }}
          fill="rgba(220,252,231,0.95)"
        >
          {"</>"}
        </text>
      </g>
    </>
  );
}

/**
 * Hexagonal bipyramid — a gem. Vertices are computed from an actual hexagon
 * (r=55) squashed to ry=24.75 for perspective, so it is exactly symmetric.
 */
const HEX = [
  [155, 100],
  [127.5, 121.4],
  [72.5, 121.4],
  [45, 100],
  [72.5, 78.6],
  [127.5, 78.6],
] as const;
const APEX_TOP = [100, 22] as const;
const APEX_BOT = [100, 178] as const;

function CrystalShape({ uid }: { uid: string }) {
  const glow = `go-glow-crystal-${uid}`;
  const face = `go-face-crystal-${uid}`;
  const sheen = `go-sheen-crystal-${uid}`;
  const ring = HEX.map((p) => p.join(",")).join(" ");
  return (
    <>
      <Defs glow={glow} face={face} sheen={sheen} />
      <g filter={`url(#${glow})`} strokeLinejoin="round">
        {HEX.map((p, i) => {
          const next = HEX[(i + 1) % HEX.length];
          // Lower half of the ring faces the viewer — brighten those facets.
          const front = p[1] > 100 || next[1] > 100;
          return (
            <g key={i}>
              <polygon
                points={`${APEX_TOP.join(",")} ${p.join(",")} ${next.join(",")}`}
                fill={`url(#${face})`}
                fillOpacity={front ? 0.85 : 0.4}
                stroke={front ? EDGE : EDGE_DIM}
                strokeWidth="1"
              />
              <polygon
                points={`${APEX_BOT.join(",")} ${p.join(",")} ${next.join(",")}`}
                fill={`url(#${face})`}
                fillOpacity={front ? 0.7 : 0.3}
                stroke={front ? EDGE : EDGE_DIM}
                strokeWidth="1"
              />
            </g>
          );
        })}
        <polygon points={ring} fill="none" stroke={EDGE} strokeWidth="1.3" />
        <ellipse cx="88" cy="62" rx="13" ry="8" fill={`url(#${sheen})`} transform="rotate(-24 88 62)" />
      </g>
    </>
  );
}

/** Symmetric dart: nose on the centre line, wings mirrored about x=100. */
function PlaneShape({ uid }: { uid: string }) {
  const glow = `go-glow-plane-${uid}`;
  const face = `go-face-plane-${uid}`;
  const sheen = `go-sheen-plane-${uid}`;
  return (
    <>
      <Defs glow={glow} face={face} sheen={sheen} />
      <g filter={`url(#${glow})`} strokeLinejoin="round" transform="rotate(-10 100 100)">
        <polygon points="100,32 42,158 100,132" fill={`url(#${face})`} fillOpacity={0.5} stroke={EDGE_DIM} strokeWidth="1.1" />
        <polygon points="100,32 158,158 100,132" fill={`url(#${face})`} fillOpacity={0.85} stroke={EDGE} strokeWidth="1.4" />
        <polygon points="100,32 158,158 100,168" fill={`url(#${face})`} fillOpacity={0.35} stroke={EDGE_DIM} strokeWidth="1" />
        <line x1="100" y1="32" x2="100" y2="168" stroke={EDGE} strokeWidth="1.2" />
        <polygon points="100,32 112,58 100,52" fill="rgba(255,255,255,0.35)" />
      </g>
    </>
  );
}

export default function GlassObject({ variant, className = "" }: GlassObjectProps) {
  const reduced = useReducedMotion();
  const uid = useId().replace(/:/g, "");

  return (
    <div aria-hidden className={`relative flex items-center justify-center ${className}`}>
      {/* Light pools UNDER the object, as if it rests on a lit surface. */}
      <div
        className="absolute inset-x-[16%] bottom-[8%] h-[16%] rounded-[50%]"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--color-accent-300) 0%, var(--color-accent-600) 42%, transparent 72%)",
          opacity: 0.38,
          filter: "blur(20px)",
        }}
      />
      <svg
        viewBox="0 0 200 200"
        className="relative h-full w-full overflow-visible"
        style={
          reduced
            ? undefined
            : { animation: `glassobj-float ${FLOAT_DURATION[variant]}s ease-in-out infinite alternate` }
        }
      >
        {variant === "slab" && <SlabShape uid={uid} />}
        {variant === "crystal" && <CrystalShape uid={uid} />}
        {variant === "plane" && <PlaneShape uid={uid} />}
      </svg>
    </div>
  );
}
