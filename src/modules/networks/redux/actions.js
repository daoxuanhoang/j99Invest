import * as types from "./constants";

export const inviteFriend = (payload, callbackSuccess) => ({
    type: types.INVITE_FRIEND,
    payload,
    callbackSuccess,
  });