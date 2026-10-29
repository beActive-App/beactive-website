import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const jetzt = new Date();
  const seite = (pfad: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]) => ({
    url: `${SITE_URL}${pfad}`,
    lastModified: jetzt,
    changeFrequency,
    priority,
  });
  return [
    seite("/", 1, "daily"),
    seite("/partner", 0.9, "monthly"),
    seite("/faq", 0.5, "monthly"),
    seite("/team", 0.4, "yearly"),
    seite("/kontakt", 0.4, "yearly"),
    seite("/newsletter", 0.4, "yearly"),
    seite("/impressum", 0.2, "yearly"),
    seite("/datenschutz", 0.2, "yearly"),
    seite("/konto-loeschen", 0.2, "yearly"),
    seite("/agb", 0.2, "yearly"),
  ];
}
