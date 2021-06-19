import "./styles.scss";
import React from "react";
import { useSelector } from "react-redux";
import { injectIntl, FormattedMessage } from "react-intl";
import { Dropdown, Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import * as Cookies from "js-cookie";
import { get } from "lodash";
import noneAvatar from "../../../assets/images/logo/noneAvatar.png"; 

import { ROUTE } from "../../constants/index";
import { USER_INFO_KEY } from "../../constants/index";

const ProfileAccount = ({ className = "", showInfo }) => {
  const userInfo = useSelector((state) => state.profile.profileData);

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem(USER_INFO_KEY);
    window.location.href = window.location.origin + ROUTE.LOGIN;
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <div className="logout" onClick={handleLogout}>
          <FormattedMessage id="logout" /> &nbsp;
          <LogoutOutlined />
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={`${className} profile-account`}>
      {showInfo ? (
        <>
          <div className="wrapper-image-avatar">
            <img
              width={40}
              height={40}
              className="image-avatar"
              src={get(userInfo, "image", null) ? get(userInfo, "image", null) : noneAvatar}
              alt={`${userInfo?.first_name} ${userInfo?.last_name}`}
              title={`${userInfo?.first_name} ${userInfo?.last_name}`}
            />
          </div>
          <div className="ml-10">
            <span className="styleName">
              <FormattedMessage id="hi" /> {`${userInfo?.first_name || ""} ${userInfo?.last_name || ""}`}
            </span>
            <div className="logout" onClick={handleLogout}>
              <FormattedMessage id="logout" />
            </div>
          </div>
        </>
      ) : (
        <Dropdown overlay={menu} placement="bottomLeft">
          <div className="wrapper-image-avatar">
            <img
              width={40}
              height={40}
              className="image-avatar"
              src={get(userInfo, "image", null) ? get(userInfo, "image", null) : noneAvatar}
              alt={`${userInfo?.first_name} ${userInfo?.last_name}`}
              title={`${userInfo?.first_name} ${userInfo?.last_name}`}
            />
          </div>
        </Dropdown>
      )}
    </div>
  );
};

export default injectIntl(ProfileAccount);
