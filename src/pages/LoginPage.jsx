import { Button, Card, Form, Input, message, notification } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (values) => {
    setLoading(true)

    try {
      const res = await axios.post('https://egov-backend.vercel.app/api/users/login', values)

      const { accessToken, user } = res.data
      localStorage.setItem('accessToken', accessToken)
      if (user) localStorage.setItem('user', JSON.stringify(user))

      message.success('Login Successful')
      notification.success({ message: 'Login Successful' })
      navigate('/')
    } catch (err) {
      console.error(err)
      message.error('Login unsuccessful')
      notification.error({ message: 'Login Unsuccessful' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card title="Login" style={{ maxWidth: 400, margin: '40px auto' }}>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item label="Email" name="email" required rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item label="Password" name="password" required rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form.Item>
      </Form>

      <div style={{ textAlign: 'center' }}>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </Card>
  )
}

export default LoginPage
