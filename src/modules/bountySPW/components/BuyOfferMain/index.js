import React from "react";
import { Link } from "react-router-dom";
import { injectIntl, FormattedMessage } from "react-intl";
import { Row, Col } from "antd";
import "./styles.scss";
import { ROUTE } from "commons/constants";
import GiftIcon from "assets/images/icon/gif.png";
import InviteIcon from "assets/images/icon/invite-icon.png";
import GifIcon from "assets/images/icon/gif.png";
import GroupPersonIcon from "assets/images/icon/group-persion.png";
import NoteIcon from "assets/images/icon/note.png";
import PersonIcon from "assets/images/icon/person2.png";
import GroupMuIcon from "assets/images/icon/group-commu.png";

const BuyOffer = () => {
  return (
    <div className="buy-offer-container">
      <Row gutter={[30, 30]}>
        <Col xs={24} md={12}>
          <div className="buy-offer-item ">
            <div className="left mr-20">
              <div className="header">
                <h3>
                  <FormattedMessage id="invest.friends" />
                </h3>
              </div>
              <div className="content">
                <span className="list-botton">
                  <Link to={`${ROUTE.BOUNTY_SPW}${ROUTE.BOUNTY_SPW_INVITE}`}>
                    <img src={GiftIcon} alt="" /> <FormattedMessage id="invest.friends.title" />
                  </Link>
                </span>
              </div>
            </div>
            <div className="right">
              <Link to={`${ROUTE.BOUNTY_SPW}${ROUTE.BOUNTY_SPW_INVITE}`}>
                <img src={InviteIcon} width={70} alt="" />
              </Link>
            </div>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className="buy-offer-item ">
            <div className="left mr-20">
              <div className="header">
                <h3>
                  <FormattedMessage id="webinar.bounty" />
                </h3>
              </div>
              <div className="content">
                <span className="zoom-top">
                  <FormattedMessage id="webinar.bounty.content" />
                </span>
                <span className="list-botton">
                  <Link to={`${ROUTE.BOUNTY_SPW}${ROUTE.BOUNTY_SPW_WEBINAR}`}>
                    <img src={GifIcon} alt="" /> <FormattedMessage id="webinar.bounty.title" />
                  </Link>
                </span>
              </div>
            </div>
            <div className="right">
              <Link to={`${ROUTE.BOUNTY_SPW}${ROUTE.BOUNTY_SPW_WEBINAR}`}>
                <img src={GroupPersonIcon} width={70} alt="" />
              </Link>
            </div>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className="buy-offer-item ">
            <div className="left mr-20">
              <div className="header">
                <h3>
                  <FormattedMessage id="blog.bounty" />
                </h3>
              </div>
              <div className="content">
                <span className="list-botton">
                  <Link to={`${ROUTE.BOUNTY_SPW}${ROUTE.BOUNTY_SPW_BLOG}`}>
                    <img src={GifIcon} alt="" /> <FormattedMessage id="blog.bounty.title" />
                  </Link>
                </span>
              </div>
            </div>
            <div className="right">
              <Link to={`${ROUTE.BOUNTY_SPW}${ROUTE.BOUNTY_SPW_BLOG}`}>
                <img src={NoteIcon} width={70} alt="" />
              </Link>
            </div>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className="buy-offer-item ">
            <div className="left mr-20">
              <div className="header">
                <h3>
                  <FormattedMessage id="conference.bounty" />
                </h3>
              </div>
              <div className="content">
                <span className="list-botton">
                  <Link to={`${ROUTE.BOUNTY_SPW}${ROUTE.BOUNTY_SPW_CONFERENCE}`}>
                    <img src={GifIcon} alt="" /> <FormattedMessage id="conference.bounty.title" />
                  </Link>
                </span>
              </div>
            </div>
            <div className="right">
              <Link to={`${ROUTE.BOUNTY_SPW}${ROUTE.BOUNTY_SPW_CONFERENCE}`}>
                <img src={PersonIcon} width={70} alt="" />
              </Link>
            </div>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className="buy-offer-item ">
            <div className="left mr-20">
              <div className="header">
                <h3>
                  <FormattedMessage id="video.Review" />
                </h3>
              </div>
              <div className="content">
                <span className="zoom-top">
                  <FormattedMessage id="video.Review.content" />
                </span>
                <span className="list-botton">
                  <Link to={`${ROUTE.BOUNTY_SPW}${ROUTE.BOUNTY_SPW_VIDEO_REVIEW}`}>
                    <img src={GifIcon} alt="" /> <FormattedMessage id="video.Review.title" />
                  </Link>
                </span>
              </div>
            </div>
            <div className="right">
              <Link to={`${ROUTE.BOUNTY_SPW}${ROUTE.BOUNTY_SPW_VIDEO_REVIEW}`}>
                <img src={GroupMuIcon} width={70} alt="" />
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default injectIntl(BuyOffer);
