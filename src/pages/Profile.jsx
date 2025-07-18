import { Card, Descriptions, Spin, Avatar, Typography, message, Space, Tag } from 'antd'
import { UserOutlined, MailOutlined, IdcardOutlined, CrownOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useEffect, useState } from 'react'

const { Title } = Typography

const Profile = () => {
  const [loading, setLoading] = useState(false)
  const [userInf, setUserInf] = useState(null)
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
      setUserInf(res.data.user)
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

  if (!userInf) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '450px' }}>
        <Title level={4}>Failed loading user profile</Title>
      </div>
    )
  }

  return (
    <div style={{ padding: '30px', maxWidth: '830px', margin: '0 auto' }}>
      <Card>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Avatar
            size={100}
            icon={<UserOutlined />}
            style={{ backgroundColor: '#3e9975ff', marginBottom: '14px' }}
          />
          <Title level={2} style={{ margin: 0 }}>
            {userInf.username || 'User Profile'}
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
            {userInf.username || 'N/A'}
          </Descriptions.Item>

          <Descriptions.Item 
            label={
              <Space>
                <MailOutlined />
                Email
              </Space>
            }
          >
            {userInf.email || 'N/A'}
          </Descriptions.Item>

          <Descriptions.Item 
            label={
              <Space>
                <IdcardOutlined />
                User ID
              </Space>
            }
          >
            {userInf.id || 'N/A'}
          </Descriptions.Item>

          <Descriptions.Item 
            label={
              <Space>
                <CrownOutlined />
                Role
              </Space>
            }
          >
            <Tag color={userInf.role === 'admin' ? 'red' : 'blue'}>
              {userInf.role || 'N/A'}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  )
}

export default Profile
