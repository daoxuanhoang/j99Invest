import React from "react";
import { Button } from "antd";
import "./styles.scss";

const SelectPercentOption = ({ handleSelect = () => {} }) => {
  return (
    <div className="button-action-amount">
      <Button onClick={() => handleSelect(25)}>25%</Button>
      <Button onClick={() => handleSelect(50)}>50%</Button>
      <Button onClick={() => handleSelect(75)}>75%</Button>
      <Button onClick={() => handleSelect(100)}>100%</Button>
    </div>
  );
};

export default SelectPercentOption;
