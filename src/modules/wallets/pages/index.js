import React, { useState } from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import { Row, Col } from "antd";
import  WalletList  from "../components/WalletList/index";
import  TransactionList  from "modules/transactions/components/TransactionList/index";
import "./styles.scss";
import { CACHING_DATA, USDTTRON } from "commons/constants";

export const TOOGLE_CALLBACK_GET_LIST = "TOOGLE_CALLBACK_GET_LIST";

CACHING_DATA[TOOGLE_CALLBACK_GET_LIST] = false;

export const setToogleCallBack = () => {
  return (CACHING_DATA[TOOGLE_CALLBACK_GET_LIST] = !CACHING_DATA[TOOGLE_CALLBACK_GET_LIST]);
};

const WalletPage = () => {
  let toggleCallBackGetList = CACHING_DATA[TOOGLE_CALLBACK_GET_LIST];
  const [currencyData, setCurrencyData] = useState(USDTTRON);

  const handleCallApi = (value) => {
    setToogleCallBack();
    setCurrencyData(value);
  };

  return (
    <Row gutter={[40, 40]} className="wallet-container">
      {/* <Col xl={24} lg={24} xs={24} sm={24}>
        <h2 className="pega-content-title">
          <FormattedMessage id="menu.myBalance" />
        </h2>
      </Col> */}
      <Col span={24}>
        <WalletList
          isCall={toggleCallBackGetList}
          callBackGetListetListTransaction={(value) => {
            handleCallApi(value);
          }}
        />
      </Col>
      <Col xs={24}>
        <div className="wallet-transaction">
          <TransactionList currency={currencyData} isCall={toggleCallBackGetList} />
        </div>
      </Col>
    </Row>
  );
};

export default injectIntl(WalletPage);
