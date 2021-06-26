import { GET_VERIFY_CODE, UPDATE_KYC, UPDATE_KYC_SUCCESS, UPDATE_AUTHY, REGISTER_AUTHY } from "./constants";

export const getVerifyCode = (data) => ({
  type: GET_VERIFY_CODE,
  payload: data,
});

export const updateKyc = (data, callbackSuccess = null) => {
  return {
    type: UPDATE_KYC,
    data,
    callbackSuccess,
  };
};

export const updateKycSuccess = (data) => ({
  type: UPDATE_KYC_SUCCESS,
  payload: data,
});

export const updateAuthy = (data, callbackSuccess = null) => {
  return {
    type: UPDATE_AUTHY,
    data,
    callbackSuccess,
  };
};

export const registerAuthy = (data, callbackSuccess = null) => {
  return {
    type: REGISTER_AUTHY,
    data,
    callbackSuccess,
  };
};
