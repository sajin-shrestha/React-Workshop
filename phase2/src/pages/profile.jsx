// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import './Profile.css';
import {
  Card,
  Descriptions,
  message,
  Spin,
  Typography,
  Avatar,
  Space,
} from 'antd';
import { IdcardOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!token) {
      message.error('No token found. Please login first.');
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          'https://egov-backend.vercel.app/api/users/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(res.data.user);
      } catch (err) {
        console.error('Profile fetch error:', err.response?.data || err.message);
        message.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) {
    return <Spin tip="Loading profile..." className="profile-spin" />;
  }

  if (!user) {
    return <p className="profile-empty">No user data available</p>;
  }

  return (
    <div className="slide-down-profile">
      <Card className="profile-container">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Profile Header */}
          <div className="profile-header">
            <Avatar
              size={80}
              icon={<IdcardOutlined />}
              className="profile-avatar"
            />
            <Title level={2} className="profile-title">
              {user.username}
            </Title>
            <Text type="secondary">{user.role || 'User'}</Text>
          </div>

          {/* Profile Details */}
          <Descriptions
            bordered
            column={1}
            labelStyle={{ fontWeight: 'bold', width: 120 }}
          >
            <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
            <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
            <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
            <Descriptions.Item label="Created At">
              {new Date(user.createdAt).toLocaleString()}
            </Descriptions.Item>
          </Descriptions>
        </Space>
      </Card>
    </div>
  );
};

export default Profile;
