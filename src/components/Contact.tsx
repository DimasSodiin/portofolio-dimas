"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, PaperPlaneTilt } from "@phosphor-icons/react";
import { useLanguage } from "@/i18n/LanguageContext";

type FormState = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const reduce = useReducedMotion();
  const { lang, t } = useLanguage();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const socialLinks = [
    { name: "Instagram", href: "https://www.instagram.com/diinsoo_/" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/dimassodiin/" },
    { name: "GitHub", href: "https://github.com/DimasSodiin" },
    { name: "Behance", href: "https://www.behance.net/sodiindimas" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setErrorMessage(
        lang === "id"
          ? "Access key Web3Forms belum diisi di .env.local."
          : "Web3Forms access key is not configured in .env.local."
      );
      setFormState("error");
      return;
    }

    setFormState("sending");
    setErrorMessage("");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Pesan Portofolio dari ${form.name}`,
          from_name: "Portofolio Dimas Sodiin",
        }),
        signal: controller.signal,
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) {
        throw new Error(result?.message || "Failed to send message");
      }

      setFormState("sent");
    } catch (err) {
      const isTimeout = err instanceof DOMException && err.name === "AbortError";
      setErrorMessage(
        isTimeout
          ? lang === "id"
            ? "Koneksi timeout. Silakan coba lagi atau kirim langsung ke sodiindimas@gmail.com."
            : "Request timed out. Please try again or email directly at sodiindimas@gmail.com."
          : lang === "id"
            ? "Gagal mengirim pesan. Silakan coba lagi atau kirim langsung ke sodiindimas@gmail.com."
            : "Failed to send message. Please try again or email directly at sodiindimas@gmail.com."
      );
      setFormState("error");
    } finally {
      clearTimeout(timeoutId);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-36 px-4 sm:px-6 bg-bg-primary border-t border-border-subtle transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section label + heading */}
        <motion.div
          className="mb-12 sm:mb-24"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="font-mono text-[10px] text-accent tracking-[0.18em] uppercase mb-4 sm:mb-6">
            {t.contact.sectionLabel}
          </p>
          <h2 className="font-emilio text-[32px] sm:text-[60px] lg:text-[72px] font-light text-text-primary tracking-[-0.02em] leading-[1.15] sm:leading-[1.1] max-w-2xl">
            {t.contact.heading}{" "}
            <span className="italic text-text-secondary">{t.contact.headingHighlight}</span>{" "}
            {t.contact.headingEnd}
          </h2>
        </motion.div>

        {/* Main grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border-subtle border border-border-subtle"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >

          {/* LEFT — Contact Form */}
          <div className="bg-bg-primary p-6 sm:p-12 flex flex-col">
            {formState === "sent" ? (
              <div className="flex flex-col justify-center flex-1 gap-4 py-8">
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  {t.contact.messageSent}
                </span>
                <p className="font-emilio text-[28px] sm:text-[48px] font-light text-text-primary leading-[1.15]">
                  {t.contact.thankYou.replace("{name}", form.name.split(" ")[0])}<br />
                  <span className="italic text-text-secondary">{t.contact.willBeInTouch}</span>
                </p>
                <button
                  type="button"
                  onClick={() => { setFormState("idle"); setForm({ name: "", email: "", message: "" }); }}
                  className="mt-4 self-start font-mono text-[10px] uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors border-b border-border-medium pb-1"
                >
                  {t.contact.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-10 flex-1">
                <p className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
                  {t.contact.sendMessage}
                </p>

                {/* Name */}
                <div className="flex flex-col gap-1.5 border-b border-border-medium pb-3 sm:pb-4 focus-within:border-accent transition-colors">
                  <label htmlFor="name" className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
                    {t.contact.nameLabel}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t.contact.namePlaceholder}
                    className="bg-transparent text-text-primary text-base font-light placeholder:text-text-muted outline-none"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5 border-b border-border-medium pb-3 sm:pb-4 focus-within:border-accent transition-colors">
                  <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
                    {t.contact.emailLabel}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t.contact.emailPlaceholder}
                    className="bg-transparent text-text-primary text-base font-light placeholder:text-text-muted outline-none"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5 border-b border-border-medium pb-3 sm:pb-4 focus-within:border-accent transition-colors">
                  <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
                    {t.contact.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t.contact.messagePlaceholder}
                    className="bg-transparent text-text-primary text-base font-light placeholder:text-text-muted outline-none resize-none leading-relaxed"
                  />
                </div>

                {/* Error feedback */}
                {formState === "error" && (
                  <p className="font-mono text-[11px] text-red-500 tracking-wide">
                    {errorMessage ||
                      (lang === "id"
                        ? "Gagal mengirim pesan. Silakan coba lagi atau kirim langsung ke sodiindimas@gmail.com."
                        : "Failed to send message. Please try again or email directly at sodiindimas@gmail.com.")}
                  </p>
                )}

                {/* Submit button */}
                <div className="mt-auto pt-2">
                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 bg-accent text-accent-contrast font-mono text-[10px] uppercase tracking-widest hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    {formState === "sending" ? (
                      <>
                        <motion.span
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          {t.contact.sending}
                        </motion.span>
                      </>
                    ) : (
                      <>
                        {t.contact.sendButton}
                        <PaperPlaneTilt weight="bold" size={14} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT — Info */}
          <div className="bg-bg-primary p-6 sm:p-12 flex flex-col gap-8 sm:gap-12 justify-between border-t md:border-t-0 border-border-subtle">

            {/* Availability */}
            <div className="space-y-3 sm:space-y-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
                {t.contact.availabilityLabel}
              </p>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 bg-accent" />
                <span className="font-mono text-[10px] sm:text-[11px] text-text-primary uppercase tracking-widest">
                  {t.contact.availabilityStatus}
                </span>
              </div>
              <p className="text-[13px] sm:text-[14px] text-text-secondary leading-relaxed max-w-xs">
                {t.contact.availabilityDesc}
              </p>
            </div>

            {/* Direct email */}
            <div className="space-y-3 sm:space-y-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
                {t.contact.directEmail}
              </p>
              <a
                href="mailto:sodiindimas@gmail.com"
                className="group flex items-start gap-2 text-text-primary text-sm font-light hover:text-accent transition-colors break-all"
              >
                sodiindimas@gmail.com
                <ArrowUpRight size={14} className="shrink-0 mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>

            {/* Social */}
            <div className="space-y-4 sm:space-y-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
                {t.contact.elsewhere}
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 font-mono text-[10px] sm:text-[11px] text-text-secondary hover:text-text-primary transition-colors uppercase tracking-widest py-1"
                  >
                    {s.name}
                    <ArrowUpRight size={10} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
