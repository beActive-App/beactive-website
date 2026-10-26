'use client'

import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/app/page.module.css'
import { faqListe } from '@/lib/faq'
import { STADT, SUPPORT_EMAIL } from '@/lib/site'
import { innerhalb, istOeffnungszeit, type EventsResult, type WebsiteEvent } from '@/lib/event-format'
import EventsSection from '@/components/home/EventsSection'
import { HeroMosaik } from '@/components/home/Hero'
import { useLaunch } from '@/components/site/LaunchContext'
import { AppStoreBadge, StoreBadges } from '@/components/site/StoreBadges'

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

const schritte = [
  {
    nr: '1',
    titel: 'Entdecken',
    text: 'Öffnen und sehen, was heute in Tübingen läuft – nach Tag sortiert, mit Filter nach Kategorie. Auch Läden, die gerade einfach nur offen haben.',
    bild: { src: '/screenshots/0-entdecken.png', w: 1125, h: 2436, alt: 'Entdecken-Screen der App: Events in Tübingen, nach Tag gruppiert' },
  },
  {
    nr: '2',
    titel: 'Beitreten',
    text: 'Ein Tap. Vorher siehst du, wie viele dabei sind und wer. Jedes Event hat einen Chat, Kalender und Navigation sind einen Tipp entfernt.',
    bild: { src: '/screenshots/2-event-details.png', w: 1320, h: 2868, alt: 'Event-Details mit Teilnehmenden, Chat und Beitreten-Button' },
  },
  {
    nr: '3',
    titel: 'Selbst starten',
    text: 'Nichts dabei? Titel, Ort, Zeit, Kategorie – in unter einer Minute steht dein Event, und alle in der Stadt sehen es.',
    bild: { src: '/screenshots/3-erstellen.png', w: 1320, h: 2868, alt: 'Event erstellen: Formular mit Titel, Ort, Zeit und Kategorie' },
  },
]

const features = [
  {
    title: 'Alles an einem Ort',
    desc: 'Sport, Kultur, Natur, Lerngruppe, Kaffee – was Leute starten und was Betriebe anbieten, in einer Liste statt in zwölf Instagram-Accounts.',
    icon: (
      <svg className={styles.mark} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="20" cy="20" r="14" />
        <path d="M20 20 L20 8 M20 20 L29 26" />
      </svg>
    ),
  },
  {
    title: 'Du siehst, wer da ist',
    desc: 'Vor dem Beitreten: wie viele zugesagt haben und wer. Die Hemmschwelle ist nicht das Event, sondern allein reinzukommen – das lösen wir.',
    icon: (
      <svg className={styles.mark} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="15" cy="18" r="9" />
        <circle cx="25" cy="18" r="9" />
      </svg>
    ),
  },
  {
    title: 'Last-Minute-Deals',
    desc: 'Betriebe aus der Stadt reduzieren für die Stunden, in denen bei ihnen wenig los ist. Du siehst Preis, Rabatt und wie lange es gilt.',
    icon: (
      <svg className={styles.mark} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M8 20l12-12 12 12-12 12z" />
        <path d="M14 14l12 12" />
      </svg>
    ),
  },
  {
    title: 'In einer Minute erstellt',
    desc: 'Kein Doodle, kein toter Gruppenchat. Ort und Zeit stehen fest, bevor jemand fragt – die anderen sagen nur noch zu.',
    icon: (
      <svg className={styles.mark} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M6 24a14 14 0 0 1 28 0" />
        <circle cx="20" cy="24" r="2.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
]

const kategoriePills = ['Sport', 'Kultur', 'Natur', 'Essen & Trinken', 'Spiele', 'Lernen', 'Musik', 'Spontanes']

const team = [
  { initial: 'A', name: 'Albin Schroeder', role: 'Gründer' },
  { initial: 'T', name: 'Tomas Fananas-Hernandez', role: 'Gründer' },
  { initial: 'P', name: 'Philipp Gerberding', role: 'Gründer' },
  { initial: 'H', name: 'Helena Mohr', role: 'Marketingleiterin' },
]

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el)
    // Sicherheitsnetz: Wer per Link direkt auf #events landet, soll nie vor
    // einer leeren Fläche stehen – nach kurzer Zeit wird so oder so eingeblendet.
    const spaetestens = window.setTimeout(() => setInView(true), 900)
    return () => {
      observer.disconnect()
      window.clearTimeout(spaetestens)
    }
  }, [threshold])

  return { ref, inView }
}

function Reveal({
  children,
  className,
  delayMs = 0,
  style,
}: {
  children: React.ReactNode
  className?: string
  delayMs?: number
  style?: CSSProperties
}) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className={cx(styles.reveal, inView && styles['in-view'], className)}
      style={{ transitionDelay: `${delayMs}ms`, ...style }}
    >
      {children}
    </div>
  )
}

