import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "@/components/site/PageHeader";
import { STADT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Team",
  description: "Das Team hinter beActive",
};

const team = [
  { name: "Albin Schroeder", role: "Gründer", initials: "AS" },
  { name: "Tomas Fananas-Hernandez", role: "Gründer", initials: "TF" },
  { name: "Philipp Gerberding", role: "Gründer", initials: "PG" },
  { name: "Helena Mohr", role: "Marketingleiterin", initials: "HM" },
];

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Die Menschen dahinter"
        title="Unser Team"
        lede={`Uns ist in ${STADT} immer wieder aufgefallen: Es gibt ständig was – man erfährt es nur nicht. Also haben wir es an einen Ort gepackt.`}
      />

      <section className="py-16 md:py-24">
        <div className="wrap">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member) => (
              <div key={member.name} className="card p-8 text-center transition-transform duration-300 hover:-translate-y-1">
                <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full border border-accent bg-paper font-display text-3xl font-extrabold text-accent">
                  {member.initials}
                </div>
                <h3 className="text-lg">{member.name}</h3>
                <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.12em] text-ink-soft">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-dusk py-16 md:py-20 text-center">
        <div className="wrap max-w-[640px]">
          <span className="eyebrow">Mitmachen</span>
          <h2 className="mt-4 text-3xl md:text-4xl">Werde Teil unserer Story</h2>
          <p className="mt-5 text-ink-soft">
            Wir sind ein kleines Team aus {STADT} und freuen uns über jede Verbindung – ob Idee, Feedback oder Lust mitzubauen.
          </p>
          <div className="mt-8 flex justify-center gap-3 flex-wrap">
            <Link href="/kontakt" className="btn">Schreib uns</Link>
            <Link href="/partner" className="btn-ghost">Ich habe einen Betrieb →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
