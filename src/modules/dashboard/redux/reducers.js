import * as types from "./constants";
import produce from "immer";

const initialState = {
  ratePv: [],

};

export default (state = initialState, action) => {
  const { payload } = action;
  return produce(state, (draft) => {
    switch (action.type) {
      case types.GET_RATE_SUCCESS:
        draft.ratePv = payload;
      default:
        break;
    }
  });
};
