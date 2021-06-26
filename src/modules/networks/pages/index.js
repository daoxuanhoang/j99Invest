import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import { ROUTE } from "commons/constants";
import { injectIntl } from "react-intl";
import { Col, Row } from "antd";

import "./styles.scss";
import Referal from "./referals";

const NetWorkPage = () => {
  const { path } = useRouteMatch();

  return (
    <section className="networks-page">
      <div className="networks-body">
        <Row className="networks-content" gutter={0}>
          <Col xl={24} lg={24} md={24} xs={24} sm={24}>
            <Switch>
              {/* <Route exact path={`${path}${ROUTE.NETWORKS_GENERAL}`}>
                <General />
              </Route> */}
              <Route exact path={`${path}${ROUTE.NETWORKS_REFERALS}`}>
                <Referal/>
              </Route>
            </Switch>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default injectIntl(NetWorkPage);
