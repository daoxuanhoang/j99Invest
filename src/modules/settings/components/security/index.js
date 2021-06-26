import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { Row, Col, Radio } from "antd";
import { updateToggleAuthyModal } from "modules/auth/redux/actions";
import { CHANGE_STATUS } from "commons/constants/index";

import "./styles.scss";

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
    const value = e.target.value;
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

  // const fieldInput = [
  //   {
  //     name: "countryCode",
  //     label: <FormattedMessage id="setting.security.country.code" />,
  //     rules: [
  //       {
  //         required: true,
  //         message: <FormattedMessage id="setting.required.message" />,
  //       },
  //     ],
  //     field: (
  //       <Select
  //         showSearch
  //         style={{ width: "100%" }}
  //         filterOption={(input, option) =>
  //           option.children
  //             .join(" ")
  //             .toLowerCase()
  //             .indexOf(input.toLowerCase()) >= 0
  //         }
  //         // filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase());}
  //       >
  //         {COUNTRY_LIST &&
  //           COUNTRY_LIST.map((item, key) => (
  //             <Select.Option key={key} value={item.dialCode}>
  //               {item.name} (+ {item.dialCode})
  //             </Select.Option>
  //           ))}
  //       </Select>
  //     ),
  //   },
  //   {
  //     name: "phone_number",
  //     label: <FormattedMessage id="setting.security.phone.number" />,
  //     rules: [
  //       {
  //         required: true,
  //         message: <FormattedMessage id="setting.required.message" />,
  //       },
  //     ],
  //     field: <Input />,
  //   },
  // ];

  return (
    <div className="security-container">
      <Row gutter={[20, 0]}>
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <div className="security-title">
            <FormattedMessage id="setting.security.choose.type" />
          </div>
          <div className="radio-button-authy-container">
            <Radio.Group
              options={radioOptions}
              onChange={onChange}
              value={securityType || ""}
              optionType="button"
              buttonStyle="solid"
            />
          </div>
          {toggleAuthy && (
            <div>
              {isAuthyRegistered ? (
                <div className="authy-registered">
                  <FormattedMessage id="setting.security.authy.has.been.registered" />
                </div>
              ) : (
                ""
                // <Form
                //   className="form-security"
                //   layout="vertical"
                //   onFinish={handleRegisterAuthy}
                //   form={securityForm}
                // >
                //   <Row gutter={[20, 0]}>
                //     <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                //       {fieldInput.map((item, index) => (
                //         <Col
                //           key={index}
                //           xl={24}
                //           lg={24}
                //           md={24}
                //           sm={24}
                //           xs={24}
                //         >
                //           <div className="input-field">
                //             <div className="input-field-label">
                //               <label>
                //                 {item.label}
                //                 {get(item, "rules[0].required") ? (
                //                   <span>
                //                     <FormattedMessage id="setting.required.mark" />
                //                   </span>
                //                 ) : (
                //                   ""
                //                 )}
                //               </label>
                //             </div>
                //             <Form.Item name={item.name} rules={item.rules}>
                //               {item.field}
                //             </Form.Item>
                //           </div>
                //         </Col>
                //       ))}

                //       <Col
                //         className="box-btn"
                //         xl={24}
                //         lg={24}
                //         md={24}
                //         sm={24}
                //         xs={24}
                //       >
                //         <Form.Item className="btn-form btn-action">
                //           <Button
                //             className="btn-pega"
                //             key="submit"
                //             type="primary"
                //             htmlType="submit"
                //           >
                //             <FormattedMessage id="setting.button.save" />
                //           </Button>
                //         </Form.Item>
                //       </Col>
                //     </Col>
                //   </Row>
                // </Form>
              )}
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default injectIntl(FormSecurity);
