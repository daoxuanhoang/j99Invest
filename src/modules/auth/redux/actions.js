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

export const loginFailed = (payload) => ({
    type: types.LOGIN_FAILED,
    payload,
});

export const updateToggleAuthyModal = (payload) => ({
    type: types.TOGGLE_AUTHY_MODAL,
    payload,
  });

export const postSignup = (payload, redirect) => ({
    type: types.SIGNUP,
    payload,
    redirect,
})