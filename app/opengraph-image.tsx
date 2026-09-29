import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}. We write the software, and we sell the robots it runs on.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#16181A";
const PAPER = "#F3F1EC";
const GRAPHITE = "#55595D";

/** IBM Plex Mono from Google Fonts; falls back to the default font if offline. */
async function loadMono(text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&text=${encodeURIComponent(text)}`)
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
  const mono = await loadMono(lines.join(""));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: PAPER,
          color: INK,
          fontFamily: mono ? "Plex Mono" : "monospace",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", borderTop: `2px solid ${INK}`, paddingTop: 28 }}>
          <div style={{ fontSize: 76, letterSpacing: -2 }}>{lines[0]}</div>
          <div style={{ fontSize: 34, marginTop: 28, maxWidth: 980, lineHeight: 1.35 }}>{lines[1]}</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `1px solid ${INK}`,
            paddingTop: 20,
            fontSize: 26,
            color: GRAPHITE,
          }}
        >
          <span>{lines[2]}</span>
          <span>{lines[3]}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: mono ? [{ name: "Plex Mono", data: mono, weight: 500, style: "normal" }] : undefined,
    },
  );
}
