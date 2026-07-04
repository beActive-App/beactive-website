"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validate = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !validate(email)) {
      setError("Bitte gib eine gültige E-Mail-Adresse ein.");
      return;
    }
    console.log("Newsletter-Anmeldung:", {
      email,
      to: "support@beactiveapp.de",
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-4">
        <p className="font-serif text-4xl font-bold text-[#E8E3D3] mb-3">
          Danke!
        </p>
        <p className="text-[#E8E3D3] opacity-60">
          Wir melden uns bald bei dir.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          placeholder="deine@email.de"
          className="flex-1 px-6 py-4 bg-transparent border border-[#E8E3D3]/40 text-[#E8E3D3] placeholder:text-[#E8E3D3]/30 focus:outline-none focus:border-[#E8E3D3] transition-colors text-sm"
        />
        <button
          type="submit"
          className="bg-[#E8E3D3] text-[#2D3E2D] px-8 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors whitespace-nowrap"
        >
          Jetzt folgen
        </button>
      </form>
      {error && (
        <p className="text-red-300 text-xs mt-3">{error}</p>
      )}
    </div>
  );
}
