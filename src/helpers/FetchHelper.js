import { defer, from, of, throwError } from "rxjs";
import { retryWhen, delay, mergeMap } from "rxjs/operators";
import { flow, get, isArray } from "lodash";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import * as moment from "moment-timezone";
import { USER_INFO_KEY, ROUTE } from "../commons/constants/index";
import { sendToTelegram } from "./sendMessageTelegram";

/**
 *  Wrapper for Fetch API (https://developer.mozilla.org/en/docs/Web/API/Fetch_API)
 *  The purpose of this is to enhance `fetch()` but still remain its API,
 *  except the result data are converted into JSON which is inspired by Angular 1's $http service.
 *  Enhanced features:
 *    - Convert response data to json implicitly.
 *    - Provide .addDefaultHeader() to setup default headers.
 *    - Interceptors - do something before or after every request.
 *    - Retry (GET only) on error.
 *    - Some utils method to parse request data.
 *  Future note: Above features can be considerd implemented by service worker
 *  when it is supported by all major browsers.
 *  Usage sample:
 *    const [data, status] = await fetchHelper.fetch('http://my.api.com/do-sth', {
 *      method: 'POST',
 *      body: JSON.stringify({id: 1, name: 'ABC'})
 *    })
 */
const TIME_OUT = 20000;
const API_DIED_MESSAGES = "Api die: URGENT ERROR can not connection or connection timeout";
const FETCH_PROMISE_ERROR = "Fetch Promise was canceled by interceptor after responded";
const FETCH_CANCEL_REQUREST = "Fetch Promise was canceled by interceptor before requested";
const ERROR_TITLE = "Error";

