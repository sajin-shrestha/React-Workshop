import React from 'react'
import { Flex } from 'antd'
import { Link, Outlet} from 'react-router-dom'

const RootLayout = () => {
  return (
    <div>
        <header>
        <Flex justify="space-between">
            {/*left side text */}
            <div style={{fontWeight:'bold'}}>Sanju Nagarkoti</div>
            <Flex gap={8}>
                {/*right side text */}
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                <Link >Logout</Link>
                </Flex>
        </Flex>
        </header>

        <main>
            {/*for rendering other react pages defined inside root layout */}
    <Outlet></Outlet>
        </main>
    </div>
  )
}

export default RootLayout