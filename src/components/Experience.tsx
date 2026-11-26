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
    <section id="experience" className="py-16 sm:py-36 px-4 sm:px-6 bg-[#0f0d0d] border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-12 sm:mb-24"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="font-mono text-[10px] text-white/60 tracking-[0.18em] uppercase mb-4 sm:mb-6">
            {t.experience.sectionLabel}
          </p>
          <h2 className="font-emilio text-[32px] sm:text-[60px] font-light text-white tracking-[-0.02em] leading-[1.15] sm:leading-[1.1] max-w-xl">
            {t.experience.heading}
          </h2>
        </motion.div>

        <div className="border-t border-white/[0.05]">
          {items.map((exp, idx) => (
            <motion.div
              key={idx}
              className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-8 py-6 sm:py-10 border-b border-white/[0.05]"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
            >
              {/* Date & Type row on mobile */}
              <div className="sm:col-span-3 font-mono text-[10px] flex justify-between sm:justify-start sm:flex-col gap-2 sm:gap-1">
                <span className="text-white tracking-widest uppercase">{exp.period}</span>
                <span className="text-[#878686] uppercase tracking-widest">{exp.type}</span>
              </div>

              {/* Title + Org */}
              <div className="sm:col-span-4">
                <h3 className="text-[16px] sm:text-[20px] font-light text-white leading-snug mb-1">
                  {exp.title}
                </h3>
                <p className="font-mono text-[10px] sm:text-[11px] text-[#878686] tracking-widest uppercase">{exp.org}</p>
              </div>

              {/* Detail + Certificate Trigger */}
              <div className="sm:col-span-5 text-[13px] sm:text-[14px] text-[#878686] leading-relaxed">
                <p>{exp.detail}</p>
                {exp.certificate && (
                  <button
                    type="button"
                    onClick={() => setSelectedCert(exp)}
                    className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 border border-white/15 bg-white/[0.02] hover:bg-white hover:text-black hover:border-white text-white/80 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors cursor-pointer group"
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
