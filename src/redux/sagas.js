import { all } from "@redux-saga/core/effects";
import { DashboardSaga } from "../modules/dashboard"; 
import { BountySpwSaga } from "../modules/bountySPW";
import { NetwordSaga } from "../modules/networks";
import { AuthSaga } from "../modules/auth";
import { ProfileSaga } from "../modules/profile";
import { TransactionSaga } from "../modules/transactions";
import { BuyOfferSaga } from "modules/BuyOffer";

export default function* rootSaga() {
 yield all([
     AuthSaga(),
     DashboardSaga(),
     BountySpwSaga(),
     NetwordSaga(),
     ProfileSaga(),
     TransactionSaga(),
     BuyOfferSaga(),
 ]);
}