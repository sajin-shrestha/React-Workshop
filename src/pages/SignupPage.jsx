import { Button, Card, Form, Input, message, notification, Typography, Divider, Space, Checkbox, Progress } from 'antd'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { 
  UserOutlined, 
  MailOutlined, 
  LockOutlined, 
  UserAddOutlined, 
  EyeInvisibleOutlined, 
  EyeTwoTone,
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  RocketOutlined
} from '@ant-design/icons'

const { Title, Text } = Typography;

const SignupPage = () => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  
  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  // Password strength calculation
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 10;
    if (/[a-z]/.test(password)) strength += 15;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/\d/.test(password)) strength += 20;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 20;
    
    return Math.min(strength, 100);
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength < 30) return '#ff4d4f';
    if (strength < 60) return '#faad14';
    if (strength < 80) return '#1890ff';
    return '#52c41a';
  };

  const getPasswordStrengthText = (strength) => {
    if (strength < 30) return 'Weak';
    if (strength < 60) return 'Fair';
    if (strength < 80) return 'Good';
    return 'Strong';
  };

  const onFinish = async (values) => {
    if (!agreedToTerms) {
      message.error('Please accept the terms and conditions');
      return;
    }

    setLoading(true)

    try {
      const res = await axios.post(
        'https://egov-backend.vercel.app/api/users/register',
        values,
      )

      navigate('/login')

      message.success('Registration successful! Please login to continue.')
      notification.success({
        message: 'Account Created Successfully!',
        description: 'Your account has been created. You can now login with your credentials.',
        placement: 'topRight',
        duration: 4,
        icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />
      })
    } catch (err) {
      let errorMessage = 'Registration failed. Please try again.';
      if (err.response?.status === 409) {
        errorMessage = 'An account with this email already exists.';
      } else if (err.response?.status === 400) {
        errorMessage = 'Invalid information provided. Please check your details.';
      }
      
      message.error(errorMessage)
      notification.error({
        message: 'Registration Failed',
        description: errorMessage,
        placement: 'topRight',
        duration: 4
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <RocketOutlined style={{ fontSize: '3rem', marginBottom: '1rem' }} />
          <Title level={2}>Create Account</Title>
          <Text>Join us and get started in minutes</Text>
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
              label="Username"
              name="username"
              rules={[
                { 
                  required: true, 
                  message: 'Please enter your username' 
                },
                {
                  min: 3,
                  message: 'Username must be at least 3 characters'
                },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: 'Username can only contain letters, numbers, and underscores'
                }
              ]}
              hasFeedback
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Choose a username" 
                autoComplete="username"
              />
            </Form.Item>
            
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
                prefix={<MailOutlined />}
                placeholder="Enter your email address" 
                autoComplete="email"
              />
            </Form.Item>
            
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { 
                  required: true, 
                  message: 'Please create a password' 
                },
                {
                  min: 8,
                  message: 'Password must be at least 8 characters'
                },
                {
                  validator: (_, value) => {
                    if (!value) return Promise.resolve();
                    const strength = calculatePasswordStrength(value);
                    if (strength < 60) {
                      return Promise.reject(new Error('Password is too weak. Please use a stronger password.'));
                    }
                    return Promise.resolve();
                  }
                }
              ]}
              hasFeedback
            >
              <Input.Password 
                prefix={<LockOutlined />}
                placeholder="Create a strong password" 
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                autoComplete="new-password"
                onChange={(e) => {
                  const strength = calculatePasswordStrength(e.target.value);
                  setPasswordStrength(strength);
                }}
              />
            </Form.Item>

            {passwordStrength > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <Text style={{ fontSize: '12px' }}>Password Strength</Text>
                  <Text style={{ fontSize: '12px', color: getPasswordStrengthColor(passwordStrength) }}>
                    {getPasswordStrengthText(passwordStrength)}
                  </Text>
                </div>
                <Progress 
                  percent={passwordStrength} 
                  strokeColor={getPasswordStrengthColor(passwordStrength)}
                  showInfo={false}
                  size="small"
                />
              </div>
            )}

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { 
                  required: true, 
                  message: 'Please confirm your password' 
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match'));
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password 
                prefix={<LockOutlined />}
                placeholder="Confirm your password" 
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                autoComplete="new-password"
              />
            </Form.Item>

            <Form.Item>
              <Checkbox 
                checked={agreedToTerms} 
                onChange={(e) => setAgreedToTerms(e.target.checked)}
              >
                I agree to the{' '}
                <Link to="/terms" style={{ color: 'var(--primary-color)' }}>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" style={{ color: 'var(--primary-color)' }}>
                  Privacy Policy
                </Link>
              </Checkbox>
            </Form.Item>
            
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<UserAddOutlined />}
                block
                size="large"
                disabled={!agreedToTerms}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
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
                onClick={() => navigate('/login')}
              >
                Sign In to Existing Account
              </Button>
            </Form.Item>
          </Form>
        </div>
        
        <div className="auth-footer">
          <Text>Already have an account?</Text>
          <Link to="/login" style={{ marginLeft: '8px', fontWeight: '600' }}>
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
