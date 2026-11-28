"use client";

import { useLanguage } from "@/i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-8 px-4 sm:px-6 bg-bg-footer border-t border-border-subtle text-[12px] text-text-secondary transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-semibold text-text-primary text-[14px]">
          <span className="w-1.5 h-1.5 bg-accent" />
          Dimas Sodiin
        </div>

        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-center">
          {t.footer.tagline}
        </div>

        <div className="font-mono text-[11px]">
          <span className="text-text-primary/70">2026 Dimas Sodiin</span>
        </div>
      </div>
    </footer>
  );
}
