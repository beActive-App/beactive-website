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
  /** Art des Rabatts aus der App: Preis, Prozent oder Aktion („2 für 1“). */
  discountKind: "price" | "percent" | "deal" | null;
  discountPercent: number | null;
  discountLabel: string;
  /** Von der App aus den Öffnungszeiten erzeugt („X ist geöffnet“) – kein Termin. */
  isAutoPosted: boolean;
  sourceUrl: string;
  organizerName: string;
  infoAsOf: string | null;
  hostName: string;
  hostKind: EventHostKind;
  hostWebsite: string;
  /** Vorverkauf, wenn der Veranstalter einen Link hinterlegt hat. */
  ticketUrl: string;
  /** Vom Veranstalter angegeben; „en“ heißt: Abend auf Englisch. */
  language: "de" | "en" | null;
  /** Haken: die Redaktion hat geprüft, dass der Account echt ist. */
  hostVerified: boolean;
  hostReservationUrl: string;
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

/* ---------- Filtern, Sortieren, Darstellen ---------- */

const TAG_MS = 86_400_000;

/** Läuft gerade: hat begonnen und ist noch nicht vorbei (ohne Ende: 2 Stunden). */
export function laeuftGerade(e: WebsiteEvent, jetzt: Date) {
  const start = new Date(e.startsAt).getTime();
  const ende = e.endsAt ? new Date(e.endsAt).getTime() : start + 2 * 3_600_000;
  return start <= jetzt.getTime() && ende > jetzt.getTime();
}

/** Für Gruppierung und Filter: Was schon läuft, zählt zu „jetzt“. */
function anzeigeStart(e: WebsiteEvent, jetzt: Date) {
  return laeuftGerade(e, jetzt) ? jetzt.toISOString() : e.startsAt;
}

function wochentag(iso: string) {
  const w = new Intl.DateTimeFormat("en-US", { timeZone: ZONE, weekday: "short" }).format(new Date(iso));
  return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(w); // 0 = Montag
}

export type TagFilter = "heute" | "morgen" | "wochenende" | "woche" | "alle";

export const TAG_FILTER: { key: TagFilter; label: string }[] = [
  { key: "heute", label: "Heute" },
  { key: "morgen", label: "Morgen" },
  { key: "wochenende", label: "Wochenende" },
  { key: "woche", label: "7 Tage" },
  { key: "alle", label: "Alle" },
];

export function passtZuTag(e: WebsiteEvent, f: TagFilter, jetzt: Date) {
  const key = tagKey(anzeigeStart(e, jetzt));
  const tag = (n: number) => tagKey(new Date(jetzt.getTime() + n * TAG_MS).toISOString());
  switch (f) {
    case "heute":
      return key === tag(0);
    case "morgen":
      return key === tag(1);
    case "wochenende": {
      // Freitag bis Sonntag; ist schon Wochenende, ab heute bis Sonntag
      const wt = wochentag(jetzt.toISOString());
      const von = wt <= 4 ? 4 - wt : 0;
      const bis = 6 - wt;
      for (let i = von; i <= bis; i++) if (key === tag(i)) return true;
      return false;
    }
    case "woche":
      return new Date(anzeigeStart(e, jetzt)).getTime() < jetzt.getTime() + 7 * TAG_MS;
    default:
      return true;
  }
}

/** Rubriken für die Website. Die App-Kategorien helfen hier kaum – fast alle
 *  Termine der Redaktion sind „Kultur“. Deshalb nach Titel und Veranstalter. */
export type Rubrik = "musik" | "kino" | "buehne" | "party" | "treffen" | "sport" | "ausstellung" | "mehr";

export const RUBRIKEN: { key: Rubrik; label: string }[] = [
  { key: "musik", label: "Musik" },
  { key: "kino", label: "Kino" },
  { key: "buehne", label: "Bühne" },
  { key: "party", label: "Party & Kneipe" },
  { key: "treffen", label: "Leute treffen" },
  { key: "sport", label: "Sport & Bewegung" },
  { key: "ausstellung", label: "Ausstellung & Vortrag" },
  { key: "mehr", label: "Mehr" },
];

