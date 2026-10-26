"use client";

import { useState } from "react";
import { SUPPORT_EMAIL } from "@/lib/site";
import { useLaunch } from "@/components/site/LaunchContext";
import { StoreBadges } from "@/components/site/StoreBadges";

type Status = "idle" | "sending" | "success" | "error";

export default function NewsletterForm({ quelle = "warteliste" }: { quelle?: string }) {
  const { istGestartet, appStoreUrl, playStoreUrl } = useLaunch();
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

  // Nach dem Start braucht niemand mehr eine Warteliste – direkt in den Store.
  if (istGestartet) {
    return (
      <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-4">
        <p className="text-ink">
          <strong className="font-display">beActive ist da.</strong> Kostenlos im App Store.
        </p>
        <StoreBadges appStoreUrl={appStoreUrl} playStoreUrl={playStoreUrl} />
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="py-4 text-center">
        <p className="mb-3 font-display text-3xl font-extrabold text-ink">Danke!</p>
        <p className="text-ink-soft">Wir melden uns, sobald es losgeht.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row" noValidate>
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
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
          className="field !rounded-[var(--r-btn)] flex-1"
        />
        <button type="submit" disabled={status === "sending"} className="btn whitespace-nowrap">
          {status === "sending" ? "Moment…" : "Eintragen"}
        </button>
      </form>
      {error && <p className="mt-3 text-sm text-rose">{error}</p>}
      <p className="mt-4 text-xs text-ink-soft">
        Nur Neuigkeiten zum Start, kein Newsletter-Spam. Austragen jederzeit per Mail.
      </p>
    </div>
  );
}
