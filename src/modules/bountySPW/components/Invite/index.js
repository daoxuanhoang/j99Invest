import "./style.scss";
import React from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import { get } from "lodash";

const InvitePage = ({ source }) => {
  return (
    <div className="invite-page">
      <div className="invite-header">
        <h1>
          {`INVITE FRIENDS - To ${get(source, "sumary", "")} Reward for First Referer`}
          {/* <FormattedMessage id="buyoffer.title" /> */}
        </h1>
      </div>
      <div className="invite-content">
        <div dangerouslySetInnerHTML={{ __html: get(source, "description") }} />

        {/* <ul>
          <li>
            + <FormattedMessage id="buyoffer.description.1" />
          </li>
          <li>
            + <FormattedMessage id="buyoffer.description.2" />
          </li>
        </ul> */}
      </div>
    </div>
  );
};

export default injectIntl(InvitePage);
