// Die häufigen Fragen – einmal gepflegt, auf der Startseite und unter /faq gleich.

export type FaqItem = {
  q: string;
  a: string;
  /** Optionaler Link, der als eigener Satz hinter der Antwort steht. */
  link?: { href: string; text: string };
};

export function faqListe(istGestartet: boolean): FaqItem[] {
  return [
    {
      q: "Ist BeActive schon verfügbar?",
      a: istGestartet
        ? "Ja, kostenlos im App Store für iPhone. Eine Android-Version ist in Arbeit."
        : "Die iPhone-App startet zum Wintersemester in Tübingen. Trag dich unten ein, dann sagen wir dir Bescheid, sobald sie im App Store ist. Eine Android-Version ist in Arbeit.",
    },
    {
      q: "Was kostet BeActive?",
      a: "Nichts. Die App ist kostenlos, ohne Abo und ohne Werbung. Bei Angeboten von Betrieben zahlst du den vergünstigten Preis direkt vor Ort, nicht in der App.",
    },
    {
      q: "Muss ich sportlich sein?",
      a: "Nein. Der Name täuscht. Sport ist eine Kategorie von vielen – genauso gibt es Kultur, Natur, Kaffee trinken, Spieleabende, Lerngruppen. Das meistbesuchte Event bei uns war bisher Kaffee und Kennenlernen.",
    },
    {
      q: "Was sind Last-Minute-Deals?",
      a: "Betriebe aus Tübingen stellen für Stunden, in denen bei ihnen wenig los ist, ein vergünstigtes Angebot ein: das Kinoticket am Nachmittag, der Schnupperkurs, Kaffee und Kuchen ab 15 Uhr. Du siehst Preis, Rabatt und wie lange es gilt.",
      link: { href: "#events", text: "Aktuelle Angebote stehen oben in der Liste." },
    },
    {
      q: "Kann ich selbst Events erstellen?",
      a: "Ja, in unter einer Minute: Titel, Ort, Zeit, Kategorie, maximale Teilnehmerzahl. Du entscheidest, ob alle beitreten können oder ob du Anfragen erst bestätigst. Jedes Event hat einen eigenen Chat.",
    },
    {
      q: "Sehe ich vorher, wer dabei ist?",
      a: "Ja. Vor dem Beitreten siehst du, wie viele schon zugesagt haben und wer. Du kommst nicht als Fremde:r rein, sondern als Teil der Gruppe. Genau dafür haben wir das gebaut.",
    },
    {
      q: "Woher kommen die Termine von Sudhaus, Kinos und Co.?",
      a: "Die trägt unsere Redaktion aus den öffentlichen Programmen der Veranstalter zusammen, damit du alles an einem Ort siehst. Diese Einträge sind keine Accounts der Veranstalter und kein Ticketverkauf – jeder Termin verlinkt auf die Originalseite, wo es Tickets und Details gibt. Will ein Veranstalter nicht gelistet werden, nehmen wir ihn sofort raus.",
    },
    {
      q: "In welchen Städten gibt es BeActive?",
      a: "Wir starten in Tübingen und machen es hier richtig, bevor wir weiterziehen. Eine Stadt-App lebt davon, dass genug los ist – das bauen wir zuerst.",
    },
    {
      q: "Ich habe einen Betrieb. Wie mache ich mit?",
      a: "Profil anlegen, Angebot für euer schwächstes Zeitfenster einstellen, fertig. Für die ersten 20 Betriebe in Tübingen kostenlos, ohne Vertrag und ohne Provision.",
      link: { href: "/partner", text: "Alles dazu auf der Seite für Betriebe." },
    },
  ];
}
