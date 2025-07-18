import { Button, Card, Form, Input, message, notification } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (values) => {
    setLoading(true)

    try {
      const res = await axios.post(
        'https://egov-backend.vercel.app/api/users/register',
        values,
      )

      console.log(res)

      navigate('/login')

      message.success('Signup Successful')
      notification.success({ message: 'Signup successful' })
    } catch (err) {
      console.error(err)
      message.error('Signup unsuccessful')
      notification.error({ message: 'Signup unsuccessful' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card title="Signup Page" style={{ maxWidth: 400, margin: 'auto', marginTop: 50 }}>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item label="Username" name="username" required>
          <Input placeholder="Enter username" />
        </Form.Item>
        <Form.Item label="Email" name="email" required>
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item label="Password" name="password" required>
          <Input.Password placeholder="Enter password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default SignupPage
