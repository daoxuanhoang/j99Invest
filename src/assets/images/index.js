import "./style.scss";
import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { injectIntl } from "react-intl";
import { getCountCommission, getCountMembers } from "modules/networks/redux/actions";
import { get, isEmpty } from "lodash";
import ReferalsCard from "../../../commons/components/CardCommons/ReferalsCard";
import BlogReviews from "../components/blogReviews/index";
import { getListStakeDashboard } from "../redux/actions";
import MyBalance from "modules/wallets/pages";
import { getListBounty } from "../../BountySpw/redux/actions";

const Index = ({ intl }) => {
  const dispatch = useDispatch();
  const [, setDataStake] = useState(null);
  const { profileData } = useSelector((state) => ({
    profileData: isEmpty(state.profile.profileData) ? state.auth : state.profile.profileData,
  }));
  const { listBounty } = useSelector((state) => state.bounty);
  useEffect(() => {
    dispatch(
      getCountMembers({
        customer_id: profileData?.userInfo?.id,
      })
    );
    dispatch(getCountCommission());
    dispatch(
      getListStakeDashboard(null, (value) => {
        setDataStake(value);
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  useEffect(() => {
    dispatch(getListBounty({}, () => {}));
  }, []);
  const listBlogReviews = [
    {
      icon: require("assets/images/three-person.png"),
      title: intl.formatMessage({ id: "dashboard.card.invite.friend" }),
      price:
        get(listBounty, "[0].status") === 1
          ? intl.formatMessage({ id: "Submitted" })
          : get(listBounty, "[0].status") === 2
          ? intl.formatMessage({ id: "complete" })
          : "Get 10SPW",
      status: get(listBounty, "[0].status") === 1 || get(listBounty, "[0].status") === 2,
      linkTo: "/bounty-spw/invite",
    },
    {
      icon: require("assets/images/watch.png"),
      title: intl.formatMessage({ id: "dashboard.card.video.review" }),
      price:
        get(listBounty, "[4].status") === 1
          ? intl.formatMessage({ id: "Submitted" })
          : get(listBounty, "[4].status") === 2
          ? intl.formatMessage({ id: "complete" })
          : "Get 20SPW",

      status: get(listBounty, "[4].status") === 1 || get(listBounty, "[4].status") === 2,
      linkTo: "/bounty-spw/video-review",
    },
    {
      icon: require("assets/images/note.png"),
      title: intl.formatMessage({ id: "dashboard.card.blog.bounty" }),

      price:
        get(listBounty, "[1].status") === 1
          ? intl.formatMessage({ id: "Submitted" })
          : get(listBounty, "[1].status") === 2
          ? intl.formatMessage({ id: "complete" })
          : "Get 50SPW",

      status: get(listBounty, "[1].status") === 1 || get(listBounty, "[1].status") === 2,
      linkTo: "/bounty-spw/blog",
    },
    {
      icon: require("assets/images/video.png"),
      title: intl.formatMessage({ id: "dashboard.card.webinar.bounty" }),

      price:
        get(listBounty, "[2].status") === 1
          ? intl.formatMessage({ id: "Submitted" })
          : get(listBounty, "[2].status") === 2
          ? intl.formatMessage({ id: "complete" })
          : "Get 50SPW",

      status: get(listBounty, "[2].status") === 1 || get(listBounty, "[2].status") === 2,
      linkTo: "/bounty-spw/webinar",
    },
    {
      icon: require("assets/images/scales.png"),
      title: intl.formatMessage({ id: "dashboard.card.conference.bounty" }),

      price:
        get(listBounty, "[3].status") === 1
          ? intl.formatMessage({ id: "Submitted" })
          : get(listBounty, "[3].status") === 2
          ? intl.formatMessage({ id: "complete" })
          : "Get 1000SPW",

      status: get(listBounty, "[3].status") === 1 || get(listBounty, "[3].status") === 2,
      linkTo: "/bounty-spw/conference",
    },
  ];
  return (
    <>
      <Row className="networks-container">
        <Col span={24}>
          <div className="networks-content">
            <Row gutter={[0, 40]} justify="center">
              <Col className="blog-reviews-list" span={24}>
                <div className="row-ant-blog">
                  {listBlogReviews.map((item, key) => (
                    <div className="blog-reviews mr-15" key={"review-box-" + key}>
                      <Link to={!item.status ? item.linkTo : "#"}>
                        <BlogReviews {...item} />
                      </Link>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
            <Row gutter={[0, 40]} className="mt-40">
              <Col className="networks-ref" span={24}>
                <ReferalsCard />
              </Col>
            </Row>
            <Row gutter={[16, 40]}>
              <MyBalance />
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default injectIntl(Index);
