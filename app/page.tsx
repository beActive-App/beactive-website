import HomePage from "@/components/home/HomePage";
import { getWebsiteEvents } from "@/lib/events";
import { APP_STORE_URL, IST_GESTARTET, PLAY_STORE_URL, SITE_URL, STADT } from "@/lib/site";
import { beispielEvents } from "@/lib/event-format";
import { qrSvg } from "@/lib/qr";

// Die Startseite wird alle fünf Minuten neu gebaut: Die Event-Liste bleibt
// aktuell, ohne dass jeder Besuch die Datenbank fragt.
export const revalidate = 300;

export default async function Page() {
  const [events, qr] = await Promise.all([
    getWebsiteEvents(),
    IST_GESTARTET ? qrSvg(APP_STORE_URL) : Promise.resolve(""),
  ]);
  const jetztIso = new Date().toISOString();

  // Strukturierte Daten für Suchmaschinen – erst, wenn die App zu haben ist.
  const appDaten = IST_GESTARTET
    ? {
        "@context": "https://schema.org",
        "@type": "MobileApplication",
        name: "beActive",
        operatingSystem: PLAY_STORE_URL ? "iOS, Android" : "iOS",
        applicationCategory: "LifestyleApplication",
        url: SITE_URL,
        installUrl: APP_STORE_URL,
        description: `Events, Kurse und Last-Minute-Angebote von Läden aus ${STADT} – in einer App.`,
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      }
    : null;

  return (
    <>
      {appDaten && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(appDaten).replace(/</g, "\\u003c") }}
        />
      )}
      <HomePage events={events} beispiele={beispielEvents(jetztIso)} jetztIso={jetztIso} qrSvg={qr} />
    </>
  );
}
