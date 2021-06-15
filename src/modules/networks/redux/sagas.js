import { all, call, put, takeLatest } from "redux-saga/effects";
import { ROOT_API_URL } from "../../../commons/constants/index";
import { get } from "lodash";
import * as qs from "query-string";
import { INVITE_FRIEND } from "./constants";
import fetchHelper from "../../../helpers/FetchHelper";

function* inviteFriend({ payload, callbackSuccess }) {
    const { data } = yield call(requestInviteFriend, payload);
    console.log(data);
    if (get(data, "status_code") === 200) {
      callbackSuccess();
    }
  }

  export default function* rootSaga() {
    yield all([
        yield takeLatest(INVITE_FRIEND,inviteFriend),
    ])
  }
  
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