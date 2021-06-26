import "./index.scss";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Avatar, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getVerifyCode } from "modules/settings/redux/actions";
import { get } from "lodash";
import CopyOutlined from "@ant-design/icons/lib/icons/CopyOutlined";
import { toast } from "react-toastify";
import { ROOT_API_URL, MIN_STAKE_OF_REF } from "commons/constants";
import Cookies from "js-cookie";
import { updatedAvatar } from "modules/auth/redux/actions";
import { FormattedMessage, injectIntl } from "react-intl";
import { getProfile } from "modules/profile/redux/actions";

const ULR_LINK_REF = `${process.env.REACT_APP_USER_URL}/signup?sponsorkey=`;

export default injectIntl(function ProfileHeader({ avatar, name, dispatch, authUser, intl }) {
  const userInfo = useSelector((state) => state.profile.profileData);

  const sponsorKey = get(authUser, "sponsorKey", "");
  const linkRef = `${ULR_LINK_REF}${sponsorKey}`;

  useEffect(() => {
    if (dispatch) {
      dispatch(getVerifyCode());
    }
  }, [dispatch]);

  const copyHealthCode = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(linkRef);
    toast(
      `${intl.formatMessage({
        id: "toast.setting.personal.copyHealthCode",
      })} ${linkRef}`
    );
  };

  const copyVerifyCode = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(sponsorKey);
    toast(
      `${intl.formatMessage({
        id: "toast.setting.personal.copyVerifyCode",
      })} ${sponsorKey}`
    );
  };

  const checkFile = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (isJpgOrPng) {
      if (isLt2M) {
      } else {
        toast.error(
          intl.formatMessage({
            id: "maxSizeImage",
          })
        );
      }
    } else {
      toast.error(
        intl.formatMessage({
          id: "onlyFile",
        })
      );
    }
    return isJpgOrPng && isLt2M;
  };

  const customRequest = ({ onSuccess, onError, file }) => {
    if (checkFile(file)) {
      const data = new FormData();
      data.append("image", file);

      fetch(`${ROOT_API_URL}/update-profile`, {
        method: "POST",
        body: data,
        headers: { Authorization: Cookies.get("token") },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.status_code === 200) {
            sessionStorage.setItem("USER_INF", JSON.stringify(response.data));
            dispatch(updatedAvatar(response.data));
            dispatch(getProfile());
            toast.info(
              intl.formatMessage({
                id: "changeAvatar",
              })
            );
          }
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  };

  return (
    <>
      <div className="profile-header-container">
        <div className="profile-info-wrapper">
          <div className="profile-avatar gx-profile-banner-avatar">
            <Avatar className="profile-img" alt="..." src={avatar} icon={<UploadOutlined />} size={150} />
            <Upload accept=".jpg,.jpeg,.png" showUploadList={false} customRequest={customRequest}>
              <div className="mask-upload">
                <i className="icon icon-upload" />
              </div>
            </Upload>
          </div>
          <div className="profile-info">
            <div className="profile-name">{name}</div>
            <div className="profile-email">{userInfo?.email || ""}</div>
            {userInfo?.invest_stake >= MIN_STAKE_OF_REF && (
              <>
                <div className="profile-id">
                  <a href={linkRef}>
                    <FormattedMessage id="setting.personal.linkRef" />
                  </a>
                  <CopyOutlined onClick={copyHealthCode} />
                </div>
                <div className="profile-verify-code">
                  {sponsorKey && (
                    <p className="gx-py-2">
                      <FormattedMessage id="setting.personal.refCode" />
                      {": "} {sponsorKey}
                      <CopyOutlined onClick={copyVerifyCode} />
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
});
