import type { Metadata } from "next";
import { Playfair_Display, Inter, Karla, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BeActive – Was heute in Tübingen läuft",
    template: "%s – BeActive",
  },
  description:
    "Events, Kurse und Last-Minute-Angebote von Läden aus Tübingen – in einer App. Entdecken, beitreten oder in einer Minute selbst was starten.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "BeActive – Was heute in Tübingen läuft",
    description:
      "Events, Kurse und Last-Minute-Angebote von Läden aus Tübingen – in einer App.",
    type: "website",
    locale: "de_DE",
    siteName: "BeActive",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${playfair.variable} ${inter.variable} ${karla.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#0b140f] text-[#eaf2e4]">{children}</body>
    </html>
  );
}
