"use client";

import Link from "next/link";
import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function PartnerForm() {
  const [betrieb, setBetrieb] = useState("");
  const [name, setName] = useState("");
  const [kontakt, setKontakt] = useState("");
  const [randzeit, setRandzeit] = useState("");
  const [nachricht, setNachricht] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot, bleibt bei Menschen leer
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!betrieb.trim() || !name.trim() || !kontakt.trim()) {
      setError("Betrieb, Name und eine Kontaktmöglichkeit brauchen wir.");
      return;
    }

    setError("");
    setStatus("sending");

    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          betrieb,
          name,
          kontakt,
          randzeit,
          nachricht,
          website,
        }),
      });

      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
    } catch {
      setStatus("error");
      setError(
        "Das hat gerade nicht geklappt – und wir wollen euch nicht vorgaukeln, dass die Anfrage angekommen ist. Schreibt uns bitte kurz direkt an partner@beactiveapp.de, wir melden uns dann sofort.",
      );
    }
  };

  if (status === "success") {
    return (
      <div className="card p-8">
        <p className="mb-3 font-display text-3xl font-extrabold text-ink">Angekommen.</p>
        <p className="text-[15px] leading-relaxed text-ink-soft">
          Wir melden uns innerhalb von zwei Tagen und schlagen zwei Termine vor.
          Wenn es schneller gehen soll: <strong className="text-ink">partner@beactiveapp.de</strong>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Honeypot: für Menschen unsichtbar, Bots füllen ihn aus. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website (bitte frei lassen)</label>
        <input
          id="website"
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
          <label htmlFor="betrieb" className="label">Betrieb *</label>
          <input
            id="betrieb"
            value={betrieb}
            onChange={(e) => setBetrieb(e.target.value)}
            placeholder="Café Beispiel"
            autoComplete="organization"
            className="field"
          />
        </div>
        <div>
          <label htmlFor="name" className="label">Ansprechpartner:in *</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Vor- und Nachname"
            autoComplete="name"
            className="field"
          />
        </div>
      </div>

      <div>
        <label htmlFor="kontakt" className="label">E-Mail oder Telefon *</label>
        <input
          id="kontakt"
          value={kontakt}
          onChange={(e) => setKontakt(e.target.value)}
          placeholder="Wie erreichen wir euch?"
          className="field"
        />
      </div>

      <div>
        <label htmlFor="randzeit" className="label">Wann ist bei euch am wenigsten los?</label>
        <input
          id="randzeit"
          value={randzeit}
          onChange={(e) => setRandzeit(e.target.value)}
          placeholder="z. B. Dienstag und Mittwoch nachmittags"
          className="field"
        />
        <p className="mt-2 text-xs text-ink-soft">
          Die wichtigste Frage. Genau dieses Zeitfenster füllen wir.
        </p>
      </div>

      <div>
        <label htmlFor="nachricht" className="label">Noch etwas?</label>
        <textarea
          id="nachricht"
          value={nachricht}
          onChange={(e) => setNachricht(e.target.value)}
          rows={4}
          placeholder="Fragen, Bedenken, Terminwünsche"
          className="field resize-none"
        />
      </div>

      {error && <p className="text-sm text-rose">{error}</p>}

      <div>
        <button type="submit" disabled={status === "sending"} className="btn w-full sm:w-auto">
          {status === "sending" ? "Wird gesendet…" : "Termin vorschlagen"}
        </button>
      </div>

      <p className="text-xs leading-relaxed text-ink-soft">
        Wir nutzen eure Angaben ausschließlich, um uns bei euch zu melden.
        Keine Weitergabe, kein Newsletter. Details in der{" "}
        <Link href="/datenschutz" className="text-accent underline underline-offset-4">
          Datenschutzerklärung
        </Link>
        .
      </p>
    </form>
  );
}
