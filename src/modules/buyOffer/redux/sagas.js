import { all, call, put, take, takeLatest } from "redux-saga/effects";
import { get } from "lodash";

import { ROOT_API_URL } from "commons/constants";
import fetchHelper from "helpers/FetchHelper";

import { GET_PRODUCT_LIST, GET_WALLET_LIST, POST_PRODUCT_LIST } from "./constants";
import { getProductListSuccess, getWalletsSuccess } from "./actions";

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
function getProductListFromApi() {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/product/list`, {
      method: "GET",
    })
    .then(([response, status]) => {
      return {
        data: response.data,
        status,
      };
    });
}
function postProductListFromApi(data) {
  const { payload } = data;
  return fetchHelper
    .fetch(`${ROOT_API_URL}/order/buy`, {
      method: "POST",
      body: JSON.stringify(payload),
    })
    .then(([res, status]) => {
      return {
        data: res.data,
        status,
      };
    });
}

function* postProductList(data) {
  const res = yield call(postProductListFromApi, data);
}
function* getProductList() {
  const res = yield call(getProductListFromApi);
  if (get(res, "status") === 200) {
    const data = get(res, "data", []);
    yield put(getProductListSuccess(data));
  }
}
function* getWallets() {
  const res = yield call(requestWalletFromApi);
  if (get(res, "status") === 200) {
    const data = get(res, "data", []);
    yield put(getWalletsSuccess(data));
  }
}

export default function* root() {
  yield all([
    takeLatest(GET_WALLET_LIST, getWallets),
    takeLatest(GET_PRODUCT_LIST, getProductList),
    takeLatest(POST_PRODUCT_LIST, postProductList),
  ]);
}
