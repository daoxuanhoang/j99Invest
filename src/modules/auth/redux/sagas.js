import Cookies from "js-cookie";
import { all, takeLatest, call, put } from "redux-saga/effects";
import fetchHelper from "helpers/FetchHelper";
import { get } from "lodash";
import * as types from "./constants";
import * as actions from "./actions";
import { CACHE_LANGUAGE, OPTIONS_LANG } from "language/config";
import {
  CACHE_TOKEN,
  ROOT_API_URL,
  CACHE_USER_INFO,
  TRANSACTION,
  LOGIN,
  EMAIL,
  REGISTER,
  CHANGE_STATUS,
} from "commons/constants";

export const setCookies = (token, redirectCallback = () => null) => {
  Cookies.set(CACHE_TOKEN, token);
  setTimeout(redirectCallback(), 100);
};

function* onLogin({ payload, redirect }) {
  const { data } = yield call(requestLogin, payload);
  if (get(data, "status_code") === 200) {
    const dataUser = data?.data || {};
    if (dataUser.email) {
      localStorage.setItem(CACHE_USER_INFO, JSON.stringify(data.data));
      localStorage.setItem(CACHE_LANGUAGE, OPTIONS_LANG[0].id);
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
}

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

function* onActiveAccount(action) {
  const { payload, redirect } = action;
  const { data } = yield call(requestActiveAccount, payload);
  if (get(data, "status_code") === 200) {
    redirect("success");
    return;
  } else {
    redirect("failed");
    return;
  }
}

function* onForgotPassword(action) {
  const { payload } = action;
  const { data } = yield call(requestForgotPassword, payload);
  if (get(data, "status_code") === 200) {
    return;
  } else {
    return;
  }
}

function* onResetPassword(action) {
  const { payload, redirect } = action;
  const { data } = yield call(requestResetPassword, payload);
  if (get(data, "status_code") === 200) {
    redirect();
    return;
  } else {
    return;
  }
}

function* onAuthyVerify(action) {
  const { payload, callbackSuccess = () => {} } = action;
  const { typeCallApi } = payload;
  let result = null;
  switch (typeCallApi) {
    case TRANSACTION:
      result = yield call(requestAuthyVerifyTransaction, payload);
      break;
    case LOGIN:
      result = yield call(requestAuthyVerifyLogin, payload);
      break;
    case EMAIL:
      result = yield call(changeEmailAuthyFromAPI, payload);
      break;
    case REGISTER:
      result = yield call(changeRegisterFromAPI, payload);
      break;
    case CHANGE_STATUS:
      result = yield call(changeChangeStatusSecureFromAPI, payload);
      break;
    default:
      break;
  }
  let { data } = result;
  if (get(data, "status_code") === 200) {
    callbackSuccess({
      typeCallApi,
      ...data,
    });
    return;
  } else {
    return;
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(types.LOGIN, onLogin),
    takeLatest(types.SIGN_UP, onSignUp),
    takeLatest(types.ACTIVE_ACCOUNT, onActiveAccount),
    takeLatest(types.FORGOT_PASSWORD, onForgotPassword),
    takeLatest(types.NEW_PASSWORD, onResetPassword),
    takeLatest(types.UPDATE_AUTHY_VERIFY, onAuthyVerify),
  ]);
}

// Request Api
function requestLogin(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/login`, {
      method: "POST",
      body: JSON.stringify(payload),
    })
    .then(([resp, status]) => {
      console.log(resp);
      return {
        data: resp,
        status,
      };
    });
}

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

function requestActiveAccount(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/active-account`, {
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

function requestForgotPassword(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/forgot-password`, {
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

function requestResetPassword(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/new-password`, {
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

function requestAuthyVerifyTransaction(payload) {
  const body = {
    id: payload?.id,
    token: payload?.code,
  };
  return fetchHelper
    .fetch(`${ROOT_API_URL}/wallet/verify-transaction`, {
      method: "POST",
      body: JSON.stringify(body),
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestAuthyVerifyLogin(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/verify-login`, {
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

const changeEmailAuthyFromAPI = (data) => {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/change-email`, {
      method: "POST",
      body: JSON.stringify(data),
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
};

const changeRegisterFromAPI = (data) => {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/verify-authy`, {
      method: "POST",
      body: JSON.stringify(data),
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
};

const changeChangeStatusSecureFromAPI = (data) => {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/update-authy`, {
      method: "POST",
      body: JSON.stringify(data),
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
};
