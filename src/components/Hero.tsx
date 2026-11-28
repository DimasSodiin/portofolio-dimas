"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "@phosphor-icons/react";
import { useLanguage } from "@/i18n/LanguageContext";

function PlusGrid() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.1] text-text-primary [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]">
      <motion.div
        className="absolute inset-0 w-[200%] h-[200%] -left-[50%] -top-[50%]"
        animate={{ rotate: 360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
      >
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="plus-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 30 20 L 30 40 M 20 30 L 40 30" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#plus-grid)" />
        </svg>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100dvh] bg-bg-primary overflow-hidden flex flex-col selection:bg-accent selection:text-accent-contrast transition-colors duration-300"
    >
      <PlusGrid />
      
      {/* Absolute massive decorative element */}
      <div
        suppressHydrationWarning
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 pointer-events-none z-0 opacity-[0.09] text-text-primary"
        aria-hidden="true"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="text-[60vw] leading-none font-emilio font-light select-none"
        >
          *
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-col justify-between flex-1 px-4 sm:px-6 pb-8 pt-24 sm:pt-32 mx-auto w-full max-w-6xl h-full min-h-[100dvh]">
        
        {/* Top Info Bar */}
        <motion.div 
          className="flex justify-between items-start gap-4"
          initial={reduce ? false : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <div className="font-mono text-[10px] uppercase tracking-widest text-text-secondary flex flex-col gap-1 max-w-[200px] sm:max-w-none">
            <span className="text-text-primary">Banyumas, Indonesia</span>
            <span className="text-[9px] sm:text-[10px] text-accent">{t.hero.availability}</span>
          </div>
          {/* Scroll CTA */}
          <a
            href="#work"
            className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors flex flex-col items-end gap-1 group shrink-0"
            aria-label="Scroll to selected work"
          >
            <span className="group-hover:text-text-primary transition-colors">{t.hero.scrollToExplore}</span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown size={14} className="text-accent mt-0.5" />
            </motion.div>
          </a>
        </motion.div>

        {/* Center Massive Typography */}
        <div className="flex flex-col justify-center my-auto py-8 sm:py-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[14vw] sm:text-[13vw] md:text-[10vw] lg:text-[120px] leading-[0.88] tracking-[-0.04em] text-text-primary font-sans font-medium uppercase">
              Dimas <br />
              <span className="font-emilio italic font-light normal-case tracking-normal text-text-primary/80">Sodiin</span>
            </h1>
          </motion.div>

          <motion.div 
            className="flex flex-col md:flex-row justify-between items-start md:items-end mt-8 sm:mt-16 gap-6 sm:gap-8"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          >
            <p className="text-text-secondary text-[11px] sm:text-sm max-w-md font-mono uppercase tracking-[0.08em] sm:tracking-[0.1em] leading-[1.7] sm:leading-[1.8]">
              {t.hero.tagline}
            </p>
          </motion.div>
        </div>

        {/* Bottom Stats Grid */}
        <motion.div 
          className="grid grid-cols-3 md:grid-cols-4 gap-2 sm:gap-8 border-t border-border-medium pt-5 sm:pt-8"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        >
          <div className="flex flex-col gap-0.5 sm:gap-1">
            <span className="font-sans text-xl sm:text-3xl lg:text-4xl text-text-primary font-light tracking-tight">6+</span>
            <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-wider text-text-secondary">{t.hero.statsProjects}</span>
          </div>
          <div className="flex flex-col gap-0.5 sm:gap-1">
            <span className="font-sans text-xl sm:text-3xl lg:text-4xl text-text-primary font-light tracking-tight">2×</span>
            <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-wider text-text-secondary">{t.hero.statsAwards}</span>
          </div>
          <div className="flex flex-col gap-0.5 sm:gap-1">
            <span className="font-sans text-xl sm:text-3xl lg:text-4xl text-text-primary font-light tracking-tight">2020</span>
            <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-wider text-text-secondary">{t.hero.statsDesigningSince}</span>
          </div>
          <div className="hidden md:flex flex-col md:items-end justify-end">
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">{t.hero.statsTag}</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
