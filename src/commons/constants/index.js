export const ROOT_API_URL = process.env.REACT_APP_API;
export const CUSTOMER_LINK_INVITE_SPONSOR = process.env.CUSTOMER_LINK_INVITE_SPONSOR || "/verify-sponsor";
export const S3_IMAGE_ROOT = process.env.S3_IMAGE_ROOT || "https://s3.ap-southeast-1.amazonaws.com/jsbnetwork";
export const TOKEN = "token";
export const TRONSCAN_TRANSACTION = "https://tronscan.org/#/transaction";

export const ROUTE_REPORT = "/report";
export const ROUTE = {
  DASHBOARD: "/",
  MY_BALANCE: "/my-balance",

  BOUNTY_SPW: "/bounty-spw",
  BOUNTY_SPW_INVITE: "/invite",
  BOUNTY_SPW_BLOG: "/blog",
  BOUNTY_SPW_WEBINAR: "/webinar",
  BOUNTY_SPW_VIDEO_REVIEW: "/video-review",
  BOUNTY_SPW_CONFERENCE: "/conference",

  STAKING: "/staking",
  BUY_OFFER: "/buy-offer",

  NETWORKS: "/networks",
  NETWORKS_GENERAL: "/general",
  NETWORKS_REFERALS: "/referals",
  NETWORKS_BINARY: "/binary",
  NETWORKS_BINARY_PV: "/binary-pv",
  NETWORKS_REVENUE: "/revenue",
  NETWORKS_BIN_REFERALS: "/bin-referals",

  SETTING: "/setting",
  SETTING_KYC: "/kyc",
  SETTING_SECURITY: "/security",
  SETTING_PERSONAL: "/personal",
  SETTING_AUTHE: "/authentication",
  SETTING_TWOFACTOR: "/two-factor",

  VERIFY_TRANSACTION: "/verify-transaction",

  PUBLIC: "/public",
  LOGIN: "/login",
  SIGNUP: "/signup",
  ACTIVE: "/active",
  FORGOT_PASSWORD: "/forgot",
  CHANGE_EMAIL: "/change-email",
  RESET_PASSWORD: "/reset-password",

  NOT_FOUND: "*",
};

export const USER_INFO_KEY = "userInfo";
export const USDTTRON = "USDTTRON";
export const USDTJSB = "USJ";
export const JSB = "JSB";
export const VND = "VND";

export const SWAP_OPTIONS = [
  {
    value: USDTTRON,
    label: "TRON USDT",
  },
  {
    value: USDTJSB,
    label: "USJ",
  },
];
export const TRON = "TRON";
export const MODAL_TYPES = {
  commission: "COMMISSION",
  details: "DETAILS",
  deposit: "DEPOSIT",
  swap: "SWAP",
  withdraw: "WITHDRAW",
  transfer: "TRANSFER",
  send: "SEND",
  getMore: "GET_MORE",
  stake: "STAKE",
  reStake: "RE_STAKE",
  success: "SUCCESS",
};

export const MIN_STAKE_OF_REF = 100;

export const WALLET_TYPES = {
  jsbGlobal: "JSB",
};
export const DEFAULT_SELECT_WALLET = WALLET_TYPES.jsbGlobal;

export const PRODUCTION = "production";
export const EXPIRED_TIME_DEPOSIT = "October 19, 2020 21:00:00";
export const EXPIRED_TIME_BUY_NOW = "October 20, 2020 22:00:00";
export const EXPIRED_TIME_SIGN_IN = "October 19, 2020 21:00:00";

export const TO_LEFT = "left";
export const TO_RIGHT = "right";

export const CURRENCY = "USDTJSB";
export const MINIMUM_STAKE = 10;
export const OPTION_COMMISSIONS_TYPES = {
  stake: "STAKE",
  earn: "EARN",
  reStake: "RESTAKE",
};

export const INVEST_HISTORY_CURRENCY_PARAMS = "USJ";
export const INVEST_HISTORY_TYPE_PARAMS = "REVENUE";
export const UPGRADE = "upgrade";

export const TRANSACTION = "TRANSACTION";
export const LOGIN = "LOGIN";
export const EMAIL = "EMAIL";
export const REGISTER = "REGISTER";
export const CHANGE_STATUS = "CHANGE_STATUS";
export const CACHING_DATA = {};

export const DEFAULt_LIST_PARAM = {
  pageSize: 100,
  pageIndex: 1,
};
