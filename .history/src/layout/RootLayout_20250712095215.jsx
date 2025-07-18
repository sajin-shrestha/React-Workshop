import {Flex , Button} from 'antd'
import { Link ,Outlet, useNavigate} from 'react-router-dom'
import React from 'react'

const RootLayout = () => {
  const token = localStorage.getItem('accessToken')
  const navigate = useNavigate()

  const handleLogout = () =>{
    localStorage.clear();
    navigate('/login')
  }
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
          <Button type='link' onClick={handleLogout}>Logout</Button>
            <Link to='/complain'>Complain</Link>
          </> ): (<>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>SignUp</Link>

          </>
        )
       }
                {/* <Link to='/'>Home</Link>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>SignUp</Link>
                <div>Logout</div>
         */}
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
