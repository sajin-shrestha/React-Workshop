import { Button, Card, Form, Input, message, notification } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Loginpage.css';

const LoginPage = () => {
  const [loading, setLoading] = useState(false); // to track API calling process
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const res = await axios.post(
        'https://egov-backend.vercel.app/api/users/login',
        values
      );

      const { accessToken } = res.data;
      localStorage.setItem('accessToken', accessToken); // Save token as 'accessToken'

      message.success('Login Successful');
      notification.success({ message: 'Login successful' });
      navigate('/');
    } catch (err) {
      console.error(err);
      message.error('Login unsuccessful');
      notification.error({ message: 'Login unsuccessful' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <Card title="Login Page" className="login-card">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className="signup-text">
          Don't have an account? <Link to="/signup">Signup</Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
