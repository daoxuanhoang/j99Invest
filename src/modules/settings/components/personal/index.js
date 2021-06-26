import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import moment from "moment";
import { get } from "lodash";
import { useSelector } from "react-redux";

import "./style.scss";
import ProfileHeader from "../ProfileHeader";
import { regexEmail } from "modules/auth/pages/forgot";

const dateFormat = "YYYY-MM-DD";

const disabledDate = (current) => {
  return current && current > moment().endOf("day");
};

const FormPersonal = ({ handleUpdateProfile, formProfile, userInfo, profileInfo }) => {
  const { verifyCode } = useSelector((state) => state.profile);

  const fieldInput = [
    {
      name: "first_name",
      label: <FormattedMessage id="setting.profile.label.fullname" />,
      rules: [
        {
          required: true,
          message: <FormattedMessage id="setting.required.message" />,
        },
        {
          whitespace: true,
          message: <FormattedMessage id="setting.required.message" />,
        },
      ],
      field: <Input />,
    },
    // {
    //   name: "last_name",
    //   label: <FormattedMessage id="setting.profile.label.lastName" />,
    //   rules: [
    //     {
    //       whitespace: true,
    //       message: <FormattedMessage id="setting.required.message" />,
    //     },
    //     {
    //       required: true,
    //       message: <FormattedMessage id="setting.required.message" />,
    //     },
    //   ],
    //   field: <Input />,
    // },
    {
      name: "dob",
      label: <FormattedMessage id="setting.profile.label.birthday" />,
      field: <DatePicker disabledDate={disabledDate} style={{ width: "100%" }} format={dateFormat} placeholder="" />,
    },
    {
      name: "gender",
      label: <FormattedMessage id="setting.profile.label.gender" />,
      rules: [
        {
          required: false,
          message: <FormattedMessage id="setting.required.message" />,
        },
      ],
      field: (
        <Select style={{ width: "100%" }}>
          <Select.Option value="male">
            <FormattedMessage id="setting.male" />
          </Select.Option>
          <Select.Option value="female">
            <FormattedMessage id="setting.female" />
          </Select.Option>
        </Select>
      ),
    },
    {
      name: "address",
      label: <FormattedMessage id="setting.profile.label.address" />,
      rules: [
        {
          required: false,
          message: <FormattedMessage id="setting.required.message" />,
        },
      ],
      field: <Input />,
    },
    {
      name: "country",
      label: <FormattedMessage id="setting.profile.label.country" />,
      rules: [
        {
          required: false,
          message: <FormattedMessage id="setting.required.message" />,
        },
      ],
      field: <Input />,
    },
    {
      name: "phone_number",
      label: <FormattedMessage id="setting.profile.label.phone" />,
      rules: [
        {
          required: false,
          message: <FormattedMessage id="setting.required.message" />,
        },
        {
          pattern: /^(?:\d*)$/,
          message: <FormattedMessage id="phoneNumber" />,
        },
      ],
      field: <Input />,
    },
    {
      name: "email",
      label: <FormattedMessage id="setting.profile.label.email" />,
      rules: [
        {
          required: true,
          message: <FormattedMessage id="auth.signin.modal.empty.message.email" />,
        },
        {
          pattern: regexEmail(),
          message: <FormattedMessage id="emailWrong" />,
        },
      ],
      field: <Input />,
    },
  ];

  return (
    <>
      <ProfileHeader
        {...{
          ...profileInfo.profileHeaderInfo,
          verifyCode,
          authUser: userInfo,
        }}
      />
      <div className="profile-personal">
        <Form className="form-info" layout="vertical" form={formProfile} onFinish={handleUpdateProfile}>
          <Row gutter={[20, 0]}>
            {fieldInput.map((item, index) => (
              <Col key={index} xl={12} lg={12} md={12} sm={24} xs={24}>
                <div className="input-field">
                  <div className="input-field-label">
                    <label>
                      {item.label}
                      {get(item, "rules[0].required") ? (
                        <span className="ml-5" style={{ color: "red", fontSize: "16px" }}>
                          <FormattedMessage id="setting.required.mark" />
                        </span>
                      ) : (
                        ""
                      )}
                    </label>
                  </div>
                  <Form.Item name={item.name} rules={item.rules}>
                    {item.field}
                  </Form.Item>
                </div>
              </Col>
            ))}
            <Col className="box-btn" xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item className="btn-form btn-action">
                <Button className="btn-pega" key="submit" type="primary" htmlType="submit" style={{ width: "100%" }}>
                  <FormattedMessage id="setting.button.save" />
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default injectIntl(FormPersonal);
