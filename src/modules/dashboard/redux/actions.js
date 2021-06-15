import * as types from "./constants";


export const getRate = () => ({
    type: types.GET_RATE,
});

export const getRateSuccess = (payload) => ({
    type: types.GET_RATE_SUCCESS,
    payload,
});