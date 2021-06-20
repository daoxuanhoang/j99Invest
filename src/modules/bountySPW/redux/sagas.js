import { all, call, put, takeLatest } from "redux-saga/effects";
import { get } from "lodash";

import { ROOT_API_URL } from "commons/constants";
import fetchHelper from "helpers/FetchHelper";

import { GET_WALLET_LIST, GET_LIST_BOUNTY, POST_FORM_BOUNTY } from "./constants";
import { getListBountySuccess, getWalletsSuccess } from "./actions";

function requestWalletFromApi() {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/wallet/get`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp.data,
        status,
      };
    });
}
function* getWallets() {
  const res = yield call(requestWalletFromApi);
  if (get(res, "status") === 200) {
    const data = get(res, "data", []);
    yield put(getWalletsSuccess(data));
  }
}

function getListBountyFormApi() {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/bounty/list`, {
      method: "GET",
    })
    .then(([resp, status]) => ({
      data: resp.data,
      status,
    }));
}
function* getListBounty(payload) {
  try {
    const { status, data } = yield call(getListBountyFormApi, payload);
    if (status === 200) {
      yield put(getListBountySuccess(data));
    }
  } catch (error) {
    console.error("getListBounty error", error);
  }
}

function postFormWebinarFormApi(data) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/bounty/submit`, {
      method: "POST",
      body: JSON.stringify(data),
    })
    .then(([resp, status]) => ({
      data: resp.data,
      status,
    }));
}
function* postFormBounty({ payload, callback }) {
  try {
    const { status, data } = yield call(postFormWebinarFormApi, payload);
    if (status === 200) {
      console.log("da", data);
      callback && callback();
    }
  } catch (error) {
    console.error("postFormBounty error", error);
  }
}

export default function* root() {
  yield all([
    takeLatest(GET_WALLET_LIST, getWallets),
    takeLatest(GET_LIST_BOUNTY, getListBounty),
    takeLatest(POST_FORM_BOUNTY, postFormBounty),
  ]);
}
