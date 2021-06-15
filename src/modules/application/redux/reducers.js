import { OPTIONS_LANG } from "../../../language/config";
import { DEFAULT_LANGUAGE, LANGUAGE } from "../../../commons/constants/index";
import { SET_LANGUAGE } from "./constants";


const languageBrowser = navigator.language.split(/[-_]/)[0];
const languageLocal= localStorage.getItem(LANGUAGE);
const language = languageLocal || languageBrowser || DEFAULT_LANGUAGE;

const initialState = {
    activeLanguage: language,
    OPTIONS_LANG:  OPTIONS_LANG,
};

export default (state = initialState, action) => {
    const {payload} = action;
    switch (action.type) {
        case SET_LANGUAGE: {
            const language = payload;

            localStorage.setItem(LANGUAGE, language);
            return {
                ...state,
                activeLanguage: language,
            };
        }
        default:
            return {...state};
    }
}