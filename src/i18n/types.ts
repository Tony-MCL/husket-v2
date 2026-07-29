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
  library: {
    eyebrow: string;
    title: string;
    body: string;
    camera: string;
    photoFrame: string;
    settings: string;
    emptyTitle: string;
    emptyBody: string;
    manageAlbums: string;
    loadError: string;
    albumMenuTitle: string;
    renameAlbum: string;
    deleteAlbum: string;
    cancel: string;
    renameTitle: string;
    renamePlaceholder: string;
    save: string;
    renameError: string;
    deleteTitle: string;
    deleteBody: string;
    deleteConfirm: string;
    deleteError: string;
  };
  albums: {
    eyebrow: string;
    title: string;
    body: string;
    back: string;
    createTitle: string;
    titlePlaceholder: string;
    descriptionPlaceholder: string;
    createButton: string;
    saving: string;
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
  settings: {
    eyebrow: string;
    title: string;
    body: string;
    back: string;
    language: string;
    norwegian: string;
    english: string;
    appearance: string;
    light: string;
    dark: string;
    note: string;
  };
};

export type TranslationPath =
  | "app.name"
  | `foundation.${keyof TranslationDictionary["foundation"]}`
  | `library.${keyof TranslationDictionary["library"]}`
  | `albums.${keyof TranslationDictionary["albums"]}`
  | `albumDetail.${keyof TranslationDictionary["albumDetail"]}`
  | `memories.${keyof TranslationDictionary["memories"]}`
  | `memoryDetail.${keyof TranslationDictionary["memoryDetail"]}`
  | `settings.${keyof TranslationDictionary["settings"]}`;
