import React from "react";
import { Button, Col, Row } from "antd";

const BuyTabTableQuote = props => {
  const { ticker, closePrice, handleBuyStock } = props;

  return (
    <Row style={{ marginTop: "30px" }}>
      <Row>
        <Col span={8}>
          <strong>Stock Ticker</strong>
        </Col>
        <Col span={8}>
          <strong>Last Close Price</strong>
        </Col>
        <Col span={8}>
          <strong>Action</strong>
        </Col>
      </Row>
      <Row style={{ marginTop: "30px" }}>
        <Col span={8}>{ticker}</Col>
        <Col span={8}>{closePrice}</Col>
        <Col span={8}>
          <Button type="primary" onClick={handleBuyStock}>
            Buy
          </Button>
        </Col>
      </Row>
    </Row>
  );
};

export default BuyTabTableQuote;
