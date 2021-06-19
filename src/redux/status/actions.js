import { CHANGE_MAIN_STATUS_LOADING } from "./constants";

export const changeMainStatusLoading = (payload, callback) => ({
  type: CHANGE_MAIN_STATUS_LOADING,
  payload,
  callback,
});
