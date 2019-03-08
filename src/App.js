import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";
import Login from "./components/Login";
import axios from "axios";
import RegisterForm from "./components/RegisterForm";
import StockViewer from "./components/StockViewer";
import StockViewerTopUp from "./components/StockViewerTopUp";

class App extends Component {
  //data currently stored in the application
  state = {
    username: "",
    balance: 0,
    quotes: [],
    error: ""
  };

  //given the inserted username a HTTP GET request is made to the db and based on the response
  //the user is logged in or error is displayed.
  //state is updated with the user data (response)
  handleLogin = e => {
    e.preventDefault();
    const username = e.target.querySelector('input[name="username"]').value;
    axios
      .get(`http://localhost:8302/users/${username}`)
      .then(response => {
        const { username, balance, quotes } = response.data;
        this.setState({ username, balance, quotes });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  };

  //when the user wants to top up, HTTP PATCH request is sent to the server
  handleBalanceSubmit = (amount, cb) => {
    const newBalance = Number(amount) + Number(this.state.balance);
    const data = {
      username: this.state.username,
      balance: newBalance
    };

    axios
      .patch(`http://localhost:8302/users/${this.state.username}`, data)
      .then(response => {
        this.setState({ balance: newBalance, error: "" });
      })
      .then(() => {
        cb();
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  };

  //when user buys new stock update the balance and the quotes
  handleQuote = quote => {
    this.setState({
      ...this.state,
      balance: Number(this.state.balance) - Number(quote.acquisitionPrice),
      quotes: [...this.state.quotes, quote]
    });
  };

  render() {
    return (
      <Router>
        <div>
          {this.state.username === "" ? (
            <Route
              exact
              path="/"
              render={props => (
                <Login
                  {...props}
                  handleLogin={this.handleLogin}
                  error={this.state.error}
                />
              )}
            />
          ) : (
            <Route
              exact
              path="/"
              render={props => (
                <StockViewer
                  {...props}
                  username={this.state.username}
                  balance={this.state.balance}
                  quotes={this.state.quotes}
                  handleQuote={this.handleQuote}
                />
              )}
            />
          )}
          <Route
            path="/top-up"
            render={props => (
              <StockViewerTopUp
                {...props}
                handleBalanceSubmit={this.handleBalanceSubmit}
                username={this.state.username}
              />
            )}
          />
          <Route
            path="/register"
            render={props => <RegisterForm {...props} />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
