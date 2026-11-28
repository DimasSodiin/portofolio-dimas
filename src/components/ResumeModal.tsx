"use client";

import { useEffect } from "react";
import { X, DownloadSimple, MapPin, Envelope, Trophy, BookOpen } from "@phosphor-icons/react";
import { useLanguage } from "@/i18n/LanguageContext";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { lang, t } = useLanguage();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const skillsList = lang === "id" ? [
    { label: "UI/UX", val: "UI & UX Design, User Flow, Wireframing, Prototyping, Design Systems" },
    { label: "Tools", val: "Figma (Menengah), Adobe Illustrator, Adobe XD, Canva" },
    { label: "Coding", val: "HTML, CSS, JavaScript, PHP, Flutter (Dasar)" },
    { label: "Pendukung", val: "Desain Grafis, Creative Thinking, Problem Solving, Kepemimpinan Tim" },
  ] : [
    { label: "UI/UX", val: "UI & UX Design, User Flow, Wireframing, Prototyping, Design Systems" },
    { label: "Tools", val: "Figma (Intermediate), Adobe Illustrator, Adobe XD, Canva" },
    { label: "Coding", val: "HTML, CSS, JavaScript, PHP, Flutter (Basics)" },
    { label: "Soft Skills", val: "Graphic Design, Creative Thinking, Problem Solving, Leadership" },
  ];

  const awardsList = lang === "id" ? [
    { year: "2024", title: "Juara 2 — Kompetisi UI/UX (INFEST)", org: "Universitas PGRI Semarang" },
    { year: "2024", title: "Juara 2 — Kompetisi Poster (EXPOSURE: Energi Terbarukan)", org: "SRE IT Telkom Purwokerto" },
  ] : [
    { year: "2024", title: "2nd Place — UI/UX Competition (INFEST)", org: "PGRI University Semarang" },
    { year: "2024", title: "2nd Place — Poster Competition (EXPOSURE: Renewable Energy)", org: "SRE IT Telkom Purwokerto" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-8 md:p-12 bg-backdrop backdrop-blur-sm">
      {/* Background overlay click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[94vh] bg-bg-primary border border-border-medium rounded-none overflow-y-auto overflow-x-hidden z-10 shadow-2xl flex flex-col">
        {/* Sticky header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-4 bg-bg-primary border-b border-border-medium gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-1.5 h-1.5 bg-accent shrink-0" />
            <span className="font-mono text-[10px] sm:text-[11px] text-text-primary/90 tracking-[0.12em] sm:tracking-[0.14em] uppercase font-semibold truncate">
              {t.resume.title}
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <a
              href="/cv-dimas-sodiin.pdf"
              download="CV_Dimas_Sodiin.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 text-[9px] sm:text-[11px] font-mono uppercase tracking-wider sm:tracking-widest text-accent-contrast bg-accent hover:bg-accent-hover transition-colors shrink-0 font-medium"
            >
              <DownloadSimple size={13} weight="bold" />
              <span>{t.resume.savePdf}</span>
            </a>
            <button
              onClick={onClose}
              className="p-1 sm:p-2 text-text-secondary hover:text-text-primary transition-colors shrink-0"
              aria-label="Close resume"
            >
              <X size={18} weight="regular" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-12 space-y-8 sm:space-y-12">
          {/* Resume header */}
          <div className="border-b border-border-medium pb-6 sm:pb-8 space-y-3 sm:space-y-4">
            <h1 className="font-emilio text-[32px] sm:text-[56px] font-light text-text-primary leading-[1.1] tracking-tight">
              Dimas Sodiin
            </h1>
            <p className="font-mono text-[10px] sm:text-[11px] text-accent uppercase tracking-[0.14em] sm:tracking-[0.18em]">
              {t.resume.subtitle}
            </p>
            <p className="text-[13px] sm:text-[14px] text-text-secondary leading-relaxed max-w-2xl pt-1">
              {t.resume.summary}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-6 pt-2 font-mono text-[10px] sm:text-[11px] text-text-secondary tracking-wider">
              <span className="flex items-center gap-2 uppercase">
                <MapPin size={14} className="shrink-0" /> Banyumas, Jawa Tengah, Indonesia
              </span>
              <span className="flex items-center gap-2 normal-case">
                <Envelope size={14} className="shrink-0" /> sodiindimas@gmail.com
              </span>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="font-mono text-[10px] sm:text-[11px] text-text-primary tracking-[0.18em] uppercase flex items-center gap-2.5 border-b border-border-medium pb-2 sm:pb-3">
              <BookOpen size={14} className="text-accent" />
              {t.resume.education}
            </h2>
            <div className="pt-1 sm:pt-2 space-y-5 sm:space-y-6">
              {/* S1 Telkom University */}
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-[14px] sm:text-[15px] font-medium text-text-primary">
                  <span>{t.resume.educationDegree}</span>
                  <span className="font-mono text-[9px] sm:text-[10px] text-text-secondary uppercase tracking-widest border border-border-medium px-2 py-0.5 self-start sm:self-auto">
                    {t.resume.educationPeriod}
                  </span>
                </div>
                <p className="text-[12px] sm:text-[13px] text-text-secondary leading-relaxed">
                  {t.resume.educationDesc}
                </p>
              </div>

              {/* SMK Telkom */}
              <div className="space-y-1.5 sm:space-y-2 pt-2 border-t border-border-subtle">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-[14px] sm:text-[15px] font-medium text-text-primary">
                  <span>{lang === "id" ? "Rekayasa Perangkat Lunak, SMK Telkom Purwokerto" : "Software Engineering, SMK Telkom Purwokerto"}</span>
                  <span className="font-mono text-[9px] sm:text-[10px] text-text-secondary uppercase tracking-widest border border-border-medium px-2 py-0.5 self-start sm:self-auto">
                    2019 – 2022
                  </span>
                </div>
                <p className="text-[12px] sm:text-[13px] text-text-secondary leading-relaxed">
                  {lang === "id"
                    ? "Mempelajari dasar-dasar pemrograman, pengembangan perangkat lunak, dan teknologi informasi."
                    : "Studied software engineering fundamentals, structured programming, and information technology."}
                </p>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="font-mono text-[10px] sm:text-[11px] text-text-primary tracking-[0.18em] uppercase flex items-center gap-2.5 border-b border-border-medium pb-2 sm:pb-3">
              <Trophy size={14} className="text-accent" />
              {t.resume.experienceTitle}
            </h2>
            <div className="pt-1 sm:pt-2 space-y-6 sm:space-y-8">
              {t.experience.items.map((e, idx) => (
                <div key={idx} className="space-y-1.5 sm:space-y-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-[14px] sm:text-[15px] font-medium text-text-primary">
                    <span>{e.title} <span className="text-text-muted mx-1 sm:mx-2">—</span> {e.org}</span>
                    <span className="font-mono text-[10px] sm:text-[11px] text-text-secondary uppercase tracking-widest shrink-0">{e.period}</span>
                  </div>
                  <p className="text-[12px] sm:text-[13px] text-text-secondary leading-relaxed max-w-2xl">{e.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {/* Skills */}
            <div className="space-y-3 sm:space-y-4">
              <h2 className="font-mono text-[10px] sm:text-[11px] text-text-primary tracking-[0.18em] uppercase border-b border-border-medium pb-2 sm:pb-3">
                {t.resume.skillsTitle}
              </h2>
              <div className="pt-1 sm:pt-2 flex flex-col gap-3 sm:gap-4 font-mono text-[10px] sm:text-[11px] tracking-wider">
                {skillsList.map((s) => (
                  <div key={s.label} className="grid grid-cols-[70px_1fr] sm:grid-cols-[80px_1fr] gap-3 sm:gap-4">
                    <span className="text-text-secondary uppercase">{s.label}</span>
                    <span className="text-text-primary leading-relaxed normal-case">{s.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div className="space-y-3 sm:space-y-4">
              <h2 className="font-mono text-[10px] sm:text-[11px] text-text-primary tracking-[0.18em] uppercase border-b border-border-medium pb-2 sm:pb-3">
                {t.resume.honorsTitle}
              </h2>
              <div className="pt-1 sm:pt-2 flex flex-col gap-4 sm:gap-6">
                {awardsList.map((a) => (
                  <div key={a.title} className="space-y-1">
                    <div className="font-mono text-[9px] sm:text-[10px] text-accent tracking-widest">{a.year}</div>
                    <div className="text-[13px] sm:text-[14px] text-text-primary font-medium">{a.title}</div>
                    <div className="text-[11px] sm:text-[12px] text-text-secondary">{a.org}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
