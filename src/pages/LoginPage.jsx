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
      const res = await axios.post(
        'https://egov-backend.vercel.app/api/users/login',
        values,
      )

      const { accessToken } = res.data
      localStorage.setItem('accessToken', accessToken)

      navigate('/')

      message.success('Login Successful')
      notification.success({ message: 'Login successful' })
    } catch (err) {
      console.error(err)
      message.error('Login unsuccessful')
      notification.error({ message: 'Login unsuccessful' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card
      title="Login Page"
      style={{
        maxWidth: 400,
        margin: '60px auto',
        padding: '30px 24px',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        background: 'white',
      }}
    >
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password"  />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
          >
            Login
          </Button>
        </Form.Item>
      </Form>

      <h4 style={{ marginTop: 20 }}>
        Do you want to signup? <Link to="/signup">Signup</Link>
      </h4>
    </Card>
  )
}

export default LoginPage
