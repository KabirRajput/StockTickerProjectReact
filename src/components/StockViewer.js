import React from "react";
import { Col, Row } from "antd";
import StockViewerHeader from "./StockViewerHeader";
import StockViewerTabs from "./StockViewerTabs";

const StockViewer = props => {
  const { username, balance, quotes, handleQuote } = props;
  return (
    <Row style={{ maxWidth: "960px", margin: "30px auto 0" }}>
      <Col>
        <StockViewerHeader username={username} balance={balance} />
        <StockViewerTabs
          username={username}
          quotes={quotes}
          handleQuote={handleQuote}
        />
      </Col>
    </Row>
  );
};

export default StockViewer;
