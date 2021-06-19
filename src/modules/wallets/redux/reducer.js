import { TRON, USDTTRON } from "commons/constants";
import {
  GET_WALLET_LIST_SUCCESS,
  VIEW_WALLET_DETAILS_SUCCESS,
  VERIFY_TRACSACTION_SUCCESS,
  VERIFY_TRACSACTION_FAIL,
  FILTER_TABLE,
  HISTORY_MODAL,
  SET_TRADING_PRICE,
  GET_PAYMENT_CODE_SUCCESS,
} from "./constants";

const initialState = {
  items: [],
  viewItem: null,
  alert: {
    success: false,
    fail: false,
    data: null,
  },
  filterCode: "transaction",
  history: {
    isShow: false,
    type: "ALL",
    currency: "USJ",
  },
  tradingPrice: 1,
  infoPaymentOrder: {},
};

const OPTION_SHOW_WALLET = [USDTTRON];

export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case GET_WALLET_LIST_SUCCESS: {
      return {
        ...state,
        items: [payload].filter((item) => {
          return item.unit && OPTION_SHOW_WALLET.indexOf(item.unit) !== -1 && item.network === TRON;
        }),
      };
    }
    case VIEW_WALLET_DETAILS_SUCCESS: {
      return {
        ...state,
        viewItem: payload,
      };
    }
    case VERIFY_TRACSACTION_SUCCESS:
      return {
        ...state,
        alert: {
          ...state.alert,
          success: payload.value,
          data: payload.data,
        },
      };
    case VERIFY_TRACSACTION_FAIL:
      return {
        ...state,
        alert: {
          ...state.alert,
          fail: payload,
        },
      };
    case FILTER_TABLE:
      return {
        ...state,
        filterCode: payload,
      };
    case HISTORY_MODAL:
      return {
        ...state,
        history: payload,
      };
    case SET_TRADING_PRICE:
      return {
        ...state,
        tradingPrice: payload,
      };
    case GET_PAYMENT_CODE_SUCCESS:
      return {
        ...state,
        infoPaymentOrder: payload,
      };
    default:
      return { ...state };
  }
};
