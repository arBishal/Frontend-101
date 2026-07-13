import { ImageResponse } from "next/og";

export const alt = "Frontend 101 — Frontend Concepts, Explained";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        {/* Terminal prompt */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "40px",
          }}
        >
          <span style={{ color: "#52525b", fontSize: "22px", fontFamily: "monospace" }}>
            $
          </span>
          <span style={{ color: "#71717a", fontSize: "22px", fontFamily: "monospace" }}>
            npx frontend-101
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: "72px",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-2px",
            marginBottom: "28px",
          }}
        >
          <span style={{ color: "#fafafa" }}>Frontend Concepts,&nbsp;</span>
          <span style={{ color: "#71717a" }}>Explained</span>
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "26px",
            color: "#71717a",
            lineHeight: 1.5,
            maxWidth: "700px",
          }}
        >
          Interactive, visual explanations of concepts every frontend developer
          runs into early on.
        </div>

        {/* Bottom rule */}
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            left: "80px",
            right: "80px",
            height: "1px",
            background: "#27272a",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
