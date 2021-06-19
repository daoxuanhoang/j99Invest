import messages_en from "./transactions/en.json";
import en from "../assets/images/flags/en.png";


export const CACHE_LANGUAGE = "lang";
export const DEFAULT_LANGUAGE = "en";

export const messagesListLanguage = {
    en: messages_en,
}

export const OPTIONS_LANG = [
    {
        id: "en",
        label: "English",
        image: en,
    }
]