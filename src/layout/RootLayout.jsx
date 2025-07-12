import { Button, Flex } from 'antd'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const RootLayout = () => {
  const token = localStorage.getItem('accessToken')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div>
      <header>
        <Flex justify="space-between">
          {/* left side text  */}
          <div style={{ fontWeight: 'bold' }}>Sajin Shrestha</div>

          {/* right side text */}
          <Flex gap={8}>
            {token ? (
              <>
                <Link to="/">Home</Link>
                <Link to="/Complains">Complains</Link>
                <Button
                  type="link"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            )}
          </Flex>
        </Flex>
      </header>

      <main>
        {/* for rendering other react pages defined inside root layout */}
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout