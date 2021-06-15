import Cookies from "js-cookie";
import { all, takeLatest, call, put } from "redux-saga/effects";
import fetchHelper from "../../../helpers/FetchHelper";
import { get } from "lodash";
import * as types from "./constants";
import * as actions from "./actions";
import { LANGUAGE, LANGUAGE_LIST, ROOT_API_URL, USER_INFO_KEY, SIGNIN } from "../../../commons/constants/index";

export const setCookies = (token, redirectCallback = () => null) => {
    Cookies.set("token", token);
    setTimeout(redirectCallback(), 100);
  };

function* onLogin({payload, redirect}) {
    const {data} = yield call(requestLogin, payload);
    console.log(data);
    if(get(data, "status_code") === 200) {
        const dataUser = data?.data || {};
        if(dataUser.email) {
            localStorage.setItem(USER_INFO_KEY, JSON.stringify(data.data));
            localStorage.setItem(LANGUAGE, LANGUAGE_LIST[0].key);
            setCookies(get(data, "data.token"), redirect);
            yield put(actions.loginSuccess(data.data));
            return;
        }
        yield put(
            actions.updateToggleAuthyModal({
                ...dataUser,
                typeCallApi: SIGNIN,
            })
        );
        return;
    } else {
        return;
    }
};

export default function* rootSaga() {
    yield all([
        takeLatest(types.LOGIN, onLogin),
    ])
}

function requestLogin(payload) {
    return fetchHelper
    .fetch(`${ROOT_API_URL}/login`, {
        method: "POST",
        body: JSON.stringify(payload),
    })
    .then(([resp, status]) => {
        return {
            data: resp,
            status,
        };
    });
}