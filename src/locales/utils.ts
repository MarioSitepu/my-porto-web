import { cookies } from "next/headers";
import { Language, translations, defaultLanguage } from "./index";

export async function getTranslations() {
    const cookieStore = await cookies();
    const lang = cookieStore.get("portfolio-language")?.value as Language;

    const validLang: Language = (lang === "en" || lang === "id") ? lang : defaultLanguage;

    return {
        t: translations[validLang],
        language: validLang
    };
}
