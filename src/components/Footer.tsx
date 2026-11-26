"use client";

import { useLanguage } from "@/i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-8 px-4 sm:px-6 bg-[#000000] border-t border-white/[0.06] text-[12px] text-[#878686]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-semibold text-white text-[14px]">
          <span className="w-1.5 h-1.5 bg-[#ffffff]" />
          Dimas Sodiin
        </div>

        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-center">
          {t.footer.tagline}
        </div>

        <div className="font-mono text-[11px]">
          <span className="text-white/70">2026 Dimas Sodiin</span>
        </div>
      </div>
    </footer>
  );
}
