import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Spin, Alert, Typography, Avatar, Row, Col, Divider, Tag } from 'antd';
import axios from 'axios';
import { UserOutlined, MailOutlined, IdcardOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        if (!token) {
          throw new Error('Access token is missing. Please log in again.');
        }

        const response = await axios.get('https://egov-backend.vercel.app/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const mappedData = {
          name: response.data.user?.username || 'N/A',
          email: response.data.user?.email || 'N/A',
          role: response.data.user?.role || 'N/A',
        };

        setUserData(mappedData);
      } catch (err) {
        setError(err.message || 'Failed to fetch user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Spin size="large" tip="Loading user profile..." />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error Loading Profile"
        description={error}
        type="error"
        showIcon
        style={{ maxWidth: '600px', margin: '20px auto' }}
      />
    );
  }

  if (!userData) {
    return (
      <Alert
        message="No Profile Data"
        description="No user data is available. Please log in again."
        type="warning"
        showIcon
        style={{ maxWidth: '600px', margin: '20px auto' }}
      />
    );
  }

  const getInitials = (name) => {
    if (!name || name === 'N/A') return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="profile-container" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <Card className="user-card">
        <div className="profile-header" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
          <Avatar
            size={100}
            style={{
              backgroundColor: '#1890ff',
              fontSize: '2.5rem',
              fontWeight: 'bold'
            }}
          >
            {getInitials(userData.name)}
          </Avatar>

          <div className="profile-info">
            <Title level={2}>{userData.name}</Title>
            <Tag color={userData.role === 'admin' ? 'gold' : 'blue'}>
              {userData.role === 'admin' ? 'Administrator' : userData.role}
            </Tag>
          </div>
        </div>

        <Divider />

        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12}>
            <Card
              size="small"
              title={<><MailOutlined style={{ marginRight: '8px' }} />Email Address</>}
              style={{ height: '100%' }}
            >
              <Text copyable>{userData.email}</Text>
            </Card>
          </Col>

          <Col xs={24} sm={12}>
            <Card
              size="small"
              title={<><IdcardOutlined style={{ marginRight: '8px' }} />Account Type</>}
              style={{ height: '100%' }}
            >
              <Text>{userData.role === 'admin' ? 'Administrator Account' : 'Standard User Account'}</Text>
            </Card>
          </Col>
        </Row>

        <Divider />

        <Text type="secondary" style={{ display: 'block', marginTop: 16 }}>
          Account information is private and protected. Only you can see this information.
        </Text>
      </Card>
    </div>
  );
};

export default Profile;
