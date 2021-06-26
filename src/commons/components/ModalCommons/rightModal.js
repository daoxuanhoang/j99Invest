import React from "react";
import { Drawer } from "antd";
import "./styles.scss";

const RightModal = ({
  isShow = false,
  handleClose = () => {},
  title = "Edit data",
  children,
  customContainerClass,
  width = "75%",
  padding = "20px 35px 20px 50px",
}) => {
  return (
    <>
      <div className={`item-detail ${customContainerClass}`}>
        <Drawer
          placement="right"
          className="mode-drawer-custom"
          onClose={() => {
            handleClose(false);
          }}
          visible={isShow}
          title={title}
          width={width}
          bodyStyle={{ padding: padding }}
        >
          {children}
        </Drawer>
      </div>
    </>
  );
};

export default RightModal;
