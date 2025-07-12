import { message, notification, Form, Input, Button, Card } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await axios.post(
                'https://egov-backend.vercel.app/api/users/register', 
                values,
            )

            console.log(res)

            navigate('/login')
            message.success('Registration successful');
            notification.success('Registration successful'
            );
        } catch (err) {
            console.error(err)
            message.error('Registration failed. Please try again.')
            notification.error('Registration failed. Please try again.'
            )
        } finally {
            setLoading(false); // Reset loading state
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

export default Register;