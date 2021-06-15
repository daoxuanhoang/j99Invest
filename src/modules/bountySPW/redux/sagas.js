import { all, put, call, takeLatest } from "redux-saga/effects";
import { get } from "lodash";
import { ROOT_API_URL } from "../../../commons/constants/index";
import fetchHelper from "../../../helpers/FetchHelper";
import * as actions from "./actions";
import { GET_LIST_BOUNTY } from "./constants";


function* getListBounty(payload) {
    try {
        const { data, status } = yield call(getListBountyFromApi, payload);
        if(status === 200) {
            yield put(actions.getListBountySuccess(data));  
            return;
        }
    } catch (error) {}
};

export default function* rootSaga() {
    yield all([
        takeLatest(GET_LIST_BOUNTY, getListBounty),
    ]);
};

function getListBountyFromApi(data) {
    return fetchHelper
    .fetch(`${ROOT_API_URL}/bounty/list`, {
        method: "GET",
    })
    .then(([resp, status]) => ({
        data: resp.data,
        status,

    }))
}