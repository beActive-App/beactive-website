import { SUPPORT_EMAIL } from "@/lib/site";
import { freitext, istEmail, leseJson, sauber, versendeOderLogge, zeitstempel } from "@/lib/mail";

export const runtime = "nodejs";

const EMPFAENGER = process.env.KONTAKT_MAIL_TO ?? SUPPORT_EMAIL;

type Anfrage = {
  vorname?: string;
  nachname?: string;
  email?: string;
  telefon?: string;
  nachricht?: string;
  website?: string; // Honeypot
};

export async function POST(request: Request) {
  const daten = await leseJson<Anfrage>(request);
  if (!daten) {
    return Response.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }
  if (daten.website) {
    return Response.json({ ok: true });
  }

  const vorname = sauber(daten.vorname);
  const nachname = sauber(daten.nachname);
  const email = sauber(daten.email);
  const telefon = sauber(daten.telefon);
  const nachricht = freitext(daten.nachricht);

  if (!vorname || !nachname || !istEmail(email) || !nachricht) {
    return Response.json({ error: "Pflichtfelder fehlen" }, { status: 400 });
  }

  const text = [
    `Name:      ${vorname} ${nachname}`,
    `E-Mail:    ${email}`,
    `Telefon:   ${telefon || "—"}`,
    "",
    "Nachricht:",
    nachricht,
    "",
    `Eingegangen: ${zeitstempel()}`,
  ].join("\n");

  return versendeOderLogge("Kontaktanfrage", {
    an: EMPFAENGER,
    betreff: `Kontakt über die Website: ${vorname} ${nachname}`,
    text,
    antwortAn: email,
  });
}
