import React, { useMemo, useState } from "react";
import { Button, Table, Col, Row } from "antd";
import { trim, get } from "lodash";
import { FormattedMessage, injectIntl } from "react-intl";
import { getUserWalletHistoryList, openUserHistoryModal } from "modules/networks/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { formatCode, roundNumber } from "helpers/CommonHelper";
import moment from "moment";
import "./styles.scss";
import { TRONSCAN_TRANSACTION } from "commons/constants";

const UserWalletHistoryList = ({ intl }) => {
  const dispatch = useDispatch();
  const { referalDetailData } = useSelector((state) => ({
    referalDetailData: state.networks.referalDetailData,
  }));
  const modalUserHistory = useSelector((state) => state.networks.modalUserHistory);
  const [count, setCount] = useState(1);
  const { data, total, perPage, totalPay } = referalDetailData || {
    data: [],
    total: 0,
    perPage: 10,
    totalPay: 0,
  };
  const STATUS = "status";
  const AMOUNT = "total_pay";
  const renderColumn = (item, column) => {
    switch (column) {
      case STATUS:
        return (
          <div className={`COMPLETED-status `}>
            <FormattedMessage id={`stake.${item[STATUS]}`} />
          </div>
        );
      case AMOUNT:
        return (
          <span className={`${item[AMOUNT] > 0 ? "text-success" : "text-danger"}`}>
            {item[AMOUNT] > 0
              ? `+${roundNumber(item[AMOUNT])
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`
              : roundNumber(item[AMOUNT])
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
          </span>
        );
      default:
        return;
    }
  };

  const header = [
    {
      key: "code",
      dataIndex: "order_code",
      title: <FormattedMessage id="transaction.code" />,
      render: (text, record) => {
        const code = text !== null ? formatCode(text, 4, 4, "...") : "";
        const type = get(record, "type");
        if (type === "DEPOSIT" || type === "WITHDRAW")
          return (
            <a target="_blank" rel="noopener noreferrer" href={`${TRONSCAN_TRANSACTION}/${text}`}>
              {code}
            </a>
          );
        return <span>{code}</span>;
      },
    },
    {
      title: <FormattedMessage id="Amount" />,
      dataIndex: AMOUNT,
      render: (text, data) => renderColumn(data, AMOUNT),
    },
    {
      title: <FormattedMessage id="Status" />,
      dataIndex: STATUS,
      render: (text, data) => renderColumn(data, STATUS),
    },
    {
      title: <FormattedMessage id="Time" />,
      dataIndex: "created_at",
      render: (text) => moment(text).format("YYYY/MM/DD HH:mm"),
    },
  ];

  const loadMore = () => {
    let perPageUpdate = perPage + count * 10;
    setCount(count + 1);
    const query = {
      page: 1,
      limit: perPageUpdate,
      customer_id: modalUserHistory?.data?.id,
    };
    dispatch(getUserWalletHistoryList(query));
  };

  const getTitle = useMemo(() => {
    return (
      <>
        <div>{modalUserHistory?.data?.full_name && modalUserHistory.data.full_name}</div>
      </>
    );
  }, [modalUserHistory]);

  const title = "Wallet History";
  const defaultScroll = { x: 0 };
  const { innerWidth: width } = window;
  const closeModal = () => {
    dispatch(openUserHistoryModal({ value: false, data: null }));
  };

  return (
    <div className="wallet-list-container">
      <div className="table-wrapper">
        <Row gutter={30}>
          <Col xl={18} lg={18} md={18} xs={18} sm={18}>
            <div className="section-title mb-0">{getTitle}</div>
          </Col>
          <Col xl={6} lg={6} md={6} xs={6} sm={6} className="text-right">
            <span onClick={closeModal} className="icon-flex-end border-history-total pointer">
              <FormattedMessage id="Total" />:{" "}
              {roundNumber(totalPay)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
            </span>
          </Col>
        </Row>
        <Table
          rowKey={(record) => `${trim(title)}-${get(record, "id")}`}
          className={`report-table`}
          dataSource={data}
          columns={header}
          pagination={false}
          scroll={defaultScroll}
          size={width < 480 ? "middle" : ""}
        />
        {total > perPage && (
          <div className="btn-load-more">
            <Button className="ant-btn ant-btn-primary btn-pega" onClick={loadMore}>
              <FormattedMessage id="stake.loadMore" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default injectIntl(UserWalletHistoryList);
