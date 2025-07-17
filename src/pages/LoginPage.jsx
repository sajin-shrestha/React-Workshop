import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Button, message, notification, Typography, Divider, Space, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  UserOutlined, 
  LockOutlined, 
  LoginOutlined, 
  EyeInvisibleOutlined, 
  EyeTwoTone,
  SafetyCertificateOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  
  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const onFinish = async(values) => {
    setLoading(true);

    try{
      const res = await axios.post(
        'https://egov-backend.vercel.app/api/users/login', 
        values
      );
      
      // Handle successful login
      const {accessToken} = res.data;
      localStorage.setItem('accessToken', accessToken);
      
      // Save credentials if remember me is checked
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', values.email);
      }

      navigate('/');

      message.success('Login successful');
      notification.success({
        message: 'Welcome Back!',
        description: 'You have been logged in successfully. Redirecting to dashboard...',
        placement: 'topRight',
        duration: 3,
        icon: <ThunderboltOutlined style={{ color: '#52c41a' }} />
      });
    } catch (err) {
      // Enhanced error handling
      let errorMessage = 'Login failed. Please check your credentials and try again.';
      if (err.response?.status === 401) {
        errorMessage = 'Invalid email or password. Please try again.';
      } else if (err.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      }
      
      message.error(errorMessage);
      notification.error({
        message: 'Login Failed',
        description: errorMessage,
        placement: 'topRight',
        duration: 4
      });
    } finally {
      setLoading(false);
    }
  };

  // Load remembered email on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      form.setFieldsValue({ email: rememberedEmail });
      setRememberMe(true);
    }
  }, [form]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <SafetyCertificateOutlined style={{ fontSize: '3rem', marginBottom: '1rem' }} />
          <Title level={2}>Welcome Back</Title>
          <Text>Sign in to access your account</Text>
        </div>
        
        <div className="auth-form">
          <Form 
            form={form}
            onFinish={onFinish}
            layout="vertical"
            size="large"
            autoComplete="off"
          >
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { 
                  required: true, 
                  message: 'Please enter your email address' 
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email address'
                }
              ]}
              hasFeedback
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Enter your email"
                autoComplete="email"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { 
                  required: true, 
                  message: 'Please enter your password' 
                },
                {
                  min: 6,
                  message: 'Password must be at least 6 characters'
                }
              ]}
              hasFeedback
            > 
              <Input.Password 
                prefix={<LockOutlined />}
                placeholder="Enter your password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                autoComplete="current-password"
              />
            </Form.Item>

            <Form.Item>
              <Space split={<Divider type="vertical" />} style={{ width: '100%', justifyContent: 'space-between' }}>
                <Checkbox 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)}
                >
                  Remember me
                </Checkbox>
                <Link to="/forgot-password" style={{ color: 'var(--primary-color)' }}>
                  Forgot password?
                </Link>
              </Space>
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                icon={<LoginOutlined />}
                block
                size="large"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </Form.Item>

            <Divider>
              <Text type="secondary">or</Text>
            </Divider>

            <Form.Item>
              <Button 
                block
                size="large"
                style={{ 
                  border: '2px solid var(--border-color)',
                  background: 'transparent',
                  color: 'var(--text-primary)'
                }}
                onClick={() => navigate('/signup')}
              >
                Create New Account
              </Button>
            </Form.Item>
          </Form>
        </div>
        
        <div className="auth-footer">
          <Text>Don't have an account?</Text>
          <Link to="/signup" style={{ marginLeft: '8px', fontWeight: '600' }}>
            Sign up for free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

