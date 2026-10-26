import Link from "next/link";
import type { Metadata } from "next";
import FaqAccordion from "@/components/FaqAccordion";
import PageHeader from "@/components/site/PageHeader";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Häufig gestellte Fragen zur beActive App",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fragen & Antworten"
        title="Häufige Fragen"
        lede="Was beActive kostet, wo es läuft, woher die Termine kommen – und was du tun kannst, wenn deine Frage nicht dabei ist."
      />
      <section className="py-16 md:py-24">
        <div className="wrap max-w-[760px]">
          <FaqAccordion />
          <p className="mt-10 text-center text-ink-soft">
            Noch was offen?{" "}
            <Link href="/kontakt" className="text-accent underline underline-offset-4">
              Schreib uns.
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
