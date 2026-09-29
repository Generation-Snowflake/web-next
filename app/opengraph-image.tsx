import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}. We write the software, and we sell the robots it runs on.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0B0C0E";
const PAPER = "#FFFFFF";
const SURFACE = "#F6F7F9";
const GRAPHITE = "#5B616B";
const HAIRLINE = "#E5E7EB";
const TEAL = "#00B4AE";

/** Anuphan (the site font) from Google Fonts; falls back to the default font if offline. */
async function loadFont(text: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Anuphan:wght@${weight}&text=${encodeURIComponent(text)}`)
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const lines = [site.name, "We write the software, and we sell the robots it runs on.", site.address.locality, new URL(site.url).host];
  const text = lines.join("");
  const [semibold, regular] = await Promise.all([loadFont(text, 600), loadFont(text, 400)]);
  const fonts = [
    ...(semibold ? [{ name: "Anuphan", data: semibold, weight: 600 as const, style: "normal" as const }] : []),
    ...(regular ? [{ name: "Anuphan", data: regular, weight: 400 as const, style: "normal" as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 40,
          backgroundColor: SURFACE,
          fontFamily: fonts.length ? "Anuphan" : "sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 64px",
            backgroundColor: PAPER,
            color: INK,
            border: `1px solid ${HAIRLINE}`,
            borderRadius: 24,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", fontSize: 30, fontWeight: 600, color: GRAPHITE }}>
              <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: TEAL, marginRight: 16 }} />
              {lines[0]}
            </div>
            <div style={{ fontSize: 68, fontWeight: 600, marginTop: 36, maxWidth: 980, lineHeight: 1.08, letterSpacing: -2.4 }}>
              {lines[1]}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, fontWeight: 400, color: GRAPHITE }}>
            <span>{lines[2]}</span>
            <span>{lines[3]}</span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
