import { all, takeLatest, call, put } from "redux-saga/effects";
import { ROOT_API_URL } from "../../../commons/constants";
import { get, isFunction } from "lodash";
import * as qs from "query-string";
import {
  GET_COUNT_MEMBERS,
  GET_COUNT_COMMISSION,
  GET_REFERRAL,
  GET_BINARY,
  GET_REF_DETAIL_LIST,
  GET_SUMARY_COMISSION,
  INVITE_FRIEND,
  INVITE_SPONSOR,
  GET_BINARY_SPONSOR_F1,
  GET_BINARY_SPONSOR_WITH_POSITION,
  CHANGE_BINARY_SPONSOR_POSITION,
  CHANGE_BINARY_SPONSOR_POSITION_SUCCESS,
  VERIFY_SPONSOR,
  GET_YOUR_NETWORK,
  GET_REVENUE,
  GET_REFERAL_DETAIL,
  GET_USER_WALLET_HISTORY_LIST,
} from "./constants";
import fetchHelper from "helpers/FetchHelper";
import {
  getBinarySponsorF1 as getBinarySponsorF1Action,
  getBinarySponsorWithPosition as getBinarySponsorWithPositionAction,
  getCountMembersSuccess,
  getCountCommissionSuccess,
  getReferalSuccess,
  getRefDetailSuccess,
  getSumaryComissionSuccess,
  getBinarySuccess,
  getBinarySponsorF1Success,
  getBinarySponsorWithPositionSuccess,
  verifySponsorSuccess as verifySponsorSuccessAction,
  verifySponsorFail as verifySponsorFailAction,
  getYourNetworkSuccess,
  getRevenueSuccess,
  getReferalDetailSuccess,
  getUserWalletHistoryListSuccess,
} from "./actions";

function* getCountMembers({ payload }) {
  try {
    const response = yield call(getCountMembersFromApi, payload);
    if (get(response, "status") === 200) {
      yield put(getCountMembersSuccess(response.data.data));
    }
  } catch { }
}

function* getCountCommission() {
  try {
    const reponse = yield call(getCountCommissionFromApi);
    if (reponse.status === 200) {
      yield put(getCountCommissionSuccess(reponse.data.data));
    }
  } catch (error) { }
}

function* getReferral({ data }) {
  try {
    const response = yield call(getReferralFromApi, data);
    const { isRefresh } = data;
    if (get(response, "status") === 200) {
      const data = get(response, "data");
      const parentId = get(response, "parentId");
      yield put(getReferalSuccess({ data, parentId, isRefresh }));
    }
  } catch (err) { }
}

function* getRefDetail({ payload }) {
  const param = {
    limit: payload.pageSize,
    page: payload.pageIndex,
    customerId: payload.customerId,
  };
  const res = yield call(getRefDetailFromApi, param);
  if (get(res, "status") === 200) {
    const data = get(res, "data", []);
    yield put(getRefDetailSuccess(data));
  }
}

function* getSumaryComission({ payload }) {
  const res = yield call(getSumaryComissionFromApi, payload);
  if (get(res, "status") === 200) {
    const data = get(res, "data", []);
    yield put(getSumaryComissionSuccess(data));
  }
}

function* inviteFriend({ payload, callbackSuccess }) {
  const { data } = yield call(requestInviteFriend, payload);
  if (get(data, "status_code") === 200) {
    callbackSuccess();
  }
}

function* inviteSponsor({ payload, callbackSuccess }) {
  const { data } = yield call(requestInviteSponsor, payload);
  if (get(data, "status_code") === 200) {
    if (isFunction(callbackSuccess)) callbackSuccess();
  }
}

function* verifySponsor({ payload, callbackSuccess }) {
  const { data } = yield call(verifySponsorFromAPI, payload);
  if (get(data, "status_code") === 200) {
    yield put(
      verifySponsorSuccessAction({
        value: true,
        data: get(data, "data"),
      })
    );
  } else {
    yield put(verifySponsorFailAction(true));
  }
  if (isFunction(callbackSuccess)) callbackSuccess();
}

