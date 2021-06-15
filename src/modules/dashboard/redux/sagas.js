import { all, call, put, takeLatest } from "redux-saga/effects";
import { ROOT_API_URL } from "../../../commons/constants";
import fetchHelper from "../../../helpers/FetchHelper";
import { get } from "lodash";
import * as actions from "./actions";
import { GET_RATE } from "./constants";


function* getRate() {
    try {
        const { data } = yield call(getRateFromApi);
        if (get(data, "status_code") === 200) {
          yield put(actions.getRateSuccess(data.data));
          return;
        }
      } catch (error) {}
}
export default function* rootSaga() {
    yield all([
        takeLatest(GET_RATE, getRate),
    ])
}
function getRateFromApi() {
    return fetchHelper
    .fetch(`${ROOT_API_URL}/dashboard/rate-price`, {
        method: "GET",
    })
    .then(([resp, status]) => ({
        data: resp,
        status,
    }))
}