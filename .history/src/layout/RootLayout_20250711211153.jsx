import {Flex } from 'antd'
import React from 'react'

const RootLayout = () => {
  return (
    <div>
      <header>
        <Flex>
            <div>Samit Shrestha</div>
            <div>
                <div>Home</div>
                <div>Login</div>
                <div>SignUp</div>
                <div>Logout</div>
            </div>
        </Flex>
      </header>
    </div>
  )
}

export default RootLayout
