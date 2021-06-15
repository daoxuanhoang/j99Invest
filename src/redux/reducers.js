import { combineReducers } from "redux";

import { ApplicationReducer } from "../modules/application/index";
import  ProfileReducer  from "../modules/profile/redux/reducers";
import { DashboardReducer } from "../modules/dashboard";
import { BountySpwReducer } from "../modules/bountySPW";

export default combineReducers ({
    application: ApplicationReducer,
    profile: ProfileReducer,
    dashboard: DashboardReducer,
    bounty: BountySpwReducer,
});