import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/site/PageHeader";
import { INSTAGRAM_URL, PARTNER_EMAIL, SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Schreib dem beActive Team – wir freuen uns über dein Feedback.",
};

const wege = [
  { label: "Support & Feedback", wert: SUPPORT_EMAIL, href: `mailto:${SUPPORT_EMAIL}` },
  { label: "Für Betriebe", wert: PARTNER_EMAIL, href: `mailto:${PARTNER_EMAIL}` },
  { label: "Instagram", wert: "@beactive_app", href: INSTAGRAM_URL },
];

export default function KontaktPage() {
  return (
    <>
      <PageHeader
        eyebrow="Schreib uns"
        title="Kontakt"
        lede="Ideen, Feedback, Fragen? Antwort kommt von einem von uns – nicht von einem Roboter."
      />

      <section className="py-16 md:py-24">
        <div className="wrap">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
            <div>
              <h2 className="text-2xl">Lass uns reden</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                Hast du Ideen, Feedback oder Fragen? Wir freuen uns, von dir zu hören – und bauen die App mit dem weiter, was ihr uns sagt.
              </p>
              <ul className="mt-8 flex flex-col gap-5">
                {wege.map((w) => (
                  <li key={w.label}>
                    <p className="label !mb-1">{w.label}</p>
                    <a
                      href={w.href}
                      className="text-ink underline underline-offset-4 hover:text-accent"
                      {...(w.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {w.wert}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-2">
              <div className="card p-6 sm:p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
