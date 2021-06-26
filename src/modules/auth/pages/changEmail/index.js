import React, { useEffect } from "react";
import { ROUTE } from "commons/constants";
import { FormattedMessage } from "react-intl";
import { verifyEmail } from "modules/profile/redux/actions";
import { useDispatch } from "react-redux";
import { getParamFromURL } from "helpers/CommonHelper";

const CACHE_TOKEN = "token";

const ChangeEmailPage = ({ history }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = getParamFromURL(CACHE_TOKEN);
    dispatch(
      verifyEmail(
        {
          token,
        },
        () => {}
      )
    );
    history.push(ROUTE.HOME);
  }, [history, dispatch]);
  return (
    <>
      <FormattedMessage id="auth.changeEmail.redirectMessage" />
    </>
  );
};

export default ChangeEmailPage;
