import styles from './Site.module.css'

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/** Kopf einer Unterseite: Beschriftung, Titel, optional Text und Knöpfe. */
export default function PageHeader({
  eyebrow,
  title,
  lede,
  center = false,
  children,
  extra,
}: {
  eyebrow: string
  title: React.ReactNode
  lede?: React.ReactNode
  center?: boolean
  children?: React.ReactNode
  /** Inhalt unter den Knöpfen, z. B. Fakten-Kacheln. */
  extra?: React.ReactNode
}) {
  return (
    <section className={cx(styles.pageHead, center && styles.center)}>
      <div className="wrap">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {lede && <p className={styles.lede}>{lede}</p>}
        {children && <div className={styles.actions}>{children}</div>}
        {extra}
      </div>
    </section>
  )
}
