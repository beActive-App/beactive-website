"use client";

import Link from "next/link";
import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full px-5 py-4 bg-transparent border border-[#2D3E2D]/25 text-[#2D3E2D] placeholder:text-[#2D3E2D]/35 focus:outline-none focus:border-[#2D3E2D] transition-colors text-sm";

const labelClass =
  "block text-xs uppercase tracking-[0.2em] text-[#2D3E2D]/50 mb-2";

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
      <div className="border border-[#2D3E2D]/25 p-10">
        <p className="font-serif text-3xl font-bold text-[#2D3E2D] mb-3">
          Angekommen.
        </p>
        <p className="text-[#2D3E2D]/60 text-[15px] leading-relaxed">
          Wir melden uns innerhalb von zwei Tagen und schlagen zwei Termine vor.
          Wenn es schneller gehen soll: <strong>partner@beactiveapp.de</strong>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot: für Menschen unsichtbar, Bots füllen ihn aus. */}
      <div aria-hidden="true" className="absolute w-px h-px -left-[9999px] overflow-hidden">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="betrieb" className={labelClass}>
            Betrieb *
          </label>
          <input
            id="betrieb"
            value={betrieb}
            onChange={(e) => setBetrieb(e.target.value)}
            placeholder="Café Beispiel"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="name" className={labelClass}>
            Ansprechpartner:in *
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Vor- und Nachname"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="kontakt" className={labelClass}>
          E-Mail oder Telefon *
        </label>
        <input
          id="kontakt"
          value={kontakt}
          onChange={(e) => setKontakt(e.target.value)}
          placeholder="Wie erreichen wir euch?"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="randzeit" className={labelClass}>
          Wann ist bei euch am wenigsten los?
        </label>
        <input
          id="randzeit"
          value={randzeit}
          onChange={(e) => setRandzeit(e.target.value)}
          placeholder="z. B. Dienstag und Mittwoch nachmittags"
          className={inputClass}
        />
        <p className="text-xs text-[#2D3E2D]/40 mt-2">
          Die wichtigste Frage. Genau dieses Zeitfenster füllen wir.
        </p>
      </div>

      <div>
        <label htmlFor="nachricht" className={labelClass}>
          Noch etwas?
        </label>
        <textarea
          id="nachricht"
          value={nachricht}
          onChange={(e) => setNachricht(e.target.value)}
          rows={4}
          placeholder="Fragen, Bedenken, Terminwünsche"
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && <p className="text-sm text-[#8c2f2f]">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full sm:w-auto bg-[#2D3E2D] text-[#E8E3D3] px-10 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#1e2e1e] transition-colors disabled:opacity-50"
      >
        {status === "sending" ? "Wird gesendet…" : "Termin vorschlagen"}
      </button>

      <p className="text-xs text-[#2D3E2D]/40 leading-relaxed">
        Wir nutzen eure Angaben ausschließlich, um uns bei euch zu melden.
        Keine Weitergabe, kein Newsletter. Details in der{" "}
        <Link href="/datenschutz" className="underline hover:no-underline">
          Datenschutzerklärung
        </Link>
        .
      </p>
    </form>
  );
}
