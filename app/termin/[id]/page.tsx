// Eigene Seite für einen Termin: /termin/<id>. Dieselben Fakten wie im
// Fenster auf der Startseite, aber mit eigener Adresse – zum Teilen (mit
// Vorschau) und damit Suchmaschinen einzelne Termine finden.
//
// Der Termin wird in derselben Liste gesucht, die die Startseite zeigt
// (gecacht, 5 Minuten). Ist er vorbei oder gelöscht, gibt es 404.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "@/app/page.module.css";
import { TerminDetail } from "@/components/home/EventsSection";
import { getWebsiteEvents } from "@/lib/events";
import { IST_GESTARTET, SITE_URL, STADT } from "@/lib/site";
import {
  datumLang,
  istOeffnungszeit,
  kurzOrt,
  ortFuerKarte,
  uhrzeit,
  zeitspanne,
  type WebsiteEvent,
} from "@/lib/event-format";

export const revalidate = 300;

type Props = { params: Promise<{ id: string }> };

async function ladeTermin(id: string): Promise<{ termin: WebsiteEvent; weitere: WebsiteEvent[] } | null> {
  const ergebnis = await getWebsiteEvents();
  if (ergebnis.status !== "ok") return null;
  const termine = ergebnis.events.filter((e) => !istOeffnungszeit(e));
  const termin = termine.find((e) => e.id === id);
  if (!termin) return null;
  const tag = datumLang(termin.startsAt);
  const weitere = termine.filter((e) => e.id !== id && datumLang(e.startsAt) === tag).slice(0, 6);
  return { termin, weitere };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const daten = await ladeTermin(id);
  if (!daten) return { title: "Termin nicht gefunden", robots: { index: false } };
  const e = daten.termin;
  const titel = `${e.title} – ${datumLang(e.startsAt)}`;
  const beschreibung = `${datumLang(e.startsAt)}, ${zeitspanne(e)} · ${kurzOrt(e)}. Gefunden in beActive – was in ${STADT} läuft.`;
  return {
    title: titel,
    description: beschreibung,
    alternates: { canonical: `/termin/${e.id}` },
    openGraph: { title: titel, description: beschreibung, type: "website", locale: "de_DE", siteName: "beActive" },
  };
}

export default async function TerminSeite({ params }: Props) {
  const { id } = await params;
  const daten = await ladeTermin(id);
  if (!daten) notFound();
  const { termin: e, weitere } = daten;

  // Strukturierte Daten: nur Fakten, die auch auf der Seite stehen.
  const veranstalter = e.organizerName || e.hostName;
  const eventDaten = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    startDate: e.startsAt,
    ...(e.endsAt ? { endDate: e.endsAt } : {}),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: kurzOrt(e), address: ortFuerKarte(e) },
    ...(veranstalter ? { organizer: { "@type": "Organization", name: veranstalter, ...(e.hostWebsite ? { url: e.hostWebsite } : {}) } } : {}),
    url: `${SITE_URL}/termin/${e.id}`,
  };

  return (
    <main className={styles["termin-page"]}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventDaten).replace(/</g, "\\u003c") }}
      />
      <div className="wrap">
        <Link href="/#events" className={styles["termin-back"]}>← Alle Termine in {STADT}</Link>
        <article className={styles["termin-card"]}>
          <TerminDetail e={e} jetzt={new Date()} istGestartet={IST_GESTARTET} live alsSeite />
        </article>

        {weitere.length > 0 && (
          <section className={styles["termin-mehr"]} aria-labelledby="termin-mehr">
            <h2 id="termin-mehr">Am selben Tag</h2>
            <ul>
              {weitere.map((w) => (
                <li key={w.id}>
                  <Link href={`/termin/${w.id}`}>
                    <b>{uhrzeit(w.startsAt)}</b>
                    <span>
                      {w.title}
                      <small>{kurzOrt(w)}</small>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
