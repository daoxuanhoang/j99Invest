import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { injectIntl } from "react-intl";

import { Modal, Form, Input } from "antd";
import QRcode from "qrcode.react";
import "./style.scss";
import { updateToggleAuthyModal, updateAuthVerify, loginSuccess } from "modules/auth/redux/actions";
import { setCookies } from "../../redux/sagas";
import { CACHE_LANGUAGE, OPTIONS_LANG } from "language/config";
import { ROUTE, CACHE_USER_INFO, LOGIN, TRANSACTION, EMAIL, CHANGE_STATUS } from "commons/constants";
import { get } from "lodash";
import { useHistory } from "react-router-dom";
import { getProfile } from "modules/profile/redux/actions";
import { REGISTER } from "../../../../commons/constants/index";
import InputCopy from "commons/components/FielCopy/InputCopy";

const AuthyModal = ({ title = "Verify", intl }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  //   const profileData = useSelector((state) => state.profile.profileData);
  const { dataOpenModalAuthy } = useSelector((state) => state.auth);
  const { typeCallApi, data: authyReponseData } = dataOpenModalAuthy || {
    typeCallApi: null,
    data: null,
  };

  const [authyForm] = Form.useForm();

  const renderTitleModal = (data) => {
    const { typeCallApi } = data || {};
    switch (typeCallApi) {
      case LOGIN:
        return "Verify login";
      case EMAIL:
      case TRANSACTION:
        return "Verify";
      default:
        return "Verify";
    }
  };

  const handleSwithActionAuthySuccess = (data) => {
    const { typeCallApi } = data;
    switch (typeCallApi) {
      case LOGIN:
        setCookies(get(data, "data.token"), () => {
          history.push(ROUTE.HOME);
        });
        localStorage.setItem(CACHE_USER_INFO, JSON.stringify(data.data));
        localStorage.setItem(CACHE_LANGUAGE, OPTIONS_LANG[0].key);
        dispatch(loginSuccess(data.data));
        break;
      case REGISTER:
      case CHANGE_STATUS:
        //TO-DO
        dispatch(getProfile());
        break;

      default:
        break;
    }
    dispatch(updateToggleAuthyModal(null));
  };

  const handleOk = () => {
    const { code } = authyForm.getFieldsValue();

    authyForm.validateFields();
    const body = {
      ...dataOpenModalAuthy,
      code,
    };

    dispatch(
      updateAuthVerify(body, (value) => {
        handleSwithActionAuthySuccess(value);
      })
    );
    authyForm.resetFields();
  };

  const handleCancel = () => {
    dispatch(updateToggleAuthyModal(null));
  };

  return (
    <>
      <Modal
        className="custom-modal"
        visible={!!dataOpenModalAuthy}
        onOk={handleOk}
        onCancel={handleCancel}
        title={<>{renderTitleModal(dataOpenModalAuthy) || title}</>}
        footer={
          <span key="submit" type="link" className="modal-footer-label" onClick={handleOk}>
            Confirm !{"   "}
          </span>
        }
      >
        <div className="canvas-qrcode">
          {get(authyReponseData, "imageUrl", null) !== null ? (
            <img src={get(authyReponseData, "imageUrl")} alt="qr-code" />
          ) : (
            get(authyReponseData, "code", null) !== null && (
              <QRcode fgColor="#2b024e" size={160} value={get(authyReponseData, "code", null)} />
            )
          )}
        </div>
        <div className="address-coppy">
          {get(authyReponseData, "code", null) !== null && <InputCopy code={get(authyReponseData, "code", null)} />}
        </div>
        <Form preserve={false} name="normal_login" form={authyForm} className="login-form">
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: "please.code",
                }),
              },
            ]}
          >
            <Input name="code" size="large" placeholder={`Ex: 1234567   `} />
          </Form.Item>
          {typeCallApi && typeCallApi !== EMAIL && (
            <span className="get-code">
              {intl.formatMessage({
                id: "getCode",
              })}
            </span>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default injectIntl(AuthyModal);
