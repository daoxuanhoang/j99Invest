import { all, call, put, takeLatest } from "redux-saga/effects";
import { get } from "lodash";

import { ROOT_API_URL, MODAL_TYPES } from "commons/constants";
import fetchHelper from "helpers/FetchHelper";

import {
  GET_WALLET_LIST,
  VIEW_WALLET_DETAILS,
  WALLET_WITHDRAW_TRANSFER,
  WALLET_SWAP_TRANSFER,
  GET_IS_INTERNAL,
  VERIFY_TRACSACTION,
  CANCEL_TRANSACTION,
  WALLET_TRAN_WITHDRAW,
  WALLET_GET_BY_EMAIL_OR_ADDRESS,
  GET_MORE_USJ_INVEST,
  CHECK_WALLET_ADDRESS,
  GET_PAYMENT_CODE,
  VERIFY_PAYMENT,
  WITHDRAW_PAYMENT,
  LOAD_DEPOSIT,
} from "./constants";
import { getWalletsSuccess, viewWalletDetailSuccess, withdrawWalletSuccess, getPaymentCodeSuccess } from "./actions";

function* getWallets() {
  const res = yield call(requestWalletFromApi);
  if (get(res, "status") === 200) {
    const data = get(res, "data", []);
    yield put(getWalletsSuccess(data));
  }
}

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

function* getIsInternal({ payload, callbackSuccess }) {
  const res = yield call(requestGetIsInternalFromApi, payload);
  if (get(res, "status") === 200) {
    callbackSuccess();
  }
}

