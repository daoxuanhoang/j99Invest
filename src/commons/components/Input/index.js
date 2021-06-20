import React from "react";
import { Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./style.scss";

const { Password } = Input;

const InputCustom = (props) => {
  const { name = "", type = "", className = "", placeholder = "Please type", ...inputProps } = props;

  if (type === "password")
    return (
      <Password
        placeholder={placeholder}
        className={`custom-input ${className}`}
        name={name}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        {...inputProps}
      />
    );
  return <Input placeholder={placeholder} className={`custom-input ${className}`} name={name} {...inputProps} />;
};

export default InputCustom;
