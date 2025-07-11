import React, { useState } from 'react'
import { Card, Form, Input, Button } from 'antd'
const LoginPage = () => {
        const [loading, setLoading] = useState(false);
    return (
    <div>
     <Card title="Login">
        <Form onFinish={onFinish}>
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
                <Button type="primary" htmlType="submit" loading={loading}>Login</Button>
            </Form.Item>
        </Form>
     </Card>
    </div>
  )
}

export default LoginPage
