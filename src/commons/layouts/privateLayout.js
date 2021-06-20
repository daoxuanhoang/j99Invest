import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import * as Cookies from "js-cookie";

import "./private.scss";
import MainSideBar from "commons/components/MainSideBar";
import HeaderMain from "commons/components/HeaderMain";
import MarqueeTokenBalance from "commons/components/MarqueeTokenBalance";

import { ROUTE, USER_INFO_KEY } from "commons/constants";

const PrivateLayout = ({ children }) => {
  const [openKeys, setOpenKeys] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);

  const [modeMobile, setModeMobile] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentTabSidebar, setCurrentTabSidebar] = useState(window.location.pathname);

  useEffect(() => {
    onGetDefaultOpenKey();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  const handleResize = () => {
    const windowSize = window.innerWidth;
    if (windowSize < 1000) {
      setModeMobile(true);
    } else {
      setModeMobile(false);
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem(USER_INFO_KEY);
    window.location.href = window.location.origin + ROUTE.LOGIN;
  };

  const onGetDefaultOpenKey = () => {
    const { pathname } = window.location;
    let keys = [];
    switch (pathname) {
      case ROUTE.ORDER:
        keys = ["_myTransaction"];
        break;
      case ROUTE.WALLET_TRANSACTION:
        keys = ["_myTransaction"];
        break;
      case ROUTE.COMMISSIONS:
        keys = ["_myTransaction"];
        break;
      default:
        break;
    }
    setOpenKeys(keys);
  };

  const toggleSideBar = () => {
    setVisible(!visible);
    setShowDrawer(!showDrawer);
    if (!visible) {
      setOpenKeys([]);
      return;
    }
    onGetDefaultOpenKey();
  };

  useEffect(() => {
    if (!modeMobile) {
      setShowDrawer(false);
    }
  }, [modeMobile]);

  return (
    <Layout className="private-layout-container">
      <HeaderMain isMobile={modeMobile} toggleSlider={toggleSideBar} visible={visible} />
      <Layout>
        <MainSideBar
          showDrawer={showDrawer}
          isMobile={modeMobile}
          setCurrentTabSidebar={setCurrentTabSidebar}
          setOpenKeys={setOpenKeys}
          openKeys={openKeys}
          visible={visible}
          current={currentTabSidebar}
          onLogout={handleLogout}
          setShowDrawer={setShowDrawer}
        />
        <div className="wrapper-layout w-100">
          <MarqueeTokenBalance />
          <div className="content-layout">{children}</div>
        </div>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
