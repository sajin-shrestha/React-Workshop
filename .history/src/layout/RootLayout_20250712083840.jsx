import {Flex } from 'antd'
import { Link ,Outlet} from 'react-router-dom'
import React from 'react'

const RootLayout = () => {
  const token = localStorage.getItem('accessToken')
  return (
    <div>
      <header>
        {/* left side one */}
        <Flex justify='space-between'>
            <div style={{fontWeight: 'bold'}}>Samit Shrestha</div>
            {/* right side  */}
            <Flex gap={8}>
       {
        token ? (
          <>
          <Link to='/'>Home</Link>
          <button type='link' onClick={}>Logout</button>
          </> ): (<>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>SignUp</Link>
          </>
        )
      
       }
                <Link to='/'>Home</Link>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>SignUp</Link>
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
