import React from "react";
import { Input } from "antd";
import "./style.scss";

const { TextArea } = Input;

const TextAreaCustom = (props) => {
  const { name = "", className = "", placeholder = "Please type", ...inputProps } = props;
  return <TextArea placeholder={placeholder} className={`custom-textarea ${className}`} name={name} {...inputProps} />;
};

export default TextAreaCustom;
