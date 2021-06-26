import { all, call, put, takeLatest } from "redux-saga/effects";
import { get } from "lodash";
import { ROOT_API_URL, REGISTER, CHANGE_STATUS } from "../../../commons/constants";
import * as types from "./constants";
// import * as actions from "./actions";
import fetchHelper from "../../../helpers/FetchHelper";
// import * as qs from "query-string";
import { updateToggleAuthyModal } from "modules/auth/redux/actions";

function* updateKyc({ data, callbackSuccess }) {
  try {
    const response = yield call(updateKycFromAPI, data);
    if (response.data.status_code === 200) {
      // yield put(actions.updateKycSuccess(true));
      callbackSuccess && callbackSuccess();
    }
  } catch (error) {
    // yield put(showMessError(ERROR));
  }
}

function* updateAuthy({ data, callbackSuccess = () => {} }) {
  try {
    const response = yield call(updateAuthyFromAPI, data);
    if (response.data.status_code === 200) {
      yield put(
        updateToggleAuthyModal({
          ...data,
          typeCallApi: CHANGE_STATUS,
        })
      );
      callbackSuccess(data);
      return;
    }
  } catch (error) {
    // yield put(showMessError(ERROR));
  }
}

function* registerAuthy({ data, callbackSuccess = () => {} }) {
  try {
    const response = yield call(registerAuthyFromAPI, data);
    if (response.data.status_code === 200) {
      yield put(
        updateToggleAuthyModal({
          typeCallApi: REGISTER,
          payload: data,
          data: get(response, "data.data"),
        })
      );
      callbackSuccess(data);
      return;
    }
  } catch (error) {
    // yield put(showMessError(ERROR));
  }
}

export default function* root() {
  yield all([
    takeLatest(types.UPDATE_KYC, updateKyc),
    takeLatest(types.UPDATE_AUTHY, updateAuthy),
    takeLatest(types.REGISTER_AUTHY, registerAuthy),
  ]);
}

const updateKycFromAPI = (data) => {
  const imageFrontData = data?.frontImageData;
  const imageBackData = data?.backImageData;
  const imageSelfieData = data?.selfieImageData;

  const formData = new FormData();

  if (imageFrontData && imageBackData && imageSelfieData) {
    formData.append("front_card", data.frontImageData.file ? data.frontImageData.file.originFileObj : null);
    formData.append("back_card", data.backImageData.file ? data.backImageData.file.originFileObj : null);
    formData.append("selfie_with_card", data.selfieImageData.file ? data.selfieImageData.file.originFileObj : null);
    delete data.frontImageData;
    delete data.backImageData;
    delete data.selfieImageData;
  }

  formData.append("country", get(data, "formData.country", ""));
  formData.append("id_type", get(data, "formData.id_type", ""));
  formData.append("card_number", get(data, "formData.card_number", ""));

  fetchHelper.removeDefaultHeader("Content-Type");
  return fetchHelper
    .fetch(`${ROOT_API_URL}/update-kyc`, {
      method: "POST",
      body: formData,
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
};

const updateAuthyFromAPI = (data) => {
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

const registerAuthyFromAPI = (data) => {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/register-authy`, {
      method: "POST",
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
};
