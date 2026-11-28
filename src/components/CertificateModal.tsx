"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Certificate, ArrowSquareOut } from "@phosphor-icons/react";
import { useLanguage } from "@/i18n/LanguageContext";

export interface ExperienceItem {
  type: string;
  period: string;
  title: string;
  org: string;
  detail: string;
  certificate?: string;
}

interface CertificateModalProps {
  item: ExperienceItem | null;
  onClose: () => void;
}

export default function CertificateModal({ item, onClose }: CertificateModalProps) {
  const { t } = useLanguage();
  const [failedImageSrc, setFailedImageSrc] = useState<string | null>(null);
  const [pdfCheck, setPdfCheck] = useState<{ src: string; ok: boolean } | null>(null);

  const certSrc = item?.certificate;
  const isPdf = Boolean(certSrc?.toLowerCase().endsWith(".pdf"));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (item) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [item, onClose]);

  useEffect(() => {
    if (!certSrc || !isPdf) return;
    const controller = new AbortController();
    fetch(certSrc, { method: "HEAD", signal: controller.signal })
      .then((res) => setPdfCheck({ src: certSrc, ok: res.ok }))
      .catch((err) => {
        if (err.name !== "AbortError") {
          setPdfCheck({ src: certSrc, ok: false });
        }
      });
    return () => controller.abort();
  }, [certSrc, isPdf]);

  if (!item || !certSrc) return null;

  const isCheckingPdf = isPdf && pdfCheck?.src !== certSrc;
  const isPdfReady = isPdf && pdfCheck?.src === certSrc && pdfCheck.ok;
  const hasMissingFile = isPdf
    ? pdfCheck?.src === certSrc && !pdfCheck.ok
    : failedImageSrc === certSrc;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-8 md:p-12 bg-backdrop backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${t.experience.certificateLabel} — ${item.title}`}
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl max-h-[94vh] bg-bg-primary border border-border-medium rounded-none overflow-hidden z-10 shadow-2xl flex flex-col">
        {/* Sticky header */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 px-4 sm:px-6 py-3.5 sm:py-5 bg-bg-primary border-b border-border-medium">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            <span className="font-mono text-[10px] sm:text-[11px] text-text-primary/90 tracking-[0.12em] sm:tracking-[0.14em] uppercase truncate">
              {t.experience.certificateLabel} — {item.title}
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {isPdfReady && (
              <a
                href={certSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-text-primary/85 border border-border-medium bg-surface-tint hover:bg-bg-hover hover:text-text-primary transition-colors"
              >
                <span className="hidden sm:inline">{t.experience.openNewTab}</span>
                <span className="sm:hidden">PDF</span>
                <ArrowSquareOut size={12} weight="bold" />
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              aria-label={t.experience.close}
            >
              <X size={18} weight="light" />
            </button>
          </div>
        </div>

        {/* Lightbox Body */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] sm:text-[11px] text-text-secondary uppercase tracking-widest">
            <span>{item.org}</span>
            <span>{item.period}</span>
          </div>

          <div className="relative w-full h-[58vh] sm:h-[70vh] bg-bg-secondary border border-border-subtle flex items-center justify-center overflow-hidden">
            {isCheckingPdf ? (
              <p className="font-mono text-[10px] sm:text-[11px] text-text-secondary uppercase tracking-widest">
                {t.experience.loadingPreview}
              </p>
            ) : hasMissingFile ? (
              <div className="flex flex-col items-center justify-center text-center px-6 py-12 max-w-md space-y-3">
                <Certificate size={32} weight="light" className="text-text-muted" />
                <p className="font-mono text-[11px] text-text-primary/85 uppercase tracking-widest">
                  {t.experience.certificateMissing}
                </p>
                <p className="text-[12px] text-text-secondary leading-relaxed">
                  {t.experience.certificateMissingHint}
                </p>
                <code className="font-mono text-[10px] text-text-secondary border border-border-medium bg-surface-tint px-2.5 py-1">
                  public{certSrc}
                </code>
              </div>
            ) : isPdf ? (
              <iframe
                src={`${certSrc}#toolbar=0&navpanes=0&view=FitH`}
                title={`${t.experience.certificateLabel} ${item.title} — ${item.org}`}
                className="w-full h-full border-0 bg-bg-secondary"
              />
            ) : (
              <Image
                src={certSrc}
                alt={`${t.experience.certificateLabel} ${item.title} — ${item.org}`}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-contain p-2 sm:p-4"
                onError={() => setFailedImageSrc(certSrc)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
