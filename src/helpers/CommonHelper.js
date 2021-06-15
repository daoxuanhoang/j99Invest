import moment from "moment";
import countryTimezone from "country-timezone";
import { sum } from "lodash";

let timer;
const DEFAULT_TIMEOUT = 500;
const MAX_NUMBER_VALUE = 1000000;
const MAX_STRING_NUMBER = 3;

export function debounced(fn) {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    fn();
    timer = null;
  }, DEFAULT_TIMEOUT);
}

export const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const formatDate = (date, format = "DD/MM/YYYY HH:mm") => {
  const country = JSON.parse(localStorage.getItem("userInfo"));
  let tz = countryTimezone.getTimezones(country.country);
  if (tz.length === 0) {
    tz = "Asia/Ho_Chi_Minh";
    const newDate = moment(date).tz(tz).format(format);
    return newDate;
  } else {
    const newDate = moment(date).tz(tz[0]).format(format);
    return newDate;
  }

  // const tz = new Date().getTimezoneOffset();
  // const newDate = moment(date).zone(tz).format(format);
  // const tz = "+7";
  // const newDate = moment(date).utc(tz).format(format);
  // const tz = "Asia/Ho_Chi_Minh";
  // const newDate = moment(date).tz(tz).format(format);
  // const mnths = {
  //   Jan: '01',
  //   Feb: '02',
  //   Mar: '03',
  //   Apr: '04',
  //   May: '05',
  //   Jun: '06',
  //   Jul: '07',
  //   Aug: '08',
  //   Sep: '09',
  //   Oct: '10',
  //   Nov: '11',
  //   Dec: '12',
  // };
  // const res = timeZone.split(' ');
  // return `${[res[3], mnths[res[1]], res[2]].join('-')} ${res[4]}`;
};

export const getBase64 = async (img) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.readAsDataURL(img);
  });
};

export const getParamFromURL = (value = "") => {
  return new URL(window.location.href).searchParams.get(value);
};

export const removeEmpty = (obj) =>
  Object.entries(obj)
    .map(([k, v]) => [k, v && typeof v === "object" ? removeEmpty(v) : v])
    .reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {});

export const listToTree = (list = []) => {
  var map = {},
    node,
    roots = [],
    i;

  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i; // initialize the map
    list[i].children = []; // initialize the children
  }
  for (i = 0; i < list.length; i += 1) {
    node = list[i];

    if (node.parent !== 0 && map[node.parent] !== undefined) {
      // if you have dangling branches check that map[node.parentId] exists

      list[map[node.parent]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
};

export const formatCode = (text, start, end, concat) => {
  const total = sum([start, end]);
  const length = text.length;
  if (total >= length) {
    return text;
  }
  return [text.slice(0, start), text.slice(length - end)].join(concat);
};

export function roundNumber(num = 0, scale = 3, isCheckMilion = true) {
  if (isCheckMilion && num >= MAX_NUMBER_VALUE) {
    return abbreviateNumber(num, 2);
  }
  if (!("" + num).includes("e")) {
    return +(Math.round(num + "e+" + scale) + "e-" + scale);
  } else {
    var arr = ("" + num).split("e");
    var sig = "";
    if (+arr[1] + scale > 0) {
      sig = "+";
    }
    return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
  }
}

const generateMoreTime = (data) => {
  return data > 1 ? "s" : "";
};

export const updateTimer = (time) => {
  let future = Date.parse(time);
  let now = new Date();
  let diff = future - now;

  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hours = Math.floor(diff / (1000 * 60 * 60));
  let mins = Math.floor(diff / (1000 * 60));
  let secs = Math.floor(diff / 1000);

  let d = days;
  let h = hours - days * 24;
  let m = mins - hours * 60;
  let s = secs - mins * 60;

  return {
    label: `${d} day${generateMoreTime(d)} ${h} hour${generateMoreTime(h)} ${m} minute${generateMoreTime(
      m
    )} ${s} second${generateMoreTime(s)}`,
    expiredTime: future,
  };
};

export var isMobileCaching = null;
export const isMobile = () => {
  if (isMobileCaching === null) {
    isMobileCaching = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
  }
  return isMobileCaching;
};

export const dataURLtoFile = (dataurl, filename = "Unknown") => {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

export const iOSDevice = () => {
  return (
    ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
};

export const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const generateArrayMap = (length) => {
  return Array.from(Array(length), (_, i) => i + 1);
};

const abbreviateNumber = (num) => {
  let data = parseFloat(num / MAX_NUMBER_VALUE).toString();
  const position = data.indexOf(".");
  if (position === -1) {
    return data.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  data = data.substring(0, position + MAX_STRING_NUMBER).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  return data + " mi";
};

export const fixedNumber = (number = 0, fixed = 2) => {
  if (number >= MAX_NUMBER_VALUE) {
    return abbreviateNumber(number, fixed);
  }

  return roundNumber(number)
    .toFixed(fixed)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
