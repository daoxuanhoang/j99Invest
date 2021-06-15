import "./styles.scss";
import React from "react";
import { injectIntl } from "react-intl";
import { MenuOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { Select } from "antd";
import TokenBalance from "./TokenBalance";
import ProfileAccount from "../ProfileAccount/index";
import Language from "../../../commons/components/Language/index";

const { Header } = Layout;

const HeaderMain = ({ intl, toggleSlider, visible, isMobile }) => {
  const onToggleSideBar = () => {
    toggleSlider();
  };

  return (
    <Header className="header-container">
      <div className="content-header">
        <div className="col-left w-100">
          <div className="close-mobile">{isMobile && <MenuOutlined onClick={onToggleSideBar} className="icon ml-10" />}</div>
        </div>
        <div className="col-right">
          <TokenBalance />
          {!isMobile && (
            <>
              <ProfileAccount className="custom-account" showInfo={false} />
              <Language />
            </>
          )}
        </div>
      </div>
    </Header>
  );
};

export default injectIntl(HeaderMain);
