import { 
  Card, 
  Descriptions, 
  Spin, 
  Avatar, 
  Typography, 
  message, 
  Space, 
  Tag, 
  Row, 
  Col,
  Button,
  Statistic,
  Divider,
  Badge
} from 'antd'
import { 
  UserOutlined, 
  MailOutlined, 
  IdcardOutlined, 
  CrownOutlined,
  EditOutlined,
  SafetyOutlined,
  CalendarOutlined,
  TrophyOutlined,
  FileTextOutlined
} from '@ant-design/icons'
import axios from 'axios'
import { useEffect, useState } from 'react'

const { Title, Paragraph } = Typography

const Profile = () => {
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const token = localStorage.getItem('accessToken')

  const fetchUserProfile = async () => {
    setLoading(true)
    try {
      const res = await axios.get(
       'https://egov-backend.vercel.app/api/users/profile',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setUserInfo(res.data.user)
    } catch (error) {
      console.error(error)
      message.error('Failed to fetch user profile')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserProfile()
  }, [])

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <div className="loading-text">Loading your profile...</div>
      </div>
    )
  }

  if (!userInfo) {
    return (
      <div className="loading-container">
        <Title level={4} style={{ color: '#ff4d4f' }}>Unable to load user profile</Title>
        <Button type="primary" onClick={fetchUserProfile}>
          Retry
        </Button>
      </div>
    )
  }

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'
  }

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'red'
      case 'moderator':
        return 'orange'
      case 'user':
        return 'blue'
      default:
        return 'default'
    }
  }

  return (
    <div className="container slide-up">
      {/* Profile Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        padding: '40px',
        marginBottom: '32px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.5
        }} />
        <Row align="middle" gutter={[32, 24]}>
          <Col xs={24} md={8} style={{ textAlign: 'center' }}>
            <Badge 
              count={
                <Avatar 
                  size={24} 
                  icon={<SafetyOutlined />} 
                  style={{ 
                    background: '#52c41a',
                    border: '2px solid white'
                  }}
                />
              } 
              offset={[-10, 10]}
            >
              <Avatar
                size={120}
                style={{ 
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontSize: '36px',
                  fontWeight: 'bold',
                  border: '4px solid rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                {getInitials(userInfo.username)}
              </Avatar>
            </Badge>
          </Col>
          <Col xs={24} md={16}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <Title level={2} style={{ color: 'white', marginBottom: 8 }}>
                {userInfo.username || 'Anonymous User'}
              </Title>
              <Paragraph style={{ 
                color: 'rgba(255,255,255,0.8)', 
                fontSize: 16, 
                marginBottom: 16 
              }}>
                Welcome to your E-Gov Portal profile
              </Paragraph>
              <Space size="middle">
                <Tag 
                  color={getRoleColor(userInfo.role)}
                  style={{ 
                    padding: '4px 12px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: 600,
                    border: 'none'
                  }}
                >
                  <CrownOutlined style={{ marginRight: 4 }} />
                  {userInfo.role?.toUpperCase() || 'USER'}
                </Tag>
                <Button 
                  type="default"
                  icon={<EditOutlined />}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: 'white',
                    borderRadius: '8px',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  Edit Profile
                </Button>
              </Space>
            </div>
          </Col>
        </Row>
      </div>

      <Row gutter={[24, 24]}>
        {/* Profile Information */}
        <Col xs={24} lg={16}>
          <Card 
            className="modern-card"
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar 
                  icon={<UserOutlined />} 
                  style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none'
                  }}
                />
                <span style={{ fontSize: 18, fontWeight: 600 }}>Personal Information</span>
              </div>
            }
          >
            <Descriptions
              column={{ xs: 1, sm: 1, md: 2 }}
              size="large"
              labelStyle={{ fontWeight: 600, color: '#595959' }}
              contentStyle={{ color: '#262626' }}
            >
              <Descriptions.Item 
                label={
                  <Space>
                    <UserOutlined style={{ color: '#1890ff' }} />
                    Username
                  </Space>
                }
                span={2}
              >
                <div style={{ 
                  background: '#f0f2f5',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontWeight: 500
                }}>
                  {userInfo.username || 'Not provided'}
                </div>
              </Descriptions.Item>

              <Descriptions.Item 
                label={
                  <Space>
                    <MailOutlined style={{ color: '#52c41a' }} />
                    Email Address
                  </Space>
                }
                span={2}
              >
                <div style={{ 
                  background: '#f6ffed',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontWeight: 500,
                  border: '1px solid #b7eb8f'
                }}>
                  {userInfo.email || 'Not provided'}
                </div>
              </Descriptions.Item>

              <Descriptions.Item 
                label={
                  <Space>
                    <IdcardOutlined style={{ color: '#faad14' }} />
                    User ID
                  </Space>
                }
              >
                <code style={{ 
                  background: '#fff7e6',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  border: '1px solid #ffd591'
                }}>
                  {userInfo.id || 'N/A'}
                </code>
              </Descriptions.Item>

              <Descriptions.Item 
                label={
                  <Space>
                    <CalendarOutlined style={{ color: '#722ed1' }} />
                    Member Since
                  </Space>
                }
              >
                <span style={{ color: '#722ed1', fontWeight: 500 }}>
                  {userInfo.createdAt ? new Date(userInfo.createdAt).toLocaleDateString() : 'Unknown'}
                </span>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Account Statistics */}
        <Col xs={24} lg={8}>
          <Card 
            className="modern-card"
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar 
                  icon={<TrophyOutlined />} 
                  style={{ 
                    background: 'linear-gradient(135deg, #faad14 0%, #fa8c16 100%)',
                    border: 'none'
                  }}
                />
                <span style={{ fontSize: 18, fontWeight: 600 }}>Account Stats</span>
              </div>
            }
          >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Statistic
                title="Account Status"
                value="Active"
                valueStyle={{ 
                  color: '#52c41a', 
                  fontSize: 18, 
                  fontWeight: 'bold' 
                }}
                prefix={<SafetyOutlined style={{ color: '#52c41a' }} />}
              />
              
              <Divider style={{ margin: '12px 0' }} />
              
              <Statistic
                title="Total Complaints"
                value={userInfo.complaintsCount || 0}
                valueStyle={{ 
                  color: '#1890ff', 
                  fontSize: 18, 
                  fontWeight: 'bold' 
                }}
                prefix={<FileTextOutlined style={{ color: '#1890ff' }} />}
              />
              
              <Divider style={{ margin: '12px 0' }} />
              
              <div style={{ 
                background: '#f0f2f5',
                padding: '16px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <Paragraph style={{ 
                  margin: 0, 
                  color: '#595959',
                  fontSize: 13
                }}>
                  🛡️ Your account is secured and verified
                </Paragraph>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Security & Settings */}
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card 
            className="modern-card"
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar 
                  icon={<SafetyOutlined />} 
                  style={{ 
                    background: 'linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%)',
                    border: 'none'
                  }}
                />
                <span style={{ fontSize: 18, fontWeight: 600 }}>Security & Settings</span>
              </div>
            }
          >
            <Row gutter={[24, 16]}>
              <Col xs={24} md={8}>
                <div style={{ 
                  padding: '20px',
                  background: '#fff2f0',
                  borderRadius: '8px',
                  border: '1px solid #ffccc7',
                  textAlign: 'center'
                }}>
                  <SafetyOutlined style={{ fontSize: 24, color: '#ff4d4f', marginBottom: 8 }} />
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>Password Security</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>Last updated: Never</div>
                  <Button 
                    size="small" 
                    style={{ marginTop: 8 }}
                    type="link"
                  >
                    Change Password
                  </Button>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div style={{ 
                  padding: '20px',
                  background: '#f6ffed',
                  borderRadius: '8px',
                  border: '1px solid #b7eb8f',
                  textAlign: 'center'
                }}>
                  <MailOutlined style={{ fontSize: 24, color: '#52c41a', marginBottom: 8 }} />
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>Email Verified</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>Notifications enabled</div>
                  <Button 
                    size="small" 
                    style={{ marginTop: 8 }}
                    type="link"
                  >
                    Manage
                  </Button>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div style={{ 
                  padding: '20px',
                  background: '#f0f2f5',
                  borderRadius: '8px',
                  border: '1px solid #d9d9d9',
                  textAlign: 'center'
                }}>
                  <UserOutlined style={{ fontSize: 24, color: '#595959', marginBottom: 8 }} />
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>Privacy Settings</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>Profile visibility</div>
                  <Button 
                    size="small" 
                    style={{ marginTop: 8 }}
                    type="link"
                  >
                    Configure
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Profile
