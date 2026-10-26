import type { Metadata } from "next";
import PageHeader from "@/components/site/PageHeader";
import LegalSections from "@/components/site/LegalSections";

export const metadata: Metadata = {
  title: "AGB",
  description:
    "Allgemeine Geschäftsbedingungen für die Nutzung der beActive App und Website.",
};

const sections: { title: string; paragraphs: string[]; list?: string[] }[] = [
  {
    title: "1. Geltungsbereich",
    paragraphs: [
      "Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung der beActive App und der zugehörigen Website, angeboten von der BeActive App UG (haftungsbeschränkt) i.G., Albrechtstraße 3, 72072 Tübingen (\"beActive\", \"wir\"). Mit der Registrierung eines Nutzerkontos erkennst du diese AGB an.",
      "Lädst du beActive über den App Store herunter, gilt zusätzlich Apples Standard-Lizenzvereinbarung für Endnutzer (EULA) für die reine Softwarenutzung. Diese AGB regeln darüber hinaus die Nutzung des Dienstes selbst.",
    ],
  },
  {
    title: "2. Leistungsbeschreibung",
    paragraphs: [
      "beActive ist eine Plattform, über die Nutzer Freizeit-, Sport- und Kulturevents in ihrer Nähe entdecken, eigene Events erstellen, daran teilnehmen und sich über eine Chat-Funktion mit anderen Teilnehmern austauschen können.",
      "Events werden von Nutzern selbst erstellt und organisiert – beActive ist nicht Veranstalter der gelisteten Events, sondern stellt lediglich die technische Plattform zur Verfügung.",
      "Registrierte Unternehmen (Business-Konten) können zusätzlich vergünstigte Partnerangebote (\"Last-Minute-Deals\") mit Original- und Rabattpreis veröffentlichen. Diese Unternehmen zahlen beActive eine Vergütung dafür, ihre Angebote auf der Plattform veröffentlichen zu dürfen (siehe Ziffer 3). Der eigentliche Vertrag über die Inanspruchnahme eines solchen Angebots – also Buchung, Einkauf oder Zahlung des (rabattierten) Preises – kommt ausschließlich zwischen dir als Nutzer und dem jeweiligen Partnerunternehmen zustande, nicht mit beActive. beActive selbst wickelt keine Zahlungen zwischen Nutzern und Partnerunternehmen ab und ist nicht Vertragspartner dieser Angebote.",
    ],
  },
  {
    title: "3. Partnerunternehmen und bezahlte Angebote",
    paragraphs: [
      "beActive schließt mit teilnehmenden Unternehmen eigene Verträge, in denen sich das Unternehmen zur Zahlung einer wiederkehrenden Vergütung an beActive verpflichtet. Im Gegenzug erhält das Unternehmen das Recht, eigene Angebote (z. B. Last-Minute-Deals) über die Plattform an Nutzer zu veröffentlichen.",
      "Diese Vergütung wird ausschließlich für die Bereitstellung der Plattform und die Sichtbarkeit des Angebots gezahlt. Sie hat keinen Einfluss auf den Vertrag, den ein Nutzer gegebenenfalls direkt mit dem Partnerunternehmen über das beworbene Angebot abschließt.",
      "beActive übernimmt keine Gewähr für die Richtigkeit, Verfügbarkeit oder Einhaltung der von Partnerunternehmen veröffentlichten Angebote, Preise und Rabatte. Ansprüche im Zusammenhang mit einem konkreten Angebot richten sich ausschließlich gegen das jeweilige Partnerunternehmen.",
      "Details zu Vergütung, Laufzeit und Kündigung der Partnerschaft regelt der jeweilige Partnervertrag zwischen beActive und dem Unternehmen; diese AGB gelten für Partnerunternehmen als Nutzer der Plattform ergänzend.",
    ],
  },
  {
    title: "4. Registrierung und Mindestalter",
    paragraphs: [
      "Für die Nutzung von beActive ist ein Nutzerkonto erforderlich. Du musst mindestens 13 Jahre alt sein. Bist du minderjährig, benötigst du die Zustimmung deiner Erziehungsberechtigten zur Nutzung von beActive.",
      "Die bei der Registrierung gemachten Angaben müssen wahrheitsgemäß sein. Dein Zugangsdaten sind vertraulich zu behandeln; du bist für sämtliche Aktivitäten verantwortlich, die über dein Konto erfolgen.",
    ],
  },
  {
    title: "5. Pflichten der Nutzer",
    paragraphs: ["Bei der Nutzung von beActive verpflichtest du dich:"],
    list: [
      "geltendes Recht sowie die Rechte Dritter zu beachten",
      "keine falschen Identitäten oder Fake-Profile zu verwenden",
      "andere Nutzer respektvoll zu behandeln – Belästigung, Diskriminierung, Beleidigungen oder Hassrede sind nicht gestattet",
      "keine rechtswidrigen, irreführenden oder gefährdenden Events zu erstellen",
      "keine urheberrechtlich geschützten Inhalte ohne Berechtigung hochzuladen",
    ],
  },
  {
    title: "6. Nutzerinhalte",
    paragraphs: [
      "Inhalte, die du über beActive teilst – etwa Profilbilder, Event-Beschreibungen oder Nachrichten und Fotos im Event-Chat –, bleiben dein Eigentum. Du räumst beActive ein einfaches, nicht-exklusives Nutzungsrecht ein, diese Inhalte im für den Betrieb der App notwendigen Umfang zu speichern, zu übertragen und den jeweils berechtigten Empfängern (z. B. anderen Teilnehmern desselben Events) anzuzeigen.",
      "Du bist für die von dir geteilten Inhalte selbst verantwortlich. beActive kann Inhalte, die gegen diese AGB verstoßen, entfernen.",
    ],
  },
  {
    title: "7. Events und Haftungsausschluss für Treffen",
    paragraphs: [
      "Events auf beActive werden von Nutzern eigenverantwortlich organisiert und finden in der Regel persönlich statt (z. B. Sport, Ausflüge, Treffen). Die Teilnahme erfolgt auf eigenes Risiko.",
      "beActive prüft Events nicht vorab und ist nicht Vertragspartner der Vereinbarungen zwischen Event-Ersteller und Teilnehmern. Soweit gesetzlich zulässig, haftet beActive nicht für Schäden, Verletzungen oder sonstige Vorfälle, die im Zusammenhang mit einem über die App organisierten Event entstehen. Für einen sicheren und respektvollen Umgang bei Treffen sind die Teilnehmer selbst verantwortlich.",
      "beActive vermittelt oder stellt keinen Versicherungsschutz für Events oder Treffen zur Verfügung. Insbesondere besteht über beActive kein Versicherungsschutz bei Unfällen, Verletzungen oder Sachschäden im Zusammenhang mit einem Event – auch nicht bei Sportarten mit erhöhtem Risiko. Es liegt in deiner eigenen Verantwortung, vor der Teilnahme an oder Organisation von Events für ausreichenden eigenen Versicherungsschutz zu sorgen (z. B. private Haftpflicht- und ggf. Unfallversicherung).",
    ],
  },
  {
    title: "8. Melden und Sperrung",
    paragraphs: [
      "Du kannst andere Nutzer blockieren oder über die App melden, wenn sie gegen diese AGB verstoßen. Gemeldete Inhalte und Konten werden von uns geprüft.",
      "beActive kann Konten, die gegen diese AGB oder geltendes Recht verstoßen, verwarnen, einschränken oder sperren. Bei schwerwiegenden Verstößen kann dies ohne vorherige Ankündigung erfolgen. Du kannst dein Konto jederzeit selbst löschen.",
    ],
  },
  {
    title: "9. Verfügbarkeit",
    paragraphs: [
      "Wir sind bemüht, beActive dauerhaft verfügbar zu halten, können aber keine ununterbrochene Verfügbarkeit garantieren. Wartungsarbeiten, technische Störungen oder Weiterentwicklungen können zu vorübergehenden Einschränkungen führen.",
    ],
  },
  {
    title: "10. Haftungsbeschränkung",
    paragraphs: [
      "beActive haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie nach dem Produkthaftungsgesetz und für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.",
      "Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten (Kardinalpflichten) haftet beActive nur für den vorhersehbaren, vertragstypischen Schaden. Im Übrigen ist die Haftung für leichte Fahrlässigkeit ausgeschlossen.",
    ],
  },
  {
    title: "11. Änderungen dieser AGB",
    paragraphs: [
      "Wir können diese AGB anpassen, etwa wenn sich unser Leistungsangebot oder die Rechtslage ändert. Über wesentliche Änderungen informieren wir dich in angemessener Frist, z. B. per E-Mail oder in der App. Es gilt jeweils die aktuelle, auf dieser Seite veröffentlichte Fassung.",
    ],
  },
  {
    title: "12. Schlussbestimmungen",
    paragraphs: [
      "Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Zwingende Verbraucherschutzvorschriften deines gewöhnlichen Aufenthaltsorts bleiben hiervon unberührt.",
      "Sollte eine Bestimmung dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.",
      "Fragen zu diesen AGB richtest du bitte an support@beactiveapp.de.\n\nStand: Juli 2026",
    ],
  },
];

export default function AgbPage() {
  return (
    <>
      <PageHeader eyebrow="Rechtliches" title="Nutzungsbedingungen" lede="Allgemeine Geschäftsbedingungen für die Nutzung der beActive App und Website." />
      <section className="py-16 md:py-24">
        <div className="wrap max-w-[780px]">
          <LegalSections sections={sections} />
        </div>
      </section>
    </>
  );
}
