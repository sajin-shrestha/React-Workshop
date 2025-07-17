import { Menu, Layout, Typography, Avatar, message } from 'antd'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { 
  HomeOutlined, 
  FormOutlined, 
  UserOutlined, 
  LogoutOutlined, 
  LoginOutlined, 
  UserAddOutlined 
} from '@ant-design/icons'

const { Header, Content, Footer } = Layout
const { Title } = Typography

const RootLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [current, setCurrent] = useState('home')
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'))

  // Update current based on location
  useEffect(() => {
    const path = location.pathname.split('/')[1] || 'home'
    setCurrent(path)
  }, [location])

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    setIsAuthenticated(!!token)
    
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const handleLogout = () => {
    try {
      localStorage.clear()
      setIsAuthenticated(false)
      message.success('Logged out successfully!')
      navigate('/login')
    } catch (error) {
      message.error('Error during logout')
    }
  }

  const handleMenuClick = (e) => {
    if (e.key === 'logout') {
      handleLogout()
    } else {
      setCurrent(e.key)
    }
  }

  const items = isAuthenticated
    ? [
        { 
          label: <Link to="/">Home</Link>, 
          key: 'home',
          icon: <HomeOutlined />
        },
        { 
          label: <Link to="/complain">Complain</Link>, 
          key: 'complain',
          icon: <FormOutlined />
        },
        { 
          label: <Link to="/profile">Profile</Link>, 
          key: 'profile',
          icon: <UserOutlined />
        },
        {
          label: 'Logout',
          key: 'logout',
          icon: <LogoutOutlined />
        },
      ]
    : [
        { 
          label: <Link to="/login">Login</Link>, 
          key: 'login',
          icon: <LoginOutlined />
        },
        { 
          label: <Link to="/signup">Sign Up</Link>, 
          key: 'signup',
          icon: <UserAddOutlined />
        },
      ]

  return (
    <Layout className="app-container">
      <Header
        style={{
          boxShadow: 'var(--box-shadow)',
          padding: '0',
          background: 'var(--primary-color)',
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
        }}
      >
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Avatar 
              style={{ 
                backgroundColor: 'white', 
                color: 'var(--primary-color)',
                fontWeight: 'bold'
              }}
            >
              RP
            </Avatar>
        
            <Title 
              level={4} 
              style={{ 
                margin: 0, 
                color: 'white',
                fontWeight: '600',
              }}
            >
              Rajan Pantha
            </Title>
          </div>

          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[current]}
            items={items}
            onClick={handleMenuClick}
            style={{ background: 'transparent', borderBottom: 'none' }}
          />
        </div>
      </Header>

      <Content className="page-content container">
        <Outlet />
      </Content>
      
      <Footer style={{ 
        textAlign: 'center', 
        background: 'var(--bg-tertiary)',
        padding: 'var(--spacing-md)',
      }}>
        Rajan Pantha © {new Date().getFullYear()} - React Workshop
      </Footer>
    </Layout>
  )
}

export default RootLayout
