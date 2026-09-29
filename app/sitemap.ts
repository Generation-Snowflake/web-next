import type { MetadataRoute } from "next";
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
  { path: "/portfolio", priority: 0.7, changeFrequency: "monthly" },
  { path: "/workflow", priority: 0.6, changeFrequency: "yearly" },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" },
  { path: "/power-plant", priority: 0.4, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const productRoutes: Entry[] = products.map((p) => ({
    path: `/products/${p.slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...productRoutes].map(({ path, priority, changeFrequency }) => ({
    url: new URL(path, site.url).toString(),
    lastModified,
    changeFrequency,
    priority,
  }));
}
