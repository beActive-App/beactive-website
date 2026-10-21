// Lädt die bevorstehenden Events von Betrieben und Redaktionsaccounts für die
// Startseite. Läuft nur auf dem Server (page.tsx), nie im Browser.
//
// Quelle ist die Datenbankfunktion get_website_events (Migration
// 20261012120000_website_events_rpc.sql im iOS-Repo). Sie gibt bewusst nur
// Fakten zurück – Titel, Zeit, Ort, Veranstalter, Preis, Link – und keine
// Beschreibungstexte, Bilder oder Daten privater Nutzer.

import { STADT } from "@/lib/site";
import type { EventsResult, WebsiteEvent } from "@/lib/event-format";

type Zeile = {
  id: string;
  title: string;
  category: string;
  topic: string | null;
  starts_at: string;
  ends_at: string | null;
  location_title: string;
  city: string;
  postal_code: string;
  max_participants: number | null;
  participant_count: number | string;
  is_discounted: boolean;
  original_price: number | string | null;
  discounted_price: number | string | null;
  discount_kind?: "price" | "percent" | "deal" | null;
  discount_percent?: number | string | null;
  discount_label?: string | null;
  is_auto_posted?: boolean;
  source_url: string;
  organizer_name: string;
  info_as_of: string | null;
  host_name: string;
  host_kind: "business" | "curated";
  host_website: string;
};

const zahl = (v: number | string | null) =>
  v === null || v === undefined || v === "" ? null : Number(v);

function normalisiere(z: Zeile): WebsiteEvent {
  return {
    id: z.id,
    title: z.title,
    category: z.category,
    topic: z.topic,
    startsAt: z.starts_at,
    endsAt: z.ends_at,
    locationTitle: z.location_title ?? "",
    city: z.city,
    postalCode: z.postal_code,
    maxParticipants: zahl(z.max_participants),
    participantCount: Number(z.participant_count ?? 0),
    isDiscounted: Boolean(z.is_discounted),
    originalPrice: zahl(z.original_price),
    discountedPrice: zahl(z.discounted_price),
    discountKind: z.discount_kind ?? null,
    discountPercent: zahl(z.discount_percent ?? null),
    discountLabel: z.discount_label ?? "",
    isAutoPosted: Boolean(z.is_auto_posted),
    sourceUrl: z.source_url ?? "",
    organizerName: z.organizer_name ?? "",
    infoAsOf: z.info_as_of,
    hostName: z.host_name ?? "",
    hostKind: z.host_kind === "curated" ? "curated" : "business",
    hostWebsite: z.host_website ?? "",
  };
}

export async function getWebsiteEvents(): Promise<EventsResult> {
  // Tolerant gegen die üblichen Tippfehler beim Eintragen bei Vercel:
  // Leerzeichen oder Zeilenumbruch am Ende, URL ohne Schema.
  const key = (process.env.SUPABASE_ANON_KEY ?? "").trim();
  let url = (process.env.SUPABASE_URL ?? "").trim().replace(/\/+$/, "");
  if (url && !/^https?:\/\//i.test(url)) url = `https://${url}`;
  if (!url || !key) {
    console.warn("[Website-Events] SUPABASE_URL oder SUPABASE_ANON_KEY fehlt – zeige Beispiele.");
    return { status: "unavailable", events: [] };
  }

  const endpunkt = new URL(`${url}/rest/v1/rpc/get_website_events`);
  endpunkt.searchParams.set("p_city", STADT);
  // Höchstwert der Funktion. Bei 80 schnitten Öffnungszeiten-Einträge die
  // Liste ab, und die Seite zeigte 68 statt 155 Termine.
  endpunkt.searchParams.set("p_limit", "200");

  try {
    const res = await fetch(endpunkt, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      // Die Seite wird alle fünf Minuten neu gebaut – reicht für Termine,
      // schont die Datenbank.
      next: { revalidate: 300 },
    });
    if (res.status === 404) {
      // Erwarteter Zustand, solange die Migration mit get_website_events
      // noch nicht eingespielt ist – die Seite zeigt dann Beispiele.
      console.warn("[Website-Events] get_website_events fehlt noch in der Datenbank (supabase db push).");
      return { status: "unavailable", events: [] };
    }
    if (!res.ok) {
      console.error("[Website-Events] Antwort", res.status, await res.text().catch(() => ""));
      return { status: "unavailable", events: [] };
    }
    const zeilen = (await res.json()) as Zeile[];
    return { status: "ok", events: zeilen.map(normalisiere) };
  } catch (fehler) {
    console.error("[Website-Events] Abruf fehlgeschlagen", fehler);
    return { status: "unavailable", events: [] };
  }
}
