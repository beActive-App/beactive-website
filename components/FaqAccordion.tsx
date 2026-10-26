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
    <div className="border-t border-line">
      {faqs.map((faq, i) => {
        const open = openIndex === i;
        return (
          <div key={faq.q} className="border-b border-line">
            <button
              type="button"
              className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : i)}
            >
              <span className="font-display text-lg font-bold tracking-[-0.01em] text-ink transition-colors group-hover:text-accent">
                {faq.q}
              </span>
              <span className="relative h-5 w-5 flex-shrink-0" aria-hidden="true">
                <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-lime" />
                <span
                  className={`absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-lime transition-transform duration-300 ${
                    open ? "rotate-90" : ""
                  }`}
                />
              </span>
            </button>
            <div
              className={`overflow-hidden transition-[max-height] duration-300 ${
                open ? "max-h-[480px]" : "max-h-0"
              }`}
            >
              <p className="pb-6 pr-10 text-[15px] leading-relaxed text-ink-soft">
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
        );
      })}
    </div>
  );
}
