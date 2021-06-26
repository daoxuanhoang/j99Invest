import * as types from "./constants";

export const postLogin = (payload, redirect) => ({
  type: types.LOGIN,
  payload,
  redirect,
});

export const loginSuccess = (payload) => ({
  type: types.LOGIN_SUCCESS,
  payload,
});

export const postSignup = (payload, redirect) => ({
  type: types.SIGN_UP,
  payload,
  redirect,
});

export const postActiveAccount = (payload, redirect) => ({
  type: types.ACTIVE_ACCOUNT,
  payload,
  redirect,
});

export const postForgotPassword = (payload) => ({
  type: types.FORGOT_PASSWORD,
  payload,
});

export const postResetPassword = (payload, redirect) => ({
  type: types.NEW_PASSWORD,
  payload,
  redirect,
});

export const updatedAvatar = (payload) => ({
  type: types.UPDATED_AVATAR,
  payload,
});

export const updateToggleAuthyModal = (payload) => ({
  type: types.TOGGLE_AUTHY_MODAL,
  payload,
});

export const updateAuthVerify = (payload, callbackSuccess) => ({
  type: types.UPDATE_AUTHY_VERIFY,
  payload,
  callbackSuccess,
});

export const getprofile = (payload, redirect) => ({
  type: types.GET_PROFILE,
  payload,
  redirect,
});
