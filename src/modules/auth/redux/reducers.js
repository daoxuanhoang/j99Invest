import produce from "immer";
import * as types from "./constants";
import { USER_INFO_KEY } from "../../../commons/constants/index";

const initialState = {
    userInfo: JSON.parse(localStorage.getItem(USER_INFO_KEY))  || {},
    dataOpenModalAuthy: null,
};

const updateUserInfoToLocal = (userInfo) => {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
};

export default function AuthReducer(state = initialState, action) {
    const {payload} = action;
    return produce(state, (draft) => {
        switch (action.type) {
            case types.LOGIN_SUCCESS:
                draft.userInfo = payload;
                break;
        
            default:
                break;
        }
    });
};