/* ---------- Warteliste (vor dem Start) ---------- */

function Warteliste() {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('') // Honeypot
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return
    setStatus('sending')
    try {
      const res = await fetch('/api/warteliste', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, quelle: 'startseite', website }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className={styles['form-success']}>
        <strong>Danke!</strong> Wir melden uns, sobald beActive im App Store ist.
      </p>
    )
  }

  return (
    <>
      <p>Trag deine E-Mail ein – wir sagen dir Bescheid, sobald es losgeht. Nur das, kein Newsletter.</p>
      <form className={styles['email-form']} onSubmit={submit} noValidate>
        <div aria-hidden="true" style={{ position: 'absolute', left: -9999, width: 1, height: 1, overflow: 'hidden' }}>
          <label htmlFor="hp-website">Website (bitte frei lassen)</label>
          <input id="hp-website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="deine@email.de"
          required
          aria-label="E-Mail-Adresse"
        />
        <button type="submit" className="btn" disabled={status === 'sending'}>
          {status === 'sending' ? '···' : 'Eintragen'}
        </button>
      </form>
      <p className={styles['form-hint']}>Austragen jederzeit per Mail. Keine Weitergabe.</p>
      {status === 'error' && (
        <p className={styles['form-error']}>
          Das hat gerade nicht geklappt. Schreib uns an <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>, dann tragen wir dich von Hand ein.
        </p>
      )}
    </>
  )
}

/* ---------- FAQ ---------- */

