import {
  GET_TRANSACTION_LIST,
  GET_TRANSACTION_LIST_SUCCESS,
  CANCEL_TRANSACTION_WITHDRAW,
  CANCEL_TRANSACTION_TRANSFER,
  APPROVE_TRANSACTION,
} from "./constants";

export const getTransactionList = (payload) => {
  return {
    type: GET_TRANSACTION_LIST,
    payload,
  };
};
export const getTransactionListSuccess = (payload) => {
  return {
    type: GET_TRANSACTION_LIST_SUCCESS,
    payload,
  };
};

export const cancelTransactionTypeWithDraw = (payload, callbackSuccess) => {
  return {
    type: CANCEL_TRANSACTION_WITHDRAW,
    payload,
    callbackSuccess,
  };
};

export const cancelTransactionTypeTransfer = (payload, callbackSuccess) => {
  return {
    type: CANCEL_TRANSACTION_TRANSFER,
    payload,
    callbackSuccess,
  };
};

export const approveTransaction = (payload, callbackSuccess) => {
  return {
    type: APPROVE_TRANSACTION,
    payload,
    callbackSuccess,
  };
};
