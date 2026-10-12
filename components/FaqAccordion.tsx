"use client";

import Link from "next/link";
import { useState } from "react";
import { faqListe } from "@/lib/faq";
import { IST_GESTARTET } from "@/lib/site";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = faqListe(IST_GESTARTET);

  return (
    <div className="divide-y divide-[#2D3E2D]/15">
      {faqs.map((faq, i) => (
        <div key={faq.q}>
          <button
            className="w-full py-7 flex items-start justify-between gap-6 text-left group"
            aria-expanded={openIndex === i}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span className="font-serif text-xl md:text-2xl font-bold text-[#2D3E2D] group-hover:opacity-60 transition-opacity leading-snug">
              {faq.q}
            </span>
            <span
              className={`text-[#2D3E2D] text-3xl font-thin flex-shrink-0 mt-0.5 transition-transform duration-300 ${
                openIndex === i ? "rotate-45" : ""
              }`}
              aria-hidden="true"
            >
              +
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === i ? "max-h-96 pb-7" : "max-h-0"
            }`}
          >
            <p className="text-[#2D3E2D] opacity-60 leading-relaxed text-[15px]">
              {faq.a}
              {faq.link && (
                <>
                  {" "}
                  <Link href={faq.link.href} className="underline hover:no-underline">
                    {faq.link.text}
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
