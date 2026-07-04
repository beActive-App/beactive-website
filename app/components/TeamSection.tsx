const team = [
  { name: "Albin Schroeder", role: "Gründer", initials: "AS" },
  { name: "Tomas Fananas-Hernandez", role: "Gründer", initials: "TF" },
  { name: "Philipp Gerberding", role: "Gründer", initials: "PG" },
  { name: "Helena Mohr", role: "Marketingleiterin", initials: "HM" },
];

export default function TeamSection() {
  return (
    <section id="team" className="py-28 bg-[#E8E3D3]">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-[11px] uppercase tracking-[0.35em] text-black/40 mb-5 font-semibold">
          Die Menschen dahinter
        </p>
        <h2 className="font-serif text-5xl md:text-6xl font-black text-black mb-16">
          Unser Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div key={member.name} className="group">
              {/* Placeholder image */}
              <div className="aspect-square bg-[#2D3E2D] mb-5 flex items-center justify-center overflow-hidden group-hover:bg-[#3d5a3d] transition-colors duration-300">
                <span className="font-serif text-6xl font-black text-white/20 select-none">
                  {member.initials}
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-black mb-1 leading-snug">
                {member.name}
              </h3>
              <p className="text-[11px] uppercase tracking-[0.2em] text-black/45 font-semibold">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
