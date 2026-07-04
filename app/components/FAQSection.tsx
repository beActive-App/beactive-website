"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Was kann ich mit der App machen?",
    answer:
      "Mit unserer App kannst du produktiv sein und neue Leute kennenlernen, indem du Events erstellst und beitrittst, wobei es egal ist, ob du nur Kaffee trinken gehen willst oder wandern gehen willst.",
  },
  {
    question: "Kann ich auch selber Events erstellen?",
    answer:
      "Klar! Du kannst jederzeit über die Meine Events Seite deine eigenen Events veröffentlichen.",
  },
  {
    question: "Was macht uns so besonders?",
    answer:
      "Unser Team mit jahrelanger Erfahrung in App-Entwicklung hat diese App speziell für dich und deine Freunde entwickelt.",
  },
  {
    question: "Welche Events kann ich erstellen?",
    answer:
      "Du kannst alle Events erstellen die du willst. Das kann Fußball spielen sein, aber auch etwas trinken gehen oder andere Aktivitäten die du in deiner Freizeit machst.",
  },
  {
    question: "Kann ich meine Freunde zu meinem Event einladen?",
    answer:
      "Ja, du kannst Events denen du beigetreten bist oder erstellt hast an deine Freunde teilen, indem du auf das Event drückst und dann teilen.",
  },
  {
    question: "Wo kann ich meine Interessen ändern?",
    answer:
      "Auf der Profil Seite kannst du ohne Probleme deine Interessen unter Profil bearbeiten ändern.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 bg-[#E8E3D3]">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-[11px] uppercase tracking-[0.35em] text-black/40 mb-5 font-semibold">
          Fragen &amp; Antworten
        </p>
        <h2 className="font-serif text-5xl md:text-6xl font-black text-black mb-16">
          FAQ
        </h2>

        <div className="divide-y divide-black/10">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-serif text-lg md:text-xl font-bold text-black group-hover:text-[#2D3E2D] transition-colors leading-snug">
                  {faq.question}
                </span>
                <span
                  className={`text-[1.75rem] font-thin text-black/50 flex-shrink-0 mt-0.5 transition-transform duration-300 leading-none ${
                    openIndex === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === i ? "max-h-48 pb-6" : "max-h-0"
                }`}
              >
                <p className="text-black/65 leading-relaxed text-[15px]">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
