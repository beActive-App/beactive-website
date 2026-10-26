'use client'

import styles from './Site.module.css'

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.468 2.096-1.235 2.85-.767.754-1.79 1.29-2.914 1.207-.14-1.1.4-2.24 1.16-2.98.78-.77 2.02-1.33 2.99-1.077zM20.85 17.19c-.51 1.15-.99 2.24-1.75 3.28-.98 1.34-2 2.68-3.56 2.71-1.53.03-2.02-.9-3.77-.9-1.75 0-2.29.87-3.75.93-1.5.06-2.66-1.45-3.65-2.78-1.98-2.7-3.5-7.62-1.47-10.94.93-1.63 2.6-2.66 4.4-2.69 1.48-.03 2.86.99 3.76.99.89 0 2.58-1.22 4.35-1.04.74.03 2.82.3 4.16 2.27-3.79 2.31-3.19 6.81.24 8.16z" />
    </svg>
  )
}

function PlayMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.6 2.4 13.2 12l-9.6 9.6c-.37-.2-.6-.6-.6-1.1V3.5c0-.5.23-.9.6-1.1z" fill="#4285f4" />
      <path d="M16.9 8.3 13.2 12 3.6 2.4c.14-.07.3-.1.46-.1.33 0 .66.1.95.27L16.9 8.3z" fill="#34a853" />
      <path d="M16.9 15.7 5 22.4c-.3.17-.62.27-.95.27-.16 0-.32-.03-.46-.1L13.2 12l3.7 3.7z" fill="#ea4335" />
      <path d="M20.6 10.3c.9.5.9 1.9 0 2.4L16.9 15.7 13.2 12l3.7-3.7 3.7 2z" fill="#fbbc04" />
    </svg>
  )
}

export function AppStoreBadge({ href, soon = false }: { href?: string; soon?: boolean }) {
  const inner = (
    <>
      <AppleMark />
      <span className={styles.badgeLines}>
        <span className={styles.badgeSmall}>{soon ? 'Bald im' : 'Laden im'}</span>
        <span className={styles.badgeBig}>App Store</span>
      </span>
    </>
  )
  if (soon || !href) {
    return <span className={cx(styles.badge, styles.soon)} aria-label="Bald im App Store">{inner}</span>
  }
  return (
    <a href={href} className={styles.badge} aria-label="Im App Store laden">
      {inner}
    </a>
  )
}

export function PlayBadge({ href, soon = false }: { href?: string; soon?: boolean }) {
  const inner = (
    <>
      <PlayMark />
      <span className={styles.badgeLines}>
        <span className={styles.badgeSmall}>{soon ? 'Bald bei' : 'Jetzt bei'}</span>
        <span className={styles.badgeBig}>Google Play</span>
      </span>
    </>
  )
  if (soon || !href) {
    return <span className={cx(styles.badge, styles.soon)} aria-label="Bald bei Google Play">{inner}</span>
  }
  return (
    <a href={href} className={styles.badge} aria-label="Bei Google Play laden">
      {inner}
    </a>
  )
}

/**
 * Beide Badges nebeneinander. Android erscheint ausgegraut, solange es
 * keinen Play-Store-Link gibt – so weiß jeder, dass es kommt.
 */
export function StoreBadges({
  appStoreUrl,
  playStoreUrl,
  androidHinweis = true,
  className,
}: {
  appStoreUrl: string
  playStoreUrl: string
  androidHinweis?: boolean
  className?: string
}) {
  return (
    <div className={cx(styles.badges, className)}>
      <AppStoreBadge href={appStoreUrl} />
      {playStoreUrl ? <PlayBadge href={playStoreUrl} /> : androidHinweis && <PlayBadge soon />}
    </div>
  )
}
