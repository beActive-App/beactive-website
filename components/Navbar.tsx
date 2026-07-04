"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/faq", label: "FAQ" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/team", label: "Team" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-[#2D3E2D] text-[#E8E3D3]">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-2xl font-black tracking-wide"
          onClick={() => setOpen(false)}
        >
          BeActive
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`text-xs uppercase tracking-[0.15em] transition-opacity hover:opacity-60 ${
                  pathname === l.href ? "opacity-100 border-b border-[#E8E3D3] pb-0.5" : "opacity-70"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 flex flex-col gap-[5px]"
          onClick={() => setOpen(!open)}
          aria-label="Navigation öffnen"
        >
          <span
            className={`block w-6 h-[1.5px] bg-[#E8E3D3] transition-all duration-300 origin-center ${
              open ? "rotate-45 translate-y-[6.5px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-[#E8E3D3] transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-[#E8E3D3] transition-all duration-300 origin-center ${
              open ? "-rotate-45 -translate-y-[6.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 border-t border-[#3d5a3d]" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col py-4">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block px-6 py-4 text-xs uppercase tracking-[0.15em] opacity-70 hover:opacity-100 hover:bg-[#3d5a3d] transition-all"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
