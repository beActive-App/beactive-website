import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt – BeActive",
  description: "Schreib dem BeActive Team – wir freuen uns über dein Feedback.",
};

export default function KontaktPage() {
  return (
    <>
      <section className="bg-[#2D3E2D] text-[#E8E3D3] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.35em] mb-5 opacity-50">
            Schreib uns
          </p>
          <h1 className="font-serif text-6xl md:text-8xl font-black leading-none">
            Kontakt
          </h1>
        </div>
      </section>

      <section className="py-24 bg-[#E8E3D3]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
              <h2 className="font-serif text-2xl font-bold mb-4 text-[#2D3E2D]">
                Lass uns reden
              </h2>
              <p className="text-[#2D3E2D] opacity-55 leading-relaxed text-[15px] mb-8">
                Hast du Ideen, Feedback oder Fragen? Wir freuen uns von dir zu
                hören und arbeiten gemeinsam an einer besseren App.
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] opacity-40 mb-1">
                    E-Mail
                  </p>
                  <p className="text-sm text-[#2D3E2D]">
                    support@beactiveapp.de
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