function FaqItem({ q, a, link }: { q: string; a: string; link?: { href: string; text: string } }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={cx(styles['faq-item'], open && styles.open)}>
      <button type="button" className={styles['faq-question']} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span>{q}</span>
        <span className={styles['faq-icon']} aria-hidden="true" />
      </button>
      <div className={styles['faq-answer']}>
        <p>
          {a}
          {link && (
            <>
              {' '}
              <a href={link.href} className={styles['faq-inline-link']}>
                {link.text}
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  )
}

/* ---------- Seite ---------- */

export default function HomePage({
  events,
  beispiele,
  jetztIso,
  qrSvg,
}: {
  events: EventsResult
  beispiele: WebsiteEvent[]
  jetztIso: string
  /** QR-Code zum App Store als SVG – leer, solange die App nicht draußen ist. */
  qrSvg: string
}) {
  const { istGestartet, appStoreUrl, playStoreUrl } = useLaunch()
  const [storeBar, setStoreBar] = useState(false)

  const heroRef = useRef<HTMLElement>(null)

  const jetzt = new Date(jetztIso)
  const termineLive = events.status === 'ok' ? events.events.filter((e) => !istOeffnungszeit(e)) : []
  const anzahlLive = innerhalb(termineLive, 7, jetzt).length
  const anzahlDeals = termineLive.filter((e) => e.isDiscounted).length
  const faqs = faqListe(istGestartet)
  const heroDaten = { istGestartet, appStoreUrl, playStoreUrl, anzahlLive, anzahlDeals }
  const heroTermine = termineLive.length > 0 ? termineLive : beispiele

  // Leiste am Handy einblenden, sobald der Hero größtenteils aus dem Bild ist
  useEffect(() => {
    const hero = heroRef.current
    if (!istGestartet || !hero) return
    const observer = new IntersectionObserver(
      ([entry]) => setStoreBar(entry.intersectionRatio < 0.3),
      { threshold: [0.3] },
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [istGestartet])

  return (
    <div className={styles.page}>
      <main>
        {/* ---------- Hero ---------- */}
        <section className={styles.hero} id="top" ref={heroRef}>
          <HeroMosaik daten={heroDaten} termine={heroTermine} jetzt={jetzt} anzahlWoche={anzahlLive} />
        </section>

        {/* ---------- Termine ---------- */}
        <EventsSection events={events} beispiele={beispiele} jetztIso={jetztIso} />

        {/* ---------- So geht's ---------- */}
        <section className={cx(styles.section, styles['steps-section'])} id="sogehts">
          <div className="wrap">
            <Reveal className={styles['section-head']}>
              <span className="eyebrow">So geht&apos;s</span>
              <h2>Drei Schritte, eine Minute</h2>
              <p>Keine Anmeldung bei zwölf Veranstaltern, kein Gruppenchat, in dem nie was zustande kommt.</p>
            </Reveal>
            <div className={styles.steps}>
              {schritte.map((s, i) => (
                <Reveal key={s.nr} delayMs={i * 100} className={styles.step}>
                  <div className={styles['step-phone']}>
                    <Image src={s.bild.src} alt={s.bild.alt} width={s.bild.w} height={s.bild.h} sizes="(max-width: 900px) 66vw, 270px" />
                  </div>
                  <span className={styles['step-num']}>{s.nr}</span>
                  <h3>{s.titel}</h3>
                  <p>{s.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Was drin ist ---------- */}
        <section className={styles.section} id="features">
          <div className="wrap">
            <Reveal className={styles['section-head']}>
              <span className="eyebrow">Was drin ist</span>
              <h2>Keine Sport-App. Eine Stadt-App.</h2>
              <p>Der Name täuscht. Das meistbesuchte Event bei uns war bisher Kaffee und Kennenlernen.</p>
            </Reveal>
            <div className={styles.features}>
              {features.map((f, i) => (
                <Reveal key={f.title} delayMs={i * 90} className={styles.feature}>
                  {f.icon}
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className={styles.pills} delayMs={200}>
              {kategoriePills.map((k) => (
                <span key={k} className={styles.pill}>{k}</span>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ---------- Für Betriebe ---------- */}
        <section className={cx(styles.section, styles['betriebe-section'])} id="betriebe">
          <div className="wrap">
            <Reveal className={styles['betriebe-card']}>
              <div>
                <span className="eyebrow">Für Betriebe in {STADT}</span>
                <h2>Dienstag, 15 Uhr.</h2>
                <p className={styles['betriebe-lede']}>
                  So sieht es in den meisten Läden aus. Nicht, weil das Angebot schlecht ist – sondern weil niemand weiß, dass gerade jetzt Platz ist. Genau dieses Zeitfenster füllen wir.
                </p>
                <Link href="/partner" className="btn">Wie es funktioniert</Link>
              </div>
              <ul className={styles['betriebe-points']}>
                <li><b>Ihr stellt ein Angebot für ein Zeitfenster ein.</b> Dreißig Sekunden. Rabatt, Zeitraum, Plätze legt ihr fest.</li>
                <li><b>Wer die App offen hat, sieht es sofort.</b> Und kommt vorbei, statt zu Hause zu bleiben.</li>
                <li><b>Für die ersten 20 Betriebe kostenlos.</b> Kein Vertrag, keine Provision, jederzeit beendbar.</li>
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section className={styles.section} id="faq">
          <div className="wrap">
            <Reveal className={styles['section-head']}>
              <span className="eyebrow">Bevor du fragst</span>
              <h2>Häufige Fragen</h2>
            </Reveal>
            <div className={styles['faq-list']}>
              {faqs.map((item) => (
                <FaqItem key={item.q} {...item} />
              ))}
            </div>
            <p className={styles['faq-more']}>
              Noch was offen? <Link href="/kontakt">Schreib uns.</Link>
            </p>
          </div>
        </section>

        {/* ---------- Team ---------- */}
        <section className={cx(styles.section, styles['team-section'])} id="team">
          <div className="wrap">
            <Reveal className={styles['section-head']}>
              <span className="eyebrow">Wer dahintersteckt</span>
              <h2>Von Leuten aus {STADT}, für {STADT}</h2>
              <p>Wir sind selbst hierhergezogen und haben gemerkt: Es gibt ständig was. Man erfährt es nur nicht. Also haben wir es an einen Ort gepackt.</p>
            </Reveal>
            <div className={styles['team-grid']}>
              {team.map((member, i) => (
                <Reveal key={member.name} delayMs={i * 90} className={styles.player}>
                  <div className={styles.avatar}>{member.initial}</div>
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Abschluss ---------- */}
        <section className={styles.cta} id="kontakt">
          <div className="wrap">
            <Reveal>
              {istGestartet ? (
                <>
                  <span className="eyebrow">Bereit?</span>
                  <h2>Hol dir beActive</h2>
                  <p>Kostenlos im App Store, für iPhone. {playStoreUrl ? 'Und bei Google Play für Android.' : 'Android folgt.'}</p>
                  <div className={styles['cta-store']}>
                    <div className={styles['cta-badges']}>
                      <StoreBadges appStoreUrl={appStoreUrl} playStoreUrl={playStoreUrl} />
                    </div>
                    {qrSvg && (
                      <div className={styles.qr}>
                        <div className={styles['qr-tile']} dangerouslySetInnerHTML={{ __html: qrSvg }} aria-hidden="true" />
                        <span>Mit dem Handy scannen</span>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <span className="eyebrow">Fast geschafft</span>
                  <h2>Sei dabei, wenn es losgeht</h2>
                  <Warteliste />
                </>
              )}
            </Reveal>
          </div>
        </section>
      </main>

      {istGestartet && (
        <div className={cx(styles['store-bar'], storeBar && styles.visible)} aria-hidden={!storeBar}>
          <p><b>beActive fürs iPhone</b>Kostenlos im App Store</p>
          <AppStoreBadge href={appStoreUrl} />
        </div>
      )}
    </div>
  )
}
