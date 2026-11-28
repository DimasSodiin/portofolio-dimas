"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ArrowSquareOut } from "@phosphor-icons/react";
import ProjectModal, { Project } from "./ProjectModal";
import { useLanguage } from "@/i18n/LanguageContext";

export const PROJECTS_DATA: Project[] = [
  {
    id: "saras-ai",
    number: "01",
    title: "Saras AI",
    figmaUrl: "https://www.figma.com/proto/jdYuH8a5415iuDIRN0IA7o/SARAS-AI-%7C%7C-INFEST-2024?node-id=116-844&p=f&t=w9T5Kods0o9RktG5-1&scaling=scale-down&content-scaling=fixed&page-id=11%3A47",
    behanceUrl: "", // Isi jika ada link Behance
    category: "Health · AI · Mobile",
    description:
      "An AI-powered health app offering health monitoring, lifestyle recommendations, and medication support in one place.",
    highlights: ["health tech", "AI", "mobile UI", "onboarding"],
    image: "/images/projects/saras-ai.jpg",
    steppedPanel: true,
    details: {
      overview:
        "Saras AI is a health-focused application powered by artificial intelligence, helping users achieve and maintain well-being. The name comes from the Javanese word \"saras,\" meaning healed or healthy.",
      problem:
        "Managing health habits, medication schedules, and wellness advice usually means juggling several disconnected tools.",
      solution:
        "Designed a single, calm interface that brings health monitoring, medication reminders, and personalized recommendations together.",
      role: "UI/UX Designer",
      timeline: "2024",
      tools: ["Figma", "Prototyping"],
      keyFeatures: [
        "Medication reminders with a calendar view and daily checklist",
        "Medicine scanning flow through the camera",
        "Personalized medicine and lifestyle recommendations on the home screen",
        "Clear sign-in and registration flow with social login options",
      ],
    },
  },
  {
    id: "lazismu",
    number: "02",
    title: "LAZISMU Banyumas",
    figmaUrl: "https://www.figma.com/proto/E9BLDrD971sK0tnctheduY/Redesign-Website-Lazismu-Banyumas?node-id=1165-3528&p=f&t=kahSaePx81J0rXnY-1&scaling=min-zoom&content-scaling=fixed&page-id=643%3A587", // Isi jika ada link Figma
    behanceUrl: "", // Isi jika ada link Behance
    category: "Website Redesign · UX/UI",
    description:
      "A comprehensive website redesign improving information architecture, donation flows, and overall digital experience for a humanitarian organization.",
    highlights: ["UX research", "information architecture", "responsive"],
    image: "/images/projects/lazismu.jpg",
    steppedPanel: false,
    details: {
      overview:
        "LAZISMU Banyumas is a prominent regional humanitarian organization. The redesign modernized their digital presence, improved donor trust, and minimized drop-offs during online contributions.",
      problem:
        "The legacy website suffered from cluttered navigation, ambiguous donation steps, and poor mobile responsiveness — leading to high abandon rates during relief campaigns.",
      solution:
        "Restructured the entire information architecture into intuitive vertical channels, introduced a transparent 3-step donation widget, and implemented responsive design guidelines.",
      role: "UI/UX Designer Intern",
      timeline: "Internship Project (2025)",
      tools: ["Figma", "UX Research", "Information Architecture", "Bootstrap"],
      keyFeatures: [
        "Simplified 3-step online donation checkout flow with multiple payment gateways",
        "Impact tracker dashboard showcasing transparent fund distribution",
        "Responsive web layouts optimized across desktop, tablet, and mobile",
        "Accessible typography scale adhering to WCAG AA contrast standards",
      ],
    },
  },
  {
    id: "travel-app",
    number: "03",
    title: "Travel App",
    figmaUrl: "https://www.figma.com/proto/ZaxY3kr1fNfJSmyg82YQmr/TravelApp?node-id=17-1683&p=f&t=KCQ9L9SiD8Xm9BSs-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=17%3A1683", // Isi jika ada link Figma
    behanceUrl: "https://www.behance.net/gallery/259018595/Mobile-Travel-APP", // Isi jika ada link Behance
    category: "Travel · Mobile",
    description:
      "A mobile travel assistant for trip planning, bookings, destination discovery, and real-time updates.",
    highlights: ["travel", "mobile UI", "authentication flow"],
    image: "/images/projects/travel-app.jpg",
    steppedPanel: true,
    details: {
      overview:
        "A mobile application designed to simplify the travel experience, from planning and booking to navigation and local insights.",
      problem:
        "Travelers switch between separate apps to plan itineraries, book flights and stays, and find places to go.",
      solution:
        "Designed a single travel assistant with curated recommendations, itinerary management, and a clean, low-friction entry experience.",
      role: "UI/UX Designer",
      timeline: "2024",
      tools: ["Figma", "Prototyping"],
      keyFeatures: [
        "Trip planning with itinerary management",
        "Flight and accommodation booking",
        "Destination discovery with curated recommendations",
        "Streamlined register, login, and email verification flow with clear success feedback",
      ],
    },
  },
  {
    id: "pawpal",
    number: "04",
    title: "PawPal",
    figmaUrl: "https://www.figma.com/proto/sEHbsvSYghUAknts5OWirv/PawPal?t=xTAiApSNz6898CLG-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&node-id=33-63", // Isi jika ada link Figma
    behanceUrl: "https://www.behance.net/gallery/259018875/PawPal-Pets-Care-APP", // Isi jika ada link Behance
    category: "Pet Care · Management App",
    description:
      "A pet boarding management app giving managers an efficient, organized way to run boarding services.",
    highlights: ["management app", "mobile UI", "branding"],
    image: "/images/projects/pawpal.jpg",
    steppedPanel: false,
    details: {
      overview:
        "PawPal is a modern application for pet boarding management, built for managers and related stakeholders.",
      problem:
        "Boarding services need to track many pets and bookings, and manual handling quickly becomes disorganized.",
      solution:
        "Designed a friendly, organized digital tool with a clear brand identity and a straightforward entry flow.",
      role: "UI/UX Designer",
      timeline: "2024",
      tools: ["Figma", "Flutter"],
      keyFeatures: [
        "Welcome and Get Started screen with a distinct green brand identity",
        "Login and sign-up flow with clear form states",
        "Interface built for managers and stakeholders",
        "Playful logo and visual identity",
      ],
    },
  },
  {
    id: "furniture-shop",
    number: "05",
    title: "Furniture Shop",
    figmaUrl: "", // Isi jika ada link Figma
    behanceUrl: "https://www.behance.net/gallery/175951081/Furniture-App", // Isi jika ada link Behance
    category: "E-commerce · Mobile",
    description:
      "A minimal e-commerce app concept for browsing, saving, and buying furniture.",
    highlights: ["e-commerce", "mobile UI", "visual hierarchy"],
    image: "/images/projects/furniture-shop.jpg",
    steppedPanel: true,
    details: {
      overview:
        "A furniture shopping concept with a clean monochrome interface that lets the product photography lead.",
      problem:
        "Furniture e-commerce apps often clutter the experience with heavy UI elements that distract from the products themselves.",
      solution:
        "Stripped back the interface to a minimal monochrome palette, allowing high-quality product imagery to carry the visual weight.",
      role: "UI Designer",
      timeline: "2024",
      tools: ["Figma"],
      keyFeatures: [
        "Personalized home feed with product recommendations",
        "Product detail page with color options and quantity control",
        "Favorites list for saving items",
        "Cart with a clear order summary and checkout action",
      ],
    },
  },
  {
    id: "courseku",
    number: "06",
    title: "CourseKu",
    figmaUrl: "https://www.figma.com/proto/gcrlrGvhihg5pwKbxwbv6Z/CourseKu.?node-id=61-1357&p=f&t=oKyJU2rYKdFcsyVG-1&scaling=scale-down&content-scaling=fixed&page-id=1%3A7&starting-point-node-id=61%3A1357&show-proto-sidebar=1", // Isi jika ada link Figma
    behanceUrl: "https://www.behance.net/gallery/175889803/Online-Course-CourseKu", // Isi jika ada link Behance
    category: "Education · Mobile",
    description:
      "A mobile learning app concept with a clean onboarding and course browsing experience.",
    highlights: ["e-learning", "mobile UI", "onboarding"],
    image: "/images/projects/courseku.jpg",
    steppedPanel: false,
    details: {
      overview:
        "CourseKu is an online course app concept built around a friendly blue visual identity and a simple path from sign-in to learning.",
      problem:
        "Learners often face cluttered onboarding flows and overwhelming course catalogues that slow the path to actual learning.",
      solution:
        "Designed a minimal, guided entry flow with clear category browsing and consistent visual language across all screens.",
      role: "UI/UX Designer",
      timeline: "2024",
      tools: ["Figma", "Prototyping"],
      keyFeatures: [
        "Welcome screen and sign-in with email, Google, or Facebook",
        "Course list with category browsing",
        "Success states that confirm account actions",
        "Consistent illustration and logo system",
      ],
    },
  },
];

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="group bg-bg-primary flex flex-col cursor-pointer transition-all duration-300 h-full border border-border-subtle hover:border-border-strong active:border-accent"
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onClick={onOpen}
    >
      <div className="relative h-[210px] sm:h-[300px] w-full overflow-hidden bg-bg-secondary flex-shrink-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          loading="eager"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
          className="object-cover object-top grayscale group-hover:grayscale-0 sm:grayscale sm:hover:grayscale-0 transition-all duration-500 ease-out"
        />
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 font-mono text-[9px] sm:text-[10px] text-text-primary tracking-[0.12em] uppercase bg-bg-primary/90 backdrop-blur-sm px-2.5 py-1 border border-border-medium">
          {project.category}
        </div>
      </div>

      <div className="p-5 sm:p-8 flex flex-col gap-3 sm:gap-4 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-mono text-[10px] text-accent mb-1.5 uppercase tracking-widest">
              No. {project.number}
            </div>
            <h3 className="font-emilio text-[22px] sm:text-[32px] font-light text-text-primary leading-tight">
              {project.title}
            </h3>
          </div>
          <div className="shrink-0 mt-0.5 p-1.5 sm:p-2 border border-border-medium text-text-secondary group-hover:text-accent-contrast group-hover:bg-accent group-hover:border-accent transition-all duration-300">
            <ArrowUpRight weight="bold" className="w-3.5 h-3.5" />
          </div>
        </div>

        <p className="text-text-secondary text-[13px] sm:text-[14px] leading-relaxed flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3 sm:pt-4 border-t border-border-subtle">
          {project.highlights.map((h) => (
            <span
              key={h}
              className="px-2 py-0.5 sm:py-1 bg-surface-tint text-[9px] sm:text-[10px] font-mono text-text-secondary uppercase tracking-widest"
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function SelectedWork() {
  const [selected, setSelected] = useState<Project | null>(null);
  const reduce = useReducedMotion();
  const { t } = useLanguage();

  const localizedProjects = useMemo(() => {
    return PROJECTS_DATA.map((p, i) => {
      const tp = t.projects.find((proj) => proj.id === p.id) || t.projects[i];
      if (!tp) return p;
      return {
        ...p,
        figmaUrl: p.figmaUrl,
        behanceUrl: p.behanceUrl,
        category: tp.category,
        description: tp.description,
        details: {
          ...p.details,
          overview: tp.overview,
          problem: tp.problem,
          solution: tp.solution,
          role: tp.role,
          timeline: tp.timeline,
          keyFeatures: [...tp.keyFeatures],
        },
      };
    });
  }, [t]);

  return (
    <section id="work" className="py-16 sm:py-36 px-4 sm:px-6 bg-bg-primary relative border-t border-border-subtle transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-12 sm:mb-24"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
            <div>
              <p className="font-mono text-[10px] text-accent tracking-[0.18em] uppercase mb-4 sm:mb-6">
                {t.work.sectionLabel}
              </p>
              <h2 className="font-emilio text-[32px] sm:text-[60px] font-light text-text-primary tracking-[-0.02em] leading-[1.15] sm:leading-[1.1] max-w-lg">
                {t.work.heading}
              </h2>
            </div>
            <p className="text-text-secondary text-[13px] sm:text-[14px] leading-relaxed max-w-xs sm:text-right">
              {t.work.subtitle}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-px bg-transparent sm:bg-border-subtle border-0 sm:border border-border-subtle">
          {localizedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={() => setSelected(project)} />
          ))}
        </div>

        {/* Behance CTA */}
        <motion.div
          className="mt-10 sm:mt-16 flex justify-center px-2"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <a
            href="https://www.behance.net/sodiindimas"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2.5 sm:gap-3 border border-border-medium px-5 sm:px-7 py-3 sm:py-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider sm:tracking-widest text-text-secondary hover:text-text-primary hover:border-border-strong transition-all duration-300 text-center max-w-full"
          >
            <span>{t.work.viewOnBehance}</span>
            <ArrowSquareOut size={14} className="opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
          </a>
        </motion.div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
