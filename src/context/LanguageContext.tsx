"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  getWeddingContent,
  type Locale,
  type WeddingContent,
} from "@/lib/i18n";

const STORAGE_KEY = "wedding-invite-locale";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  content: WeddingContent;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "mr" || stored === "en") {
      setLocaleState(stored);
    }
    setReady(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale === "mr" ? "mr" : "en";
    root.classList.toggle("locale-mr", locale === "mr");
    root.classList.toggle("locale-en", locale === "en");
  }, [locale]);

  const content = useMemo(() => getWeddingContent(locale), [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, content }),
    [locale, setLocale, content]
  );

  if (!ready) {
    return (
      <LanguageContext.Provider
        value={{
          locale: DEFAULT_LOCALE,
          setLocale,
          content: getWeddingContent(DEFAULT_LOCALE),
        }}
      >
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
