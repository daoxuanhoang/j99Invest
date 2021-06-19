import "./styles.scss";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card } from "antd";
import { FormattedMessage, injectIntl } from "react-intl";
import { toast } from "react-toastify";
import { get } from "lodash";
import InputCopy from "../FileCopy/InputCopy/index";
import { inviteFriend } from "../../../modules/networks/redux/actions";
import { MIN_STAKE_OF_REF } from "../../constants/index";
import person from "../../../assets/images/icon/person.png";

const Index = ({ intl }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.profile.profileData);
  const [showModalInvite, setShowModalInvite] = useState(false);
  // Handle ref
  const link = `${process.env.REACT_APP_USER_URL}/signup?sponsorkey=${get(userInfo, "sponsorKey")}`;
  const [refCode, setRefCode] = useState("");
  const [orderCode, setOrderCode] = useState("");

  useEffect(() => {
    if (userInfo.invest_stake < MIN_STAKE_OF_REF) {
      setRefCode(intl.formatMessage({ id: "you.need.min.100.referals" }));
      setOrderCode(intl.formatMessage({ id: "you.need.min.100.referals" }));
    } else {
      setRefCode(link);
      setOrderCode(get(userInfo, "sponsorKey"));
    }
  }, [intl, link, userInfo]);
  // End Handle ref

  const onCloseModalInvite = () => {
    setShowModalInvite(false);
  };

  const onInviteFriend = (values) => {
    dispatch(
      inviteFriend(values, () => {
        onCloseModalInvite();
      })
    );
  };

  const copyReferralLink = (code) => {
    navigator.clipboard.writeText(code);
    toast(
      `${intl.formatMessage({
        id: "setting.invite.modal.messageCopyLink",
      })} ${code}`
    );
  };

  return (
    <>
      <Card className="card-ref">
        <Row gutter={[25, 25]} style={{ marginBottom: 0 }}>
          <Col sm={12} xs={24}>
            <div className="ref-box w-100">
              <img className="mr-5" src={person} width={30} height={30} />
              <InputCopy
                code={refCode}
                // accessCopy={userInfo?.invest_stake >= MIN_STAKE_OF_REF}
                link={userInfo?.invest_stake < MIN_STAKE_OF_REF ? "/stake" : null}
              />
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default injectIntl(Index);
