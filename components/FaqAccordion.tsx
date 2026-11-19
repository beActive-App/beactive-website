"use client";

import Link from "next/link";
import { useState } from "react";
import { faqListe } from "@/lib/faq";
import { useLaunch } from "@/components/site/LaunchContext";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { istGestartet } = useLaunch();
  const faqs = faqListe(istGestartet);

  return (
    <div className="flex flex-col gap-2.5">
      {faqs.map((faq, i) => {
        const open = openIndex === i;
        return (
          <div key={faq.q} className="rounded-2xl border border-line bg-raised px-[22px]">
            <button
              type="button"
              className="group flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left transition-opacity duration-100 active:opacity-70"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : i)}
            >
              <span className="font-display text-[17.5px] font-bold tracking-[-0.01em] text-ink transition-colors group-hover:text-accent">
                {faq.q}
              </span>
              <span className="relative h-5 w-5 flex-shrink-0" aria-hidden="true">
                <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-lime" />
                <span
                  className={`absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-lime transition-transform duration-300 motion-reduce:transition-none ${
                    open ? "rotate-90" : ""
                  }`}
                />
              </span>
            </button>
            {/* Die Antwort klappt über eine Rasterzeile auf (0fr → 1fr). So läuft
                die Bewegung genau über die echte Höhe des Textes – bei einer
                festen Maximalhöhe wäre sie bei kurzen Antworten zu schnell
                und beim Schließen erst verzögert sichtbar. */}
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
              inert={!open}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="pb-[22px] pr-8 text-base leading-[1.65] text-ink-soft">
                  {faq.a}
                  {faq.link && (
                    <>
                      {" "}
                      <Link href={faq.link.href} className="text-accent underline underline-offset-4">
                        {faq.link.text}
                      </Link>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
