import React from 'react'
import { Card } from 'antd'
const LoginPage = () => {
  return (
    <div>
     <Card title="Login">
        <Form>
            {/* for email */}
            <Form.Item label="Email" name ='email' required>
                <Input placeholder="email"/>
            </Form.Item>
            {/* for password */}
            <Form.Item></Form.Item>
            {/* for submit button */}
            <Form.Item></Form.Item>
        </Form>
     </Card>
    </div>
  )
}

export default LoginPage
