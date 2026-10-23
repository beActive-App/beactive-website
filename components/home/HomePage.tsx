'use client'

import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/app/page.module.css'
import { faqListe } from '@/lib/faq'
import { INSTAGRAM_URL, STADT, SUPPORT_EMAIL } from '@/lib/site'
import { innerhalb, istOeffnungszeit, type EventsResult, type WebsiteEvent } from '@/lib/event-format'
import EventsSection from '@/components/home/EventsSection'

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

const navLinks = [
  { key: 'top', href: '#top', label: 'Start' },
  { key: 'events', href: '#events', label: 'Diese Woche' },
  { key: 'sogehts', href: '#sogehts', label: "So geht's" },
  { key: 'betriebe', href: '#betriebe', label: 'Für Betriebe' },
  { key: 'faq', href: '#faq', label: 'FAQ' },
]

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
        <circle cx="25" cy="18" r="9" style={{ mixBlendMode: 'multiply' }} />
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
      { threshold }
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

/* ---------- Warteliste ---------- */

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
        <button type="submit" className={styles.btn} disabled={status === 'sending'}>
          {status === 'sending' ? '···' : 'Eintragen'}
        </button>
      </form>
      {status === 'error' && (
        <p className={styles['form-error']}>
          Das hat gerade nicht geklappt. Schreib uns an <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>, dann tragen wir dich von Hand ein.
        </p>
      )}
    </>
  )
}

