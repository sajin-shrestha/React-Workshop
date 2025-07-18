import { Button, Card, Form, Input, message, notification } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

 const onFinish = async (values) => {
  setLoading(true);

  try {
    const res = await axios.post(
      'https://egov-backend.vercel.app/api/users/login',
      values
    );

    const { accessToken } = res.data;

    
    if (accessToken && typeof accessToken === 'string') {
      localStorage.setItem('accessToken', accessToken);

      
      const profileRes = await axios.get(
        'https://egov-backend.vercel.app/api/users/profile',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const user = profileRes.data;

      if (user && typeof user === 'object') {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    }

    message.success('Login Successful');
    notification.success({ message: 'Login successful' });

    navigate('/');
  } catch (err) {
    console.error(err);
    message.error('Login failed. Please check your credentials.');
    notification.error({
      message: 'Login unsuccessful',
      description: err?.response?.data?.message || 'Something went wrong',
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <Card title="Login Page" style={{ maxWidth: 400, margin: '2rem auto' }}>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ email: '', password: '' }}
      >
        {/* Email Field */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Enter a valid email' },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        {/* Password Field */}
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
          >
            Login
          </Button>
        </Form.Item>
      </Form>

      <div style={{ textAlign: 'center' }}>
        <span>Don't have an account? </span>
        <Link to="/signup">Sign Up</Link>
      </div>
    </Card>
  );
};

export default LoginPage;
