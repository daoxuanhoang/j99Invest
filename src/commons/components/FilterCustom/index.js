import React from "react";
import { injectIntl } from "react-intl";

import "./style.scss";
import { Select } from "antd";

const { Option } = Select;

const Index = ({ data = [], className = "", defaultValue = "ALL", handleChange = () => {}, intl, ...otherProps }) => {
  return (
    <>
      <div className={`filter-custom ${className}`}>
        <Select defaultValue={defaultValue} onChange={handleChange} {...otherProps}>
          {data.map((item, key) => (
            <Option key={key} value={item.value}>
              {intl.formatMessage({
                id: item.value,
              })}
            </Option>
          ))}
        </Select>
      </div>
    </>
  );
};

export default injectIntl(Index);
