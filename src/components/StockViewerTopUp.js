import React from "react";
import { Row, Col } from "antd";
import { Redirect } from "react-router-dom";
import StockViewerHeader from "./StockViewerHeader";
import StockViewerTopUpForm from "./StockViewerTopUpForm";

const StockViewerTopUp = props => {
  const { username, balance, handleBalanceSubmit } = props;
  if (username === "") {
    return <Redirect to="/" />;
  }

  return (
    <Row style={{ maxWidth: "960px", margin: "30px auto 0" }}>
      <Col>
        <StockViewerHeader username={username} balance={balance} />
      </Col>
      <Row type="flex" justify="center" style={{ marginTop: "30px" }}>
        <Col span={24} md={18} xl={12}>
          <StockViewerTopUpForm
            handleBalanceSubmit={handleBalanceSubmit}
            redirectToHome={() => {
              props.history.push("/");
            }}
          />
        </Col>
      </Row>
    </Row>
  );
};

export default StockViewerTopUp;
