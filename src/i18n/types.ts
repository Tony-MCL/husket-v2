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
  albums: {
    eyebrow: string;
    title: string;
    body: string;
    createTitle: string;
    titlePlaceholder: string;
    descriptionPlaceholder: string;
    createButton: string;
    saving: string;
    yourAlbums: string;
    empty: string;
    loadError: string;
    saveError: string;
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
  | "foundation.structureBody"
  | "albums.eyebrow"
  | "albums.title"
  | "albums.body"
  | "albums.createTitle"
  | "albums.titlePlaceholder"
  | "albums.descriptionPlaceholder"
  | "albums.createButton"
  | "albums.saving"
  | "albums.yourAlbums"
  | "albums.empty"
  | "albums.loadError"
  | "albums.saveError";
