"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Language, translations, defaultLanguage } from "@/locales";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = "portfolio-language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [mounted, setMounted] = useState(false);

  // Load language from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "id")) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      // Update HTML lang attribute
      if (typeof document !== "undefined") {
        document.documentElement.lang = lang;
      }
    }
  };

  // Update HTML lang attribute when language changes
  useEffect(() => {
    if (mounted && typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  // Always provide context, even before mount (to prevent errors)
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    // Fallback to default language if context is not available (shouldn't happen, but safety check)
    console.warn("useLanguage called outside LanguageProvider, using default language");
    return {
      language: defaultLanguage,
      setLanguage: () => {},
      t: translations[defaultLanguage],
    };
  }
  return context;
}

