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
      q: "Ist beActive schon verfügbar?",
      a: istGestartet
        ? "Ja, kostenlos im App Store für iPhone. Eine Android-Version ist in Arbeit."
        : "Die iPhone-App startet zum Wintersemester in Tübingen. Trag dich unten ein, dann sagen wir dir Bescheid, sobald sie im App Store ist. Eine Android-Version ist in Arbeit.",
    },
    {
      q: "Was kostet beActive?",
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
      q: "Finde ich Events in meiner Nähe?",
      a: "Ja. Im Filter wählst du „In meiner Nähe“ und einen Umkreis von 5 bis 100 km. Der Standort wird erst abgefragt, wenn du das antippst, nur für diese Suche verwendet und nicht gespeichert. Ohne Standort filterst du einfach nach Stadt, Tag oder Datum.",
    },
    {
      q: "Was passiert, wenn ein Event voll ist?",
      a: "Bei offenen Events kannst du dich auf die Warteliste setzen. Wird ein Platz frei, rückst du automatisch nach und bekommst eine Nachricht. Außerdem erinnert dich die App am Vortag und eine Stunde vorher an Events, bei denen du dabei bist.",
    },
    {
      q: "Wie löse ich ein Angebot ein?",
      a: "Im Event tippst du auf „Angebot einlösen“ und bekommst einen persönlichen Code mit QR. Den zeigst du vor Ort; der Betrieb scannt ihn oder tippt ihn ein. Jeder Code gilt einmal.",
    },
    {
      q: "Gibt es feste Gruppen, nicht nur einzelne Events?",
      a: "Ja. Unter „Meine Events“ findest du Gruppen: ein fester Kreis mit eigenem Chat, zum Beispiel ein Stammtisch oder eine Laufrunde. Hinzufügen kannst du Leute, mit denen du in der App verbunden bist.",
    },
    {
      q: "Welche Daten habt ihr über mich?",
      a: "Alles, was dein Konto enthält, kannst du dir in der App unter Profil → „Meine Daten exportieren“ als Datei ausgeben lassen. Löschen geht ebenfalls direkt in der App.",
      link: { href: "/datenschutz", text: "Details in der Datenschutzerklärung." },
    },
    {
      q: "In welchen Städten gibt es beActive?",
      a: "Wir starten in Tübingen und machen es hier richtig, bevor wir weiterziehen. Eine Stadt-App lebt davon, dass genug los ist – das bauen wir zuerst.",
    },
    {
      q: "Ich habe einen Betrieb. Wie mache ich mit?",
      a: "Profil anlegen, Angebot für euer schwächstes Zeitfenster einstellen, fertig. Für die ersten 20 Betriebe in Tübingen kostenlos, ohne Vertrag und ohne Provision.",
      link: { href: "/partner", text: "Alles dazu auf der Seite für Betriebe." },
    },
  ];
}
