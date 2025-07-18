import { Button, Flex } from 'antd'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import './RootLayout.css' // 👈 Import the CSS file

const RootLayout = () => {
  const token = localStorage.getItem('accessToken')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div>
      <header className="header">
        <Flex justify="space-between" align="center">
          {/* left side text  */}
          <div className="left-title">KARUN ACHARYA</div>

          {/* right side navigation */}
          <div className="nav-links">
            {token ? (
              <>
                <Link to="/">Home</Link>
                <Link to="/complain">Complain</Link>
                <Link to="/profile">Profile</Link>
                <Button type="link" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            )}
          </div>
        </Flex>
      </header>

      <main className="main-content">
        {/* for rendering other react pages defined inside root layout */}
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
