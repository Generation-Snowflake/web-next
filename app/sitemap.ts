import type { MetadataRoute } from "next";
import { localizeHref } from "@/lib/i18n";
import { site } from "@/lib/site";
import { products } from "@/lib/products";

type Entry = {
  path: string;
  priority: number;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
};

const staticRoutes: Entry[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/products", priority: 0.9, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/training", priority: 0.8, changeFrequency: "monthly" },
  { path: "/portfolio", priority: 0.7, changeFrequency: "monthly" },
  { path: "/workflow", priority: 0.6, changeFrequency: "yearly" },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" },
];

const abs = (path: string) => new URL(path, site.url).toString();

/** Every page in English (unprefixed) and Thai (/th), each listing both as hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const productRoutes: Entry[] = products.map((p) => ({
    path: `/products/${p.slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...productRoutes].flatMap(({ path, priority, changeFrequency }) => {
    const languages = { en: abs(localizeHref(path, "en")), th: abs(localizeHref(path, "th")) };
    return (["en", "th"] as const).map((lang) => ({
      url: languages[lang],
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });
}
