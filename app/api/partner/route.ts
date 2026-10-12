import { PARTNER_EMAIL } from "@/lib/site";
import { freitext, leseJson, sauber, versendeOderLogge, zeitstempel } from "@/lib/mail";

// Läuft im Node-Runtime, weil nodemailer eine SMTP-Verbindung aufbaut.
export const runtime = "nodejs";

const EMPFAENGER = process.env.PARTNER_MAIL_TO ?? PARTNER_EMAIL;

type Anfrage = {
  betrieb?: string;
  name?: string;
  kontakt?: string;
  randzeit?: string;
  nachricht?: string;
  // Honeypot: für Menschen unsichtbar, Bots füllen es aus.
  website?: string;
};

export async function POST(request: Request) {
  const daten = await leseJson<Anfrage>(request);
  if (!daten) {
    return Response.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }

  // Bot hat den Honeypot ausgefüllt: so tun, als wäre alles gut, nichts senden.
  if (daten.website) {
    return Response.json({ ok: true });
  }

  const betrieb = sauber(daten.betrieb);
  const name = sauber(daten.name);
  const kontakt = sauber(daten.kontakt);
  const randzeit = sauber(daten.randzeit);
  const nachricht = freitext(daten.nachricht);

  if (!betrieb || !name || !kontakt) {
    return Response.json({ error: "Pflichtfelder fehlen" }, { status: 400 });
  }

  const text = [
    `Betrieb:              ${betrieb}`,
    `Ansprechpartner:in:   ${name}`,
    `Kontakt:              ${kontakt}`,
    `Wenig los:            ${randzeit || "—"}`,
    "",
    "Nachricht:",
    nachricht || "—",
    "",
    `Eingegangen: ${zeitstempel()}`,
  ].join("\n");

  return versendeOderLogge("Partner-Anfrage", {
    an: EMPFAENGER,
    betreff: `Partner-Anfrage: ${betrieb}`,
    text,
    antwortAn: kontakt,
  });
}
