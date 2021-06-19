import { GET_TRANSACTION_LIST_SUCCESS } from "./constants";

const initialState = {
  items: [],
  viewItem: null,
};

export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case GET_TRANSACTION_LIST_SUCCESS: {
      return {
        ...state,
        items: payload,
      };
    }
    default:
      return { ...state };
  }
};
