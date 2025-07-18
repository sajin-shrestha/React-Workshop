import React, { useState } from "react";
import { Card, Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SignupPage = () => {
  const [loading, setLoading] = useState(false); // to track api calling process
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);

    try {
      const res = await axios.post(
        "https://egov-backend.vercel.app/api/users/register",
        values
      );
      const { accessToken } = res.data;
      localStorage.setItem("accessToken", accessToken);

      navigate("/login");

      message.success("login Successful");
    } catch (err) {
      console.error(err);
      message.error("Login unsuceessful");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Card title="Signup Page">
        <Form onFinish={onFinish}>
          {/* for email */}
          <Form.Item label="Email" name="email" required>
            <Input placeholder="email" />
          </Form.Item>
          {/* for password */}
          <Form.Item label="Password" name="password" required>
            <Input placeholder="password" />
          </Form.Item>
          {/* for submit button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SignupPage;