function requestGetIsInternalFromApi(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/wallet/withdraw/is-internal?${payload}`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function* viewWalletDetails({ payload }) {
  const type = get(payload, "type");
  switch (type) {
    case MODAL_TYPES.commission:
      yield put(viewWalletDetailSuccess({ ...payload, data: true }));
      break;
    case MODAL_TYPES.details:
      yield put(viewWalletDetailSuccess(payload));
      break;
    default:
      yield put(viewWalletDetailSuccess(payload));
      break;
  }
}

// function* onWithdrawWallet({ payload, callbackSuccess }) {
//   const queryIsInternal = qs.stringify({
//     toAddress: get(payload, 'toAddress', ''),
//     currency: get(payload, 'currency', ''),
//   });
//   const { data: isInternalData } = yield call(requestGetIsInternalFromApi, queryIsInternal);
//   if (get(isInternalData, 'data.is_exist', false)) {
//     const { data } = yield call(requestWalletWithdrawInternal, {
//       ...payload,
//       wallet_addr: get(payload, 'toAddress', ''),
//     });
//     if (get(data, 'status_code') === 200) {
//       callbackSuccess();
//       return;
//     }
//   } else {
//     const { data } = yield call(requestWalletWithdraw, payload);
//     if (get(data, 'status_code') === 200) {
//       callbackSuccess();
//       return;
//     }
//   }
// }

function* onWithdrawWallet({ payload, callbackSuccess }) {
  const { isViewItem } = payload;
  if (isViewItem === MODAL_TYPES.transfer || isViewItem === MODAL_TYPES.send) {
    const { data } = yield call(requestWalletWithdrawInternal, {
      wallet_addr: get(payload, "toAddress", ""),
      amount: get(payload, "amount", 0),
      currency: get(payload, "currency", ""),
    });
    if (get(data, "status_code") === 200) {
      yield put(withdrawWalletSuccess());
      callbackSuccess(data);
      return;
    }
  } else if (isViewItem === MODAL_TYPES.withdraw) {
    const { data } = yield call(requestWalletWithdraw, payload);
    if (get(data, "status_code") === 200) {
      yield put(withdrawWalletSuccess());
      callbackSuccess(data);
      return;
    }
  }
}

function requestWalletWithdrawInternal(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/wallet-trans/transfer`, {
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

function requestWalletWithdraw(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/wallet/withdraw`, {
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

function* onSwapWallet({ payload, callbackSuccess }) {
  const { data } = yield call(requestWalletSwap, payload);
  if (get(data, "status_code") === 200) {
    callbackSuccess();
    return;
  }
}

function requestWalletSwap(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/wallet-trans/swap`, {
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

function* verifyTransaction({ payload, callbackSuccess, callbackError }) {
  const { data } = yield call(verifyTransactionFromApi, payload);
  if (get(data, "status_code") === 200) {
    callbackSuccess(data);
    return;
  }
  callbackError();
}

function* cancelTransaction({ payload, callbackSuccess }) {
  const { data } = yield call(confirmTransactionFromApi, payload);
  if (get(data, "status_code") === 200) {
    callbackSuccess();
    return;
  }
}

const verifyTransactionFromApi = (data) => {
  return fetchHelper
    .fetch(
      `${ROOT_API_URL}/wallet/withdraw/verify-transaction`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      { isShowMessages: false }
    )
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
};

function confirmTransactionFromApi(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/wallet/withdraw/cancel-transaction`, {
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

function* walletTranTransfer({ payload, callbackSuccess }) {
  const { data } = yield call(requestWalletTransTrade, payload);
  if (get(data, "status_code") === 200) {
    callbackSuccess();
    return;
  }
}

function requestWalletTransTrade(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/wallet-trans/earn`, {
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

function* walletGetEmailOrAddress({ payload, callbackSuccess }) {
  const { data } = yield call(requestWalletGetEmailOrAddress, payload);
  if (get(data, "status_code") === 200) {
    callbackSuccess(data.data);
    return;
  }
}

function* checkIfWalletAddressExist({ payload, callbackSuccess }) {
  const { data } = yield call(requestWalletGetEmailOrAddress, payload);
  if (get(data, "status_code") === 200 && data.data.length) {
    callbackSuccess(true);
    return;
  } else {
    callbackSuccess(false);
    return;
  }
}

function requestWalletGetEmailOrAddress(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/wallet/getByEmailOrAddress?txtSearch=${payload}`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function* walletGetMoreUsjInvest({ payload, callbackSuccess }) {
  const { data } = yield call(requestGetMoreInvest, payload);
  if (get(data, "status_code") === 200) {
    callbackSuccess(data.data);
    return;
  }
}

function requestGetMoreInvest(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/wallet-trans/exchange/usj-in-vest`, {
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

function* getPaymentCode({ payload, callback }) {
  const results = yield call(getPaymentCodeFromApi, payload);
  if (get(results, "data.status_code") === 200) {
    callback({ status: true, message: "" });
    yield put(getPaymentCodeSuccess(get(results, "data.data", {})));
  } else {
    callback({ status: false, message: "" });
  }
}

function getPaymentCodeFromApi(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/merchant-order/make-payment`, {
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

function* verifyPayment({ payload, callback }) {
  try {
    const results = yield call(verifyPaymentFromApi, payload);
    if (get(results, "data.status_code") === 200) {
      callback({ status: true, message: "" });
    } else {
      callback({ status: false, message: "" });
    }
  } catch (error) {
    callback({ status: false, message: error?.message || "" });
  }
}

function verifyPaymentFromApi(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/merchant-order/verify-payment`, {
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

function* requestWithdrawPayment({ payload, callback }) {
  try {
    const data = yield call(requestWithdrawPaymentApi, payload);
    if (get(data, "status") === 200) {
      callback(data.data);
      return;
    }
  } catch (error) {
    callback({ status: false, message: error?.message || "" });
  }
}

function requestWithdrawPaymentApi(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/wallet-partner/withdraw`, {
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

function* requestLoadDeposit({ payload, callbackSuccess }) {
  try {
    const results = yield call(requestLoadDepositFromApi, payload);
    if (get(results, "status") === 200) {
      callbackSuccess();
      return;
    }
  } catch (error) {}
}

function requestLoadDepositFromApi(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/customer/load-deposit`, {
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

export default function* root() {
  yield all([
    takeLatest(GET_WALLET_LIST, getWallets),
    takeLatest(VIEW_WALLET_DETAILS, viewWalletDetails),
    takeLatest(WALLET_WITHDRAW_TRANSFER, onWithdrawWallet),
    takeLatest(WALLET_SWAP_TRANSFER, onSwapWallet),
    takeLatest(GET_IS_INTERNAL, getIsInternal),
    takeLatest(VERIFY_TRACSACTION, verifyTransaction),
    takeLatest(CANCEL_TRANSACTION, cancelTransaction),
    takeLatest(WALLET_TRAN_WITHDRAW, walletTranTransfer),
    takeLatest(WALLET_GET_BY_EMAIL_OR_ADDRESS, walletGetEmailOrAddress),
    takeLatest(GET_MORE_USJ_INVEST, walletGetMoreUsjInvest),
    takeLatest(CHECK_WALLET_ADDRESS, checkIfWalletAddressExist),
    takeLatest(GET_PAYMENT_CODE, getPaymentCode),
    takeLatest(VERIFY_PAYMENT, verifyPayment),
    takeLatest(WITHDRAW_PAYMENT, requestWithdrawPayment),
    takeLatest(LOAD_DEPOSIT, requestLoadDeposit),
  ]);
}