class FetchHelper {
  // CONFIGURATION
  static RETRY = true;
  static MAX_RETRY = 3;
  static RETRY_DELAY = 500;
  static CONFIG_NOTIFY_SUCCESS = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
  };
  static CONFIG_NOTIFY_ERROR = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
  };
  // END OF CONFIGURATION

  FORM_URL_ENCODED = "application/x-www-form-urlencoded";

  constructor() {
    this.defaultInit = {
      // credentials: "include"
    };
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
    this.beforeRequestInterceptors = [];
    this.afterResponseInterceptors = [];
  }

  addDefaultHeader = (key, value) => {
    this.defaultHeaders[key] = value;
  };

  removeDefaultHeader = (key) => {
    delete this.defaultHeaders[key];
  };
  /**
   *  To define something to do before every fetch request.
   *  Params:
   *      TBD
   *  Result:
   *      Returns a function to remove added interceptor.
   */
  addBeforeRequestInterceptor = (interceptor) => {
    this.beforeRequestInterceptors.push(interceptor);
    return () => {
      const index = this.beforeRequestInterceptors.indexOf(interceptor);
      this.beforeRequestInterceptors.splice(index, 1);
    };
  };
  /**
   *  To define something to do after every fetch response.
   *  If one of interceptors returns false, the process will be stop immediately.
   *  Params:
   *      interceptor: function ({response, jsonData, init})
   *  Result:
   *      Returns a function to remove added interceptor.
   */
  addAfterResponseInterceptor = (interceptor) => {
    this.afterResponseInterceptors.push(interceptor);
    return () => {
      const index = this.afterResponseInterceptors.indexOf(interceptor);
      this.afterResponseInterceptors.splice(index, 1);
    };
  };
  jsonToForm(json = {}) {
    return Object.keys(json)
      .map((key) => {
        return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
      })
      .join("&");
  }
  /**
   * Convert object to query string (without '?' in the beginning)
   * @param {*} json
   */
  jsonToQueryString(json = {}) {
    return Object.keys(json)
      .map((key) => {
        const value = json[key];
        if (value && value.constructor === Array) {
          return value.map((valueItem) => `${key}=${encodeURIComponent(valueItem)}`).join("&");
        } else if (value && typeof value === "object") {
          return `${key}=${encodeURIComponent(JSON.stringify(value))}`;
        } else if (value || value === 0) {
          return `${key}=${encodeURIComponent(value)}`;
        } else {
          return "";
        }
      })
      .filter(Boolean)
      .join("&");
  }

  fetch = async (input, init = {}, opts = { isToastSuccess: true, isToastFailed: true }) => {
    let initWithDefaultHeaders = {
      ...this.defaultInit,
      ...init,
      headers: mergeWithDefaultHeaders(
        {
          ...init.headers,
          Authorization: Cookies.get("token"),
          tz: moment.tz.guess(),
        },
        this.defaultHeaders
      ),
    };
    const { isToastSuccess, isToastFailed } = opts;
    const requestPayload = JSON.stringify(initWithDefaultHeaders);
    const urlApi = ` URL:${input}`;
    //run interceptors before each request
    let beforeRequestInterceptorsResult = applyBeforeRequestInterceptors(this.beforeRequestInterceptors, initWithDefaultHeaders);
    const timer = setTimeout(() => {
      sendToTelegram(`${API_DIED_MESSAGES}; ${urlApi}; ${requestPayload}}`);
      // throw new Error(API_DIED_MESSAGES);
      clearTimeout(timer);
    }, TIME_OUT);

    if (beforeRequestInterceptorsResult === false) {
      sendToTelegram(`${FETCH_CANCEL_REQUREST}; ${urlApi}; ${requestPayload}`);
      // throw new Error(FETCH_CANCEL_REQUREST);
      clearTimeout(timer);
    }
    let response;
    // run fetch() to request api...
    try {
      //...create difference kind of fetches to handle errors
      const customFetch = flow([this._fetchWith5XXRetry])(fetch);

      response = await customFetch(input, initWithDefaultHeaders);
    } catch (e) {
      console.warn("[FetchHelper]", e);
      applyAfterResponseInterceptors({
        response: e,
        interceptors: this.afterResponseInterceptors,
        initWithDefaultHeaders,
      });

      return [e, -1];
    }

    //handle response
    const responseStatus = response.status;
    let jsonData = null;
    try {
      jsonData = await response.json();
      if (get(jsonData, "status_code") === 401) {
        Cookies.remove("token");
        localStorage.removeItem(USER_INFO_KEY);
        window.location.href = window.location.origin + ROUTE.LOGIN;
      }
      if (get(init, "method") && get(init, "method").toLowerCase() !== "get") {
        const message = get(jsonData, "message");
        let messageParse = "";

        if (isArray(message)) {
          messageParse = get(message, "[0].message");
        } else {
          messageParse = message;
        }
        if (get(jsonData, "status_code") === 200) {
          if (isToastSuccess) {
            toast.info(messageParse || "Success", this.CONFIG_NOTIFY_SUCCESS);
          }
        } else {
          sendToTelegram(`${ERROR_TITLE}: ${urlApi}; Request payload:${requestPayload}; Response:${JSON.stringify(jsonData)}`);
          if (isToastFailed) {
            toast.error(messageParse || "Error!", this.CONFIG_NOTIFY_ERROR);
          }
        }
      }

      // run interceptors after each requests
      let afterResponseInterceptorsResult = applyAfterResponseInterceptors({
        response,
        interceptors: this.afterResponseInterceptors,
        jsonData,
        initWithDefaultHeaders,
      });
      if (afterResponseInterceptorsResult === false) {
        sendToTelegram(`${ERROR_TITLE}: ${FETCH_PROMISE_ERROR}; ${urlApi}; Request payload: ${requestPayload}`);
        throw new Error(FETCH_PROMISE_ERROR);
      }

      clearTimeout(timer);
      return [jsonData, responseStatus];
    } catch (e) {
      if (!jsonData) {
        let afterResponseInterceptorsResult = applyAfterResponseInterceptors({
          response,
          interceptors: this.afterResponseInterceptors,
          jsonData,
          initWithDefaultHeaders,
        });
        if (afterResponseInterceptorsResult === false) {
          sendToTelegram(`${ERROR_TITLE}: ${FETCH_PROMISE_ERROR}; ${urlApi}; Request payload: ${requestPayload}`);
          throw new Error(FETCH_PROMISE_ERROR);
        }
      }
      if (!(responseStatus + "").startsWith("2"))
        console.warn(`Can not parse json from response of API "${input}" with code ${responseStatus}.`, e);
      return [response, responseStatus];
    }
  };
  uploadFile = (url, opts = {}, onProgress) => {
    return new Promise((res, rej) => {
      var xhr = new XMLHttpRequest();
      xhr.open(opts.method || "post", url);
      const headers = opts.headers || { Authorization: Cookies.get("token") };
      for (var k in headers) xhr.setRequestHeader(k, headers[k]);
      xhr.onload = (e) => {
        try {
          const json = JSON.parse(e.target.responseText);
          res([json, xhr.status]);
        } catch (err) {
          res([e.target.responseText, xhr.status]);
        }
      };
      xhr.onerror = rej;
      xhr.withCredentials = true;
      if (xhr.upload && onProgress) xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
      xhr.send(opts.body);
    });
  };
  getHeader = () => {
    return this.defaultHeaders;
  };
  _fetchWith5XXRetry = (previousFetch) => (input, init = {}) => {
    if (FetchHelper.RETRY && (!init.method || init.method.toUpperCase() === "GET")) {
      let count = 0;

      return defer(() =>
        from(
          previousFetch(input, init).then((response) => {
            if ((response.status + "").startsWith("5")) throw response;
            return response;
          })
        )
      )
        .pipe(
          retryWhen((errors) => {
            return errors.pipe(
              mergeMap((error) => {
                if (++count >= FetchHelper.MAX_RETRY) {
                  return throwError(error);
                }
                return of(error).pipe(delay(FetchHelper.RETRY_DELAY));
              })
            );
          })
        )

        .toPromise()
        .then(
          (response) => response,
          (response) => {
            if (response.status === 500) return response;
            throw response;
          }
        );
    } else {
      return previousFetch(input, init);
    }
  };
}

export function mergeWithDefaultHeaders(headers = {}, defaultHeaders) {
  var headerObj = {};
  if (headers instanceof Headers) {
    headers.forEach(([key, value]) => {
      headerObj[key] = value;
    });
  } else {
    headerObj = headers;
  }

  return Object.assign({}, defaultHeaders, headerObj);
}

export function applyBeforeRequestInterceptors(interceptors, initWithDefaultHeaders) {
  interceptors.forEach((interceptor) => {
    try {
      const interceptorResult = interceptor(initWithDefaultHeaders);
      if (interceptorResult === false) {
        sendToTelegram(`Interceptor ${interceptor} has cancel signal. This makes the request stop immediately`);
        console.error(new Error(`Interceptor ${interceptor} has cancel signal. This makes the request stop immediately`));
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  });
}

export function applyAfterResponseInterceptors({ response, interceptors, jsonData, initWithDefaultHeaders }) {
  interceptors.forEach((interceptor) => {
    try {
      const interceptorResult = interceptor({
        response,
        jsonData,
        init: initWithDefaultHeaders,
      });
      if (interceptorResult === false) {
        sendToTelegram(`Interceptor ${interceptor} has cancel signal. This makes the request stop immediately.`);
        console.error(new Error(`Interceptor ${interceptor} has cancel signal. This makes the request stop immediately.`));
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  });
}

const fetchHelper = new FetchHelper();

export default fetchHelper;
