import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team – BeActive",
  description: "Das Team hinter BeActive",
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
      <section className="bg-[#2D3E2D] text-[#E8E3D3] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.35em] mb-5 opacity-50">
            Die Menschen dahinter
          </p>
          <h1 className="font-serif text-6xl md:text-8xl font-black leading-none">
            Unser Team
          </h1>
        </div>
      </section>

      <section className="py-24 bg-[#E8E3D3]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="group">
                <div className="aspect-square bg-[#2D3E2D] text-[#E8E3D3] flex items-center justify-center mb-6 group-hover:bg-[#3d5a3d] transition-colors duration-300">
                  <span className="font-serif text-6xl font-black opacity-30 select-none">
                    {member.initials}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2D3E2D] mb-1 leading-snug">
                  {member.name}
                </h3>
                <p className="text-xs uppercase tracking-[0.2em] text-[#2D3E2D] opacity-45">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#2D3E2D] text-[#E8E3D3] text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-5">
            Werde Teil unserer Story
          </h2>
          <p className="opacity-60 leading-relaxed">
            Wir sind ein junges Team mit großer Leidenschaft für Sport und
            Community. Schreib uns – wir freuen uns über jede Verbindung.
          </p>
        </div>
      </section>
    </>
  );
}