const REGELN: [Rubrik, RegExp][] = [
  ["kino", /\b(kino|kinos|film|filme|filmreihe|cine|cineconcert)\b|stummfilm|filmkonzert|filmabend|filmnachmittag|apero film/],
  ["buehne", /\b(theater|ltt|landestheater|zimmertheater|kabarett|comedy|impro|improtheater|poetry|slam|hoersaalslam|horsaalslam|buhne|oper|musical|tanztheater)\b|slam\b/],
  ["party", /\b(party|kneipe|kneipen|quiz|karaoke|beer pong|beerpong|nightlife|club|dj|disco|barhopping|bar|epplehaus|kuckuck)\b/],
  ["treffen", /\b(treff|treffen|spieletreff|brettspieltreff|stammtisch|meet|connecting|singles|kennenlernen|sprachcafe|tandem)\b|treff\b/],
  ["sport", /\b(sport|lauf|bewegt|boule|boulespiel|yoga|dance-out|wandern|wanderung|rad|klettern|bouldern|fitness|naturerlebnis)\b|sportlauf/],
  ["ausstellung", /\b(kunsthalle|ausstellung|museum|sammlung|sammlungszentrums|vortrag|lesung|fuhrung|diskussion|talk|d\.?a\.?i|boxenstop|workshop)\b/],
  ["musik", /\b(konzert|jazz|klassik|orchester|symphonie|band|stage|acoustic|sessions|musik|chor|celli|duo|trio|quartett|sudhaus|bass|reloaded)\b/],
];

