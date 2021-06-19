import Cookies from "js-cookie";
import { all, takeLatest, call, put } from "redux-saga/effects";
import fetchHelper from "../../../helpers/FetchHelper";
import { get } from "lodash";
import * as types from "./constants";
import * as actions from "./actions";
import { ROOT_API_URL, USER_INFO_KEY, LOGIN } from "../../../commons/constants/index";
import { CACHE_LANGUAGE, OPTIONS_LANG } from "../../../language/config";

export const setCookies = (token, redirectCallback = () => null) => {
    Cookies.set("token", token);
    setTimeout(redirectCallback(), 100);
};

function* onLogin({ payload, redirect }) {
    const { data } = yield call(requestLogin, payload);
    if (get(data, "status_code") === 200) {
        const dataUser = data?.data || {};
        if (dataUser.email) {
            localStorage.setItem(USER_INFO_KEY, JSON.stringify(data.data));
            localStorage.setItem(CACHE_LANGUAGE, OPTIONS_LANG[0].key);
            setCookies(get(data, "data.token"), redirect);
            yield put(actions.loginSuccess(data.data));
            return;
        }
        yield put(
            actions.updateToggleAuthyModal({
                ...dataUser,
                typeCallApi: LOGIN,
            })
        );
        return;
    } else {
        return;
    }
};


function* onSignUp(action) {
    const { payload, redirect } = action;
    const { data } = yield call(requestSignUp, payload);
    if (get(data, "status_code") === 200) {
      redirect();
      return;
    } else {
      return;
    }
  }

export default function* rootSaga() {
    yield all([
        takeLatest(types.LOGIN, onLogin),
        takeLatest(types.SIGNUP, onSignUp),
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
};

function requestSignUp(payload) {
    return fetchHelper
        .fetch(`${ROOT_API_URL}/signup`, {
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