import { all, call, put, takeLatest } from "redux-saga/effects";
import { get } from "lodash";
import { ROOT_API_URL, USER_INFO_KEY, EMAIL } from "../../../commons/constants";
import {
  CREATE_BANK_MANAGER,
  DELETE_BANK_MANAGER,
  GET_LIST_BANK_MANAGER,
  GET_PROFILE,
  GET_VERIFY_CODE,
  UPDATE_BANK_MANAGER,
  UPDATE_PASSWORD,
  UPDATE_PROFILE,
  UPDATE_EMAIL,
  VERIFY_CHANGE_EMAIL,
} from "./constants";
import {
  createBankSuccess,
  deleteBankSuccess,
  getListBankSuccess,
  getProfileSuccess,
  getVerifyCodeSuccess,
  updateBankSuccess,
  updatePasswordSuccess,
  updateProfileSuccess,
  updateEmailSuccess,
} from "./actions";
import fetchHelper from "../../../helpers/FetchHelper";
import { loginSuccess, updateToggleAuthyModal } from "modules/auth/redux/actions";
function* getProfile() {
  try {
    const response = yield call(getProfileApi);
    if (response && response.data && response.status === 200) {
      const responseData = get(response, "data.data", {});
      yield put(getProfileSuccess(responseData));
    }
  } catch (error) {
    // yield put(showMessError(ERROR));
  }
}

function* getVerifyCodeFromApi() {
  try {
    const response = yield call(getVerifyCodeApi);
    if (response && response.data && response.status === 200) {
      const responseData = get(response, "data", {});
      yield put(getVerifyCodeSuccess(responseData));
    }
  } catch (error) {
    // yield put(showMessError(ERROR));
  }
}

function* updateProfile({ data, callbackSuccess }) {
  try {
    const response = yield call(updateProfileFromAPI, data);
    if (response.data.status_code === 200) {
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(response.data.data));
      sessionStorage.setItem("USER_INF", JSON.stringify(response.data.data));
      yield put(updateProfileSuccess(response.data.data));
      yield put(loginSuccess(response.data.data));
      callbackSuccess && callbackSuccess();
    }
  } catch (error) {
    // yield put(showMessError(ERROR));
  }
}

function* changePassword({ data }) {
  try {
    const response = yield call(changePasswordFromAPI, data);
    if (response.data.status_code === 200) {
      yield put(updatePasswordSuccess());
    }
    // yield put(hideLoadingBtn());
  } catch (error) {
    // yield put(showMessError(ERROR));
  }
}

function* changeEmail({ data }) {
  try {
    const response = yield call(changeEmailFromAPI, data);

    if (response.data.status_code === 200) {
      yield put(updateEmailSuccess());
      yield put(
        updateToggleAuthyModal({
          typeCallApi: EMAIL,
          email: data?.email,
        })
      );
    }
    // yield put(hideLoadingBtn());
  } catch (error) {
    // yield put(showMessError(ERROR));
  }
}

function* verifyEmail({ payload, callbackSuccess }) {
  try {
    const response = yield call(verifyEmailFromAPI, payload);
    if (response.data.status_code === 200) {
      // yield put(updateEmailSuccess());

      callbackSuccess();
    }
    // yield put(hideLoadingBtn());
  } catch (error) {
    // yield put(showMessError(ERROR));
  }
}

function* getListBank() {
  try {
    const response = yield call(getListBankFromApi);
    if (response.data.status_code === 200) {
      yield put(getListBankSuccess(response.data.data));
    }
  } catch (error) {
    // yield put(showMessError(error));
  }
}

function* createBank({ data }) {
  try {
    const response = yield call(createBankFromApi, data);
    if (response.data.status_code === 200) {
      yield put(createBankSuccess(response.data.data));
    }
  } catch (error) {
    // yield put(showMessError(ERROR));
  }
}

function* updateBank({ data }) {
  try {
    const response = yield call(updateBankFromApi, data);
    if (response.data.status_code === 200) {
      yield put(updateBankSuccess(response.data.data));
    }
  } catch (error) {
    // yield put(showMessError(ERROR));
  }
}

function* deleteBank({ id }) {
  try {
    const response = yield call(deleteBankFromApi, id);
    if (response.data.status_code === 200) {
      yield put(deleteBankSuccess(id));
    }
  } catch (error) {
    // yield put(showMessError(ERROR));
  }
}

export default function* root() {
  yield all([
    takeLatest(GET_PROFILE, getProfile),
    takeLatest(GET_VERIFY_CODE, getVerifyCodeFromApi),
    takeLatest(UPDATE_PROFILE, updateProfile),
    takeLatest(UPDATE_PASSWORD, changePassword),
    takeLatest(GET_LIST_BANK_MANAGER, getListBank),
    takeLatest(CREATE_BANK_MANAGER, createBank),
    takeLatest(UPDATE_BANK_MANAGER, updateBank),
    takeLatest(DELETE_BANK_MANAGER, deleteBank),
    takeLatest(UPDATE_EMAIL, changeEmail),
    takeLatest(VERIFY_CHANGE_EMAIL, verifyEmail),
  ]);
}

function getProfileApi() {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/user-profile`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function getVerifyCodeApi() {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/get-verify-code`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

const updateProfileFromAPI = (data) => {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/update-profile`, {
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

const changePasswordFromAPI = (data) => {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/change-password`, {
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

const changeEmailFromAPI = (data) => {
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

const verifyEmailFromAPI = (data) => {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/verify-change-email`, {
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

const getListBankFromApi = () => {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/setting/list-bank`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
};

const createBankFromApi = (data) => {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/bank/create`, {
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
const updateBankFromApi = (data) => {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/bank/update`, {
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
const deleteBankFromApi = (id) => {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/bank/delete?id=${id}`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
};
