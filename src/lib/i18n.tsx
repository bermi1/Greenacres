import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'sw';
type Ctx = { lang: Lang; setLang: (l: Lang) => void; tr: (en: string, sw: string) => string };

const LangContext = createContext<Ctx>({ lang: 'en', setLang: () => {}, tr: (en) => en });

function readLang(): Lang {
  try {
    const v = localStorage.getItem('ga-lang');
    return v === 'sw' ? 'sw' : 'en';
  } catch {
    return 'en';
  }
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readLang);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem('ga-lang', l);
    } catch {
      /* private mode: keep in memory only */
    }
  };
  const tr = (en: string, sw: string) => (lang === 'sw' ? sw : en);
  return <LangContext.Provider value={{ lang, setLang, tr }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
