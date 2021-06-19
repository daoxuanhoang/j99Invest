import * as types from "./constants";
import { DEFAULT_LANGUAGE } from "../../../language/config";


export const setLanguage = ({language = DEFAULT_LANGUAGE, reload = false }) => ({
    type: types.SET_LANGUAGE,
    payload: language,
    reload: reload,
});