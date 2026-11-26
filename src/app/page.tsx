"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ResumeModal from "@/components/ResumeModal";

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0f0d0d] text-[#ffffff] selection:bg-[#ffffff] selection:text-black relative">
      {/* Floating Navigation */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Hero Section */}
      <Hero />

      {/* Selected Work Case Studies */}
      <SelectedWork />

      {/* About Me Section */}
      <About />

      {/* Capabilities & Skills */}
      <Capabilities />

      {/* Experience & Achievements */}
      <Experience />

      {/* Contact Section */}
      <Contact onOpenResume={() => setIsResumeOpen(true)} />

      {/* Footer */}
      <Footer />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </main>
  );
}
