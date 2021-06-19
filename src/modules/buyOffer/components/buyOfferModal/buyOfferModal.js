import React, { useEffect, useState } from "react";
import { Button, Form, InputNumber, Select, Input, Row, Col } from "antd";
import { useDispatch } from "react-redux";
import "./styles.scss";
import { get } from "lodash";
import { FormattedMessage } from "react-intl";
import { postProductList } from "../../redux/actions";

const BuyOfferModal = ({ amountToBuy, handelModalBuyOffer }) => {
  const dispatch = useDispatch();
  const onFinish = () => {
    handelModalBuyOffer();
    const obj = {};
    obj.amount = parseInt(amountToBuy.amount);
    obj.product_id = amountToBuy.product_id;
    dispatch(postProductList(obj));
  };
  return (
    <Form className="form-buy-offer" layout="vertical">
      <div className="buy-offer-content" style={{ paddingBottom: "20px", color: "white", fontSize: "20px", textAlign: "left" }}>
        <Row>
          <Col flex={4}>
            <FormattedMessage id="buyoffer.modal.label.spw.volume" />
          </Col>
          <Col>{amountToBuy.amount}</Col>
        </Row>
        <Row>
          <Col flex={4}>
            <FormattedMessage id="buyoffer.modal.label.usdt.topay" />
          </Col>
          <Col>{parseFloat(amountToBuy.amounttopay).toFixed(2)}</Col>
        </Row>
        <Row>
          <Col flex={4}>
            <FormattedMessage id="buyoffer.modal.label.bonus" />
          </Col>
          <Col>{amountToBuy.percent}%</Col>
        </Row>
      </div>
      <div className="t-center form-submit">
        <Button className="btn-confirm-tran" onClick={() => onFinish()}>
          <FormattedMessage id="buyoffer.button.comfirm" />
        </Button>
      </div>
    </Form>
  );
};

export default BuyOfferModal;
