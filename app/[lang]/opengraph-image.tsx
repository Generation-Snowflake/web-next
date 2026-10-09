import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { isLang, locales, type Lang } from "@/lib/i18n";
import { getSite, site } from "@/lib/site";

const copy = {
  en: { line1: "We write the software,", line2: "and we sell the robots it runs on." },
  // The OG renderer (satori) drops a tone mark stacked on an upper vowel
  // (ที่, นั้น, ซึ่ง), so this line avoids them; the hero says the same thing.
  th: { line1: "เราเขียนซอฟต์แวร์", line2: "และจำหน่ายหุ่นยนต์ให้ซอฟต์แวร์ทำงานได้จริง" },
} satisfies Record<Lang, { line1: string; line2: string }>;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateImageMetadata({ params }: { params: { lang: string } }) {
  const lang: Lang = isLang(params.lang) ? params.lang : "en";
  return [{ id: "og", alt: `${site.name}. ${copy[lang].line1} ${copy[lang].line2}`, size, contentType }];
}
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand Guidelines colours.
const DARK = "#071128";
const LIGHT = "#F6FAFC";
const MUTED = "#B4BDC9";
const CYAN = "#18D9E3";
const ICE = "#9EEBF0";

/** IBM Plex Sans Thai (the brand typeface) from Google Fonts; falls back to the default font if offline. */
async function loadFont(text: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@${weight}&text=${encodeURIComponent(text)}`,
      )
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  const c = copy[lang];
  const lines = ["GSF", "Robotics and AI", c.line1, c.line2, getSite(lang).address.locality, new URL(site.url).host];
  const text = lines.join("");
  const [bold, regular, logo] = await Promise.all([
    loadFont(text, 700),
    loadFont(text, 400),
    readFile(path.join(process.cwd(), "public/logo-night.png")),
  ]);
  const fonts = [
    ...(bold ? [{ name: "Plex", data: bold, weight: 700 as const, style: "normal" as const }] : []),
    ...(regular ? [{ name: "Plex", data: regular, weight: 400 as const, style: "normal" as const }] : []),
  ];
  // Thai needs more line height for tone marks and no negative tracking.
  const headline = lang === "th" ? { fontSize: 52, lineHeight: 1.4, letterSpacing: 0 } : { fontSize: 68, lineHeight: 1.1, letterSpacing: -1.5 };
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: DARK,
          backgroundImage: `linear-gradient(115deg, ${DARK} 0%, ${DARK} 45%, #0FA7B8 150%)`,
          color: LIGHT,
          fontFamily: fonts.length ? "Plex" : "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logoSrc} width={84} height={84} alt="" />
          <div style={{ display: "flex", fontSize: 34, marginLeft: 20, letterSpacing: 1 }}>
            <span style={{ fontWeight: 700 }}>{lines[0]}</span>
            <span style={{ fontWeight: 400, marginLeft: 12 }}>{lines[1]}</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: headline.fontSize, fontWeight: 700, lineHeight: headline.lineHeight, letterSpacing: headline.letterSpacing }}>
            {lines[2]}
          </div>
          <div style={{ fontSize: headline.fontSize, fontWeight: 700, lineHeight: headline.lineHeight, letterSpacing: headline.letterSpacing, color: CYAN }}>
            {lines[3]}
          </div>
          <div style={{ width: 120, height: 8, marginTop: 32, backgroundImage: `linear-gradient(90deg, ${CYAN}, ${ICE})` }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, fontWeight: 400, color: MUTED }}>
          <span>{lines[4]}</span>
          <span>{lines[5]}</span>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
