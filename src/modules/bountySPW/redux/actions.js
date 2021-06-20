import * as types from "./constants";

export const getWallets = (payload) => {
  return {
    type: types.GET_WALLET_LIST,
    payload,
  };
};
export const getWalletsSuccess = (payload) => {
  return {
    type: types.GET_WALLET_LIST_SUCCESS,
    payload,
  };
};

export const getListBounty = (payload, callback) => ({
  type: types.GET_LIST_BOUNTY,
  payload,
  callback,
});
export const getListBountySuccess = (payload) => ({
  type: types.GET_LIST_BOUNTY_SUCCESS,
  payload,
});

export const postFormBounty = (payload, callback) => ({
  type: types.POST_FORM_BOUNTY,
  payload,
  callback,
});
