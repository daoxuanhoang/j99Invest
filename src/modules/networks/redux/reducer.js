import {
    GET_COUNT_MEMBERS_SUCCESS,
    GET_COUNT_COMMISSION_SUCCESS,
    GET_REFERRAL_SUCCESS,
    GET_REF_DETAIL_LIST_SUCCESS,
    GET_SUMARY_COMISSION_SUCCESS,
    GET_BINARY_SUCCESS,
    GET_BINARY_SPONSOR_F1_SUCCESS,
    GET_BINARY_SPONSOR_WITH_POSITION_SUCCESS,
    VERIFY_SPONSOR_FAIL,
    VERIFY_SPONSOR_SUCCESS,
    GET_YOUR_NETWORK_SUCCESS,
    GET_REVENUE_SUCCESS,
    OPEN_USER_HISTORY_MODAL,
    GET_REFERAL_DETAIL_SUCCESS,
    GET_USER_WALLET_HISTORY_LIST_SUCCESS,
  } from "./constants";
  import { map, get, lowerCase } from "lodash";
  
  const initialState = {
    countMembers: {},
    countCommission: {},
    listRef: [],
    listFetchApi: {},
    listRefDetail: {},
    sumaryComission: {},
    listBinary: [],
    listBinarySponsor: [],
    alert: {
      fail: false,
      success: false,
      data: null,
    },
    binaryTreeData: {},
    revenueRef: {
      data: [],
      total: 0,
    },
    modalUserHistory: {
      toggle: false,
      data: null,
    },
    referalDetailData: {
      data: [],
      total: 0,
      perPage: 0,
      totalPay: 0,
    },
  };
  
  export default (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
      case GET_COUNT_MEMBERS_SUCCESS: {
        return {
          ...state,
          countMembers: payload,
        };
      }
      case GET_COUNT_COMMISSION_SUCCESS: {
        return {
          ...state,
          countCommission: payload,
        };
      }
      case GET_REFERRAL_SUCCESS: {
        let listRefData = [];
        let listFetchApiData = { ...state.listFetchApi };
        const parentId = payload.parentId;
        const mapData = payload.data.map((o, i) => {
          o.children = [];
          o.parent = parentId;
          return o;
        });
        if (payload.isRefresh) {
          listRefData = [...mapData];
          listFetchApiData = {};
        }
        if (!payload.isRefresh) {
          listRefData = [...state.listRef, ...mapData];
          listFetchApiData[parentId] = true;
        }
        return {
          ...state,
          listRef: listRefData,
          listFetchApi: listFetchApiData,
        };
      }
      case GET_REF_DETAIL_LIST_SUCCESS: {
        const { data, lastPage, page, perPage, total } = payload;
        const listRef = data.filter((o) => o.status === 1);
        return {
          ...state,
          listRefDetail: {
            data: listRef,
            page,
            perPage,
            lastPage,
            total,
          },
        };
      }
      case GET_SUMARY_COMISSION_SUCCESS: {
        return {
          ...state,
          sumaryComission: payload,
        };
      }
  
      case GET_BINARY_SUCCESS: {
        const listBinary = map(payload, (ref, index) => ({
          id: ref.id,
          key: ref.username,
          parent: parseInt(ref.sponsor_id),
          label: ref.username,
          level: ref.level,
          full_name: ref.full_name,
          sponsor_id: ref.sponsor_id,
        }));
  
        return {
          ...state,
          listBinary,
        };
      }
  
      case GET_BINARY_SPONSOR_F1_SUCCESS: {
        return {
          ...state,
          listBinarySponsor: payload,
        };
      }
  
      case VERIFY_SPONSOR_SUCCESS:
        return {
          ...state,
          alert: {
            ...state.alert,
            success: payload.value,
            data: payload.data,
          },
        };
      case VERIFY_SPONSOR_FAIL:
        return {
          ...state,
          alert: {
            ...state.alert,
            fail: payload,
          },
        };
  
      case GET_BINARY_SPONSOR_WITH_POSITION_SUCCESS: {
        const rawList = map(payload, (item) => ({
          ...item,
          position: lowerCase(get(item, "position")),
        }));
        return {
          ...state,
          listBinarySponsorWithPosition: rawList,
        };
      }
      case GET_YOUR_NETWORK_SUCCESS: {
        return {
          ...state,
          binaryTreeData: payload,
        };
      }
      case GET_REVENUE_SUCCESS: {
        return {
          ...state,
          revenueRef: payload,
        };
      }
      case OPEN_USER_HISTORY_MODAL:
        return {
          ...state,
          modalUserHistory: { toggle: payload.value, data: payload.data },
        };
      case GET_REFERAL_DETAIL_SUCCESS:
        return {
          ...state,
          referalDetailData: {
            data: payload?.data || [],
            total: payload?.pagination?.length || 0,
            perPage: payload?.pagination.perPage || 0,
            totalPay: payload?.total || 0,
          },
        };
      case GET_USER_WALLET_HISTORY_LIST_SUCCESS:
        return {
          ...state,
          userWalletHistoryList: {
            data: payload?.data || [],
            total: payload?.total,
            perPage: payload?.perPage,
          },
        };
      default:
        return { ...state };
    }
  };
  