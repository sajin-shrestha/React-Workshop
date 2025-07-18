import { 
  Button, 
  Card, 
  Form, 
  Input, 
  message, 
  notification, 
  Typography,
  Divider,
  Row,
  Col,
  Space,
  Progress
} from 'antd'
import { 
  UserOutlined, 
  MailOutlined, 
  LockOutlined, 
  UserAddOutlined,
  LoginOutlined,
  CheckCircleOutlined,
  SafetyOutlined 
} from '@ant-design/icons'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const { Title, Paragraph } = Typography

const SignupPage = () => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const [passwordStrength, setPasswordStrength] = useState(0)
  const navigate = useNavigate()

  const calculatePasswordStrength = (password) => {
    if (!password) return 0
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25
    return strength
  }

  const getPasswordStrengthColor = (strength) => {
    if (strength < 25) return '#ff4d4f'
    if (strength < 50) return '#faad14'
    if (strength < 75) return '#1890ff'
    return '#52c41a'
  }

  const getPasswordStrengthText = (strength) => {
    if (strength < 25) return 'Weak'
    if (strength < 50) return 'Fair'
    if (strength < 75) return 'Good'
    return 'Strong'
  }

  const onFinish = async (values) => {
    setLoading(true)

    try {
      const res = await axios.post(
        'https://egov-backend.vercel.app/api/users/register',
        values,
      )

      console.log(res)

      navigate('/login')

      message.success('Account created successfully! Please login.')
      notification.success({
        message: 'Registration Successful',
        description: 'Your account has been created successfully. You can now login.',
        placement: 'topRight',
      })
    } catch (err) {
      console.error(err)
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.'
      message.error(errorMessage)
      notification.error({
        message: 'Registration Failed',
        description: errorMessage,
        placement: 'topRight',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <Row justify="center" style={{ width: '100%', maxWidth: 1200 }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <div className="fade-in">
            {/* Welcome Section */}
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{ 
                fontSize: 48, 
                marginBottom: 16,
                background: 'rgba(255,255,255,0.9)',
                borderRadius: '50%',
                width: 80,
                height: 80,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
              }}>
                👥
              </div>
              <Title level={2} style={{ color: 'white', marginBottom: 8 }}>
                Join E-Gov Portal
              </Title>
              <Paragraph style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, marginBottom: 0 }}>
                Create your account to access government services
              </Paragraph>
            </div>

            {/* Signup Card */}
            <Card className="auth-card scale-in">
              <div style={{ padding: '20px 0' }}>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                  <UserAddOutlined style={{ fontSize: 32, color: '#f5576c', marginBottom: 16 }} />
                  <Title level={3} style={{ marginBottom: 8 }}>Create Account</Title>
                  <Paragraph style={{ color: '#8c8c8c', marginBottom: 0 }}>
                    Fill in your details to get started
                  </Paragraph>
                </div>

                <Form
                  form={form}
                  onFinish={onFinish}
                  layout="vertical"
                  size="large"
                  className="modern-form"
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      { required: true, message: 'Please enter your username' },
                      { min: 3, message: 'Username must be at least 3 characters' },
                      { pattern: /^[a-zA-Z0-9_]+$/, message: 'Username can only contain letters, numbers, and underscores' }
                    ]}
                  >
                    <Input 
                      prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
                      placeholder="Choose a username"
                      autoComplete="username"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Email Address"
                    name="email"
                    rules={[
                      { required: true, message: 'Please enter your email address' },
                      { type: 'email', message: 'Please enter a valid email address' }
                    ]}
                  >
                    <Input 
                      prefix={<MailOutlined style={{ color: '#bfbfbf' }} />}
                      placeholder="Enter your email address"
                      autoComplete="email"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: 'Please enter your password' },
                      { min: 6, message: 'Password must be at least 6 characters' }
                    ]}
                  >
                    <Input.Password 
                      prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                      placeholder="Create a strong password"
                      autoComplete="new-password"
                      onChange={(e) => setPasswordStrength(calculatePasswordStrength(e.target.value))}
                    />
                    {passwordStrength > 0 && (
                      <div style={{ marginTop: 8 }}>
                        <Progress
                          percent={passwordStrength}
                          strokeColor={getPasswordStrengthColor(passwordStrength)}
                          showInfo={false}
                          size="small"
                        />
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          marginTop: 4
                        }}>
                          <span style={{ 
                            fontSize: 12, 
                            color: getPasswordStrengthColor(passwordStrength),
                            fontWeight: 500
                          }}>
                            {getPasswordStrengthText(passwordStrength)}
                          </span>
                          {passwordStrength === 100 && (
                            <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 12 }} />
                          )}
                        </div>
                      </div>
                    )}
                  </Form.Item>

                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                      { required: true, message: 'Please confirm your password' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve()
                          }
                          return Promise.reject(new Error('Passwords do not match'))
                        },
                      }),
                    ]}
                  >
                    <Input.Password 
                      prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                    />
                  </Form.Item>

                  <Form.Item style={{ marginBottom: 16 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      block
                      className="gradient-button"
                      icon={<UserAddOutlined />}
                      style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}
                    >
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </Form.Item>
                </Form>

                <Divider style={{ margin: '24px 0' }}>
                  <span style={{ color: '#8c8c8c', fontSize: 14 }}>Already have an account?</span>
                </Divider>

                <div style={{ textAlign: 'center' }}>
                  <Space direction="vertical" size="small">
                    <Paragraph style={{ color: '#595959', marginBottom: 16 }}>
                      Sign in to your existing account
                    </Paragraph>
                    <Link to="/login">
                      <Button 
                        type="default" 
                        icon={<LoginOutlined />}
                        style={{ 
                          borderColor: '#d9d9d9',
                          borderRadius: '8px',
                          fontWeight: 500
                        }}
                      >
                        Sign In
                      </Button>
                    </Link>
                  </Space>
                </div>
              </div>
            </Card>

            {/* Security Notice */}
            <div style={{ 
              textAlign: 'center', 
              marginTop: 24,
              background: 'rgba(255,255,255,0.1)',
              padding: '16px',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)'
            }}>
              <Paragraph style={{ 
                color: 'rgba(255,255,255,0.8)', 
                fontSize: 12, 
                marginBottom: 0 
              }}>
                🔒 By creating an account, you agree to our terms and privacy policy
              </Paragraph>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default SignupPage
