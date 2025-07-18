import { Button, Space } from 'antd'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const RootLayout = () => {
  const token = localStorage.getItem('accessToken')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#f0f2f5',
      }}
    >
      <header
        style={{
          backgroundColor: '#1890ff',
          padding: '0 24px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          justifyContent: 'space-between',
          fontWeight: 700,
          fontSize: 18,
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        <div style={{ color: 'white' }}>E-Gov System</div>
        <Space size="middle" style={{ color: 'white', fontWeight: 500, fontSize: 16 }}>
          {token ? (
            <>
              <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                Home
              </Link>
              <Link to="/complain" style={{ color: 'white', textDecoration: 'none' }}>
                Complains
              </Link>
              <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>
                Profile
              </Link>
              <Button type="link" onClick={handleLogout} style={{ color: 'white' }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
                Login
              </Link>
              <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>
                Sign Up
              </Link>
            </>
          )}
        </Space>
      </header>

      <main
        style={{
          flexGrow: 1,
          padding: 24,
          maxWidth: 1000,
          margin: '24px auto',
          width: '100%',
          backgroundColor: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          borderRadius: 8,
        }}
      >
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
