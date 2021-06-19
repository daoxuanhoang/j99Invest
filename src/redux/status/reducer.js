import produce from "immer";
import { isFunction } from "lodash";

import { CHANGE_MAIN_STATUS_LOADING } from "./constants";

const initialState = {
  loading: false,
};

export default function LoadingState(state = initialState, action) {
  const { payload, type, callback } = action;
  return produce(state, (draft) => {
    switch (type) {
      case CHANGE_MAIN_STATUS_LOADING:
        draft.loading = payload;
        if (isFunction(callback)) callback();
        break;
      default:
        break;
    }
  });
}
