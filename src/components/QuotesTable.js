import React from "react";
import { Table } from "antd";

const QuotesTable = props => {
  const { quotes } = props;
  const columns = [
    {
      title: "Ticker",
      dataIndex: "ticker",
      key: "ticker"
    },
    {
      title: "Price",
      dataIndex: "acquisitionPrice",
      key: "acquisitionPrice"
    }
  ];
  return <Table rowKey="id" columns={columns} dataSource={quotes} />;
};

export default QuotesTable;
