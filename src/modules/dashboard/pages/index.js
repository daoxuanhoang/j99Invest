import "./styles.scss";
import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { injectIntl } from "react-intl";
import { getCountCommission, getCountMembers } from "modules/networks/redux/actions";
import { get, isEmpty } from "lodash";
import ReferalsCard from "commons/components/ReferalsCard/index";
import BlogReviews from "../components/BountyList/BountyItem";
import { getListStakeDashboard } from "../redux/actions";
import MyBalance from "modules/wallets/pages";
import { getListBounty } from "modules/bountySPW/redux/actions";
import InviteFriendIcon from "assets/images/three-person.png";
import VideoReviewIcon from "assets/images/watch.png";
import WebinarBountyIcon from "assets/images/video.png";
import BlogBountyIcon from "assets/images/note.png";
import ConferenceBountyIcon from "assets/images/scales.png";

const Index = ({ intl }) => {
  const dispatch = useDispatch();
  const [, setDataStake] = useState(null);
  const { profileData } = useSelector((state) => ({
    profileData: isEmpty(state.profile.profileData) ? state.auth : state.profile.profileData,
  }));
  const { listBounty } = useSelector((state) => state.bounty);

  // useEffect(() => {
  //   dispatch(
  //     getCountMembers({
  //       customer_id: profileData?.userInfo?.id,
  //     })
  //   );
  //   dispatch(getCountCommission());
  //   dispatch(
  //     getListStakeDashboard(null, (value) => {
  //       setDataStake(value);
  //     })
  //   );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch]);
  useEffect(() => {
    dispatch(getListBounty({}, () => {}));
  }, []);

  const listBlogReviews = [
    {
      icon: InviteFriendIcon,
      title: intl.formatMessage({ id: "Invite Friends" }),
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
      icon: VideoReviewIcon,
      title: intl.formatMessage({ id: "Video Review" }),
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
      icon: BlogBountyIcon,
      title: intl.formatMessage({ id: "Blog Bounty" }),
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
      icon: WebinarBountyIcon,
      title: intl.formatMessage({ id: "Webinar Bounty" }),
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
      icon: ConferenceBountyIcon,
      title: intl.formatMessage({ id: "Conference Bounty" }),
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
            <Row gutter={[0, 40]} className="transaction">
              <Col lg={24}>
                <MyBalance />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default injectIntl(Index);
