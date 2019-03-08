import React, { Component } from "react";
import axios from "axios";
import { Alert, Input, Spin } from "antd";
import BuyTabTableQuote from "./BuyTabTableQuote";

class BuyTab extends Component {
  state = {
    ticker: "",
    closePrice: "",
    error: "",
    success: "",
    isFetchingData: false
  };

  handleSearch = value => {
    const key = "TY2NMAHVOL0G1DTW";
    const ticker = value.toUpperCase().trim();

    this.setState({
      ...this.state,
      success: "",
      isFetchingData: !this.state.isFetchingData
    });

    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=compact&apikey=${key}`
      )
      .then(response => {
        if (!response.data["Error Message"]) {
          const timeSeries = response.data["Time Series (Daily)"];
          const lastDayData = timeSeries[Object.keys(timeSeries)[0]];
          const lastDayClose = lastDayData[Object.keys(lastDayData)[3]];
          this.setState({
            ticker: ticker,
            closePrice: lastDayClose,
            error: "",
            isFetchingData: !this.state.isFetchingData
          });
        } else {
          this.setState({
            ...this.state,
            error: response.data["Error Message"],
            isFetchingData: !this.state.isFetchingData
          });
        }
      })
      .catch(error => {
        this.setState({
          ...this.state,
          error: error.message,
          isFetchingData: !this.state.isFetchingData
        });
      });
  };

  handleBuyStock = () => {
    const bodyReq = {
      ticker: this.state.ticker,
      acquisitionPrice: this.state.closePrice
    };

    axios
      .post(
        `http://localhost:8302/users/${this.props.username}/stocks`,
        bodyReq
      )
      .then(response => {
        const responseData = response.data;
        this.setState({
          ...this.state,
          error: "",
          success: `You bought ${this.state.ticker}`
        });
        this.props.handleQuote(responseData);
      })
      .catch(error => {
        this.setState({
          ...this.state,
          error: `${error.message}. ${error.response.data.message}`
        });
      });
  };

  render() {
    const { Search } = Input;
    return (
      <div>
        {this.state.error ? (
          <Alert
            message={this.state.error}
            type="error"
            style={{ marginBottom: "30px" }}
          />
        ) : null}

        {this.state.success ? (
          <Alert
            message={this.state.success}
            type="success"
            style={{ marginBottom: "30px" }}
          />
        ) : null}

        <div style={{ margin: "0 auto", width: "80%" }}>
          {this.state.isFetchingData ? (
            <Spin tip="Fetching data">
              <Search
                placeholder="Insert stock ticker"
                onSearch={this.handleSearch}
                size="large"
                enterButton
              />
            </Spin>
          ) : (
            <Search
              placeholder="Insert stock ticker"
              onSearch={this.handleSearch}
              size="large"
              enterButton
            />
          )}
        </div>
        {this.state.ticker !== "" ? (
          <BuyTabTableQuote
            ticker={this.state.ticker}
            closePrice={this.state.closePrice}
            handleBuyStock={this.handleBuyStock}
          />
        ) : null}
      </div>
    );
  }
}

export default BuyTab;
