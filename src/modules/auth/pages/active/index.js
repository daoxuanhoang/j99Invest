import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as qs from "query-string";
import { isEmpty } from "lodash";

import { ROUTE } from "commons/constants";
import * as actions from "modules/auth/redux/actions";

const ActivePage = ({ history, location }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const queryParams = qs.parse(location.search);
    if (isEmpty(queryParams) || !queryParams.token) {
      history.push(ROUTE.LOGIN);
      return;
    }
    dispatch(
      actions.postActiveAccount({ token: queryParams.token }, (resultString) => {
        if (resultString === "success") {
          history.push(ROUTE.HOME);
        } else if (resultString === "failed") {
          history.push(ROUTE.LOGIN);
        }
      })
    );
  }, [dispatch, history, location.search]);
  return <div></div>;
};

export default ActivePage;
