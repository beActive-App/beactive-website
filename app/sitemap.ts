import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getWebsiteEvents } from "@/lib/events";
import { istOeffnungszeit } from "@/lib/event-format";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const jetzt = new Date();
  const seite = (pfad: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]) => ({
    url: `${SITE_URL}${pfad}`,
    lastModified: jetzt,
    changeFrequency,
    priority,
  });

  // Jeder bevorstehende Termin hat eine eigene Seite. Fällt die Datenbank
  // aus, bleibt die Sitemap bei den festen Seiten.
  const ergebnis = await getWebsiteEvents();
  const termine =
    ergebnis.status === "ok"
      ? ergebnis.events.filter((e) => !istOeffnungszeit(e)).map((e) => seite(`/termin/${e.id}`, 0.6, "daily"))
      : [];

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
    ...termine,
  ];
}
