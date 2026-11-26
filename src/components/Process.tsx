"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Process() {
  const reduce = useReducedMotion();
  const { t } = useLanguage();
  const steps = t.process.steps;

  return (
    <section id="process" className="py-16 sm:py-36 px-4 sm:px-6 bg-[#0f0d0d] border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-12 sm:mb-24"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="font-mono text-[10px] text-white/60 tracking-[0.18em] uppercase mb-4 sm:mb-6">
            {t.process.sectionLabel}
          </p>
          <h2 className="font-emilio text-[32px] sm:text-[60px] font-light text-white tracking-[-0.02em] leading-[1.15] sm:leading-[1.1] max-w-lg">
            {t.process.heading}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-px bg-transparent sm:bg-white/[0.05] border-0 sm:border border-white/[0.05]">
          {steps.map((step) => (
            <motion.div
              key={step.num}
              className="p-6 sm:p-10 bg-[#0f0d0d] border sm:border-0 border-white/[0.05] flex flex-col gap-4 sm:gap-6"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] sm:text-[12px] text-white/60 uppercase tracking-widest">
                  {step.num}
                </span>
              </div>

              <div>
                <h3 className="font-emilio text-[22px] sm:text-[28px] font-light text-white mb-2 sm:mb-3">
                  {step.title}
                </h3>
                <p className="text-[#878686] text-[13px] sm:text-[14px] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
