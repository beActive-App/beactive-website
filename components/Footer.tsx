import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/faq", label: "FAQ" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/team", label: "Team" },
  { href: "/kontakt", label: "Kontakt" },
];

const socials = [
  { label: "IG", href: "#" },
  { label: "TW", href: "#" },
  { label: "LI", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#2D3E2D] text-[#E8E3D3]">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <p className="font-serif text-3xl font-black mb-4">BeActive</p>
          <p className="text-sm opacity-60 leading-relaxed max-w-xs">
            Gemeinsam aktiv werden. Die App für Sport, Events und Community.
          </p>
          <p className="text-sm opacity-60 mt-4">support@beactiveapp.de</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] opacity-40 mb-5">Navigation</p>
          <ul className="space-y-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm opacity-60 hover:opacity-100 transition-opacity"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] opacity-40 mb-5">Folge uns</p>
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="w-10 h-10 rounded-full border border-[#E8E3D3]/30 flex items-center justify-center text-xs opacity-50 hover:opacity-100 hover:border-[#E8E3D3] transition-all"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[#E8E3D3]/10">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <p className="text-xs opacity-30 text-center">
            © {new Date().getFullYear()} BeActive. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
