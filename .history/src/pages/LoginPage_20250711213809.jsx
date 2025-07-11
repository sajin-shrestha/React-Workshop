import React from 'react'
import { Card, Form, Input, Button } from 'antd'
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
            <Form.Item label="Password" name='password' required>
                <Input placeholder="password"/>
            </Form.Item>
            {/* for submit button */}
            <Form.Item>
                <Button type="primary" htmlType="submit"/>
            </Form.Item>
        </Form>
     </Card>
    </div>
  )
}

export default LoginPage