function* changePosition({ payload, callbackSuccess }) {
  try {
    const { status } = yield call(requestChangePosition, payload);
    if (status === 200) {
      callbackSuccess();
      yield put({
        type: CHANGE_BINARY_SPONSOR_POSITION_SUCCESS,
      });
    }
  } catch (error) { }
}

function* getBinary() {
  try {
    const response = yield call(getBinaryFromAPI);
    if (response.data.status_code === 200) {
      yield put(getBinarySuccess(response.data.data));
    }
  } catch (error) {
    // yield put(showMessError(ERROR));
  }
}

function* getBinarySponsorF1({ payload }) {
  try {
    const { data, status } = yield call(getBinarySponsorF1FromAPI, payload);
    if (status === 200) {
      yield put(getBinarySponsorF1Success(data));
    }
  } catch (error) {
    // yield put(showMessError(ERROR));
  }
}

function* getBinarySponsorWithPosition({ payload }) {
  try {
    const { data, status } = yield call(getBinarySponsorWithPositionFromAPI, payload);
    if (status === 200) {
      yield put(getBinarySponsorWithPositionSuccess(data));
    }
  } catch (error) {
    // yield put(showMessError(ERROR));
  }
}

function* changePositionSuccess() {
  try {
    yield put(getBinarySponsorF1Action());
    yield put(getBinarySponsorWithPositionAction());
  } catch (error) {
    // yield put(showMessError(ERROR));
  }
}

function* getYourNetwork(data) {
  try {
    const response = yield call(getYourNetworkFromAPI, data);
    if (response.data.status_code === 200) {
      yield put(getYourNetworkSuccess(response.data));
    }
  } catch (error) {
    // yield put(showMessError(ERROR));
  }
}

function* getRevenueData({ payload }) {
  try {
    const response = yield call(getRevenueFromApi, payload);
    if (response.status === 200) {
      const result = {
        data: response?.data.data || [],
        total: response?.data?.pagination?.total || 0,
      };
      yield put(getRevenueSuccess(result));
    }
  } catch (error) {
    // yield put(showMessError(ERROR));
  }
}

function* getReferalDetail({ payload }) {
  const res = yield call(requestGetReferalDetailFromApi, payload);
  if (get(res, "status") === 200) {
    const data = get(res, "data", []);
    yield put(getReferalDetailSuccess(data));
    return;
  }
}

function requestGetReferalDetailFromApi(payload) {
  const qsString = qs.stringify(payload);
  return fetchHelper
    .fetch(`${ROOT_API_URL}/order/list-my-stake?${qsString}`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp.data,
        status,
      };
    });
}

function* getUserWalletHistory({ payload }) {
  const res = yield call(requestGetUserWalletHistoryListFromApi, payload);
  if (get(res, "status") === 200) {
    const data = get(res, "data", []);
    yield put(getUserWalletHistoryListSuccess(data));
    return;
  }
}

function requestGetUserWalletHistoryListFromApi(payload) {
  const qsString = qs.stringify(payload);
  return fetchHelper
    .fetch(`${ROOT_API_URL}/wallet-trans/list?${qsString}`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp.data,
        status,
      };
    });
}

