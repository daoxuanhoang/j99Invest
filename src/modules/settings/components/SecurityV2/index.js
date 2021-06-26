import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { Row, Col, Button } from "antd";
import { updateToggleAuthyModal } from "modules/auth/redux/actions";
import { CHANGE_STATUS } from "commons/constants/index";

import "./style.scss";

const SECURITY_TYPE = {
  EMAIL: "email",
  AUTHY: "authy",
};

const FormSecurity = ({ securityForm, handleRegisterAuthy }) => {
  const { profileData } = useSelector((state) => state.profile);
  // const { dataOpenModalAuthy } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [securityType, setSecurityType] = useState(null);
  const [toggleAuthy, setToggleAuthy] = useState(false);

  const isAuthyRegistered =
    (profileData?.authy === null ? true : false) || (profileData?.authy && profileData?.authy?.status !== 0) ? true : false;

  useEffect(() => {
    const isAuthyTurnOn = profileData?.is_authy;
    if (isAuthyTurnOn === 1) {
      setToggleAuthy(true);
      setSecurityType(SECURITY_TYPE.AUTHY);
    } else {
      setToggleAuthy(false);
      setSecurityType(SECURITY_TYPE.EMAIL);
    }
  }, [profileData]);

  const radioOptions = [
    { label: "Email", value: SECURITY_TYPE.EMAIL },
    { label: "Google Authenticator", value: SECURITY_TYPE.AUTHY },
  ];

  const onChange = (e) => {
    const value = e;
    let body = {};
    if (!isAuthyRegistered) {
      if (value === SECURITY_TYPE.AUTHY) {
        handleRegisterAuthy();
      }
      // setSecurityType(value);
      setToggleAuthy(!toggleAuthy);
      return;
    }
    if (value === SECURITY_TYPE.EMAIL) {
      body = {
        status: 0,
        typeCallApi: CHANGE_STATUS,
      };
    }
    if (value === SECURITY_TYPE.AUTHY) {
      body = {
        status: 1,
        typeCallApi: CHANGE_STATUS,
      };
    }
    dispatch(updateToggleAuthyModal(body));
  };

  return (
    <div className="securityV2-container">
      <Row gutter={[20, 0]}>
        <Col span={24}>
          <div className="securityV2-content ">
            <div className="left">
              <img src={require("assets/images/securityimage.png")} width={300} alt="" />
            </div>
            <div className="right w-100">
              <div className="google-security d-flex-between">
                <div className="google-security-left">
                  <img src={require("assets/images/icon/authen-icon.png")} width={60} alt="" />
                  <span className="ml-10">
                    <FormattedMessage id="setting.2fa.google.des.1" />
                  </span>
                </div>
                {securityType === SECURITY_TYPE.AUTHY ? (
                  <Button className="button-activated" style={{ width: "130px" }}>
                    <FormattedMessage id="Activated" />
                  </Button>
                ) : (
                  <Button className="button-disable" style={{ width: "130px" }} onClick={() => onChange(SECURITY_TYPE.AUTHY)}>
                    <FormattedMessage id="Disable" />
                  </Button>
                )}
              </div>
              <div className="gmail-security d-flex-between">
                <div className="gmail-security-left d-flex">
                  <span>
                    <img src={require("assets/images/icon/email-icon.png")} width={60} alt="" />
                  </span>
                  <div className="ml-10">
                    <p>
                      <FormattedMessage id="setting.2fa.email.des.1" />
                    </p>
                    <p>
                      <FormattedMessage id="setting.2fa.email.des.2" />
                    </p>
                  </div>
                </div>
                {securityType === SECURITY_TYPE.EMAIL ? (
                  <Button className="button-activated" style={{ width: "130px" }}>
                    <FormattedMessage id="Activated" />
                  </Button>
                ) : (
                  <Button className="button-disable" style={{ width: "130px" }} onClick={() => onChange(SECURITY_TYPE.EMAIL)}>
                    <FormattedMessage id="Disable" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default injectIntl(FormSecurity);
