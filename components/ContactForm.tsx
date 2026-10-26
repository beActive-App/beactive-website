"use client";

import { useState } from "react";
import { SUPPORT_EMAIL } from "@/lib/site";

type Fields = {
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  nachricht: string;
};

type Errors = Partial<Fields>;
type Status = "idle" | "sending" | "success" | "error";

const empty: Fields = {
  vorname: "",
  nachname: "",
  email: "",
  telefon: "",
  nachricht: "",
};

function inputClass(error?: string) {
  return `field ${error ? "field-error" : ""}`;
}

export default function ContactForm() {
  const [form, setForm] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [website, setWebsite] = useState(""); // Honeypot, bleibt bei Menschen leer
  const [sendError, setSendError] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }
    setSendError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
    } catch {
      setStatus("error");
      setSendError(
        `Das hat gerade nicht geklappt – wir wollen dir nicht vorgaukeln, dass die Nachricht angekommen ist. Schreib uns bitte direkt an ${SUPPORT_EMAIL}.`,
      );
    }
  };

  if (status === "success") {
    return (
      <div className="py-16 text-center">
        <p className="mb-3 font-display text-4xl font-extrabold text-ink">Vielen Dank!</p>
        <p className="text-lg text-ink-soft">Wir melden uns schnellstmöglich bei dir.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="kf-website">Website (bitte frei lassen)</label>
        <input
          id="kf-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="kf-vorname" className="label">Vorname</label>
          <input
            id="kf-vorname"
            type="text"
            name="vorname"
            value={form.vorname}
            onChange={handleChange}
            placeholder="Max"
            autoComplete="given-name"
            className={inputClass(errors.vorname)}
          />
          {errors.vorname && <p className="mt-1 text-xs text-rose">{errors.vorname}</p>}
        </div>
        <div>
          <label htmlFor="kf-nachname" className="label">Nachname</label>
          <input
            id="kf-nachname"
            type="text"
            name="nachname"
            value={form.nachname}
            onChange={handleChange}
            placeholder="Mustermann"
            autoComplete="family-name"
            className={inputClass(errors.nachname)}
          />
          {errors.nachname && <p className="mt-1 text-xs text-rose">{errors.nachname}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="kf-email" className="label">E-Mail</label>
        <input
          id="kf-email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="max@email.de"
          autoComplete="email"
          className={inputClass(errors.email)}
        />
        {errors.email && <p className="mt-1 text-xs text-rose">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="kf-telefon" className="label">
          Telefon <span className="normal-case tracking-normal opacity-60">(optional)</span>
        </label>
        <input
          id="kf-telefon"
          type="tel"
          name="telefon"
          value={form.telefon}
          onChange={handleChange}
          placeholder="+49 123 456789"
          autoComplete="tel"
          className={inputClass()}
        />
      </div>

      <div>
        <label htmlFor="kf-nachricht" className="label">Nachricht</label>
        <textarea
          id="kf-nachricht"
          name="nachricht"
          value={form.nachricht}
          onChange={handleChange}
          rows={6}
          placeholder="Deine Ideen, Feedback oder Fragen …"
          className={`${inputClass(errors.nachricht)} resize-none`}
        />
        {errors.nachricht && <p className="mt-1 text-xs text-rose">{errors.nachricht}</p>}
      </div>

      {sendError && <p className="text-sm text-rose">{sendError}</p>}

      <div>
        <button type="submit" disabled={status === "sending"} className="btn">
          {status === "sending" ? "Wird gesendet…" : "Nachricht senden"}
        </button>
      </div>
    </form>
  );
}
