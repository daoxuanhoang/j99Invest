import firebase from "firebase/app";
import "firebase/database";
import { CONFIG_FIREBASE } from "./const";

let config = { ...CONFIG_FIREBASE };

firebase.initializeApp(config);

export default firebase.database();
