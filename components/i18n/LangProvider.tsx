"use client";

import { createContext, useContext } from "react";
import { defaultLang, type Lang } from "@/lib/i18n";

const LangContext = createContext<Lang>(defaultLang);

/** Makes the page language available to client components (links, forms). */
export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang(): Lang {
  return useContext(LangContext);
}
