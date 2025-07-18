import { Card, Descriptions, Spin, Avatar, Typography, message, Space, Tag } from 'antd'
import { UserOutlined, MailOutlined, IdcardOutlined, CrownOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useEffect, useState } from 'react'


const { Title } = Typography

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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (!userInfo) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Title level={4}>Unable to load user profile</Title>
      </div>
    )
  }

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Card>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Avatar
            size={120}
            icon={<UserOutlined />}
            style={{ backgroundColor: '#1890ff', marginBottom: '16px' }}
          />
          <Title level={2} style={{ margin: 0 }}>
            {userInfo.username || 'User Profile'}
          </Title>
        </div>

        <Descriptions
          title="Personal Information"
          bordered
          column={1}
          size="middle"
        >
          <Descriptions.Item 
            label={
              <Space>
                <UserOutlined />
                Username
              </Space>
            }
          >
            {userInfo.username || 'N/A'}
          </Descriptions.Item>

          <Descriptions.Item 
            label={
              <Space>
                <MailOutlined />
                Email
              </Space>
            }
          >
            {userInfo.email || 'N/A'}
          </Descriptions.Item>

          <Descriptions.Item 
            label={
              <Space>
                <IdcardOutlined />
                User ID
              </Space>
            }
          >
            {userInfo.id || 'N/A'}
          </Descriptions.Item>

          <Descriptions.Item 
            label={
              <Space>
                <CrownOutlined />
                Role
              </Space>
            }
          >
            <Tag color={userInfo.role === 'admin' ? 'red' : 'blue'}>
              {userInfo.role || 'N/A'}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  )
}

export default Profile
