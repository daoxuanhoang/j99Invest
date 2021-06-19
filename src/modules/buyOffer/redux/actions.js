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

export const getProductList = (payload) => {
  return {
    type: types.GET_PRODUCT_LIST,
    payload,
  };
};

export const getProductListSuccess = (payload) => {
  return {
    type: types.GET_PRODUCT_LIST_SUCCESS,
    payload,
  };
};
export const postProductList = (payload) => {
  return {
    type: types.POST_PRODUCT_LIST,
    payload,
  };
};
export const postProductListSuccess = (payload) => {
  return {
    type: types.POST_PRODUCT_LIST_SUCCESS,
    payload,
  };
};
