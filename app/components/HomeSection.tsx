const categories = ["Sport", "Kultur", "Events", "Produktivität", "Soziales"];

export default function HomeSection() {
  return (
    <section
      id="home"
      className="min-h-screen bg-[#E8E3D3] flex items-center pt-16"
    >
      <div className="max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_440px] gap-12 xl:gap-16 items-center">

          {/* ── Left: Text ── */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-black/40 font-semibold mb-8">
              Deine Aktivitäten-App
            </p>

            <h1
              className="font-serif font-black leading-none text-black mb-8"
              style={{ fontSize: "clamp(4rem, 11vw, 8.5rem)" }}
            >
              Be
              <br />
              Active
            </h1>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((c) => (
                <span
                  key={c}
                  className="px-3 py-1.5 border border-black/20 text-[10px] uppercase tracking-[0.18em] font-semibold text-black/50"
                >
                  {c}
                </span>
              ))}
            </div>

            <p className="text-[17px] leading-relaxed text-black/60 mb-12 max-w-md">
              Entdecke neue Freizeitaktivitäten und Events in deiner Nähe. Von
              Sport über Kultur bis Produktivität – finde deine nächste
              Aktivität.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#instagram"
                className="inline-block bg-[#2D3E2D] text-white px-9 py-4 text-[11px] uppercase tracking-[0.25em] font-bold hover:bg-[#1e2e1e] active:scale-[0.98] transition-all"
              >
                Jetzt App laden
              </a>
              <a
                href="#instagram"
                className="inline-block border border-black/25 text-black/60 px-9 py-4 text-[11px] uppercase tracking-[0.25em] font-bold hover:border-black hover:text-black transition-all"
              >
                Updates folgen
              </a>
            </div>
          </div>

          {/* ── Right: Image placeholder ── */}
          <div className="hidden lg:block">
            {/* Outer frame */}
            <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
              <div className="absolute inset-0 bg-[#2D3E2D]">
                {/* Dot-grid texture */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-[0.07]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="dots"
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle cx="2" cy="2" r="1.5" fill="#E8E3D3" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>

                {/* Center label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  {/* Camera / image icon */}
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    className="opacity-20"
                  >
                    <rect
                      x="4"
                      y="10"
                      width="40"
                      height="30"
                      rx="3"
                      stroke="#E8E3D3"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="24"
                      cy="25"
                      r="8"
                      stroke="#E8E3D3"
                      strokeWidth="1.5"
                    />
                    <circle cx="24" cy="25" r="3" fill="#E8E3D3" className="opacity-60" />
                    <path
                      d="M17 10 L20 5 H28 L31 10"
                      stroke="#E8E3D3"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <p className="text-[#E8E3D3] text-[10px] uppercase tracking-[0.3em] font-semibold opacity-30">
                    App Screenshot
                  </p>
                </div>

                {/* Corner crosshairs */}
                {[
                  "top-0 left-0",
                  "top-0 right-0 rotate-90",
                  "bottom-0 right-0 rotate-180",
                  "bottom-0 left-0 -rotate-90",
                ].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} p-3 opacity-20`}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M0 8 H6 M8 0 V6" stroke="#E8E3D3" strokeWidth="1.5" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
