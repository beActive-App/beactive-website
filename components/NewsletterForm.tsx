"use client";

import { useState } from "react";
import { SUPPORT_EMAIL } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";

export default function NewsletterForm({ quelle = "warteliste" }: { quelle?: string }) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot, bleibt bei Menschen leer
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const validate = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(email)) {
      setError("Bitte gib eine gültige E-Mail-Adresse ein.");
      return;
    }
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/warteliste", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, quelle, website }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
    } catch {
      setStatus("error");
      setError(
        `Das hat gerade nicht geklappt. Schreib uns kurz an ${SUPPORT_EMAIL}, dann tragen wir dich von Hand ein.`,
      );
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-4">
        <p className="font-serif text-4xl font-bold text-[#E8E3D3] mb-3">Danke!</p>
        <p className="text-[#E8E3D3] opacity-60">Wir melden uns, sobald es losgeht.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row" noValidate>
        <div aria-hidden="true" className="absolute w-px h-px -left-[9999px] overflow-hidden">
          <label htmlFor="nl-website">Website (bitte frei lassen)</label>
          <input
            id="nl-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          placeholder="deine@email.de"
          aria-label="E-Mail-Adresse"
          className="flex-1 px-6 py-4 bg-transparent border border-[#E8E3D3]/40 text-[#E8E3D3] placeholder:text-[#E8E3D3]/30 focus:outline-none focus:border-[#E8E3D3] transition-colors text-sm"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-[#E8E3D3] text-[#2D3E2D] px-8 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors whitespace-nowrap disabled:opacity-60"
        >
          {status === "sending" ? "Moment…" : "Eintragen"}
        </button>
      </form>
      {error && <p className="text-red-300 text-xs mt-3">{error}</p>}
      <p className="text-[#E8E3D3]/40 text-xs mt-4">
        Nur Neuigkeiten zum Start, kein Newsletter-Spam. Austragen jederzeit per Mail.
      </p>
    </div>
  );
}
