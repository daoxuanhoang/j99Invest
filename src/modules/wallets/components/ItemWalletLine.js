import "./styles.scss";
import React from "react";
import { injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import { roundNumber } from "helpers/CommonHelper";
import CurrencyFormat from "react-currency-format";

const Index = (item) => {
  const { defaultSelect, unit, label, logo, amount, onSelect } = item;

  const { tradingPrice } = useSelector((state) => state.application);

  const renderPrice = () => {
    if (!tradingPrice || tradingPrice[unit] === null || tradingPrice[unit] === undefined) return;

    return (
      <span className="price">
        {`≈$ `}
        <CurrencyFormat
          value={roundNumber(parseFloat(amount) * parseFloat(tradingPrice[unit]))}
          displayType={"text"}
          thousandSeparator
        />
      </span>
    );
  };

  return (
    <>
      <div
        className="item-wallet-line"
        onClick={() => onSelect(item)}
        style={{
          backgroundColor: defaultSelect === item?.unit ? "#dcdcdc" : "",
        }}
      >
        <div className="left">
          <img src={logo} alt={label} width={39} height={39} />
          <span className="ml-5">{label}</span>
        </div>
        <div style={{ with: "5px" }}></div>
        <div className="right">
          <span className="balance">
            <CurrencyFormat value={roundNumber(amount || 0)} displayType={"text"} thousandSeparator /> {` ${item?.unit}`}
          </span>
          {renderPrice()}
        </div>
      </div>
    </>
  );
};

export default injectIntl(Index);
