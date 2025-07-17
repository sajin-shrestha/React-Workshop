import { useState, useEffect } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  FileTextOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './RootLayout.css';

const { Header, Content } = Layout;

const RootLayout = () => {
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('accessToken'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setToken(null);
    navigate('/login');
  };

  return (
    <Layout
      className="layout"
      style={{
        minHeight: '100vh',
        background: token
          ? '#1e1e2f'
          : 'linear-gradient(to right, #141E30, #243B55)',
      }}
    >
      <Header
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 24px',
        }}
      >
        <div
          className="logo"
          style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            fontFamily: 'monospace',
          }}
        >
          Bibek Magar
        </div>

        {token && (
          <Menu
            theme="dark"
            mode="horizontal"
            selectable={false}
            style={{ backgroundColor: 'transparent', flex: 1, justifyContent: 'flex-end' }}
          >
            <Menu.Item key="profile" icon={<UserOutlined />}>
              <Link to="/">Profile</Link>
            </Menu.Item>
            <Menu.Item key="complain" icon={<FileTextOutlined />}>
              <Link to="/complain">Complain</Link>
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />}>
              <Button
                type="link"
                onClick={handleLogout}
                style={{ padding: 0, color: '#fff' }}
              >
                Logout
              </Button>
            </Menu.Item>
          </Menu>
        )}
      </Header>

      <Content style={{ padding: '24px' }}>
        {token ? (
          <Outlet />
        ) : (
          <div
            className="welcome-container"
            style={{
              minHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              textAlign: 'center',
              fontFamily: 'sans-serif',
            }}
          >
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
              Welcome to Phase 2 Project
            </h1>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.8 }}>
              Please login or signup to continue
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/login">
                <Button type="primary" size="large">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button type="default" size="large" style={{ backgroundColor: '#555', color: '#fff' }}>
                  Signup
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default RootLayout;
