"use client";

import { useState, useEffect } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#team", label: "Team" },
  { href: "#instagram", label: "Instagram" },
  { href: "#kontakt", label: "Kontakt" },
  { href: "#faq", label: "FAQ" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 bg-[#E8E3D3] ${
        scrolled ? "shadow-[0_1px_0_0_rgba(0,0,0,0.08)]" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="font-serif text-xl md:text-2xl font-black text-black tracking-tight"
          onClick={() => setOpen(false)}
        >
          BeActive App
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[11px] uppercase tracking-[0.18em] font-semibold text-black/60 hover:text-black transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-10 h-10"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menü öffnen"
        >
          <span
            className={`block w-6 h-[1.5px] bg-black transition-all duration-300 origin-center ${
              open ? "rotate-45 translate-y-[6.5px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-black transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-black transition-all duration-300 origin-center ${
              open ? "-rotate-45 -translate-y-[6.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-[#E8E3D3] ${
          open ? "max-h-72 border-t border-black/8" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col py-3">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="block px-6 py-3.5 text-[11px] uppercase tracking-[0.18em] font-semibold text-black/60 hover:text-black hover:bg-black/4 transition-all"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
