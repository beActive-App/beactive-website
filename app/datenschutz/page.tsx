import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung – BeActive",
  description:
    "Datenschutzerklärung der BeActive App UG (haftungsbeschränkt) i.G. für Website und App.",
};

const sections: { title: string; paragraphs: string[]; list?: string[] }[] = [
  {
    title: "Überblick",
    paragraphs: [
      "Der Schutz deiner personenbezogenen Daten ist uns wichtig. Diese Datenschutzerklärung informiert dich darüber, welche Daten wir bei der Nutzung unserer Website und der BeActive App verarbeiten, zu welchem Zweck das geschieht und welche Rechte dir zustehen.",
    ],
  },
  {
    title: "Verantwortlicher",
    paragraphs: [
      "BeActive App UG (haftungsbeschränkt) i.G.\nAlbrechtstraße 3\n72072 Tübingen\nVertreten durch: Philipp Gerberding (Geschäftsführer)\nE-Mail: support@beactiveapp.de",
    ],
  },
  {
    title: "Datenschutzbeauftragter",
    paragraphs: [
      "Wir sind derzeit nicht gesetzlich verpflichtet, einen Datenschutzbeauftragten zu bestellen, und haben aktuell keinen bestellt. Für alle Fragen rund um den Datenschutz erreichst du uns unter support@beactiveapp.de.",
    ],
  },
  {
    title: "Deine Rechte als betroffene Person",
    paragraphs: [
      "Dir stehen im Rahmen der gesetzlichen Vorgaben folgende Rechte zu:",
    ],
    list: [
      "Auskunft über die von uns verarbeiteten Daten (Art. 15 DSGVO)",
      "Berichtigung unrichtiger Daten (Art. 16 DSGVO)",
      "Löschung deiner Daten (Art. 17 DSGVO)",
      "Einschränkung der Verarbeitung (Art. 18 DSGVO)",
      "Datenübertragbarkeit (Art. 20 DSGVO)",
      "Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)",
      "Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)",
      "Beschwerde bei einer Aufsichtsbehörde, für uns zuständig: Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg (LfDI)",
    ],
  },
  {
    title: "Hosting der Website",
    paragraphs: [
      "Unsere Website wird von Vercel Inc. (USA) gehostet. Beim Aufruf der Website verarbeitet Vercel automatisch technische Daten in sogenannten Server-Logfiles, u. a. IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite, Browsertyp und Betriebssystem. Diese Verarbeitung ist für den technischen Betrieb und die Absicherung der Website notwendig (Art. 6 Abs. 1 lit. f DSGVO, berechtigtes Interesse an einem funktionierenden und sicheren Betrieb). Da Vercel in den USA ansässig ist, erfolgt die Datenübermittlung auf Grundlage von EU-Standardvertragsklauseln (SCC) gemäß Art. 46 DSGVO.",
    ],
  },
  {
    title: "Kontaktformular",
    paragraphs: [
      "Wenn du unser Kontaktformular nutzt, verarbeiten wir die von dir eingegebenen Daten (Vorname, Nachname, E-Mail-Adresse, optional Telefonnummer, Nachricht) ausschließlich zur Bearbeitung deiner Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahme) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen). Wir löschen die Daten, sobald deine Anfrage abschließend bearbeitet ist, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.",
    ],
  },
  {
    title: "Newsletter und Warteliste",
    paragraphs: [
      "Wenn du dich über die Website für Neuigkeiten zum App-Start anmeldest, verwenden wir deine E-Mail-Adresse, um dir Informationen zum Launch und zur Entwicklung von BeActive zuzusenden. Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Du kannst deine Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, z. B. über einen Abmeldelink in der E-Mail oder formlos an support@beactiveapp.de. Deine E-Mail-Adresse wird gelöscht, sobald du dich abmeldest oder der Zweck entfällt.",
    ],
  },
  {
    title: "Nutzerkonto in der BeActive App",
    paragraphs: [
      "Für die Nutzung der BeActive App ist ein Nutzerkonto erforderlich. Dabei verarbeiten wir u. a. deine E-Mail-Adresse, deinen Namen und – sofern du eines hochlädst – dein Profilbild. Rechtsgrundlage ist die Erfüllung des Nutzungsvertrags mit dir (Art. 6 Abs. 1 lit. b DSGVO). Diese Daten werden bei unserem Auftragsverarbeiter Supabase auf Servern innerhalb der EU (Frankfurt) gespeichert.",
    ],
  },
  {
    title: "Events, Chat und Kontakte",
    paragraphs: [
      "Wenn du ein Event erstellst oder einem Event beitrittst, verarbeiten wir die dazugehörigen Angaben, z. B. Titel, Ort, Zeitpunkt und Teilnehmerliste. Nachrichten und Fotos, die du im Event-Chat teilst, werden an die übrigen Teilnehmer des jeweiligen Events übermittelt und dort gespeichert. Wenn du andere Nutzer blockierst oder eine Verbindung zu ihnen herstellst, speichern wir diese Angabe, um deine Einstellung umzusetzen. Rechtsgrundlage ist jeweils die Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO).",
    ],
  },
  {
    title: "Kamera, Fotobibliothek und Kalender",
    paragraphs: [
      "Die App fragt dich vorher um Erlaubnis, bevor sie auf deine Kamera, deine Fotobibliothek oder deinen Kalender zugreift. Diese Zugriffe erfolgen ausschließlich, um von dir ausgelöste Funktionen umzusetzen – etwa ein Foto im Chat zu versenden, ein Profilbild auszuwählen oder ein Event in deinen Kalender einzutragen. Du kannst erteilte Berechtigungen jederzeit in den iOS-Einstellungen widerrufen.",
    ],
  },
  {
    title: "Push-Benachrichtigungen",
    paragraphs: [
      "Um dich über Neuigkeiten zu deinen Events zu informieren, senden wir dir mit deiner Zustimmung Push-Benachrichtigungen über den Apple Push Notification Service (APNs) von Apple Inc. Du kannst Push-Benachrichtigungen jederzeit in den iOS-Einstellungen deaktivieren.",
    ],
  },
  {
    title: "Empfänger und Auftragsverarbeiter",
    paragraphs: [
      "Mit den folgenden Dienstleistern bestehen Verträge zur Auftragsverarbeitung gemäß Art. 28 DSGVO bzw. es handelt sich um eigenständig Verantwortliche:",
    ],
    list: [
      "Supabase – Datenbank, Authentifizierung und Backend-Funktionen der App, Serverstandort EU (Frankfurt)",
      "Vercel Inc. (USA) – Hosting der Website, auf Grundlage von EU-Standardvertragsklauseln",
      "Apple Inc. – App-Store-Distribution und Push-Benachrichtigungen (APNs)",
    ],
  },
  {
    title: "Speicherdauer",
    paragraphs: [
      "Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungsfristen dies vorschreiben. Löschst du dein Nutzerkonto, löschen oder anonymisieren wir die damit verbundenen Daten, sofern keine gesetzliche Aufbewahrungspflicht entgegensteht.",
    ],
  },
  {
    title: "Automatisierte Entscheidungsfindung",
    paragraphs: [
      "Wir setzen keine automatisierte Entscheidungsfindung einschließlich Profiling im Sinne von Art. 22 DSGVO ein.",
    ],
  },
  {
    title: "Änderungen dieser Datenschutzerklärung",
    paragraphs: [
      "Wir passen diese Datenschutzerklärung an, wenn sich unsere Datenverarbeitung oder die Rechtslage ändert. Es gilt jeweils die aktuelle, auf dieser Seite veröffentlichte Fassung.\n\nStand: Juli 2026",
    ],
  },
];

export default function DatenschutzPage() {
  return (
    <>
      <section className="bg-[#2D3E2D] text-[#E8E3D3] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.35em] mb-5 opacity-50">
            Rechtliches
          </p>
          <h1 className="font-serif text-6xl md:text-8xl font-black leading-none">
            Datenschutz
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
              <div className="text-[#2D3E2D] opacity-70 text-[15px] leading-relaxed space-y-3">
                {section.paragraphs.map((p) => (
                  <p key={p} className="whitespace-pre-line">
                    {p}
                  </p>
                ))}
                {section.list && (
                  <ul className="list-disc pl-5 space-y-1">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
