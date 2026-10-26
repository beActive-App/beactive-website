'use client'

import Link from 'next/link'
import styles from './Site.module.css'
import { INSTAGRAM_URL, PARTNER_EMAIL, STADT, SUPPORT_EMAIL } from '@/lib/site'
import { useLaunch } from './LaunchContext'
import { StoreBadges } from './StoreBadges'

export default function SiteFooter() {
  const { istGestartet, appStoreUrl, playStoreUrl } = useLaunch()
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.grid}>
          <div>
            <Link href="/" className={styles.brand}>be<em>Active</em></Link>
            <p className={styles.desc}>
              Was heute in {STADT} läuft – Events, Kurse und Angebote von Läden aus der Stadt, in einer App.
            </p>
            {istGestartet ? (
              <StoreBadges appStoreUrl={appStoreUrl} playStoreUrl={playStoreUrl} className={styles.footBadges} />
            ) : (
              <p className={styles.desc} style={{ marginTop: 12 }}>
                Bald im App Store. <Link href="/#kontakt" style={{ color: 'var(--accent-ink)' }}>Beim Start Bescheid bekommen →</Link>
              </p>
            )}
          </div>
          <div className={styles.col}>
            <p className={styles.head}>Entdecken</p>
            <ul>
              <li><Link href="/#events">Diese Woche</Link></li>
              <li><Link href="/#sogehts">So geht&apos;s</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/team">Team</Link></li>
            </ul>
          </div>
          <div className={styles.col}>
            <p className={styles.head}>Für Betriebe</p>
            <ul>
              <li><Link href="/partner">Partner werden</Link></li>
              <li><a href={`mailto:${PARTNER_EMAIL}`}>{PARTNER_EMAIL}</a></li>
            </ul>
          </div>
          <div className={styles.col}>
            <p className={styles.head}>Kontakt & Rechtliches</p>
            <ul>
              <li><Link href="/kontakt">Kontakt</Link></li>
              <li><a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></li>
              <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><Link href="/impressum">Impressum</Link></li>
              <li><Link href="/datenschutz">Datenschutz</Link></li>
              <li><Link href="/agb">AGB</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} BeActive App UG (haftungsbeschränkt) i.G.</span>
          <span>{STADT}</span>
        </div>
      </div>
    </footer>
  )
}
