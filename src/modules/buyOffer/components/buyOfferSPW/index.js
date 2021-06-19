import React, { useState, useEffect } from "react";
import { Card, Button, Select, Input, Form, Typography } from "antd";
import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import ModalConfirmTransaction from "commons/components/ModalConfirmTransaction/index";
import BuyOfferModal from "../buyOfferModal/buyOfferModal";
import { get } from "lodash";
import FirebaseService from "services/firebase";
import { NODE_TRANDING_PRICE } from "configs/const";
import { setTradingPrice } from "modules/wallets/redux/actions";
import { roundNumber } from "helpers/CommonHelper";

const Option = { Select };
const NODE_CHILD = {
  USJ: NODE_TRANDING_PRICE,
};

const Index = ({ title, percent, walletListFilter, productList, options }) => {
  const dispatch = useDispatch();
  const [showModalBuyOffer, setShowModalBuyOffer] = useState(false);
  const [amountToBuy, setAmountToBuy] = useState({
    product_id: null,
  });
  const [tradingPrice, setTradingPrice] = useState(1);
  useEffect(() => {
    if (productList) {
      setAmountToBuy({ product_id: productList.id });
    }
  }, [productList]);
  const [form] = Form.useForm();
  const handelModalBuyOffer = () => {
    setShowModalBuyOffer(!showModalBuyOffer);
  };
  const onFinish = (values) => {
    form.validateFields().then(() => {
      setAmountToBuy((prev) => ({
        ...prev,
        ...values,
      }));
      handelModalBuyOffer();
    });
  };
  const onChange = (e) => {
    const value = e.target.value * tradingPrice;
    form.setFieldsValue({
      amounttopay: roundNumber(value || 0)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
    });
  };
  useEffect(() => {
    FirebaseService.getTradingPriceHeader("list_price_header")
      .once("value")
      .then((snapshot) => {
        var price = snapshot.val();
        price.map((val) => {
          if (val.currency === "SPW") {
            setTradingPrice(val.price);
          } else {
            return;
          }
        });
      });
  }, []);

  return (
    <>
      {walletListFilter && (
        <Card title={title} className="card-buy-offer">
          <Form className="buy-offer-form" form={form} onFinish={onFinish}>
            <Form.Item
              name="label"
              initialValue={get(walletListFilter, "[0].label", null)}
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="buyoffer.select.wallet" />,
                },
              ]}
            >
              <Select className="buy-offer-select" defaultValue={get(walletListFilter, "[0].label", null)}>
                <Option value={get(walletListFilter, "[0].label", null)}>{get(walletListFilter, "[0].label", null)}</Option>
              </Select>
            </Form.Item>
            <label className="input-filed-label">
              <span>
                <FormattedMessage id="buyoffer.label.amount.1" />
              </span>
              <span>
                {" "}
                <FormattedMessage id="auth.signin.modal.required.mark" />
              </span>
            </label>
            <Form.Item
              name="amount"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="buyoffer.empty.message.amounttobuy" />,
                },
              ]}
            >
              <Input className="input-filed" type="number" defaultValue="0" onChange={onChange} />
            </Form.Item>
            <label className="input-filed-label">
              <span>
                <FormattedMessage id="buyoffer.label.amount.2" />
              </span>
              <span>
                {" "}
                <FormattedMessage id="auth.signin.modal.required.mark" />
              </span>
            </label>
            <Form.Item name="amounttopay" style={{ marginBottom: "0px" }}>
              <Input className="input-filed" type="number" defaultValue="0" readOnly />
            </Form.Item>
            <div className="amount-label" style={{ float: "right" }}>
              <label className="input-filed-label">
                <span>
                  {roundNumber(`${get(walletListFilter, "[0].amount", null)}` || 0)
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
                  <FormattedMessage id="buyoffer.label.available" />
                </span>
              </label>
            </div>
            <label className="input-filed-label">
              <span>
                <FormattedMessage id="buyoffer.label.bonus.1" />
              </span>
            </label>
            <Form.Item name="percent" initialValue={percent}>
              <Input className="input-filed" type="text" value={percent} readOnly />
            </Form.Item>
            <Form.Item className="buy-action">
              <Button htmlType="submit" type="default" className="primary-button">
                <FormattedMessage id="Submit" />
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
      <ModalConfirmTransaction
        visible={showModalBuyOffer}
        setVisible={setShowModalBuyOffer}
        title={`Are you sure to ${title}`}
        MyForm={<BuyOfferModal amountToBuy={amountToBuy} handelModalBuyOffer={handelModalBuyOffer}></BuyOfferModal>}
      />
    </>
  );
};
export default Index;
