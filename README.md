# beActive – Website

Next.js 16 (App Router, Tailwind v4), gehostet bei Vercel unter www.beactiveapp.de.

## Entwickeln

```bash
npm install
npm run dev
```

Dann http://localhost:3000 öffnen. Env-Variablen stehen in `.env.example` beschrieben; echte Werte gehören in `.env.local` (nicht eingecheckt).

## Launch-Schalter

Die Website hat zwei Zustände, gesteuert über Vercel-Env-Variablen (Project Variables, Production-Haken, danach Redeploy):

| Variable | leer | gesetzt |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_STORE_URL` | Warteliste, „Beim Start Bescheid bekommen“ | App-Store-Badges in Hero, Navigation, Footer und Abschluss, QR-Code auf dem Desktop, feste Store-Leiste am Handy, „In der App öffnen“ in jedem Termin, FAQ-Texte für „ist verfügbar“ |
| `NEXT_PUBLIC_PLAY_STORE_URL` | „Bald bei Google Play“ (ausgegraut) | Google-Play-Badge klickbar |

Vorschau ohne Deploy: `?vorschau=app` an die Adresse hängen zeigt die Version nach dem Start, `?vorschau=warteliste` die davor. Das wird nur im Browser ausgewertet, Suchmaschinen und der Cache sehen immer die echte Version.

## Aufbau

- `app/layout.tsx` – Schriften, Metadaten, gemeinsamer Header und Footer
- `app/globals.css` – Design-Tokens (Farben, Schriften) und gemeinsame Klassen (`btn`, `eyebrow`, `card`, `field`, …)
- `components/site/` – Header, Footer, Store-Badges, Seitenkopf, Launch-Kontext
- `components/home/` – Startseite mit Live-Terminen (`EventsSection`)
- `lib/events.ts` – Termine aus Supabase (`get_website_events`), `lib/event-format.ts` – Darstellung und Rubriken
- `lib/site.ts` – zentrale Fakten (Adressen, Launch-Schalter)
- `app/api/` – Formular-Mailversand und Kalender-Download
