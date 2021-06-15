import "./styles.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { injectIntl } from "react-intl";
import { Select } from "antd";
import { setLanguage } from "../../../modules/application/redux/actions";

const { Option } = Select;

const HeaderMain = ({ intl, className, ...props }) => {
  const dispatch = useDispatch();
  const { OPTIONS_LANG, activeLanguage } = useSelector((state) => state.application);

  const handleChangeLang = (lang) => {
    dispatch(setLanguage({ language: lang }));
  };

  return (
    <div className={`lang ${className}`} {...props}>
      <Select defaultValue={activeLanguage} onChange={handleChangeLang}>
        {OPTIONS_LANG.map((item) => (
          <Option value={item.id}>
            <img className="image-flag" src={item.image} alt="" width={30} />
            <span className="text-flag">{item.label}</span>
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default injectIntl(HeaderMain);
