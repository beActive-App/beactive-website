// Zentrale Fakten der Website. Alles, was an mehreren Stellen vorkommt,
// steht hier einmal.

export const SITE_URL = "https://www.beactiveapp.de";
export const SITE_NAME = "beActive";
export const STADT = "Tübingen";

export const SUPPORT_EMAIL = "support@beactiveapp.de";
export const PARTNER_EMAIL = "partner@beactiveapp.de";
export const INSTAGRAM_URL = "https://www.instagram.com/beactive_app/";

/**
 * Store-Links. Die App ist seit dem 27.10.2026 im App Store (ID 6766277302);
 * der Link steht deshalb fest im Code. Mit NEXT_PUBLIC_APP_STORE_URL bei
 * Vercel lässt er sich ohne Code-Änderung überschreiben.
 *
 * Für Android: NEXT_PUBLIC_PLAY_STORE_URL setzen (oder hier eintragen),
 * dann erscheint zusätzlich das Google-Play-Badge.
 */
export const APP_STORE_ID = "6766277302";
export const APP_STORE_URL =
  process.env.NEXT_PUBLIC_APP_STORE_URL?.trim() || `https://apps.apple.com/de/app/beactive-app/id${APP_STORE_ID}`;
export const PLAY_STORE_URL = process.env.NEXT_PUBLIC_PLAY_STORE_URL?.trim() ?? "";
export const IST_GESTARTET = APP_STORE_URL.length > 0;

/**
 * Vorschau ohne Deploy: Mit `?vorschau=app` hinter der Adresse zeigt die
 * Seite im Browser die Version nach dem Start (Store-Links führen dann
 * noch ins Leere), mit `?vorschau=warteliste` die Version davor.
 * Wird nur im Browser ausgewertet – Suchmaschinen und der Cache sehen
 * immer die echte Version.
 */
export const VORSCHAU_PARAM = "vorschau";
