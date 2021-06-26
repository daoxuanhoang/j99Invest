import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { Row, Col, Form, Input, Button } from "antd";
import "./style.scss";

const FormAuththen = ({ emailForm, passwordForm, handleUpdateEmail, handleUpdatePassword, intl }) => {
  const fieldInput = [
    {
      name: "current_password",
      label: <FormattedMessage id="setting.profile.label.currentPassword" />,
      rules: [
        {
          required: true,
          message: <FormattedMessage id="setting.required.message" />,
        },
      ],
    },
    {
      name: "password",
      label: <FormattedMessage id="setting.profile.label.newPassword" />,
      rules: [
        { required: true, message: <FormattedMessage id="setting.required.message" /> },
        { pattern: /^\S*$/, message: <FormattedMessage id="setting.required.message.space" /> },
      ],
    },
    {
      name: "confirmPassword",
      label: <FormattedMessage id="setting.profile.label.confirmPassword" />,
      rules: [
        { required: true, message: <FormattedMessage id="setting.required.message" /> },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve();
            }
            return Promise.reject(
              intl.formatMessage({
                id: "passwordNotMatch",
              })
            );
          },
        }),
      ],
    },
  ];
  return (
    <Row gutter={[20, 0]}>
      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
        <Form className="form-authen" layout="vertical" onFinish={handleUpdatePassword} form={passwordForm}>
          <div className="form-title">
            <FormattedMessage id="setting.profile.title.changePassword" />
          </div>
          <Row gutter={[20, 0]}>
            {fieldInput.map((item, index) => (
              <Col key={index} xl={24} lg={24} md={24} sm={24} xs={24}>
                <div className="input-field">
                  <div className="input-field-label">
                    <label>
                      {item.label}
                      {item.rules[0].required ? (
                        <span>
                          <FormattedMessage id="setting.required.mark" />
                        </span>
                      ) : (
                        ""
                      )}
                    </label>
                  </div>
                  <Form.Item name={item.name} rules={item.rules}>
                    <Input.Password type="password" />
                  </Form.Item>
                </div>
              </Col>
            ))}
            <Col className="box-btn" xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item className="btn-form btn-action">
                <Button className="btn-pega" key="submit" type="primary" htmlType="submit" style={{ width: "100%" }}>
                  <FormattedMessage id="setting.button.save" />
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
        <Form className="form-authen" layout="vertical" form={emailForm} onFinish={handleUpdateEmail}>
          <div className="form-title">
            <FormattedMessage id="setting.profile.title.changeEmail" />
          </div>
          <div className="input-field">
            <div className="input-field-label">
              <label>
                <FormattedMessage id="setting.profile.label.changeEmail" />
                <span>
                  <FormattedMessage id="setting.required.mark" />
                </span>
              </label>
            </div>
            <div className="position-relative">
              <Form.Item
                className="form-item"
                name="email"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="setting.required.message" />,
                  },
                ]}
              >
                <Input type="email" />
              </Form.Item>
              <Form.Item className="btn-form-email">
                <Button className="btn-change-email" key="submit" type="primary" htmlType="submit" style={{ width: "100%" }}>
                  <FormattedMessage id="setting.button.change" />
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default injectIntl(FormAuththen);
