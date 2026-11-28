"use client";

import { motion, useReducedMotion } from "motion/react";
import { Layout, MagnifyingGlass, PaintBrush, Code } from "@phosphor-icons/react";
import { useLanguage } from "@/i18n/LanguageContext";

const ICONS = [Layout, MagnifyingGlass, PaintBrush, Code];

export default function Capabilities() {
  const reduce = useReducedMotion();
  const { t } = useLanguage();
  const capabilities = t.capabilities.items;

  return (
    <section id="capabilities" className="py-16 sm:py-36 px-4 sm:px-6 bg-bg-primary border-t border-border-subtle transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-12 sm:mb-24"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="font-mono text-[10px] text-accent tracking-[0.18em] uppercase mb-4 sm:mb-6">
            {t.capabilities.sectionLabel}
          </p>
          <h2 className="font-emilio text-[32px] sm:text-[60px] font-light text-text-primary tracking-[-0.02em] leading-[1.15] sm:leading-[1.1] max-w-xl">
            {t.capabilities.heading}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-px bg-transparent sm:bg-border-subtle border-0 sm:border border-border-subtle">
          {capabilities.map((cap, idx) => {
            const Icon = ICONS[idx] || Layout;
            return (
              <motion.div
                key={cap.num}
                className="p-6 sm:p-12 bg-bg-primary border sm:border-0 border-border-subtle flex flex-col justify-between gap-8 sm:gap-10 transition-colors duration-300 hover:bg-bg-hover"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div>
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <span className="font-mono text-[10px] text-accent tracking-[0.16em]">
                      No. {cap.num}
                    </span>
                    <Icon size={20} weight="light" className="text-text-primary/80" />
                  </div>

                  <h3 className="font-emilio text-[24px] sm:text-[34px] font-light mb-3 sm:mb-4 leading-tight text-text-primary">
                    {cap.title}
                  </h3>

                  <p className="text-[13px] sm:text-[14px] leading-relaxed text-text-secondary">
                    {cap.description}
                  </p>
                </div>

                <div className="pt-5 sm:pt-6 border-t border-border-subtle flex flex-wrap gap-1.5 sm:gap-2">
                  {cap.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 sm:py-1 bg-surface-tint text-[9px] sm:text-[10px] font-mono text-text-secondary uppercase tracking-widest"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
