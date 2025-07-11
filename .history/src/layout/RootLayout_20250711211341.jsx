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
                <div>Home</div>
                <div>Login</div>
                <div>SignUp</div>
                <div>Logout</div>
            </div>
        </Flex>
        </Flex>
      </header>
    </div>
  )
}

export default RootLayout
