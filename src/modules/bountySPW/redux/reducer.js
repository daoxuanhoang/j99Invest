import produce from "immer";
import * as types from "./constants";


const initialState = {
    listBounty: [],
}

export default (state = initialState, action) => {
    const { payload } = action;
    return produce(state, (draft) => {
        switch (action.type) {
            case types.GET_LIST_BOUNTY_SUCCESS:
                draft.listBounty = payload;
                break;
            default:
                break;
        }
    })
}