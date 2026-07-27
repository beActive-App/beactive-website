'use client'

import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import styles from './page.module.css'

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

const navLinks = [
  { key: 'top', href: '#top', label: 'Start' },
  { key: 'deals', href: '#deals', label: 'Last Minute' },
  { key: 'events', href: '#events', label: 'Erlebnisse' },
  { key: 'team', href: '#team', label: 'Team' },
  { key: 'faq', href: '#faq', label: 'FAQ' },
  { key: 'kontakt', href: '#kontakt', label: 'Kontakt' },
]

const features = [
  {
    title: 'Entdecke Events',
    desc: 'Finde spannende Veranstaltungen in deiner Nähe – egal ob Sport, Kultur oder Musik.',
    icon: (
      <svg className={styles.mark} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M6 24a14 14 0 0 1 28 0" />
        <circle cx="20" cy="24" r="2.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: 'Finde neue Freunde',
    desc: 'Vernetze dich mit Menschen, die dieselben Interessen teilen wie du.',
    icon: (
      <svg className={styles.mark} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="15" cy="18" r="9" />
        <circle cx="25" cy="18" r="9" style={{ mixBlendMode: 'multiply' }} />
      </svg>
    ),
  },
  {
    title: 'Freizeit, die bleibt',
    desc: 'Verwandle langweilige Abende in unvergessliche Erlebnisse.',
    icon: (
      <svg className={styles.mark} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M20 5c3 6 6 9 12 12-6 3-9 6-12 12-3-6-6-9-12-12 6-3 9-6 12-12z" />
      </svg>
    ),
  },
  {
    title: 'Alles an einem Ort',
    desc: 'Sport, Kultur, Events, Produktivität – alles in einer App.',
    icon: (
      <svg className={styles.mark} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="20" cy="20" r="14" />
        <path d="M20 20 L20 8 M20 20 L29 26" />
      </svg>
    ),
  },
]

const team = [
  { initial: 'A', name: 'Albin Schroeder', role: 'Gründer' },
  { initial: 'T', name: 'Tomas Fananas-Hernandez', role: 'Gründer' },
  { initial: 'P', name: 'Philipp Gerberding', role: 'Gründer' },
  { initial: 'H', name: 'Helena Mohr', role: 'Marketingleiterin' },
]

const deals = [
  {
    discount: 30,
    name: 'Lichtspielhaus Kino',
    place: 'Kino · 600 m entfernt',
    was: '11,00 €',
    now: '7,70 €',
    startsInMinutes: 55,
    gradient: 'linear-gradient(160deg, var(--amber) 0%, var(--coral) 100%)',
  },
  {
    discount: 50,
    name: 'Tanzschule Rhythmica',
    place: 'Schnupperkurs · 1,5 km entfernt',
    was: '24,00 €',
    now: '12,00 €',
    startsInMinutes: 100,
    gradient: 'linear-gradient(160deg, var(--coral) 0%, var(--dusk) 100%)',
  },
  {
    discount: 40,
    name: 'Escape Room Cluebase',
    place: '2. Durchgang heute · 2 km entfernt',
    was: '89,00 €',
    now: '53,40 €',
    startsInMinutes: 135,
    gradient: 'linear-gradient(200deg, var(--amber) 0%, var(--dusk) 85%)',
  },
  {
    discount: 25,
    name: 'Kletterhalle Boulderwerk',
    place: 'Tagesticket · 900 m entfernt',
    was: '18,00 €',
    now: '13,50 €',
    startsInMinutes: 180,
    gradient: 'linear-gradient(160deg, var(--dusk) 0%, var(--coral) 100%)',
  },
]

const faqs = [
  {
    q: 'Was kann ich mit der App machen?',
    a: 'Mit BeActive kannst du Events in deiner Nähe entdecken und daran teilnehmen, eigene Events erstellen, Gleichgesinnte finden und deine Freizeit aktiver gestalten – von Sport über Kultur bis zu spontanen Treffen wie einem Kaffee oder einer Lerngruppe. Die App verbindet Sport, Kultur und Alltag mit echter Community.',
  },
  {
    q: 'Was sind Last-Minute-Deals?',
    aBefore: 'Last-Minute-Deals sind zeitlich begrenzte, vergünstigte Angebote von Partnern in deiner Nähe – zum Beispiel ein günstigeres Kino-Ticket am Abend, ein reduzierter Schnupperkurs in der Tanzschule oder ein Escape-Room-Durchgang zum Sonderpreis. Du siehst auf einen Blick den Rabatt und wie lange das Angebot noch gültig ist. Die ',
    aLinkText: 'Beispiele weiter oben',
    aAfter: ' auf dieser Seite zeigen, wie das aussehen wird – echte Partner-Deals gibt es mit dem App-Start.',
  },
  {
    q: 'Kann ich auch selber Events erstellen?',
    a: 'Ja! Jeder Nutzer kann eigene Events erstellen. Du legst Sportart, Ort, Zeit und maximale Teilnehmerzahl fest – dann können andere BeActive-Nutzer deinem Event beitreten. Du bestimmst, ob dein Event öffentlich oder nur für eingeladene Personen sichtbar ist.',
  },
  {
    q: 'Was macht uns so besonders?',
    a: 'BeActive verbindet Sportbegeisterte auf Augenhöhe. Kein kommerzieller Druck, keine bezahlten Events – nur echte Menschen, die gemeinsam aktiv sein wollen. Wir setzen auf Community statt Konsumkultur und entwickeln die App gemeinsam mit unseren Nutzern.',
  },
  {
    q: 'Welche Events kann ich erstellen?',
    a: 'Du kannst Events für so ziemlich alles erstellen: Laufen, Yoga, Basketball oder Wandern genauso wie gemeinsam Kaffee trinken gehen, eine Lerngruppe fürs Studium oder ein Konzert-Meetup. Ob Sport, Kultur oder einfach Zeit miteinander verbringen – deiner Kreativität sind keine Grenzen gesetzt.',
  },
  {
    q: 'Kann ich meine Freunde zu meinem Event einladen?',
    a: 'Ja! Du kannst einen Einladungslink zu deinem Event teilen oder Freunde direkt über die App einladen. So startest du mit einem vertrauten Kreis und öffnest dein Event optional für neue Teilnehmer aus der Community.',
  },
  {
    q: 'Wo kann ich meine Interessen ändern?',
    a: 'Deine Interessen und Sportpräferenzen kannst du jederzeit in den Profileinstellungen anpassen. Tippe auf dein Profilbild → Einstellungen → Interessen. So bekommst du immer passende Event-Empfehlungen für dich.',
  },
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
    return () => observer.disconnect()
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

function useCountdown(startsInMinutes: number) {
  // Initial label is a pure function of the prop (no Date.now()) so server-rendered
  // static HTML matches the client's first paint exactly; the real deadline is only
  // computed after mount, avoiding a hydration mismatch on every visit.
  const [label, setLabel] = useState(() => formatRemaining(startsInMinutes * 60_000))
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    const deadline = Date.now() + startsInMinutes * 60_000
    const tick = () => {
      const remain = deadline - Date.now()
      if (remain <= 0) {
        setLabel('Abgelaufen')
        setExpired(true)
        return
      }
      setLabel(formatRemaining(remain))
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [startsInMinutes])

  return { label, expired }
}

function formatRemaining(remainMs: number) {
  const totalSec = Math.max(0, Math.floor(remainMs / 1000))
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`
}

function DealCard({ deal, index }: { deal: (typeof deals)[number]; index: number }) {
  const { label } = useCountdown(deal.startsInMinutes)
  return (
    <Reveal
      delayMs={index * 80}
      className={styles['deal-card']}
      style={{ '--card-grad': deal.gradient } as CSSProperties}
    >
      <div className={styles['top-row']}>
        <span className={styles['deal-badge']}>
          <span className={styles.dot} />
          Last Minute
        </span>
        <span className={styles['discount-badge']}>-{deal.discount}%</span>
      </div>
      <h3>{deal.name}</h3>
      <p className={styles.place}>{deal.place}</p>
      <div className={styles['deal-price']}>
        <span className={styles.was}>{deal.was}</span>
        <span className={styles.now}>{deal.now}</span>
      </div>
      <div className={styles['deal-countdown']}>
        <span className={styles.num}>{label}</span>
        <span className={styles.lbl}>gültig noch</span>
        <span className={styles['example-chip']}>Beispiel</span>
      </div>
    </Reveal>
  )
}

function FaqItem({ item }: { item: (typeof faqs)[number] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={cx(styles['faq-item'], open && styles.open)}>
      <button
        type="button"
        className={styles['faq-question']}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{item.q}</span>
        <span className={styles['faq-icon']} aria-hidden="true" />
      </button>
      <div className={styles['faq-answer']}>
        <p>
          {'aLinkText' in item ? (
            <>
              {item.aBefore}
              <a href="#deals" className={styles['faq-inline-link']}>
                {item.aLinkText}
              </a>
              {item.aAfter}
            </>
          ) : (
            item.a
          )}
        </p>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeNav, setActiveNav] = useState('top')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sunRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)

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
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id)
          }
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

  // Ambient golden-hour dust particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const colors = ['rgba(240,149,75,0.55)', 'rgba(224,136,114,0.5)', 'rgba(255,196,130,0.45)']
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setTimeout(() => {
      const stored = JSON.parse(localStorage.getItem('beactive_waitlist') || '[]')
      stored.push({ email, date: new Date().toISOString() })
      localStorage.setItem('beactive_waitlist', JSON.stringify(stored))
      setSubmitted(true)
      setLoading(false)
    }, 800)
  }

  return (
    <div className={styles.page}>
      <header className={cx(styles.nav, scrolled && styles.scrolled)}>
        <div className={cx(styles.wrap, styles['nav-row'])}>
          <a href="#top" className={styles.brand}>BeActive</a>
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
            <a href="#kontakt" className={styles.btn}>Dabei sein</a>
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
                <a
                  href={l.href}
                  className={activeNav === l.key ? styles.active : undefined}
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
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
            <span className={styles.eyebrow}>Bald ist es soweit</span>
            <h1 style={{ marginTop: 22 }}>Der schönste Moment ist der, den du teilst</h1>
            <p className={cx(styles.lede)}>
              BeActive bringt dich raus vor die Tür – zu Sport, Musik, Kultur und Menschen, die genau jetzt dasselbe suchen wie du.
            </p>
            <div className={styles['hero-actions']}>
              <a href="#kontakt" className={styles.btn}>Sei dabei, wenn es losgeht</a>
            </div>
          </div>
          <div className={styles['arch-frame']} aria-hidden="true" />
        </section>

        <section className={cx(styles.section, styles['deals-section'])} id="deals">
          <div className={styles.wrap}>
            <Reveal className={styles['deals-head']}>
              <div>
                <span className={styles.eyebrow}>Gerade reduziert</span>
                <h2 style={{ marginTop: 14 }}>Last-Minute-Deals in deiner Nähe</h2>
              </div>
              <div>
                <p>Zeitlich begrenzte, vergünstigte Angebote von Partnern – Kino, Kurse, Freizeit &amp; Co.</p>
                <p className={styles['deals-note']}>Beispielhafte Darstellung – echte Partner-Deals erscheinen mit dem App-Start.</p>
              </div>
            </Reveal>
            <div className={styles['deals-scroller']}>
              {deals.map((deal, i) => (
                <DealCard key={deal.name} deal={deal} index={i} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="events">
          <div className={styles.wrap}>
            <Reveal className={styles['section-head']}>
              <span className={styles.eyebrow}>Was dich erwartet</span>
              <h2 style={{ marginTop: 14 }}>Vier Gründe, öfter rauszugehen</h2>
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
          </div>
        </section>

        <section className={cx(styles.section, styles['team-section'])} id="team">
          <div className={styles.wrap}>
            <Reveal className={styles['section-head']}>
              <span className={styles.eyebrow}>Wer dahintersteckt</span>
              <h2 style={{ marginTop: 14 }}>Ein kleines Team, große Lust auf draußen</h2>
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

        <section className={styles.section} id="faq">
          <div className={styles.wrap}>
            <Reveal className={styles['section-head']}>
              <span className={styles.eyebrow}>Bevor du fragst</span>
              <h2 style={{ marginTop: 14 }}>Häufige Fragen</h2>
            </Reveal>
            <div className={styles['faq-list']}>
              {faqs.map((item) => (
                <FaqItem key={item.q} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta} id="kontakt">
          <div className={styles.wrap}>
            <Reveal>
              <span className={styles.eyebrow}>Fast geschafft</span>
              <h2 style={{ marginTop: 18 }}>Sei die Erste, der Erste, die es erfährt</h2>
              {submitted ? (
                <p className={styles['form-success']}>
                  <strong>Danke!</strong> Wir melden uns, sobald BeActive startet.
                </p>
              ) : (
                <>
                  <p>Trag deine E-Mail ein – wir melden uns, sobald BeActive startet.</p>
                  <form className={styles['email-form']} onSubmit={handleSubmit}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="deine@email.de"
                      required
                      aria-label="E-Mail-Adresse"
                    />
                    <button type="submit" className={styles.btn} disabled={loading}>
                      {loading ? '···' : "Los geht's"}
                    </button>
                  </form>
                </>
              )}
            </Reveal>
          </div>
        </section>
      </main>

      <footer className={styles['site-footer']}>
        <div className={styles.wrap}>
          <div className={styles['foot-grid']}>
            <div>
              <a href="#top" className={styles.brand}>BeActive</a>
              <p className={styles.desc}>Gemeinsam aktiv werden. Sport, Events und Community, zusammen an einem warmen Ort.</p>
            </div>
            <div className={styles['foot-col']}>
              <p className={styles.head}>Navigation</p>
              <ul>
                <li><a href="#top">Start</a></li>
                <li><a href="#deals">Last Minute</a></li>
                <li><a href="#events">Erlebnisse</a></li>
                <li><a href="#team">Team</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div className={styles['foot-col']}>
              <p className={styles.head}>Kontakt</p>
              <ul>
                <li><a href="mailto:support@beactiveapp.de">support@beactiveapp.de</a></li>
                <li><a href="https://www.instagram.com/beactive_app/">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className={styles['foot-bottom']}>
            <span>© {new Date().getFullYear()} BeActive App</span>
            <span>Goldene Stunde</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
