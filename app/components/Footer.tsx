const INSTAGRAM_URL = "#"; // gleicher Platzhalter — einmal updaten reicht
const infoLinks = ["Kontakt", "Impressum", "Datenschutz", "Nutzungsbedingungen"];

function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
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

export default function Footer() {
  return (
    <footer className="bg-[#2D3E2D] text-[#E8E3D3]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <p className="font-serif text-2xl font-black mb-3">BeActive App</p>
            <p className="text-sm opacity-55 leading-relaxed max-w-xs">
              Entdecke neue Freizeitaktivitäten und Events in deiner Nähe.
            </p>
          </div>

          {/* Info Links */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] opacity-35 mb-5 font-semibold">
              Info Links
            </p>
            <ul className="space-y-2.5">
              {infoLinks.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm opacity-55 hover:opacity-100 transition-opacity"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] opacity-35 mb-5 font-semibold">
              Folge uns
            </p>
            <a
              href={INSTAGRAM_URL}
              className="inline-flex items-center gap-3 group"
            >
              <span className="w-9 h-9 rounded-full border border-[#E8E3D3]/20 flex items-center justify-center opacity-55 group-hover:opacity-100 group-hover:border-[#E8E3D3]/60 transition-all">
                <InstagramIcon />
              </span>
              <span className="text-sm opacity-55 group-hover:opacity-100 transition-opacity">
                Instagram
              </span>
            </a>
          </div>
        </div>

        <div className="border-t border-[#E8E3D3]/10 pt-8">
          <p className="text-xs opacity-25 text-center">
            © {new Date().getFullYear()} BeActive. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
