'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Site.module.css'
import { useLaunch } from './LaunchContext'

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

// Abschnitte der Startseite – auf Unterseiten führen die Links zurück dorthin.
const abschnitte = [
  { key: 'events', label: 'Diese Woche' },
  { key: 'sogehts', label: "So geht's" },
  { key: 'betriebe', label: 'Für Betriebe', seite: '/partner' },
  { key: 'faq', label: 'FAQ', seite: '/faq' },
]

export default function SiteHeader() {
  const pathname = usePathname()
  const startseite = pathname === '/'
  const { istGestartet, appStoreUrl } = useLaunch()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [aktiv, setAktiv] = useState('top')

  const links = abschnitte.map((a) => ({
    key: a.key,
    label: a.label,
    href: startseite ? `#${a.key}` : a.seite ?? `/#${a.key}`,
  }))
  const ctaHref = istGestartet ? appStoreUrl : startseite ? '#kontakt' : '/#kontakt'
  const ctaLabel = istGestartet ? 'App laden' : 'Auf die Liste'

  // Schatten und Fortschrittsbalken beim Scrollen
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
  }, [pathname])

  // Aktiver Abschnitt – nur auf der Startseite
  useEffect(() => {
    if (!startseite) return
    const sections = ['top', ...abschnitte.map((a) => a.key)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setAktiv(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [startseite])

  return (
    <header className={cx(styles.nav, scrolled && styles.scrolled)}>
      <div className={cx('wrap', styles.row)}>
        <Link href="/" className={styles.brand} aria-label="beActive – Startseite">
          be<em>Active</em>
        </Link>
        <ul className={styles.links}>
          {links.map((l) => (
            <li key={l.key}>
              <Link href={l.href} className={startseite && aktiv === l.key ? styles.active : undefined}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.right}>
          <Link href={ctaHref} className={cx('btn', styles.cta)}>
            {ctaLabel}
          </Link>
          <button
            type="button"
            className={styles.toggle}
            aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
      <nav className={cx(styles.mobile, mobileOpen && styles.open)} aria-label="Hauptmenü">
        <ul>
          {!startseite && (
            <li><Link href="/" onClick={() => setMobileOpen(false)}>Start</Link></li>
          )}
          {links.map((l) => (
            <li key={l.key}>
              <Link href={l.href} className={startseite && aktiv === l.key ? styles.active : undefined} onClick={() => setMobileOpen(false)}>
                {l.label}
              </Link>
            </li>
          ))}
          <li><Link href="/partner" onClick={() => setMobileOpen(false)}>Partner werden</Link></li>
          <li className={styles.primary}>
            <Link href={ctaHref} className="btn" onClick={() => setMobileOpen(false)}>{istGestartet ? 'Kostenlos im App Store' : 'Beim Start Bescheid bekommen'}</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.progress} aria-hidden="true">
        <span className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>
    </header>
  )
}
