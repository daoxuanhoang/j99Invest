import React, { useEffect, useState } from "react";
import { Card, Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Logo from "../../../../assets/images/signin/Group505.png";

import { ROUTE } from "../../../../commons/constants";
import * as actions from "../../../../modules/auth/redux/actions";
import "./styles.scss";
import { isEmpty } from "lodash";

export const regexEmail = () => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@[^|\;:_=+{}'",.?/~`!@#$%^&*<>()[\]\\-]((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
};

const SignUpPage = ({ history, location }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { setFieldsValue, getFieldsValue } = form;
  const url = new URLSearchParams(location.search);
  const sponsorKey = url.get("sponsorKey") || url.get("sponsorkey");
  const [isPassNotMatch, setIsPassNotMatch] = useState(false);

  useEffect(() => {
    if (!sponsorKey) return () => {};
    setFieldsValue({
      sponsorKey: sponsorKey.toLowerCase(),
    });
  }, [url, sponsorKey, setFieldsValue]);

  const isDisable = sponsorKey ? true : false;

  const onFinish = (values) => {
    const password = values?.password;
    const confirmPassword = values?.confirm_password;
    if (!password || !confirmPassword) {
      return;
    }
    if (password !== confirmPassword) {
      return;
    }
    delete values.confirm_password;
    dispatch(
      actions.postSignup(values, () => {
        history.push(ROUTE.SIGNIN);
      })
    );
  };

  const onBlur = () => {
    const { password, confirm_password } = getFieldsValue();
    if (isEmpty(password) && isEmpty(confirm_password)) {
      setIsPassNotMatch(false);
      return;
    }
    if (password !== confirm_password) {
      setIsPassNotMatch(true);
      return;
    }
    setIsPassNotMatch(false);
  };

  return (
    <div className="register">
      <div className="register-left">
        <img src={Logo} />
      </div>
      <div className="register-right">
        <Card title={<FormattedMessage id="auth.signup.modal.title" />} className="card-register-custom">
          <Form form={form} name="normal_register" className="register-form" onFinish={onFinish}>
            <label className="title">
              <FormattedMessage id="auth.signup.modal.input.field.label.email" />
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
              <Input className="input-field" />
            </Form.Item>
            <label className="title">
              <FormattedMessage id="auth.signup.modal.input.field.label.username" />
              <span>
                {" "}
                <FormattedMessage id="auth.signin.modal.required.mark" />
              </span>
            </label>
            <Form.Item
              name="first_name"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="auth.signup.modal.empty.message.username" />,
                },
              ]}
            >
              <Input className="input-field" />
            </Form.Item>
            <label className="title">
              <FormattedMessage id="auth.signup.modal.input.field.label.password" />
              <span>
                {" "}
                <FormattedMessage id="auth.signin.modal.required.mark" />
              </span>
            </label>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="auth.signup.modal.empty.message.password" />,
                },
              ]}
            >
              <Input.Password className="input-field" type="password" />
            </Form.Item>

            <label className="title">
              <FormattedMessage id="auth.signup.modal.input.field.label.confirm.password" />
              <span>
                {" "}
                <FormattedMessage id="auth.signin.modal.required.mark" />
              </span>
            </label>
            <Form.Item
              name="confirm_password"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="auth.signup.modal.empty.message.confirm.password" />,
                },
              ]}
            >
              <Input className="input-field" type="password" onBlur={onBlur} />
            </Form.Item>
            {isPassNotMatch && (
              <label className="error-text">
                <span>
                  <FormattedMessage id="passwordNotMatch" />
                </span>
              </label>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "45%" }}>
                <label className="title">
                  <FormattedMessage id="setting.profile.label.country" />
                  <span>
                    {" "}
                    <FormattedMessage id="auth.signin.modal.required.mark" />
                  </span>
                </label>
                <Form.Item
                  name="country"
                  rules={[
                    { whitespace: true },
                    {
                      required: true,
                      message: <FormattedMessage id="auth.signup.modal.empty.message.country" />,
                    },
                  ]}
                >
                  <Input className="input-field-label" />
                </Form.Item>
              </div>

              <div style={{ width: "45%" }}>
                <label className="title">
                  <FormattedMessage id="auth.signup.modal.input.field.label.mobile" />
                  <span>
                    {" "}
                    <FormattedMessage id="auth.signin.modal.required.mark" />
                  </span>
                </label>
                <Form.Item
                  name="phone_number"
                  rules={[
                    { whitespace: true },
                    {
                      required: true,
                      message: <FormattedMessage id="auth.signup.modal.empty.message.mobile" />,
                    },
                  ]}
                >
                  <Input className="input-field" />
                </Form.Item>
              </div>
            </div>
            <label className="title">
              <FormattedMessage id="auth.signup.modal.input.field.label.referral" />
            </label>
            <Form.Item name="sponsorKey">
              <Input className="input-field" disabled={isDisable} />
            </Form.Item>

            <Form.Item className="action">
              <Button size="middle" type="primary" htmlType="submit" className="primary-button">
                <FormattedMessage id="auth.signin.modal.button.signup.label" />
              </Button>
            </Form.Item>

            <Form.Item className="link-href">
              <Link className="forgot-button" to={`${ROUTE.FORGOT_PASSWORD}`.replace("//", "/")}>
                <FormattedMessage id="auth.signin.modal.forgot.password.label" />
              </Link>
              <Link className="sign-up-link" to={`${ROUTE.LOGIN}`.replace("//", "/")}>
                <FormattedMessage id="auth.signin.modal.login.label" />
              </Link>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
