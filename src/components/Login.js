import React from "react";
import { Link } from "react-router-dom";
import { Alert, Col, Form, Icon, Input, Button, Row } from "antd";

const Login = props => {
  return (
    <Row type="flex" justify="center">
      <Col sm={20} md={8} xl={8}>
        {props.error !== "" ? (
          <Alert message={props.error} type="error" />
        ) : null}
        <h2>Welcome to the stock system</h2>
        <Form className="login-form" onSubmit={props.handleLogin}>
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
              name="username"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
            Or <Link to="/register">register now!</Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
