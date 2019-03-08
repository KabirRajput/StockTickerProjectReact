import React from "react";
import { Button, Col, Row } from "antd";
import { Link, Redirect } from "react-router-dom";

const StockViewerHeader = props => {
  const { username, balance } = props;
  return (
    <Row>
      <Col span={12}>
        Hello, <strong>{username}</strong>!
      </Col>
      <Col span={12} style={{ textAlign: "right" }}>
        Balance: {balance}{" "}
        <Button type="primary">
          <Link to="/top-up">Top Up</Link>
        </Button>
      </Col>
    </Row>
  );
};

export default StockViewerHeader;
