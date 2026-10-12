// Zentrale Fakten der Website. Alles, was an mehreren Stellen vorkommt,
// steht hier einmal.

export const SITE_URL = "https://www.beactiveapp.de";
export const SITE_NAME = "BeActive";
export const STADT = "Tübingen";

export const SUPPORT_EMAIL = "support@beactiveapp.de";
export const PARTNER_EMAIL = "partner@beactiveapp.de";
export const INSTAGRAM_URL = "https://www.instagram.com/beactive_app/";

/**
 * Launch-Schalter. Sobald die App im App Store ist, bei Vercel
 * NEXT_PUBLIC_APP_STORE_URL auf den Store-Link setzen und neu deployen –
 * die Startseite wechselt dann von „Warteliste“ auf „Jetzt laden“.
 * Kein Code-Change nötig.
 */
export const APP_STORE_URL = process.env.NEXT_PUBLIC_APP_STORE_URL?.trim() ?? "";
export const IST_GESTARTET = APP_STORE_URL.length > 0;
