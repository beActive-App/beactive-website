// Kalender-Eintrag (.ics) für einen Termin von der Startseite.
// Sucht den Termin in derselben Liste, die die Startseite zeigt (gecacht,
// 5 Minuten) – so lassen sich keine beliebigen Einträge unter unserer Domain
// erzeugen, und es werden keine Daten gespeichert.

import { getWebsiteEvents } from "@/lib/events";
import { istOeffnungszeit, ortFuerKarte } from "@/lib/event-format";
import type { WebsiteEvent } from "@/lib/event-format";

export const runtime = "nodejs";

const SEITE = "https://www.beactiveapp.de";

/** Text für ICS: Backslash, Semikolon, Komma und Zeilenumbruch maskieren. */
function text(t: string) {
  return t.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
}

/** UTC im ICS-Format: 20261023T100000Z */
function utc(d: Date) {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/** Zeilen nach RFC 5545 bei 75 Byte umbrechen, ohne UTF-8-Zeichen zu zerteilen. */
function falten(zeile: string) {
  const teile: string[] = [];
  let aktuell = "";
  let bytes = 0;
  for (const z of zeile) {
    const n = Buffer.byteLength(z);
    const grenze = teile.length === 0 ? 75 : 74; // Folgezeilen beginnen mit Leerzeichen
    if (bytes + n > grenze) {
      teile.push(aktuell);
      aktuell = "";
      bytes = 0;
    }
    aktuell += z;
    bytes += n;
  }
  teile.push(aktuell);
  return teile.join("\r\n ");
}

function ics(e: WebsiteEvent) {
  const start = new Date(e.startsAt);
  const ende = e.endsAt ? new Date(e.endsAt) : new Date(start.getTime() + 2 * 3_600_000);
  const link = `${SEITE}/#termin-${e.id}`;
  const veranstalter = e.sourceUrl || e.hostWebsite;
  const beschreibung =
    e.hostKind === "curated"
      ? `Aus dem öffentlichen Programm von ${e.hostName}, zusammengetragen von beActive. Bitte vorher beim Veranstalter prüfen, ob sich etwas geändert hat.` +
        (veranstalter ? `\nInfos & Tickets: ${veranstalter}` : "") +
        `\n\n${link}`
      : `Ein Angebot von ${e.hostName} in beActive.\n\n${link}`;

  const zeilen = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//beActive//Website//DE",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${e.id}@beactiveapp.de`,
    `DTSTAMP:${utc(new Date())}`,
    `DTSTART:${utc(start)}`,
    `DTEND:${utc(ende)}`,
    `SUMMARY:${text(e.title)}`,
    `LOCATION:${text(ortFuerKarte(e))}`,
    `DESCRIPTION:${text(beschreibung)}`,
    `URL:${link}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return zeilen.map(falten).join("\r\n") + "\r\n";
}

function dateiname(titel: string) {
  const basis = titel
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
  return `${basis || "termin"}.ics`;
}

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const res = await getWebsiteEvents();
  const e = res.status === "ok" ? res.events.find((x) => x.id === id && !istOeffnungszeit(x)) : undefined;
  if (!e) {
    return new Response("Diesen Termin gibt es nicht mehr. Alle aktuellen Termine: https://www.beactiveapp.de/#events", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
  return new Response(ics(e), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${dateiname(e.title)}"`,
      "Cache-Control": "public, max-age=300",
    },
  });
}
