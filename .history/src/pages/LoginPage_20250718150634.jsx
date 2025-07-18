import React, { useState } from "react";
import { Card, Form, Input, Button, message, Modal, Space } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Pages.css";
const error = () => {
  Modal.error({
    title: 'This is an error message',
    content: 'some messages...some messages...',
  });
};
const LoginPage = () => {
  const [loading, setLoading] = useState(false); // to track api calling process
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);

    try {
      const res = await axios.post(
        "https://egov-backend.vercel.app/api/users/login",
        values
      );
      const { accessToken } = res.data;
      localStorage.setItem("accessToken", accessToken);

      navigate("/profile");

      message.success("login Successful");
    } catch (err) {
      console.error(err);
      error();
      message.error("Login unsuceessful");
      // alert("Login unsuccessful, please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-page">
      <div
        id="LoginPage"
        style={{
          // backgroundColor: "#f0f2f5",
          padding: "0px  0  0 15px ",
          height: "80vh",
        }}
      >
        <div className="description">
          <h2
            className="login-title"
            style={{
              fontWeight: "bold",
              color: "#f8f8f8ff",
              textAlign: "center",
            }}
          >
            Welcome to the E-Governance Platform
          </h2>
          <p style={{ textAlign: "center", color: "#d7d7d8ff", fontSize: "14px" }}>
            Sign In to access a range of e-governance services and features.
          </p>
        </div>
        <div id="c2">
          <Card
            title="Sign In"
            className="login-card"
          >
            <Form onFinish={onFinish} style={{alignItems:'center', justifyContent:'center'}}>
              {/* for email */}
              <tr>
                <Form.Item label="Email" name="email" required>
                  <Input placeholder="email" style={{ paddingRight: "50px" }} />
                </Form.Item>
              </tr>
              {/* for password */}
              <Form.Item label="Password" name="password" required>
                <Input.Password placeholder="password" />
              </Form.Item>
              {/* for submit button */}
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Login
                </Button>
              </Form.Item>
            </Form>
            <h4>
              Do you want to Signup? <Link to="/signup">SignUp</Link>
            </h4>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
