import { combineReducers } from "redux";

import { ApplicationReducer } from "../modules/application/index";
import  ProfileReducer  from "../modules/profile/redux/reducers";
import { DashboardReducer } from "../modules/dashboard";
import { BountySpwReducer } from "../modules/bountySPW";
import { AuthReducer } from "../modules/auth";
import { TransactionReducer } from "../modules/transactions";
import { BuyOfferReducer } from "modules/BuyOffer";
import { WalletReducer } from "modules/wallets";
import { NetWorkReducer } from "modules/networks";
import { SettingReducer } from "modules/settings";

export default combineReducers ({
    auth: AuthReducer,
    application: ApplicationReducer,
    profile: ProfileReducer,
    dashboard: DashboardReducer,
    bounty: BountySpwReducer,
    transactions: TransactionReducer,
    buyOffer: BuyOfferReducer,
    wallets: WalletReducer,
    networks: NetWorkReducer,
    settings: SettingReducer,
});