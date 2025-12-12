import { en } from "./en";
import { id } from "./id";

export type Language = "en" | "id";
export type Translations = typeof en;

export const translations = {
  en,
  id,
} as const;

export const defaultLanguage: Language = "en";

export const languages = [
  { code: "en" as Language, name: "English", flag: "🇺🇸" },
  { code: "id" as Language, name: "Indonesia", flag: "🇮🇩" },
] as const;

