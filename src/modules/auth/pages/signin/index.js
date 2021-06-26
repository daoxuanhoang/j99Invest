import React, { useEffect, useState } from "react";
import { Card, Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import { get } from "lodash";
import Recaptcha from "react-recaptcha";

import "./styles.scss";
import { postLogin } from "modules/auth/redux/actions";
import { updateTimer } from "helpers/CommonHelper";
import { EXPIRED_TIME_SIGN_IN, PRODUCTION } from "commons/constants";
import { ROUTE } from "commons/constants";
import { regexEmail } from "../forgot";
import background from "assets/images/signin/Group505.png";

const siteKey = process.env.REACT_APP_GOOGLE_SITE_KEY;

const SignInPage = ({ history, location }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isProduction, setIsProduction] = useState(process.env.REACT_APP_ENV === PRODUCTION);
  const [labelExpiredTime, setLabelExpiredTime] = useState("");

  const onFinish = (values) => {
    dispatch(
      postLogin(values, (data) => {
        if (get(location, "state.from")) {
          const pathName = get(location, "state.from.pathname");
          const search = get(location, "state.from.search");
          history.push(`${pathName}${search}`);
          return;
        } else {
          history.push(ROUTE.DASHBOARD);
        }
      })
    );
  };

  useEffect(() => {
    if (process.env.REACT_APP_ENV === PRODUCTION) {
      const intervalBuyNow = setInterval(() => {
        let { label, expiredTime } = updateTimer(EXPIRED_TIME_SIGN_IN);
        let toDay = new Date().getTime();
        let isExpired = expiredTime > toDay ? true : false;
        setIsProduction(isExpired);
        if (!isExpired) return clearInterval(intervalBuyNow);
        setLabelExpiredTime(label);
      }, 1000);

      return () => {
        clearInterval(intervalBuyNow);
      };
    } else return;
  }, []);

  function recaptchaLoaded() {
    console.log("capcha successfully loaded");
  }

  function verifyCallback(response) {
    if (response) {
      form.setFieldsValue({
        token: response,
      });
    }
  }

  return (
    <div className="login">
      <div className="login-left">
        <img src={background} />
      </div>
      <div className="login-right">
        {!isProduction ? (
          <Card title={<FormattedMessage id="auth.signin.modal.title" />} className="card-login-custom">
            <Form form={form} name="normal_login" className="login-form" onFinish={onFinish}>
              <label className="title">
                <span>
                  <FormattedMessage id="auth.signin.modal.input.field.label.email" />
                </span>
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
                <Input className="input-filed-label" type="email" />
              </Form.Item>
              <label className="title">
                <span>
                  <FormattedMessage id="auth.signin.modal.input.field.label.password" />
                </span>
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
                    message: <FormattedMessage id="auth.signin.modal.empty.message.password" />,
                  },
                ]}
              >
                <Input className="input-filed-label" type="password" />
              </Form.Item>

              <Form.Item
                name="token"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="auth.signin.modal.empty.message.captcha" />,
                  },
                ]}
              >
                <Recaptcha
                  zise="normal"
                  sitekey={siteKey}
                  render="explicit"
                  onloadCallback={recaptchaLoaded}
                  verifyCallback={verifyCallback}
                />
              </Form.Item>

              <Form.Item className="action">
                <Button size="middle" type="default" htmlType="submit" className="primary-button">
                  <FormattedMessage id="auth.signin.modal.button.login.label" />
                </Button>
              </Form.Item>
              <Form.Item className="link-href">
                <Link className="forgot-button" to={`${ROUTE.FORGOT_PASSWORD}`.replace("//", "/")} href="#">
                  <FormattedMessage id="auth.signin.modal.forgot.password.label" />
                </Link>
                <Link className="sign-up-link" to={`${ROUTE.SIGNUP}`.replace("//", "/")} href="#">
                  <FormattedMessage id="auth.signin.modal.signup.label" />
                </Link>
              </Form.Item>
            </Form>
          </Card>
        ) : (
          labelExpiredTime && (
            <div className="box-production">
              <span>
                <FormattedMessage id="pleaseWaitTo" /> {labelExpiredTime}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default injectIntl(SignInPage);
