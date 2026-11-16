# beActive – Website

Next.js 16 (App Router, Tailwind v4), gehostet bei Vercel unter www.beactiveapp.de.

## Entwickeln

```bash
npm install
npm run dev
```

Dann http://localhost:3000 öffnen. Env-Variablen stehen in `.env.example` beschrieben; echte Werte gehören in `.env.local` (nicht eingecheckt).

## Store-Links

Die App ist bei Apple eingereicht, in der EU aber noch nicht abrufbar. Solange `IM_APP_STORE` in `lib/site.ts` auf `false` steht, zeigt die Website die Version vor dem Start (Warteliste). Auf `true` gestellt zeigt sie die Launch-Version: Store-Badges in Hero, Navigation, Footer und Abschluss, QR-Code auf dem Desktop, feste Store-Leiste am Handy, „In der App öffnen“ in jedem Termin, FAQ-Texte für „ist verfügbar“.

| Variable | Wirkung |
| --- | --- |
| `NEXT_PUBLIC_APP_STORE_URL` | überschreibt den Link aus dem Code (Vercel: Project Variable, Production-Haken, danach Redeploy) |
| `NEXT_PUBLIC_PLAY_STORE_URL` | leer: „Bald bei Google Play“ (ausgegraut); gesetzt: Google-Play-Badge klickbar |

Vorschau der alten Version vor dem Start: `?vorschau=warteliste` an die Adresse hängen. Das wird nur im Browser ausgewertet.

## Aufbau

- `app/layout.tsx` – Schriften, Metadaten, gemeinsamer Header und Footer
- `app/globals.css` – Design-Tokens (Farben, Schriften) und gemeinsame Klassen (`btn`, `eyebrow`, `card`, `field`, …)
- `components/site/` – Header, Footer, Store-Badges, Seitenkopf, Launch-Kontext
- `components/home/` – Startseite mit Live-Terminen (`EventsSection`)
- `lib/events.ts` – Termine aus Supabase (`get_website_events`), `lib/event-format.ts` – Darstellung und Rubriken
- `lib/site.ts` – zentrale Fakten (Adressen, Launch-Schalter)
- `app/api/` – Formular-Mailversand und Kalender-Download
