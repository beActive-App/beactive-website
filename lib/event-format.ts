// Reine Darstellungs-Helfer für Events – ohne Server-Abhängigkeiten, damit
// Client-Komponenten sie importieren können.

export type EventHostKind = "business" | "curated";

export type WebsiteEvent = {
  id: string;
  title: string;
  category: string;
  topic: string | null;
  startsAt: string;
  endsAt: string | null;
  locationTitle: string;
  city: string;
  postalCode: string;
  maxParticipants: number | null;
  participantCount: number;
  isDiscounted: boolean;
  originalPrice: number | null;
  discountedPrice: number | null;
  /** Von der App aus den Öffnungszeiten erzeugt („X ist geöffnet“) – kein Termin. */
  isAutoPosted: boolean;
  sourceUrl: string;
  organizerName: string;
  infoAsOf: string | null;
  hostName: string;
  hostKind: EventHostKind;
  hostWebsite: string;
};

export type EventsResult = {
  status: "ok" | "unavailable";
  events: WebsiteEvent[];
};

const ZONE = "Europe/Berlin";

export const KATEGORIEN: Record<string, { label: string; ton: string }> = {
  sport: { label: "Sport", ton: "sport" },
  culture: { label: "Kultur", ton: "kultur" },
  nature: { label: "Natur", ton: "natur" },
  productivity: { label: "Produktiv", ton: "produktiv" },
  other: { label: "Sonstiges", ton: "sonstiges" },
  business: { label: "Unternehmen", ton: "unternehmen" },
};

/** Betriebe wählen ein Thema; fehlt es, bleibt die Kategorie. */
export function kategorieVon(e: WebsiteEvent) {
  return KATEGORIEN[e.topic ?? e.category] ?? KATEGORIEN.other;
}

function tagKey(iso: string) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso)); // YYYY-MM-DD
}

export function uhrzeit(iso: string) {
  return new Intl.DateTimeFormat("de-DE", {
    timeZone: ZONE,
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function tagLabel(iso: string, jetzt = new Date()) {
  const key = tagKey(iso);
  const heute = tagKey(jetzt.toISOString());
  const morgen = tagKey(new Date(jetzt.getTime() + 86_400_000).toISOString());
  if (key === heute) return "Heute";
  if (key === morgen) return "Morgen";
  return new Intl.DateTimeFormat("de-DE", {
    timeZone: ZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(iso));
}

export function gruppiereNachTag(events: WebsiteEvent[], jetzt = new Date()) {
  const gruppen = new Map<string, { label: string; events: WebsiteEvent[] }>();
  for (const e of events) {
    const key = tagKey(e.startsAt);
    if (!gruppen.has(key)) gruppen.set(key, { label: tagLabel(e.startsAt, jetzt), events: [] });
    gruppen.get(key)!.events.push(e);
  }
  return [...gruppen.entries()].map(([key, g]) => ({ key, ...g }));
}

export function preis(n: number | null) {
  if (n === null || Number.isNaN(n)) return "";
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n);
}

export function rabattProzent(e: WebsiteEvent) {
  if (!e.isDiscounted || !e.originalPrice || e.discountedPrice === null) return null;
  const p = Math.round((1 - e.discountedPrice / e.originalPrice) * 100);
  return p > 0 ? p : null;
}

/** Events innerhalb der nächsten `tage` Tage ab `jetzt`. */
export function innerhalb(events: WebsiteEvent[], tage: number, jetzt: Date) {
  const bis = jetzt.getTime() + tage * 86_400_000;
  return events.filter((e) => new Date(e.startsAt).getTime() < bis);
}

/** Öffnungszeiten-Eintrag statt Termin. Die App setzt dafür is_auto_posted;
 *  von der Redaktion importierte Einträge tragen die Information nur im Titel
 *  („B12 ist geöffnet“, „Escape Rooms geöffnet“) – deshalb beides. */
export function istOeffnungszeit(e: WebsiteEvent) {
  return e.isAutoPosted || /\bge(ö|oe)ffnet\b/i.test(e.title);
}

export function istHeute(iso: string, jetzt: Date) {
  return tagKey(iso) === tagKey(jetzt.toISOString());
}

export function plaetzeText(e: WebsiteEvent) {
  if (e.hostKind === "curated") return "";
  if (!e.maxParticipants || e.maxParticipants <= 0) return `${e.participantCount} dabei`;
  const frei = Math.max(0, e.maxParticipants - e.participantCount);
  return frei === 0 ? "ausgebucht" : `noch ${frei} ${frei === 1 ? "Platz" : "Plätze"}`;
}

/** Fällt die Anbindung aus, zeigt die Seite diese Beispiele – deutlich markiert.
 *  `jetzt` kommt vom Server (page.tsx), damit Server-HTML und Client dieselben
 *  Zeiten berechnen und React beim Hydrieren nichts zu beanstanden hat. */
export function beispielEvents(jetztIso: string): WebsiteEvent[] {
  const basis = new Date(jetztIso);
  basis.setMinutes(0, 0, 0);
  const in_ = (tage: number, stunde: number) => {
    const d = new Date(basis);
    d.setDate(d.getDate() + tage);
    d.setHours(stunde, tage === 0 ? 30 : 0, 0, 0);
    return d.toISOString();
  };
  const leer = {
    endsAt: null, city: "Tübingen", postalCode: "72070", participantCount: 0, maxParticipants: null,
    isDiscounted: false, originalPrice: null, discountedPrice: null, isAutoPosted: false, sourceUrl: "", organizerName: "",
    infoAsOf: null, hostWebsite: "", topic: null,
  };
  return [
    { ...leer, id: "b1", title: "Bouldern für Anfänger", category: "business", topic: "sport", startsAt: in_(0, 19), locationTitle: "Boulderhalle, Lustnau", hostName: "Boulderhalle", hostKind: "business", maxParticipants: 8, participantCount: 4 },
    { ...leer, id: "b2", title: "Kaffee & Kuchen ab 15 Uhr", category: "business", topic: "other", startsAt: in_(1, 15), locationTitle: "Café am Marktplatz", hostName: "Café am Marktplatz", hostKind: "business", isDiscounted: true, originalPrice: 9.5, discountedPrice: 7.1, maxParticipants: 20, participantCount: 3 },
    { ...leer, id: "b3", title: "Konzert: Restkarten ab 18 Uhr", category: "business", topic: "culture", startsAt: in_(1, 20), locationTitle: "Sudhaus, Hechinger Straße 203", hostName: "Sudhaus", hostKind: "curated", sourceUrl: "https://www.sudhaus-tuebingen.de/" },
    { ...leer, id: "b4", title: "Schnupperkurs Töpfern", category: "business", topic: "other", startsAt: in_(2, 14), locationTitle: "Atelier, Altstadt", hostName: "Keramikatelier", hostKind: "business", isDiscounted: true, originalPrice: 32, discountedPrice: 19, maxParticipants: 6, participantCount: 2 },
    { ...leer, id: "b5", title: "Spätvorstellung, vergünstigte Tickets", category: "business", topic: "culture", startsAt: in_(3, 22), locationTitle: "Kino, Innenstadt", hostName: "Kino", hostKind: "business", isDiscounted: true, originalPrice: 12, discountedPrice: 8, maxParticipants: 20, participantCount: 0 },
  ];
}
