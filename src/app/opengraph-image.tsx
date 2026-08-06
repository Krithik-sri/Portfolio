import { ImageResponse } from "next/og";
import { profile } from "@/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — Software Engineer`;

// Satori (behind ImageResponse) supports only a subset of CSS: no backdrop-filter,
// no CSS vars, no box-shadow. The glass look is faked with layered gradients.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#060809",
          backgroundImage:
            "radial-gradient(900px circle at 8% 0%, rgba(22,163,74,0.32), transparent 55%), radial-gradient(700px circle at 95% 100%, rgba(21,128,61,0.28), transparent 55%)",
          color: "#EDEEF0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            padding: "56px",
            borderRadius: "28px",
            border: "1px solid rgba(255,255,255,0.12)",
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))",
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#4ADE80",
            }}
          >
            Portfolio
          </div>
          <div style={{ fontSize: 86, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 30, color: "#9BA1A6", maxWidth: 900, lineHeight: 1.35 }}>
            Software Engineer — full-stack, with a genuine interest in systems and
            infrastructure.
          </div>
          <div style={{ display: "flex", gap: "28px", fontSize: 22, color: "#6E757C" }}>
            <span>github.com/Krithik-sri</span>
            <span>{profile.location}</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
