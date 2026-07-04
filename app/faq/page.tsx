import FaqAccordion from "@/components/FaqAccordion";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ – BeActive",
  description: "Häufig gestellte Fragen zur BeActive App",
};

export default function FaqPage() {
  return (
    <>
      <section className="bg-[#2D3E2D] text-[#E8E3D3] py-24">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.35em] mb-5 opacity-50">
            Fragen &amp; Antworten
          </p>
          <h1 className="font-serif text-6xl md:text-8xl font-black leading-none">
            FAQ
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#E8E3D3]">
        <div className="max-w-4xl mx-auto px-6">
          <FaqAccordion />
        </div>
      </section>
    </>
  );
}
