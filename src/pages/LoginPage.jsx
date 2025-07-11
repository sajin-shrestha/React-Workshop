import { Button, Card, Form, Input, message, notification } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [loading, setLoading] = useState(false) // to track api calling process
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
      notification.success('Login successful')
    } catch (err) {
      console.error(err)
      message.error('Login unsuccessful')
      notification.error('Login unsuccessful')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card title="Login Page">
      <Form onFinish={onFinish}>
        {/* email  */}
        <Form.Item
          label="Email"
          name="email"
          required
        >
          <Input placeholder="email" />
        </Form.Item>
        {/* password */}
        <Form.Item
          label="Password"
          name="password"
          required
        >
          <Input placeholder="password" />
        </Form.Item>
        {/* submit button  */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default LoginPage
