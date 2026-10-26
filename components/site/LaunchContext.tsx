'use client'

import { createContext, useContext, useMemo, useSyncExternalStore } from 'react'
import { usePathname } from 'next/navigation'
import { APP_STORE_URL, IST_GESTARTET, PLAY_STORE_URL, VORSCHAU_PARAM } from '@/lib/site'
import styles from './Site.module.css'

export type Launch = {
  /** App ist im App Store (oder die Vorschau tut so). */
  istGestartet: boolean
  appStoreUrl: string
  playStoreUrl: string
  /** Browser-Vorschau per ?vorschau=… aktiv – Links führen ins Leere. */
  vorschau: 'app' | 'warteliste' | null
}

const standard: Launch = {
  istGestartet: IST_GESTARTET,
  appStoreUrl: APP_STORE_URL,
  playStoreUrl: PLAY_STORE_URL,
  vorschau: null,
}

const LaunchCtx = createContext<Launch>(standard)

export function useLaunch() {
  return useContext(LaunchCtx)
}

/**
 * Stellt allen Seiten den Launch-Stand bereit. Die Vorschau per
 * Adress-Parameter wird erst im Browser ausgewertet, damit die gecachte
 * Seite für alle gleich bleibt.
 */
// Der Adress-Parameter ist für React eine „externe“ Quelle: Auf dem Server
// gibt es ihn nicht, im Browser wird er nach dem Hydrieren einmal gelesen.
function subscribe(callback: () => void) {
  window.addEventListener('popstate', callback)
  return () => window.removeEventListener('popstate', callback)
}
function leseParam() {
  return new URLSearchParams(window.location.search).get(VORSCHAU_PARAM)
}
function leseParamServer() {
  return null
}

export function LaunchProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const param = useSyncExternalStore(subscribe, leseParam, leseParamServer)
  const vorschau: Launch['vorschau'] =
    param === 'app' && !IST_GESTARTET ? 'app' : param === 'warteliste' && IST_GESTARTET ? 'warteliste' : null

  const value = useMemo<Launch>(() => {
    if (vorschau === 'app') {
      return { istGestartet: true, appStoreUrl: APP_STORE_URL || '#app-store', playStoreUrl: PLAY_STORE_URL, vorschau }
    }
    if (vorschau === 'warteliste') {
      return { istGestartet: false, appStoreUrl: '', playStoreUrl: '', vorschau }
    }
    return standard
  }, [vorschau])

  return (
    <LaunchCtx.Provider value={value}>
      {vorschau && (
        <div className={styles.vorschau} role="status">
          <span className={styles['vorschau-dot']} />
          <span>
            Vorschau: {vorschau === 'app' ? 'so sieht die Seite nach dem App-Store-Start aus.' : 'so sah die Seite vor dem Start aus.'}
          </span>
          <a href={pathname || '/'}>Vorschau beenden</a>
        </div>
      )}
      {children}
    </LaunchCtx.Provider>
  )
}
