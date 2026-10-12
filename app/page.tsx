import HomePage from "@/components/home/HomePage";
import { getWebsiteEvents } from "@/lib/events";
import { APP_STORE_URL, IST_GESTARTET } from "@/lib/site";
import { beispielEvents } from "@/lib/event-format";

// Die Startseite wird alle fünf Minuten neu gebaut: Die Event-Liste bleibt
// aktuell, ohne dass jeder Besuch die Datenbank fragt.
export const revalidate = 300;

export default async function Page() {
  const events = await getWebsiteEvents();
  const jetztIso = new Date().toISOString();
  return (
    <HomePage
      events={events}
      beispiele={beispielEvents(jetztIso)}
      jetztIso={jetztIso}
      istGestartet={IST_GESTARTET}
      appStoreUrl={APP_STORE_URL}
    />
  );
}
