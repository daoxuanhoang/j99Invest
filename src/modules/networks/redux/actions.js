import * as types from "./constants";

export const getCountMembers = (payload) => {
  return {
    payload,
    type: types.GET_COUNT_MEMBERS,
  };
};
export const getCountMembersSuccess = (data) => {
  return {
    type: types.GET_COUNT_MEMBERS_SUCCESS,
    payload: data,
  };
};

export const getCountCommission = () => {
  return {
    type: types.GET_COUNT_COMMISSION,
  };
};
export const getCountCommissionSuccess = (data) => {
  return {
    type: types.GET_COUNT_COMMISSION_SUCCESS,
    payload: data,
  };
};

export const getReferal = (data) => {
  return {
    type: types.GET_REFERRAL,
    data,
  };
};
export const getReferalSuccess = (data) => {
  return {
    type: types.GET_REFERRAL_SUCCESS,
    payload: data,
  };
};

export const getDetailList = (payload) => {
  return {
    type: types.GET_REF_DETAIL_LIST,
    payload,
  };
};

export const getRefDetailSuccess = (payload) => ({
  type: types.GET_REF_DETAIL_LIST_SUCCESS,
  payload,
});

export const getSumaryComission = (payload) => ({
  type: types.GET_SUMARY_COMISSION,
  payload,
});

export const getSumaryComissionSuccess = (payload) => ({
  type: types.GET_SUMARY_COMISSION_SUCCESS,
  payload,
});

export const inviteFriend = (payload, callbackSuccess) => ({
  type: types.INVITE_FRIEND,
  payload,
  callbackSuccess,
});

export const inviteSponsor = (payload, callbackSuccess) => ({
  type: types.INVITE_SPONSOR,
  payload,
  callbackSuccess,
});

export const getBinary = () => {
  return {
    type: types.GET_BINARY,
  };
};

export const getBinarySuccess = (data) => {
  return {
    type: types.GET_BINARY_SUCCESS,
    payload: data,
  };
};

export const getBinarySponsorF1 = (data) => {
  return {
    type: types.GET_BINARY_SPONSOR_F1,
    payload: data,
  };
};

export const getBinarySponsorF1Success = (data) => {
  return {
    type: types.GET_BINARY_SPONSOR_F1_SUCCESS,
    payload: data,
  };
};

export const changeBinarySponsorPosition = (payload, callbackSuccess) => {
  return {
    type: types.CHANGE_BINARY_SPONSOR_POSITION,
    payload,
    callbackSuccess,
  };
};

export const getBinarySponsorWithPosition = (payload) => {
  return {
    type: types.GET_BINARY_SPONSOR_WITH_POSITION,
    payload,
  };
};

export const getBinarySponsorWithPositionSuccess = (payload) => {
  return {
    type: types.GET_BINARY_SPONSOR_WITH_POSITION_SUCCESS,
    payload,
  };
};

export const verifySponsor = (data, callbackSuccess) => {
  return {
    type: types.VERIFY_SPONSOR,
    payload: data,
    callbackSuccess,
  };
};
export const verifySponsorSuccess = (payload) => ({
  type: types.VERIFY_SPONSOR_SUCCESS,
  payload,
});
export const verifySponsorFail = (payload) => ({
  type: types.VERIFY_SPONSOR_FAIL,
  payload,
});

export const getYourNetwork = (data) => {
  return {
    type: types.GET_YOUR_NETWORK,
    payload: data,
  };
};

export const getYourNetworkSuccess = (data) => {
  return {
    type: types.GET_YOUR_NETWORK_SUCCESS,
    payload: data,
  };
};

export const getRevenue = (data) => {
  return {
    type: types.GET_REVENUE,
    payload: data,
  };
};

export const getRevenueSuccess = (data) => {
  return {
    type: types.GET_REVENUE_SUCCESS,
    payload: data,
  };
};

export const getReferalDetail = (payload, callbackSuccess) => ({
  type: types.GET_REFERAL_DETAIL,
  payload,
  callbackSuccess,
});

export const getReferalDetailSuccess = (payload) => {
  return {
    type: types.GET_REFERAL_DETAIL_SUCCESS,
    payload,
  };
};

export const openUserHistoryModal = (payload) => {
  return {
    type: types.OPEN_USER_HISTORY_MODAL,
    payload,
  };
};

export const getUserWalletHistoryList = (payload) => {
  return {
    type: types.GET_USER_WALLET_HISTORY_LIST,
    payload,
  };
};

export const getUserWalletHistoryListSuccess = (payload) => {
  return {
    type: types.GET_USER_WALLET_HISTORY_LIST_SUCCESS,
    payload,
  };
};
