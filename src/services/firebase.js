import firebase from "../configs/firebase";
import {
  NODE_HISTORIRES_INVEST,
  NODE_TRANDING_PRICE_HEADER,
  // NODE_TRANDING_PRICE,
  // NODE_TRANDING_PRICE_USJ,
} from "configs/const";

const db = firebase.ref();

const getAllHistoryInvest = () => {
  return db.child(NODE_HISTORIRES_INVEST);
};

const editDataHistory = () => {
  return db.child(NODE_HISTORIRES_INVEST).set({
    created_at: "2020-11-29 17:52:10",
    custome: 47,
    customer: {
      created_at: "2020-10-02 14:52:06",
      email: "linhdev92@*********",
      first_name: "Linh",
      id: 1925,
      last_name: "Nguyen",
      phone_number: "123456",
    },
    id: 47,
    order_code: "USJINVEST00047",
    total_pay: 8000,
  });
};

const listenEvent = (callback = () => {}) => {
  return db.child(NODE_HISTORIRES_INVEST).on("value", () => {
    console.log("change data history");
    callback();
  });
};

const getTradingPrice = (field) => {
  const data = field || "trading_price_usj";
  return db.child(data);
};

const listenEventTradingPrice = (field, callback = () => {}) => {
  const data = field || "trading_price_usj";
  return db.child(data).on("value", () => {
    callback();
  });
};

const getTradingPriceHeader = (field) => {
  return db.child(field);
};

export default {
  getAllHistoryInvest,
  editDataHistory,
  listenEvent,
  getTradingPrice,
  listenEventTradingPrice,
  getTradingPriceHeader,
};
