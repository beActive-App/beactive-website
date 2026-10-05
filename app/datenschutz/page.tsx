import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung – BeActive",
  description:
    "Datenschutzerklärung der BeActive App UG (haftungsbeschränkt) i.G. für Website und App.",
};

const sections: {
  title: string;
  paragraphs: string[];
  list?: string[];
  after?: string[];
}[] = [
  {
    title: "Überblick",
    paragraphs: [
      "Der Schutz deiner personenbezogenen Daten ist uns wichtig. Diese Datenschutzerklärung informiert dich darüber, welche Daten wir bei der Nutzung unserer Website (beactiveapp.de, links.beactiveapp.de) und der BeActive App für iOS und Android verarbeiten, zu welchem Zweck das geschieht und welche Rechte dir zustehen.",
      "Kurz gesagt: Wir verarbeiten nur, was für den Betrieb von Website und App nötig ist. Wir setzen keine Analyse- oder Werbe-Tracker ein, verkaufen keine Daten und fragen den Standort deines Geräts nicht ab.",
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
      "Dir stehen im Rahmen der gesetzlichen Vorgaben folgende Rechte zu. Um sie auszuüben, genügt eine formlose Nachricht an support@beactiveapp.de.",
    ],
    list: [
      "Auskunft über die von uns verarbeiteten Daten (Art. 15 DSGVO)",
      "Berichtigung unrichtiger Daten (Art. 16 DSGVO)",
      "Löschung deiner Daten (Art. 17 DSGVO)",
      "Einschränkung der Verarbeitung (Art. 18 DSGVO)",
      "Datenübertragbarkeit (Art. 20 DSGVO)",
      "Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)",
      "Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO), für uns zuständig: Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg, Lautenschlagerstraße 20, 70173 Stuttgart",
    ],
  },
  {
    title: "Widerspruchsrecht",
    paragraphs: [
      "Soweit wir deine Daten auf Grundlage berechtigter Interessen verarbeiten (Art. 6 Abs. 1 lit. f DSGVO), kannst du dieser Verarbeitung jederzeit aus Gründen widersprechen, die sich aus deiner besonderen Situation ergeben (Art. 21 DSGVO). Wir verarbeiten die Daten dann nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe nachweisen, die deine Interessen überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.",
    ],
  },
  {
    title: "Hosting der Website",
    paragraphs: [
      "Unsere Website wird von Vercel Inc. (USA) gehostet. Beim Aufruf der Website verarbeitet Vercel automatisch technische Daten in sogenannten Server-Logfiles, u. a. IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite, Browsertyp und Betriebssystem. Diese Verarbeitung ist für den technischen Betrieb und die Absicherung der Website notwendig (Art. 6 Abs. 1 lit. f DSGVO, berechtigtes Interesse an einem funktionierenden und sicheren Betrieb).",
      "Die Seiten unter links.beactiveapp.de, über die geteilte Event-Links sowie Links zur E-Mail-Bestätigung und zum Zurücksetzen des Passworts laufen, werden von Cloudflare, Inc. (USA) ausgeliefert. Dabei fallen dieselben technischen Zugriffsdaten an.",
      "Die Website verwendet keine Cookies zu Analyse- oder Werbezwecken und bindet keine Inhalte von Drittanbietern ein. Schriftarten werden von unserem eigenen Server ausgeliefert; es wird dabei keine Verbindung zu Google aufgebaut. Links zu Instagram sind einfache Verweise – Daten werden erst übertragen, wenn du sie anklickst.",
    ],
  },
  {
    title: "Kontaktaufnahme und Kontaktformular",
    paragraphs: [
      "Wenn du uns per E-Mail schreibst oder unser Kontaktformular nutzt, verarbeiten wir die von dir mitgeteilten Daten (beim Formular: Vorname, Nachname, E-Mail-Adresse, optional Telefonnummer, Nachricht) ausschließlich zur Bearbeitung deiner Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit deine Anfrage auf einen Vertrag gerichtet ist oder dein Nutzerkonto betrifft, im Übrigen Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen). Wir löschen die Daten, sobald deine Anfrage abschließend bearbeitet ist, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.",
    ],
  },
  {
    title: "Anfragen von Betrieben (Partnerformular)",
    paragraphs: [
      "Über das Formular auf unserer Seite für Betriebe verarbeiten wir die von dir angegebenen Daten (Name des Betriebs, Name der Ansprechpartnerin oder des Ansprechpartners, E-Mail-Adresse oder Telefonnummer sowie freiwillige Angaben zu auslastungsschwachen Zeiten und deiner Nachricht) ausschließlich, um deine Anfrage zu beantworten und eine mögliche Partnerschaft anzubahnen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahme) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).",
      "Die Anfrage wird über unseren Hosting-Anbieter per E-Mail an unser Postfach übermittelt und dort verarbeitet; schlägt der Versand fehl, wird sie vorübergehend im Server-Protokoll festgehalten, damit sie nicht verloren geht. Eine Weitergabe an Dritte zu Werbezwecken findet nicht statt. Wir löschen die Daten, sobald die Anfrage abschließend bearbeitet ist und keine Partnerschaft zustande kommt, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.",
    ],
  },
  {
    title: "Newsletter und Warteliste",
    paragraphs: [
      "Wenn du dich über die Website für Neuigkeiten zum App-Start anmeldest, verwenden wir deine E-Mail-Adresse, um dir Informationen zum Launch und zur Entwicklung von BeActive zuzusenden. Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Du kannst deine Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, z. B. über einen Abmeldelink in der E-Mail oder formlos an support@beactiveapp.de. Deine E-Mail-Adresse wird gelöscht, sobald du dich abmeldest oder der Zweck entfällt.",
    ],
  },
  {
    title: "Nutzerkonto und Profil in der BeActive App",
    paragraphs: [
      "Für die Nutzung der BeActive App ist ein Nutzerkonto erforderlich. Du kannst dich mit E-Mail-Adresse und Passwort registrieren oder – auf iOS – mit „Mit Apple anmelden“. Bei der Anmeldung über Apple erhalten wir von Apple eine Kennung deines Apple-Kontos, deinen Namen und deine E-Mail-Adresse bzw. die von Apple erzeugte Weiterleitungsadresse, wenn du deine E-Mail-Adresse verbirgst. Dein Passwort speichern wir nicht im Klartext, sondern nur als Hashwert.",
      "In deinem Profil verarbeiten wir die Angaben, die du dort machst:",
    ],
    after: [
      "Dein Profil mit Ausnahme der E-Mail-Adresse ist für andere angemeldete Nutzer sichtbar; dein Alter wird außerdem verwendet, um Events nach Altersgruppen zu filtern. Rechtsgrundlage ist die Erfüllung des Nutzungsvertrags mit dir (Art. 6 Abs. 1 lit. b DSGVO). Freiwillige Angaben kannst du jederzeit in der App ändern oder entfernen.",
    ],
    list: [
      "Pflichtangaben: E-Mail-Adresse, Name",
      "Weitere Angaben: Stadt, Alter, Profilbild, Beschreibung, Interessen, Beruf, Sprachen, Instagram-Name",
      "Bei Geschäftsprofilen zusätzlich: Website, Öffnungszeiten, Bilder des Betriebs und Angaben zu regelmäßig veröffentlichten Events",
      "Technische Angaben: Zeitpunkt der Registrierung und der letzten Änderung, gewählte App-Sprache, deine Benachrichtigungseinstellungen",
    ],
  },
  {
    title: "Events, Chat und Kontakte",
    paragraphs: [
      "Wenn du ein Event erstellst, verarbeiten wir die dazugehörigen Angaben, z. B. Titel, Beschreibung, Kategorie, Ort und Adresse, Zeitpunkt, Bilder, Teilnehmerzahl, Zielgruppe sowie bei Angeboten von Betrieben Preisangaben. Events sind je nach deiner Einstellung für alle Nutzer oder nur für von dir ausgewählte Personen sichtbar. Wenn du einen Event-Link teilst, kann jede angemeldete Person mit diesem Link das Event in der App öffnen.",
      "Wenn du einem Event beitrittst oder eine Beitrittsanfrage stellst, speichern wir das und zeigen dein Profil den übrigen Teilnehmern und der Person, die das Event erstellt hat. Nachrichten und Fotos, die du im Event-Chat teilst, werden zusammen mit deinem Namen und Profilbild gespeichert und sind für alle sichtbar, die Zugang zum Chat des jeweiligen Events haben. Eigene Nachrichten kannst du wieder löschen.",
      "Wenn du anderen Nutzern folgst, sie zu einem Event einlädst oder sie blockierst, speichern wir diese Angabe, um die Funktion umzusetzen. Rechtsgrundlage ist jeweils die Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO).",
    ],
  },
  {
    title: "Zuverlässigkeits-Bewertung",
    paragraphs: [
      "Nach einem Event können sich die Teilnehmer gegenseitig danach bewerten, ob jemand wie zugesagt erschienen ist. Wir speichern, wer wen für welches Event wie bewertet hat, und berechnen daraus einen Zuverlässigkeitswert, der in deinem Profil für andere Nutzer sichtbar ist. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (die Bewertung ist Bestandteil der App) sowie unser berechtigtes Interesse und das der übrigen Nutzer an verlässlichen Verabredungen (Art. 6 Abs. 1 lit. f DSGVO).",
    ],
  },
  {
    title: "Meldungen, Moderation und Sperrungen",
    paragraphs: [
      "Du kannst Profile, Events und Nachrichten melden. Dabei speichern wir, wer die Meldung abgegeben hat, worauf sie sich bezieht, den angegebenen Grund und den Zeitpunkt. Unser Moderationsteam prüft gemeldete Inhalte und kann dazu die betroffenen Events, Chats und Profile einsehen, Inhalte entfernen und Konten sperren. Bei einer Sperrung speichern wir den Zeitpunkt der Sperre, um eine erneute Nutzung zu verhindern. Die gemeldete Person erfährt nicht, wer sie gemeldet hat.",
      "Rechtsgrundlage ist unser berechtigtes Interesse an einer sicheren Plattform und am Schutz unserer Nutzer (Art. 6 Abs. 1 lit. f DSGVO) sowie die Durchsetzung unserer Nutzungsbedingungen (Art. 6 Abs. 1 lit. b DSGVO) und, soweit wir gesetzlich zur Prüfung gemeldeter Inhalte verpflichtet sind, Art. 6 Abs. 1 lit. c DSGVO.",
    ],
  },
  {
    title: "Ortssuche und Karten",
    paragraphs: [
      "Die App fragt den Standort deines Geräts nicht ab. Orte von Events und deine Stadt gibst du selbst ein. Für die Ortsvorschläge während der Eingabe wird dein Suchtext zusammen mit deiner IP-Adresse an den Geocoding-Dienst Photon der komoot GmbH (Potsdam, Deutschland) übermittelt.",
      "Zur Darstellung der Event-Karte nutzt die App auf iOS Apple Maps (Apple Distribution International Ltd., Irland) und auf Android das Google Maps SDK (Google Ireland Limited, Irland). Dabei werden technisch notwendige Daten wie deine IP-Adresse, Gerätekennungen und der angezeigte Kartenausschnitt an den jeweiligen Anbieter übertragen; eine Übermittlung an die Muttergesellschaften in den USA ist möglich. Öffnest du aus der App heraus eine Wegbeschreibung, wechselst du in die jeweilige Karten-App, deren Anbieter dafür selbst verantwortlich ist.",
      "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, da Ortssuche und Karte zu den Kernfunktionen der App gehören.",
    ],
  },
  {
    title: "Kamera, Fotos und Kalender",
    paragraphs: [
      "Die App greift nur dann auf Kamera, Fotos oder Kalender zu, wenn du eine entsprechende Funktion auslöst – etwa ein Foto im Chat versendest, ein Profil- oder Eventbild auswählst oder ein Event in deinen Kalender einträgst. Soweit dein Betriebssystem dafür eine Berechtigung verlangt, fragt die App dich vorher um Erlaubnis. Wir erhalten nur die Bilder, die du auswählst; deinen Kalender lesen wir nicht aus. Erteilte Berechtigungen kannst du jederzeit in den Einstellungen deines Geräts widerrufen.",
    ],
  },
  {
    title: "Push-Benachrichtigungen",
    paragraphs: [
      "Wenn du Benachrichtigungen erlaubst, informieren wir dich z. B. über neue Chat-Nachrichten, Beitrittsanfragen, Einladungen, Änderungen an deinen Events und neue Follower. Dafür speichern wir eine Gerätekennung (Push-Token), dein Betriebssystem und deine App-Sprache. Die Zustellung erfolgt auf iOS über den Apple Push Notification Service (Apple Inc.) und auf Android über Firebase Cloud Messaging (Google Ireland Limited); dabei werden der Push-Token und der Inhalt der Benachrichtigung an den jeweiligen Dienst übermittelt.",
      "Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG). Du kannst sie jederzeit widerrufen, indem du Benachrichtigungen in den Einstellungen deines Geräts deaktivierst; einzelne Arten von Benachrichtigungen kannst du außerdem in der App abschalten.",
    ],
  },
  {
    title: "Empfänger und Auftragsverarbeiter",
    paragraphs: [
      "Wir geben deine Daten nicht zu Werbezwecken weiter. Wir setzen folgende Dienstleister ein, die Daten in unserem Auftrag (Art. 28 DSGVO) oder als eigenständig Verantwortliche verarbeiten:",
    ],
    after: [
      "Darüber hinaus geben wir Daten nur weiter, wenn wir gesetzlich dazu verpflichtet sind, etwa gegenüber Strafverfolgungsbehörden.",
    ],
    list: [
      "Supabase, Inc. (USA) – Datenbank, Authentifizierung (einschließlich der E-Mails zur Kontobestätigung und zum Zurücksetzen des Passworts), Dateispeicher und Backend-Funktionen der App; Serverstandort EU (Frankfurt)",
      "Vercel Inc. (USA) – Hosting der Website und Verarbeitung der Formulare",
      "Cloudflare, Inc. (USA) – Auslieferung von links.beactiveapp.de",
      "Unser E-Mail-Anbieter – Empfang und Versand von E-Mails, einschließlich der Formularanfragen",
      "Apple Inc. / Apple Distribution International Ltd. – App Store, „Mit Apple anmelden“, Push-Benachrichtigungen (APNs), Apple Maps",
      "Google Ireland Limited – Google Play, Firebase Cloud Messaging, Google Maps SDK (Android)",
      "komoot GmbH (Deutschland) – Ortssuche (Photon)",
    ],
  },
  {
    title: "Datenübermittlung in Drittländer",
    paragraphs: [
      "Die Daten deines Nutzerkontos werden auf Servern in der EU gespeichert. Einige unserer Dienstleister haben ihren Sitz in den USA oder gehören zu US-Konzernen, sodass ein Zugriff aus den USA nicht ausgeschlossen ist. Soweit die Anbieter unter dem EU-U.S. Data Privacy Framework zertifiziert sind, stützt sich die Übermittlung auf den Angemessenheitsbeschluss der EU-Kommission (Art. 45 DSGVO), im Übrigen auf EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO). Eine Kopie der Garantien kannst du bei uns anfordern.",
    ],
  },
  {
    title: "Speicherdauer und Kontolöschung",
    paragraphs: [
      "Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungsfristen dies vorschreiben. Die Daten deines Nutzerkontos speichern wir grundsätzlich, solange das Konto besteht.",
      "Du kannst dein Konto jederzeit in der App unter Einstellungen löschen. Dein Profil, deine Events und deine Chat-Nachrichten sind dann sofort für andere Nutzer nicht mehr sichtbar; deine Teilnahmen, Follower-Beziehungen und Blockierungen werden sofort gelöscht. Die übrigen Daten bleiben zunächst gesperrt gespeichert, damit du dein Konto durch erneutes Anmelden wiederherstellen kannst. Möchtest du, dass alle Daten sofort endgültig gelöscht werden, genügt eine Nachricht an support@beactiveapp.de; wir löschen sie dann unverzüglich, spätestens innerhalb eines Monats.",
      "Von der Löschung ausgenommen sind Daten, die wir aufgrund gesetzlicher Pflichten aufbewahren müssen oder die wir zur Durchsetzung einer Sperre oder zur Klärung von Rechtsansprüchen benötigen; sie werden gelöscht, sobald dieser Grund entfällt.",
    ],
  },
  {
    title: "Minderjährige",
    paragraphs: [
      "BeActive darf ab 13 Jahren und bei Minderjährigen nur mit Zustimmung der Erziehungsberechtigten genutzt werden. Soweit wir Daten auf Grundlage einer Einwilligung verarbeiten und du noch nicht 16 Jahre alt bist, muss die Einwilligung durch deine Erziehungsberechtigten oder mit deren Zustimmung erteilt werden (Art. 8 DSGVO). Erfahren wir, dass ein Kind unter 13 Jahren ein Konto angelegt hat, löschen wir es.",
    ],
  },
  {
    title: "Pflicht zur Bereitstellung von Daten",
    paragraphs: [
      "Du bist nicht verpflichtet, uns Daten bereitzustellen. Ohne E-Mail-Adresse und Namen können wir dir allerdings kein Nutzerkonto einrichten, und ohne Nutzerkonto lässt sich die App nicht verwenden.",
    ],
  },
  {
    title: "Automatisierte Entscheidungsfindung",
    paragraphs: [
      "Wir setzen keine automatisierte Entscheidungsfindung einschließlich Profiling im Sinne von Art. 22 DSGVO ein. Der Zuverlässigkeitswert wird zwar automatisch aus den Bewertungen anderer Nutzer berechnet, hat aber keine rechtliche Wirkung und führt nicht zu automatischen Sperren. Über Sperrungen entscheidet immer ein Mensch.",
    ],
  },
  {
    title: "Sicherheit",
    paragraphs: [
      "Die Übertragung zwischen deinem Gerät und unseren Servern erfolgt verschlüsselt (TLS). Der Zugriff auf Daten ist technisch auf das beschränkt, was die jeweilige Funktion erfordert; Profil-, Event- und Chatbilder sind nur für angemeldete, berechtigte Nutzer abrufbar.",
    ],
  },
  {
    title: "Änderungen dieser Datenschutzerklärung",
    paragraphs: [
      "Wir passen diese Datenschutzerklärung an, wenn sich unsere Datenverarbeitung oder die Rechtslage ändert. Es gilt jeweils die aktuelle, auf dieser Seite veröffentlichte Fassung.\n\nStand: Oktober 2026",
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
                {section.after?.map((p) => (
                  <p key={p} className="whitespace-pre-line">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
