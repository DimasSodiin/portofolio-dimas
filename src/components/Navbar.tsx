"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { useLanguage } from "@/i18n/LanguageContext";

interface NavbarProps {
  onOpenResume: () => void;
}

export default function Navbar({ onOpenResume }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const { lang, t, toggleLanguage } = useLanguage();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  const links = [
    { name: t.nav.work, href: "#work" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.skills, href: "#capabilities" },
    { name: t.nav.experience, href: "#experience" },
    { name: t.nav.contact, href: "#contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-6 px-3 sm:px-6 pointer-events-none">
        <div className="max-w-6xl mx-auto pointer-events-auto">
          <motion.nav
            className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 rounded-none border-b backdrop-blur-md"
            animate={
              scrolled
                ? {
                    backgroundColor: "rgba(15, 13, 13, 0.9)",
                    borderColor: "rgba(255, 255, 255, 0.08)",
                  }
                : {
                    backgroundColor: "rgba(15, 13, 13, 0.4)",
                    borderColor: "rgba(255, 255, 255, 0.03)",
                  }
            }
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: "easeOut" }}
          >
            {/* Brand */}
            <a
              href="#hero"
              className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-white hover:text-white/80 transition-colors shrink-0 uppercase tracking-widest font-mono py-1"
            >
              <span className="w-1.5 h-1.5 bg-white shrink-0" />
              Dimas Sodiin
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-[11px] font-mono text-[#878686] hover:text-white transition-colors uppercase tracking-widest"
                >
                  {l.name}
                </a>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4 shrink-0">
              {/* Language Switcher Badge */}
              <div className="flex items-center border border-white/10 p-0.5 bg-black/40">
                <button
                  type="button"
                  onClick={() => lang !== "id" && toggleLanguage()}
                  className={`px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase transition-colors ${
                    lang === "id"
                      ? "bg-white text-black font-semibold"
                      : "text-[#878686] hover:text-white"
                  }`}
                  aria-label="Ganti bahasa ke Indonesia"
                >
                  ID
                </button>
                <button
                  type="button"
                  onClick={() => lang !== "en" && toggleLanguage()}
                  className={`px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase transition-colors ${
                    lang === "en"
                      ? "bg-white text-black font-semibold"
                      : "text-[#878686] hover:text-white"
                  }`}
                  aria-label="Switch language to English"
                >
                  EN
                </button>
              </div>

              <button
                type="button"
                onClick={onOpenResume}
                className="text-[11px] font-mono text-[#878686] hover:text-white uppercase tracking-widest transition-colors flex items-center gap-1.5"
              >
                {t.nav.resume}
              </button>
              <a
                href="#contact"
                className="text-[11px] font-mono text-black bg-white hover:bg-gray-200 px-4 py-2 uppercase tracking-widest transition-colors flex items-center gap-1.5"
              >
                {t.nav.letsTalk}
              </a>
            </div>

            {/* Mobile Controls — Clean Header without overcrowded toggle */}
            <div className="flex md:hidden items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenResume}
                className="text-[10px] font-mono text-[#878686] hover:text-white uppercase tracking-wider px-2 py-1 border border-white/10"
              >
                {t.nav.resume}
              </button>
              <button
                type="button"
                onClick={() => setMobileOpen((o) => !o)}
                className="p-1.5 text-white/90 hover:text-white transition-colors border border-white/10 bg-white/[0.02]"
                aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
              >
                {mobileOpen ? <X weight="regular" className="w-5 h-5" /> : <List weight="regular" className="w-5 h-5" />}
              </button>
            </div>
          </motion.nav>

          {/* Mobile Drawer Menu */}
          {mobileOpen && (
            <motion.div
              className="mt-2 p-5 bg-[#0f0d0d]/98 backdrop-blur-xl border border-white/10 flex flex-col gap-5 pointer-events-auto shadow-2xl"
              initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {/* Language Switcher inside Hamburger Drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#878686]">
                    {lang === "id" ? "Pilih Bahasa" : "Language"}
                  </span>
                  <span className="text-[11px] text-white/60">
                    {lang === "id" ? "Bahasa Indonesia" : "English"}
                  </span>
                </div>
                <div className="flex items-center border border-white/15 p-0.5 bg-black/60">
                  <button
                    type="button"
                    onClick={() => lang !== "id" && toggleLanguage()}
                    className={`px-3 py-1.5 text-[11px] font-mono tracking-widest uppercase transition-colors ${
                      lang === "id"
                        ? "bg-white text-black font-semibold"
                        : "text-[#878686] hover:text-white"
                    }`}
                  >
                    ID
                  </button>
                  <button
                    type="button"
                    onClick={() => lang !== "en" && toggleLanguage()}
                    className={`px-3 py-1.5 text-[11px] font-mono tracking-widest uppercase transition-colors ${
                      lang === "en"
                        ? "bg-white text-black font-semibold"
                        : "text-[#878686] hover:text-white"
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>

              {/* Navigation Links with generous touch targets */}
              <div className="flex flex-col divide-y divide-white/[0.04]">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-3 text-[12px] font-mono text-[#878686] hover:text-white uppercase tracking-widest transition-colors flex items-center justify-between"
                  >
                    <span>{l.name}</span>
                    <span className="text-[10px] text-white/30 font-sans">→</span>
                  </a>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center text-[11px] font-mono text-black bg-white hover:bg-gray-200 py-3 uppercase tracking-widest transition-colors block font-medium"
                >
                  {t.nav.letsTalk}
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </header>
    </>
  );
}
