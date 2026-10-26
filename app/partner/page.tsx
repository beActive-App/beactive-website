import type { Metadata } from "next";
import PartnerForm from "@/components/PartnerForm";
import PageHeader from "@/components/site/PageHeader";

export const metadata: Metadata = {
  title: "Für Betriebe in Tübingen",
  description:
    "Ihr habt Zeitfenster, in denen wenig los ist. Wir haben Leute, die genau dann spontan etwas suchen. Für die ersten 20 Betriebe in Tübingen kostenlos – kein Vertrag, keine Provision.",
  openGraph: {
    title: "Für Betriebe in Tübingen",
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
      "Eine Story ist nach 24 Stunden weg und erreicht die Leute, die euch schon folgen. In beActive sucht jemand aktiv danach, was heute in der Stadt läuft – und findet euch, ohne euch vorher zu kennen.",
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
      <PageHeader
        eyebrow="Für Betriebe in Tübingen"
        title={<>Dienstag,<br />15 Uhr.</>}
        lede={
          <>
            So sieht es in den meisten Läden aus. Nicht, weil das Angebot schlecht ist – sondern weil niemand weiß, dass gerade jetzt Platz ist.{" "}
            <span className="text-accent">Genau dieses Zeitfenster füllen wir.</span>
          </>
        }
        extra={
          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              "Kostenlos für die ersten 20 Betriebe",
              "Kein Vertrag, keine Mindestlaufzeit",
              "Keine Provision auf euren Umsatz",
            ].map((t) => (
              <p key={t} className="card m-0 px-5 py-4 text-sm leading-snug text-ink">
                {t}
              </p>
            ))}
          </div>
        }
      >
        <a href="#kontakt" className="btn">Wir kommen vorbei</a>
        <a href="#so-gehts" className="btn-ghost">Wie es funktioniert</a>
      </PageHeader>

      {/* Das Angebot */}
      <section className="py-20 md:py-24">
        <div className="wrap max-w-[820px]">
          <h2 className="text-3xl md:text-[44px]">
            Wir verkaufen euch keine Werbung.
            <br />
            Wir füllen ein leeres Zeitfenster.
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-ink-soft">
            Ein Café verliert an einem regnerischen Dienstagnachmittag Geld. Die
            Miete läuft, das Personal steht da, die Tische sind leer.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Ein Angebot, das um 13 Uhr sichtbar wird und um 15 Uhr acht Leute
            bringt, ist kein Marketing. Das ist Umsatz, der sonst nicht
            stattgefunden hätte.
          </p>
        </div>
      </section>

      {/* So geht's */}
      <section id="so-gehts" className="border-y border-line bg-dusk py-20 md:py-24">
        <div className="wrap">
          <span className="eyebrow">In drei Schritten</span>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {schritte.map((s) => (
              <div key={s.nr} className="card p-8">
                <p className="font-mono text-sm font-bold tracking-[0.14em] text-accent">{s.nr}</p>
                <h3 className="mt-4 text-2xl">{s.titel}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Die Rechnung */}
      <section className="py-20 md:py-24">
        <div className="wrap max-w-[820px]">
          <span className="eyebrow">Die Rechnung</span>
          <h2 className="mt-4 text-3xl md:text-4xl">
            Ein Rabatt auf einen Gast, der sonst nicht gekommen wäre, kostet
            nichts. Er bringt.
          </h2>

          <div className="card mt-10 overflow-x-auto p-6 font-mono text-sm sm:p-10 sm:text-base">
            <table className="w-full">
              <tbody>
                <tr className="text-ink-soft">
                  <td className="py-2 pr-6">Ein leerer Dienstagnachmittag</td>
                  <td className="whitespace-nowrap py-2 text-right">0 €</td>
                </tr>
                <tr className="text-ink-soft">
                  <td className="py-2 pr-6">Ein Angebot in beActive</td>
                  <td className="whitespace-nowrap py-2 text-right">0 € Kosten</td>
                </tr>
                <tr>
                  <td className="py-2 pr-6">8 Gäste × 6 € Durchschnittsbon</td>
                  <td className="whitespace-nowrap py-2 text-right">48 €</td>
                </tr>
                <tr>
                  <td className="py-2 pr-6">davon Rabatt (−25 %)</td>
                  <td className="whitespace-nowrap py-2 text-right">−12 €</td>
                </tr>
                <tr className="border-t border-line">
                  <td className="pr-6 pt-4 font-bold">Differenz zu einem leeren Nachmittag</td>
                  <td className="whitespace-nowrap pt-4 text-right font-bold text-accent">+36 €</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-xs leading-relaxed text-ink-soft">
            Beispielrechnung zur Veranschaulichung der Logik – keine
            garantierten Zahlen und kein Umsatzversprechen. Bei
            Prozentangaben gilt § 11 PAngV: Referenz ist der niedrigste
            Gesamtpreis der letzten 30 Tage.
          </p>
        </div>
      </section>

      {/* Kontrolle */}
      <section className="border-y border-line bg-dusk py-20 md:py-24">
        <div className="wrap">
          <h2 className="text-3xl md:text-[44px]">Ihr behaltet alles in der Hand</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            Wir entscheiden nichts über euren Laden. Vier Regler, alle bei euch:
          </p>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {kontrolle.map((k) => (
              <div key={k.titel} className="card p-8">
                <h3 className="text-xl">{k.titel}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{k.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Für wen */}
      <section className="py-20 md:py-24">
        <div className="wrap">
          <span className="eyebrow">Für wen das passt</span>
          <div className="mt-10 flex flex-col gap-3">
            {fuerWen.map((f) => (
              <div key={f.typ} className="card grid grid-cols-1 gap-3 p-7 md:grid-cols-3 md:gap-10 sm:p-9">
                <h3 className="text-xl">{f.typ}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{f.beispiele}</p>
                <p className="text-[15px] leading-relaxed text-ink">{f.nutzen}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Was das Profil kann */}
      <section className="border-y border-line bg-dusk py-20 md:py-24">
        <div className="wrap max-w-[820px]">
          <h2 className="text-3xl md:text-[44px]">Was euer Profil kann</h2>
          <ul className="mt-10 flex flex-col gap-4">
            {profilKann.map((p) => (
              <li key={p} className="flex items-start gap-4">
                <span className="mt-[11px] h-2 w-2 shrink-0 rounded-full bg-lime" />
                <span className="text-lg leading-relaxed text-ink-soft">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Kontakt */}
      <section id="kontakt" className="py-20 md:py-24">
        <div className="wrap">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
            <div>
              <span className="eyebrow">Kennenlernen</span>
              <h2 className="mt-4 text-3xl md:text-4xl">Zehn Minuten am Tresen</h2>
              <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
                Am einfachsten zeigen wir es euch direkt am Handy. Sagt uns,
                wann es passt – wir kommen vorbei. Wenn ihr lieber erst
                schreibt, geht das genauso.
              </p>

              <ul className="mt-8 flex flex-col gap-5">
                <li>
                  <p className="label !mb-1">E-Mail</p>
                  <a href={`mailto:${EMAIL}`} className="text-ink underline underline-offset-4 hover:text-accent">
                    {EMAIL}
                  </a>
                </li>
                {TELEFON && (
                  <li>
                    <p className="label !mb-1">Telefon</p>
                    <a href={`tel:${TELEFON.replace(/\s/g, "")}`} className="text-ink underline underline-offset-4 hover:text-accent">
                      {TELEFON}
                    </a>
                  </li>
                )}
                <li>
                  <p className="label !mb-1">Instagram</p>
                  <a
                    href={`https://instagram.com/${INSTAGRAM}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink underline underline-offset-4 hover:text-accent"
                  >
                    @{INSTAGRAM}
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <div className="card p-6 sm:p-8">
                <PartnerForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-dusk py-20 md:py-24">
        <div className="wrap max-w-[820px]">
          <span className="eyebrow">Was uns oft gefragt wird</span>
          <div className="mt-10 flex flex-col gap-10">
            {faq.map((f) => (
              <div key={f.frage}>
                <h3 className="text-xl md:text-2xl">{f.frage}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{f.antwort}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
