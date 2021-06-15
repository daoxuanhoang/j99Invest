import React from "react";
import { Button, Form, Card, Input } from "antd";
import Login from "../../../../assets/images/signin/Group505.png";
import "./styles.scss";
import { FormattedMessage, injectIntl } from "react-intl";

const SignUpPage = () => {
  return (
    <div className="register">
      <div className="register-left">
        <img src={Login} />
      </div>
      <div className="register-right">
        <Card title={<FormattedMessage id="auth.signup.modal.title" />} className="card-register-custom">
          <Form className="form-register">
            <label className="title">
              <span><FormattedMessage id="auth.signin.modal.input.filed.label.email" /></span>
            </label>
            <Form.Item>
              <Input className="input-filed-label" type="text" />
            </Form.Item>
            <label className="title">
              <span><FormattedMessage id="auth.signup.modal.input.filed.label.username" /></span>
            </label>
            <Form.Item>
              <Input className="input-filed-label" type="text" />
            </Form.Item>
            <label className="title">
              <span><FormattedMessage id="auth.signup.modal.input.filed.label.password" />
                </span>
                </label>
            <Form.Item>
              <Input className="input-filed-label" type="text" />
            </Form.Item>
            <label className="title">
              <span><FormattedMessage id="auth.signup.modal.input.filed.label.password.confirm" /></span>
            </label>
            <Form.Item>
              <Input className="input-filed-label" type="text" />
            </Form.Item>
            <label className="title">
              <span><FormattedMessage id="auth.signup.modal.input.filed.label.country" /></span>
            </label>
            <label className="title">
              <span><FormattedMessage id="auth.signup.modal.input.filed.label.mobile" /></span>
            </label>
            <Form.Item className="parent-input">
              <Input className="input-filed-label" type="text" />
              <Input className="input-filed-label" type="text" />
            </Form.Item>
            <label className="title">
              <span><FormattedMessage id="auth.signup.modal.input.filed.label.refferal" /></span>
            </label>
            <Form.Item>
              <Input className="input-filed-label" type="text" />
            </Form.Item>
            <Form.Item className="action">
                <Button
                    size="middle"
                    type="default"
                    htmlType="submit"
                    className="primary-button"
                ><FormattedMessage id="auth.signup.modal.button.signup.label" />
                </Button>
            </Form.Item>
            <Form.Item>
                <a href="#"><FormattedMessage id="auth.signup.modal.forgot.password.label" /></a>
                <a href="#"><FormattedMessage id="auth.signup.modal.login.label" /></a>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default injectIntl(SignUpPage);
