import {Flex } from 'antd'
import React from 'react'

const RootLayout = () => {
  return (
    <div>
      <header>
        {/* left side one */}
        <Flex justify='space-between'>
            <div>Samit Shrestha</div>
            {/* right side  */}
            <Flex gap={8}>
            <div>
                <Link>Home</Link>
                <Link>Login</Link>
                <Link>SignUp</Link>
                <Link>Logout</Link>
            </div>
        </Flex>
        </Flex>
      </header>
    </div>
  )
}

export default RootLayout
