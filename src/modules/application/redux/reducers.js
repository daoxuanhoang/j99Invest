import { OPTIONS_LANG } from "language/config";
import { CACHE_LANGUAGE, DEFAULT_LANGUAGE } from "language/config";
import { SET_LANGUAGE } from "./constants";

// const languageBrowser = navigator.language.split(/[-_]/)[0];
const languageLocal = localStorage.getItem(CACHE_LANGUAGE);
const language = languageLocal !== "undefined" ? languageLocal : DEFAULT_LANGUAGE;

const initialState = {
  activeLanguage: language,
  OPTIONS_LANG: OPTIONS_LANG,
};

export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case SET_LANGUAGE: {
      const language = payload;
      localStorage.setItem(CACHE_LANGUAGE, language);
      return {
        ...state,
        activeLanguage: language,
      };
    }
    default:
      return { ...state };
  }
};
