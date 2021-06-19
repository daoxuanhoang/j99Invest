import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, Drawer, Button } from "antd";
import { FormattedMessage } from "react-intl";
import cn from "classnames";

import "./styles.scss";
import Language from "commons/components/Language";
import ProfileAccount from "commons/components/ProfileAccount";
import { ROUTE } from "commons/constants";
import logo from "assets/images/logo/logo.png";
import DashBoardIcon from "assets/images/iconMenu/dashboard.png";
import MyBalanceIcon from "assets/images/iconMenu/wallet.png";
import BuyOfferIcon from "assets/images/iconMenu/network.png";
import BountySpwIcon from "assets/images/iconMenu/bounty.png";
import NetWorkIcon from "assets/images/iconMenu/refferal.png";
import SettingIcon from "assets/images/iconMenu/setting.png";
const { Sider } = Layout;

const rootSubMenuKeys = ["_myTransaction"];
const CLASS_ACTIVE_MENU = "ant-menu-item-selected";

const itemMenu = [
  {
    id: 1,
    icon: DashBoardIcon,
    title: <FormattedMessage id={"menu.dashboard"} />,
    link: ROUTE.DASHBOARD,
    subMenu: [],
  },
  {
    id: 2,
    icon: MyBalanceIcon,
    title: <FormattedMessage id={"menu.myBalance"} />,
    link: ROUTE.MY_BALANCE,
    subMenu: [],
  },
  {
    id: 3,
    icon: BuyOfferIcon,
    title: <FormattedMessage id={"menu.buyOffer"} />,
    link: ROUTE.BUY_OFFER,
    subMenu: [],
  },
  {
    id: 4,
    icon: BountySpwIcon,
    title: <FormattedMessage id={"menu.bountySPW"} />,
    link: `${ROUTE.BOUNTY_SPW}`,
    subMenu: [],
  },
  {
    id: 5,
    icon: NetWorkIcon,
    title: <FormattedMessage id={"menu.referral"} />,
    link: `${ROUTE.NETWORKS}${ROUTE.NETWORKS_REFERALS}`,
    subMenu: [],
  },
  {
    id: 6,
    icon: SettingIcon,
    title: <FormattedMessage id={"menu.setting"} />,
    link: `${ROUTE.SETTING}${ROUTE.SETTING_PERSONAL}`,
    subMenu: [],
  },
];

const MainSideBar = ({ visible, openKeys, current, setOpenKeys, setCurrentTabSidebar, isMobile, showDrawer, setShowDrawer }) => {
  const { pathname } = useLocation();

  const handleClickMenu = (e) => {
    setCurrentTabSidebar(e.key);
  };

  const renderClassActiveMenu = (value) => {
    if (pathname.indexOf(value) !== -1 && value !== "/") {
      return CLASS_ACTIVE_MENU;
    }
    return "";
  };

  const handleOpenChangeMenu = (openKeysList) => {
    const latestOpenKey = openKeysList.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubMenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(openKeysList);
      return;
    }

    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  const renderMenu = (showContent) => {
    return (
      <>
        {isMobile && (
          <>
            <div className="showLogo">
              <center>
                <Link to={ROUTE.HOME}>
                  <img
                    style={{ padding: "5px" }}
                    src={logo}
                    width={130}
                    alt="SoupSwap"
                    alt="SoupSwap Logo"
                  />
                </Link>
              </center>
            </div>
            <div className="mt-30 mb-20">
              <ProfileAccount className="custom-account" showInfo={true} />
            </div>
            <hr className="line-sidebar" />
          </>
        )}
        {!isMobile && (
          <div>
            <Link to={ROUTE.HOME} style={{ cursor: "pointer" }}>
              <img className="logo" src={logo} width={140} alt="SoupSwap" alt="SoupSwap Logo" />
            </Link>
          </div>
        )}
        {/* <hr className="line-sidebar" /> */}
        <Menu
          className="sidebar-menu-custom"
          mode="inline"
          onClick={handleClickMenu}
          onOpenChange={handleOpenChangeMenu}
          openKeys={openKeys}
          selectedKeys={[current]}
          style={{ marginTop: isMobile ? 20 : "10px" }}
        >
          {itemMenu.map((ele) => (
            <Menu.Item
              className={`${cn("menu-item-custom", showContent && "menu-item-hide", renderClassActiveMenu(ele.link))} ${
                ele.isBottom ? "bottom-menu" : ""
              }`}
              key={ele.link}
            >
              <div className="menu-sub_title">
                <Link className="link-sidebar" to={ele.link}>
                  {!showContent && (
                    <div className="d-flex-center">
                      {ele.icon && (
                        <div className="icon-menu">
                          <img src={ele.icon} alt={ele.link} width={24} />
                        </div>
                      )}
                      {ele.title && <div className="menu-text ml-10">{ele.title}</div>}
                    </div>
                  )}
                </Link>
              </div>
            </Menu.Item>
          ))}
        </Menu>

        {/* Show on mobile */}
        {isMobile && <Language style={{ textAlign: "center" }} className="mt-20" />}

        <div className="sidebar-footer">
          <Button onClick={() => window?.open(process.env.REACT_APP_WHITE_PAPER, "_blank")}>
            <FormattedMessage id="Download.Whitepaper" />
          </Button>
        </div>
      </>
    );
  };
  if (isMobile) {
    return (
      <Drawer
        placement="right"
        visible={showDrawer}
        placement="left"
        width={180}
        className="mode-drawer-menu"
        onClose={() => setShowDrawer(false)}
      >
        {renderMenu(false)}
      </Drawer>
    );
  }
  return (
    <>
      <Sider className="sidebar-custom" collapsed={visible} collapsible trigger={null} width={200}>
        {renderMenu(false)}
      </Sider>
    </>
  );
};

export default MainSideBar;
