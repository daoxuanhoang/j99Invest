import React from "react";
import { useSelector } from "react-redux";
import CurrencyFormat from "react-currency-format";
import "./styles.scss";
import { roundNumber } from "../../../helpers/CommonHelper";

const MarqueeTokenBalance = () => {
  const { ratePv } = useSelector((state) => state.dashboard);

  return (
    <div className="marquee-token">
      <marquee
        id="mymarquee"
        behavior="scroll"
        direction="right"
        // scrolldelay={10}
        onMouseOver={() => document.getElementById("mymarquee").stop()}
        onMouseOut={() => document.getElementById("mymarquee").start()}
      >
        <div className="marquee-content">
          {ratePv.map((ele, index) => (
            <span className="token-item ml-20" key={"token-stash" + index}>
              <span>{`${ele.currency} `} </span>
              <CurrencyFormat value={roundNumber(+ele.price)} displayType="text" thousandSeparator />
              <span
                style={{
                  color: ele.type === "UP" ? "#31c45b" : "red",
                }}
              >{` (${ele.rate}%)`}</span>
            </span>
          ))}
        </div>
      </marquee>
    </div>
  );
};

export default MarqueeTokenBalance;
