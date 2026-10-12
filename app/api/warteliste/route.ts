import { SUPPORT_EMAIL } from "@/lib/site";
import { istEmail, leseJson, sauber, versendeOderLogge, zeitstempel } from "@/lib/mail";

export const runtime = "nodejs";

// Jede Anmeldung geht als einzelne Mail ins Postfach. Das ist bewusst simpel:
// keine weitere Infrastruktur, nichts geht verloren, die Liste lässt sich
// jederzeit aus dem Postfach exportieren. Wächst die Liste, ist eine Tabelle
// (z. B. in Supabase) der nächste Schritt – nur dieser Endpunkt ändert sich.
const EMPFAENGER = process.env.WARTELISTE_MAIL_TO ?? SUPPORT_EMAIL;

type Anmeldung = {
  email?: string;
  /** Woher die Anmeldung kommt: "startseite" | "warteliste" */
  quelle?: string;
  website?: string; // Honeypot
};

export async function POST(request: Request) {
  const daten = await leseJson<Anmeldung>(request);
  if (!daten) {
    return Response.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }
  if (daten.website) {
    return Response.json({ ok: true });
  }

  const email = sauber(daten.email).toLowerCase();
  const quelle = sauber(daten.quelle) || "unbekannt";

  if (!istEmail(email)) {
    return Response.json({ error: "Ungültige E-Mail-Adresse" }, { status: 400 });
  }

  const text = [
    `E-Mail:   ${email}`,
    `Quelle:   ${quelle}`,
    "",
    "Einwilligung: Information zum App-Start (Art. 6 Abs. 1 lit. a DSGVO),",
    "über das Formular auf der Website erteilt.",
    "",
    `Eingegangen: ${zeitstempel()}`,
  ].join("\n");

  return versendeOderLogge("Warteliste", {
    an: EMPFAENGER,
    betreff: `Warteliste: ${email}`,
    text,
    antwortAn: email,
  });
}
