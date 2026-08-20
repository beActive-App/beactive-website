import Link from "next/link";
import PartnerForm from "@/components/PartnerForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Für Betriebe – BeActive Tübingen",
  description:
    "Ihr habt Zeitfenster, in denen wenig los ist. Wir haben Leute, die genau dann spontan etwas suchen. Für die ersten 20 Betriebe in Tübingen kostenlos – kein Vertrag, keine Provision.",
  openGraph: {
    title: "Für Betriebe – BeActive Tübingen",
    description:
      "Ein Angebot für euer schwächstes Zeitfenster. Kostenlos für die ersten 20 Betriebe in Tübingen.",
    type: "website",
  },
};

// ── Kontaktdaten ──────────────────────────────────────────────
// TELEFON leer lassen, wenn es keine Nummer gibt – der Block wird dann
// gar nicht erst angezeigt. Niemals einen Platzhalter live stellen.
const EMAIL = "partner@beactiveapp.de";
const TELEFON: string = "";
const INSTAGRAM = "beactive_app";

const schritte = [
  {
    nr: "01",
    titel: "Profil anlegen",
    text: "Name, Adresse, Öffnungszeiten. Zehn Minuten, einmalig. Wenn ihr wollt, kommen wir vorbei und machen es zusammen am Tresen.",
  },
  {
    nr: "02",
    titel: "Angebot einstellen",
    text: "Dreißig Sekunden. Ihr legt fest: welches Zeitfenster, welcher Rabatt, wie viele Plätze. Sofort sichtbar für alle in der Stadt.",
  },
  {
    nr: "03",
    titel: "Leute kommen",
    text: "Wer die App gerade offen hat, sieht es und kommt vorbei. Ihr seht vorher, wie viele zugesagt haben.",
  },
];

const kontrolle = [
  { titel: "Den Rabatt", text: "Ihr entscheidet, ob 10 %, 25 % oder ein fester Preis." },
  { titel: "Das Zeitfenster", text: "Zwei Stunden am Dienstag oder jeden Sonntagvormittag." },
  { titel: "Die Teilnehmerzahl", text: "Maximal acht Leute, damit es nicht kippt." },
  { titel: "Den Ausstieg", text: "Angebot beenden oder Profil löschen. Ohne Rückfrage, ohne Frist." },
];

const fuerWen = [
  {
    typ: "Leere Randzeiten",
    beispiele: "Cafés, Bars, Boulderhalle, Kino, Bowling, Minigolf",
    nutzen: "Ein Angebot genau für die Stunden, in denen sonst nichts läuft.",
  },
  {
    typ: "Kursanbieter",
    beispiele: "Yoga, Tanzschule, Kochkurse, Klettern, Töpfern",
    nutzen: "Schnupperkunden ohne Rabattschlacht – Teilnehmerzahl steuerbar.",
  },
  {
    typ: "Freizeit & Kultur",
    beispiele: "Museen, Theater, Freibad, Vereine, Bibliothek",
    nutzen: "Ein direkter Kanal zu einem jungen Publikum, das ihr sonst nicht erreicht.",
  },
  {
    typ: "Gastro mit Programm",
    beispiele: "Quizabend, Live-Musik, Spieleabend",
    nutzen: "Wiederkehrende Termine statt einer Story, die nach 24 Stunden weg ist.",
  },
];

const profilKann = [
  "Öffnungszeiten einmal hinterlegen – laufen automatisch mit",
  "Besondere Events posten: Quizabend, Live-Musik, Schnupperkurs",
  "Rabattierte Angebote mit Original- und Aktionspreis",
  "Alles in einem Dashboard, jederzeit änderbar",
];

const faq = [
  {
    frage: "Was kostet das?",
    antwort:
      "Für die ersten 20 Betriebe in Tübingen nichts. Kein Vertrag, keine Mindestlaufzeit, keine Provision auf euren Umsatz. Danach reden wir noch einmal – und ihr entscheidet dann.",
  },
  {
    frage: "Wie viele Nutzer habt ihr?",
    antwort:
      "Weniger, als ihr hören wollt. Wir sind neu und bauen die App gerade in Tübingen auf. Deshalb verkaufen wir euch auch keine Reichweite, sondern schlagen einen Versuch vor, der euch nichts kostet: Wenn an einem toten Dienstag sechs Leute kommen, die sonst nicht gekommen wären, hat es sich gelohnt. Wenn nicht, hört ihr wieder auf.",
  },
  {
    frage: "Wir sind doch schon auf Instagram.",
    antwort:
      "Eine Story ist nach 24 Stunden weg und erreicht die Leute, die euch schon folgen. In BeActive sucht jemand aktiv danach, was heute in der Stadt läuft – und findet euch, ohne euch vorher zu kennen.",
  },
  {
    frage: "Müssen wir Rabatt geben?",
    antwort:
      "Nein. Ihr könnt auch reguläre Events einstellen – Quizabend, Kurs, Konzert. Der Rabatt ist nur der stärkste Hebel für Zeitfenster, in denen sonst niemand kommt.",
  },
  {
    frage: "Wer steckt dahinter?",
    // Der Schluss hängt an TELEFON: ohne Nummer darf hier keine versprochen werden.
    antwort:
      "Zwei Leute aus Tübingen, die die App selbst gebaut haben. Kein Konzern, keine Investoren. Wir laufen die Läden gerade zu Fuß ab – " +
      (TELEFON
        ? "deshalb steht hier auch eine Handynummer und kein Kontaktformular-Roboter."
        : "wer uns schreibt, bekommt Antwort von einem von uns beiden und nicht von einem Roboter."),
  },
];

