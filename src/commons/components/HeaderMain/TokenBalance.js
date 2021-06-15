import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fixedNumber } from "../../../helpers/CommonHelper";
// import FirebaseService from "services/firebase";

const SPW = "SPW";
const USDTTRON = "USDTTRON";

const TokenBalance = () => {
  const { walletListFilter } = useSelector((state) => state.profile.profileData);
  const [tokenFilter, setTokenFilter] = useState();

  // useEffect(() => {
  //   FirebaseService.getTradingPriceHeader("list_price_header")
  //     .once("value")
  //     .then((snapshot) => {
  //       var price = snapshot.val();
  //       console.log("asdasd", price);
  //     });
  // }, []);

  useEffect(() => {
    if (walletListFilter && walletListFilter.length > 0) {
      const spwWallet = walletListFilter.find((ele) => ele.unit === SPW);
      const usdtWallet = walletListFilter.find((ele) => ele.unit === USDTTRON);
      setTokenFilter({
        SPW: spwWallet,
        USDTTRON: usdtWallet,
      });
    }
  }, [walletListFilter]);

  return (
    <>
      <div className="token-block">
        <div className="token-item mr-10">
          <img className="token-logo" src={require("../../../assets/images/token/spw-token.png")} height={22} alt="" />
          &nbsp;
          <span className="token-balance">{fixedNumber(tokenFilter?.[SPW].amount || 0)}</span>
          &nbsp;
          <span className="token-currency">{tokenFilter?.[SPW].unit || ""}</span>
        </div>
        <div className="token-item mr-10">
          <img className="token-logo" src={require("../../../assets/images/icon/icon-wallets.png")} height={22} alt="" />
          &nbsp;
          <span className="token-balance">{fixedNumber(tokenFilter?.[USDTTRON].amount || 0)}</span>
          &nbsp;
          <span className="token-currency">{tokenFilter?.[USDTTRON].unit.split("").slice(0, 3).join("") || ""}</span>
        </div>
      </div>
    </>
  );
};

export default TokenBalance;
