import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { ToastContainer } from "react-toastify";
import { Spin } from "antd";
import Cookies from "js-cookie";

import { messagesListLanguage } from "language/config";
import fetchHelper from "helpers/FetchHelper";
import {  } from "modules/dashboard";
import { WalletPage } from "modules/wallets";
import { BuyOfferPage } from "modules/BuyOffer";
import { DashboardPage } from "modules/dashboard";
import { getProfile } from "modules/profile/redux/actions";
import { PrivateLayout, PublicLayout } from "commons/layouts";
import { ROUTE, TOKEN} from "commons/constants";
import { SignInPage, SignUpPage, ForgotPasswordPage, ActivePage, NewPasswordPage, ChangeEmailPage } from "modules/auth";
import { getRate } from "modules/dashboard/redux/actions";
import BountyPage from "modules/bountySPW";
import { NetWorkPage } from "modules/networks";
import { SettingPage } from "modules/settings";

const isLogin = () => {
  const authToken = Cookies.get(TOKEN);
  if (authToken) {
    fetchHelper.addDefaultHeader("Authorization", `Bearer ${authToken}`);
  }
  return Boolean(authToken);
};

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        ) : (
          <PublicLayout {...rest}>
            <Component {...props} />
          </PublicLayout>
        )
      }
    />
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? (
          <PrivateLayout {...rest}>
            <Component {...props} />
          </PrivateLayout>
        ) : (
          <Redirect
            to={{
              pathname: `${ROUTE.LOGIN}`,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const isToken = () => {
  const authToken = Cookies.get(TOKEN);
  return authToken;
};

const App = () => {
  const dispatch = useDispatch();
  const { activeLanguage } = useSelector((state) => state.application);
  const [showLoading, setShowLoading] = useState(false);

  const hadToken = isToken();

  fetchHelper.addBeforeRequestInterceptor(() => setShowLoading(true));
  fetchHelper.addAfterResponseInterceptor(() => setTimeout(() => setShowLoading(false), 500));

  useEffect(() => {
    if (hadToken) {
      dispatch(getProfile());
      dispatch(getRate());
    }
  }, [dispatch, hadToken]);

  return (
    <div className="App">
      <ToastContainer />

      {showLoading && (
        <div className="loader loading">
          <Spin size="large" />
        </div>
      )}
      <IntlProvider locale={activeLanguage} messages={messagesListLanguage[activeLanguage]}>
        <Router>
          {/* Exact */}
          <PrivateRoute exact path={ROUTE.DASHBOARD} component={DashboardPage} />
          <PrivateRoute exact path={ROUTE.MY_BALANCE} component={WalletPage} />
          <PrivateRoute exact path={ROUTE.BUY_OFFER} component={BuyOfferPage} />
          

          {/* No Exact */}  
          <PrivateRoute path={ROUTE.BOUNTY_SPW} component={BountyPage} />
          <PrivateRoute path={ROUTE.NETWORKS} component={NetWorkPage} />
          <PrivateRoute path={ROUTE.SETTING} component={SettingPage} />
          {/* Public */}
          <PublicRoute exact path={ROUTE.LOGIN} component={SignInPage} />
          <PublicRoute exact path={ROUTE.SIGNUP} component={SignUpPage} />
          <PublicRoute exact path={ROUTE.ACTIVE} component={ActivePage} />
          <PublicRoute exact path={ROUTE.RESET_PASSWORD} component={NewPasswordPage} />
          <PublicRoute exact path={ROUTE.FORGOT_PASSWORD} component={ForgotPasswordPage} />
          {!isLogin() && <PublicRoute exact restricted={false} path={ROUTE.CHANGE_EMAIL} component={ChangeEmailPage} />}
        </Router>
      </IntlProvider>
    </div>
  );
};

export default App;
