import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { IST_GESTARTET, SITE_URL, STADT } from "@/lib/site";
import { LaunchProvider } from "@/components/site/LaunchContext";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const beschreibung = IST_GESTARTET
  ? `Events, Kurse und Last-Minute-Angebote von Läden aus ${STADT} – in einer App. Jetzt kostenlos im App Store.`
  : `Events, Kurse und Last-Minute-Angebote von Läden aus ${STADT} – in einer App. Entdecken, beitreten oder in einer Minute selbst was starten.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `BeActive – Was heute in ${STADT} läuft`,
    template: "%s – BeActive",
  },
  description: beschreibung,
  alternates: { canonical: "/" },
  openGraph: {
    title: `BeActive – Was heute in ${STADT} läuft`,
    description: beschreibung,
    type: "website",
    locale: "de_DE",
    siteName: "BeActive",
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
    <html lang="de" className={manrope.variable}>
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
