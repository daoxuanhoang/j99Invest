import "./styles.scss";
import React, { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { Row, Col, Form, Input, Select, InputNumber, AutoComplete } from "antd";
import { get, map } from "lodash";
import QRCode from "qrcode.react";
import QrReader from "react-qr-reader";
import InputCopy from "commons/components/FileCopy/InputCopy";
import WalletItem from "../WalletItem";
import WithdrawModal from "../WithdrawModal";
import * as numeral from "numeral";
import { MODAL_TYPES, TRON, PRODUCTION, EXPIRED_TIME_DEPOSIT, TRANSACTION, USDTTRON } from "commons/constants";
import { roundNumber, updateTimer, isMobile } from "helpers/CommonHelper";
import {
  getWallets,
  viewWalletDetail,
  withdrawWallet,
  swapWallet,
  walletTransWithdraw,
  wallerGetByEmailOrAddress,
  getMoreUsjInvest,
  checkIfWalletAddressExist,
} from "modules/wallets/redux/actions";
import { getListBank, getProfile } from "modules/profile/redux/actions";
import { debounced } from "helpers/CommonHelper";
import { updateToggleAuthyModal } from "modules/auth/redux/actions";
import { JSB } from "commons/constants";

import Misc from "helpers/Misc";
// import CountDown from "../CountDown";
import SelectPercentOption from "modules/wallets/components/Commission/selectPercentOption";
import SelectNumberOption from "commons/components/SelectNumberOption";
import ItemWalletLine from "../ItemWalletLine";

const DEPLAY = 100;
const previewStyle = {
  width: 300,
  height: 300,
  position: "fixed",
  zIndex: 10000,
  top: "15%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const previewStyleMobile = {
  width: "100%",
  height: 200,
  position: "fixed",
  zIndex: 10000,
  top: "15%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const LIST_DROPDOW_INPUT = ["SPW"];
const DEFAULT_SELECT_WALLET = JSB;
const EARN = "EARN";
const PERCENT_SWAP = 1;
const MAX_COLLUM = 24;

const { Option } = Select;
let currentLoad = USDTTRON;
const WalletList = (props) => {
  const { intl, callBackGetListetListTransaction = () => {} } = props;
  const [withdrawForm] = Form.useForm();
  const [swapForm] = Form.useForm();
  const [commissionForm] = Form.useForm();
  const [sendForm] = Form.useForm();
  const [getMoreForm] = Form.useForm();
  const [toggleScan, setToggleScan] = useState(false);
  const [addressSelected, setAddressSelected] = useState(null);
  const [walletOptionList, setWalletOptionList] = useState([]);
  const [searchAddress, setSearchAddress] = useState("");
  const wallets = useSelector((state) => state?.profile?.profileData?.walletListFilter) || [];
  const viewItem = useSelector((state) => state?.wallets?.viewItem);
  console.log(viewItem);
  const commissionsEarned = useSelector((state) => state?.profile?.profileData?.commissions_earned);

  const { tradingPrice } = useSelector((state) => state.wallets) || {
    tradingPrice: 1,
  };
  const { rateValue } = useSelector((state) => state.dashboard);
  const [amountSwap, setAmountSwap] = useState(0);

  const { profileData, banks } = useSelector((state) => state.profile) || {
    profileData: {},
  };
  const { is_authy: isAuthy } = profileData || { is_authy: 0 };

  const [labelExpiredTime, setLabelExpiredTime] = useState("");
  const [isDisabledForm, setIsDisabledForm] = useState(process.env.REACT_APP_ENV === PRODUCTION);

  useEffect(() => {
    dispatch(getListBank());
    if (process.env.REACT_APP_ENV === PRODUCTION) {
      const intervalDeposit = setInterval(() => {
        let { label, expiredTime } = updateTimer(EXPIRED_TIME_DEPOSIT);
        let toDay = new Date().getTime();
        let isExpired = expiredTime > toDay ? true : false;
        setIsDisabledForm(isExpired);
        if (!isExpired) return clearInterval(intervalDeposit);
        setLabelExpiredTime(label);
      }, 1000);

      return () => {
        clearInterval(intervalDeposit);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //=> Handle select wallet
  const inputRefSelectWallet = useRef(null);
  const [showSelectWallet, setShowSelectWallet] = useState(false);
  const [waletSelect, setSelectWalet] = useState(() => wallets.filter((ele) => ele?.unit === DEFAULT_SELECT_WALLET)[0]);

  const handleSelectWalletLine = (item) => {
    setSelectWalet(item);
  };
  //<=

  const { md, gutter } = {
    md: 12,
    gutter: 30,
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onloadWallet = (value) => {
    currentLoad = value;
    callBackGetListetListTransaction(value);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWallets());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleCloseWithdraw = useCallback(() => {
    dispatch(viewWalletDetail(null));
    setToggleScan(false);
    setAddressSelected("");
    sendForm.resetFields();
    withdrawForm.resetFields();
    setAddressSelected("");
    setAmountSwap(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, withdrawForm, swapForm, commissionForm]);

  const handleSuccess = useCallback(
    () => {
      onloadWallet(currentLoad);
      dispatch(getProfile());

      dispatch(
        viewWalletDetail({
          type: MODAL_TYPES.success,
          data: {
            // title: intl.formatMessage({ id: "Stake.Now" }),
            // wallet: wallet,
            // currentStake: get(userInfo, "invest_stake", 0),
            // newStakeAmount: 0,
            // infoStake: infoStake,
            // listStake: listStake,
          },
        })
      );
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, handleCloseWithdraw, onloadWallet]
  );

  const handleCloseCommission = useCallback(() => {
    dispatch(viewWalletDetail(null));
    setToggleScan(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, withdrawForm, swapForm, commissionForm]);

  const handleSuccessCommission = useCallback(() => {
    dispatch(getProfile());
    dispatch(getWallets());
    callBackGetListetListTransaction();
    handleCloseCommission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, handleCloseCommission]);

  const handeAuthyWithDraw = (data) => {
    const response = data?.data;
    if (!response) return;

    const { id } = response || {};
    if (!id) return;

    dispatch(
      updateToggleAuthyModal({
        id,
        typeCallApi: TRANSACTION,
      })
    );
  };

  const handleWithdrawConfirm = useCallback(() => {
    const { address, amount } = withdrawForm.getFieldsValue();
    withdrawForm.validateFields();
    const unit = get(viewItem, "data.unit", "");
    dispatch(
      checkIfWalletAddressExist(address, (isExist) => {
        if (isExist || unit === "USJINVEST") {
          dispatch(
            withdrawWallet(
              {
                toAddress: address,
                network: TRON,
                amount: amount,
                currency: unit,
                isViewItem: MODAL_TYPES.transfer,
              },
              (dataSuccess) => {
                handeAuthyWithDraw(dataSuccess);
                handleSuccess(unit);
                withdrawForm.resetFields();
              }
            )
          );
        } else {
          dispatch(
            withdrawWallet(
              {
                toAddress: address,
                network: TRON,
                amount: amount,
                currency: unit,
                isViewItem: MODAL_TYPES.withdraw,
              },
              (dataSuccess) => {
                handeAuthyWithDraw(dataSuccess);
                handleSuccess(unit);
                withdrawForm.resetFields();
              }
            )
          );
        }
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [withdrawForm, viewItem, dispatch, handleSuccess, isAuthy]);

  const handleWithdrawSelect = useCallback(
    (value) => {
      const maxValue = get(viewItem, "data.amount", 0);
      const fee = 0;
      const computeAmount = maxValue ? (maxValue * value) / 100 - fee : 0;
      withdrawForm.setFieldsValue({ amount: roundNumber(computeAmount) });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [withdrawForm, viewItem]
  );

  const handleError = useCallback((error) => {
    console.log(error);
  }, []);

  const handleScan = useCallback(
    (value) => {
      if (!value) return;
      setToggleScan(false);
      withdrawForm.setFieldsValue({ address: value });
      sendForm.setFieldsValue({ wallet_addr: value });
      setAddressSelected(value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [withdrawForm]
  );

  const computeNumberJSB = useCallback(
    (amount) => {
      // amountUSJ / ( rate firebase x 98/100)
      const result = amount / (tradingPrice * PERCENT_SWAP);
      swapForm.setFieldsValue({ amountJsb: roundNumber(result) });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [swapForm, tradingPrice]
  );

  const handleSwapSelect = useCallback(
    (value) => {
      const maxValue = get(viewItem, "data.amount", 0);
      const fee = 0;
      const computeAmount = maxValue ? (maxValue * value) / 100 - fee : 0;
      swapForm.setFieldsValue({ amount: roundNumber(computeAmount) });
      computeNumberJSB(computeAmount);
      setAmountSwap(computeAmount);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [swapForm, viewItem, tradingPrice]
  );

  const handleSwapConfirm = useCallback(async () => {
    swapForm.validateFields().then(({ amount }) => {
      const unit = get(viewItem, "data.unit", "");
      const currency = get(waletSelect, "unit", "");

      dispatch(
        swapWallet(
          {
            fromCurrency: unit,
            toCurrency: currency,
            amount: parseFloat(amount),
          },
          () => {
            handleSuccess(unit);
            swapForm.resetFields();
          }
        )
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, swapForm, viewItem, waletSelect, handleSuccess]);

  const handleCommissionConfirm = useCallback(() => {
    const { amount } = commissionForm.getFieldsValue();
    const valueAmount = numeral(amount).value();
    dispatch(
      walletTransWithdraw(
        {
          amount: valueAmount,
          type: EARN,
        },
        () => {
          handleSuccessCommission();
          commissionForm.resetFields();
        }
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commissionForm]);

  const handlePercentSelect = (value) => {
    const maxValue = commissionsEarned || 0;
    const fee = 0;
    const computeAmount = maxValue ? (maxValue * value) / 100 - fee : 0;
    if (maxValue < fee || computeAmount < 0) return commissionForm.setFieldsValue({ amount: 0 });
    commissionForm.setFieldsValue({ amount: roundNumber(computeAmount) });
  };

  const handleSendSelect = useCallback(
    (value) => {
      const maxValue = get(viewItem, "data.amount", 0);
      const fee = 0;
      const computeAmount = maxValue ? (maxValue * value) / 100 - fee : 0;
      sendForm.setFieldsValue({ amount: roundNumber(computeAmount) });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sendForm, viewItem]
  );

  const onSelect = useCallback(
    (data) => {
      const unit = get(viewItem, "data.unit", "");
      const parseData = JSON.parse(data);
      const { full_name, wallet } = parseData || { full_name: "", wallet: [] };
      const { address } = wallet.find((o) => o.unit === unit) || {
        address: "",
      };
      sendForm.setFieldsValue({
        wallet_addr: full_name,
      });
      if (address === "") return setAddressSelected("");
      return setAddressSelected(address);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sendForm, viewItem]
  );

  const onSearchWalletAddress = (value) => {
    debounced(() => {
      setAddressSelected(value);
      setSearchAddress(value);
    });
  };

  const handleSendConfirm = useCallback(() => {
    const { amount } = sendForm.getFieldsValue();
    sendForm.validateFields();
    const unit = get(viewItem, "data.unit", "");
    const isViewItem = get(viewItem, "type");

    dispatch(
      withdrawWallet(
        {
          toAddress: addressSelected,
          amount: Number(amount),
          currency: unit,
          isViewItem,
        },
        () => {
          handleSuccess(unit);
          sendForm.resetFields();
        }
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendForm, viewItem, dispatch, handleSuccess, addressSelected]);

  const handleGetMoreConfirm = useCallback(() => {
    const { amount } = getMoreForm.getFieldsValue();
    getMoreForm.validateFields();
    const unit = get(viewItem, "data.unit", "");
    dispatch(
      getMoreUsjInvest(
        {
          amount: Number(amount),
        },
        () => {
          handleSuccess(unit);
          getMoreForm.resetFields();
        }
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMoreForm, dispatch, handleSuccess]);

  useEffect(() => {
    dispatch(
      wallerGetByEmailOrAddress(
        searchAddress,
        (data) => {
          setWalletOptionList(data);
        },
        () => {
          setWalletOptionList([]);
        }
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchAddress, dispatch]);

  useEffect(() => {
    if (viewItem && viewItem.type === MODAL_TYPES.swap) {
      const valueSelect = viewItem.data.swapOptionUnit[0] || {};
      setSelectWalet({ ...valueSelect, unit: valueSelect.value });
      swapForm.setFieldsValue({
        currency: get(viewItem, "data.swapOptionUnit[0].value"),
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swapForm, viewItem]);

  const renderMd = (length = 0) => {
    if (!length) return md;
    return MAX_COLLUM / length;
  };

  return (
    <>
      <Row gutter={gutter} className="wallet-list">
        {/* {renderWalletItem} */}
        {useMemo(
          () =>
            map(wallets, (item, index) => (
              <Col key={`wallet-${get(item, "id", 0)}-${index}`} md={renderMd(wallets.length)} xs={24}>
                <WalletItem item={item} onloadWallet={onloadWallet} />
              </Col>
            )),
          [wallets, md]
        )}
      </Row>

      {/* List Modal */}
      <div>
        {/* Modal Deposit */}
        <WithdrawModal
          destroyOnClose
          visible={MODAL_TYPES.deposit === get(viewItem, "type")}
          title={
            <>
              <FormattedMessage id="wallet.actions.deposit" /> {get(viewItem, "data.label")}
            </>
          }
          width={500}
          isFooter={false}
          handleCancel={handleCloseWithdraw}
        >
          {!isDisabledForm && (
            <div className="deponsit-modal">
              <div className="canvas-qrcode">
                <QRCode fgColor="#2b024e" size={160} value={get(viewItem, "data.address", "")} />
              </div>
              <label style={{ padding: "0 10px 15px", display: "block", textAlign: "center" }}>
                <FormattedMessage id="Copy.address" />
              </label>
              <div className="address-copy ">
                <InputCopy code={get(viewItem, "data.address", "")} />
              </div>
            </div>
          )}
          {isDisabledForm && (
            <div>
              <FormattedMessage id="pleaseWaitTo" /> {labelExpiredTime}
            </div>
          )}
        </WithdrawModal>
        {/* Modal Withdraw */}
        <WithdrawModal
          destroyOnClose
          className={"transfer-custom wallet-custom"}
          visible={MODAL_TYPES.withdraw === get(viewItem, "type") || MODAL_TYPES.transfer === get(viewItem, "type")}
          title={
            <>
              <FormattedMessage
                id={get(viewItem, "type") === MODAL_TYPES.withdraw ? "wallet.actions.withdraw" : "wallet.actions.transfer"}
              />{" "}
              {get(viewItem, "data.label")}
            </>
          }
          handleOk={handleWithdrawConfirm}
          handleCancel={handleCloseWithdraw}
        >
          <Form preserve={false} name="normal_login" form={withdrawForm} className="modal-form login-form">
            <div className="lable-form">
              <label>
                <FormattedMessage id="wallet.address" />
              </label>
            </div>
            <Form.Item
              name="address"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: "wallet.address.required",
                  }),
                },
              ]}
            >
              <Input
                style={{ cursor: "pointer" }}
                name="address"
                size="large"
                addonAfter={
                  <div
                    onClick={() => {
                      setToggleScan(true);
                    }}
                  >
                    <img
                      alt={intl.formatMessage({
                        id: "wallet.address",
                      })}
                      width={20}
                      src={require("assets/images/camera-trigger-icon2x.png")}
                    />
                  </div>
                }
              />
            </Form.Item>
            <div className="lable-form">
              <label>
                <FormattedMessage id="Amount" />
              </label>
            </div>
            <Form.Item
              name="amount"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: "wallet.amount.required",
                  }),
                },
              ]}
            >
              <Input size="large" name="amount" />
            </Form.Item>
            <SelectNumberOption handleSelect={handleWithdrawSelect} style={{ textAlign: "right" }} />
          </Form>
        </WithdrawModal>
        {/* Modal Swap */}
        <WithdrawModal
          destroyOnClose
          className={"modal-swap transfer-custom  wallet-custom"}
          visible={MODAL_TYPES.swap === get(viewItem, "type")}
          title={(() => {
            const swapFrom = get(viewItem, "data.label", "");
            // const swapTo = get(viewItem, "data.swapOptionUnit[0].label", "");
            return <>{`Swap ${swapFrom}`}</>;
          })(viewItem)}
          handleOk={handleSwapConfirm}
          handleCancel={handleCloseWithdraw}
        >
          <Form preserve={false} name="normal_login" form={swapForm} className="swap-form modal-form login-form">
            <div className="lable-form">
              <label>
                <FormattedMessage id="Sellect.wallet" />
              </label>
              {/* <CountDown options={{ ...viewItem }} /> */}
            </div>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: "wallet.address.required",
                  }),
                },
              ]}
              className="item-1"
            >
              <Input
                name="label"
                value={waletSelect?.label}
                size="small"
                autoComplete="off"
                prefix={<img src={waletSelect?.logo} alt="" width={39} height={39} />}
                ref={inputRefSelectWallet}
                onFocus={() => setShowSelectWallet(true)}
                onBlur={async () => {
                  await Misc.sleep(300);
                  return setShowSelectWallet(false);
                }}
              />
              <div className={`box-select`} style={{ display: showSelectWallet ? "block" : "none" }}>
                {wallets
                  .filter(
                    (ele) =>
                      (viewItem?.data?.swapOptionUnit || []).map((v) => Object.entries(v)[0][1]).includes(ele?.unit) &&
                      ele.unit !== get(viewItem, "data.unit")
                  )
                  .map((item, index) => {
                    return (
                      <ItemWalletLine
                        key={index}
                        {...{
                          ...item,
                          defaultSelect: get(wallets, "swapOptionUnit[0].label"), // DEFAULT_SELECT_WALLET,
                        }}
                        onSelect={handleSelectWalletLine}
                      />
                    );
                  })}
              </div>
            </Form.Item>
            <div className="lable-form">
              <label>
                <FormattedMessage id="Amount" />
              </label>
            </div>
            <Form.Item
              name="amount"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: "wallet.amount.required",
                  }),
                },
              ]}
              className="item-2"
            >
              <Input size="large" name="amount" onChange={(e) => setAmountSwap(e.target?.value || 0)} />
            </Form.Item>
            <SelectNumberOption handleSelect={handleSwapSelect} style={{ textAlign: "right" }} />
            {/* <div className="info-swap">
              <span>
                {waletSelect?.unit} <FormattedMessage id="willReceived" />:{` `}
                {amountSwap > 0 ? (
                  <CurrencyFormat
                    value={roundNumber(amountSwap * rateValue[waletSelect?.unit])}
                    displayType="text"
                    thousandSeparator
                  />
                ) : (
                  0
                )}
              </span>
            </div> */}
          </Form>
        </WithdrawModal>
        {/* Modal earn commission to wallet */}
        <WithdrawModal
          destroyOnClose
          className={"transfer-custom wallet-custom"}
          visible={MODAL_TYPES.commission === get(viewItem, "type")}
          title={
            <>
              <FormattedMessage id="wallet.actions.earnCommissionToWallet" /> {get(viewItem, "amount")}
            </>
          }
          handleOk={handleCommissionConfirm}
          handleCancel={handleCloseCommission}
        >
          <Form preserve={false} name="normal_login" form={commissionForm} className="modal-form login-form">
            <div className="lable-form">
              <label>
                <FormattedMessage id="pool.amount" /> <FormattedMessage id="available" />: {roundNumber(commissionsEarned) || 0}
              </label>
            </div>
            <Form.Item
              name="amount"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: "wallet.amount.required",
                  }),
                },
              ]}
            >
              <InputNumber
                className="w-100pc"
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                placeholder={intl.formatMessage({
                  id: "wallet.commissionModal.pleaseEnter",
                })}
              />
            </Form.Item>
            <SelectPercentOption handleSelect={handlePercentSelect} />
          </Form>
        </WithdrawModal>
        {/* Modal Send */}
        <WithdrawModal
          destroyOnClose
          className={"transfer-custom wallet-custom"}
          visible={MODAL_TYPES.send === get(viewItem, "type")}
          title={
            <>
              <FormattedMessage id={"wallet.actions.send"} /> {get(viewItem, "data.label")}
            </>
          }
          handleOk={handleSendConfirm}
          handleCancel={handleCloseWithdraw}
        >
          <Form preserve={false} name="normal_login" form={sendForm} className="modal-form login-form send-modal">
            <div className="lable-form">
              <label>
                <FormattedMessage id="wallet.address" />
              </label>
            </div>
            <Form.Item
              name="wallet_addr"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: "wallet.address.required",
                  }),
                },
              ]}
            >
              <AutoComplete onSelect={(value) => onSelect(value)} onSearch={onSearchWalletAddress}>
                {(walletOptionList || []).map((item) => (
                  <Option key={item.id} value={JSON.stringify(item)}>
                    {item.full_name}
                  </Option>
                ))}
              </AutoComplete>
            </Form.Item>
            <div
              onClick={() => {
                setToggleScan(true);
              }}
              className="scan"
            >
              <img
                alt={intl.formatMessage({
                  id: "wallet.address",
                })}
                width={20}
                src={require("assets/images/camera-trigger-icon2x.png")}
              />
            </div>
            <div className="lable-form">
              <label>
                <FormattedMessage id="pool.amount" />
              </label>
            </div>
            <Form.Item
              name="amount"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: "wallet.amount.required",
                  }),
                },
              ]}
            >
              <Input size="large" name="amount" />
            </Form.Item>
            <SelectNumberOption handleSelect={handleSendSelect} />
          </Form>
        </WithdrawModal>
        {/* Modal Get more  */}
        <WithdrawModal
          destroyOnClose
          className={"transfer-custom wallet-custom"}
          visible={MODAL_TYPES.getMore === get(viewItem, "type")}
          title={
            <>
              <FormattedMessage id={"wallet.actions.getMore"} /> {get(viewItem, "data.label")}
            </>
          }
          handleOk={handleGetMoreConfirm}
          handleCancel={handleCloseWithdraw}
        >
          <Form preserve={false} name="normal_login" form={getMoreForm} className="modal-form login-form">
            <div className="lable-form">
              <label>
                <FormattedMessage id="pool.amount" />
              </label>
            </div>
            <Form.Item
              name="amount"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: "wallet.amount.required",
                  }),
                },
              ]}
            >
              <Input size="large" name="amount" />
            </Form.Item>
          </Form>
        </WithdrawModal>
        {/* Modal QrScan */}
        {toggleScan && (
          <QrReader
            delay={DEPLAY}
            style={isMobile() ? previewStyleMobile : previewStyle}
            onError={handleError}
            onScan={handleScan}
            showViewFinder={true}
          />
        )}
      </div>

      {/* Modal success */}
      <WithdrawModal
        destroyOnClose
        className={"transfer-custom wallet-custom"}
        visible={MODAL_TYPES.success === get(viewItem, "type")}
        title={<FormattedMessage id={"wallet.actions.Success"} />}
        handleCancel={handleCloseWithdraw}
        footer={false}
      >
        <div className="modal-content-success">
          <img src={require("assets/images/icon/icon-success.png")} alt="" width={100} />
          <div className="modal-message-success mt-20">
            <FormattedMessage id={"Success"} />
          </div>
        </div>
      </WithdrawModal>
    </>
  );
};

export default injectIntl(WalletList);
