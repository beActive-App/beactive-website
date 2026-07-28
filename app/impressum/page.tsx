import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum – BeActive",
  description: "Impressum der BeActive App UG (haftungsbeschränkt) i.G.",
};

// TODO: drop "i.G." and add the HRB number here once the UG is entered in the Handelsregister.
// TODO: add a VAT ID section once the tax office has assigned one (or a Kleinunternehmerregelung notice per § 19 UStG).
const sections = [
  {
    title: "Angaben gemäß § 5 DDG",
    lines: ["BeActive App UG (haftungsbeschränkt) i.G.", "Albrechtstraße 3", "72072 Tübingen"],
  },
  {
    title: "Vertreten durch",
    lines: ["Philipp Gerberding (Geschäftsführer)"],
  },
  {
    title: "Register",
    lines: [
      "Die Gesellschaft befindet sich in Gründung.",
      "Die Eintragung in das Handelsregister beim Amtsgericht Stuttgart wurde beantragt.",
    ],
  },
  {
    title: "Kontakt",
    lines: ["Telefon: +49 176 22527378", "E-Mail: support@beactiveapp.de"],
  },
  {
    title: "Verbraucherstreitbeilegung/Universalschlichtungsstelle",
    lines: [
      "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    ],
  },
];

export default function ImpressumPage() {
  return (
    <>
      <section className="bg-[#2D3E2D] text-[#E8E3D3] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.35em] mb-5 opacity-50">
            Rechtliches
          </p>
          <h1 className="font-serif text-6xl md:text-8xl font-black leading-none">
            Impressum
          </h1>
        </div>
      </section>

      <section className="py-24 bg-[#E8E3D3]">
        <div className="max-w-3xl mx-auto px-6 space-y-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-serif text-xl font-bold mb-3 text-[#2D3E2D]">
                {section.title}
              </h2>
              <div className="text-[#2D3E2D] opacity-70 text-[15px] leading-relaxed space-y-1">
                {section.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
