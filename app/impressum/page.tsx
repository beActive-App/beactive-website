import type { Metadata } from "next";
import PageHeader from "@/components/site/PageHeader";
import LegalSections from "@/components/site/LegalSections";

export const metadata: Metadata = {
  title: "Impressum",
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
      <PageHeader eyebrow="Rechtliches" title="Impressum" />
      <section className="py-16 md:py-24">
        <div className="wrap max-w-[780px]">
          <LegalSections sections={sections} />
        </div>
      </section>
    </>
  );
}
