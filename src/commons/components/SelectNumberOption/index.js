import React from "react";
import { Button } from "antd";
import "./styles.scss";

const SelectNumberOption = ({ handleSelect = () => {}, ...props }) => {
  return (
    <div className="button-action-amount" {...props}>
      <Button onClick={() => handleSelect(10)}>10%</Button>
      <Button onClick={() => handleSelect(25)}>25%</Button>
      <Button onClick={() => handleSelect(50)}>50%</Button>
      <Button onClick={() => handleSelect(75)}>75%</Button>
      <Button onClick={() => handleSelect(100)}>100%</Button>
    </div>
  );
};

export default SelectNumberOption;
