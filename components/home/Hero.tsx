'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from '@/app/page.module.css'
import { STADT } from '@/lib/site'
import {
  datumLang,
  innerhalb,
  rubrikLabel,
  rubrikVon,
  type WebsiteEvent,
} from '@/lib/event-format'
import { StoreBadges } from '@/components/site/StoreBadges'

export type HeroDaten = {
  istGestartet: boolean
  appStoreUrl: string
  playStoreUrl: string
  anzahlLive: number
  anzahlDeals: number
}

/** Die häufigsten Rubriken der nächsten sieben Tage, mit Anzahl. */
function rubrikenDerWoche(termine: WebsiteEvent[], jetzt: Date, n: number) {
  const zahl = new Map<string, number>()
  for (const e of innerhalb(termine, 7, jetzt)) {
    const label = rubrikLabel(rubrikVon(e))
    zahl.set(label, (zahl.get(label) ?? 0) + 1)
  }
  return [...zahl.entries()].sort((a, b) => b[1] - a[1]).slice(0, n)
}

/* ---------- Hero: Aussage in der Mitte, darunter das Handy zwischen
   den Rubriken und der Zahl der Woche ---------- */

export function Hero({
  daten,
  termine,
  jetzt,
  live,
}: {
  daten: HeroDaten
  termine: WebsiteEvent[]
  jetzt: Date
  /** Echte Termine aus der App (sonst Beispiele – dann ohne Zahlen). */
  live: boolean
}) {
  const { istGestartet, appStoreUrl, playStoreUrl, anzahlLive, anzahlDeals } = daten
  const rubriken = live ? rubrikenDerWoche(termine, jetzt, 4) : []

  return (
    <div className="wrap">
      <div className={styles['hero-copy']}>
        <span className={styles['hero-date']}>
          {STADT} · {datumLang(jetzt.toISOString())}
        </span>
        <h1>Was heute noch geht.</h1>
        <p className={styles.lede}>
          Konzerte, Kino, Sport, Spontanes und Last-Minute-Angebote von Läden aus der Stadt – in einer Liste.
          Kostenlos, ohne Abo, ohne Werbebanner.
        </p>

        {istGestartet ? (
          <>
            <div className={styles['hero-actions']}>
              <StoreBadges appStoreUrl={appStoreUrl} playStoreUrl={playStoreUrl} />
              <a href="#events" className="btn-ghost">Termine ansehen</a>
            </div>
            <p className={styles['hero-note']}>
              {playStoreUrl ? 'Für iPhone und Android.' : <>Für iPhone. <a href="#android">Android folgt – Bescheid bekommen</a>.</>}
              {' '}
              <Link href="/partner">Du hast einen Betrieb?</Link>
            </p>
          </>
        ) : (
          <div className={styles['hero-actions']}>
            <a href="#kontakt" className="btn">Beim Start Bescheid bekommen</a>
            <Link href="/partner" className="btn-ghost">Ich habe einen Betrieb</Link>
          </div>
        )}
      </div>

      <div className={styles['hero-stage']}>
        <section className={styles['hero-fact']} aria-labelledby="hero-naechste">
          <h2 id="hero-naechste">Was läuft</h2>
          {rubriken.length > 0 ? (
            <ul className={styles['hero-rubriken']}>
              {rubriken.map(([label, anzahl]) => (
                <li key={label}>
                  <span>{label}</span>
                  <b>{anzahl}</b>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles['hero-zahl-text']}>
              <b>Musik, Kino, Bühne, Sport</b> – und was Leute aus der Stadt selbst starten.
            </p>
          )}
          <a href="#events" className={styles['hero-fact-link']}>Nach Rubrik filtern ↓</a>
        </section>

        <div className={styles['hero-phone']}>
          <Image
            src="/screenshots/app-entdecken-eigene.png"
            alt={`Entdecken-Ansicht der App: Joggen, Kaffee trinken, Malkurs und Bouldern in ${STADT}`}
            width={880}
            height={1912}
            sizes="300px"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        <section className={styles['hero-fact']} aria-labelledby="hero-woche">
          <h2 id="hero-woche">
            <span className={styles['live-dot']} aria-hidden="true" />
            Diese Woche
          </h2>
          {live && anzahlLive > 0 ? (
            <>
              <span className={styles['hero-zahl']}>{anzahlLive}</span>
              <p className={styles['hero-zahl-text']}>
                <b>Termine in {STADT}</b>
                {anzahlDeals > 0 && (
                  <>
                    , darunter {anzahlDeals} Last-Minute-{anzahlDeals === 1 ? 'Angebot' : 'Angebote'}
                  </>
                )}
                .
              </p>
            </>
          ) : (
            <p className={styles['hero-zahl-text']}>
              <b>Events, Kurse und Angebote</b> von Leuten und Läden aus {STADT}.
            </p>
          )}
          <a href="#events" className={styles['hero-fact-link']}>Alle ansehen ↓</a>
        </section>
      </div>
    </div>
  )
}
