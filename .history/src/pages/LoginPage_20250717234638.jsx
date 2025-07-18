import React, { useState } from "react";
import { Card, Form, Input, Button, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './Pages.css';
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

      navigate("/");

      message.success("login Successful");
    } catch (err) {
      console.error(err);
      message.error("Login unsuceessful");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="LoginPage">
       <div className="description">
        <h2 style={{ fontWeight: 'bold', color: '#1e3a63', textAlign: 'center' }}>Welcome to the E-Governance Platform</h2>
        <p style={{ textAlign: 'center', color: 'gray', fontSize: '14px' }}>
          Sign In to access a range of e-governance services and features.
        </p>
      </div>
      <Card title="Login" style={{  margin: "0 auto", marginTop: "10px", alignItems: "center",  textAlign: "center", color:'#1e3a63', backgroundColor: '#44c2b8b7', padding: '20px', borderRadius: '30px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }}>
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
        <h4>Do you want to Signup? <Link to='/signup'>SignUp</Link></h4>
      </Card>
    </div>
  );
};

export default LoginPage;
