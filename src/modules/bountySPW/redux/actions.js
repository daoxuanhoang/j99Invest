import * as types from "./constants";


export const getListBounty = (payload, callback) => {
    return {
        type: types.GET_LIST_BOUNTY,
        payload,
        callback,
    };
};
export const getListBountySuccess = (payload) => {
    return {
        type: types.GET_LIST_BOUNTY_SUCCESS,
        payload,
    };
};
    
