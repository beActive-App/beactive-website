import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/site/PageHeader";
import LegalSections from "@/components/site/LegalSections";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Konto löschen",
  description:
    "So löschst du dein beActive-Konto und deine Daten – in der App oder ohne App per E-Mail.",
};

// Google Play verlangt für Apps mit Konten eine Web-Adresse, unter der man die
// Löschung auch ohne installierte App anstoßen kann. Die Angaben hier müssen zu
// Abschnitt „Löschung" in /datenschutz passen – wer das eine ändert, ändert das
// andere mit.
const betreff = "Kontolöschung beActive";
const text = [
  "Hallo beActive-Team,",
  "",
  "bitte löscht mein beActive-Konto und alle zugehörigen Daten endgültig.",
  "",
  "E-Mail-Adresse meines Kontos: ",
  "Name im Profil (optional): ",
  "",
  "Danke!",
].join("\n");
const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(betreff)}&body=${encodeURIComponent(text)}`;

const sections = [
  {
    title: "In der App",
    paragraphs: ["Am schnellsten geht es direkt in beActive:"],
    list: [
      "iPhone: Tab „Profil“ öffnen, ganz nach unten scrollen, „Konto löschen“ antippen und bestätigen.",
      "Android: Tab „Profil“ öffnen, unten „Einstellungen“ → „Konto verwalten“ → „Konto löschen“ antippen und bestätigen.",
    ],
    after: [
      "Dein Profil, deine Events und deine Chat-Nachrichten sind danach sofort für niemanden mehr sichtbar.",
    ],
  },
  {
    title: "Ohne App, per E-Mail",
    paragraphs: [
      `Du hast die App nicht mehr installiert? Schreib uns von der E-Mail-Adresse, mit der du bei beActive angemeldet bist, an ${SUPPORT_EMAIL}. Wir löschen dein Konto und alle Daten dann endgültig – unverzüglich, spätestens innerhalb eines Monats – und bestätigen dir das per E-Mail.`,
      "Schreibst du von einer anderen Adresse, fragen wir kurz nach, ob das Konto wirklich dir gehört, damit niemand fremde Konten löschen lassen kann.",
    ],
  },
  {
    title: "Was gelöscht wird",
    list: [
      "Sofort: deine Teilnahmen an Events, Follower-Beziehungen und Blockierungen.",
      "Sofort unsichtbar: Profil mit Bild, deine Events, Chat- und Direktnachrichten, Fotos und Gruppen.",
      "Diese übrigen Daten bleiben bei einer Löschung in der App zunächst gesperrt gespeichert, damit du dein Konto durch erneutes Anmelden wiederherstellen kannst. Möchtest du das nicht, genügt eine E-Mail an uns – dann löschen wir sie endgültig, spätestens innerhalb eines Monats.",
      "Bei einer Löschung per E-Mail löschen wir alles direkt endgültig.",
    ],
  },
  {
    title: "Was aufbewahrt wird",
    paragraphs: [
      "Ausgenommen sind nur Daten, die wir aufgrund gesetzlicher Pflichten aufbewahren müssen oder zur Durchsetzung einer Sperre oder zur Klärung von Rechtsansprüchen brauchen. Sie werden gelöscht, sobald dieser Grund entfällt.",
      "Möchtest du vorher eine Kopie deiner Daten? In der App unter Einstellungen → „Meine Daten exportieren“.",
    ],
  },
  {
    title: "In English",
    paragraphs: [
      `To delete your beActive account and data in the app: on iPhone, Profile tab → scroll down → Delete account; on Android, Profile tab → Settings → Manage account → Delete account. Without the app, email ${SUPPORT_EMAIL} from the address you signed up with; we delete your account and all associated data permanently within one month at the latest and confirm by email. Data we are legally required to keep is deleted once that obligation ends.`,
    ],
  },
];

export default function KontoLoeschenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Deine Daten"
        title="Konto löschen"
        lede="beActive von der BeActive App UG (haftungsbeschränkt) i.G.: So löschst du dein Konto und deine Daten – mit oder ohne App."
      >
        <a href={mailto} className="btn">
          Löschung per E-Mail anfordern
        </a>
      </PageHeader>
      <section className="py-16 md:py-24">
        <div className="wrap max-w-[780px]">
          <LegalSections sections={sections} />
          <p className="mt-12 text-[15px] text-ink-soft">
            Mehr zum Umgang mit deinen Daten steht in der{" "}
            <Link href="/datenschutz" className="underline underline-offset-4 hover:text-accent">
              Datenschutzerklärung
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
