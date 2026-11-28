"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Certificate } from "@phosphor-icons/react";
import { useLanguage } from "@/i18n/LanguageContext";
import CertificateModal, { ExperienceItem } from "./CertificateModal";

export default function Experience() {
  const reduce = useReducedMotion();
  const { t } = useLanguage();
  const items = t.experience.items as readonly ExperienceItem[];
  const [selectedCert, setSelectedCert] = useState<ExperienceItem | null>(null);

  return (
    <section id="experience" className="py-16 sm:py-36 px-4 sm:px-6 bg-bg-primary border-t border-border-subtle transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-12 sm:mb-24"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="font-mono text-[10px] text-accent tracking-[0.18em] uppercase mb-4 sm:mb-6">
            {t.experience.sectionLabel}
          </p>
          <h2 className="font-emilio text-[32px] sm:text-[60px] font-light text-text-primary tracking-[-0.02em] leading-[1.15] sm:leading-[1.1] max-w-xl">
            {t.experience.heading}
          </h2>
        </motion.div>

        <div className="border-t border-border-subtle">
          {items.map((exp, idx) => (
            <motion.div
              key={idx}
              className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-8 py-6 sm:py-10 border-b border-border-subtle"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
            >
              {/* Date & Type row on mobile */}
              <div className="sm:col-span-3 font-mono text-[10px] flex justify-between sm:justify-start sm:flex-col gap-2 sm:gap-1">
                <span className="text-text-primary tracking-widest uppercase">{exp.period}</span>
                <span className="text-text-secondary uppercase tracking-widest">{exp.type}</span>
              </div>

              {/* Title + Org */}
              <div className="sm:col-span-4">
                <h3 className="text-[16px] sm:text-[20px] font-light text-text-primary leading-snug mb-1">
                  {exp.title}
                </h3>
                <p className="font-mono text-[10px] sm:text-[11px] text-text-secondary tracking-widest uppercase">{exp.org}</p>
              </div>

              {/* Detail + Certificate Trigger */}
              <div className="sm:col-span-5 text-[13px] sm:text-[14px] text-text-secondary leading-relaxed">
                <p>{exp.detail}</p>
                {exp.certificate && (
                  <button
                    type="button"
                    onClick={() => setSelectedCert(exp)}
                    className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 border border-border-medium bg-surface-tint hover:bg-accent hover:text-accent-contrast hover:border-accent text-text-primary/85 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors cursor-pointer group"
                  >
                    <Certificate size={13} weight="regular" />
                    <span>{t.experience.viewCertificate}</span>
                    <ArrowUpRight
                      size={12}
                      weight="bold"
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <CertificateModal item={selectedCert} onClose={() => setSelectedCert(null)} />
    </section>
  );
}
