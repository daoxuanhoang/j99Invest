import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListBounty } from "../../bountySPW/redux/actions";
import { injectIntl } from "react-intl";
import { get } from "lodash";
import { Link } from "react-router-dom";
import { Col, Row } from "antd";
import "./styles.scss";
import BountyList from "../components/BountyList/BountyList";
import inviteFriends from "../../../assets/images/three-person.png";
import blogBounty from "../../../assets/images/note.png";
import webinarBounty from "../../../assets/images/video.png";
import conferenceBounty from "../../../assets/images/scales.png";
import videoReview from "../../../assets/images/watch.png";
import ReferralCard from "../../../commons/components/ReferalsCard/index"



const Index = ({ intl }) => {
    const dispatch = useDispatch();
    const { listBounty } = useSelector((state) => state.bounty);
    console.log(listBounty);
    useEffect(() => {
        dispatch(getListBounty({}, () => { }));
    }, [])
    const showListBounty = [
        {
            icon: inviteFriends,
            title: get(listBounty, "[0].title", null),
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
            icon: blogBounty,
            title: get(listBounty, "[1].title", null),
            price:
                get(listBounty, "[1].status") === 1
                    ? intl.formatMessage({ id: "Submitted" })
                    : get(listBounty, "[1].status") === 2
                        ? intl.formatMessage({ id: "complete" })
                        : "Get 10SPW",
            status: get(listBounty, "[1].status") === 1 || get(listBounty, "[1].status") === 2,
            linkTo: "/bounty-spw/invite",
        },
        {
            icon: webinarBounty,
            title: intl.formatMessage({ id: "Webinar Bounty" }),
            price:
                get(listBounty, "[2].status") === 1
                    ? intl.formatMessage({ id: "Submitted" })
                    : get(listBounty, "[2].status") === 2
                        ? intl.formatMessage({ id: "complete" })
                        : "Get 10SPW",
            status: get(listBounty, "[2].status") === 1 || get(listBounty, "[2].status") === 2,
            linkTo: "/bounty-spw/invite",
        },
        {
            icon: conferenceBounty,
            title: get(listBounty, "[3].title", null),
            price:
                get(listBounty, "[3].status") === 1
                    ? intl.formatMessage({ id: "Submitted" })
                    : get(listBounty, "[3].status") === 2
                        ? intl.formatMessage({ id: "complete" })
                        : "Get 10SPW",
            status: get(listBounty, "[3].status") === 1 || get(listBounty, "[3].status") === 2,
            linkTo: "/bounty-spw/invite",
        },
        {
            icon: videoReview,
            title: get(listBounty, "[4].title", null),
            price:
                get(listBounty, "[4].status") === 1
                    ? intl.formatMessage({ id: "Submitted" })
                    : get(listBounty, "[4].status") === 2
                        ? intl.formatMessage({ id: "complete" })
                        : "Get 10SPW",
            status: get(listBounty, "[4].status") === 1 || get(listBounty, "[4].status") === 2,
            linkTo: "/bounty-spw/invite",
        }
    ]
    return (
        <Row className="container">
            <Col span={24}>
                <div className="container-content">
                    <Row gutter={[0, 40]} justify="center">
                        <Col className="list-item" span={24}>
                            <div className="item-map">
                                {showListBounty.map((ele, key) => {
                                    return (
                                        <div className="bounty-item" key={key}>
                                            <Link to={!ele.status ? ele.linkTo : "#"} >
                                                <BountyList {...ele} />
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={[0, 40]} className="mt-40">
                        <Col className="networks-ref" span={40}>
                            <ReferralCard/>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    );
}
export default injectIntl(Index);