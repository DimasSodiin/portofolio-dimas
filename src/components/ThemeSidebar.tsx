"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { CaretRight, CaretLeft, X } from "@phosphor-icons/react";
import { useTheme, THEME_PRESETS } from "@/theme/ThemeContext";
import { useCursorStyle, CURSOR_PRESETS } from "@/cursor/CursorContext";
import { useLanguage } from "@/i18n/LanguageContext";

/* ─── Shared row item used in both desktop panel & mobile sheet ──── */
function ThemeRow({
  preset,
  isActive,
  onClick,
  lang,
}: {
  preset: (typeof THEME_PRESETS)[number];
  isActive: boolean;
  onClick: () => void;
  lang: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`group flex items-center gap-2.5 w-full px-2 py-1.5 rounded-sm transition-colors duration-150 ${
        isActive ? "bg-surface-tint" : "hover:bg-surface-tint"
      }`}
    >
      <span
        className="w-8 h-5 rounded-sm shrink-0 flex overflow-hidden border border-border-medium"
        style={{
          outline: isActive ? `2px solid ${preset.accentPreview}` : "none",
          outlineOffset: "1.5px",
        }}
      >
        <span className="flex-1" style={{ backgroundColor: preset.bgPreview }} />
        <span className="w-3"   style={{ backgroundColor: preset.accentPreview }} />
      </span>
      <span className="font-mono text-[9.5px] uppercase tracking-widest text-text-secondary group-hover:text-text-primary transition-colors truncate leading-none">
        {lang === "id" ? preset.labelId : preset.labelEn}
      </span>
      {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent shrink-0" />}
    </button>
  );
}

function CursorRow({
  preset,
  isActive,
  onClick,
  lang,
}: {
  preset: (typeof CURSOR_PRESETS)[number];
  isActive: boolean;
  onClick: () => void;
  lang: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`group flex items-center gap-2.5 w-full px-2 py-1.5 rounded-sm transition-colors duration-150 ${
        isActive ? "bg-surface-tint" : "hover:bg-surface-tint"
      }`}
    >
      <span
        className="w-8 h-5 rounded-sm shrink-0 border border-border-medium flex items-center justify-center font-mono text-[12px] text-text-primary bg-bg-secondary"
        style={{
          outline: isActive ? "2px solid var(--accent)" : "none",
          outlineOffset: "1.5px",
        }}
      >
        {preset.symbol}
      </span>
      <span className="font-mono text-[9.5px] uppercase tracking-widest text-text-secondary group-hover:text-text-primary transition-colors truncate leading-none">
        {lang === "id" ? preset.labelId : preset.labelEn}
      </span>
      {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent shrink-0" />}
    </button>
  );
}

