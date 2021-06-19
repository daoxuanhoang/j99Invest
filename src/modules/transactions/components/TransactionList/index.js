import React, { useEffect, useMemo, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import { Modal, Button } from "antd";
import  ItemListing  from "commons/components/ItemListing/index";
import  Status  from "modules/transactions/components/Status/index";
import {
    cancelTransactionTypeWithDraw,
    cancelTransactionTypeTransfer,
    getTransactionList,
} from "modules/transactions/redux/actions";
import { formatDate, formatCode, roundNumber } from "helpers/CommonHelper";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { USDTTRON, TRONSCAN_TRANSACTION, TRANSACTION } from "commons/constants";

import "./styles.scss";
import FilterCustom from "commons/components/FilterCustom/index";
import { FILTER_HISTORY_DEFAULT, FILTER_HISTORY_MAPPING } from "modules/staking/const";
import { updateToggleAuthyModal } from "modules/auth/redux/actions";

const { confirm } = Modal;

export const PENDING = "PENDING";
export const VERIFIED = "VERIFIED";
const WITHDRAW = "WITHDRAW";
const TRANSFER = "TRANSFER";

const renderFilter = (value) => {
    const getFilterMapping = FILTER_HISTORY_MAPPING[value];
    if (getFilterMapping) {
        let result = [...FILTER_HISTORY_DEFAULT, ...getFilterMapping];

        return result;
    }
    return [...FILTER_HISTORY_DEFAULT];
};

const ALL = "ALL";
const STATUS = "status";
const AMOUNT = "amount";

const TransactionList = ({ intl, isCall, currency }) => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useState({
        pageSize: 10,
        pageIndex: 1,
        currency: currency || USDTTRON,
        type: ALL,
    });

    const handleShowPopupVerifyAuthy = ({ id = "" }) => {
        const body = {
            id,
            typeCallApi: TRANSACTION,
        };
        dispatch(updateToggleAuthyModal(body));
    };

    const handleCancel = (val) => {
        confirm({
            className: "custom-confirm pending-modal",
            icon: <ExclamationCircleOutlined />,
            content: intl.formatMessage({
                id: "transaction.cancel.content",
            }),
            onOk() {
                let formCancel = {
                    transactionCode: val?.code,
                    customerId: val?.customer_id,
                };
                switch (val?.type) {
                    case "WITHDRAW":
                        dispatch(
                            cancelTransactionTypeWithDraw(formCancel, () => {
                                dispatch(getTransactionList(searchParams));
                            })
                        );
                        break;
                    case "TRANSFER":
                        dispatch(
                            cancelTransactionTypeTransfer(formCancel, () => {
                                dispatch(getTransactionList(searchParams));
                            })
                        );
                        break;
                    default:
                        break;
                }
            },
            onCancel() { },
        });
    };

    const renderButtonCancel = (data) => {
        const { status } = data || { status: "" };
        if (status !== "PENDING") {
            return <></>;
        }
        if (data?.type === TRANSFER || data?.type === WITHDRAW) {
            return (
                <span className="button-cancel">
                    <Button size="middle" type="primary" htmlType="submit" className="primary-button" onClick={() => handleCancel(data)}>
                        <FormattedMessage id="transaction.cancel" />
                    </Button>
                </span>
            );
        }
    };

    const renderColumn = (item, column) => {
        switch (column) {
            case STATUS:
                return (
                    <div className="wrapper-status-btn">
                        {item.status === PENDING && (item?.type === TRANSFER || item?.type === WITHDRAW) ? (
                            <div className={`${item[STATUS]}-status`}>
                                <span onClick={() => cancelTransaction(item)}>
                                    <FormattedMessage id={`stake.${item[STATUS]}`} />
                                </span>
                            </div>
                        ) : (
                            <Status value={item.status} />
                        )}

                        {renderButtonCancel(item)}
                    </div>
                );
            case AMOUNT:
                return (
                    <span className={`${item[AMOUNT] > 0 ? "text-success" : "text-danger"}`}>
                        {get(item, "action") !== "OUT" ? "+" : "-"}
                        {roundNumber(item[AMOUNT])
                            .toString()
                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                    </span>
                );
            default:
                return;
        }
    };

    const cancelTransaction = (val) => {
        if (val && (val.status === "VERIFIED" || val.status === "PENDING")) {
            handleShowPopupVerifyAuthy(val);
            return;
        }
        if (val && val.status !== "CANCEL") return;
    };

    const transactions = useSelector((state) => state.transactions.items);
    const pagination = useMemo(
        () => ({
            total: get(transactions, "total", 0),
            current: searchParams.pageIndex,
            onChange: (page, pageRecord) => {
                setSearchParams({
                    ...searchParams,
                    pageIndex: page,
                    pageSize: pageRecord,
                });
            },
        }),
        [searchParams, transactions]
    );

    useEffect(() => {
        setSearchParams(searchParams);
        dispatch(getTransactionList(searchParams));
    }, [dispatch, searchParams]);

    useEffect(() => {
        const data = {
            ...searchParams,
            pageIndex: 1,
            currency,
        };
        setSearchParams(data);
        dispatch(getTransactionList(data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, isCall, currency]);

    const handleChange = (value) => {
        setSearchParams({
            ...searchParams,
            type: value,
            pageIndex: 1,
            pageSize: 10,
        });
    };

    const columns = [
        {
            key: "currency",
            dataIndex: "currency",
            title: "TOKEN",
        },
        {
            key: "amount",
            dataIndex: "amount",
            title: <FormattedMessage id="transaction.amount" />,
            render: (text, record) => (
                <span>
                    {get(record, "action") !== "OUT" ? "+" : "-"}
                    {text !== null ? roundNumber(text) : 0}
                </span>
            ),
        },

        {
            key: "code",
            dataIndex: "code",
            title: <FormattedMessage id="transaction.CODE" />,
            render: (text, record) => {
                const code = text !== null ? formatCode(text, 4, 4, "...") : "";
                const type = get(record, "type");
                if (type === "DEPOSIT" || type === WITHDRAW)
                    return (
                        <a target="_blank" href={`${TRONSCAN_TRANSACTION}/${text}`} rel="noopener noreferrer">
                            {code}
                        </a>
                    );
                return <span>{code}</span>;
            },
        },
        {
            key: "type",
            dataIndex: "type",
            title: <FormattedMessage id="transaction.TYPE" />,
        },
        {
            key: "status",
            dataIndex: "status",
            title: <FormattedMessage id="transaction.STATUS" />,
            render: (text, data) => renderColumn(data, STATUS),
        },
        {
            key: "created_at",
            dataIndex: "created_at",
            title: <FormattedMessage id="transaction.DATE" />,
            align: "right",
            // render: (text) => (text ? formatDate(text) : ""),
        },
    ];
    return (
        <div className="transaction-list">
            <FilterCustom data={renderFilter(currency)} defaultValue="ALL" handleChange={handleChange} intl={intl} />
            <ItemListing
                id="tran-his-1"
                title={
                    <div className="d-flex-between">
                        <span>
                            <FormattedMessage id="transaction.title" />
                        </span>
                        <span style={{ fontSize: "15px", margin: "auto 0" }}>
                            <FormattedMessage id="transaction.VIEWALL" />
                            {" >"}
                        </span>
                    </div>
                }
                showHeader={true}
                customTableClassName={"transaction-table"}
                columns={columns}
                customPagination={pagination}
                dataSource={get(transactions, "data")}
            />
        </div>
    );
};

export default injectIntl(TransactionList);
