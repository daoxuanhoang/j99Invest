import { TRON, USDTTRON } from "commons/constants";
import { GET_WALLET_LIST_SUCCESS, GET_LIST_BOUNTY_SUCCESS } from "./constants";

const initialState = {
  items: [],
  listBounty: [],
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

    case GET_LIST_BOUNTY_SUCCESS:
      return {
        ...state,
        listBounty: payload,
      };
      break;

    default:
      return { ...state };
  }
};
