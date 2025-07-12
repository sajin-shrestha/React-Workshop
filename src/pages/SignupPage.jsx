import { Button, Card, Form, Input, message, notification } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {
  const [loading, setLoading] = useState(false) // to track api calling process
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
    <Card title="Signup Page">
      <Form onFinish={onFinish}>
        {/* username  */}
        <Form.Item
          label="Username"
          name="username"
          required
        >
          <Input placeholder="username" />
        </Form.Item>
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
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default SignupPage
