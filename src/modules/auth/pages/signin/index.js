import React, { useEffect, useState } from "react";
import Login from "../../../../assets/images/signin/Group505.png";
import "./styles.scss";
import { Card, Button, Input, Form } from "antd";
import { FormattedMessage, injectIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { postLogin } from "../../redux/actions";
import { updateTimer } from "../../../../helpers/CommonHelper";
import { EXPIRED_TIME_SIGN_IN, PRODUCTION } from "../../../../commons/constants/index";
import Recaptcha from "react-recaptcha";
export const regexEmail = () => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@[^|\;:_=+{}'",.?/~`!@#$%^&*<>()[\]\\-]((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
};

const siteKey = process.env.REACT_APP_GOOGLE_SITE_KEY;
const SignInPage = ({ location, history }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isProduction, setIsProduction] = useState(process.env.REACT_APP_ENV === PRODUCTION);
  const [labelExpiredTime, setLabelExpiredTime] = useState("");
  const onFinish = (values) => {
    dispatch(
      postLogin(values)
    )
  }
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
      console.log(response);
      form.setFieldsValue({
        token: response,
      });
    }
  }
  return (
    <div className="login">
      <div className="login-left">
        <img src={Login} />
      </div>
      <div className="login-right">
        {
          !isProduction ? (
            <Card title={<FormattedMessage id="auth.signup.modal.login.label" />} className="card-login-custom">
              <Form form={form} name="normal_login" className="login-form" onFinish={onFinish} >
                <label className="title">
                  <span><FormattedMessage id="auth.signin.modal.input.filed.label.email" /></span>
                  <span>{" "}<FormattedMessage id="auth.signin.modal.required.mark" /></span>
                </label>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="auth.signin.modal.empty.message.email" />
                    },
                    {
                      pattern: regexEmail(),
                      message: <FormattedMessage id="emailWrong" />
                    }
                  ]}
                >
                  <Input className="input-filed-label" type="text" />
                </Form.Item>
                <label className="title">
                  <span><FormattedMessage id="auth.signup.modal.input.filed.label.password" /></span>
                </label>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="auth.signin.modal.empty.message.password" />
                    }
                  ]}
                >
                  <Input className="input-filed-label" type="password" />
                </Form.Item>

                {/* captcha */}
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
                  <Button
                    size="middle"
                    type="default"
                    htmlType="submit"
                    className="primary-button"
                  >
                    <FormattedMessage id="auth.signup.modal.login.label" />
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
          ) : (
            labelExpiredTime && (
              <div className="box-production">
                <FormattedMessage id="pleaseWaitTo" /> {labelExpiredTime}
              </div>
            )
          )
        }
      </div>
    </div>
  );
};

export default injectIntl(SignInPage);
