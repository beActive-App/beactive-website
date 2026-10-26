import type { Metadata } from "next";
import NewsletterForm from "@/components/NewsletterForm";
import PageHeader from "@/components/site/PageHeader";

export const metadata: Metadata = {
  title: "Bescheid bekommen",
  description:
    "Trag dich ein und erfahre als Erste:r, wenn beActive im App Store ist – und was sich in der App tut.",
};

const benefits = [
  {
    title: "Zuerst Bescheid",
    desc: "Du erfährst es, sobald die App im Store ist – bevor wir es irgendwo sonst posten.",
  },
  {
    title: "Mitgestalten",
    desc: "Dein Feedback fließt direkt in die Entwicklung ein. Wir bauen die App mit euch, nicht für euch.",
  },
  {
    title: "Kein Spam",
    desc: "Nur Neuigkeiten zum Start und zur App. Austragen jederzeit per Mail.",
  },
];

export default function NewsletterPage() {
  return (
    <>
      <PageHeader
        eyebrow="Bleib dabei"
        title="Nichts verpassen"
        lede="Sei unter den Ersten, die beActive kennenlernen. Wir halten dich über den Start, neue Funktionen und Termine auf dem Laufenden."
        center
        extra={
          <div className="mt-10">
            <NewsletterForm quelle="newsletter-seite" />
          </div>
        }
      />

      <section className="py-16 md:py-24">
        <div className="wrap">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="card p-8">
                <h3 className="text-lg">{b.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
