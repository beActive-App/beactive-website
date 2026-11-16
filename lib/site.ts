// Zentrale Fakten der Website. Alles, was an mehreren Stellen vorkommt,
// steht hier einmal.

export const SITE_URL = "https://www.beactiveapp.de";
export const SITE_NAME = "BeActive";
export const STADT = "Tübingen";
/** Orte in der Nähe, deren Termine die Startseite mit anzeigt – jeweils mit
 *  dem Ortsnamen markiert. Die App zeigt sie nur mit Umkreis-Filter. */
export const UMGEBUNG = ["Reutlingen"];

export const SUPPORT_EMAIL = "support@beactiveapp.de";
export const PARTNER_EMAIL = "partner@beactiveapp.de";
export const INSTAGRAM_URL = "https://www.instagram.com/beactive_app/";

/**
 * Store-Links. Die App ist bei Apple eingereicht (ID 6766277302), in der EU
 * aber noch nicht abrufbar. Solange IM_APP_STORE auf false steht, zeigt die
 * Website die Version vor dem Start (Warteliste statt Store-Links).
 * Sobald der Store-Eintrag öffentlich erreichbar ist: auf true stellen.
 * Mit NEXT_PUBLIC_APP_STORE_URL bei Vercel lässt sich der Link überschreiben.
 *
 * Für Android: NEXT_PUBLIC_PLAY_STORE_URL setzen (oder hier eintragen),
 * dann erscheint zusätzlich das Google-Play-Badge.
 */
export const APP_STORE_ID = "6766277302";
export const IM_APP_STORE = false;
export const APP_STORE_URL = IM_APP_STORE
  ? process.env.NEXT_PUBLIC_APP_STORE_URL?.trim() || `https://apps.apple.com/de/app/beactive-app/id${APP_STORE_ID}`
  : "";
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
