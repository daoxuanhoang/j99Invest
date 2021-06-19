import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Text from "antd/lib/typography/Text";
import { PENDING, VERIFIED } from "../TransactionList";

import "./styles.scss";

const Status = (props) => {
  const { value } = props;

  switch (value) {
    case 0:
    case "0":
    case "CANCEL":
      return (
        <Text className="transaction-status warning" type="danger">
          <FormattedMessage id="transaction.cancel" />
        </Text>
      );
    case 1:
    case "1":
    case "COMPLETED":
    case "SUCCESS":
      return (
        <Text className="transaction-status success" type="success">
          <FormattedMessage id="transaction.completed" />
        </Text>
      );
    case 2:
    case "2":
    case PENDING:
      return (
        <Text className="transaction-status pending" type="warning">
          <FormattedMessage id="transaction.pending" />
        </Text>
      );
    case VERIFIED:
      return (
        <Text className="transaction-status verified" type="warning">
          <FormattedMessage id="transaction.verified" />
        </Text>
      );
    default:
      return <></>;
  }
};

export default injectIntl(Status);
