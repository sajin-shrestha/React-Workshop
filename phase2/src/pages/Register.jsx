import { Button, Card, Form, Input, message, notification } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';  // or './Register.css' if you rename it

const SignupPage = () => {
  const [loading, setLoading] = useState(false); // to track api calling process
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const res = await axios.post(
        'https://egov-backend.vercel.app/api/users/register',
        values,
      );

      console.log(res);

      message.success('Signup Successful');
      notification.success({ message: 'Signup successful' });
      navigate('/login');
    } catch (err) {
      console.error(err);
      message.error('Signup unsuccessful');
      notification.error({ message: 'Signup unsuccessful' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page-container">
      <Card title="Signup Page" className="signup-card">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SignupPage;
