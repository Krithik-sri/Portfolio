import type { CSSProperties } from "react";

// Positions/timings are index-derived, never Math.random() — this is a server
// component, so random values would differ between SSR and hydration.
const PARTICLES = Array.from({ length: 34 }, (_, i) => {
  const left = (i * 37 + 5) % 100;
  const top = (i * 53 + 13) % 100;
  const size = 1 + (i % 4); // 1..4px — varied sizes read as depth
  const duration = 22 + (i % 7) * 6; // 22..58s travel
  const delay = -((i * 13) % 55); // negative => field is already in motion on load
  const dx = (i % 2 === 0 ? 1 : -1) * (10 + (i % 5) * 7); // lateral wander, px
  const dy = -(35 + (i % 4) * 18); // upward travel, vh
  // Twinkle runs on its own clock so a mote's shimmer doesn't sync to its travel.
  const twinkle = 3.5 + (i % 6) * 1.4; // 3.5..10.5s
  const twinkleDelay = -((i * 7) % 11);
  const accent = i % 3 === 0; // ~1/3 green, rest near-white
  const peakOpacity = 0.12 + (i % 5) * 0.08; // 0.12..0.44
  return { i, left, top, size, duration, delay, dx, dy, twinkle, twinkleDelay, accent, peakOpacity };
});

export default function Ambient() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      <svg className="absolute h-0 w-0">
        <filter id="refract">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" />
        </filter>
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
      </svg>

      <div
        className="absolute inset-0"
        style={{ filter: "url(#refract)" }}
      >
        <div
          className="absolute rounded-full"
          style={{
            top: "-10%",
            left: "-10%",
            width: "50vw",
            height: "50vw",
            // Neutral, NOT green. Every green orb here tinted the page; the reference
            // design's background is flat black and all its colour lives inside the
            // cards. These two orbs now only add faint tonal depth. See `.glass`.
            background:
              "radial-gradient(circle, rgba(200,215,235,0.5) 0%, transparent 70%)",
            opacity: 0.022,
            filter: "blur(120px)",
            animation: "drift-a 55s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: "30%",
            right: "-15%",
            width: "60vw",
            height: "60vw",
            background:
              "radial-gradient(circle, rgba(200,215,235,0.5) 0%, transparent 70%)",
            opacity: 0.018,
            filter: "blur(120px)",
            animation: "drift-b 70s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: "-15%",
            left: "20%",
            width: "40vw",
            height: "40vw",
            background:
              "radial-gradient(circle, rgba(230,240,255,0.5) 0%, transparent 70%)",
            opacity: 0.035,
            filter: "blur(120px)",
            animation: "drift-c 90s ease-in-out infinite alternate",
          }}
        />
      </div>


      <div className="absolute inset-0">
        {PARTICLES.map((p) => (
          // Wrapper owns travel (transform only), inner dot owns shimmer (opacity).
          <div
            key={p.i}
            className="absolute"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animation: `particle-drift ${p.duration}s linear ${p.delay}s infinite`,
              ["--mote-dx" as string]: `${p.dx}px`,
              ["--mote-dy" as string]: `${p.dy}vh`,
            } as CSSProperties}
          >
            <div
              className="rounded-full"
              style={{
                width: p.size,
                height: p.size,
                background: p.accent ? "var(--color-accent-300)" : "rgba(237, 238, 240, 0.9)",
                boxShadow: p.accent
                  ? "0 0 6px rgba(74,222,128,0.7)"
                  : "0 0 5px rgba(237,238,240,0.5)",
                opacity: 0,
                animation: `particle-twinkle ${p.twinkle}s ease-in-out ${p.twinkleDelay}s infinite`,
                ["--mote-o" as string]: p.peakOpacity,
              } as CSSProperties}
            />
          </div>
        ))}
      </div>

      <svg className="absolute inset-0 h-full w-full" style={{ opacity: 0.03, mixBlendMode: "overlay" }}>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
