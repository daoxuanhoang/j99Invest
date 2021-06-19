import { all, call, put, takeLatest, select } from "redux-saga/effects";
import { get } from "lodash";
import * as qs from "query-string";

import { ROOT_API_URL, USDTTRON } from "commons/constants";
import fetchHelper from "helpers/FetchHelper";

import { CANCEL_TRANSACTION_TRANSFER, CANCEL_TRANSACTION_WITHDRAW, GET_TRANSACTION_LIST, APPROVE_TRANSACTION } from "./constants";
import { getTransactionListSuccess, getTransactionList as getTransactionListAction } from "./actions";
import { WALLET_WITHDRAW_TRANSFER_SUCCESS } from "modules/wallets/redux/constants";

function* getTransactionList({ payload }) {
  const res = yield call(requestTransactionFromApi, payload);
  if (get(res, "status") === 200) {
    const data = get(res, "data", []);
    yield put(getTransactionListSuccess(data));
  }
}

function requestTransactionFromApi(payload) {
  const qsString = qs.stringify(payload);
  return fetchHelper
    .fetch(`${ROOT_API_URL}/wallet-trans/list?${qsString}`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp.data,
        status,
      };
    });
}

function* cancelTransactionTypeWithDraw({ payload, callbackSuccess }) {
  const res = yield call(requestCancelTransactionTypeWithDrawFromApi, payload);
  if (get(res, "status") === 200) {
    callbackSuccess();
  }
}

function requestCancelTransactionTypeWithDrawFromApi(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/admin/wallet-trans/withdraw/cancel-transaction`, {
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

function* cancelTransactionTypeTransfer({ payload, callbackSuccess }) {
  const res = yield call(requestCancelTransactionTypeTransferFromApi, payload);
  if (get(res, "status") === 200) {
    callbackSuccess();
  }
}

function requestCancelTransactionTypeTransferFromApi(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/admin/wallet-trans/transfer/cancel-transaction`, {
      method: "POST",
      body: JSON.stringify(payload),
    })
    .then(([resp, status]) => {
      return {
        data: resp.data,
        status,
      };
    });
}

const getTransactions = (state) => get(state, "transactions");

function* refreshTransactionList() {
  const transactions = yield select(getTransactions);
  let payload = {
    pageSize: get(transactions, "perPage", 10),
    pageIndex: get(transactions, "page", 1),
    currency: USDTTRON,
  };
  yield put(getTransactionListAction(payload));
}

function* approveTransaction({ payload, callbackSuccess }) {
  const res = yield call(approveTransactionFromApi, payload);
  if (get(res.data, "status_code") === 200) {
    callbackSuccess();
  }
}

export default function* root() {
  yield all([
    takeLatest(GET_TRANSACTION_LIST, getTransactionList),
    takeLatest(WALLET_WITHDRAW_TRANSFER_SUCCESS, refreshTransactionList),
    takeLatest(CANCEL_TRANSACTION_WITHDRAW, cancelTransactionTypeWithDraw),
    takeLatest(CANCEL_TRANSACTION_TRANSFER, cancelTransactionTypeTransfer),
    takeLatest(APPROVE_TRANSACTION, approveTransaction),
  ]);
}

function approveTransactionFromApi(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/admin/wallet-trans/approved-transaction`, {
      method: "POST",
      body: JSON.stringify(payload),
    })
    .then(([data, status]) => ({ data, status }));
}
