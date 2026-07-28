import type { MetadataRoute } from "next";
import { concepts } from "@/app/lib/concepts";
import { BASE_URL } from "@/app/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const conceptEntries: MetadataRoute.Sitemap = concepts.flatMap((concept) => {
    const entries = [{ url: `${BASE_URL}/concepts/${concept.slug}` }];
    if (concept.children) {
      for (const child of concept.children) {
        if (child.slug !== concept.slug) {
          entries.push({ url: `${BASE_URL}/concepts/${child.slug}` });
        }
      }
    }
    return entries;
  });

  return [{ url: BASE_URL, priority: 1 }, ...conceptEntries];
}
