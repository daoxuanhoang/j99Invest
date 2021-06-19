import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button } from "antd";
import { get, isEmpty } from "lodash";

import { roundNumber } from "helpers/CommonHelper";
import { MODAL_TYPES } from "commons/constants";
import { setFilterCode, viewWalletDetail, triggerHistoryModal, loadDeposit } from "modules/wallets/redux/actions";
import ArrowUpIcon from "assets/images/Icon-arrow-up.png";
import ArrowDownIcon from "assets/images/Icon-arrow-down.png";
import SwapIcon from "assets/images/Icon-swap.png";

import "./styles.scss";
import { getProfile } from "modules/profile/redux/actions";

const commissionIcon = require("assets/images/wallets/commission.png");
const iconUrl = require("assets/images/JSB-27.png");

export const WALLET_COMMISION = "WALLET_COMMISION";

const Wallet = ({ intl, item, walletType, onloadWallet = () => {} }) => {
  const dispatch = useDispatch();
  const commissionsEarned = useSelector((state) => state?.profile?.profileData?.commissions_earned);

  // =====> Handle price rate for item
  const { rateValue } = useSelector((state) => state.dashboard);
  const [rate, setRate] = useState(null);
  useEffect(() => {
    if (!isEmpty(rateValue)) {
      const r = rateValue[item.unit];
      setRate(!isNaN(r) ? r : null);
    }
  }, [item, rateValue]);

  const handViewDetails = (item, type) => {
    dispatch(
      viewWalletDetail({
        type,
        data: item,
      })
    );
  };

  const handleChangeUnit = (item) => {
    console.log(item);
    const { unit } = item || { unit: "" };
    onloadWallet(unit);
    dispatch(
      triggerHistoryModal({
        isShow: true,
        currency: item.unit,
      })
    );
    dispatch(setFilterCode("transaction"));
  };

  const handleFilterCommission = () => {
    onloadWallet();
    dispatch(setFilterCode("commission"));
  };

  const handleReloadDeposit = () => {
    const query = {
      currency: item.unit,
    };
    dispatch(
      loadDeposit(query, () => {
        dispatch(getProfile());
      })
    );
  };

  if (item.isFakeData) {
    return (
      <div className="wallet-wrapper">
        <Card className="wallet">
          <div className="wallet-info add-more-padding">
            <div className="wallet-name">
              <div>
                <img
                  className="wallet-image"
                  src={item.url || iconUrl}
                  alt={intl.formatMessage({
                    id: "wallet.title",
                  })}
                />
              </div>
              <span className="currency">{get(item, "label")}</span>
            </div>
            <div className="wallet-value wallet-comming">Coming soon</div>
          </div>
          <div className="wallet-actions fake"></div>
        </Card>
      </div>
    );
  }

  if (walletType === WALLET_COMMISION)
    return (
      <div className="wallet-wrapper">
        <Card className="wallet">
          <div className="wallet-info">
            <div className="wallet-name" onClick={() => handleFilterCommission()}>
              <img
                src={commissionIcon}
                alt={intl.formatMessage({
                  id: "wallet.title",
                })}
                width={60}
              />
              <span className="currency">
                <FormattedMessage id="wallet.currency.commission" />
              </span>
            </div>
            <div className="wallet-value">
              {roundNumber(commissionsEarned)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
            </div>
          </div>
          <div className="wallet-actions center">
            <Button type="link" className="action-link" onClick={handViewDetails(null, MODAL_TYPES.commission)}>
              <FormattedMessage id="wallet.actions.commission" />
            </Button>
          </div>
        </Card>
      </div>
    );

  return (
    <div className="wallet-wrapper">
      <Card className="wallet">
        <div className="wallet-info">
          <div
            className="wallet-name"
            onClick={() => {
              handleChangeUnit(item);
            }}
          >
            <div>
              <img
                className="wallet-image mr-10"
                src={ item.logo.default || iconUrl}
                alt={intl.formatMessage({
                  id: "wallet.title",
                })}
                width={60}
              />
            </div>
            <div>
              <span className="currency">{get(item, "label")}</span>
              &nbsp;
              <div>
                <span>
                  {roundNumber(get(item, "amount", 0))
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                  {/* {` USDT`}{" "} */}
                </span>
                {/* <span>{get(item, "amount", 0)}</span> */}
              </div>
            </div>
          </div>
        </div>

        <div className="wallet-actions">
          {item.btnDeposit?.show && (
            <Button
              className="action-link"
              onClick={() => {
                if (item.btnDeposit?.disable) return;
                handViewDetails(item, MODAL_TYPES.deposit);
              }}
              style={{
                background: item.btnDeposit?.disable ? "#B7B7B7" : "",
                cursor: item.btnDeposit?.disable ? "not-allowed" : "",
              }}
            >
              <img alt="" src={ArrowDownIcon} />
              <FormattedMessage id="wallet.actions.deposit" />
            </Button>
          )}
          {item.btnSwap?.show && (
            <Button
              className="action-link"
              onClick={() => {
                if (item.btnSwap?.disable) return;
                handViewDetails(item, MODAL_TYPES.swap);
              }}
              style={{
                background: item.btnSwap?.disable ? "#B7B7B7" : "",
                cursor: item.btnSwap?.disable ? "not-allowed" : "",
              }}
            >
              <img alt="" src={SwapIcon} />
              <FormattedMessage id="wallet.actions.swap" />
            </Button>
          )}
          {item.btnWithdraw?.show && (
            <Button
              className="action-link"
              onClick={() => {
                if (item.btnWithdraw?.disable) return;
                handViewDetails(item, MODAL_TYPES.withdraw);
              }}
              style={{
                background: item.btnWithdraw?.disable ? "#B7B7B7" : "",
                cursor: item.btnWithdraw?.disable ? "not-allowed" : "",
              }}
            >
              <img alt="" src={ArrowUpIcon} />
              <FormattedMessage id="wallet.actions.withdraw" />
            </Button>
          )}
          {item.isShowGetMore && (
            <Button className="action-link" onClick={handViewDetails(item, MODAL_TYPES.getMore)}>
              <img alt="" src={ArrowDownIcon} />
              <FormattedMessage id="wallet.actions.getMore" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default injectIntl(Wallet);
