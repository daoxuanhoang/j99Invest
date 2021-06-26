import { all } from "@redux-saga/core/effects";
import { DashboardSaga } from "../modules/dashboard"; 
import { BountySpwSaga } from "../modules/bountySPW";
import { AuthSaga } from "../modules/auth";
import { ProfileSaga } from "../modules/profile";
import { TransactionSaga } from "../modules/transactions";
import { BuyOfferSaga } from "modules/BuyOffer";
import { WalletSaga } from "modules/wallets";
import { NetworkSaga } from "modules/networks";
import { SettingSaga } from "modules/settings";

export default function* rootSaga() {
 yield all([
     AuthSaga(),
     DashboardSaga(),
     BountySpwSaga(),
     ProfileSaga(),
     TransactionSaga(),
     BuyOfferSaga(),
     WalletSaga(),
     NetworkSaga(),
     SettingSaga(),
 ]);
}