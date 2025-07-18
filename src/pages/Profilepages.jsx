import React, { useEffect, useState } from 'react';
import { Card, Typography, Spin, Alert } from 'antd';
 import './ProfilePage.css'; 
import axios from 'axios';

const { Title, Text } = Typography;

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('accessToken');

        if (!token) {
          setError('No access token found. Please log in.');
          return;
        }

        setAccessToken(token); 

        
        const response = await axios.get(
          'https://egov-backend.vercel.app/api/users/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userData = response.data?.user || response.data;

        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      } catch (err) {
        console.error(err);
        setError(
          err?.response?.data?.message ||
            'Failed to load profile. Your token may be expired or invalid.'
        );
        setUser(null);
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading)
    return <Spin tip="Loading user profile..." style={{ display: 'block', marginTop: 100 }} />;

  if (error)
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        style={{ maxWidth: 400, margin: '20px auto' }}
      />
    );

  if (!user)
    return (
      <Alert
        message="No user data"
        description="Please log in to view your profile."
        type="warning"
        showIcon
        style={{ maxWidth: 400, margin: '20px auto' }}
      />
    );

  return (
  <Card className="profile-container">
  <Title level={3} className="profile-title">User Profile</Title>

  <div className="profile-item">
    <strong>User ID :</strong> <span>{user._id}</span>
  </div>
  <div className="profile-item">
    <strong>Username :</strong> <span>{user.username}</span>
  </div>
  <div className="profile-item">
    <strong>Email :</strong> <span>{user.email}</span>
  </div>
  <div className="profile-item">
    <strong>Role :</strong> <span>{user.role}</span>
  </div>
  <div className="profile-item">
    <strong>Created At :</strong> <span>{new Date(user.createdAt).toLocaleString()}</span>
  </div>
  <div className="profile-item">
    <strong>Updated At :</strong> <span>{new Date(user.updatedAt).toLocaleString()}</span>
  </div>

  <div className="token-box">
    <Text strong>Access Token:</Text>
    <br />
    <Text copyable>{accessToken}</Text>
  </div>
</Card>

  );
};

export default ProfilePage;
