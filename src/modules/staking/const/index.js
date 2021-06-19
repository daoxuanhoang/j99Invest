// import { JSB } from "commons/constants";
import { USJ, JSF } from "modules/profile/redux/reducers";

export const FILTER_HISTORY_DEFAULT = [
  { value: "ALL", label: "All" },
  { value: "DEPOSIT", label: "Deposit" },
  { value: "WITHDRAW", label: "Withdraw" },
  { value: "TRANSFER", label: "Transfer" },
  { value: "SWAP", label: "Swap" },
  // { value: "INVESTMENT", label: "Investments" },
  // { value: "COMMISSION_STAKE", label: "Commission Stake" },
  // { value: "COMMISSION_RESTAKE", label: "Commission Restake" },
  { value: "BUY", label: "Buy" },
  { value: "RETURN", label: "Return" },
];
// const GLOBAL_BONUS = { value: "JSB_GLOBAL_BONUS", label: "Global bonus" };
const REVENUE = { value: "REVENUE", label: "Turn-over" };
const STOCK_BONUS = { value: "STOCK", label: "Stock bonus" };
const SWAP = { value: "SWAP", label: "Swap" };
const EARN = { value: "EARN", label: "Earn" };

export const FILTER_HISTORY_MAPPING = {
  // [JSB]: [GLOBAL_BONUS],
  [USJ]: [REVENUE, SWAP, EARN],
  [JSF]: [STOCK_BONUS],
};
