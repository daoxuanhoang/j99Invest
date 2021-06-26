/* eslint-disable */
import React, { useEffect } from "react";
import { Card, Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import "./styles.scss";

import { ROUTE } from "commons/constants";
import * as actions from "modules/auth/redux/actions";
import "../signin/styles.scss";
import { getParamFromURL } from "helpers/CommonHelper";
import background from "assets/images/signin/Group505.png";

export const regexEmail = () => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@[^|\;:_=+{}'",.?/~`!@#$%^&*<>()[\]\\-]((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
};

const ForgotPasswordPage = ({ history, location }) => {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(actions.postForgotPassword(values));
  };

  useEffect(() => {
    const token = getParamFromURL("token");
    if (token) {
      history.push("/reset-password?token=" + token);
    }
  }, [history]);

  return (
    <div className="forgot">
      <div className="forgot-left">
        <img src={background} />
      </div>
      <div className="forgot-right">
        <Card title={<FormattedMessage id="auth.forgot.password.title" />} className="card-forgot-custom">
          <Form name="normal_login" className="forgot-form" onFinish={onFinish}>
            <label className="title">
              <FormattedMessage id="auth.signin.modal.input.field.label.email" />
              <span>
                {" "}
                <FormattedMessage id="auth.signin.modal.required.mark" />
              </span>
            </label>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="auth.signin.modal.empty.message.email" />,
                },
                {
                  pattern: regexEmail(),
                  message: <FormattedMessage id="emailWrong" />,
                },
              ]}
              hasFeedback
            >
              <Input className="input-field-label" />
            </Form.Item>

            <Form.Item className="action">
              <Button size="middle" type="primary" htmlType="submit" className="primary-button">
                <FormattedMessage id="auth.signin.modal.button.confirm.label" />
              </Button>
            </Form.Item>

            <Form.Item className="link-href">
              <Link className="forgot-button" to={`${ROUTE.LOGIN}`.replace("//", "/")}>
                <FormattedMessage id="auth.signin.modal.login.label" />
              </Link>
              <Link className="sign-up-link" to={`${ROUTE.SIGNUP}`.replace("//", "/")}>
                <FormattedMessage id="auth.signin.modal.signup.label" />
              </Link>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
