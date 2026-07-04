const INSTAGRAM_URL = "#"; // Link hier eintragen

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function InstagramSection() {
  return (
    <section id="instagram" className="py-28 bg-[#C5E74D]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.35em] text-black/50 mb-5 font-semibold">
          Social Media
        </p>

        <h2
          className="font-serif font-black text-black leading-tight mb-6"
          style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}
        >
          Folge uns auf
          <br />
          Instagram
        </h2>

        <p className="text-black/65 text-lg mb-14 max-w-xl mx-auto leading-relaxed">
          Bleib auf dem Laufenden – wir teilen Updates, neue Features und
          Events direkt auf Instagram.
        </p>

        <a
          href={INSTAGRAM_URL}
          className="inline-flex items-center gap-3 bg-[#2D3E2D] text-white px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-bold hover:bg-[#1e2e1e] active:scale-[0.98] transition-all"
        >
          <InstagramIcon size={16} />
          Profil besuchen
        </a>
      </div>
    </section>
  );
}
