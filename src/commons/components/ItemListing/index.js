import React, { useMemo } from "react";
import { Table, Card } from "antd";
import { trim, get } from "lodash";

import "./styles.scss";

/**
 * A commont function for renderring item compoment
 * @since Sep 30 2020
 */

export const defaultScroll = { x: 0 };
export const pageSizeOptions = ["10", "20", "30", "100"];

const ItemListing = ({
  id = "",
  columns = [],
  dataSource = [],
  extra,
  title = "Default Table Name",
  customContainerClass = "",
  customTableClassName = "",
  customCardContainerClass = "",
  customPagination = {},
  customScroll = {},
  defaultPageSize = 10,
  showHeader = true,
  onClick = () => {},
  ...tableProps
}) => {
  const paginationSetting = useMemo(
    () => ({
      pageSizeOptions,
      defaultPageSize: defaultPageSize,
      showSizeChanger: true,
      total: customPagination.total ? customPagination.total : 0,
      showTotal: (total) => `Total ${total} items`,
    }),
    [defaultPageSize, customPagination]
  );

  const { innerWidth: width } = window;

  return (
    <div className={`report-content ${customContainerClass}`}>
      <Card className={`report-card ${customCardContainerClass}`} title={title} extra={extra}>
        <Table
          showHeader={showHeader}
          rowKey={(record) => `${trim(id)}-${get(record, "id")}`}
          className={`report-table ${customTableClassName}`}
          dataSource={dataSource}
          columns={columns}
          pagination={{ ...paginationSetting, ...customPagination }}
          scroll={{ ...defaultScroll, customScroll }}
          onRow={(record, rowIndex) => onClick(record, rowIndex)}
          size={width < 480 ? "middle" : ""}
          {...tableProps}
        />
      </Card>
    </div>
  );
};

export default ItemListing;
