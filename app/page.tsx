'use client'

import { useState, useEffect, useRef } from 'react'

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

const teamMembers = [
  { name: 'Albin Schroeder', role: 'Gründer', initial: 'A' },
  { name: 'Tomas Fananas-Hernandez', role: 'Gründer', initial: 'T' },
  { name: 'Philipp Gerberding', role: 'Gründer', initial: 'P' },
  { name: 'Helena Mohr', role: 'Marketingleiterin', initial: 'H' },
]

const features = [
  {
    icon: '📍',
    title: 'Entdecke Events',
    desc: 'Finde spannende Veranstaltungen in deiner Nähe – egal ob Sport, Kultur oder Musik.',
  },
  {
    icon: '👥',
    title: 'Finde neue Freunde',
    desc: 'Vernetze dich mit Menschen, die dieselben Interessen teilen wie du.',
  },
  {
    icon: '✨',
    title: 'Mach deine Freizeit lebendig',
    desc: 'Verwandl langweilige Abende in unvergessliche Erlebnisse.',
  },
  {
    icon: '🎯',
    title: 'Alles an einem Ort',
    desc: 'Sport, Kultur, Events, Produktivität – alles in einer App.',
  },
]

export default function ComingSoonPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const emailSection = useInView()
  const featuresSection = useInView()
  const teamSection = useInView()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)

    setTimeout(() => {
      const stored = JSON.parse(localStorage.getItem('beactive_waitlist') || '[]')
      stored.push({ email, date: new Date().toISOString() })
      localStorage.setItem('beactive_waitlist', JSON.stringify(stored))
      console.log('BeActive waitlist:', email)
      setSubmitted(true)
      setLoading(false)
    }, 800)
  }

  return (
    <main className="min-h-screen bg-[#E8E3D3] text-[#2D3E2D] overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#E8E3D3] to-[#ddd8c4] pointer-events-none" />

        {/* Logo */}
        <p className="relative z-10 font-sans text-sm tracking-[0.4em] uppercase text-[#2D3E2D]/50 mb-10">
          BeActive App
        </p>

        {/* Pulse / Spinner */}
        <div className="relative z-10 mb-12">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 rounded-full border border-[#2D3E2D]/15 animate-ping" />
            <div className="absolute inset-0 rounded-full border-2 border-[#2D3E2D]/10" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#2D3E2D]/60 animate-spin" />
            <div className="absolute inset-4 rounded-full bg-[#2D3E2D]/6" />
          </div>
        </div>

        {/* Headline */}
        <h1 className="relative z-10 font-serif text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] mb-6 max-w-4xl">
          BeActive –<br />
          <span className="text-[#2D3E2D]/55">Entdecke Events</span><br />
          <span className="text-[#2D3E2D]/55">in deiner Nähe</span>
        </h1>

        {/* Coming Soon Badge */}
        <div className="relative z-10 mt-2">
          <span className="inline-block border border-[#2D3E2D]/40 px-7 py-2.5 text-xs tracking-[0.35em] uppercase font-sans font-semibold">
            Coming Soon
          </span>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce opacity-40">
          <div className="w-5 h-9 rounded-full border-2 border-[#2D3E2D] flex items-start justify-center pt-1.5">
            <div className="w-0.5 h-2 bg-[#2D3E2D] rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────── */}
      <section
        ref={featuresSection.ref as React.RefObject<HTMLElement>}
        className={`py-28 px-6 transition-all duration-700 delay-100 ${
          featuresSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-4">
            Was dich erwartet
          </h2>
          <p className="font-sans text-center text-[#2D3E2D]/50 mb-16 text-base">
            BeActive bringt dein Sozialleben auf das nächste Level
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-[#2D3E2D]/15">
            {features.map((f, i) => (
              <div
                key={i}
                className="p-8 border-r border-b border-[#2D3E2D]/15 last:border-r-0 hover:bg-[#2D3E2D]/5 transition-colors duration-300 group"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="text-2xl mb-5">{f.icon}</div>
                <h3 className="font-serif text-lg font-bold mb-3">{f.title}</h3>
                <p className="font-sans text-sm text-[#2D3E2D]/55 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────────── */}
      <section
        ref={teamSection.ref as React.RefObject<HTMLElement>}
        className={`py-28 px-6 bg-[#2D3E2D]/[0.04] transition-all duration-700 delay-150 ${
          teamSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Das Team</h2>
          <p className="font-sans text-[#2D3E2D]/50 mb-16 text-base">
            Hinter BeActive steckt ein junges, motiviertes Team
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {teamMembers.map((m, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-[#2D3E2D] flex items-center justify-center ring-4 ring-[#2D3E2D]/10">
                  <span className="font-serif text-2xl font-black text-[#E8E3D3]">{m.initial}</span>
                </div>
                <div className="text-center">
                  <p className="font-serif font-bold text-base leading-snug">{m.name}</p>
                  <p className="font-sans text-xs text-[#2D3E2D]/50 mt-1 tracking-wide">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMAIL CAPTURE ────────────────────────────────────────── */}
      <section
        ref={emailSection.ref as React.RefObject<HTMLElement>}
        className={`py-28 px-6 bg-[#2D3E2D] text-[#E8E3D3] transition-all duration-700 ${
          emailSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Sei der Erste,<br />der es erfährt
          </h2>
          <p className="font-sans text-[#E8E3D3]/60 mb-12 text-base md:text-lg leading-relaxed">
            Trag deine E-Mail ein und wir benachrichtigen dich,<br className="hidden md:block" />
            sobald BeActive startet.
          </p>

          {submitted ? (
            <div className="flex flex-col items-center gap-5">
              <div className="w-16 h-16 rounded-full border-2 border-[#E8E3D3]/60 flex items-center justify-center">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-serif text-2xl font-bold">Danke! Wir melden uns.</p>
              <p className="font-sans text-sm text-[#E8E3D3]/50">
                Du wirst einer der Ersten sein, die BeActive erleben.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="deine@email.de"
                required
                className="flex-1 bg-transparent border border-[#E8E3D3]/25 px-5 py-3.5 font-sans text-sm text-[#E8E3D3] placeholder-[#E8E3D3]/25 focus:outline-none focus:border-[#E8E3D3]/60 transition-colors rounded-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#E8E3D3] text-[#2D3E2D] px-8 py-3.5 font-sans font-bold text-xs tracking-[0.25em] uppercase hover:bg-white transition-colors disabled:opacity-40 whitespace-nowrap"
              >
                {loading ? '···' : 'Notify Me'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="py-10 px-6 bg-[#2D3E2D] text-[#E8E3D3]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 text-sm font-sans">
          <span className="font-serif text-lg font-bold tracking-widest uppercase">BeActive</span>

          <div className="flex items-center gap-6 text-[#E8E3D3]/50">
            <a
              href="https://instagram.com/beactiveapp"
              className="hover:text-[#E8E3D3] transition-colors"
            >
              Instagram
            </a>
            <a
              href="mailto:support@beactiveapp.de"
              className="hover:text-[#E8E3D3] transition-colors"
            >
              support@beactiveapp.de
            </a>
          </div>

          <p className="text-[#E8E3D3]/30 text-xs">
            © {new Date().getFullYear()} BeActive App. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>

    </main>
  )
}
