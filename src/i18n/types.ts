export type SupportedLanguage = "en" | "no";

export type TranslationDictionary = {
  app: { name: string };
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
    addMemory: string;
    createTitle: string;
    titlePlaceholder: string;
    descriptionPlaceholder: string;
    createButton: string;
    saving: string;
    yourAlbums: string;
    empty: string;
    openAlbum: string;
    loadError: string;
    saveError: string;
  };
  albumDetail: {
    eyebrow: string;
    back: string;
    empty: string;
    loadError: string;
    notFound: string;
  };
  memories: {
    eyebrow: string;
    title: string;
    body: string;
    back: string;
    camera: string;
    cameraBody: string;
    photoLibrary: string;
    photoLibraryBody: string;
    readyTitle: string;
    readyBody: string;
    commentPlaceholder: string;
    moodTitle: string;
    albumTitle: string;
    noAlbums: string;
    saveButton: string;
    saving: string;
    cameraPermissionError: string;
    importError: string;
    albumLoadError: string;
    saveError: string;
  };
  memoryDetail: {
    eyebrow: string;
    title: string;
    back: string;
    commentPlaceholder: string;
    moodTitle: string;
    albumTitle: string;
    saveButton: string;
    saving: string;
    loadError: string;
    saveError: string;
    notFound: string;
  };
};

export type TranslationPath =
  | "app.name"
  | `foundation.${keyof TranslationDictionary["foundation"]}`
  | `albums.${keyof TranslationDictionary["albums"]}`
  | `albumDetail.${keyof TranslationDictionary["albumDetail"]}`
  | `memories.${keyof TranslationDictionary["memories"]}`
  | `memoryDetail.${keyof TranslationDictionary["memoryDetail"]}`;
