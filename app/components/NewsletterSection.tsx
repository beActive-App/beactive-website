"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Bitte gib eine gültige E-Mail-Adresse ein.");
      return;
    }
    const updated = [...emails, email];
    setEmails(updated);
    console.log("Newsletter-Anmeldungen:", updated);
    setError("");
    setEmail("");
    setSubmitted(true);
  };

  return (
    <section id="newsletter" className="py-28 bg-[#C5E74D]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.35em] text-black/50 mb-5 font-semibold">
          Community
        </p>
        <h2 className="font-serif font-black text-black leading-tight mb-6"
          style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}>
          Lass uns gemeinsam
          <br />
          die App gestalten
        </h2>
        <p className="text-black/65 text-lg mb-14 max-w-xl mx-auto leading-relaxed">
          Fülle das Formular aus und wir zeigen dir, wie deine App zur Zukunft
          wird.
        </p>

        {submitted ? (
          <div>
            <p className="font-serif text-4xl font-black text-black mb-3">
              Danke!
            </p>
            <p className="text-black/60 mb-8">
              Wir melden uns bald bei dir.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-[11px] uppercase tracking-[0.2em] font-semibold text-black/50 hover:text-black transition-colors underline underline-offset-4"
            >
              Weitere E-Mail eintragen
            </button>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} noValidate className="flex flex-col sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="deine@email.de"
                className="flex-1 px-5 py-4 bg-white/60 border border-black/15 text-black placeholder:text-black/35 focus:outline-none focus:bg-white focus:border-black/40 transition-all text-sm"
              />
              <button
                type="submit"
                className="bg-[#2D3E2D] text-white px-7 py-4 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#1e2e1e] active:scale-[0.98] transition-all whitespace-nowrap"
              >
                Jetzt folgen
              </button>
            </form>
            {error && (
              <p className="text-red-700 text-xs mt-3 text-left">{error}</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
