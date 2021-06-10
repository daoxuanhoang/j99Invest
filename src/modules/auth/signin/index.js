import React from "react";
import Login from "../../../assets/images/signin/Group505.png";
import "./styles.scss";
import { Card, Button, Input, Form } from "antd";

const SignInPage = () => {
  return (
    <div className="login">
      <div className="login-left">
        <img src={Login} />
      </div>
      <div className="login-right">
        <Card title="LOG IN" className="card-login-custom">
          <Form>
            <label className="title">
              <span>Username</span>
            </label>
            <Form.Item>
              <Input className="input-filed-label" type="text" />
            </Form.Item>
            <label className="title">
              <span>Password</span>
            </label>
            <Form.Item>
              <Input className="input-filed-label" type="password" />
            </Form.Item>
            <Form.Item className="action">
              <Button
                size="middle"
                type="default"
                htmlType="submit"
                className="primary-button"
              >
                LOG IN
              </Button>
            </Form.Item>
            <Form.Item className="link-href">
              <a
                className="forgot-button"
                to="#"
                href="#"
              >
                Forgot Password
              </a>
              <a
                className="sign-up-link"
                to="#"
                href="#"
              >
                Free Register
              </a>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
