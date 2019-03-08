import React from "react";
import { Col, Row, Tabs } from "antd";
import BuyTab from "./BuyTab";
import QuotesTable from "./QuotesTable";

const StockViewerTabs = props => {
  const { quotes, handleQuote, username } = props;
  const TabPane = Tabs.TabPane;
  return (
    <Row style={{ marginTop: "30px" }}>
      <Col>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Portfolio" key="1">
            <QuotesTable quotes={quotes} />
          </TabPane>
          <TabPane tab="Buy Stocks" key="2">
            <BuyTab username={username} handleQuote={handleQuote} />
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default StockViewerTabs;
