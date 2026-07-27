import type { Metadata } from "next";
import { Playfair_Display, Inter, Fraunces, Karla } from "next/font/google";
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

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
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
    <html lang="de" className={`${playfair.variable} ${inter.variable} ${fraunces.variable} ${karla.variable}`}>
      <body className="bg-[#E8E3D3] text-black">{children}</body>
    </html>
  );
}
