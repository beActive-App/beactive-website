import nodemailer from "nodemailer";

// Läuft im Node-Runtime, weil nodemailer eine SMTP-Verbindung aufbaut.
export const runtime = "nodejs";

const EMPFAENGER = process.env.PARTNER_MAIL_TO ?? "partner@beactiveapp.de";
const MAX = 2000;

type Anfrage = {
  betrieb?: string;
  name?: string;
  kontakt?: string;
  randzeit?: string;
  nachricht?: string;
  // Honeypot: für Menschen unsichtbar, Bots füllen es aus.
  website?: string;
};

function smtpKonfiguriert() {
  return Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
  );
}

function transporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT ?? 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/** Verhindert, dass eingeschleuste Zeilenumbrüche den Mail-Header manipulieren. */
function sauber(wert: string) {
  return wert.replace(/[\r\n]+/g, " ").slice(0, MAX).trim();
}

export async function POST(request: Request) {
  let daten: Anfrage;

  try {
    daten = await request.json();
  } catch {
    return Response.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }

  // Bot hat den Honeypot ausgefüllt: so tun, als wäre alles gut, nichts senden.
  if (daten.website) {
    return Response.json({ ok: true });
  }

  const betrieb = sauber(daten.betrieb ?? "");
  const name = sauber(daten.name ?? "");
  const kontakt = sauber(daten.kontakt ?? "");
  const randzeit = sauber(daten.randzeit ?? "");
  const nachricht = (daten.nachricht ?? "").slice(0, MAX).trim();

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
    `Eingegangen: ${new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" })}`,
  ].join("\n");

  // Ohne SMTP-Zugangsdaten wird nichts verschickt. Dann lieber ehrlich
  // scheitern, als der Person „Angekommen" zu zeigen und die Anfrage zu
  // verlieren – das Formular verweist im Fehlerfall auf die E-Mail-Adresse.
  if (!smtpKonfiguriert()) {
    console.error(
      "[Partner-Anfrage NICHT VERSENDET – SMTP nicht konfiguriert]\n" + text,
    );
    return Response.json({ error: "Versand nicht möglich" }, { status: 503 });
  }

  try {
    await transporter().sendMail({
      from: `"BeActive Website" <${process.env.SMTP_FROM ?? process.env.SMTP_USER}>`,
      to: EMPFAENGER,
      subject: `Partner-Anfrage: ${betrieb}`,
      replyTo: kontakt.includes("@") ? kontakt : undefined,
      text,
    });
  } catch (fehler) {
    console.error("[Partner-Anfrage: Versand fehlgeschlagen]", fehler, "\n" + text);
    return Response.json({ error: "Versand fehlgeschlagen" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
