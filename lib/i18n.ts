// Two languages: English at the unprefixed URLs (/about), Thai under /th
// (/th/about). proxy.ts rewrites unprefixed requests to app/[lang] with
// lang = "en". Copy for components lives next to them as { en, th } pairs;
// Thai versions of the lib/*.ts data live in lib/th/*.ts.
import type { Metadata } from "next";

export const locales = ["en", "th"] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = "en";

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/** A value in both languages. */
export type Localized<T> = Record<Lang, T>;

/** Pick the value for a language. */
export function tr<T>(value: Localized<T>, lang: Lang): T {
  return value[lang];
}

/** Internal path for a language: ("/about", "th") → "/th/about". Leaves
 *  external URLs, mailto:, tel: and hash-only links alone. */
export function localizeHref(href: string, lang: Lang): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const path = stripLang(href).path;
  if (lang === defaultLang) return path;
  if (path === "/") return "/th";
  if (path.startsWith("/#") || path.startsWith("/?")) return `/th${path.slice(1)}`;
  return `/th${path}`;
}

/** "/th/about" → { lang: "th", path: "/about" }; "/about" → { lang: "en", path: "/about" }. */
export function stripLang(pathname: string): { lang: Lang; path: string } {
  for (const l of locales) {
    if (pathname === `/${l}`) return { lang: l, path: "/" };
    for (const sep of ["/", "#", "?"]) {
      if (pathname.startsWith(`/${l}${sep}`)) {
        const rest = pathname.slice(l.length + 1);
        return { lang: l, path: rest.startsWith("/") ? rest : `/${rest}` };
      }
    }
  }
  return { lang: defaultLang, path: pathname };
}

/** canonical + hreflang links for a page path given in its English form. */
export function alternates(path: string, lang: Lang): NonNullable<Metadata["alternates"]> {
  return {
    canonical: localizeHref(path, lang),
    languages: {
      en: localizeHref(path, "en"),
      th: localizeHref(path, "th"),
      "x-default": localizeHref(path, "en"),
    },
  };
}

export const ogLocale: Record<Lang, string> = { en: "en_US", th: "th_TH" };

type Plain = Record<string, unknown>;
const isPlain = (v: unknown): v is Plain => typeof v === "object" && v !== null && !Array.isArray(v);

/** Deep partial used by the Thai data overlays. Arrays merge by index. */
export type Overlay<T> = T extends string
  ? string
  : T extends number | boolean | undefined | null
    ? T
    : T extends ((...args: never[]) => unknown)
    ? T
    : T extends readonly (infer U)[]
      ? Overlay<U>[]
      : { [K in keyof T]?: Overlay<T[K]> };

/** Merge a Thai overlay onto the English data: strings and numbers are
 *  replaced, objects merge by key, arrays merge item by item. */
export function overlay<T>(base: T, patch: NoInfer<Overlay<T>> | undefined): T {
  if (patch === undefined) return base;
  if (Array.isArray(base) && Array.isArray(patch)) {
    return base.map((item, i) => overlay(item, (patch as unknown[])[i] as Overlay<typeof item>)) as T;
  }
  if (isPlain(base) && isPlain(patch)) {
    const out: Plain = { ...base };
    for (const [k, v] of Object.entries(patch)) out[k] = overlay(base[k], v as Overlay<unknown>);
    return out as T;
  }
  // Functions (icons) and other non-data values stay as they are.
  if (typeof base === "function" || (typeof base === "object" && base !== null && !isPlain(base))) return base;
  return patch as T;
}

/** Route params of every page under app/[lang]. */
export type LangParams = Promise<{ lang: string }>;

/** The page language from its route params (unknown values fall back to English). */
export async function langFrom(params: LangParams): Promise<Lang> {
  const { lang } = await params;
  return isLang(lang) ? lang : defaultLang;
}
