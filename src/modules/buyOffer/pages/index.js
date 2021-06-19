import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { FormattedMessage } from "react-intl";
import BuyOfferSPW from "../components/buyOfferSPW/index";
import BuyOfferSYFI from "../components/buyOfferSYFI/index";
import "./styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { getProductList } from "../redux/actions";
import { setTradingPrice } from "modules/wallets/redux/actions";

const Index = () => {
  const dispatch = useDispatch();
  const { walletListFilter } = useSelector((state) => state.profile.profileData);
  const { productList } = useSelector((state) => state.buyOffer);
  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);
  return (
    <div className="buy-offer-containers">
      <Row className="buy-offer-box" justify={"center"}>
        <Col className="box-buy-spw" xs={24} sm={24} md={24} lg={12}>
          <BuyOfferSPW title="BUY SPW" percent={5} walletListFilter={walletListFilter} productList={productList[0]} />
        </Col>
        <Col className="box-buy-syfi" xs={24} sm={24} md={24} lg={12}>
          <BuyOfferSYFI title="BUY SYFI" percent={20} walletListFilter={walletListFilter} productList={productList[1]} />
        </Col>
      </Row>
    </div>
  );
};

export default Index;
