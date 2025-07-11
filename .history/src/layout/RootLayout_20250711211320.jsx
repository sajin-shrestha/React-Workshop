import {Flex } from 'antd'
import React from 'react'

const RootLayout = () => {
  return (
    <div>
      <header>
        <Flex justify='space-between'>
            <div>Samit Shrestha</div>
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
