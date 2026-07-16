export type SupportedLanguage = "en" | "no";

export type TranslationDictionary = {
  app: {
    name: string;
  };
  foundation: {
    eyebrow: string;
    title: string;
    body: string;
    albumTitle: string;
    albumBody: string;
    languageTitle: string;
    languageBody: string;
    structureTitle: string;
    structureBody: string;
  };
};

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