export default function PartnerPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#2D3E2D] text-[#E8E3D3]">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
          <p className="text-xs uppercase tracking-[0.35em] mb-6 opacity-50">
            Für Betriebe in Tübingen
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl font-black leading-[0.95] mb-8">
            Dienstag,
            <br />
            15 Uhr.
          </h1>
          <p className="text-lg md:text-xl opacity-70 max-w-2xl leading-relaxed mb-4">
            So sieht es in den meisten Läden aus. Nicht, weil das Angebot
            schlecht ist – sondern weil niemand weiß, dass gerade jetzt Platz
            ist.
          </p>
          <p className="text-lg md:text-xl max-w-2xl leading-relaxed mb-12 text-[#C1FF72]">
            Genau dieses Zeitfenster füllen wir.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <a
              href="#kontakt"
              className="inline-block bg-[#C1FF72] text-[#0b140f] px-10 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors text-center"
            >
              Wir kommen vorbei
            </a>
            <a
              href="#so-gehts"
              className="inline-block border border-[#E8E3D3]/40 px-10 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:border-[#E8E3D3] transition-colors text-center"
            >
              Wie es funktioniert
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#E8E3D3]/15 border border-[#E8E3D3]/15">
            {[
              "Kostenlos für die ersten 20 Betriebe",
              "Kein Vertrag, keine Mindestlaufzeit",
              "Keine Provision auf euren Umsatz",
            ].map((t) => (
              <p
                key={t}
                className="bg-[#2D3E2D] px-6 py-5 text-sm opacity-75 leading-snug"
              >
                {t}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Das Angebot */}
      <section className="bg-[#E8E3D3] text-[#2D3E2D] py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-5xl font-black leading-tight mb-8">
            Wir verkaufen euch keine Werbung.
            <br />
            Wir füllen ein leeres Zeitfenster.
          </h2>
          <p className="text-lg opacity-70 leading-relaxed mb-6">
            Ein Café verliert an einem regnerischen Dienstagnachmittag Geld. Die
            Miete läuft, das Personal steht da, die Tische sind leer.
          </p>
          <p className="text-lg opacity-70 leading-relaxed">
            Ein Angebot, das um 13 Uhr sichtbar wird und um 15 Uhr acht Leute
            bringt, ist kein Marketing. Das ist Umsatz, der sonst nicht
            stattgefunden hätte.
          </p>
        </div>
      </section>

      {/* So geht's */}
      <section id="so-gehts" className="bg-[#0b140f] text-[#eaf2e4] py-24">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.35em] mb-14 opacity-40">
            In drei Schritten
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {schritte.map((s) => (
              <div key={s.nr}>
                <p className="font-serif text-5xl font-black text-[#C1FF72] mb-5">
                  {s.nr}
                </p>
                <h3 className="font-serif text-2xl font-bold mb-4">{s.titel}</h3>
                <p className="opacity-55 leading-relaxed text-[15px]">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Die Rechnung */}
      <section className="bg-[#2D3E2D] text-[#E8E3D3] py-24">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.35em] mb-8 opacity-50">
            Die Rechnung
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-black leading-tight mb-12">
            Ein Rabatt auf einen Gast, der sonst nicht gekommen wäre, kostet
            nichts. Er bringt.
          </h2>

          <div className="border border-[#E8E3D3]/20 p-6 sm:p-10 font-mono text-sm sm:text-base overflow-x-auto">
            <table className="w-full">
              <tbody>
                <tr className="opacity-60">
                  <td className="py-2 pr-6">Ein leerer Dienstagnachmittag</td>
                  <td className="py-2 text-right whitespace-nowrap">0 €</td>
                </tr>
                <tr className="opacity-60">
                  <td className="py-2 pr-6">Ein Angebot in BeActive</td>
                  <td className="py-2 text-right whitespace-nowrap">0 € Kosten</td>
                </tr>
                <tr>
                  <td className="py-2 pr-6">8 Gäste × 6 € Durchschnittsbon</td>
                  <td className="py-2 text-right whitespace-nowrap">48 €</td>
                </tr>
                <tr>
                  <td className="py-2 pr-6">davon Rabatt (−25 %)</td>
                  <td className="py-2 text-right whitespace-nowrap">−12 €</td>
                </tr>
                <tr className="border-t border-[#E8E3D3]/30">
                  <td className="pt-4 pr-6 font-bold">
                    Differenz zu einem leeren Nachmittag
                  </td>
                  <td className="pt-4 text-right font-bold text-[#C1FF72] whitespace-nowrap">
                    +36 €
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs opacity-40 mt-6 leading-relaxed">
            Beispielrechnung zur Veranschaulichung der Logik – keine
            garantierten Zahlen und kein Umsatzversprechen. Bei
            Prozentangaben gilt § 11 PAngV: Referenz ist der niedrigste
            Gesamtpreis der letzten 30 Tage.
          </p>
        </div>
      </section>

      {/* Kontrolle */}
      <section className="bg-[#E8E3D3] text-[#2D3E2D] py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-5xl font-black leading-tight mb-4">
            Ihr behaltet alles in der Hand
          </h2>
          <p className="opacity-55 mb-14 max-w-2xl leading-relaxed">
            Wir entscheiden nichts über euren Laden. Vier Regler, alle bei euch:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#2D3E2D]/15 border border-[#2D3E2D]/15">
            {kontrolle.map((k) => (
              <div key={k.titel} className="bg-[#E8E3D3] p-8 sm:p-10">
                <h3 className="font-serif text-xl font-bold mb-3">{k.titel}</h3>
                <p className="opacity-55 text-[15px] leading-relaxed">
                  {k.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Für wen */}
      <section className="bg-[#0b140f] text-[#eaf2e4] py-24">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.35em] mb-14 opacity-40">
            Für wen das passt
          </p>
          <div className="space-y-px bg-[#eaf2e4]/10 border border-[#eaf2e4]/10">
            {fuerWen.map((f) => (
              <div
                key={f.typ}
                className="bg-[#0b140f] p-8 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10"
              >
                <h3 className="font-serif text-xl font-bold">{f.typ}</h3>
                <p className="text-sm opacity-45 leading-relaxed">
                  {f.beispiele}
                </p>
                <p className="text-[15px] opacity-70 leading-relaxed">
                  {f.nutzen}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Was das Profil kann */}
      <section className="bg-[#E8E3D3] text-[#2D3E2D] py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-5xl font-black leading-tight mb-10">
            Was euer Profil kann
          </h2>
          <ul className="space-y-5">
            {profilKann.map((p) => (
              <li key={p} className="flex gap-4 items-start">
                <span className="mt-2 w-2 h-2 bg-[#2D3E2D] shrink-0" />
                <span className="text-lg opacity-70 leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Kontakt */}
      <section id="kontakt" className="bg-[#E8E3D3] text-[#2D3E2D] pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-t border-[#2D3E2D]/15 pt-24">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-black leading-tight mb-6">
                  Zehn Minuten am Tresen
                </h2>
                <p className="opacity-60 leading-relaxed text-[15px] mb-10">
                  Am einfachsten zeigen wir es euch direkt am Handy. Sagt uns,
                  wann es passt – wir kommen vorbei. Wenn ihr lieber erst
                  schreibt, geht das genauso.
                </p>

                <div className="space-y-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] opacity-40 mb-1">
                      E-Mail
                    </p>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="text-sm underline hover:no-underline"
                    >
                      {EMAIL}
                    </a>
                  </div>
                  {TELEFON && (
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] opacity-40 mb-1">
                        Telefon
                      </p>
                      <a
                        href={`tel:${TELEFON.replace(/\s/g, "")}`}
                        className="text-sm underline hover:no-underline"
                      >
                        {TELEFON}
                      </a>
                    </div>
                  )}
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] opacity-40 mb-1">
                      Instagram
                    </p>
                    <a
                      href={`https://instagram.com/${INSTAGRAM}`}
                      className="text-sm underline hover:no-underline"
                    >
                      @{INSTAGRAM}
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <PartnerForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#2D3E2D] text-[#E8E3D3] py-24">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.35em] mb-14 opacity-50">
            Was uns oft gefragt wird
          </p>
          <div className="space-y-12">
            {faq.map((f) => (
              <div key={f.frage}>
                <h3 className="font-serif text-xl md:text-2xl font-bold mb-4">
                  {f.frage}
                </h3>
                <p className="opacity-60 leading-relaxed">{f.antwort}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0b140f] text-[#eaf2e4] py-14">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-between gap-8">
          <div>
            <p className="font-serif text-2xl font-black mb-2">BeActive</p>
            <p className="text-xs opacity-40 leading-relaxed">
              BeActive UG (haftungsbeschränkt) i.G.
              <br />
              Tübingen
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.15em]">
            <Link href="/" className="opacity-60 hover:opacity-100 transition-opacity">
              Startseite
            </Link>
            <Link href="/impressum" className="opacity-60 hover:opacity-100 transition-opacity">
              Impressum
            </Link>
            <Link href="/datenschutz" className="opacity-60 hover:opacity-100 transition-opacity">
              Datenschutz
            </Link>
            <Link href="/agb" className="opacity-60 hover:opacity-100 transition-opacity">
              AGB
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
