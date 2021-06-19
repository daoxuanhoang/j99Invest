import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { Modal } from "antd";

import "./styles.scss";

const WithdrawModal = (props) => {
  const {
    intl,
    className,
    visible,
    title,
    handleOk = () => undefined,
    handleCancel = () => undefined,
    footer,
    isFooter = true,
    isFooterLabel = false,
    children,
    ...otherProps
  } = props;

  return (
    <Modal
      centered
      className={`custom-modal ${className}`}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      title={
        <>
          {title ? (
            title
          ) : (
            <>
              <FormattedMessage id="wallet.actions.withdraw" /> <FormattedMessage id="wallet.currency.USDTTRON" />
            </>
          )}
        </>
      }
      {...otherProps}
      footer={
        footer === false ? (
          footer
        ) : isFooter ? (
          isFooterLabel ? (
            <span className="modal-footer-action">Scan to deposit</span>
          ) : (
            <span key="submit" type="link" className="modal-footer-action" onClick={handleOk}>
              {footer ? (
                footer
              ) : (
                <>
                  {intl.formatMessage({
                    id: "wallet.actions.submit",
                  })}
                  !{"   "}
                </>
              )}
            </span>
          )
        ) : (
          ""
        )
      }
    >
      {children}
    </Modal>
  );
};

export default injectIntl(WithdrawModal);
