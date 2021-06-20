import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import { injectIntl } from "react-intl";
import { ROUTE } from "commons/constants";

import BuyOfferMain from "../components/BuyOfferMain";
import Invite from "../components/Invite";
import Blog from "../components/Blog";
import VideoReview from "../components/VideoReview";
import Webinar from "../components/Webinar";
import Conference from "../components/Conference";
import "./styles.scss";
import { getListBounty } from "../redux/actions";

const BountySpw = () => {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const { listBounty } = useSelector((state) => state.bounty);

  useEffect(() => {
    dispatch(getListBounty({}, () => { }));
  }, []);

  return (
    <section className="buyoffer-page">
      {
      listBounty && ( <Switch>
        <Route exact path={`${path}`}>
          <BuyOfferMain />
        </Route>
        <Route exact path={`${path}${ROUTE.BOUNTY_SPW_INVITE}`}>
          <Invite
            source=
            {
              // listBounty?.[0]
              // listBounty ? listBounty[0] : []
              listBounty[0]
               // listBounty && listBounty[0]
            }
          />
        </Route>
        <Route exact path={`${path}${ROUTE.BOUNTY_SPW_BLOG}`}>
          <Blog source={listBounty[1]} />
        </Route>
        <Route exact path={`${path}${ROUTE.BOUNTY_SPW_VIDEO_REVIEW}`}>
          <VideoReview source={listBounty[4]} />
        </Route>
        <Route exact path={`${path}${ROUTE.BOUNTY_SPW_WEBINAR}`}>
          <Webinar source={listBounty[2]} />
        </Route>
        <Route exact path={`${path}${ROUTE.BOUNTY_SPW_CONFERENCE}`}>
          <Conference source={listBounty[3]} />
        </Route>
      </Switch>)}
    </section>
  );
};

export default injectIntl(BountySpw);
