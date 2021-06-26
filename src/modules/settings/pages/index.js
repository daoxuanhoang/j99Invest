import "./style.scss";
import React, { useEffect, useState, useCallback } from "react";
import { NavLink, useRouteMatch, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTE } from "commons/constants";
import BoxButton from "commons/components/Buttons/BoxButton";
import { FormattedMessage, injectIntl } from "react-intl";
import FormPersonal from "../components/personal";
import FormAuththen from "../components/authentication";
import FormKYC from "../components/kyc";
import FormSecurityV2 from "../components/SecurityV2";
import { getProfile, updateProfile, updatePassword, updateEmail } from "modules/profile/redux/actions";
import { updateKyc, registerAuthy } from "../redux/actions";
import { Col, Form, Row } from "antd";
import moment from "moment";
import { isEmpty } from "lodash";

const Setting = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.profile.profileData);
  const { path, url } = useRouteMatch();
  const [formProfile] = Form.useForm();
  const [emailForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [kycForm] = Form.useForm();
  const [securityForm] = Form.useForm();
  const [profileInfo, setProfileInfo] = useState({});

  const { customerKyc } = userInfo || { customerKyc: null };
  // form profile
  useEffect(() => {
    if (!userInfo) return {};
    // dispatch(getProfile(userInfo.code));
    formProfile.setFieldsValue({
      first_name: userInfo.first_name || "",
      last_name: userInfo.last_name || "",
      gender: userInfo.gender,
      address: userInfo.address,
      country: userInfo.country,
      email: userInfo.email,
      phone_number: userInfo.phone_number,
      dob: userInfo.dob ? moment(userInfo.dob) : null,
    });
    securityForm.setFieldsValue({
      countryCode: userInfo?.authy?.country_code,
      phone_number: userInfo?.authy?.phone,
    });
  }, [dispatch, userInfo, formProfile, securityForm]);

  const reshapeData = useCallback(
    (profile) => {
      const profileHeaderInfo = {
        name: `${profile.last_name || ""} ${profile.first_name || ""}`,
        avatar: profile.image,
        id: profile.code,
        dispatch: dispatch,
      };
      const finalData = {
        profileHeaderInfo,
      };
      setProfileInfo(finalData);
    },
    [dispatch]
  );

  useEffect(() => {
    if (!isEmpty(userInfo)) {
      reshapeData(userInfo);
    }
  }, [userInfo, reshapeData]);

  useEffect(() => {
    if (!customerKyc) {
      return;
    }
    kycForm.setFieldsValue({
      ...customerKyc,
    });
  }, [kycForm, customerKyc]);

  // update form Profile
  const handleUpdateProfile = (data) => {
    const dateOfBirth = data?.dob;
    if (dateOfBirth) {
      data.dob = dateOfBirth.format("YYYY-MM-DD");
    }
    dispatch(updateProfile(data));
  };

  // update form Email
  const handleUpdateEmail = (data) => {
    dispatch(updateEmail(data));
  };

  //update from Password
  const handleUpdatePassword = (data) => {
    dispatch(updatePassword(data));
  };

  const handleUpdateKyc = (formData, frontImageData, backImageData, selfieImageData) => {
    const data = {
      formData,
      frontImageData,
      backImageData,
      selfieImageData,
    };

    dispatch(
      updateKyc(data, () => {
        dispatch(getProfile());
      })
    );
  };

  const handleRegisterAuthy = (data) => {
    dispatch(
      registerAuthy(data, () => {
        // securityForm.resetFields();
      })
    );
  };

  return (
    <section className="setting-page">
      <div className="setting-body">
        <Row className="setting-header mt-5" gutter={15} justify="center">
          <Col className="personal-detail-setting-box" xl={4} lg={6} md={6} sm={8} xs={12}>
            <NavLink to={`${url}${ROUTE.SETTING_PERSONAL}`} className="box-btn" activeClassName="btn-active">
              <BoxButton
                customClass="box-btn-item"
                icon={require("assets/images/icon/personal.png")}
                title={<FormattedMessage id="setting.title.personal" />}
                description={<FormattedMessage id="setting.description.personal" />}
              />
            </NavLink>
          </Col>
          <Col className="auth-setting-box" xl={4} lg={6} md={6} sm={8} xs={12}>
            <NavLink to={`${url}${ROUTE.SETTING_AUTHE}`} className="box-btn" activeClassName="btn-active">
              <BoxButton
                customClass="box-btn-item"
                icon={require("assets/images/icon/auth.png")}
                title={<FormattedMessage id="setting.title.auth" />}
                description={<FormattedMessage id="setting.description.auth" />}
              />
            </NavLink>
          </Col>
          <Col className="security-setting-box" xl={4} lg={6} md={6} sm={8} xs={12}>
            <NavLink to={`${url}${ROUTE.SETTING_SECURITY}`} className="box-btn" activeClassName="btn-active">
              <BoxButton
                title={<FormattedMessage id="setting.title.twoFactor" />}
                customClass="box-btn-item"
                icon={require("assets/images/icon/security.png")}
                description={<FormattedMessage id="setting.description.security" />}
              />
            </NavLink>
          </Col>
          <Col className="kyc-setting-box" xl={4} lg={6} md={6} sm={8} xs={12}>
            <NavLink to={`${url}${ROUTE.SETTING_KYC}`} className="box-btn" activeClassName="btn-active">
              <BoxButton
                customClass="box-btn-item"
                icon={require("assets/images/icon/security.png")}
                title={<FormattedMessage id="setting.title.kyc" />}
                description={<FormattedMessage id="setting.description.kyc" />}
              />
            </NavLink>
          </Col>
        </Row>
        <Row className="setting-content ml-3 mr-3 mb-3" gutter={0}>
          <Col xl={24} lg={24} md={24} xs={24} sm={24}>
            <Switch>
              <Route exact path={`${path}${ROUTE.SETTING_PERSONAL}`}>
                <FormPersonal
                  {...{
                    handleUpdateProfile,
                    formProfile,
                    userInfo,
                    profileInfo,
                  }}
                />
              </Route>
              <Route exact path={`${path}${ROUTE.SETTING_AUTHE}`}>
                <FormAuththen
                  {...{
                    emailForm,
                    passwordForm,
                    handleUpdateEmail,
                    handleUpdatePassword,
                  }}
                />
              </Route>

              <Route exact path={`${path}${ROUTE.SETTING_SECURITY}`}>
                <FormSecurityV2
                  {...{
                    securityForm,
                    handleRegisterAuthy,
                  }}
                />
              </Route>
              <Route exact path={`${path}${ROUTE.SETTING_KYC}`}>
                <FormKYC
                  {...{
                    kycForm,
                    handleUpdateKyc,

                    customerKyc,
                  }}
                />
              </Route>
            </Switch>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default injectIntl(Setting);
