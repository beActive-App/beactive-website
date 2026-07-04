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

function inputClass(error?: string) {
  return `w-full px-4 py-3 bg-transparent border ${
    error ? "border-red-500" : "border-[#2D3E2D]/25"
  } text-[#2D3E2D] placeholder:text-[#2D3E2D]/30 focus:outline-none focus:border-[#2D3E2D] transition-colors text-sm`;
}

export default function ContactForm() {
  const [form, setForm] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
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
    console.log("Kontaktformular:", { ...form, to: "support@beactiveapp.de" });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-20 text-center">
        <p className="font-serif text-5xl font-bold text-[#2D3E2D] mb-4">
          Vielen Dank!
        </p>
        <p className="text-[#2D3E2D] opacity-50 text-lg">
          Wir melden uns schnellstmöglich bei dir.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-[0.2em] mb-2 opacity-50">
            Vorname
          </label>
          <input
            type="text"
            name="vorname"
            value={form.vorname}
            onChange={handleChange}
            placeholder="Max"
            className={inputClass(errors.vorname)}
          />
          {errors.vorname && (
            <p className="text-red-500 text-xs mt-1">{errors.vorname}</p>
          )}
        </div>
        <div>
          <label className="block text-xs uppercase tracking-[0.2em] mb-2 opacity-50">
            Nachname
          </label>
          <input
            type="text"
            name="nachname"
            value={form.nachname}
            onChange={handleChange}
            placeholder="Mustermann"
            className={inputClass(errors.nachname)}
          />
          {errors.nachname && (
            <p className="text-red-500 text-xs mt-1">{errors.nachname}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-[0.2em] mb-2 opacity-50">
          E-Mail
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="max@email.de"
          className={inputClass(errors.email)}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-xs uppercase tracking-[0.2em] mb-2 opacity-50">
          Telefon{" "}
          <span className="normal-case tracking-normal opacity-60">(optional)</span>
        </label>
        <input
          type="tel"
          name="telefon"
          value={form.telefon}
          onChange={handleChange}
          placeholder="+49 123 456789"
          className={inputClass()}
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-[0.2em] mb-2 opacity-50">
          App-Verbesserung / Nachricht
        </label>
        <textarea
          name="nachricht"
          value={form.nachricht}
          onChange={handleChange}
          rows={6}
          placeholder="Deine Ideen, Feedback oder Fragen..."
          className={`${inputClass(errors.nachricht)} resize-none`}
        />
        {errors.nachricht && (
          <p className="text-red-500 text-xs mt-1">{errors.nachricht}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-[#2D3E2D] text-[#E8E3D3] px-12 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#3d5a3d] transition-colors"
      >
        Senden
      </button>
    </form>
  );
}
