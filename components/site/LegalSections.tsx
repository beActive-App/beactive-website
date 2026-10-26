/** Abschnitte einer Rechtsseite: Überschrift, Absätze, optional Liste. */
export type LegalSection = {
  title: string
  lines?: string[]
  paragraphs?: string[]
  list?: string[]
  after?: string[]
}

export default function LegalSections({ sections }: { sections: LegalSection[] }) {
  return (
    <div className="prose-legal flex flex-col gap-12">
      {sections.map((s) => (
        <section key={s.title}>
          <h2>{s.title}</h2>
          <div className="flex flex-col gap-3">
            {s.lines && (
              <p>
                {s.lines.map((line, i) => (
                  <span key={line}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
            )}
            {s.paragraphs?.map((p) => (
              <p key={p} className="whitespace-pre-line">{p}</p>
            ))}
            {s.list && (
              <ul className="list-disc pl-5 flex flex-col gap-1">
                {s.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {s.after?.map((p) => (
              <p key={p} className="whitespace-pre-line">{p}</p>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
