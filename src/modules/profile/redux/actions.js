import {
    CREATE_BANK_MANAGER,
    CREATE_BANK_MANAGER_SUCCESS,
    DELETE_BANK_MANAGER,
    DELETE_BANK_MANAGER_SUCCESS,
    GET_LIST_BANK_MANAGER,
    GET_LIST_BANK_MANAGER_SUCCESS,
    GET_PROFILE,
    GET_PROFILE_SUCCESS,
    GET_VERIFY_CODE,
    GET_VERIFY_CODE_SUCCESS,
    OPEN_BANK_DIALOG,
    OPEN_UPDATE_PASSWORD_DIALOG,
    OPEN_UPDATE_PROFILE_DIALOG,
    UPDATE_BANK_MANAGER,
    UPDATE_BANK_MANAGER_SUCCESS,
    UPDATE_PASSWORD,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PROFILE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_STATE_USER,
    OPEN_UPDATE_EMAIL_DIALOG,
    UPDATE_EMAIL,
    UPDATE_EMAIL_SUCCESS,
    VERIFY_CHANGE_EMAIL,
  } from "./constants";
  
  export const getProfile = (data) => {
    return {
      type: GET_PROFILE,
      payload: data,
    };
  };
  export const getProfileSuccess = (data) => {
    return {
      type: GET_PROFILE_SUCCESS,
      payload: data,
    };
  };
  
  export const getVerifyCode = (data) => ({
    type: GET_VERIFY_CODE,
    payload: data,
  });
  
  export const getVerifyCodeSuccess = (data) => ({
    type: GET_VERIFY_CODE_SUCCESS,
    payload: data,
  });
  
  export const updateProfile = (data, callbackSuccess = null) => {
    return {
      type: UPDATE_PROFILE,
      data,
      callbackSuccess,
    };
  };
  
  export const updateProfileSuccess = (data) => {
    return {
      type: UPDATE_PROFILE_SUCCESS,
      payload: data,
    };
  };
  
  export const openUpdateProfileDialog = (data) => {
    return {
      type: OPEN_UPDATE_PROFILE_DIALOG,
      payload: data,
    };
  };
  
  export const openUpdatePasswordDialog = (data) => {
    return {
      type: OPEN_UPDATE_PASSWORD_DIALOG,
      payload: data,
    };
  };
  
  export const updatePassword = (data) => {
    return {
      type: UPDATE_PASSWORD,
      data,
    };
  };
  
  export const updatePasswordSuccess = (data) => {
    return {
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data,
    };
  };
  
  export const openUpdateEmailDialog = (data) => {
    return {
      type: OPEN_UPDATE_EMAIL_DIALOG,
      payload: data,
    };
  };
  
  export const updateEmail = (data) => {
    return {
      type: UPDATE_EMAIL,
      data,
    };
  };
  
  export const updateEmailSuccess = (data) => {
    return {
      type: UPDATE_EMAIL_SUCCESS,
      payload: data,
    };
  };
  
  // bank
  
  export const openBankDialog = (data) => {
    return {
      type: OPEN_BANK_DIALOG,
      payload: data,
    };
  };
  
  export const getListBank = () => {
    return {
      type: GET_LIST_BANK_MANAGER,
    };
  };
  export const getListBankSuccess = (data) => {
    return {
      type: GET_LIST_BANK_MANAGER_SUCCESS,
      payload: data,
    };
  };
  export const createBank = (data) => {
    return {
      type: CREATE_BANK_MANAGER,
      data,
    };
  };
  export const createBankSuccess = (data) => {
    return {
      type: CREATE_BANK_MANAGER_SUCCESS,
      payload: data,
    };
  };
  export const updateBank = (data) => {
    return {
      type: UPDATE_BANK_MANAGER,
      data,
    };
  };
  export const updateBankSuccess = (data) => {
    return {
      type: UPDATE_BANK_MANAGER_SUCCESS,
      payload: data,
    };
  };
  export const deleteBank = (id) => {
    return {
      type: DELETE_BANK_MANAGER,
      id,
    };
  };
  export const deleteBankSuccess = (data) => {
    return {
      type: DELETE_BANK_MANAGER_SUCCESS,
      payload: data,
    };
  };
  
  export const updateStateUser = (data) => {
    return {
      type: UPDATE_STATE_USER,
      payload: data,
    };
  };
  
  export const verifyEmail = (data, callbackSuccess = null) => {
    return {
      type: VERIFY_CHANGE_EMAIL,
      payload: data,
      callbackSuccess,
    };
  };
  