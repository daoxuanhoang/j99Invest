import React from "react";
import { Button, Form, Card, Input } from "antd";
import Login from "../../../assets/images/signin/Group505.png";
import "./styles.scss";
import { FormattedMessage, intjectIntl } from "react-intl";

const SignUpPage = () => {
  return (
    <div className="register">
      <div className="register-left">
        <img src={Login} />
      </div>
      <div className="register-right">
        <Card title="CREATE A FREE ACCOUNT" className="card-register-custom">
          <Form className="form-register">
            <label className="title">
              <span><FormattedMessage id="Email" /></span>
            </label>
            <Form.Item>
              <Input className="input-filed-label" type="text" />
            </Form.Item>
            <label className="title">Username</label>
            <Form.Item>
              <Input className="input-filed-label" type="text" />
            </Form.Item>
            <label className="title">Password</label>
            <Form.Item>
              <Input className="input-filed-label" type="text" />
            </Form.Item>
            <label className="title">Confirm Password</label>
            <Form.Item>
              <Input className="input-filed-label" type="text" />
            </Form.Item>
            <label className="title">Country</label>
            <label className="title">Mobile</label>
            <Form.Item className="parent-input">
              <Input className="input-filed-label" type="text" />
              <Input className="input-filed-label" type="text" />
            </Form.Item>
            <label className="title">Referral ( Option )</label>
            <Form.Item>
              <Input className="input-filed-label" type="text" />
            </Form.Item>
            <Form.Item className="action">
                <Button
                    size="middle"
                    type="default"
                    htmlType="submit"
                    className="primary-button"
                >CREATE ACCOUNT</Button>
            </Form.Item>
            <Form.Item>
                <a href="#">Already registered?</a>
                <a href="#">Log In</a>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