function ohneAkzente(t: string) {
  return t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function rubrikVon(e: WebsiteEvent): Rubrik {
  if (e.topic === "sport" || e.topic === "nature") return "sport";
  const titel = ohneAkzente(e.title);
  for (const [r, re] of REGELN) if (re.test(titel)) return r;
  // Kein Treffer im Titel: der Ort entscheidet
  const ort = ohneAkzente(`${e.hostName} ${e.locationTitle}`);
  for (const [r, re] of REGELN) if (re.test(ort)) return r;
  return "mehr";
}

export function rubrikLabel(r: Rubrik) {
  return RUBRIKEN.find((x) => x.key === r)?.label ?? "Mehr";
}

/** Gruppen nach Tag, Laufendes unter „Heute“. */
export function gruppiereFuerAnzeige(events: WebsiteEvent[], jetzt: Date) {
  const sortiert = [...events].sort(
    (a, b) => new Date(anzeigeStart(a, jetzt)).getTime() - new Date(anzeigeStart(b, jetzt)).getTime(),
  );
  const gruppen = new Map<string, { label: string; events: WebsiteEvent[] }>();
  for (const e of sortiert) {
    const iso = anzeigeStart(e, jetzt);
    const key = tagKey(iso);
    if (!gruppen.has(key)) gruppen.set(key, { label: tagLabel(iso, jetzt), events: [] });
    gruppen.get(key)!.events.push(e);
  }
  return [...gruppen.entries()].map(([key, g]) => ({ key, ...g }));
}

const ORT_WEG = /^(\d{5}( .*)?|tubingen|baden-wurttemberg|deutschland|germany)$/;

/** „Kino Museum, Am Stadtgraben 2, 72070 Tübingen, Deutschland“ → „Kino Museum · Am Stadtgraben 2“ */
export function kurzOrt(e: WebsiteEvent) {
  const teile = e.locationTitle.split(",").map((t) => t.trim()).filter(Boolean);
  const rest = teile.filter((t) => !ORT_WEG.test(ohneAkzente(t)));
  return (rest.length ? rest.slice(0, 2) : teile.slice(0, 1)).join(" · ") || e.city;
}

/** Vollständige Adresse für die Karte, ohne Land und Bundesland. */
export function ortFuerKarte(e: WebsiteEvent) {
  const teile = e.locationTitle.split(",").map((t) => t.trim()).filter(Boolean)
    .filter((t) => !/^(baden-wurttemberg|deutschland|germany)$/.test(ohneAkzente(t)));
  const text = teile.join(", ");
  return /tubingen/.test(ohneAkzente(text)) ? text : `${text}, ${e.city}`;
}

export function datumLang(iso: string) {
  return new Intl.DateTimeFormat("de-DE", {
    timeZone: ZONE, weekday: "long", day: "numeric", month: "long",
  }).format(new Date(iso));
}

export function datumKurz(iso: string) {
  return new Intl.DateTimeFormat("de-DE", { timeZone: ZONE, day: "numeric", month: "numeric" }).format(new Date(iso));
}

/** „19:00–21:00 Uhr“, bei mehrtägigen Terminen mit Enddatum. */
export function zeitspanne(e: WebsiteEvent) {
  if (!e.endsAt) return `${uhrzeit(e.startsAt)} Uhr`;
  if (tagKey(e.endsAt) === tagKey(e.startsAt)) return `${uhrzeit(e.startsAt)}–${uhrzeit(e.endsAt)} Uhr`;
  return `${uhrzeit(e.startsAt)} Uhr bis ${datumKurz(e.endsAt)}, ${uhrzeit(e.endsAt)} Uhr`;
}

/** Rabatt so, wie ihn die App zeigt: Preis, Prozent oder Aktion. */
export function rabattText(e: WebsiteEvent): { haupt: string; neben: string } | null {
  if (!e.isDiscounted) return null;
  if (e.discountKind === "deal" && e.discountLabel) return { haupt: e.discountLabel, neben: "Aktion" };
  if (e.discountKind === "percent" && e.discountPercent) return { haupt: `−${e.discountPercent} %`, neben: "Rabatt" };
  if (e.discountedPrice !== null) {
    const pct = rabattProzent(e);
    return {
      haupt: preis(e.discountedPrice),
      neben: [e.originalPrice !== null ? `statt ${preis(e.originalPrice)}` : "", pct ? `−${pct} %` : ""].filter(Boolean).join(" · "),
    };
  }
  return { haupt: "Angebot", neben: "" };
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
    isDiscounted: false, originalPrice: null, discountedPrice: null, discountKind: null, discountPercent: null, discountLabel: "", isAutoPosted: false, sourceUrl: "", organizerName: "",
    infoAsOf: null, hostWebsite: "", topic: null,
    ticketUrl: "", language: null, hostVerified: false, hostReservationUrl: "",
  };
  return [
    { ...leer, id: "b1", title: "Bouldern für Anfänger", category: "business", topic: "sport", startsAt: in_(0, 19), locationTitle: "Boulderhalle, Lustnau", hostName: "Boulderhalle", hostKind: "business", maxParticipants: 8, participantCount: 4 },
    { ...leer, id: "b2", title: "Kaffee & Kuchen ab 15 Uhr", category: "business", topic: "other", startsAt: in_(1, 15), locationTitle: "Café am Marktplatz", hostName: "Café am Marktplatz", hostKind: "business", isDiscounted: true, originalPrice: 9.5, discountedPrice: 7.1, maxParticipants: 20, participantCount: 3 },
    { ...leer, id: "b3", title: "Konzert: Restkarten ab 18 Uhr", category: "business", topic: "culture", startsAt: in_(1, 20), locationTitle: "Sudhaus, Hechinger Straße 203", hostName: "Sudhaus", hostKind: "curated", sourceUrl: "https://www.sudhaus-tuebingen.de/" },
    { ...leer, id: "b4", title: "Schnupperkurs Töpfern", category: "business", topic: "other", startsAt: in_(2, 14), locationTitle: "Atelier, Altstadt", hostName: "Keramikatelier", hostKind: "business", isDiscounted: true, originalPrice: 32, discountedPrice: 19, maxParticipants: 6, participantCount: 2 },
    { ...leer, id: "b5", title: "Spätvorstellung, vergünstigte Tickets", category: "business", topic: "culture", startsAt: in_(3, 22), locationTitle: "Kino, Innenstadt", hostName: "Kino", hostKind: "business", isDiscounted: true, originalPrice: 12, discountedPrice: 8, maxParticipants: 20, participantCount: 0 },
  ];
}
