import React from "react";
import { useDispatch } from "react-redux";
import { Form, Card, Input, Button } from "antd";
import { FormattedMessage } from "react-intl";

import "./styles.scss";
import * as actions from "modules/auth/redux/actions";
import { ROUTE } from "commons/constants";
import { Link } from "react-router-dom";
import background from "assets/images/signin/Group505.png";

const TOKEN_KEY = "token";

function NewPasswordPage({ history, location }) {
  const dispatch = useDispatch();
  const url = new URLSearchParams(location.search);

  const onFinish = (values) => {
    values.token = url.get(TOKEN_KEY);
    dispatch(
      actions.postResetPassword(values, () => {
        history.push(ROUTE.LOGIN);
        return;
      })
    );
  };

  return (
    <div className="new-password">
      <div className="login-left">
        <img src={background} />
      </div>
      <div className="login-right">
        <Card title={<FormattedMessage id="auth.forgot.password.title" />} className="card-login-custom">
          <Form name="normal_login" className="login-form" onFinish={onFinish}>
            <label className="title">
              <FormattedMessage id="auth.signin.modal.input.field.label.password" />
              <span>
                <FormattedMessage id="auth.signin.modal.required.mark" />
              </span>
            </label>
            <Form.Item
              name="new_password"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="auth.signin.modal.empty.message.password" />,
                },
              ]}
            >
              <Input className="input-field" type="password" />
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
}

export default NewPasswordPage;
