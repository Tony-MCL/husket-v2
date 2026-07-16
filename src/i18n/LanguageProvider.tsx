import { createContext, type ReactNode, useContext, useMemo } from "react";
import { NativeModules, Platform } from "react-native";

import { en } from "./strings.en";
import { no } from "./strings.no";
import type {
  SupportedLanguage,
  TranslationDictionary,
  TranslationPath,
} from "./types";

type LanguageContextValue = {
  language: SupportedLanguage;
  t: (path: TranslationPath) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectDeviceLanguage(): SupportedLanguage {
  let locale = "en";

  if (Platform.OS === "web" && typeof navigator !== "undefined") {
    locale = navigator.language ?? "en";
  } else {
    const settings = NativeModules.SettingsManager?.settings;
    locale =
      settings?.AppleLocale ??
      settings?.AppleLanguages?.[0] ??
      NativeModules.I18nManager?.localeIdentifier ??
      "en";
  }

  const normalizedLocale = locale.toLowerCase();
  return normalizedLocale.startsWith("no") ||
    normalizedLocale.startsWith("nb") ||
    normalizedLocale.startsWith("nn")
    ? "no"
    : "en";
}

function getTranslation(
  dictionary: TranslationDictionary,
  path: TranslationPath,
): string {
  const value = path.split(".").reduce<unknown>((current, key) => {
    if (typeof current !== "object" || current === null) {
      return undefined;
    }

    return (current as Record<string, unknown>)[key];
  }, dictionary);

  return typeof value === "string" ? value : `MISSING:${path}`;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const value = useMemo<LanguageContextValue>(() => {
    const language = detectDeviceLanguage();
    const dictionary = language === "no" ? no : en;

    return {
      language,
      t: (path) => getTranslation(dictionary, path),
    };
  }, []);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider.");
  }

  return context;
}
