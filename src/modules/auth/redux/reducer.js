import produce from "immer";
import * as types from "./constants";
import { CACHE_USER_INFO } from "commons/constants";
import { UPDATED_AVATAR } from "./constants";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem(CACHE_USER_INFO)) || {},
  dataOpenModalAuthy: null,
};

const updateUserInfoToLocal = (userInfo) => {
  localStorage.setItem(CACHE_USER_INFO, JSON.stringify(userInfo));
};

export default function AuthReducer(state = initialState, action) {
  const { payload } = action;
  return produce(state, (draft) => {
    switch (action.type) {
      case types.LOGIN_SUCCESS:
        draft.userInfo = payload;
        break;
      case UPDATED_AVATAR: {
        draft.userInfo = payload;
        updateUserInfoToLocal(payload);
        break;
      }
      case types.TOGGLE_AUTHY_MODAL: {
        draft.dataOpenModalAuthy = payload;
        break;
      }
      default:
        break;
    }
  });
}
