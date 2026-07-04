import NewsletterForm from "@/components/NewsletterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter – BeActive",
  description:
    "Bleib auf dem Laufenden – abonniere den BeActive Newsletter und gestalte die App mit.",
};

const benefits = [
  {
    title: "Exklusiver Early Access",
    desc: "Als einer der Ersten die App testen, bevor sie öffentlich ist.",
  },
  {
    title: "Mitgestalten",
    desc: "Dein Feedback fließt direkt in die Entwicklung der App ein.",
  },
  {
    title: "Community",
    desc: "Teil einer aktiven Bewegung werden und andere motivieren.",
  },
];

export default function NewsletterPage() {
  return (
    <>
      <section className="min-h-[70vh] bg-[#2D3E2D] text-[#E8E3D3] flex items-center">
        <div className="max-w-4xl mx-auto px-6 py-24 w-full text-center">
          <p className="text-xs uppercase tracking-[0.35em] mb-6 opacity-50">
            Bleib dabei
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-8">
            Lass uns gemeinsam
            <br />
            die App gestalten
          </h1>
          <p className="opacity-60 text-lg mb-14 max-w-xl mx-auto leading-relaxed">
            Sei unter den Ersten, die BeActive kennenlernen. Wir halten dich
            über den Launch, neue Features und Events auf dem Laufenden.
          </p>
          <NewsletterForm />
        </div>
      </section>

      <section className="py-20 bg-[#E8E3D3]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#2D3E2D]/10">
            {benefits.map((b) => (
              <div key={b.title} className="bg-[#E8E3D3] p-10">
                <h3 className="font-serif text-xl font-bold mb-3 text-[#2D3E2D]">
                  {b.title}
                </h3>
                <p className="text-sm text-[#2D3E2D] opacity-55 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
