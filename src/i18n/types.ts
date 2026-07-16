import type { en } from "./strings.en";

export type SupportedLanguage = "en" | "no";
export type TranslationDictionary = typeof en;
export type TranslationPath =
  | "app.name"
  | "foundation.eyebrow"
  | "foundation.title"
  | "foundation.body"
  | "foundation.albumTitle"
  | "foundation.albumBody"
  | "foundation.languageTitle"
  | "foundation.languageBody"
  | "foundation.structureTitle"
  | "foundation.structureBody";
