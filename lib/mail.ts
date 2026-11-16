import nodemailer from "nodemailer";

/**
 * Ein Versandweg für alle Formulare (Partner, Kontakt, Warteliste).
 * Braucht SMTP_HOST, SMTP_USER, SMTP_PASS (optional SMTP_PORT, SMTP_FROM)
 * – siehe .env.example. Ohne diese Variablen wird nichts verschickt.
 */

const MAX = 2000;

export function smtpKonfiguriert() {
  return Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
  );
}

/** Entfernt Zeilenumbrüche, damit niemand über ein Feld Mail-Header einschleust. */
export function sauber(wert: unknown) {
  return String(wert ?? "").replace(/[\r\n]+/g, " ").slice(0, MAX).trim();
}

/** Für Freitext: Zeilenumbrüche bleiben, nur die Länge wird begrenzt. */
export function freitext(wert: unknown) {
  return String(wert ?? "").slice(0, MAX).trim();
}

export function istEmail(wert: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(wert);
}

export function zeitstempel() {
  return new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" });
}

function transporter() {
  const port = Number(process.env.SMTP_PORT ?? 587);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

type Mail = {
  an: string;
  betreff: string;
  text: string;
  /** Antwort-Adresse, wenn der Absender eine E-Mail angegeben hat. */
  antwortAn?: string;
};

export async function sendeMail({ an, betreff, text, antwortAn }: Mail) {
  await transporter().sendMail({
    from: `"BeActive Website" <${process.env.SMTP_FROM ?? process.env.SMTP_USER}>`,
    to: an,
    subject: betreff,
    replyTo: antwortAn && istEmail(antwortAn) ? antwortAn : undefined,
    text,
  });
}

/**
 * Gemeinsamer Ablauf: ohne SMTP ehrlich 503 (die Anfrage landet im Log),
 * bei Versandfehler 502. Das Formular zeigt dann keine falsche Erfolgsmeldung.
 */
export async function versendeOderLogge(kennung: string, mail: Mail) {
  if (!smtpKonfiguriert()) {
    console.error(`[${kennung} NICHT VERSENDET – SMTP nicht konfiguriert]\n${mail.text}`);
    return Response.json({ error: "Versand nicht möglich" }, { status: 503 });
  }
  try {
    await sendeMail(mail);
  } catch (fehler) {
    console.error(`[${kennung}: Versand fehlgeschlagen]`, fehler, `\n${mail.text}`);
    return Response.json({ error: "Versand fehlgeschlagen" }, { status: 502 });
  }
  return Response.json({ ok: true });
}

export async function leseJson<T>(request: Request): Promise<T | null> {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
}
