import * as types from "./constants";
// import { map } from "lodash";
// import { uniqBy, orderBy, cloneDeep } from "lodash";

const initialState = {
  isUpdateKycSuccess: false,
};

export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.UPDATE_KYC_SUCCESS: {
      return {
        ...state,
        isUpdateKycSuccess: payload,
      };
    }
    default:
      return { ...state };
  }
};
