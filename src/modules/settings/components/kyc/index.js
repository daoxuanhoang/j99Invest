  import "./style.scss";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { Row, Col, Form, Input, Button, Select, Upload, Modal } from "antd";
import { get } from "lodash";
import { LoadingOutlined, UploadOutlined, CameraOutlined } from "@ant-design/icons";

import { S3_IMAGE_ROOT } from "../../../../commons/constants";
import { dataURLtoFile } from "helpers/CommonHelper";
import CameraCapture from "commons/components/CameraCapture/index";

const dummyRequest = ({ onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

const DOCUMENT_IMAGE_TYPE = {
  FRONT: "FRONT",
  BACK: "BACK",
  SELFIE: "SELFIE",
};

const toDataURL = (url) =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

const renderImage = (url) => {
  return `${S3_IMAGE_ROOT}/${url}`;
};

const renderReloadBase64InputFile = (dataUri) => {
  const file = dataURLtoFile(dataUri);
  const result = {
    base64: dataUri,
    file: {
      originFileObj: file,
      status: "done",
      name: `image-reload-${new Date() / 1}`,
    },
  };
  return result;
};

const FormKYC = ({ kycForm, handleUpdateKyc, customerKyc }) => {
  const [frontImageData, setFrontImageData] = useState(null);
  const [backImageData, setBackImageData] = useState(null);
  const [selfieImageData, setSelfieImageData] = useState(null);

  const [isFrontImageError, setIsFrontImageError] = useState(false);
  const [isBackImageError, setIsBackImageError] = useState(false);
  const [isSelfieImageError, setIsSelfieImageError] = useState(false);

  const [uploadError, setUploadError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [identificationType, setIdentificationType] = useState(null);
  const [isOpenCamera, setIsOpenCamera] = useState(false);

  const { profile } = useSelector((state) => ({
    profile: state.profile,
  }));

  const uploadButton = (
    <div className="upload-button">
      {loading ? <LoadingOutlined /> : <UploadOutlined />}
      <div style={{ marginTop: 8 }}>
        <FormattedMessage id="setting.upload" />
      </div>
    </div>
  );

  const cameraButton = (
    <div className="upload-button">
      {loading ? <LoadingOutlined /> : <CameraOutlined />}
      <div style={{ marginTop: 8 }}>
        <FormattedMessage id="setting.camera" />
      </div>
    </div>
  );

  useEffect(() => {
    if (!customerKyc) {
      return;
    }
    const { front_card, selfie_with_card, back_card } = customerKyc || {
      front_card: null,
      selfie_with_card: null,
      back_card: null,
    };

    if (front_card) {
      toDataURL(renderImage(front_card)).then((dataUrl) => {
        setFrontImageData(renderReloadBase64InputFile(dataUrl));
      });
    }

    if (selfie_with_card) {
      toDataURL(renderImage(selfie_with_card)).then((dataUrl) => {
        setSelfieImageData(renderReloadBase64InputFile(dataUrl));
      });
    }

    if (back_card) {
      toDataURL(renderImage(back_card)).then((dataUrl) => {
        setBackImageData(renderReloadBase64InputFile(dataUrl));
      });
    }
  }, [customerKyc]);

  const fieldInput = [
    {
      name: "country",
      label: <FormattedMessage id="setting.kyc.country" />,
      rules: [
        {
          required: true,
          message: <FormattedMessage id="setting.required.message" />,
        },
      ],
      field: <Input />,
    },
    {
      name: "id_type",
      label: <FormattedMessage id="setting.kyc.type" />,
      rules: [
        {
          required: true,
          message: <FormattedMessage id="setting.required.message" />,
        },
      ],
      field: (
        <Select style={{ width: "100%" }}>
          <Select.Option value="PASSPORT">
            <FormattedMessage id="setting.passport" />
          </Select.Option>
          <Select.Option value="DRIVER_LICENSE">
            <FormattedMessage id="setting.driver.license" />
          </Select.Option>
          <Select.Option value="INDENTITY_CARD">
            <FormattedMessage id="setting.identity.card" />
          </Select.Option>
        </Select>
      ),
    },
    {
      name: "card_number",
      label: <FormattedMessage id="setting.kyc.card.number" />,
      rules: [
        {
          required: true,
          message: <FormattedMessage id="setting.required.message" />,
        },
      ],
      field: <Input />,
    },
  ];

  const fieldUploads = [
    {
      name: "selfie_with_card",
      label: <FormattedMessage id="setting.kyc.selfie" />,
      rules: [
        {
          required: false,
          message: <FormattedMessage id="setting.required.message" />,
        },
      ],
      field: (
        <>
          <Button
            className={`upload-file ${get(selfieImageData, "base64", null) ? `hiddenButton` : ""}`}
            onClick={() => {
              handleOnShowModal(DOCUMENT_IMAGE_TYPE.SELFIE);
            }}
            id="selfie_with_card"
          >
            {!get(selfieImageData, "base64", null) && (
              <div>
                {loading ? <LoadingOutlined /> : <img src={require("assets/images/icon/person-gray.png")} width={60} alt="" />}
                <div style={{}}>
                  <img src={require("assets/images/icon/arow-down.png")} width={10} alt="" />
                  <span className="ml-5">
                    <FormattedMessage id="setting.kyc.selfie" />
                  </span>
                </div>
              </div>
            )}
          </Button>
          <div
            onClick={() => {
              handleOnShowModal(DOCUMENT_IMAGE_TYPE.SELFIE);
            }}
          >
            {get(selfieImageData, "base64", null) && (
              <img src={get(selfieImageData, "base64", null)} alt="avatar" style={{ width: "100%" }} />
            )}
          </div>
        </>
      ),
    },
    {
      name: "front_card",
      label: <FormattedMessage id="setting.kyc.front.card" />,
      rules: [
        {
          required: false,
          message: <FormattedMessage id="setting.required.message" />,
        },
      ],
      field: (
        <>
          <Button
            className={`upload-file ${get(frontImageData, "base64", null) ? `hiddenButton` : ""}`}
            onClick={() => {
              handleOnShowModal(DOCUMENT_IMAGE_TYPE.FRONT);
            }}
            id="front_card"
          >
            {!get(frontImageData, "base64", null) && (
              <div>
                {loading ? <LoadingOutlined /> : <img src={require("assets/images/icon/front-card.png")} width={60} alt="" />}
                <div style={{}}>
                  <img src={require("assets/images/icon/arow-down.png")} width={10} alt="" />
                  <span className="ml-5">
                    <FormattedMessage id="setting.kyc.front.card" />
                  </span>
                </div>
              </div>
            )}
          </Button>
          <div
            onClick={() => {
              handleOnShowModal(DOCUMENT_IMAGE_TYPE.FRONT);
            }}
          >
            {get(frontImageData, "base64", null) && (
              <img src={get(frontImageData, "base64", null)} alt="avatar" style={{ width: "100%" }} />
            )}
          </div>
        </>
      ),
    },
    {
      name: "back_card",
      label: <FormattedMessage id="setting.kyc.back.card" />,
      rules: [
        {
          required: false,
          message: <FormattedMessage id="setting.required.message" />,
        },
      ],
      field: (
        <>
          <Button
            className={`upload-file ${get(backImageData, "base64", null) ? `hiddenButton` : ""}`}
            onClick={() => {
              handleOnShowModal(DOCUMENT_IMAGE_TYPE.BACK);
            }}
            id="back_card"
          >
            {!get(backImageData, "base64", null) && (
              <div>
                {loading ? <LoadingOutlined /> : <img src={require("assets/images/icon/back-card.png")} width={60} alt="" />}
                <div style={{}}>
                  <img src={require("assets/images/icon/arow-down.png")} width={10} alt="" />
                  <span className="ml-5">
                    <FormattedMessage id="setting.kyc.back.card" />
                  </span>
                </div>
              </div>
            )}
          </Button>
          <div
            onClick={() => {
              handleOnShowModal(DOCUMENT_IMAGE_TYPE.BACK);
            }}
          >
            {get(backImageData, "base64", null) && (
              <img src={get(backImageData, "base64", null)} alt="avatar" style={{ width: "100%" }} />
            )}
          </div>
        </>
      ),
    },
  ];

  const handleCloseModal = () => {
    setVisible(false);
    setIsOpenCamera(false);
  };

  const handleOnShowModal = (type) => {
    setIdentificationType(type);
    setVisible(true);
  };

  // const resetImages = () => {
  //   setFrontImageData(null);
  //   setBackImageData(null);
  //   setSelfieImageData(null);
  // };

  const handleOpenCamera = () => {
    setIsOpenCamera(true);
  };

  const handleCaptureShot = (data) => {
    switch (identificationType) {
      case DOCUMENT_IMAGE_TYPE.FRONT: {
        setFrontImageData(data);
        setIsFrontImageError(false);
        handleCloseModal();
        return;
      }
      case DOCUMENT_IMAGE_TYPE.BACK: {
        setBackImageData(data);
        setIsBackImageError(false);
        handleCloseModal();
        return;
      }
      case DOCUMENT_IMAGE_TYPE.SELFIE: {
        setSelfieImageData(data);
        setIsSelfieImageError(false);
        handleCloseModal();
        return;
      }
      default:
        handleCloseModal();
        return;
    }
  };

  const getBase64 = (event, img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(event, reader.result));
    reader.readAsDataURL(img);
  };

  const handleOnChangeImage = (e, type) => {
    if (e.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (e.file.status === "done") {
      getBase64(e, e.file.originFileObj, (e, imageUrl) => {
        setLoading(false);
        switch (type) {
          case DOCUMENT_IMAGE_TYPE.FRONT: {
            setFrontImageData({
              base64: imageUrl,
              file: {
                originFileObj: get(e, "file.originFileObj", null),
                status: "done",
                name: get(e, "file.name", null),
              },
            });
            setIsFrontImageError(false);
            return;
          }
          case DOCUMENT_IMAGE_TYPE.BACK: {
            setBackImageData({
              base64: imageUrl,
              file: {
                originFileObj: get(e, "file.originFileObj", null),
                status: "done",
                name: get(e, "file.name", null),
              },
            });
            setIsBackImageError(false);
            return;
          }
          case DOCUMENT_IMAGE_TYPE.SELFIE: {
            setSelfieImageData({
              base64: imageUrl,
              file: {
                originFileObj: get(e, "file.originFileObj", null),
                status: "done",
                name: get(e, "file.name", null),
              },
            });
            setIsSelfieImageError(false);
            return;
          }
          default:
            return;
        }
      });
      setVisible(false);
      return;
    }
  };

  const handleSubmit = ({ ...data }) => {
    if (frontImageData != null && backImageData != null && selfieImageData != null) {
      handleUpdateKyc(data, frontImageData, backImageData, selfieImageData);
      return;
    } else {
      if (frontImageData == null) {
        setIsFrontImageError(true);
      }
      if (backImageData == null) {
        setIsBackImageError(true);
      }
      if (selfieImageData == null) {
        setIsSelfieImageError(true);
      }
    }
  };

  return (
    <>
      {get(profile, "profileData.status_kyc", 0) === 1 && (
        <div className="form-title">
          <FormattedMessage id="setting.kyc.status" />
        </div>
      )}
      {get(profile, "profileData.status_kyc", 0) === 2 && (
        <div className="form-title">
          <FormattedMessage id="setting.kyc.waiting" />
        </div>
      )}
      {(get(profile, "profileData.status_kyc", 0) === 0 ||
        get(profile, "profileData.status_kyc", 0) === 3 ||
        get(profile, "profileData.status_kyc", 0) === null) && (
        <div>
          {customerKyc && customerKyc.note && (
            <Row gutter={[20, 0]}>
              <Col xl={17} lg={12} md={12} sm={24} xs={24}>
                <div className="highlight-note-kyc">
                  <h3>
                    <FormattedMessage id="setting.reject.reason" />
                  </h3>
                  <p>{customerKyc.note}</p>
                </div>
              </Col>
            </Row>
          )}
          <Form
            className="form-kyc form-authen"
            layout="vertical"
            onFinish={(data) => {
              handleSubmit(data, frontImageData, backImageData, selfieImageData);
            }}
            form={kycForm}
          >
            <Row gutter={[20, 0]}>
              {fieldInput.map((item, index) => (
                <Col key={"form-authen" + index} span={24}>
                  <div className="input-field">
                    <div className="input-field-label">
                      <label>
                        {item.label}
                        {get(item, "rules[0].required") ? (
                          <span>
                            <FormattedMessage id="setting.required.mark" />
                          </span>
                        ) : (
                          ""
                        )}
                      </label>
                    </div>
                    <Form.Item name={item.name} rules={item.rules}>
                      {item.field}
                    </Form.Item>
                  </div>
                </Col>
              ))}

              <Col span={24} className="uploads-file">
                <Row gutter={[20, 20]}>
                  {fieldUploads.map((item, index) => (
                    <Col key={index} xs={24} sm={12} md={8}>
                      <div class="uploads-square">
                        <div class="uploads-content">
                          <Form.Item name={item.name} rules={item.rules}>
                            {item.field}
                          </Form.Item>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col span={24}>
                <div className="upload-required-error-box">
                  <Row gutter={[20, 0]}>
                    <Col xl={8} lg={8} md={8} sm={12} xs={12}>
                      <p className={isSelfieImageError ? `required-error-show` : `required-error-off`}>
                        <FormattedMessage id="setting.required" />
                      </p>
                    </Col>
                    <Col xl={8} lg={8} md={8} sm={12} xs={12}>
                      <p className={isFrontImageError ? `required-error-show` : `required-error-off`}>
                        <FormattedMessage id="setting.required" />
                      </p>
                    </Col>
                    <Col xl={8} lg={8} md={8} sm={12} xs={12}>
                      <p className={isBackImageError ? `required-error-show` : `required-error-off`}>
                        <FormattedMessage id="setting.required" />
                      </p>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col className="box-btn" span={24}>
                <div className="btn-info">
                  <FormattedMessage id="setting.kyc.uploadfile.limit" />
                </div>
                <Form.Item className="btn-form btn-action">
                  <Button className="btn-pega" key="submit" type="primary" htmlType="submit">
                    <FormattedMessage id="setting.button.save" />
                  </Button>
                  {uploadError && (
                    <div className="box-error">
                      <img src={require("assets/images/icon/error-icon.png")} width={15} alt="" />
                      <FormattedMessage od="setting.kyc.uploadfile.errorMessage" />
                    </div>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      )}
      <Modal
        centered
        className="custom-modal"
        visible={visible}
        onCancel={handleCloseModal}
        footer={false}
        title={<>{<FormattedMessage id="setting.upload.identity.modal.title" />}</>}
      >
        {
          <div className="upload-modal-body">
            <div className="upload-file-container">
              <Upload
                customRequest={dummyRequest}
                showUploadList={false}
                accept=".jpg,.jpeg,.png"
                onChange={(e) => {
                  handleOnChangeImage(e, identificationType);
                }}
              >
                <Button>{uploadButton}</Button>
              </Upload>
            </div>
            <div className="camera-container">
              <Button
                className="upload-button"
                onClick={() => {
                  handleOpenCamera();
                }}
              >
                {cameraButton}
              </Button>
            </div>
          </div>
        }
      </Modal>
      <CameraCapture isOpen={isOpenCamera} handleCapture={handleCaptureShot} />
    </>
  );
};

export default injectIntl(FormKYC);
