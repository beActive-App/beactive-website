import type { Metadata, Viewport } from "next";
import { Inter, Karla, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { IST_GESTARTET, SITE_URL, STADT } from "@/lib/site";
import { LaunchProvider } from "@/components/site/LaunchContext";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

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

const beschreibung = IST_GESTARTET
  ? `Events, Kurse und Last-Minute-Angebote von Läden aus ${STADT} – in einer App. Jetzt kostenlos im App Store.`
  : `Events, Kurse und Last-Minute-Angebote von Läden aus ${STADT} – in einer App. Entdecken, beitreten oder in einer Minute selbst was starten.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `beActive – Was heute in ${STADT} läuft`,
    template: "%s – beActive",
  },
  description: beschreibung,
  alternates: { canonical: "/" },
  openGraph: {
    title: `beActive – Was heute in ${STADT} läuft`,
    description: beschreibung,
    type: "website",
    locale: "de_DE",
    siteName: "beActive",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b140f",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${inter.variable} ${karla.variable} ${jetbrainsMono.variable}`}>
      <body>
        <LaunchProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </LaunchProvider>
      </body>
    </html>
  );
}
