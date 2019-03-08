import React, { Component } from "react";
import { Form, Input, Button, Icon } from "antd";

class StockViewerTopUpForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleBalanceSubmit(
          values.Amount,
          this.props.redirectToHome
        );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const validateAmount = (rule, value, cb) => {
      if (value <= 0) {
        cb("Value must be greater than 0");
      } else {
        cb();
      }
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator("Amount", {
            rules: [
              {
                required: true
              },
              { validator: validateAmount }
            ]
          })(
            <Input
              prefix={
                <Icon type="dollar" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder="Top up amount"
              type="number"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Top Up
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedStockViewerTopUpForm = Form.create({
  name: "StockViewerTopUpForm"
})(StockViewerTopUpForm);

export default WrappedStockViewerTopUpForm;
