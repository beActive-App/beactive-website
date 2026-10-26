'use client'

import Link from 'next/link'
import styles from '@/app/page.module.css'
import { STADT } from '@/lib/site'
import { kurzOrt, laeuftGerade, tagLabel, uhrzeit, type WebsiteEvent } from '@/lib/event-format'
import { StoreBadges } from '@/components/site/StoreBadges'

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/* ---------- Gemeinsamer Text-Block ---------- */

export type HeroDaten = {
  istGestartet: boolean
  appStoreUrl: string
  playStoreUrl: string
  anzahlLive: number
  anzahlDeals: number
}

export function HeroText({
  daten,
  center = false,
  kurz = false,
}: {
  daten: HeroDaten
  /** Zentriert statt linksbündig. */
  center?: boolean
  /** Kürzerer Text unter der Überschrift. */
  kurz?: boolean
}) {
  const { istGestartet, appStoreUrl, playStoreUrl, anzahlLive, anzahlDeals } = daten
  return (
    <div className={cx(styles['hero-copy'], center && styles['hero-copy-center'])}>
      <span className="eyebrow">{istGestartet ? `Jetzt im App Store · ${STADT}` : `${STADT} · Start zum Wintersemester`}</span>
      <h1>Was heute in {STADT} läuft.</h1>
      <p className={styles.lede}>
        {kurz
          ? 'Konzerte, Kino, Sport, Spontanes und Last-Minute-Angebote von Läden aus der Stadt – alles in einer App.'
          : 'Konzerte, Kino, Sport, Spontanes und Last-Minute-Angebote von Läden aus der Stadt – alles in einer App. Und wenn nichts dabei ist, startest du in einer Minute selbst was.'}
      </p>

      {istGestartet ? (
        <>
          <div className={styles['hero-actions']}>
            <StoreBadges appStoreUrl={appStoreUrl} playStoreUrl={playStoreUrl} />
          </div>
          <p className={styles['hero-note']}>
            Kostenlos, ohne Werbung. <Link href="/partner" style={{ color: 'var(--ink)' }}>Du hast einen Betrieb? →</Link>
          </p>
        </>
      ) : (
        <div className={styles['hero-actions']}>
          <a href="#kontakt" className="btn">Beim Start Bescheid bekommen</a>
          <Link href="/partner" className="btn-ghost">Ich habe einen Betrieb →</Link>
        </div>
      )}

      <ul className={styles['hero-chips']} aria-label="Auf einen Blick">
        {anzahlLive > 0 ? (
          <li><span className={styles['live-dot']} />{anzahlLive} Termine diese Woche</li>
        ) : (
          <li>Events, Kurse & Deals</li>
        )}
        {anzahlDeals > 0 && <li>{anzahlDeals} Last-Minute-{anzahlDeals === 1 ? 'Deal' : 'Deals'}</li>}
        <li>Kostenlos, ohne Werbung</li>
        <li>{istGestartet && playStoreUrl ? 'iPhone & Android' : 'Für iPhone, Android folgt'}</li>
      </ul>
    </div>
  )
}

/** Die nächsten Termine ab jetzt (laufende zuerst), höchstens n Stück. */
function naechsteTermine(termine: WebsiteEvent[], jetzt: Date, n: number) {
  const t = jetzt.getTime()
  return termine
    .filter((e) => new Date(e.endsAt ?? e.startsAt).getTime() >= t)
    .slice(0, n)
}

/* ---------- Hero: echte Termine als Karten neben dem Text ---------- */

export function HeroMosaik({
  daten,
  termine,
  jetzt,
  anzahlWoche,
}: {
  daten: HeroDaten
  termine: WebsiteEvent[]
  jetzt: Date
  anzahlWoche: number
}) {
  const karten = naechsteTermine(termine, jetzt, 5)
  const rest = Math.max(0, anzahlWoche - karten.length)
  return (
    <div className={cx('wrap', styles['hero-grid'])}>
      <HeroText daten={daten} />
      <div className={styles.mosaik} aria-label="Die nächsten Termine">
        {karten.map((e) => (
          <a key={e.id} href={`#termin-${e.id}`} className={styles['mo-card']}>
            <span className={styles['mo-time']}>
              {laeuftGerade(e, jetzt) ? 'jetzt' : uhrzeit(e.startsAt)}
              <span>{tagLabel(e.startsAt, jetzt)}</span>
            </span>
            <span className={styles['mo-title']}>{e.title}</span>
            <span className={styles['mo-place']}>{kurzOrt(e)}</span>
          </a>
        ))}
        <a href="#events" className={cx(styles['mo-card'], styles['mo-more'])}>
          {rest > 0 ? `+${rest} weitere` : 'Alle Termine'}
          <small>diese Woche in {STADT} ↓</small>
        </a>
      </div>
    </div>
  )
}
