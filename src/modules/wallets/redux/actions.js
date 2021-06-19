import {
  GET_WALLET_LIST,
  GET_WALLET_LIST_SUCCESS,
  VIEW_WALLET_DETAILS,
  VIEW_WALLET_DETAILS_SUCCESS,
  WALLET_WITHDRAW_TRANSFER,
  WALLET_WITHDRAW_TRANSFER_SUCCESS,
  WALLET_SWAP_TRANSFER,
  GET_IS_INTERNAL,
  VERIFY_TRACSACTION,
  VERIFY_TRACSACTION_SUCCESS,
  VERIFY_TRACSACTION_FAIL,
  CANCEL_TRANSACTION,
  WALLET_TRAN_WITHDRAW,
  FILTER_TABLE,
  WALLET_GET_BY_EMAIL_OR_ADDRESS,
  GET_MORE_USJ_INVEST,
  HISTORY_MODAL,
  CHECK_WALLET_ADDRESS,
  SET_TRADING_PRICE,
  GET_PAYMENT_CODE,
  GET_PAYMENT_CODE_SUCCESS,
  VERIFY_PAYMENT,
  VIEW_WALLET_PAYEMENT_DETAILS,
  DEPOSIT_PAYMENT,
  WITHDRAW_PAYMENT,
  LOAD_DEPOSIT,
} from "./constants";

export const getWallets = (payload) => {
  return {
    type: GET_WALLET_LIST,
    payload,
  };
};
export const getWalletsSuccess = (payload) => {
  return {
    type: GET_WALLET_LIST_SUCCESS,
    payload,
  };
};

export const viewWalletDetail = (payload) => {
  return {
    type: VIEW_WALLET_DETAILS,
    payload,
  };
};

export const viewWalletDetailSuccess = (payload) => {
  return {
    type: VIEW_WALLET_DETAILS_SUCCESS,
    payload,
  };
};

export const withdrawWallet = (payload, callbackSuccess) => {
  return {
    type: WALLET_WITHDRAW_TRANSFER,
    payload,
    callbackSuccess,
  };
};

export const withdrawWalletSuccess = () => {
  return {
    type: WALLET_WITHDRAW_TRANSFER_SUCCESS,
  };
};

export const swapWallet = (payload, callbackSuccess) => {
  return {
    type: WALLET_SWAP_TRANSFER,
    payload,
    callbackSuccess,
  };
};

export const getIsInternal = (payload) => {
  return {
    type: GET_IS_INTERNAL,
    payload,
  };
};

export const verifyTransaction = (data, callbackSuccess = null, callbackError = null) => {
  return {
    type: VERIFY_TRACSACTION,
    payload: data,
    callbackSuccess,
    callbackError,
  };
};

export const verifyTransactionSuccess = (payload) => ({
  type: VERIFY_TRACSACTION_SUCCESS,
  payload,
});

export const verifyTransactionFail = (payload) => ({
  type: VERIFY_TRACSACTION_FAIL,
  payload,
});

export const cancelTransaction = (payload, callbackSuccess) => ({
  type: CANCEL_TRANSACTION,
  payload,
  callbackSuccess,
});

export const walletTransWithdraw = (payload, callbackSuccess) => ({
  type: WALLET_TRAN_WITHDRAW,
  payload,
  callbackSuccess,
});

export const setFilterCode = (payload) => ({
  type: FILTER_TABLE,
  payload,
});

export const wallerGetByEmailOrAddress = (payload, callbackSuccess) => ({
  type: WALLET_GET_BY_EMAIL_OR_ADDRESS,
  payload,
  callbackSuccess,
});

export const getMoreUsjInvest = (payload, callbackSuccess) => ({
  type: GET_MORE_USJ_INVEST,
  payload,
  callbackSuccess,
});

export const triggerHistoryModal = (payload) => ({
  type: HISTORY_MODAL,
  payload,
});

export const checkIfWalletAddressExist = (payload, callbackSuccess) => ({
  type: CHECK_WALLET_ADDRESS,
  payload,
  callbackSuccess,
});

export const setTradingPrice = (payload) => ({
  type: SET_TRADING_PRICE,
  payload,
});

export const getPaymentCode = (payload, callback) => ({
  type: GET_PAYMENT_CODE,
  payload,
  callback,
});
export const getPaymentCodeSuccess = (payload) => ({
  type: GET_PAYMENT_CODE_SUCCESS,
  payload,
});

export const verifyPayment = (payload, callback) => ({
  type: VERIFY_PAYMENT,
  payload,
  callback,
});

export const withdrawPayment = (payload, callback = () => {}) => ({
  type: WITHDRAW_PAYMENT,
  payload,
  callback,
});

export const loadDeposit = (payload, callbackSuccess) => ({
  type: LOAD_DEPOSIT,
  payload,
  callbackSuccess,
});
