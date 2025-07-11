import { Flex } from 'antd'
import { Link, Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div>
      <header>
        <Flex justify="space-between">
          {/* left side text  */}
          <div style={{ fontWeight: 'bold' }}>Sajin Shrestha</div>

          {/* right side text */}
          <Flex gap={8}>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <div>Logout</div>
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
