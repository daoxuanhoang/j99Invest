import { all } from "@redux-saga/core/effects";
import  authSaga  from "../modules/auth/redux/sagas";  
import { DashboardSaga } from "../modules/dashboard"; 
import { BountySpwSaga } from "../modules/bountySPW";
import { NetwordSaga } from "../modules/networks";

export default function* rootSaga() {
 yield all([
     authSaga(),
     DashboardSaga(),
     BountySpwSaga(),
     NetwordSaga(),
 ]);
}