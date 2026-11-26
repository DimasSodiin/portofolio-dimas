"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { translations, Language, TranslationsMap } from "./translations";

interface LanguageContextType {
  lang: Language;
  t: TranslationsMap[Language];
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("id");

  const toggleLanguage = useCallback(() => {
    setLang((prev) => (prev === "id" ? "en" : "id"));
  }, []);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
