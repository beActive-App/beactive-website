'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from '@/app/page.module.css'
import { STADT } from '@/lib/site'
import { useLaunch } from '@/components/site/LaunchContext'
import {
  RUBRIKEN,
  TAG_FILTER,
  datumKurz,
  datumLang,
  gruppiereFuerAnzeige,
  istHeute,
  istOeffnungszeit,
  kurzOrt,
  laeuftGerade,
  ortFuerKarte,
  passtZuTag,
  plaetzeText,
  rabattText,
  rubrikLabel,
  rubrikVon,
  uhrzeit,
  zeitspanne,
  type EventsResult,
  type Rubrik,
  type TagFilter,
  type WebsiteEvent,
} from '@/lib/event-format'

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

const SEITE = 15
const APP_LINK = 'https://links.beactiveapp.de/events/'
const HASH = '#termin-'

/* ---------- Detail-Ansicht ---------- */

function TerminDetail({
  e,
  jetzt,
  istGestartet,
  live,
  onWarteliste,
}: {
  e: WebsiteEvent
  jetzt: Date
  istGestartet: boolean
  live: boolean
  onWarteliste: () => void
}) {
  const rabatt = rabattText(e)
  const plaetze = plaetzeText(e)
  const kuratiert = e.hostKind === 'curated'
  const veranstalterLink = e.sourceUrl || e.hostWebsite
  const karte = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ortFuerKarte(e))}`
  const [geteilt, setGeteilt] = useState(false)

  const teilen = async () => {
    const url = `${window.location.origin}/${HASH}${e.id}`
    try {
      if (navigator.share) {
        await navigator.share({ title: e.title, text: `${e.title} · ${datumLang(e.startsAt)}`, url })
      } else {
        await navigator.clipboard.writeText(url)
        setGeteilt(true)
        window.setTimeout(() => setGeteilt(false), 2000)
      }
    } catch {
      /* Teilen abgebrochen – nichts zu tun */
    }
  }

  return (
    <div className={styles['sheet-body']}>
      <div className={styles['sheet-tags']}>
        <span className={styles.cat}>{rubrikLabel(rubrikVon(e))}</span>
        {laeuftGerade(e, jetzt) && <span className={cx(styles.cat, styles['cat-live'])}>Läuft gerade</span>}
        {e.isDiscounted && <span className={cx(styles.cat, styles['cat-deal'])}>Last Minute</span>}
      </div>

      <h2 className={styles['sheet-title']} id="termin-titel">{e.title}</h2>

      <dl className={styles['sheet-facts']}>
        <div>
          <dt>Wann</dt>
          <dd>
            {datumLang(e.startsAt)}
            <br />
            {zeitspanne(e)}
          </dd>
        </div>
        <div>
          <dt>Wo</dt>
          <dd>
            {kurzOrt(e)}
            <br />
            <a href={karte} target="_blank" rel="noopener noreferrer" className={styles['sheet-link']}>
              Route anzeigen ↗
            </a>
          </dd>
        </div>
        {plaetze && (
          <div>
            <dt>Plätze</dt>
            <dd>{plaetze}</dd>
          </div>
        )}
        {rabatt && (
          <div>
            <dt>Angebot</dt>
            <dd>
              <span className={styles['sheet-deal']}>{rabatt.haupt}</span>
              {rabatt.neben && <span className={styles['sheet-deal-neben']}> {rabatt.neben}</span>}
            </dd>
          </div>
        )}
      </dl>

      <div className={styles['sheet-actions']}>
        {istGestartet && (
          <a href={`${APP_LINK}${e.id}`} className="btn">
            In der App öffnen
          </a>
        )}
        {/* Kalender-Eintrag kommt vom Server (/api/kalender/<id>) – Beispiele haben keinen */}
        {live && (
          <a href={`/api/kalender/${e.id}`} className={istGestartet ? 'btn-ghost' : 'btn'}>
            In meinen Kalender
          </a>
        )}
        {kuratiert && veranstalterLink && (
          <a href={veranstalterLink} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            Tickets & Infos beim Veranstalter ↗
          </a>
        )}
      </div>

      <div className={styles['sheet-links']}>
        <button type="button" className={styles['sheet-share']} onClick={teilen}>
          {geteilt ? 'Link kopiert' : 'Teilen'}
        </button>
        {!istGestartet && (
          <a
            href="#kontakt"
            className={styles['sheet-share']}
            onClick={(ev) => {
              ev.preventDefault()
              onWarteliste()
            }}
          >
            Bescheid bekommen, wenn die App da ist
          </a>
        )}
      </div>

      <p className={styles['sheet-note']}>
        {kuratiert ? (
          <>
            Aus dem öffentlichen Programm von {e.hostName}, zusammengetragen von beActive. Kein Account des
            Veranstalters und kein Ticketverkauf.
            {e.infoAsOf && <> Stand {new Date(e.infoAsOf).toLocaleDateString('de-DE')}.</>}
          </>
        ) : (
          <>Ein Angebot von {e.hostName} in beActive.</>
        )}
      </p>
    </div>
  )
}

/* ---------- Liste ---------- */

/** „bis 21:30“ – bei langen, mehrtägigen Terminen das Datum statt einer
 *  Uhrzeit, die nach dem nächsten Morgen aussieht. */
function endeKurz(e: WebsiteEvent) {
  if (!e.endsAt) return ''
  const lang = new Date(e.endsAt).getTime() - new Date(e.startsAt).getTime() > 12 * 3_600_000
  return lang && datumKurz(e.endsAt) !== datumKurz(e.startsAt) ? datumKurz(e.endsAt) : uhrzeit(e.endsAt)
}

function TerminZeile({
  e,
  jetzt,
  beispiel,
  onOpen,
}: {
  e: WebsiteEvent
  jetzt: Date
  beispiel: boolean
  onOpen: (e: WebsiteEvent, ziel: HTMLElement) => void
}) {
  const laeuft = laeuftGerade(e, jetzt)
  const rabatt = rabattText(e)
  return (
    <li>
      <button
        type="button"
        className={cx(styles['event-row'], e.isDiscounted && styles['is-deal'])}
        onClick={(ev) => onOpen(e, ev.currentTarget)}
        aria-haspopup="dialog"
      >
        <span className={styles['ev-time']}>
          {laeuft ? <b className={styles['ev-live']}>jetzt</b> : <b>{uhrzeit(e.startsAt)}</b>}
          {e.endsAt && <span>bis {endeKurz(e)}</span>}
        </span>
        <span className={styles['ev-body']}>
          <span className={styles['ev-title']}>{e.title}</span>
          <span className={styles['ev-meta']}>{kurzOrt(e)}</span>
          <span className={styles['ev-tags']}>
            <span className={styles.cat}>{rubrikLabel(rubrikVon(e))}</span>
            {rabatt && <span className={cx(styles.cat, styles['cat-deal'])}>{rabatt.haupt}</span>}
            {beispiel && <span className={styles['cat-note']}>Beispiel</span>}
          </span>
        </span>
        <span className={styles['ev-chevron']} aria-hidden="true">›</span>
      </button>
    </li>
  )
}

export default function EventsSection({
  events,
  beispiele,
  jetztIso,
}: {
  events: EventsResult
  beispiele: WebsiteEvent[]
  jetztIso: string
}) {
  const { istGestartet } = useLaunch()
  const jetzt = useMemo(() => new Date(jetztIso), [jetztIso])
  const termine = useMemo(
    () => (events.status === 'ok' ? events.events.filter((e) => !istOeffnungszeit(e)) : []),
    [events],
  )
  const live = termine.length > 0
  const basis = live ? termine : beispiele

  // Startansicht: heute, wenn genug los ist – sonst die nächsten 7 Tage
  const startTag: TagFilter = live && basis.filter((e) => passtZuTag(e, 'heute', jetzt)).length >= 5 ? 'heute' : 'woche'
  const [tag, setTag] = useState<TagFilter>(startTag)
  const [rubrik, setRubrik] = useState<Rubrik | 'alle'>('alle')
  const [anzahl, setAnzahl] = useState(SEITE)
  const [offen, setOffen] = useState<WebsiteEvent | null>(null)

  const dialogRef = useRef<HTMLDialogElement>(null)
  const ausloeser = useRef<HTMLElement | null>(null)
  const gepusht = useRef(false)

  const nachTag = useMemo(() => basis.filter((e) => passtZuTag(e, tag, jetzt)), [basis, tag, jetzt])
  const rubrikZahlen = useMemo(() => {
    const z = new Map<Rubrik, number>()
    for (const e of nachTag) z.set(rubrikVon(e), (z.get(rubrikVon(e)) ?? 0) + 1)
    return z
  }, [nachTag])
  const vorhandeneRubriken = useMemo(() => {
    const alle = new Set(basis.map(rubrikVon))
    return RUBRIKEN.filter((r) => alle.has(r.key))
  }, [basis])
  const gefiltert = useMemo(
    () => (rubrik === 'alle' ? nachTag : nachTag.filter((e) => rubrikVon(e) === rubrik)),
    [nachTag, rubrik],
  )
  // Bleiben nur ein paar übrig, gleich alle zeigen statt „noch 1“
  const sichtbar = gefiltert.length - anzahl <= 5 ? gefiltert.length : anzahl
  const gruppen = useMemo(() => gruppiereFuerAnzeige(gefiltert.slice(0, sichtbar), jetzt), [gefiltert, sichtbar, jetzt])
  const rest = gefiltert.length - sichtbar

  const heuteOffen = events.status === 'ok'
    ? events.events.filter((e) => istOeffnungszeit(e) && istHeute(e.startsAt, jetzt))
    : []

  /* Detail öffnen und schließen – mit eigenem Eintrag im Verlauf, damit die
     Zurück-Taste am Handy die Ansicht schließt statt die Seite zu verlassen. */
  const oeffnen = useCallback((e: WebsiteEvent, ziel?: HTMLElement, verlauf = true) => {
    ausloeser.current = ziel ?? null
    setOffen(e)
    if (verlauf) {
      window.history.pushState(null, '', `${HASH}${e.id}`)
      gepusht.current = true
    }
  }, [])

  // Wohin nach dem Schließen gesprungen wird (z. B. zur Warteliste)
  const zielNachSchliessen = useRef<string | null>(null)

  const schliessen = useCallback((ziel?: string) => {
    zielNachSchliessen.current = ziel ?? null
    if (gepusht.current) {
      gepusht.current = false
      window.history.back()
      return
    }
    setOffen(null)
    if (window.location.hash.startsWith(HASH)) window.history.replaceState(null, '', '#events')
  }, [])

  // Verlauf zurück → Ansicht zu
  useEffect(() => {
    const onPop = () => {
      if (!window.location.hash.startsWith(HASH)) {
        gepusht.current = false
        setOffen(null)
      }
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // Geteilter Link „…/#termin-<id>“ öffnet den Termin direkt – beim Laden und
  // wenn jemand auf der Seite einen solchen Link anklickt
  useEffect(() => {
    const vonHash = () => {
      const h = window.location.hash
      if (!h.startsWith(HASH)) return
      const e = basis.find((x) => x.id === h.slice(HASH.length))
      if (e) {
        oeffnen(e, undefined, false)
        document.getElementById('events')?.scrollIntoView()
      }
    }
    const frame = window.requestAnimationFrame(vonHash)
    window.addEventListener('hashchange', vonHash)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('hashchange', vonHash)
    }
  }, [basis, oeffnen])

  // Dialog zeigen/verstecken, Seite dahinter nicht scrollen lassen
  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (offen && !d.open) {
      d.showModal()
      document.documentElement.style.overflow = 'hidden'
    }
    if (!offen && d.open) {
      d.close()
    }
    if (!offen) {
      document.documentElement.style.overflow = ''
      const ziel = zielNachSchliessen.current
      zielNachSchliessen.current = null
      if (ziel) {
        // Erst nach dem Zurückspringen im Verlauf scrollen, sonst stellt der
        // Browser die alte Position wieder her
        window.requestAnimationFrame(() => {
          window.history.replaceState(null, '', `#${ziel}`)
          document.getElementById(ziel)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          document.querySelector<HTMLInputElement>(`#${ziel} input[type="email"]`)?.focus({ preventScroll: true })
        })
      } else {
        ausloeser.current?.focus()
      }
    }
  }, [offen])

  const tagWaehlen = (t: TagFilter) => {
    setTag(t)
    setAnzahl(SEITE)
  }
  const rubrikWaehlen = (r: Rubrik | 'alle') => {
    setRubrik(r)
    setAnzahl(SEITE)
  }

  return (
    <section className={cx(styles.section, styles['events-section'])} id="events">
      <div className="wrap">
        <div className={styles['deals-head']}>
          <div>
            <span className="eyebrow">{live ? 'Live aus der App' : 'So sieht es aus'}</span>
            <h2>Was in {STADT} läuft</h2>
          </div>
          <div>
            <p>
              {live
                ? 'Konzerte, Kino, Theater, Partys und Angebote von Läden – sortiert nach Tag. Tipp auf einen Termin für alle Infos.'
                : 'Beispiele, wie die Liste aussieht. Die echten Termine gibt es mit dem Start der App.'}
            </p>
            {live && (
              <p className={styles['deals-note']}>
                {termine.length} Termine in den nächsten 14 Tagen · aktualisiert alle 5 Minuten
              </p>
            )}
          </div>
        </div>

        {live && (
          <div className={styles.filters}>
            <div className={styles['filter-tage']} role="group" aria-label="Zeitraum">
              {TAG_FILTER.map((f) => {
                const n = basis.filter((e) => passtZuTag(e, f.key, jetzt)).length
                return (
                  <button
                    key={f.key}
                    type="button"
                    aria-pressed={tag === f.key}
                    className={cx(styles['filter-tag'], tag === f.key && styles.aktiv)}
                    onClick={() => tagWaehlen(f.key)}
                  >
                    {f.label}
                    <span className={styles['filter-zahl']}>{n}</span>
                  </button>
                )
              })}
            </div>
            <div className={styles['filter-rubriken']} role="group" aria-label="Rubrik">
              <button
                type="button"
                aria-pressed={rubrik === 'alle'}
                className={cx(styles['filter-chip'], rubrik === 'alle' && styles.aktiv)}
                onClick={() => rubrikWaehlen('alle')}
              >
                Alles
              </button>
              {vorhandeneRubriken.map((r) => {
                const n = rubrikZahlen.get(r.key) ?? 0
                return (
                  <button
                    key={r.key}
                    type="button"
                    aria-pressed={rubrik === r.key}
                    disabled={n === 0 && rubrik !== r.key}
                    className={cx(styles['filter-chip'], rubrik === r.key && styles.aktiv)}
                    onClick={() => rubrikWaehlen(r.key)}
                  >
                    {r.label}
                    <span className={styles['filter-zahl']}>{n}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {gefiltert.length === 0 ? (
          <div className={styles['events-leer']}>
            <p>Für diese Auswahl steht gerade nichts drin.</p>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => {
                tagWaehlen('alle')
                rubrikWaehlen('alle')
              }}
            >
              Alle Termine zeigen
            </button>
          </div>
        ) : (
          <div className={styles['events-wrap']}>
            {gruppen.map((g) => (
              <div key={g.key} className={styles.day}>
                <h3 className={styles['day-head']}>{g.label}</h3>
                <ul className={styles['event-list']}>
                  {g.events.map((e) => (
                    <TerminZeile key={e.id} e={e} jetzt={jetzt} beispiel={!live} onOpen={oeffnen} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {rest > 0 && (
          <div className={styles['mehr-zeigen']}>
            <button type="button" className="btn-ghost" onClick={() => setAnzahl((a) => a + 2 * SEITE)}>
              Mehr zeigen · noch {rest}
            </button>
          </div>
        )}

        {tag === 'heute' && heuteOffen.length > 0 && (
          <p className={styles['offen-heute']}>
            <b>Heute geöffnet:</b>{' '}
            {heuteOffen.map((e, i) => (
              <span key={e.id}>
                {i > 0 && ' · '}
                {e.hostName || e.title}
                {e.endsAt && <> bis {uhrzeit(e.endsAt)}</>}
              </span>
            ))}
          </p>
        )}

        <div className={styles['events-foot']}>
          <p className={styles.transparenz}>
            Termine von Sudhaus, Kinos, Theatern und Co. trägt unsere Redaktion aus den öffentlichen Programmen
            zusammen. Das sind keine Accounts der Veranstalter und kein Ticketverkauf – in jedem Termin findest du den
            Link zur Originalseite. Will ein Veranstalter nicht gelistet werden, nehmen wir ihn sofort raus.
          </p>
          {!istGestartet && (
            <a href="#kontakt" className="btn-ghost">
              Bescheid bekommen, wenn die App da ist
            </a>
          )}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className={styles.sheet}
        aria-labelledby="termin-titel"
        onCancel={(ev) => {
          ev.preventDefault()
          schliessen()
        }}
        onClick={(ev) => {
          if (ev.target === ev.currentTarget) schliessen()
        }}
      >
        {offen && (
          <>
            <button type="button" className={styles['sheet-close']} onClick={() => schliessen()} aria-label="Schließen">
              ×
            </button>
            <TerminDetail
              e={offen}
              jetzt={jetzt}
              istGestartet={istGestartet}
              live={live}
              onWarteliste={() => schliessen('kontakt')}
            />
          </>
        )}
      </dialog>
    </section>
  )
}
