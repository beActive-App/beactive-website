"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Was kann ich mit der App machen?",
    answer:
      "Mit BeActive kannst du lokale Sport-Events entdecken und daran teilnehmen, eigene Events erstellen, Gleichgesinnte in deiner Nähe finden und deine sportlichen Aktivitäten verfolgen. Die App verbindet Sport mit sozialer Community – für ein aktiveres Leben.",
  },
  {
    question: "Kann ich auch selber Events erstellen?",
    answer:
      "Ja! Jeder Nutzer kann eigene Events erstellen. Du legst Sportart, Ort, Zeit und maximale Teilnehmerzahl fest – dann können andere BeActive-Nutzer deinem Event beitreten. Du bestimmst, ob dein Event öffentlich oder nur für eingeladene Personen sichtbar ist.",
  },
  {
    question: "Was macht uns so besonders?",
    answer:
      "BeActive verbindet Sportbegeisterte auf Augenhöhe. Kein kommerzieller Druck, keine bezahlten Events – nur echte Menschen, die gemeinsam aktiv sein wollen. Wir setzen auf Community statt Konsumkultur und entwickeln die App gemeinsam mit unseren Nutzern.",
  },
  {
    question: "Welche Events kann ich erstellen?",
    answer:
      "Du kannst Events für jede Sportart erstellen: Laufen, Radfahren, Yoga, Basketball, Fußball, Wandern, Schwimmen, Volleyball und viele mehr. Auch Fitness-Workouts, Stretching-Sessions oder neue Trendsportarten sind willkommen – deiner Kreativität sind keine Grenzen gesetzt.",
  },
  {
    question: "Kann ich meine Freunde zu meinem Event einladen?",
    answer:
      "Ja! Du kannst einen Einladungslink zu deinem Event teilen oder Freunde direkt über die App einladen. So startest du mit einem vertrauten Kreis und öffnest dein Event optional für neue Teilnehmer aus der Community.",
  },
  {
    question: "Wo kann ich meine Interessen ändern?",
    answer:
      "Deine Interessen und Sportpräferenzen kannst du jederzeit in den Profileinstellungen anpassen. Tippe auf dein Profilbild → Einstellungen → Interessen. So bekommst du immer passende Event-Empfehlungen für dich.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-[#2D3E2D]/15">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            className="w-full py-7 flex items-start justify-between gap-6 text-left group"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span className="font-serif text-xl md:text-2xl font-bold text-[#2D3E2D] group-hover:opacity-60 transition-opacity leading-snug">
              {faq.question}
            </span>
            <span
              className={`text-[#2D3E2D] text-3xl font-thin flex-shrink-0 mt-0.5 transition-transform duration-300 ${
                openIndex === i ? "rotate-45" : ""
              }`}
            >
              +
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === i ? "max-h-60 pb-7" : "max-h-0"
            }`}
          >
            <p className="text-[#2D3E2D] opacity-60 leading-relaxed text-[15px]">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
