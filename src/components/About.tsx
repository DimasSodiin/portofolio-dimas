"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Code, Compass, StackSimple, MapPin, Terminal } from "@phosphor-icons/react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function About() {
  const reduce = useReducedMotion();
  const { t } = useLanguage();

  const metadata = [
    { label: t.about.roleLabel, val: t.about.roleVal, icon: StackSimple },
    { label: t.about.backgroundLabel, val: t.about.backgroundVal, icon: Terminal },
    { label: t.about.focusLabel, val: t.about.focusVal, icon: Compass },
    { label: t.about.toolsLabel, val: t.about.toolsVal, icon: Code },
    { label: t.about.locationLabel, val: t.about.locationVal, icon: MapPin },
  ];

  return (
    <section id="about" className="py-16 sm:py-36 px-4 sm:px-6 bg-[#0f0d0d] border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-28">

        {/* Headline */}
        <motion.h2
          className="font-emilio text-[32px] sm:text-[56px] lg:text-[68px] font-light text-white tracking-[-0.02em] leading-[1.15] sm:leading-[1.1] max-w-4xl"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {t.about.headline}
        </motion.h2>

        {/* Main grid: photo + narrative + metadata */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

          {/* Photo column */}
          <motion.div
            className="lg:col-span-4"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-full aspect-[4/3] sm:aspect-[3/4] overflow-hidden bg-[#171615]">
              <Image
                src="/images/profile.png"
                alt="Dimas Sodiin — UI/UX Designer"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                priority
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </motion.div>

          {/* Narrative column */}
          <motion.div
            className="lg:col-span-5 space-y-6 text-[#878686] text-sm sm:text-base leading-relaxed pt-1 lg:pt-0"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            <p className="font-emilio text-[22px] sm:text-[28px] font-light text-white leading-[1.35] italic pb-6 border-b border-white/[0.05]">
              &ldquo;{t.about.quote}&rdquo;
            </p>

            <div className="space-y-5 pt-1">
              <p>
                {t.about.bio1}
              </p>

              <p>
                {t.about.bio2}
              </p>
            </div>
          </motion.div>

          {/* Profile metadata */}
          <motion.div
            className="lg:col-span-3 space-y-4 sm:space-y-5 pt-6 lg:pt-0 border-t lg:border-t-0 border-white/[0.05]"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="pb-4 sm:pb-6 border-b border-white/[0.05]">
              <span className="font-mono text-[10px] text-white/60 tracking-[0.16em] uppercase">
                {t.about.profileLabel}
              </span>
            </div>

            <div className="space-y-5 pt-2">
              {metadata.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-3.5">
                    <div className="pt-0.5 text-[#878686] flex-shrink-0">
                      <Icon size={16} weight="light" />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-[#878686] tracking-[0.14em] uppercase block mb-0.5">
                        {item.label}
                      </span>
                      <span className="text-[13px] font-medium text-white/90 leading-snug">{item.val}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
