"use client";

import { useState } from "react";

type Fields = {
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  nachricht: string;
};

type Errors = Partial<Fields>;

const empty: Fields = {
  vorname: "",
  nachname: "",
  email: "",
  telefon: "",
  nachricht: "",
};

function field(error?: string) {
  return `w-full px-4 py-3 bg-transparent border-b ${
    error ? "border-red-500" : "border-black/20"
  } text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors text-sm`;
}

export default function KontaktSection() {
  const [form, setForm] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submissions, setSubmissions] = useState<Fields[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.vorname.trim()) e.vorname = "Vorname erforderlich";
    if (!form.nachname.trim()) e.nachname = "Nachname erforderlich";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Gültige E-Mail erforderlich";
    if (!form.nachricht.trim()) e.nachricht = "Nachricht erforderlich";
    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }
    const updated = [...submissions, { ...form }];
    setSubmissions(updated);
    console.log("Kontakt-Einreichungen:", updated);
    setSubmitted(true);
  };

  return (
    <section id="kontakt" className="py-28 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        {submitted ? (
          <div className="py-16 text-center">
            <p className="font-serif text-5xl font-black text-black mb-4">
              Vielen Dank!
            </p>
            <p className="text-black/55 text-lg mb-10">
              Wir melden uns schnellstmöglich bei dir.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm(empty);
              }}
              className="bg-[#2D3E2D] text-white px-8 py-3 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#1e2e1e] transition-colors"
            >
              Neue Nachricht
            </button>
          </div>
        ) : (
          <>
            <p className="text-[11px] uppercase tracking-[0.35em] text-black/40 mb-5 font-semibold">
              Schreib uns
            </p>
            <h2 className="font-serif text-5xl md:text-6xl font-black text-black mb-3">
              Kontaktiere uns
            </h2>
            <p className="text-sm text-black/40 mb-14">
              support@beactiveapp.de
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-black/45 font-semibold mb-2">
                    Vorname
                  </label>
                  <input
                    type="text"
                    name="vorname"
                    value={form.vorname}
                    onChange={handleChange}
                    placeholder="Max"
                    className={field(errors.vorname)}
                  />
                  {errors.vorname && (
                    <p className="text-red-500 text-xs mt-1.5">
                      {errors.vorname}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-black/45 font-semibold mb-2">
                    Nachname
                  </label>
                  <input
                    type="text"
                    name="nachname"
                    value={form.nachname}
                    onChange={handleChange}
                    placeholder="Mustermann"
                    className={field(errors.nachname)}
                  />
                  {errors.nachname && (
                    <p className="text-red-500 text-xs mt-1.5">
                      {errors.nachname}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.2em] text-black/45 font-semibold mb-2">
                  E-Mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="max@email.de"
                  className={field(errors.email)}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.2em] text-black/45 font-semibold mb-2">
                  Telefon{" "}
                  <span className="normal-case tracking-normal text-black/30 font-normal">
                    (optional)
                  </span>
                </label>
                <input
                  type="tel"
                  name="telefon"
                  value={form.telefon}
                  onChange={handleChange}
                  placeholder="+49 123 456789"
                  className={field()}
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.2em] text-black/45 font-semibold mb-2">
                  App Verbesserung
                </label>
                <textarea
                  name="nachricht"
                  value={form.nachricht}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Deine Ideen, Wünsche oder Feedback..."
                  className={`${field(errors.nachricht)} resize-none border-b`}
                />
                {errors.nachricht && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.nachricht}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="bg-[#2D3E2D] text-white px-12 py-4 text-[11px] uppercase tracking-[0.25em] font-bold hover:bg-[#1e2e1e] active:scale-[0.98] transition-all"
              >
                Senden
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
