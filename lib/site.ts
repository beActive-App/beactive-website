// Zentrale Fakten der Website. Alles, was an mehreren Stellen vorkommt,
// steht hier einmal.

export const SITE_URL = "https://www.beactiveapp.de";
export const SITE_NAME = "beActive";
export const STADT = "Tübingen";

export const SUPPORT_EMAIL = "support@beactiveapp.de";
export const PARTNER_EMAIL = "partner@beactiveapp.de";
export const INSTAGRAM_URL = "https://www.instagram.com/beactive_app/";

/**
 * Launch-Schalter. Sobald die App im App Store ist, bei Vercel
 * NEXT_PUBLIC_APP_STORE_URL auf den Store-Link setzen und neu deployen –
 * die ganze Website wechselt dann von „Warteliste“ auf „Jetzt laden“:
 * Store-Badges im Hero, in der Navigation und im Footer, QR-Code auf dem
 * Desktop, „In der App öffnen“ in jedem Termin, angepasste FAQ-Texte.
 * Kein Code-Change nötig.
 *
 * Später genauso für Android: NEXT_PUBLIC_PLAY_STORE_URL setzen, dann
 * erscheint zusätzlich das Google-Play-Badge.
 */
export const APP_STORE_URL = process.env.NEXT_PUBLIC_APP_STORE_URL?.trim() ?? "";
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
