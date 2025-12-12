import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://gsf-robotics.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // Add other pages if they exist as separate routes
    // {
    //   url: "https://gsf-robotics.com/about",
    //   lastModified: new Date(),
    //   changeFrequency: "monthly",
    //   priority: 0.8,
    // },
  ];
}
