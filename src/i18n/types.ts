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
  | "albums.addMemory"
  | "albums.createTitle"
  | "albums.titlePlaceholder"
  | "albums.descriptionPlaceholder"
  | "albums.createButton"
  | "albums.saving"
  | "albums.yourAlbums"
  | "albums.empty"
  | "albums.openAlbum"
  | "albums.loadError"
  | "albums.saveError"
  | "albumDetail.eyebrow"
  | "albumDetail.back"
  | "albumDetail.empty"
  | "albumDetail.loadError"
  | "albumDetail.notFound"
  | "memories.eyebrow"
  | "memories.title"
  | "memories.body"
  | "memories.back"
  | "memories.camera"
  | "memories.cameraBody"
  | "memories.photoLibrary"
  | "memories.photoLibraryBody"
  | "memories.readyTitle"
  | "memories.readyBody"
  | "memories.commentPlaceholder"
  | "memories.moodTitle"
  | "memories.albumTitle"
  | "memories.noAlbums"
  | "memories.saveButton"
  | "memories.saving"
  | "memories.cameraPermissionError"
  | "memories.importError"
  | "memories.albumLoadError"
  | "memories.saveError";
