"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ArrowSquareOut } from "@phosphor-icons/react";
import { useLanguage } from "@/i18n/LanguageContext";

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  image: string;
  behanceUrl?: string;
  figmaUrl?: string;
  steppedPanel?: boolean;
  details: {
    overview: string;
    problem: string;
    solution: string;
    role: string;
    timeline: string;
    tools: string[];
    keyFeatures: string[];
  };
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-8 md:p-12 bg-backdrop backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[94vh] bg-bg-primary border border-border-medium rounded-none overflow-y-auto overflow-x-hidden z-10 shadow-2xl flex flex-col">

        {/* Sticky header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-4 bg-bg-primary border-b border-border-medium gap-2">
          {/* Project Tag / Number */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-1.5 h-1.5 bg-accent shrink-0" />
            <span className="font-mono text-[10px] sm:text-[11px] text-text-primary/90 tracking-[0.12em] sm:tracking-[0.14em] uppercase truncate hidden sm:inline">
              Project {project.number} — {project.category}
            </span>
            <span className="font-mono text-[10px] text-text-primary/90 tracking-[0.12em] uppercase truncate sm:hidden">
              #{project.number}
            </span>
          </div>

          {/* Action buttons + Close */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {project.figmaUrl && (
              <a
                href={project.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-1.5 sm:py-2 text-[9px] sm:text-[11px] font-mono uppercase tracking-wider sm:tracking-widest text-text-primary border border-border-medium bg-surface-tint hover:bg-bg-hover hover:border-border-strong transition-colors font-medium shrink-0"
              >
                <span>Figma</span>
                <ArrowSquareOut size={12} weight="bold" className="shrink-0" />
              </a>
            )}
            {project.behanceUrl && (
              <a
                href={project.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-1.5 sm:py-2 text-[9px] sm:text-[11px] font-mono uppercase tracking-wider sm:tracking-widest text-accent-contrast bg-accent hover:bg-accent-hover transition-colors font-medium shrink-0"
              >
                <span>Behance</span>
                <ArrowSquareOut size={12} weight="bold" className="shrink-0" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-1 sm:p-2 text-text-secondary hover:text-text-primary transition-colors shrink-0"
              aria-label={t.projectModal.close}
            >
              <X size={18} weight="regular" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-12 space-y-8 sm:space-y-12">

          {/* Title + overview */}
          <div className="border-b border-border-medium pb-6 sm:pb-8 space-y-3 sm:space-y-4">
            <h2 className="font-emilio text-[28px] sm:text-[56px] font-light text-text-primary leading-[1.1] tracking-tight">
              {project.title}
            </h2>
            <p className="font-mono text-[10px] sm:text-[11px] text-accent uppercase tracking-[0.14em] sm:tracking-[0.18em]">
              {project.category}
            </p>
            <p className="text-[13px] sm:text-[14px] text-text-secondary leading-relaxed max-w-2xl pt-1">
              {project.details.overview}
            </p>
          </div>

          {/* Project image */}
          <div className="relative w-full h-[180px] sm:h-[320px] overflow-hidden bg-bg-secondary border border-border-subtle">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 768px"
              className="object-cover object-top"
            />
          </div>

          {/* Meta — Role / Timeline / Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-mono text-[10px] sm:text-[11px] text-text-primary tracking-[0.18em] uppercase border-b border-border-medium pb-2 sm:pb-3">
                {t.projectModal.projectInfo}
              </h3>
              <div className="pt-1 sm:pt-2 flex flex-col gap-3 sm:gap-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider">
                <div className="grid grid-cols-[80px_1fr] gap-4">
                  <span className="text-text-secondary">{t.projectModal.role}</span>
                  <span className="text-text-primary">{project.details.role}</span>
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-4">
                  <span className="text-text-secondary">{t.projectModal.timeline}</span>
                  <span className="text-text-primary">{project.details.timeline}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-mono text-[10px] sm:text-[11px] text-text-primary tracking-[0.18em] uppercase border-b border-border-medium pb-2 sm:pb-3">
                {t.projectModal.toolsUsed}
              </h3>
              <div className="pt-1 sm:pt-2 flex flex-wrap gap-1.5 sm:gap-2">
                {project.details.tools.map((toolsItem) => (
                  <span
                    key={toolsItem}
                    className="px-2.5 py-1 border border-border-medium text-[10px] sm:text-[11px] font-mono text-text-secondary uppercase tracking-wider"
                  >
                    {toolsItem}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Problem / Solution */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-mono text-[10px] sm:text-[11px] text-text-primary tracking-[0.18em] uppercase border-b border-border-medium pb-2 sm:pb-3">
              {t.projectModal.challengeSolution}
            </h3>
            <div className="pt-1 sm:pt-2 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              <div className="space-y-1.5 sm:space-y-2">
                <p className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">{t.projectModal.theChallenge}</p>
                <p className="text-[12px] sm:text-[13px] text-text-secondary leading-relaxed">{project.details.problem}</p>
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <p className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">{t.projectModal.designSolution}</p>
                <p className="text-[12px] sm:text-[13px] text-text-secondary leading-relaxed">{project.details.solution}</p>
              </div>
            </div>
          </div>

          {/* Key deliverables */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-mono text-[10px] sm:text-[11px] text-text-primary tracking-[0.18em] uppercase border-b border-border-medium pb-2 sm:pb-3">
              {t.projectModal.keyDeliverables}
            </h3>
            <div className="pt-1 sm:pt-2 flex flex-col gap-3 sm:gap-4">
              {project.details.keyFeatures.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="font-mono text-[10px] text-accent tracking-widest shrink-0 pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[12px] sm:text-[13px] text-text-primary/85 leading-relaxed">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags + Close */}
          <div className="border-t border-border-medium pt-6 sm:pt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.highlights.map((h) => (
                <span
                  key={h}
                  className="px-2.5 py-1 border border-border-medium text-[9px] sm:text-[10px] font-mono text-text-secondary uppercase tracking-wider"
                >
                  {h}
                </span>
              ))}
            </div>
            <button
              onClick={onClose}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-border-medium text-text-primary font-mono text-[10px] uppercase tracking-widest hover:bg-surface-tint transition-colors"
            >
              {t.projectModal.close}
              <X size={12} weight="bold" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