/* ─── Section header ──────────────────────────────────────────────── */
function SectionLabel({ label }: { label: string }) {
  return (
    <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-text-muted mb-2">
      {label}
    </p>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
export default function ThemeSidebar() {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { theme, setTheme, activePreset } = useTheme();
  const { cursorStyle, setCursorStyle } = useCursorStyle();
  const { lang } = useLanguage();
  const desktopRef = useRef<HTMLDivElement>(null);
  const sheetRef   = useRef<HTMLDivElement>(null);

  const activeCursor = CURSOR_PRESETS.find(p => p.id === cursorStyle) ?? CURSOR_PRESETS[0];

  /* close desktop panel on outside click */
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const inDesktop = desktopRef.current?.contains(e.target as Node);
      const inSheet   = sheetRef.current?.contains(e.target as Node);
      if (!inDesktop && !inSheet) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  /* Escape key */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const themeLabel  = lang === "id" ? "Tema Warna"  : "Color Theme";
  const cursorLabel = lang === "id" ? "Efek Kursor" : "Cursor Trail";

  /* ══ DESKTOP (md+): left sidebar ════════════════════════════════ */
  const desktopSidebar = (
    <div
      ref={desktopRef}
      className="hidden md:flex fixed left-0 top-1/2 -translate-y-1/2 z-40 items-stretch"
    >
      {/* Tab toggle */}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-label={open ? (lang === "id" ? "Tutup panel" : "Close") : (lang === "id" ? "Kustomisasi" : "Customize")}
        className="flex flex-col items-center justify-center gap-2 px-[7px] py-5 bg-drawer border border-l-0 border-border-medium hover:border-border-strong shadow-md hover:shadow-lg transition-all duration-200 group"
        style={{ borderTopRightRadius: 8, borderBottomRightRadius: 8 }}
      >
        <span
          className="w-4 h-4 rounded-full shrink-0 transition-all duration-300"
          style={{ backgroundColor: activePreset.bgPreview, border: `2px solid ${activePreset.accentPreview}` }}
        />
        <span
          className="font-mono text-[7px] uppercase tracking-[0.18em] text-text-muted group-hover:text-text-primary transition-colors select-none"
          style={{ writingMode: "vertical-rl" }}
        >
          Style
        </span>
        <span className="font-mono text-[10px] text-text-secondary group-hover:text-text-primary transition-colors leading-none select-none">
          {activeCursor.symbol}
        </span>
        <span className="text-text-muted group-hover:text-text-primary transition-colors">
          {open ? <CaretLeft size={9} weight="bold" /> : <CaretRight size={9} weight="bold" />}
        </span>
      </button>

      {/* Desktop sliding panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="desktop-panel"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={shouldReduceMotion   ? { opacity: 0 } : { opacity: 0, x: -14 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            role="dialog"
            aria-label={lang === "id" ? "Panel kostumisasi" : "Style panel"}
            className="bg-drawer border-t border-r border-b border-border-medium shadow-2xl backdrop-blur-xl w-[196px] max-h-[82vh] overflow-y-auto flex flex-col"
            style={{ borderTopRightRadius: 8, borderBottomRightRadius: 8 }}
          >
            <div className="px-3 pt-4 pb-1">
              <SectionLabel label={themeLabel} />
              <div className="flex flex-col gap-0.5">
                {THEME_PRESETS.map(p => (
                  <ThemeRow
                    key={p.id}
                    preset={p}
                    isActive={theme === p.id}
                    onClick={() => { setTheme(p.id); setOpen(false); }}
                    lang={lang}
                  />
                ))}
              </div>
            </div>
            <div className="mx-3 my-3 border-t border-border-subtle" />
            <div className="px-3 pb-4">
              <SectionLabel label={cursorLabel} />
              <div className="flex flex-col gap-0.5">
                {CURSOR_PRESETS.map(p => (
                  <CursorRow
                    key={p.id}
                    preset={p}
                    isActive={cursorStyle === p.id}
                    onClick={() => setCursorStyle(p.id)}
                    lang={lang}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  /* ══ MOBILE (< md): FAB + bottom sheet ══════════════════════════ */
  const mobileSidebar = (
    <div className="md:hidden">
      {/* FAB — bottom-right, directly above scroll-to-top */}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-label={open ? (lang === "id" ? "Tutup" : "Close") : (lang === "id" ? "Kustomisasi" : "Customize")}
        className="fixed bottom-20 right-6 z-40 w-10 h-10 rounded-full bg-drawer border border-border-medium shadow-lg flex items-center justify-center transition-all duration-200 hover:border-border-strong active:scale-95"
      >
        {open
          ? <X size={14} weight="bold" className="text-text-secondary" />
          : (
            <span
              className="w-5 h-5 rounded-full shrink-0"
              style={{
                backgroundColor: activePreset.bgPreview,
                border: `2.5px solid ${activePreset.accentPreview}`,
              }}
            />
          )
        }
      </button>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[38] bg-backdrop"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Bottom sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-sheet"
            ref={sheetRef}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion   ? { opacity: 0 } : { opacity: 0, y: "100%" }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            role="dialog"
            aria-label={lang === "id" ? "Panel kostumisasi" : "Style panel"}
            className="fixed inset-x-0 bottom-0 z-[39] bg-drawer border-t border-border-medium shadow-2xl backdrop-blur-xl"
            style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <span className="w-10 h-1 rounded-full bg-border-medium" />
            </div>

            {/* Content */}
            <div className="px-5 pb-8 pt-3 max-h-[62vh] overflow-y-auto">
              {/* Theme section */}
              <SectionLabel label={themeLabel} />
              <div className="flex flex-col gap-0.5 mb-5">
                {THEME_PRESETS.map(p => (
                  <ThemeRow
                    key={p.id}
                    preset={p}
                    isActive={theme === p.id}
                    onClick={() => { setTheme(p.id); setOpen(false); }}
                    lang={lang}
                  />
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-border-subtle mb-5" />

              {/* Cursor section */}
              <SectionLabel label={cursorLabel} />
              <div className="flex flex-col gap-0.5">
                {CURSOR_PRESETS.map(p => (
                  <CursorRow
                    key={p.id}
                    preset={p}
                    isActive={cursorStyle === p.id}
                    onClick={() => setCursorStyle(p.id)}
                    lang={lang}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      {desktopSidebar}
      {mobileSidebar}
    </>
  );
}
