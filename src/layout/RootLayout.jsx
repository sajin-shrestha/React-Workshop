import { Button, Flex, Avatar, Dropdown } from 'antd'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { 
  HomeOutlined, 
  FileTextOutlined, 
  UserOutlined, 
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined,
  MenuOutlined 
} from '@ant-design/icons'

const RootLayout = () => {
  const token = localStorage.getItem('accessToken')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: <Link to="/profile">Profile</Link>,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
      danger: true,
    },
  ]

  return (
    <div className="fade-in">
      <header className="modern-header">
        <div className="container">
          <Flex justify="space-between" align="center">
            {/* Brand/Logo */}
            <div className="header-brand">
              Swastik Rawat
            </div>

            {/* Navigation */}
            <Flex gap={16} align="center">
              {token ? (
                <>
                  <Link to="/" className="nav-link">
                    <HomeOutlined style={{ marginRight: 8 }} />
                    Home
                  </Link>
                  <Link to="/complain" className="nav-link">
                    <FileTextOutlined style={{ marginRight: 8 }} />
                    Complaints
                  </Link>
                  
                  {/* User Menu */}
                  <Dropdown
                    menu={{ items: userMenuItems }}
                    placement="bottomRight"
                    trigger={['click']}
                  >
                    <Avatar 
                      icon={<UserOutlined />} 
                      style={{ 
                        cursor: 'pointer',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: '2px solid white',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                      }}
                    />
                  </Dropdown>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link">
                    <LoginOutlined style={{ marginRight: 8 }} />
                    Login
                  </Link>
                  <Link to="/signup" className="nav-link">
                    <UserAddOutlined style={{ marginRight: 8 }} />
                    Sign Up
                  </Link>
                </>
              )}
            </Flex>
          </Flex>
        </div>
      </header>

      <main style={{ minHeight: 'calc(100vh - 80px)', padding: '24px 0' }}>
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer style={{
        background: '#001529',
        color: 'white',
        textAlign: 'center',
        padding: '24px 0',
        marginTop: '40px'
      }}>
        <div className="container">
          <p style={{ margin: 0, opacity: 0.8 }}>
            © 2025
          </p>
        </div>
      </footer>
    </div>
  )
}

export default RootLayout
