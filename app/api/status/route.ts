// Kleiner Gesundheitscheck für das Deployment: Sind die Variablen gesetzt,
// antwortet die Datenbankfunktion, ist der Mailversand konfiguriert?
// Gibt keine Werte preis – nur ob etwas da ist und was die Datenbank sagt.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const key = (process.env.SUPABASE_ANON_KEY ?? "").trim();
  let url = (process.env.SUPABASE_URL ?? "").trim().replace(/\/+$/, "");
  if (url && !/^https?:\/\//i.test(url)) url = `https://${url}`;

  let events: string = "nicht geprüft (Variablen fehlen)";
  if (url && key) {
    try {
      const res = await fetch(`${url}/rest/v1/rpc/get_website_events?p_limit=1`, {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        cache: "no-store",
      });
      events = res.ok ? `ok (HTTP ${res.status})` : `HTTP ${res.status}: ${(await res.text()).slice(0, 160)}`;
    } catch (fehler) {
      events = `Abruf fehlgeschlagen: ${(fehler as Error).message}`;
    }
  }

  return Response.json({
    supabaseUrl: url ? "gesetzt" : "FEHLT",
    supabaseAnonKey: key ? `gesetzt (${key.length} Zeichen)` : "FEHLT",
    events,
    smtp: process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS ? "gesetzt" : "FEHLT (Formulare antworten mit 503)",
    appStoreUrl: process.env.NEXT_PUBLIC_APP_STORE_URL?.trim() ? "gesetzt (Launch-Modus)" : "leer (Warteliste-Modus)",
    env: process.env.VERCEL_ENV ?? "lokal",
  });
}