export default function* root() {
  yield all([
    yield takeLatest(GET_COUNT_MEMBERS, getCountMembers),
    yield takeLatest(GET_COUNT_COMMISSION, getCountCommission),
    yield takeLatest(GET_REFERRAL, getReferral),
    yield takeLatest(GET_BINARY, getBinary),
    yield takeLatest(GET_REF_DETAIL_LIST, getRefDetail),
    yield takeLatest(GET_SUMARY_COMISSION, getSumaryComission),
    yield takeLatest(INVITE_FRIEND, inviteFriend),
    yield takeLatest(INVITE_SPONSOR, inviteSponsor),
    yield takeLatest(VERIFY_SPONSOR, verifySponsor),
    yield takeLatest(GET_BINARY_SPONSOR_F1, getBinarySponsorF1),
    yield takeLatest(GET_BINARY_SPONSOR_WITH_POSITION, getBinarySponsorWithPosition),
    yield takeLatest(CHANGE_BINARY_SPONSOR_POSITION, changePosition),
    yield takeLatest(CHANGE_BINARY_SPONSOR_POSITION_SUCCESS, changePositionSuccess),
    yield takeLatest(GET_YOUR_NETWORK, getYourNetwork),
    yield takeLatest(GET_REVENUE, getRevenueData),
    yield takeLatest(GET_REFERAL_DETAIL, getReferalDetail),
    yield takeLatest(GET_USER_WALLET_HISTORY_LIST, getUserWalletHistory),
  ]);
}

const getYourNetworkFromAPI = (data) => {
  let { customerId, isBinarySponor } = data.payload || {
    customerId: "",
    isBinarySponor: 0,
  };

  return fetchHelper
    .fetch(`${ROOT_API_URL}/binary-tree/list?customer_id=${customerId}${isBinarySponor ? "&is_binary_sponsor=1" : ""}`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
};

const getBinaryFromAPI = () => {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/ref-info-user`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
};

const getBinarySponsorF1FromAPI = (params) => {
  const queryStr = params ? qs.stringify(params) : "";
  return fetchHelper
    .fetch(`${ROOT_API_URL}/binary-sponsor/list-f1${queryStr ? `?${queryStr}` : ""}`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp.data,
        status,
      };
    });
};

const getBinarySponsorWithPositionFromAPI = (params) => {
  const queryStr = params ? qs.stringify(params) : "";
  return fetchHelper
    .fetch(`${ROOT_API_URL}/binary-sponsor/list-with-position${queryStr ? `?${queryStr}` : ""}`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp.data,
        status,
      };
    });
};

const requestInviteFriend = (payload) => {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/invite-friend`, {
      method: "POST",
      body: JSON.stringify(payload),
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
};

const requestInviteSponsor = (payload) => {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/invite-bin-sponsor`, {
      method: "POST",
      body: JSON.stringify(payload),
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
};

const verifySponsorFromAPI = (data) => {
  return fetchHelper
    .fetch(
      `${ROOT_API_URL}/ref-bin-code`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      { isShowMessages: false }
    )
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
};

const getSumaryComissionFromApi = (params) => {
  const queryStr = qs.stringify(params);
  return fetchHelper.fetch(`${ROOT_API_URL}/referals/sumary-commission?${queryStr}`).then(([resp, status]) => {
    return {
      data: resp.data,
      status,
    };
  });
};

const getRefDetailFromApi = (payload) => {
  const queryStr = qs.stringify(payload);
  return fetchHelper.fetch(`${ROOT_API_URL}/order?${queryStr}`).then(([resp, status]) => {
    return {
      data: resp.data,
      status,
    };
  });
};

const getReferralFromApi = (payload) => {
  const queryStr = qs.stringify(payload);
  return fetchHelper
    .fetch(`${ROOT_API_URL}/childrents?${queryStr}`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp.data || [],
        parentId: payload.customer_id || 0,
        status,
      };
    });
};

const getCountMembersFromApi = (payload) => {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/referals/count-members?customer_id=${payload.customer_id}`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
};

const getCountCommissionFromApi = () => {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/referals/count-commission`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
};

const requestChangePosition = (payload) => {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/binary-sponsor/bring-tree`, {
      method: "POST",
      body: JSON.stringify(payload),
    })
    .then(([resp, status]) => {
      return {
        data: resp.data,
        status,
      };
    });
};

const getRevenueFromApi = (payload) => {
  const queryStr = qs.stringify(payload);
  return fetchHelper
    .fetch(`${ROOT_API_URL}/get-revenue-ref?${queryStr}`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp.data || [],
        parentId: payload.customer_id || 0,
        status,
      };
    });
};
