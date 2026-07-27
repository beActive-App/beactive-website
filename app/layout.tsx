import type { Metadata } from "next";
import { Playfair_Display, Inter, Karla, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  title: "BeActive App – Entdecke Events in deiner Nähe",
  description:
    "Entdecke neue Freizeitaktivitäten und Events in deiner Nähe. Von Sport über Kultur bis Produktivität – finde deine nächste Aktivität.",
  keywords: ["BeActive", "Sport", "Events", "App", "Aktivitäten", "Community"],
  openGraph: {
    title: "BeActive App – Entdecke Events in deiner Nähe",
    description:
      "Entdecke neue Freizeitaktivitäten und Events in deiner Nähe.",
    type: "website",
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