function DownloadBadge({ href }: { href: string }) {
  return (
    <a href={href} className={styles['download-badge']} aria-label="Im App Store laden">
      <svg className={styles['apple-mark']} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16.365 1.43c0 1.14-.468 2.096-1.235 2.85-.767.754-1.79 1.29-2.914 1.207-.14-1.1.4-2.24 1.16-2.98.78-.77 2.02-1.33 2.99-1.077zM20.85 17.19c-.51 1.15-.99 2.24-1.75 3.28-.98 1.34-2 2.68-3.56 2.71-1.53.03-2.02-.9-3.77-.9-1.75 0-2.29.87-3.75.93-1.5.06-2.66-1.45-3.65-2.78-1.98-2.7-3.5-7.62-1.47-10.94.93-1.63 2.6-2.66 4.4-2.69 1.48-.03 2.86.99 3.76.99.89 0 2.58-1.22 4.35-1.04.74.03 2.82.3 4.16 2.27-3.79 2.31-3.19 6.81.24 8.16z" />
      </svg>
      <span className={styles['label-lines']}>
        <span className={styles['eyebrow-line']}>Laden im</span>
        <span className={styles['store-line']}>App Store</span>
      </span>
    </a>
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
  istGestartet,
  appStoreUrl,
}: {
  events: EventsResult
  beispiele: WebsiteEvent[]
  jetztIso: string
  istGestartet: boolean
  appStoreUrl: string
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeNav, setActiveNav] = useState('top')

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sunRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  const termineLive = events.status === 'ok' ? events.events.filter((e) => !istOeffnungszeit(e)) : []
  const anzahlLive = innerhalb(termineLive, 7, new Date(jetztIso)).length
  const anzahlDeals = termineLive.filter((e) => e.isDiscounted).length
  const faqs = faqListe(istGestartet)
  const primaryHref = istGestartet ? appStoreUrl : '#kontakt'
  const primaryLabel = istGestartet ? 'Jetzt kostenlos laden' : 'Beim Start Bescheid bekommen'

  // Scroll chrome: nav elevation + progress bar
  useEffect(() => {
    let ticking = false
    const update = () => {
      setScrolled(window.scrollY > 12)
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - doc.clientHeight
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0)
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy active nav link
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.key))
      .filter((el): el is HTMLElement => el !== null)
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveNav(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Sun / horizon parallax
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return
    let ticking = false
    const update = () => {
      const hero = heroRef.current
      const sun = sunRef.current
      if (!hero || !sun) return
      const progressRatio = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight))
      sun.style.transform = `translate(-50%, ${(progressRatio * 90).toFixed(1)}px) scale(${(1 - progressRatio * 0.18).toFixed(3)})`
      sun.style.opacity = String((1 - progressRatio * 0.55).toFixed(3))
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Ambient nightrun dust particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const colors = ['rgba(193,255,114,0.55)', 'rgba(159,224,92,0.5)', 'rgba(234,242,222,0.4)']
    let width = 0
    let height = 0
    let particles: { x: number; y: number; r: number; vy: number; drift: number; driftSpeed: number; color: string }[] = []
    let frameId = 0

    function resize() {
      if (!canvas) return
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = Math.max(1, width * dpr)
      canvas.height = Math.max(1, height * dpr)
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function makeParticles(n: number) {
      particles = Array.from({ length: n }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1 + Math.random() * 2.6,
        vy: 0.12 + Math.random() * 0.28,
        drift: Math.random() * Math.PI * 2,
        driftSpeed: 0.002 + Math.random() * 0.004,
        color: colors[i % colors.length],
      }))
    }

    resize()
    makeParticles(Math.max(12, Math.round((width * height) / 26000)))

    let resizeTimer: number
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        resize()
        makeParticles(Math.max(12, Math.round((width * height) / 26000)))
      }, 150)
    }
    window.addEventListener('resize', onResize)

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      particles.forEach((p) => {
        p.y -= p.vy
        p.drift += p.driftSpeed
        p.x += Math.sin(p.drift) * 0.15
        if (p.y < -6) {
          p.y = height + 6
          p.x = Math.random() * width
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      })
    }

    if (reduceMotion) {
      draw()
    } else {
      const loop = () => {
        draw()
        frameId = window.requestAnimationFrame(loop)
      }
      loop()
    }

    return () => {
      window.removeEventListener('resize', onResize)
      window.clearTimeout(resizeTimer)
      if (frameId) window.cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <div className={styles.page}>
      <header className={cx(styles.nav, scrolled && styles.scrolled)}>
        <div className={cx(styles.wrap, styles['nav-row'])}>
          <a href="#top" className={styles.brand}>beActive</a>
          <ul className={styles.links}>
            {navLinks.map((l) => (
              <li key={l.key}>
                <a href={l.href} className={activeNav === l.key ? styles.active : undefined}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles['nav-right']}>
            <a href={primaryHref} className={styles.btn}>{istGestartet ? 'App laden' : 'Auf die Liste'}</a>
            <button
              type="button"
              className={styles['nav-toggle']}
              aria-label="Menü öffnen"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
        <nav className={cx(styles['mobile-menu'], mobileOpen && styles.open)}>
          <ul>
            {navLinks.map((l) => (
              <li key={l.key}>
                <a href={l.href} className={activeNav === l.key ? styles.active : undefined} onClick={() => setMobileOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
            <li><Link href="/partner" onClick={() => setMobileOpen(false)}>Partner werden</Link></li>
          </ul>
        </nav>
        <div className={styles['nav-progress']} aria-hidden="true">
          <span className={styles['nav-progress-fill']} style={{ width: `${progress}%` }} />
        </div>
      </header>

      <main>
        <section className={styles.hero} id="top" ref={heroRef}>
          <div ref={sunRef} className={styles.sun} aria-hidden="true" />
          <canvas ref={canvasRef} className={styles['dust-canvas']} aria-hidden="true" />
          <div className={styles.horizon} aria-hidden="true" />
          <div className={styles.wrap}>
            <span className={styles.eyebrow}>{istGestartet ? `Jetzt im App Store · ${STADT}` : `${STADT} · Start zum Wintersemester`}</span>
            <h1 style={{ marginTop: 22 }}>Weniger scrollen, mehr erleben.</h1>
            <p className={cx(styles.lede)}>
              beActive zeigt dir, was heute in {STADT} läuft: Sport, Kultur, Spontanes und Last-Minute-Angebote von Läden aus der Stadt. Und wenn nichts dabei ist, startest du in einer Minute selbst was.
            </p>
            <div className={styles['hero-actions']}>
              <a href={primaryHref} className={styles.btn}>{primaryLabel}</a>
              <Link href="/partner" className={styles['btn-ghost']}>Ich habe einen Betrieb →</Link>
            </div>
            <ul className={styles['hero-chips']} aria-label="Auf einen Blick">
              {anzahlLive > 0 ? (
                <li><span className={styles['live-dot']} />{anzahlLive} Termine diese Woche</li>
              ) : (
                <li>Events, Kurse & Deals</li>
              )}
              {anzahlDeals > 0 && <li>{anzahlDeals} Last-Minute-{anzahlDeals === 1 ? 'Deal' : 'Deals'}</li>}
              <li>Kostenlos, ohne Werbung</li>
              <li>Für iPhone{istGestartet ? '' : ', Android folgt'}</li>
            </ul>
          </div>
          <div className={styles['arch-frame']} aria-hidden="true" />
        </section>

        <EventsSection events={events} beispiele={beispiele} jetztIso={jetztIso} istGestartet={istGestartet} />

        <section className={cx(styles.section, styles['steps-section'])} id="sogehts">
          <div className={styles.wrap}>
            <Reveal className={styles['section-head']}>
              <span className={styles.eyebrow}>So geht&apos;s</span>
              <h2 style={{ marginTop: 14 }}>Drei Schritte, eine Minute</h2>
              <p>Keine Anmeldung bei zwölf Veranstaltern, kein Gruppenchat, in dem nie was zustande kommt.</p>
            </Reveal>
            <div className={styles.steps}>
              {schritte.map((s, i) => (
                <Reveal key={s.nr} delayMs={i * 100} className={styles.step}>
                  <div className={styles['step-phone']}>
                    <Image src={s.bild.src} alt={s.bild.alt} width={s.bild.w} height={s.bild.h} sizes="(max-width: 780px) 70vw, 300px" />
                  </div>
                  <span className={styles['step-num']}>{s.nr}</span>
                  <h3>{s.titel}</h3>
                  <p>{s.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="features">
          <div className={styles.wrap}>
            <Reveal className={styles['section-head']}>
              <span className={styles.eyebrow}>Was drin ist</span>
              <h2 style={{ marginTop: 14 }}>Keine Sport-App. Eine Stadt-App.</h2>
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

        <section className={cx(styles.section, styles['betriebe-section'])} id="betriebe">
          <div className={styles.wrap}>
            <Reveal className={styles['betriebe-card']}>
              <div>
                <span className={styles.eyebrow}>Für Betriebe in {STADT}</span>
                <h2 style={{ marginTop: 14 }}>Dienstag, 15 Uhr.</h2>
                <p className={styles['betriebe-lede']}>
                  So sieht es in den meisten Läden aus. Nicht, weil das Angebot schlecht ist – sondern weil niemand weiß, dass gerade jetzt Platz ist. Genau dieses Zeitfenster füllen wir.
                </p>
                <div className={styles['hero-actions']} style={{ justifyContent: 'flex-start', marginTop: 28 }}>
                  <Link href="/partner" className={styles.btn}>Wie es funktioniert</Link>
                </div>
              </div>
              <ul className={styles['betriebe-points']}>
                <li><b>Ihr stellt ein Angebot für ein Zeitfenster ein.</b> Dreißig Sekunden. Rabatt, Zeitraum, Plätze legt ihr fest.</li>
                <li><b>Wer die App offen hat, sieht es sofort.</b> Und kommt vorbei, statt zu Hause zu bleiben.</li>
                <li><b>Für die ersten 20 Betriebe kostenlos.</b> Kein Vertrag, keine Provision, jederzeit beendbar.</li>
              </ul>
            </Reveal>
          </div>
        </section>

        <section className={styles.section} id="faq">
          <div className={styles.wrap}>
            <Reveal className={styles['section-head']}>
              <span className={styles.eyebrow}>Bevor du fragst</span>
              <h2 style={{ marginTop: 14 }}>Häufige Fragen</h2>
            </Reveal>
            <div className={styles['faq-list']}>
              {faqs.map((item) => (
                <FaqItem key={item.q} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section className={cx(styles.section, styles['team-section'])} id="team">
          <div className={styles.wrap}>
            <Reveal className={styles['section-head']}>
              <span className={styles.eyebrow}>Wer dahintersteckt</span>
              <h2 style={{ marginTop: 14 }}>Von Leuten aus {STADT}, für {STADT}</h2>
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

        <section className={styles.cta} id="kontakt">
          <div className={styles.wrap}>
            <Reveal>
              <span className={styles.eyebrow}>{istGestartet ? 'Bereit?' : 'Fast geschafft'}</span>
              <h2 style={{ marginTop: 18 }}>{istGestartet ? 'Hol dir beActive' : 'Sei dabei, wenn es losgeht'}</h2>
              {istGestartet ? (
                <>
                  <p>Kostenlos im App Store, für iPhone. Android folgt.</p>
                  <div className={styles['hero-actions']} style={{ marginTop: 32 }}>
                    <DownloadBadge href={appStoreUrl} />
                  </div>
                </>
              ) : (
                <Warteliste />
              )}
            </Reveal>
          </div>
        </section>
      </main>

      <footer className={styles['site-footer']}>
        <div className={styles.wrap}>
          <div className={styles['foot-grid']}>
            <div>
              <a href="#top" className={styles.brand}>beActive</a>
              <p className={styles.desc}>Was heute in {STADT} läuft – Events, Kurse und Angebote von Läden aus der Stadt, in einer App.</p>
            </div>
            <div className={styles['foot-col']}>
              <p className={styles.head}>Navigation</p>
              <ul>
                <li><a href="#events">Diese Woche</a></li>
                <li><a href="#sogehts">So geht&apos;s</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><Link href="/partner">Für Betriebe</Link></li>
                <li><Link href="/team">Team</Link></li>
              </ul>
            </div>
            <div className={styles['foot-col']}>
              <p className={styles.head}>Kontakt & Rechtliches</p>
              <ul>
                <li><a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></li>
                <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><Link href="/impressum">Impressum</Link></li>
                <li><Link href="/datenschutz">Datenschutz</Link></li>
                <li><Link href="/agb">AGB</Link></li>
              </ul>
            </div>
          </div>
          <div className={styles['foot-bottom']}>
            <span>© {new Date().getFullYear()} BeActive App UG (haftungsbeschränkt) i.G.</span>
            <span>{STADT}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
