// ===============================
// src/models/mood.ts
// ===============================

/**
 * Følelsen eller stemningen brukeren knytter til et minne.
 * Verdiene er stabile domenenavn; selve emojien hører hjemme i UI-laget.
 */
export type MemoryMood =
  | "love"
  | "happy"
  | "funny"
  | "excited"
  | "calm"
  | "surprised"
  | "sad";
