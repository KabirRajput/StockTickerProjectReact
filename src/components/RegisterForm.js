import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Alert, Col, Row, Form, Icon, Input, Button } from "antd";

class RegisterForm extends Component {
  state = {
    error: "",
    success: ""
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios
          .post("http://localhost:8302/users/", { username: values.username })
          .then(response => {
            this.setState({
              error: "",
              success: `User ${values.username} was successfully created.`
            });
          })
          .catch(error => {
            this.setState({ error: error.message, success: "" });
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Row type="flex" justify="center" style={{ marginTop: "30px" }}>
        <Col span={24} lg={16}>
          <h2>Register to the stock viewer</h2>
          {this.state.error ? (
            <Alert
              type="error"
              message={this.state.error}
              style={{ marginBottom: "30px" }}
            />
          ) : null}
          {this.state.success ? (
            <Alert
              type="success"
              message={this.state.success}
              style={{ marginBottom: "30px" }}
            />
          ) : null}
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Register
              </Button>{" "}
              Or <Link to="/">Go Back</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

const WrappedRegisterForm = Form.create({ name: "register_form" })(
  RegisterForm
);

export default WrappedRegisterForm;
