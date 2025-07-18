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
  Space
} from 'antd'
import { 
  MailOutlined, 
  LockOutlined, 
  LoginOutlined,
  UserAddOutlined,
  SafetyOutlined 
} from '@ant-design/icons'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const { Title, Paragraph } = Typography

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (values) => {
    setLoading(true)

    try {
      const res = await axios.post(
        'https://egov-backend.vercel.app/api/users/login',
        values,
      )

      const { accessToken } = res.data
      localStorage.setItem('accessToken', accessToken)

      navigate('/')

      message.success('Welcome back! Login successful.')
      notification.success({
        message: 'Login Successful',
        description: 'You have been successfully logged into your account.',
        placement: 'topRight',
      })
    } catch (err) {
      console.error(err)
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.'
      message.error(errorMessage)
      notification.error({
        message: 'Login Failed',
        description: errorMessage,
        placement: 'topRight',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                🏛️
              </div>
              <Title level={2} style={{ color: 'white', marginBottom: 8 }}>
                Welcome Back
              </Title>
              <Paragraph style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, marginBottom: 0 }}>
                Sign in to access your E-Gov Portal account
              </Paragraph>
            </div>

            {/* Login Card */}
            <Card className="auth-card scale-in">
              <div style={{ padding: '20px 0' }}>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                  <SafetyOutlined style={{ fontSize: 32, color: '#1890ff', marginBottom: 16 }} />
                  <Title level={3} style={{ marginBottom: 8 }}>Sign In</Title>
                  <Paragraph style={{ color: '#8c8c8c', marginBottom: 0 }}>
                    Enter your credentials to continue
                  </Paragraph>
                </div>

                <Form
                  onFinish={onFinish}
                  layout="vertical"
                  size="large"
                  className="modern-form"
                >
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
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                  </Form.Item>

                  <Form.Item style={{ marginBottom: 16 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      block
                      className="gradient-button"
                      icon={<LoginOutlined />}
                    >
                      {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                  </Form.Item>
                </Form>

                <Divider style={{ margin: '24px 0' }}>
                  <span style={{ color: '#8c8c8c', fontSize: 14 }}>New to E-Gov Portal?</span>
                </Divider>

                <div style={{ textAlign: 'center' }}>
                  <Space direction="vertical" size="small">
                    <Paragraph style={{ color: '#595959', marginBottom: 16 }}>
                      Don't have an account yet?
                    </Paragraph>
                    <Link to="/signup">
                      <Button 
                        type="default" 
                        icon={<UserAddOutlined />}
                        style={{ 
                          borderColor: '#d9d9d9',
                          borderRadius: '8px',
                          fontWeight: 500
                        }}
                      >
                        Create Account
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
                🔒 Your data is protected with enterprise-grade security
              </Paragraph>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default LoginPage
