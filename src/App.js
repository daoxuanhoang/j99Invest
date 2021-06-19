import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { ToastContainer } from "react-toastify";
import { Spin } from "antd";
import Cookies from "js-cookie";

import { messagesListLanguage } from "./language/config";
import fetchHelper from "./helpers/FetchHelper";
import { getProfile } from "./modules/profile/redux/actions";
import { PrivateLayout, PublicLayout } from "./commons/layouts/index";
import { ROUTE, TOKEN } from "./commons/constants/index";
import { SignInPage, SignUpPage } from "./modules/auth/index";
import DashboadPage from "./modules/dashboard/index";
import { getRate } from "./modules/dashboard/redux/actions";
import { WalletPage } from "modules/wallets";
import { BuyOfferPage } from "modules/BuyOffer";

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
      <IntlProvider 
      locale={activeLanguage} messages={messagesListLanguage[activeLanguage]}
      >
        <Router>
          {/* Exact */}
          <PrivateRoute exact path={ROUTE.DASHBOARD} component={DashboadPage} />
          <PrivateRoute exact path={ROUTE.MY_BALANCE} component={WalletPage} />
          <PrivateRoute exact path={ROUTE.BUY_OFFER} component={BuyOfferPage} />

          {/* No Exact */}

          {/* Public */}
          <PublicRoute  path={ROUTE.LOGIN} component={SignInPage} />
          <PublicRoute  path={ROUTE.SIGNUP} component={SignUpPage} />
        </Router>
      </IntlProvider>
    </div>
  );
};

export default App;
