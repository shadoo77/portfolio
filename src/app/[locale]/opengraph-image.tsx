import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = "Mohamad Shadi Omar — Senior Frontend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const stats = ["JavaScript 7+", "React 7+", "Next.js 5+"];

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "76px",
        backgroundColor: "#09090b",
        backgroundImage:
          "linear-gradient(135deg, #131316 0%, #09090b 55%, #0c1206 100%)",
        color: "#fafafa",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          fontSize: 28,
          color: "#a1a1aa",
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 9999,
            backgroundColor: "#a3e635",
          }}
        />
        <div style={{ display: "flex" }}>Open to senior frontend roles</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "flex",
            fontSize: 86,
            fontWeight: 700,
            letterSpacing: -2.5,
            lineHeight: 1.05,
          }}
        >
          Mohamad Shadi Omar
        </div>
        <div style={{ display: "flex", fontSize: 34, color: "#a1a1aa" }}>
          Senior frontend / fullstack developer
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          fontSize: 24,
          color: "#71717a",
        }}
      >
        <div style={{ display: "flex", gap: 32 }}>
          {stats.map((stat) => (
            <div key={stat} style={{ display: "flex" }}>
              {stat}
            </div>
          ))}
        </div>
        <div style={{ display: "flex" }}>
          {siteConfig.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    </div>,
    size,
  );
}
